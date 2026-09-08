import os
from pathlib import Path
import uvicorn
import bcrypt
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from pydantic import BaseModel
from typing import List, Optional
from dotenv import load_dotenv
import psycopg2
from psycopg2.extras import RealDictCursor

from google import genai
from google.genai import types

from knowledge_base import retrieve_relevant_context, BIS_STANDARDS, BIS_SCHEMES, BIS_TESTING_LABS
from postgres_rag import query_bis_postgres, get_db_connection

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
You are "BIS Sahayak", an authoritative Senior AI Consultant for the Bureau of Indian Standards (BIS), Ministry of Consumer Affairs, Food & Public Distribution, Government of India.

Core Principles:
1. NEVER cut off responses. Always complete every step, list item, and concluding advice.
2. When a manufacturer or user asks for a step-by-step guide or how to get a license / ISI Mark, ALWAYS provide the FULL, EXHAUSTIVE 6-Step procedure from start to final Grant of License:
   - Step 1: In-House Laboratory & Plant Infrastructure Setup (Machinery, in-house testing equipment, qualified chemist/microbiologist).
   - Step 2: Documentation & Application Submission on Manakonline (Form-V, factory layout, machinery list, calibration certificates).
   - Step 3: Preliminary Factory Inspection by BIS Inspecting Officer (verification of manufacturing process, quality control & hygienic conditions).
   - Step 4: Sample Drawing & Counter-Testing (drawing of independent samples for testing at BIS Central/Regional or NABL lab).
   - Step 5: Test Report Scrutiny & Marking Fee Payment (compliance verification and annual minimum marking fee remittance).
   - Step 6: Grant of License (CM/L number) & Usage of Standard ISI Mark.
3. For laboratory testing inquiries, ALWAYS prioritize the nearest testing laboratories provided in the PostgreSQL grounded context, citing their distance in kilometers, full addresses, phone numbers, and testing capabilities.
4. Distinguish clearly between Scheme I (ISI Mark for domestic manufacturers), Scheme II (CRS for IT/electronics), Scheme IV (FMCS for foreign factories), and Hallmarking (6-digit HUID).
5. Format your output with clear Markdown headings, bold key terms, and bullet points.
"""

# ----------------- AUTH MODELS & ENDPOINTS -----------------

class RegisterRequest(BaseModel):
    full_name: str
    email: str
    password: str
    user_role: Optional[str] = "Citizen / Consumer"
    organization_name: Optional[str] = ""

class LoginRequest(BaseModel):
    email: str
    password: str

@app.post("/api/auth/register")
def register_user(req: RegisterRequest):
    email_clean = req.email.strip().lower()
    if "@" not in email_clean or "." not in email_clean:
        raise HTTPException(status_code=400, detail="Please enter a valid email address.")

    if len(req.password) < 6:
        raise HTTPException(status_code=400, detail="Password must be at least 6 characters.")

    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed.")

    try:
        cur = conn.cursor()
        cur.execute("SELECT user_id FROM users WHERE email = %s;", (email_clean,))
        if cur.fetchone():
            raise HTTPException(status_code=400, detail="An account with this email already exists.")

        salt = bcrypt.gensalt()
        hashed_pw = bcrypt.hashpw(req.password.encode('utf-8'), salt).decode('utf-8')

        cur.execute("""
            INSERT INTO users (full_name, email, password_hash, user_role, organization_name)
            VALUES (%s, %s, %s, %s, %s)
            RETURNING user_id, full_name, email, user_role, organization_name, created_at;
        """, (req.full_name.strip(), email_clean, hashed_pw, req.user_role, req.organization_name))

        new_user = cur.fetchone()
        conn.commit()
        cur.close()
        conn.close()

        return {
            "success": True,
            "message": "Registration successful!",
            "user": {
                "id": str(new_user["user_id"]),
                "name": new_user["full_name"],
                "email": new_user["email"],
                "role": new_user["user_role"],
                "organization": new_user["organization_name"] or "Independent",
                "joined": str(new_user["created_at"])[:10]
            }
        }
    except HTTPException as he:
        conn.close()
        raise he
    except Exception as e:
        conn.close()
        raise HTTPException(status_code=500, detail=f"Registration error: {str(e)}")

@app.post("/api/auth/login")
def login_user(req: LoginRequest):
    email_clean = req.email.strip().lower()
    conn = get_db_connection()
    if not conn:
        raise HTTPException(status_code=500, detail="Database connection failed.")

    try:
        cur = conn.cursor()
        cur.execute("""
            SELECT user_id, full_name, email, password_hash, user_role, organization_name, created_at
            FROM users WHERE email = %s;
        """, (email_clean,))
        user = cur.fetchone()
        cur.close()
        conn.close()

        if not user:
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        if not bcrypt.checkpw(req.password.encode('utf-8'), user["password_hash"].encode('utf-8')):
            raise HTTPException(status_code=401, detail="Invalid email or password.")

        return {
            "success": True,
            "message": "Login successful!",
            "user": {
                "id": str(user["user_id"]),
                "name": user["full_name"],
                "email": user["email"],
                "role": user["user_role"],
                "organization": user["organization_name"] or "Independent",
                "joined": str(user["created_at"])[:10]
            }
        }
    except HTTPException as he:
        raise he
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Login error: {str(e)}")

# ----------------- CHAT & RAG ENDPOINTS -----------------

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

    loc_dict = request.location.dict() if request.location else None

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
            # INCREASED TO 4096 TOKENS (No more cut-offs!)
            response = client.models.generate_content(
                model=model_name,
                contents=formatted_contents,
                config=types.GenerateContentConfig(
                    system_instruction=augmented_system_prompt,
                    temperature=0.2,
                    max_output_tokens=4096,
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
