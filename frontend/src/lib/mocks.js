export const mockDashboard = {
  user: {
    full_name: "Aarav Mehta",
    email: "student@vira.ai",
    target_role: "AI/ML Engineer",
    college: "VIT Chennai",
    graduation_year: 2027,
  },
  final_score: 79,
  metrics: [
    { label: "Overall Score", value: 79, change: 5.2, trend: "up" },
    { label: "Resume Score", value: 82, change: 4.3, trend: "up" },
    { label: "Technical Score", value: 76, change: -1.4, trend: "down" },
    { label: "Communication Score", value: 71, change: 3.1, trend: "up" },
    { label: "Placement Readiness", value: 79, change: 6.8, trend: "up" },
  ],
  performance_over_time: [
    { week: "Week 1", overall: 58, technical: 55, communication: 49 },
    { week: "Week 2", overall: 63, technical: 60, communication: 54 },
    { week: "Week 3", overall: 69, technical: 66, communication: 61 },
    { week: "Week 4", overall: 74, technical: 71, communication: 68 },
    { week: "Week 5", overall: 79, technical: 76, communication: 71 },
  ],
  skill_distribution: [
    { skill: "DSA", score: 62 },
    { skill: "System Design", score: 70 },
    { skill: "Python", score: 84 },
    { skill: "Communication", score: 71 },
    { skill: "Projects", score: 85 },
    { skill: "Problem Solving", score: 78 },
  ],
  strength_vs_weakness: [
    { category: "Algorithms", strength: 64, weakness: 36 },
    { category: "Frontend", strength: 58, weakness: 42 },
    { category: "Backend", strength: 79, weakness: 21 },
    { category: "Communication", strength: 71, weakness: 29 },
  ],
  ai_insights: [
    {
      title: "You are weak in DSA",
      detail: "Graph and dynamic programming rounds are still the biggest score drop.",
      priority: "high",
    },
    {
      title: "Improve communication clarity",
      detail: "Tighter STAR responses will improve mock interview confidence.",
      priority: "medium",
    },
    {
      title: "Strong project portfolio",
      detail: "Your AI projects are strong enough to stand out in placement discussions.",
      priority: "low",
    },
  ],
  resume_feedback: {
    ats_score: 87,
    extracted_keywords: ["Python", "FastAPI", "OpenAI", "Docker", "React"],
    missing_skills: ["Kubernetes", "Redis", "CI/CD", "System Design"],
  },
  interview_history: [
    { session: "Mock Interview #1", score: 68, focus_area: "Behavioral" },
    { session: "Mock Interview #2", score: 74, focus_area: "Backend APIs" },
    { session: "Mock Interview #3", score: 79, focus_area: "Machine Learning" },
  ],
  weak_topics: ["Dynamic Programming", "Database Indexing", "Conflict Resolution Stories"],
  recommended_skills: [
    {
      skill: "Advanced DSA",
      priority: "high",
      action: "Solve 5 medium-to-hard problems per week.",
      resource: "LeetCode + NeetCode roadmap",
    },
    {
      skill: "System Design",
      priority: "medium",
      action: "Practice one scalable design case study weekly.",
      resource: "DDIA notes",
    },
    {
      skill: "Interview Communication",
      priority: "medium",
      action: "Record answers and tighten them to 90 seconds.",
      resource: "STAR worksheet",
    },
  ],
};

export const mockInsights = {
  generated_at: new Date().toISOString(),
  insights: mockDashboard.ai_insights,
};

export const mockSkillGap = {
  target_role: "AI/ML Engineer",
  current_fit_score: 78,
  recommended_skills: mockDashboard.recommended_skills,
};
