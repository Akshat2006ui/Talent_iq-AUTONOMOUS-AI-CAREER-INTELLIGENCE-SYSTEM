from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os
from typing import List, Dict, Tuple
import numpy as np

# Model file paths
MODEL_PATH = os.path.join(os.path.dirname(__file__), "career_model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")

# Enhanced Training Dataset with more examples
data = [
    ("python machine learning pandas numpy data science statistics", "Data Scientist"),
    ("python sql data analysis statistics excel tableau power bi", "Data Analyst"),
    ("java spring backend sql microservices rest api", "Backend Developer"),
    ("html css javascript react frontend ui ux responsive", "Frontend Developer"),
    ("python tensorflow deep learning computer vision neural networks", "AI Engineer"),
    ("aws docker kubernetes devops ci cd jenkins terraform", "DevOps Engineer"),
    ("android kotlin mobile development firebase", "Android Developer"),
    ("flutter dart mobile app development cross platform", "Mobile Developer"),
    ("nodejs express mongodb react fullstack javascript", "Full Stack Developer"),
    ("c# asp.net mvc sql server entity framework", "DotNet Developer"),
    ("php laravel symfony mysql backend", "PHP Developer"),
    ("ruby rails postgresql backend mvc", "Ruby Developer"),
    ("swift uikit core data ios xcode", "iOS Developer"),
    ("kotlin android studio jetpack compose material design", "Android Developer"),
    ("react native javascript mobile ios android", "Mobile Developer"),
    ("graphql rest api nodejs express microservices", "Backend Developer"),
    ("sql nosql database design optimization mongodb postgresql", "Database Administrator"),
    ("linux bash python automation devops scripting", "DevOps Engineer"),
    ("docker swarm kubernetes orchestration cloud", "DevOps Engineer"),
    ("terraform cloudformation infrastructure as code aws", "DevOps Engineer"),
    ("agile scrum jira software development project management", "Software Engineer"),
    ("unit testing integration testing tdd selenium", "QA Engineer"),
    ("selenium cypress end to end testing automation", "QA Engineer"),
    ("ui ux design figma adobe xd prototyping", "UI/UX Designer"),
    ("html5 css3 responsive design bootstrap tailwind", "Frontend Developer"),
    ("typescript angular vue react frontend spa", "Frontend Developer"),
    ("nextjs gatsby react server side rendering seo", "Frontend Developer"),
    ("python django flask backend rest api", "Backend Developer"),
    ("golang grpc microservices distributed systems", "Backend Developer"),
    ("rust systems programming performance optimization", "Systems Programmer"),
    ("embedded c c++ microcontrollers iot", "Embedded Developer"),
    ("blockchain ethereum smart contracts solidity web3", "Blockchain Developer"),
    ("cybersecurity network security penetration testing", "Security Engineer"),
    ("penetration testing ethical hacking kali linux", "Security Engineer"),
    ("machine learning scikit-learn classification regression", "ML Engineer"),
    ("deep learning pytorch tensorflow keras cnn rnn", "Deep Learning Engineer"),
    ("nlp natural language processing transformers bert", "NLP Engineer"),
    ("data engineering spark hadoop etl pipelines", "Data Engineer"),
    ("cloud architecture aws azure gcp solutions", "Cloud Architect"),
    ("game development unity c# 3d graphics", "Game Developer"),
]

