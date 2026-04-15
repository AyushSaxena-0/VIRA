import { motion } from "framer-motion";
import { AIInsights } from "@/components/ai-insights";
import { Charts } from "@/components/charts";
import { InterviewPanel } from "@/components/interview-panel";
import { MetricCard } from "@/components/metric-card";
import { ResumeAnalysis } from "@/components/resume-analysis";
import { SkeletonCard } from "@/components/skeleton-card";
import { SkillGap } from "@/components/skill-gap";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";

function Dashboard() {
  const dashboard = useAppStore((state) => state.dashboard);
  const aiInsights = useAppStore((state) => state.aiInsights);
  const skillGap = useAppStore((state) => state.skillGap);
  const loading = useAppStore((state) => state.loading.dashboard);
  const error = useAppStore((state) => state.error);

  if (loading || !dashboard || !skillGap) {
    return (
      <div className="grid gap-5">
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
        <SkeletonCard />
        <SkeletonCard />
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <motion.section
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="grid gap-5 xl:grid-cols-[1.4fr_1fr]"
      >
        <Card className="overflow-hidden bg-gradient-to-br from-foreground to-slate-800 text-white">
          <p className="text-sm uppercase tracking-[0.24em] text-white/60">Placement Readiness Score</p>
          <div className="mt-6 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h2 className="font-display text-6xl font-bold">{dashboard.final_score}</h2>
              <p className="mt-3 max-w-xl text-sm text-white/70">
                VIRA combines resume, technical, communication, and project depth to estimate placement readiness.
              </p>
            </div>
            <div className="rounded-[28px] bg-white/10 p-5">
              <p className="text-sm text-white/70">Current target role</p>
              <p className="mt-2 text-2xl font-semibold">{dashboard.user.target_role}</p>
              <p className="mt-3 text-sm text-white/60">{dashboard.user.college} • {dashboard.user.graduation_year}</p>
            </div>
          </div>
        </Card>

        <AIInsights insights={aiInsights} />
      </motion.section>

      {error ? (
        <Card className="border-danger/30 bg-danger/10 text-danger">
          Unable to load live API data. Showing resilient fallback data. Last error: {error}
        </Card>
      ) : null}

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
        {dashboard.metrics.map((metric, index) => (
          <MetricCard key={metric.label} metric={metric} index={index} />
        ))}
      </section>

      <Charts dashboard={dashboard} />
      <ResumeAnalysis feedback={dashboard.resume_feedback} />
      <InterviewPanel dashboard={dashboard} />
      <SkillGap data={skillGap} />
    </div>
  );
}

export default Dashboard;
