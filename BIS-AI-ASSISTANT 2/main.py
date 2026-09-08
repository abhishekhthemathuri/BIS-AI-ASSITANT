import os
from pathlib import Path
import uvicorn
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional, Dict, Any
from dotenv import load_dotenv

from google import genai
from google.genai import types

from knowledge_base import retrieve_relevant_context, BIS_STANDARDS, BIS_SCHEMES, BIS_TESTING_LABS
from postgres_rag import query_bis_postgres

env_path = Path(__file__).resolve().parent / '.env'
load_dotenv(dotenv_path=env_path)

api_key = os.getenv("GEMINI_API_KEY")

if api_key:
    print(f"Loaded API Key: {api_key[:8]}...")
    client = genai.Client(api_key=api_key)
else:
    print("WARNING: GEMINI_API_KEY not found in .env!")
    client = None

CANDIDATE_MODELS = [
    "gemini-3.6-flash",
    "gemini-3.7-flash",
    "gemini-2.5-flash",
]

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
2. When users/manufacturers ask for labs near them, ALWAYS prioritize the nearest testing laboratories provided in the PostgreSQL grounded context, citing their distance in kilometers, full addresses, phone numbers, and testing capabilities.
3. Distinguish clearly between:
   - Scheme I (Standard ISI Mark for domestic manufacturers)
   - Scheme II (Compulsory Registration Scheme - CRS for electronics/IT)
   - Scheme IV (Foreign Manufacturers Certification Scheme - FMCS)
   - Hallmarking (6-digit alphanumeric HUID on Gold/Silver)
4. Format your output with clean Markdown headings, bullet points, distance highlights, and contact information.
"""

class ChatMessage(BaseModel):
    role: str
    text: str

class UserLocation(BaseModel):
    latitude: Optional[float] = None
    longitude: Optional[float] = None
    city: Optional[str] = None
    state: Optional[str] = None

class ChatRequest(BaseModel):
    message: str
    history: Optional[List[ChatMessage]] = []
    location: Optional[UserLocation] = None

class ChatResponse(BaseModel):
    success: bool
    reply: str
    retrieved_context_used: bool

@app.post("/api/chat", response_model=ChatResponse)
async def chat_with_bis_assistant(request: ChatRequest):
    user_query = request.message.strip()
    if not user_query:
        raise HTTPException(status_code=400, detail="Question cannot be empty.")

    # 1. Extract location dict if supplied
    loc_dict = request.location.dict() if request.location else None

    # 2. Dual Retrieval (PostgreSQL with Proximity + Static Knowledge Base)
    db_context = query_bis_postgres(user_query, user_location=loc_dict)
    static_context = retrieve_relevant_context(user_query)

    combined_context_parts = []
    if loc_dict and (loc_dict.get("city") or loc_dict.get("latitude")):
        loc_str = f"USER GEOLOCATION: {loc_dict.get('city', '')}, {loc_dict.get('state', '')} (Lat: {loc_dict.get('latitude')}, Lon: {loc_dict.get('longitude')})"
        combined_context_parts.append(loc_str)

    if db_context:
        combined_context_parts.append(f"--- LIVE POSTGRESQL VERIFIED DATA & LABS ---\n{db_context}")
    if static_context:
        combined_context_parts.append(f"--- KNOWLEDGE BASE REPOSITORY ---\n{static_context}")

    full_context = "\n\n".join(combined_context_parts)
    augmented_system_prompt = f"{SYSTEM_INSTRUCTION}\n\nGROUNDING KNOWLEDGE BASE FOR THIS QUERY:\n{full_context}"

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
            reply=f"⚠️ **Offline Mode Active**: Gemini API Key not detected.\n\n**Data Retrieved from Database:**\n{full_context}",
            retrieved_context_used=bool(full_context)
        )

    last_error = None
    for model_name in CANDIDATE_MODELS:
        try:
            response = client.models.generate_content(
                model=model_name,
                contents=formatted_contents,
                config=types.GenerateContentConfig(
                    system_instruction=augmented_system_prompt,
                    temperature=0.2,
                    max_output_tokens=1500,
                )
            )

            return ChatResponse(
                success=True,
                reply=response.text,
                retrieved_context_used=bool(full_context)
            )
        except Exception as e:
            last_error = e
            continue

    raise HTTPException(status_code=500, detail=f"Gemini API Error: {str(last_error)}")

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
