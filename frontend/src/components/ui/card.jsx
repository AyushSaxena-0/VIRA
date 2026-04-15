import { cn } from "@/lib/utils";

export function Card({ className, children }) {
  return <section className={cn("glass-panel rounded-[28px] p-5", className)}>{children}</section>;
}
