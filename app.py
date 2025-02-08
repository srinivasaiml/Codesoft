from flask import Flask, request, jsonify
import groq
from flask_cors import CORS  # To allow frontend requests

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes (or customize the origin as needed)

# Replace with your actual Groq API key
client = groq.Client(api_key="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")

@app.route("/chat", methods=["POST"])
def chat():
    try:
        # Get the user message from the incoming request
        data = request.json
        user_message = data.get("message", "").lower().strip()

        # If no message is received, return an error response
        if not user_message:
            return jsonify({"response": "No message received."}), 400

        # Check if the user wants to consult a doctor
        if "consult a doctor" in user_message or "see a doctor" in user_message:
            return jsonify({"response": "Would you like to book an appointment? (yes/no)"})

        if user_message in ["yes", "yes please", "sure"]:
            return jsonify({"response": "redirect"})  # Signal frontend to redirect

        # Make the API call to Groq
        response = client.chat.completions.create(
            model="llama3-8b-8192",
            messages=[
                {"role": "system", "content": "You are a helpful AI health assistant bot."},
                {"role": "user", "content": user_message}
            ]
        )

        response_text = response.choices[0].message.content.strip().replace("\n", "<br>")
        return jsonify({"response": response_text})

    except Exception as e:
        print(f"Error: {e}")
        return jsonify({"response": "Sorry, something went wrong. Please try again later."}), 500

if __name__ == "__main__":
    app.run(debug=True)
