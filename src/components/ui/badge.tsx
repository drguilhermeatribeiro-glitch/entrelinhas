import type { ComponentProps } from "react";
import { cn } from "@/lib/utils";

type BadgeProps = ComponentProps<"span"> & {
  variant?: "type" | "subject" | "outline";
};

export function Badge({
  className,
  variant = "subject",
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide uppercase",
        variant === "type" && "bg-accent/12 text-accent",
        variant === "subject" &&
          "bg-foreground/8 text-muted-foreground",
        variant === "outline" && "border border-border text-muted-foreground",
        className
      )}
      {...props}
    />
  );
}
