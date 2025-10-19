from flask import Flask, jsonify
from flask_cors import CORS  
import requests, random
import os

app = Flask(__name__)
CORS(app)  

def fetch_quote():
    try:
        res = requests.get("https://zenquotes.io/api/random", timeout=5)
        data = res.json()
        return {"quote": data[0]["q"], "author": data[0]["a"]}
    except:
        fallback = [
            {"quote": "Selv den viseste kan lære mer.", "author": "Ukjent"},
            {"quote": "Stillhet er en kilde til styrke.", "author": "Lao Tzu"},
        ]
        return random.choice(fallback)

@app.route("/quote")
def quote():
    return jsonify(fetch_quote())

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 5000))
    app.run(host="0.0.0.0", port=port)