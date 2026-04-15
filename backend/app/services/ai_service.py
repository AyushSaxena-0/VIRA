from datetime import datetime, timezone

from app.models.schemas import (
    AiInsightsResponse,
    Insight,
    InterviewEvaluateRequest,
    InterviewEvaluateResponse,
    SkillGapRecommendation,
    SkillGapResponse,
)
from app.services.ollama_service import generate_json


def _fallback_insights() -> list[Insight]:
    return [
        Insight(
            title="You are weak in DSA",
            detail="Binary trees, DP, and graph traversal questions are still the biggest score drop.",
            priority="high",
        ),
        Insight(
            title="Improve communication clarity",
            detail="Use tighter introductions, then walk through examples with outcome-first phrasing.",
            priority="medium",
        ),
        Insight(
            title="Strong project portfolio",
            detail="Your real-world AI projects are advanced enough to support strong placement positioning.",
            priority="low",
        ),
    ]


def generate_ai_insights() -> AiInsightsResponse:
    prompt = """
You are VIRA, an AI placement readiness coach.
Return valid JSON only in this shape:
{
  "insights": [
    {"title": "string", "detail": "string", "priority": "high|medium|low"}
  ]
}

Generate exactly 3 concise insights for a student profile with:
- strong project portfolio
- improving communication
- weak DSA fundamentals
"""
    llm_response = generate_json(prompt)
    insights = []
    for item in (llm_response or {}).get("insights", []):
        priority = item.get("priority", "medium")
        if priority not in {"high", "medium", "low"}:
            priority = "medium"
        title = str(item.get("title", "")).strip()
        detail = str(item.get("detail", "")).strip()
        if title and detail:
            insights.append(Insight(title=title, detail=detail, priority=priority))

    return AiInsightsResponse(
        generated_at=datetime.now(timezone.utc).isoformat(),
        insights=insights or _fallback_insights(),
    )


def evaluate_interview(payload: InterviewEvaluateRequest) -> InterviewEvaluateResponse:
    prompt = f"""
You are VIRA, an interview evaluator.
Return valid JSON only in this shape:
{{
  "score": 0,
  "communication": 0,
  "confidence": 0,
  "sentiment": "positive",
  "keyword_matches": ["string"],
  "feedback": ["string"]
}}

Question: {payload.question}
Role: {payload.role}
Answer: {payload.answer}
"""
    llm_response = generate_json(prompt)
    if llm_response:
        try:
            return InterviewEvaluateResponse(
                score=max(0, min(100, int(llm_response.get("score", 75)))),
                communication=max(0, min(100, int(llm_response.get("communication", 75)))),
                confidence=max(0, min(100, int(llm_response.get("confidence", 75)))),
                sentiment=str(llm_response.get("sentiment", "neutral")),
                keyword_matches=[str(item) for item in llm_response.get("keyword_matches", [])][:8],
                feedback=[str(item) for item in llm_response.get("feedback", [])][:5],
            )
        except (TypeError, ValueError):
            pass

    keyword_bank = {
        "python": "Python",
        "api": "API design",
        "scale": "Scalability",
        "team": "Teamwork",
        "optimize": "Optimization",
    }
    normalized = payload.answer.lower()
    matches = [label for key, label in keyword_bank.items() if key in normalized]
    communication = min(92, 55 + len(payload.answer.split()) // 3)
    confidence = 68 + min(len(matches) * 6, 18)
    score = round((communication + confidence + (70 + len(matches) * 4)) / 3)

    feedback = [
        "Lead with the outcome before explaining your implementation.",
        "Quantify impact when describing your contributions.",
    ]
    if "team" not in normalized:
        feedback.append("Add one collaboration signal to make the answer feel more complete.")
    if "scale" not in normalized:
        feedback.append("Mention how the solution would behave at higher user volume.")

    return InterviewEvaluateResponse(
        score=score,
        communication=communication,
        confidence=confidence,
        sentiment="positive" if score >= 75 else "neutral",
        keyword_matches=matches,
        feedback=feedback,
    )


def get_skill_gap(target_role: str = "AI/ML Engineer") -> SkillGapResponse:
    prompt = f"""
You are VIRA, a placement skill gap analyzer.
Return valid JSON only in this shape:
{{
  "target_role": "string",
  "current_fit_score": 0,
  "recommended_skills": [
    {{
      "skill": "string",
      "priority": "high|medium|low",
      "action": "string",
      "resource": "string"
    }}
  ]
}}

Generate 3 role-specific recommendations for a student targeting: {target_role}
"""
    llm_response = generate_json(prompt)
    if llm_response:
        recommendations = []
        for item in llm_response.get("recommended_skills", []):
            priority = item.get("priority", "medium")
            if priority not in {"high", "medium", "low"}:
                priority = "medium"
            skill = str(item.get("skill", "")).strip()
            action = str(item.get("action", "")).strip()
            resource = str(item.get("resource", "")).strip()
            if skill and action and resource:
                recommendations.append(
                    SkillGapRecommendation(
                        skill=skill,
                        priority=priority,
                        action=action,
                        resource=resource,
                    )
                )
        if recommendations:
            return SkillGapResponse(
                target_role=str(llm_response.get("target_role", target_role)),
                current_fit_score=max(0, min(100, int(llm_response.get("current_fit_score", 78)))),
                recommended_skills=recommendations[:3],
            )

    return SkillGapResponse(
        target_role=target_role,
        current_fit_score=78,
        recommended_skills=[
            SkillGapRecommendation(
                skill="LLM Evaluation",
                priority="high",
                action="Build an automated eval harness for prompt quality and factuality.",
                resource="OpenAI eval patterns + prompt test cases",
            ),
            SkillGapRecommendation(
                skill="MLOps",
                priority="medium",
                action="Containerize one ML inference service and deploy it with CI/CD.",
                resource="Docker + GitHub Actions learning track",
            ),
            SkillGapRecommendation(
                skill="Behavioral Interviewing",
                priority="medium",
                action="Prepare 8 STAR stories that map to leadership, conflict, and ownership.",
                resource="Placement story bank template",
            ),
        ],
    )
