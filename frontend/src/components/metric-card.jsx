import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

export function MetricCard({ metric, index }) {
  const positive = metric.trend === "up";
  const TrendIcon = positive ? ArrowUpRight : ArrowDownRight;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07 }}
    >
      <Card className="relative overflow-hidden">
        <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl" />
        <p className="text-sm text-muted-foreground">{metric.label}</p>
        <div className="mt-4 flex items-end justify-between">
          <div>
            <p className="font-display text-4xl font-bold">{metric.value}</p>
            <p className="mt-1 text-xs text-muted-foreground">Updated from latest evaluation cycle</p>
          </div>
          <div
            className={`flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${
              positive
                ? "bg-success/15 text-success"
                : "bg-danger/15 text-danger"
            }`}
          >
            <TrendIcon className="h-3.5 w-3.5" />
            {Math.abs(metric.change)}%
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
