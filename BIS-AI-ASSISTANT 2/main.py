import os
from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv

# Import Google GenAI SDK
from google import genai
from google.genai import types

from knowledge_base import retrieve_relevant_context, BIS_STANDARDS, BIS_SCHEMES, BIS_TESTING_LABS

# Load .env file
env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

# Initialize Google GenAI client
if api_key:
    print(f"Loaded API Key: {api_key[:8]}...")
    client = genai.Client(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found in .env!")
    client = None

app = FastAPI(title="BIS Sahayak AI — Standards & Compliance Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

SYSTEM_INSTRUCTION = """
You are "BIS Sahayak", an authoritative AI Consultant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

Core Responsibilities:
1. Answer questions from consumers, manufacturers, jewellers, and citizens regarding Indian Standards (IS codes), Quality Control Orders (QCOs), Conformity Assessment Schemes, and Laboratory Testing.
2. Provide authentic citations of Indian Standard numbers (e.g., IS 10500 for Drinking Water, IS 1417 for Gold Hallmarking, IS 13252 for Electronics, IS 1786 for TMT Steel, IS 4151 for Two-Wheeler Helmets).
3. Distinguish clearly between:
   - Scheme I (Standard ISI Mark for domestic manufacturers)
   - Scheme II (Compulsory Registration Scheme - CRS for electronics/IT)
   - Scheme IV (Foreign Manufacturers Certification Scheme - FMCS)
   - Hallmarking (6-digit alphanumeric HUID on Gold/Silver)
4. For Consumer Grievances: Guide citizens on verifying license numbers (CM/L or CRS R-number) and 6-digit HUIDs using the "BIS Care App" and lodging complaints on the Manakonline portal.
5. Format your output with clear Markdown headings, bullet points, and exact clause limit citations.
"""

class ChatMessage(BaseModel):
    role: str
    text: str

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []

class ChatResponse(BaseModel):
    success: bool
    reply: str
    retrieved_context_used: bool


# List of candidate model names in order of preference
# List of models - starting with gemini-3.6-flash and gemini-3.7-flash
CANDIDATE_MODELS = [
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-3.5-flash",
    "gemini-2.5-flash",
]

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_bis_assistant(request: ChatRequest):
    user_query = request.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    domain_context = retrieve_relevant_context(user_query)
    augmented_system_prompt = f"{SYSTEM_INSTRUCTION}\n\nGROUNDING KNOWLEDGE BASE FOR THIS QUERY:\n{domain_context}"

    formatted_contents = []
    if request.history:
        for msg in request.history:
            formatted_contents.append(
                types.Content(
                    role=msg.role,
                    parts=[types.Part.from_text(text=msg.text)]
                )
            )

    formatted_contents.append(
        types.Content(
            role="user",
            parts=[types.Part.from_text(text=user_query)]
        )
    )

    if not client:
        return ChatResponse(
            success=True,
            reply=f"⚠️ **Offline Mode Active**: Gemini API Key not detected in `.env`.\n\n**Retrieved Standards:**\n{domain_context}",
            retrieved_context_used=True
        )

    last_error = None
    # Try candidate models sequentially until one succeeds
    for model_name in CANDIDATE_MODELS:
        try:
            print(f"Trying Gemini model: {model_name}...")
            response = client.models.generate_content(
                model=model_name,
                contents=formatted_contents,
                config=types.GenerateContentConfig(
                    system_instruction=augmented_system_prompt,
                    temperature=0.2,
                    max_output_tokens=1500,
                )
            )

            print(f"Successfully generated response using: {model_name}")
            return ChatResponse(
                success=True,
                reply=response.text,
                retrieved_context_used=bool(domain_context)
            )
        except Exception as e:
            print(f"Model {model_name} failed: {e}")
            last_error = e
            continue

    # If all models failed, raise the error
    raise HTTPException(status_code=500, detail=f"Gemini API Error across all models: {str(last_error)}")


@app.get("/api/standards")
async def get_all_standards():
    return {"standards": BIS_STANDARDS}


@app.get("/api/schemes")
async def get_all_schemes():
    return {"schemes": BIS_SCHEMES}


@app.get("/api/labs")
async def get_all_labs():
    return {"labs": BIS_TESTING_LABS}


app.mount("/static", StaticFiles(directory="static"), name="static")

@app.get("/")
async def root():
    return FileResponse("static/index.html")


if __name__ == "__main__":
    port = int(os.getenv("PORT", 8000))
    print(f"Starting BIS AI Assistant on http://localhost:{port}")
    uvicorn.run("main:app", host="0.0.0.0", port=port, reload=True)