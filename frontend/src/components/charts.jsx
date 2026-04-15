import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  PolarAngleAxis,
  PolarGrid,
  Radar,
  RadarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/card";

export function Charts({ dashboard }) {
  return (
    <div className="grid gap-5 xl:grid-cols-[1.6fr_1fr]">
      <Card className="overflow-hidden">
        <div className="mb-4 flex items-center justify-between">
          <div>
            <h3 className="font-display text-xl font-semibold">Performance over time</h3>
            <p className="text-sm text-muted-foreground">Track score improvements across mock rounds and resume updates.</p>
          </div>
        </div>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={dashboard.performance_over_time}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
              <XAxis dataKey="week" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="overall" stroke="#0ea5e9" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="technical" stroke="#f97316" strokeWidth={3} dot={false} />
              <Line type="monotone" dataKey="communication" stroke="#22c55e" strokeWidth={3} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card>
        <h3 className="font-display text-xl font-semibold">Skill distribution</h3>
        <p className="mb-4 text-sm text-muted-foreground">See where depth is compounding and where coaching should focus.</p>
        <div className="h-72">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart data={dashboard.skill_distribution}>
              <PolarGrid stroke="rgba(148,163,184,0.28)" />
              <PolarAngleAxis dataKey="skill" tick={{ fontSize: 12 }} />
              <Radar dataKey="score" fill="#0ea5e9" fillOpacity={0.35} stroke="#0ea5e9" />
              <Tooltip />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      <Card className="xl:col-span-2">
        <h3 className="font-display text-xl font-semibold">Strength vs weakness</h3>
        <p className="mb-4 text-sm text-muted-foreground">A quick readiness scan for interview prep and project emphasis.</p>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dashboard.strength_vs_weakness}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.16)" />
              <XAxis dataKey="category" stroke="currentColor" />
              <YAxis stroke="currentColor" />
              <Tooltip />
              <Legend />
              <Bar dataKey="strength" fill="#22c55e" radius={[10, 10, 0, 0]} />
              <Bar dataKey="weakness" fill="#ef4444" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
