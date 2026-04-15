import { useState } from "react";
import { Mic, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useAppStore } from "@/store/useAppStore";

const initialPrompt = {
  role: "AI/ML Engineer",
  question: "Describe a project where you optimized a machine learning system for production.",
  answer:
    "I built a FastAPI inference service for a resume classifier, optimized latency with async batching, and worked with the team to deploy it using Docker and monitoring dashboards.",
};

function Interview() {
  const [form, setForm] = useState(initialPrompt);
  const evaluation = useAppStore((state) => state.interviewEvaluation);
  const loading = useAppStore((state) => state.loading.interview);
  const runInterviewEvaluation = useAppStore((state) => state.runInterviewEvaluation);

  const handleSubmit = async (event) => {
    event.preventDefault();
    await runInterviewEvaluation(form);
  };

  return (
    <div className="grid gap-5 xl:grid-cols-[1.15fr_1fr]">
      <Card>
        <div className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-primary/10 p-3 text-primary">
            <Mic className="h-5 w-5" />
          </div>
          <div>
            <h2 className="font-display text-3xl font-bold">AI Interview Simulator</h2>
            <p className="text-sm text-muted-foreground">Practice technical and behavioral answers with instant AI scoring.</p>
          </div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Target role</span>
            <input
              className="w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none ring-0"
              value={form.role}
              onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Question</span>
            <textarea
              className="min-h-28 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none"
              value={form.question}
              onChange={(event) => setForm((current) => ({ ...current, question: event.target.value }))}
            />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-semibold">Your answer</span>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-border bg-background px-4 py-3 outline-none"
              value={form.answer}
              onChange={(event) => setForm((current) => ({ ...current, answer: event.target.value }))}
            />
          </label>
          <Button type="submit" disabled={loading}>
            {loading ? "Evaluating..." : "Evaluate Answer"}
          </Button>
        </form>
      </Card>

      <Card>
        <div className="mb-5 flex items-center gap-3">
          <div className="rounded-2xl bg-accent p-3 text-accent-foreground">
            <Sparkles className="h-5 w-5" />
          </div>
          <div>
            <h3 className="font-display text-2xl font-semibold">Evaluation Summary</h3>
            <p className="text-sm text-muted-foreground">Sentiment, keyword scoring, and communication feedback.</p>
          </div>
        </div>

        {!evaluation ? (
          <p className="text-muted-foreground">Run an interview simulation to view scores and coaching suggestions.</p>
        ) : (
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">Overall</p>
                <p className="mt-2 font-display text-4xl font-bold">{evaluation.score}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">Communication</p>
                <p className="mt-2 font-display text-4xl font-bold">{evaluation.communication}</p>
              </div>
              <div className="rounded-3xl bg-muted p-4">
                <p className="text-sm text-muted-foreground">Confidence</p>
                <p className="mt-2 font-display text-4xl font-bold">{evaluation.confidence}</p>
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">Matched interview signals</p>
              <div className="flex flex-wrap gap-2">
                {evaluation.keyword_matches.map((item) => (
                  <span key={item} className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            <div>
              <p className="mb-3 text-sm font-semibold text-muted-foreground">AI feedback</p>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {evaluation.feedback.map((item) => (
                  <li key={item} className="rounded-2xl border border-border bg-background/70 px-4 py-3">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
}

export default Interview;
