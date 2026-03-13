@echo off
echo Starting TalentIQ Backend...
cd backend
python -m venv venv
venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
pause