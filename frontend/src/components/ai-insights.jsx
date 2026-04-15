import { BrainCircuit } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";

const priorityStyles = {
  high: "bg-danger/15 text-danger",
  medium: "bg-warning/15 text-warning",
  low: "bg-success/15 text-success",
};

export function AIInsights({ insights }) {
  return (
    <Card>
      <div className="mb-5 flex items-center gap-3">
        <div className="rounded-2xl bg-primary/10 p-3 text-primary">
          <BrainCircuit className="h-5 w-5" />
        </div>
        <div>
          <h3 className="font-display text-xl font-semibold">AI Insights Panel</h3>
          <p className="text-sm text-muted-foreground">LLM-generated feedback across skills, resume, and placement readiness.</p>
        </div>
      </div>
      <div className="space-y-3">
        {insights.map((insight) => (
          <div key={insight.title} className="rounded-3xl border border-border bg-background/70 p-4">
            <div className="mb-2 flex items-center justify-between gap-3">
              <p className="font-semibold">{insight.title}</p>
              <Badge className={priorityStyles[insight.priority]}>{insight.priority}</Badge>
            </div>
            <p className="text-sm leading-6 text-muted-foreground">{insight.detail}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
