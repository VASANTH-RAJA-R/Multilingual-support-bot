from flask import Flask, request, jsonify
from flask_cors import CORS
import openai
import os

# Load API Key (set in environment variable)
openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)
CORS(app)  # allow frontend (React) to connect

# 🔹 Health check route
@app.route("/", methods=["GET"])
def home():
    return jsonify({"message": "Multilingual Support Bot Backend is running ✅"})

# 🔹 Chat route (text input)
@app.route("/chat", methods=["POST"])
def chat():
    try:
        data = request.json
        user_input = data.get("message", "")
        language = data.get("language", "en")

        if not user_input:
            return jsonify({"error": "Message is required"}), 400

        # GPT call
        response = openai.ChatCompletion.create(
            model="gpt-4",
            messages=[
                {"role": "system", "content": f"You are a helpful customer support assistant. Reply in {language}."},
                {"role": "user", "content": user_input}
            ]
        )

        bot_reply = response["choices"][0]["message"]["content"].strip()

        return jsonify({"reply": bot_reply})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 🔹 Voice route (Whisper speech-to-text)
@app.route("/voice", methods=["POST"])
def voice():
    try:
        # Get uploaded audio file
        audio_file = request.files["file"]

        # Whisper transcription
        transcript = openai.Audio.transcribe("whisper-1", audio_file)

        return jsonify({"transcript": transcript["text"]})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
