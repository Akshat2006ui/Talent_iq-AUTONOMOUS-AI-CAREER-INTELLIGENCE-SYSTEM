from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.linear_model import LogisticRegression
import joblib
import os

# Model file paths
MODEL_PATH = os.path.join(os.path.dirname(__file__), "career_model.pkl")
VECTORIZER_PATH = os.path.join(os.path.dirname(__file__), "vectorizer.pkl")


# Training Dataset
data = [
    ("python machine learning pandas numpy data science", "Data Scientist"),
    ("python sql data analysis statistics excel", "Data Analyst"),
    ("java spring backend sql microservices", "Backend Developer"),
    ("html css javascript react frontend ui", "Frontend Developer"),
    ("python tensorflow deep learning computer vision", "AI Engineer"),
    ("aws docker kubernetes devops ci cd", "DevOps Engineer"),
    ("android kotlin mobile development", "Android Developer"),
    ("flutter dart mobile app development", "Mobile Developer"),
    ("nodejs express mongodb react fullstack", "Full Stack Developer"),
    ("c# asp.net mvc sql server", "DotNet Developer"),
    ("php laravel symfony mysql", "PHP Developer"),
    ("ruby rails postgresql", "Ruby Developer"),
    ("swift uikit core data ios", "iOS Developer"),
    ("kotlin android studio jetpack compose", "Android Developer"),
    ("react native javascript mobile", "Mobile Developer"),
    ("graphql rest api nodejs express", "Backend Developer"),
    ("sql nosql database design optimization", "Database Administrator"),
    ("linux bash python automation devops", "DevOps Engineer"),
    ("docker swarm kubernetes orchestration", "DevOps Engineer"),
    ("terraform cloudformation infrastructure", "DevOps Engineer"),
    ("agile scrum jira software development", "Software Engineer"),
    ("unit testing integration testing tdd", "QA Engineer"),
    ("selenium cypress end to end testing", "QA Engineer"),
    ("ui ux design figma adobe xd", "UI/UX Designer"),
    ("html5 css3 responsive design", "Frontend Developer"),
    ("typescript angular vue react", "Frontend Developer"),
    ("nextjs gatsby react server side", "Frontend Developer"),
    ("python django flask backend", "Backend Developer"),
    ("golang grpc microservices", "Backend Developer"),
    ("rust systems programming", "Systems Programmer"),
    ("embedded c c++ microcontrollers", "Embedded Developer"),
    ("blockchain ethereum smart contracts", "Blockchain Developer"),
    ("cybersecurity network security", "Security Engineer"),
    ("penetration testing ethical hacking", "Security Engineer"),
]


def train_and_save_model():
    """Train the model and save it to files"""
    texts = [x[0] for x in data]
    labels = [x[1] for x in data]

    # Convert text → numerical vectors
    vectorizer = TfidfVectorizer(max_features=1000, ngram_range=(1, 2))
    X = vectorizer.fit_transform(texts)

    # Train model
    model = LogisticRegression(max_iter=1000, C=1.0)
    model.fit(X, labels)

    # Save model and vectorizer
    joblib.dump(model, MODEL_PATH)
    joblib.dump(vectorizer, VECTORIZER_PATH)
    
    return model, vectorizer


def load_model():
    """Load the trained model and vectorizer"""
    if os.path.exists(MODEL_PATH) and os.path.exists(VECTORIZER_PATH):
        model = joblib.load(MODEL_PATH)
        vectorizer = joblib.load(VECTORIZER_PATH)
        return model, vectorizer
    else:
        # Train and save if not exists
        return train_and_save_model()


# Load model on import
model, vectorizer = load_model()


def predict_career(skills):
    """Predict career role based on skills"""
    if isinstance(skills, list):
        text = " ".join(skills)
    else:
        text = str(skills)
    
    X_test = vectorizer.transform([text])
    prediction = model.predict(X_test)
    
    return prediction[0]


def get_all_roles():
    """Get all available career roles"""
    return list(set([x[1] for x in data]))
