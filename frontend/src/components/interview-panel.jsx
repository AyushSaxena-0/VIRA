import { Card } from "@/components/ui/card";

export function InterviewPanel({ dashboard }) {
  return (
    <Card>
      <div className="mb-5">
        <h3 className="font-display text-xl font-semibold">Interview Performance</h3>
        <p className="text-sm text-muted-foreground">Past mock interview scores and weak topic detection.</p>
      </div>
      <div className="grid gap-5 lg:grid-cols-2">
        <div className="space-y-3">
          {dashboard.interview_history.map((session) => (
            <div key={session.session} className="rounded-3xl border border-border bg-background/70 p-4">
              <div className="flex items-center justify-between">
                <p className="font-semibold">{session.session}</p>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
                  {session.score}
                </span>
              </div>
              <p className="mt-2 text-sm text-muted-foreground">{session.focus_area}</p>
            </div>
          ))}
        </div>
        <div className="rounded-[28px] bg-muted p-5">
          <p className="text-sm uppercase tracking-[0.22em] text-muted-foreground">Weak topics detected</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {dashboard.weak_topics.map((topic) => (
              <span key={topic} className="rounded-full bg-danger/10 px-3 py-2 text-sm font-medium text-danger">
                {topic}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}