# Role requirements and roadmaps
ROLE_REQUIREMENTS = {
    "Data Scientist": {
        "core_skills": ["python", "machine learning", "statistics", "pandas", "numpy", "data science"],
        "advanced_skills": ["deep learning", "tensorflow", "pytorch", "nlp", "computer vision"],
        "tools": ["jupyter", "git", "sql", "tableau", "power bi"],
        "soft_skills": ["problem solving", "communication", "business acumen"],
        "experience_level": "Mid to Senior",
        "roadmap": [
            {"phase": "Foundation", "duration": "2-3 months", "topics": ["Python basics", "Statistics", "Linear Algebra", "Pandas", "NumPy"]},
            {"phase": "Core ML", "duration": "3-4 months", "topics": ["Supervised Learning", "Unsupervised Learning", "Feature Engineering", "Model Evaluation"]},
            {"phase": "Advanced", "duration": "4-6 months", "topics": ["Deep Learning", "NLP", "Computer Vision", "MLOps", "Production Deployment"]},
            {"phase": "Specialization", "duration": "Ongoing", "topics": ["Domain expertise", "Research papers", "Kaggle competitions", "Real projects"]}
        ],
        "resources": [
            {"name": "Coursera - Machine Learning by Andrew Ng", "url": "https://www.coursera.org/learn/machine-learning", "type": "Course"},
            {"name": "Fast.ai - Practical Deep Learning", "url": "https://www.fast.ai/", "type": "Course"},
            {"name": "Kaggle", "url": "https://www.kaggle.com/", "type": "Practice"},
            {"name": "Hands-On Machine Learning (Book)", "url": "https://www.oreilly.com/library/view/hands-on-machine-learning/9781492032632/", "type": "Book"}
        ]
    },
    "Data Analyst": {
        "core_skills": ["sql", "excel", "data analysis", "statistics", "python"],
        "advanced_skills": ["tableau", "power bi", "data visualization", "business intelligence"],
        "tools": ["excel", "sql", "tableau", "power bi", "python"],
        "soft_skills": ["analytical thinking", "communication", "attention to detail"],
        "experience_level": "Entry to Mid",
        "roadmap": [
            {"phase": "Foundation", "duration": "1-2 months", "topics": ["Excel advanced", "SQL basics", "Statistics fundamentals"]},
            {"phase": "Analysis Tools", "duration": "2-3 months", "topics": ["Tableau", "Power BI", "Python for analysis", "Data cleaning"]},
            {"phase": "Advanced", "duration": "3-4 months", "topics": ["Advanced SQL", "Statistical analysis", "A/B testing", "Dashboard design"]},
            {"phase": "Business Focus", "duration": "Ongoing", "topics": ["Domain knowledge", "Business metrics", "Storytelling with data"]}
        ],
        "resources": [
            {"name": "Mode Analytics SQL Tutorial", "url": "https://mode.com/sql-tutorial/", "type": "Tutorial"},
            {"name": "Tableau Public", "url": "https://public.tableau.com/", "type": "Practice"},
            {"name": "DataCamp", "url": "https://www.datacamp.com/", "type": "Platform"},
            {"name": "Storytelling with Data (Book)", "url": "http://www.storytellingwithdata.com/", "type": "Book"}
        ]
    },
    "Frontend Developer": {
        "core_skills": ["html", "css", "javascript", "react", "responsive design"],
        "advanced_skills": ["typescript", "nextjs", "state management", "performance optimization"],
        "tools": ["git", "webpack", "npm", "figma", "chrome devtools"],
        "soft_skills": ["creativity", "attention to detail", "user empathy"],
        "experience_level": "Entry to Senior",
        "roadmap": [
            {"phase": "Foundation", "duration": "2-3 months", "topics": ["HTML5", "CSS3", "JavaScript ES6+", "Responsive design"]},
            {"phase": "Framework", "duration": "3-4 months", "topics": ["React", "Component architecture", "State management", "Hooks"]},
            {"phase": "Advanced", "duration": "4-5 months", "topics": ["TypeScript", "Next.js", "Performance", "Testing", "Accessibility"]},
            {"phase": "Mastery", "duration": "Ongoing", "topics": ["Design systems", "Micro-frontends", "Web animations", "PWA"]}
        ],
        "resources": [
            {"name": "freeCodeCamp", "url": "https://www.freecodecamp.org/", "type": "Course"},
            {"name": "React Official Docs", "url": "https://react.dev/", "type": "Documentation"},
            {"name": "Frontend Mentor", "url": "https://www.frontendmentor.io/", "type": "Practice"},
            {"name": "JavaScript.info", "url": "https://javascript.info/", "type": "Tutorial"}
        ]
    },
    "Backend Developer": {
        "core_skills": ["python", "java", "nodejs", "sql", "rest api", "microservices"],
        "advanced_skills": ["system design", "distributed systems", "caching", "message queues"],
        "tools": ["git", "docker", "postman", "databases", "redis"],
        "soft_skills": ["problem solving", "system thinking", "collaboration"],
        "experience_level": "Entry to Senior",
        "roadmap": [
            {"phase": "Foundation", "duration": "2-3 months", "topics": ["Programming language", "Data structures", "Algorithms", "SQL"]},
            {"phase": "Web Development", "duration": "3-4 months", "topics": ["REST APIs", "Authentication", "Databases", "Framework (Django/Spring/Express)"]},
            {"phase": "Advanced", "duration": "4-6 months", "topics": ["Microservices", "System design", "Caching", "Message queues", "Security"]},
            {"phase": "Architecture", "duration": "Ongoing", "topics": ["Distributed systems", "Scalability", "Performance", "Cloud services"]}
        ],
        "resources": [
            {"name": "System Design Primer", "url": "https://github.com/donnemartin/system-design-primer", "type": "Guide"},
            {"name": "FastAPI Documentation", "url": "https://fastapi.tiangolo.com/", "type": "Documentation"},
            {"name": "LeetCode", "url": "https://leetcode.com/", "type": "Practice"},
            {"name": "Designing Data-Intensive Applications (Book)", "url": "https://dataintensive.net/", "type": "Book"}
        ]
    },
    "Full Stack Developer": {
        "core_skills": ["javascript", "react", "nodejs", "sql", "rest api", "html", "css"],
        "advanced_skills": ["typescript", "microservices", "cloud", "devops", "system design"],
        "tools": ["git", "docker", "aws", "mongodb", "postgresql"],
        "soft_skills": ["versatility", "quick learning", "problem solving"],
        "experience_level": "Mid to Senior",
        "roadmap": [
            {"phase": "Frontend", "duration": "3-4 months", "topics": ["HTML/CSS/JS", "React", "State management", "Responsive design"]},
            {"phase": "Backend", "duration": "3-4 months", "topics": ["Node.js/Python", "REST APIs", "Databases", "Authentication"]},
            {"phase": "Integration", "duration": "2-3 months", "topics": ["Full stack apps", "Deployment", "CI/CD", "Testing"]},
            {"phase": "Advanced", "duration": "Ongoing", "topics": ["System design", "Microservices", "Cloud", "Performance", "Security"]}
        ],
        "resources": [
            {"name": "The Odin Project", "url": "https://www.theodinproject.com/", "type": "Course"},
            {"name": "Full Stack Open", "url": "https://fullstackopen.com/", "type": "Course"},
            {"name": "MDN Web Docs", "url": "https://developer.mozilla.org/", "type": "Documentation"},
            {"name": "GitHub", "url": "https://github.com/", "type": "Practice"}
        ]
    },
    "DevOps Engineer": {
        "core_skills": ["linux", "docker", "kubernetes", "ci cd", "aws", "terraform"],
        "advanced_skills": ["infrastructure as code", "monitoring", "security", "automation"],
        "tools": ["jenkins", "gitlab", "ansible", "prometheus", "grafana"],
        "soft_skills": ["automation mindset", "collaboration", "problem solving"],
        "experience_level": "Mid to Senior",
        "roadmap": [
            {"phase": "Foundation", "duration": "2-3 months", "topics": ["Linux", "Networking", "Scripting (Bash/Python)", "Git"]},
            {"phase": "Containerization", "duration": "2-3 months", "topics": ["Docker", "Container orchestration", "Kubernetes basics"]},
            {"phase": "CI/CD", "duration": "3-4 months", "topics": ["Jenkins/GitLab CI", "Automated testing", "Deployment pipelines"]},
            {"phase": "Cloud & IaC", "duration": "Ongoing", "topics": ["AWS/Azure/GCP", "Terraform", "Monitoring", "Security", "SRE practices"]}
        ],
        "resources": [
            {"name": "DevOps Roadmap", "url": "https://roadmap.sh/devops", "type": "Guide"},
            {"name": "Kubernetes Documentation", "url": "https://kubernetes.io/docs/", "type": "Documentation"},
            {"name": "AWS Training", "url": "https://aws.amazon.com/training/", "type": "Course"},
            {"name": "The Phoenix Project (Book)", "url": "https://itrevolution.com/product/the-phoenix-project/", "type": "Book"}
        ]
    },
    "AI Engineer": {
        "core_skills": ["python", "deep learning", "tensorflow", "pytorch", "machine learning"],
        "advanced_skills": ["computer vision", "nlp", "reinforcement learning", "model optimization"],
        "tools": ["jupyter", "git", "cuda", "mlflow", "wandb"],
        "soft_skills": ["research mindset", "experimentation", "mathematical thinking"],
        "experience_level": "Mid to Senior",
        "roadmap": [
            {"phase": "ML Foundation", "duration": "3-4 months", "topics": ["Python", "ML algorithms", "Statistics", "Linear algebra"]},
            {"phase": "Deep Learning", "duration": "4-5 months", "topics": ["Neural networks", "CNNs", "RNNs", "Transformers", "PyTorch/TensorFlow"]},
            {"phase": "Specialization", "duration": "4-6 months", "topics": ["Computer Vision OR NLP", "Model optimization", "Deployment"]},
            {"phase": "Advanced", "duration": "Ongoing", "topics": ["Research papers", "State-of-art models", "MLOps", "Production AI"]}
        ],
        "resources": [
            {"name": "Deep Learning Specialization", "url": "https://www.coursera.org/specializations/deep-learning", "type": "Course"},
            {"name": "Papers with Code", "url": "https://paperswithcode.com/", "type": "Research"},
            {"name": "Hugging Face", "url": "https://huggingface.co/", "type": "Platform"},
            {"name": "Deep Learning (Book)", "url": "https://www.deeplearningbook.org/", "type": "Book"}
        ]
    }
}


