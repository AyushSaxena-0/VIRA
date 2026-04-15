import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-2xl text-sm font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40 disabled:pointer-events-none disabled:opacity-60",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-primary/20 hover:-translate-y-0.5 hover:shadow-xl",
        secondary: "bg-muted text-foreground hover:bg-muted/80",
        ghost: "text-foreground hover:bg-muted/70",
        outline: "border border-border bg-card hover:bg-muted/60",
      },
      size: {
        default: "h-11 px-4",
        sm: "h-9 rounded-xl px-3",
        lg: "h-12 px-6",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

export function Button({ className, variant, size, ...props }) {
  return <button className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
