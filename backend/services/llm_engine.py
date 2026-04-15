import requests
import json

def analyze_resume(text):
    prompt = f"""
You are an AI resume analyzer.

STRICT RULES:
- Return ONLY valid JSON
- Do NOT add any explanation
- Do NOT write 'Here is the JSON'
- Output must start with {{ and end with }}

Format:

{{
  "strengths": [],
  "weaknesses": [],
  "missing_skills": [],
  "suggestions": [],
  "score": number (0-100)
}}

Analyze this resume:

{text}
"""

    try:
        response = requests.post(
            "http://localhost:11434/api/generate",
            json={
                "model": "llama3",
                "prompt": prompt,
                "stream": False
            }
        )

        response_text = response.json().get("response", "")

        # Extract JSON
        start = response_text.find("{")
        if start == -1:
            return {"raw_output": response_text}

        clean_json = response_text[start:]

        # Fix broken JSON
        open_braces = clean_json.count("{")
        close_braces = clean_json.count("}")

        if close_braces < open_braces:
            clean_json += "}" * (open_braces - close_braces)

        # Convert to dict
        try:
            return json.loads(clean_json)
        except:
            return {"raw_output": response_text}

    except Exception as e:
        return {"error": str(e)}