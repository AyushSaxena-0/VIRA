import { cn } from "@/lib/utils";

export function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full bg-accent px-3 py-1 text-xs font-semibold text-accent-foreground",
        className,
      )}
    >
      {children}
    </span>
  );
}
