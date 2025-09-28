# Multilingual Support Bot 🤖💬
HCL GUVI – Sairam Hackathon 2025 Submission

## Problem Statement
Customer support in India faces challenges due to multiple languages, high query volume, and need for instant resolutions.  
Our solution: A GenAI-powered chatbot that supports text + voice queries in multiple Indian languages.

## Features
- Multilingual text & voice support (English + Hindi for MVP)
- GPT-4 powered contextual replies
- Whisper-based speech-to-text
- Escalation to human agent if query too complex
- Session history stored in MongoDB/Postgres

## Tech Stack
- **Backend:** Flask (Python)
- **AI Models:** GPT-4 (conversation), Whisper (speech-to-text)
- **Frontend:** React.js
- **Database:** MongoDB Atlas / PostgreSQL
- **Deployment:** Render (backend), Vercel (frontend)

## Installation & Setup
### Backend
```bash
cd backend
pip install -r requirements.txt
python app.py
