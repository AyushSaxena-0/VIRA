import json
from typing import Any
from urllib import error, request

from app.core.config import get_settings


def ollama_available() -> bool:
    settings = get_settings()
    try:
        req = request.Request(f"{settings.ollama_base_url}/api/tags", method="GET")
        with request.urlopen(req, timeout=5) as response:
            return response.status == 200
    except (error.URLError, TimeoutError):
        return False


def generate_json(prompt: str) -> dict[str, Any] | None:
    settings = get_settings()
    try:
        for endpoint, payload in (
            (
                "/api/chat",
                {
                    "model": settings.ollama_model,
                    "messages": [{"role": "user", "content": prompt}],
                    "stream": False,
                    "format": "json",
                },
            ),
            (
                "/api/generate",
                {
                    "model": settings.ollama_model,
                    "prompt": prompt,
                    "stream": False,
                    "format": "json",
                },
            ),
        ):
            body = json.dumps(payload).encode("utf-8")
            req = request.Request(
                f"{settings.ollama_base_url}{endpoint}",
                data=body,
                headers={"Content-Type": "application/json"},
                method="POST",
            )
            try:
                with request.urlopen(req, timeout=settings.ollama_timeout_seconds) as response:
                    data = json.loads(response.read().decode("utf-8"))
                    raw_response = data.get("response")
                    if raw_response is None:
                        raw_response = data.get("message", {}).get("content", "{}")
                    try:
                        return json.loads(raw_response)
                    except json.JSONDecodeError:
                        start = raw_response.find("{")
                        end = raw_response.rfind("}")
                        if start != -1 and end != -1 and end > start:
                            return json.loads(raw_response[start : end + 1])
            except error.HTTPError as exc:
                if exc.code != 404:
                    return None
                continue
        return None
    except (error.URLError, TimeoutError, json.JSONDecodeError):
        return None
