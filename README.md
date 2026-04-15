# VIRA

VIRA (Virtual Intelligent Review Assistant) is a production-ready AI-powered student evaluation and placement readiness platform with a modern React dashboard and a FastAPI backend.
<img width="1915" height="835" alt="Screenshot 2026-04-15 210535" src="https://github.com/user-attachments/assets/b8591484-7d74-49e8-aa6f-1165869535cf" />


## Folder Structure

```text
VIRA/
├── backend/
│   ├── app/
│   │   ├── api/
│   │   │   ├── deps.py
│   │   │   └── routes/
│   │   │       ├── auth.py
│   │   │       ├── dashboard.py
│   │   │       ├── insights.py
│   │   │       ├── interview.py
│   │   │       └── resume.py
│   │   ├── core/
│   │   │   ├── config.py
│   │   │   └── security.py
│   │   ├── models/
│   │   │   └── schemas.py
│   │   ├── services/
│   │   │   ├── ai_service.py
│   │   │   ├── dashboard_service.py
│   │   │   └── resume_service.py
│   │   └── main.py
│   ├── .env.example
│   ├── Dockerfile
│   ├── main.py
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/
│   │   │   ├── ui/
│   │   │   ├── ai-insights.jsx
│   │   │   ├── charts.jsx
│   │   │   ├── interview-panel.jsx
│   │   │   ├── metric-card.jsx
│   │   │   ├── resume-analysis.jsx
│   │   │   ├── skeleton-card.jsx
│   │   │   ├── skill-gap.jsx
│   │   │   └── theme-toggle.jsx
│   │   ├── lib/
│   │   ├── pages/
│   │   ├── store/
│   │   ├── App.jsx
│   │   ├── index.css
│   │   └── main.jsx
│   ├── .env.example
│   ├── Dockerfile
│   ├── package.json
│   ├── postcss.config.js
│   ├── tailwind.config.js
│   └── vite.config.js
├── docker-compose.yml
└── README.md
```

## Frontend Highlights

- React + Vite dashboard with responsive sidebar, navbar, metrics, charts, AI insight cards, resume feedback, and skill gap recommendations
- Tailwind CSS styling with reusable ShadCN-style `ui` components
- Zustand store for app state and theme management
- Framer Motion transitions and Recharts analytics
- Built-in retry logic and resilient mock fallbacks if the API is unavailable

## Backend Highlights

- FastAPI modular architecture with microservice-friendly route and service separation
- JWT-based demo authentication
- Secure PDF-only upload validation for resume analysis
- Role-ready endpoints for dashboard data, AI insights, skill gap analysis, and interview evaluation
- Environment-driven configuration and Docker support

## API Endpoints

- `POST /api/v1/auth/login`
- `GET /api/v1/dashboard-data`
- `POST /api/v1/analyze-resume`
- `POST /api/v1/interview-evaluate`
- `GET /api/v1/skill-gap`
- `GET /api/v1/ai-insights`

## Sample API Responses

### `GET /api/v1/dashboard-data`

```json
{
  "final_score": 79,
  "metrics": [
    { "label": "Overall Score", "value": 79, "change": 5.2, "trend": "up" }
  ],
  "ai_insights": [
    {
      "title": "DSA needs focused repetition",
      "detail": "Array, graph, and dynamic programming rounds still drag your interview score.",
      "priority": "high"
    }
  ]
}
```

### `POST /api/v1/analyze-resume`

```json
{
  "overall_score": 82,
  "ats_score": 87,
  "extracted_keywords": ["Python", "Fastapi", "Docker"],
  "missing_skills": ["Kubernetes", "Redis", "CI/CD", "System Design"],
  "strengths": [
    "Role-aligned technical stack detected"
  ],
  "recommendations": [
    "Add measurable impact for each project or internship bullet"
  ],
  "summary": "VIRA detected a technically promising resume."
}
```

### `POST /api/v1/interview-evaluate`

```json
{
  "score": 81,
  "communication": 78,
  "confidence": 86,
  "sentiment": "positive",
  "keyword_matches": ["Python", "API design", "Scalability"],
  "feedback": [
    "Lead with the outcome before explaining your implementation."
  ]
}
```

## Run Locally

### Frontend

```bash
cd frontend
cp .env.example .env
npm install
npm run dev
```

### Backend

```bash
cd backend
python -m venv .venv
.venv\Scripts\activate
pip install -r requirements.txt
copy .env.example .env
uvicorn main:app --reload
```

## Docker Deployment

```bash
docker compose up --build
```

Services:

- Frontend: [http://localhost:5173](http://localhost:5173)
- Backend: [http://localhost:8000](http://localhost:8000)
- PostgreSQL: `localhost:5432`

## Production Notes

- Replace the demo JWT secret before deployment.
- VIRA now prefers a local Ollama model through `OLLAMA_BASE_URL` and `OLLAMA_MODEL`, with heuristic fallbacks if the model is unavailable.
- Add persistent user, interview, and report tables through SQLAlchemy migrations for full production persistence.
