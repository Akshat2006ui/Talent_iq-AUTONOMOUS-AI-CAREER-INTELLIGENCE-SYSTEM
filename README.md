# TalentIQ - AUTONOMOUS-AI-CAREER-INTELLIGENCE-SYSTEM

A comprehensive full-stack web application that helps users discover their ideal career path using AI-powered analysis, resume parsing, and intelligent career guidance.

## 🚀 Features

- **AI Career Prediction**: Get personalized career recommendations based on your skills
- **Resume Analysis**: Upload and analyze resumes with Google Gemini AI
- **Skill Gap Analysis**: Identify missing skills for your target career
- **Career Roadmaps**: Step-by-step guidance for career transitions
- **AI Chatbot**: Interactive career counseling with Gemini AI
- **User Authentication**: Secure signup and login system
- **15+ Career Roles**: Comprehensive database of tech career paths

## 🛠️ Tech Stack

### Backend
- **Python 3.11+** with FastAPI
- **Google Gemini AI** for resume analysis and chatbot
- **SQLAlchemy** with SQLite database
- **Scikit-learn** for machine learning predictions
- **JWT** authentication with Passlib
- **PDFPlumber** and **python-docx** for document parsing

### Frontend
- **React 18** with modern hooks
- **Tailwind CSS** for responsive design
- **Axios** for API communication
- **Lucide React** icons

## 📋 Prerequisites

- Python 3.11 or higher
- Node.js 16 or higher
- Google Gemini API key ([Get one here](https://makersuite.google.com/app/apikey))

## 🔧 Installation

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/talent_iq.git
cd talent_iq
```

### 2. Environment Setup
```bash
# Copy the environment template
cp .env.example .env

# Edit .env and add your Google Gemini API key
GEMINI_API_KEY=your_actual_api_key_here
```

### 3. Backend Setup
```bash
# Install Python dependencies
pip install -r requirements.txt

# Run the backend server
python main.py
```
The backend will be available at `http://localhost:8000`

### 4. Frontend Setup
```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm start
```
The frontend will be available at `http://localhost:3000`

## 🚀 Quick Start Scripts

For Windows users, use the provided batch files:
```bash
# Start backend
start_backend.bat

# Start frontend  
start_frontend.bat
```

## 📚 API Documentation

Once the backend is running:
- **Swagger UI**: `http://localhost:8000/docs`
- **ReDoc**: `http://localhost:8000/redoc`

## 🔗 Key API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/signup` | Register new user |
| POST | `/login` | User authentication |
| POST | `/predict_career` | AI career prediction |
| POST | `/analyze_resume` | Resume analysis with AI |
| POST | `/chatbot` | AI career counseling |
| GET | `/roles` | Available career roles |
| POST | `/skill_gap_analysis` | Identify skill gaps |
| GET | `/role_roadmap/{role}` | Career roadmap |

## 📁 Project Structure

```
talent_iq/
├── backend/
│   ├── auth/           # Authentication handlers
│   ├── chatbot/        # Gemini AI chatbot
│   ├── ml/             # Machine learning models
│   ├── models/         # Database models
│   ├── resume/         # Resume parsing & analysis
│   ├── schemas/        # Pydantic schemas
│   └── database.py     # Database configuration
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── contexts/   # React contexts
│   │   ├── pages/      # Application pages
│   │   └── App.js      # Main app component
│   └── public/         # Static assets
├── main.py             # FastAPI application
├── requirements.txt    # Python dependencies
└── README.md
```

## 🎯 Usage Guide

1. **Sign Up**: Create your account
2. **Career Prediction**: Enter your skills for AI recommendations
3. **Resume Analysis**: Upload PDF/DOCX for comprehensive analysis
4. **Skill Gap Analysis**: Identify areas for improvement
5. **Career Roadmap**: Get step-by-step career guidance
6. **AI Chatbot**: Ask career-related questions anytime

## 🤖 AI Features

- **Resume Parsing**: Extracts skills, experience, and qualifications
- **Career Matching**: ML-powered role recommendations
- **Skill Analysis**: Identifies strengths and gaps
- **Interactive Chat**: Real-time career counseling
- **Roadmap Generation**: Personalized learning paths

## 🔒 Security

- JWT-based authentication
- Password hashing with bcrypt
- API key protection
- Input validation and sanitization

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 Developer

**Akshat Kapoor**
- LinkedIn: [akshat-kapoor-368a0b275](https://www.linkedin.com/in/akshat-kapoor-368a0b275)
- GitHub: [Akshat2006ui](https://github.com/Akshat2006ui)
- Phone: +91 8699845663

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Google Gemini AI for powerful language processing
- React and FastAPI communities
- Open source contributors