def train_and_save_model():
    """Train the model and save it"""
    texts = [x[0] for x in data]
    labels = [x[1] for x in data]

    vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
    X = vectorizer.fit_transform(texts)

    model = LogisticRegression(max_iter=1000, C=1.0)
    model.fit(X, labels)

    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    
    return model, vectorizer


def load_model():
    """Load the trained model"""
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        return model, vectorizer
    else:
        return train_and_save_model()


model, vectorizer = load_model()


def predict_career_with_confidence(skills: List[str]) -> List[Dict]:
    """
    Predict career roles with confidence percentages
    Returns top 5 predictions with confidence scores
    """
    if isinstance(skills, list):
        text = " ".join(skills)
    else:
        text = str(skills)
    
    X_test = vectorizer.transform([text])
    
    # Get probability scores for all classes
    probabilities = model.predict_proba(X_test)[0]
    classes = model.classes_
    
    # Create list of predictions with confidence
    predictions = []
    for i, prob in enumerate(probabilities):
        predictions.append({
            "role": classes[i],
            "confidence": round(float(prob * 100), 2),
            "match_percentage": round(float(prob * 100), 1)
        })
    
    # Sort by confidence and return top 5
    predictions.sort(key=lambda x: x["confidence"], reverse=True)
    return predictions[:5]


