import os
import google.generativeai as genai
from typing import Dict, List

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


def analyze_resume_with_gemini(resume_text: str) -> Dict:
    """
    Analyze resume using Google Gemini AI
    Returns structured analysis with skills, experience, and recommendations
    """
    if not GEMINI_API_KEY:
        return {
            "error": "Gemini API key not configured",
            "skills": [],
            "recommended_roles": [],
            "analysis": "Please set GEMINI_API_KEY environment variable"
        }
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        prompt = f"""
        Analyze the following resume and provide a detailed analysis in JSON format.
        
        Resume Text:
        {resume_text}
        
        Please provide:
        1. A list of technical skills found in the resume
        2. Top 3 recommended career roles based on the skills and experience
        3. A brief summary of the candidate's strengths
        4. Suggestions for career growth
        
        Return the response in this exact JSON format:
        {{
            "skills": ["skill1", "skill2", ...],
            "recommended_roles": ["role1", "role2", "role3"],
            "strengths": "Brief summary of strengths",
            "suggestions": "Career growth suggestions",
            "experience_level": "Junior/Mid/Senior"
        }}
        """
        
        response = model.generate_content(prompt)
        
        # Parse the response
        import json
        import re
        
        # Extract JSON from response
        response_text = response.text
        
        # Try to find JSON in the response
        json_match = re.search(r'\{.*\}', response_text, re.DOTALL)
        if json_match:
            result = json.loads(json_match.group())
            return result
        else:
            # If no JSON found, return raw response
            return {
                "skills": [],
                "recommended_roles": [],
                "analysis": response_text,
                "raw_response": True
            }
            
    except Exception as e:
        return {
            "error": f"Gemini API error: {str(e)}",
            "skills": [],
            "recommended_roles": [],
            "analysis": "Failed to analyze resume with AI"
        }


def get_career_recommendations(skills: List[str]) -> Dict:
    """
    Get career recommendations based on skills using Gemini
    """
    if not GEMINI_API_KEY:
        return {
            "recommended_roles": [],
            "explanation": "Gemini API key not configured"
        }
    
    try:
        model = genai.GenerativeModel('gemini-2.5-flash')
        
        skills_text = ", ".join(skills)
        prompt = f"""
        Based on these skills: {skills_text}
        
        Recommend the top 3 most suitable career roles and explain why.
        
        Return in JSON format:
        {{
            "recommended_roles": [
                {{
                    "role": "Role Name",
                    "match_score": 95,
                    "reason": "Why this role fits"
                }}
            ]
        }}
        """
        
        response = model.generate_content(prompt)
        
        import json
        import re
        
        json_match = re.search(r'\{.*\}', response.text, re.DOTALL)
        if json_match:
            return json.loads(json_match.group())
        else:
            return {
                "recommended_roles": [],
                "explanation": response.text
            }
            
    except Exception as e:
        return {
            "recommended_roles": [],
            "error": str(e)
        }