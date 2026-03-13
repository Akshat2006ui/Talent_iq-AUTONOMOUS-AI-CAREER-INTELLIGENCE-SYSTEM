# Google Gemini API Setup Guide

## How to Get Your Gemini API Key

1. **Visit Google AI Studio**
   - Go to [https://makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
   - Or visit [https://aistudio.google.com/](https://aistudio.google.com/)

2. **Sign In**
   - Sign in with your Google account

3. **Create API Key**
   - Click on "Get API Key" or "Create API Key"
   - Select "Create API key in new project" or choose an existing project
   - Copy the generated API key

4. **Add to Your Project**
   - Open the `.env` file in the root directory of the project
   - Replace `your_gemini_api_key_here` with your actual API key:
   ```
   GEMINI_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
   ```

5. **Restart the Backend**
   - Stop the backend server (Ctrl+C)
   - Start it again: `uvicorn main:app --reload`

## Features Enabled with Gemini

- ✨ AI-powered resume analysis
- 🎯 Intelligent career recommendations
- 💡 Personalized career growth suggestions
- 📊 Experience level detection
- 🔍 Advanced skills extraction

## Fallback Behavior

If the Gemini API key is not configured or there's an error:
- The system will fall back to traditional ML-based analysis
- Basic skills extraction and career prediction will still work
- You'll see "Traditional analysis used" instead of "AI Powered"

## API Limits

- Free tier: 60 requests per minute
- For production use, consider upgrading to a paid plan

## Troubleshooting

**Error: "Gemini API key not configured"**
- Make sure the `.env` file exists in the root directory
- Check that `GEMINI_API_KEY` is set correctly
- Restart the backend server

**Error: "Gemini API error"**
- Verify your API key is valid
- Check your internet connection
- Ensure you haven't exceeded the rate limit
