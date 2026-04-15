import { create } from "zustand";
import {
  analyzeResume,
  evaluateInterview,
  fetchAiInsights,
  fetchDashboardData,
  fetchSkillGap,
  login,
} from "@/lib/api";

export const useAppStore = create((set) => ({
  user: null,
  dashboard: null,
  aiInsights: [],
  skillGap: null,
  resumeAnalysis: null,
  interviewEvaluation: null,
  loading: {
    dashboard: false,
    resume: false,
    interview: false,
  },
  error: null,
  theme: localStorage.getItem("vira_theme") || "light",
  async initialize() {
    set((state) => ({
      loading: { ...state.loading, dashboard: true },
      error: null,
    }));
    try {
      const auth = await login("student@vira.ai", "Password@123");
      const [dashboard, insights, skillGap] = await Promise.all([
        fetchDashboardData(),
        fetchAiInsights(),
        fetchSkillGap(),
      ]);
      set({
        user: auth.user,
        dashboard,
        aiInsights: insights.insights,
        skillGap,
        loading: { dashboard: false, resume: false, interview: false },
      });
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, dashboard: false },
      }));
    }
  },
  async uploadResume(file) {
    set((state) => ({ loading: { ...state.loading, resume: true }, error: null }));
    try {
      const resumeAnalysis = await analyzeResume(file);
      set((state) => ({
        resumeAnalysis,
        loading: { ...state.loading, resume: false },
      }));
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, resume: false },
      }));
    }
  },
  async runInterviewEvaluation(payload) {
    set((state) => ({ loading: { ...state.loading, interview: true }, error: null }));
    try {
      const interviewEvaluation = await evaluateInterview(payload);
      set((state) => ({
        interviewEvaluation,
        loading: { ...state.loading, interview: false },
      }));
    } catch (error) {
      set((state) => ({
        error: error.message,
        loading: { ...state.loading, interview: false },
      }));
    }
  },
  setTheme(theme) {
    localStorage.setItem("vira_theme", theme);
    set({ theme });
  },
}));
