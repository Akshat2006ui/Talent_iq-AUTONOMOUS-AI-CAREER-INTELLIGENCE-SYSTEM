from pydantic import BaseModel, EmailStr
from typing import List, Optional


class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class SkillsInput(BaseModel):
    skills: List[str]


class ResumeParseResponse(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    text: str


class CareerPredictionResponse(BaseModel):
    recommended_role: str
    confidence: Optional[float] = None


class ResumeAnalysisResponse(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    skills: List[str]
    recommended_roles: List[str]
