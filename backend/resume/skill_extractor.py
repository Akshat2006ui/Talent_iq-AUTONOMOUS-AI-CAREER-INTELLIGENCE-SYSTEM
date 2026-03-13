import re

# Skills Database
skills_db = [
    # Programming Languages
    "python", "java", "c", "c++", "c#", "javascript", "typescript", "go", "rust", "r", "matlab", "scala", "kotlin", "swift",
    # Web Development
    "html", "css", "react", "angular", "vue", "nodejs", "express", "django", "flask", "spring boot", "bootstrap", "tailwind",
    # Databases
    "sql", "mysql", "postgresql", "mongodb", "sqlite", "oracle", "firebase", "redis", "cassandra",
    # Data Science
    "data science", "data analysis", "data visualization", "statistics", "pandas", "numpy", "matplotlib", "seaborn", "excel", "power bi", "tableau",
    # Machine Learning
    "machine learning", "deep learning", "supervised learning", "unsupervised learning", "reinforcement learning",
    # ML Libraries
    "scikit-learn", "tensorflow", "keras", "pytorch", "xgboost", "lightgbm",
    # NLP
    "natural language processing", "nlp", "text mining", "sentiment analysis", "spacy", "nltk", "transformers",
    # Big Data
    "hadoop", "spark", "pyspark", "kafka", "hive", "hbase",
    # Cloud
    "aws", "azure", "google cloud", "gcp", "cloud computing",
    # DevOps
    "docker", "kubernetes", "jenkins", "ci/cd", "terraform", "ansible",
    # AI
    "artificial intelligence", "computer vision", "image processing", "object detection", "chatbot development",
    # Software Engineering
    "data structures", "algorithms", "system design", "object oriented programming", "oop",
    # Mobile Development
    "android", "flutter", "react native", "ios",
    # Tools
    "git", "github", "gitlab", "bitbucket", "jira", "linux", "bash", "shell scripting",
    # Frameworks
    "spring", "hibernate", "django rest framework", "fastapi", "pydantic",
    # Testing
    "junit", "pytest", "mocha", "jest", "cypress",
    # Methodologies
    "agile", "scrum", "kanban", "tdd", "bdd"
]


def extract_skills(text):
    """Extract skills from text"""
    if not text:
        return []
    
    text = text.lower()
    detected_skills = []
    
    for skill in skills_db:
        # Use word boundaries to match exact skills
        pattern = r'\b' + re.escape(skill.lower()) + r'\b'
        if re.search(pattern, text):
            detected_skills.append(skill)
    
    # Remove duplicates while preserving order
    seen = set()
    unique_skills = []
    for skill in detected_skills:
        if skill not in seen:
            seen.add(skill)
            unique_skills.append(skill)
    
    return unique_skills


def extract_skills_from_pdf(file_path):
    """Extract text from PDF and then extract skills"""
    try:
        import pdfplumber
        with pdfplumber.open(file_path) as pdf:
            text = ""
            for page in pdf.pages:
                content = page.extract_text()
                if content:
                    text += content
        return extract_skills(text)
    except Exception as e:
        return {"error": f"Failed to parse PDF: {str(e)}"}
