from fastapi import FastAPI, Depends, HTTPException, status, File, UploadFile
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from dotenv import load_dotenv
from datetime import datetime
import os

# Load environment variables
load_dotenv()

from backend.database import Base, engine, SessionLocal
from backend.models.model import User
from backend.schemas.user_schemas import UserCreate, UserLogin, SkillsInput
from backend.auth.auth_handler import hash_password, verify_password, create_token
from backend.ml.career_predictor import get_all_roles
from backend.ml.advanced_predictor import (
    predict_career_with_confidence,
    analyze_skill_gap,
    get_role_roadmap,
    get_all_roles_list
)
from backend.resume.parser import parse_resume
from backend.resume.skill_extractor import extract_skills
from backend.resume.gemini_analyzer import analyze_resume_with_gemini
from backend.chatbot.gemini_chatbot import get_chatbot_response


# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="TalentIQ API",
    description="AI-powered career prediction and resume analysis platform",
    version="1.0.0"
)


# CORS Configuration
origins = [
    "http://localhost:3000",
    "https://talent-iq-frontend-bice.vercel.app"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# Database dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# Root endpoint
@app.get("/")
def read_root():
    return {"message": "Welcome to TalentIQ API"}


# Get career roles
@app.get("/roles")
def get_career_roles():
    return {"roles": get_all_roles()}


# Signup
@app.post("/signup")
def signup(user: UserCreate, db: Session = Depends(get_db)):
    try:
        db_user = db.query(User).filter(User.email == user.email).first()

        if db_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Email already registered"
            )

        hashed_password = hash_password(user.password)

        new_user = User(
            email=user.email,
            password=hashed_password
        )

        db.add(new_user)
        db.commit()
        db.refresh(new_user)

        return {
            "message": "User created successfully",
            "user": {
                "id": new_user.id,
                "email": new_user.email
            }
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


# Login
@app.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):
    db_user = db.query(User).filter(User.email == user.email).first()

    if not db_user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    if not verify_password(user.password, db_user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )

    token = create_token(user.email)

    return {
        "access_token": token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "email": db_user.email
        }
    }


# Career prediction
@app.post("/predict_career")
def predict_career_role(data: SkillsInput):
    predictions = predict_career_with_confidence(data.skills)

    return {
        "predictions": predictions,
        "top_role": predictions[0] if predictions else None
    }


# Skill gap analysis
@app.post("/skill_gap_analysis")
def skill_gap_analysis(data: dict):
    user_skills = data.get("skills", [])
    target_role = data.get("target_role", "")

    if not target_role:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Target role is required"
        )

    analysis = analyze_skill_gap(user_skills, target_role)

    if "error" in analysis:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=analysis["error"]
        )

    return analysis


# Career roadmap
@app.get("/role_roadmap/{role}")
def get_roadmap(role: str):
    roadmap = get_role_roadmap(role)

    if "error" in roadmap:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail=roadmap["error"]
        )

    return roadmap


# Detailed roles
@app.get("/roles_detailed")
def get_all_roles_detailed():
    roles = get_all_roles_list()
    return {"roles": roles}


# AI chatbot
@app.post("/chatbot")
def chat_with_bot(data: dict):
    message = data.get("message", "")
    history = data.get("history", [])

    if not message:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Message is required"
        )

    response = get_chatbot_response(message, history)

    return {
        "response": response,
        "timestamp": datetime.utcnow().isoformat()
    }


# Resume analysis
@app.post("/analyze_resume")
def analyze_resume(file: UploadFile = File(...), db: Session = Depends(get_db)):

    parsed = parse_resume(file)

    if "error" in parsed:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=parsed["error"]
        )

    gemini_analysis = analyze_resume_with_gemini(parsed["text"])

    if "error" in gemini_analysis or not gemini_analysis.get("skills"):
        skills = extract_skills(parsed["text"])
    else:
        skills = gemini_analysis.get("skills", [])

    predictions = predict_career_with_confidence(skills)

    top_roles = predictions[:3] if len(predictions) >= 3 else predictions

    return {
        "name": parsed["name"],
        "email": parsed["email"],
        "phone": parsed["phone"],
        "skills": skills,
        "predictions": predictions,
        "top_recommendations": top_roles,
        "strengths": gemini_analysis.get("strengths", ""),
        "suggestions": gemini_analysis.get("suggestions", ""),
        "experience_level": gemini_analysis.get("experience_level", ""),
        "ai_powered": not ("error" in gemini_analysis)
    }