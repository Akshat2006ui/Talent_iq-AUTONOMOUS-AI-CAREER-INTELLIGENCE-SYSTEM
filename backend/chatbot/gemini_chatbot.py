import os
import google.generativeai as genai
from typing import List, Dict

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)


class CareerChatbot:
    def __init__(self):
        self.model = genai.GenerativeModel('gemini-2.5-flash')
        self.chat_history = []
        
        self.system_context = """You are TalentIQ Career Assistant, an AI-powered career guidance chatbot created by Akshat Kapoor.
        
Your role is to help users with:
- Career guidance and recommendations
- Skill development advice
- Resume tips and suggestions
- Learning path recommendations
- Interview preparation
- Career transition guidance
- Technology trends and insights

About TalentIQ Platform:
- AI-powered career prediction and resume analysis
- Detailed career roadmaps with learning resources
- Skill gap analysis
- Supports 15+ career roles including Data Science, AI Engineering, Full Stack Development, DevOps, etc.

About the Developer:
Akshat Kapoor is an AI expert and full-stack developer who created TalentIQ to help people make informed career decisions using artificial intelligence and machine learning.

Guidelines:
- Be friendly, professional, and encouraging
- Provide actionable advice
- Ask clarifying questions when needed
- Keep responses concise but informative
- Suggest using TalentIQ features when relevant (resume analysis, career prediction, skill gap analysis)"""
    
    def get_response(self, user_message: str, conversation_history: List[Dict] = None) -> str:
        """Get chatbot response for user message"""
        if not GEMINI_API_KEY:
            return "I'm sorry, but the chatbot service is not configured. Please contact the administrator."
        
        try:
            full_prompt = f"{self.system_context}\n\n"
            
            if conversation_history:
                for msg in conversation_history[-5:]:
                    role = msg.get("role", "user")
                    content = msg.get("content", "")
                    full_prompt += f"{role.capitalize()}: {content}\n"
            
            full_prompt += f"User: {user_message}\nAssistant:"
            
            response = self.model.generate_content(full_prompt)
            return response.text
            
        except Exception as e:
            return f"I apologize, but I encountered an error: {str(e)}. Please try again."
    
    def get_career_advice(self, skills: List[str]) -> str:
        """Get specific career advice based on skills"""
        if not GEMINI_API_KEY:
            return "Chatbot service is not configured."
            
        skills_text = ", ".join(skills)
        prompt = f"""Based on these skills: {skills_text}

Provide:
1. Top 3 career recommendations
2. Skills to develop further
3. Learning resources suggestions
4. Next steps for career growth

Keep the response concise and actionable."""
        
        try:
            response = self.model.generate_content(prompt)
            return response.text
        except Exception as e:
            return f"Error generating career advice: {str(e)}"


chatbot = CareerChatbot()


def get_chatbot_response(message: str, history: List[Dict] = None) -> str:
    """Get response from the career chatbot"""
    return chatbot.get_response(message, history)


def get_career_advice_from_skills(skills: List[str]) -> str:
    """Get career advice based on skills"""
    return chatbot.get_career_advice(skills)