def analyze_skill_gap(user_skills: List[str], target_role: str) -> Dict:
    """
    Analyze skill gap between user's current skills and target role requirements
    """
    if target_role not in ROLE_REQUIREMENTS:
        return {"error": "Role not found in database"}
    
    requirements = ROLE_REQUIREMENTS[target_role]
    user_skills_lower = [skill.lower() for skill in user_skills]
    
    # Check core skills
    core_skills = requirements["core_skills"]
    has_core = [skill for skill in core_skills if skill in user_skills_lower]
    missing_core = [skill for skill in core_skills if skill not in user_skills_lower]
    
    # Check advanced skills
    advanced_skills = requirements["advanced_skills"]
    has_advanced = [skill for skill in advanced_skills if skill in user_skills_lower]
    missing_advanced = [skill for skill in advanced_skills if skill not in user_skills_lower]
    
    # Check tools
    tools = requirements["tools"]
    has_tools = [tool for tool in tools if tool in user_skills_lower]
    missing_tools = [tool for tool in tools if tool not in user_skills_lower]
    
    # Calculate readiness score
    core_score = (len(has_core) / len(core_skills)) * 100 if core_skills else 0
    advanced_score = (len(has_advanced) / len(advanced_skills)) * 100 if advanced_skills else 0
    tools_score = (len(has_tools) / len(tools)) * 100 if tools else 0
    
    overall_readiness = (core_score * 0.5 + advanced_score * 0.3 + tools_score * 0.2)
    
    return {
        "target_role": target_role,
        "overall_readiness": round(overall_readiness, 1),
        "core_skills": {
            "has": has_core,
            "missing": missing_core,
            "score": round(core_score, 1)
        },
        "advanced_skills": {
            "has": has_advanced,
            "missing": missing_advanced,
            "score": round(advanced_score, 1)
        },
        "tools": {
            "has": has_tools,
            "missing": missing_tools,
            "score": round(tools_score, 1)
        },
        "soft_skills": requirements["soft_skills"],
        "experience_level": requirements["experience_level"]
    }


def get_role_roadmap(role: str) -> Dict:
    """Get detailed roadmap and resources for a specific role"""
    if role not in ROLE_REQUIREMENTS:
        return {"error": "Role not found"}
    
    return {
        "role": role,
        "roadmap": ROLE_REQUIREMENTS[role]["roadmap"],
        "resources": ROLE_REQUIREMENTS[role]["resources"],
        "requirements": {
            "core_skills": ROLE_REQUIREMENTS[role]["core_skills"],
            "advanced_skills": ROLE_REQUIREMENTS[role]["advanced_skills"],
            "tools": ROLE_REQUIREMENTS[role]["tools"],
            "soft_skills": ROLE_REQUIREMENTS[role]["soft_skills"]
        },
        "experience_level": ROLE_REQUIREMENTS[role]["experience_level"]
    }


def get_all_roles_list() -> List[str]:
    """Get list of all available roles"""
    return list(ROLE_REQUIREMENTS.keys())
