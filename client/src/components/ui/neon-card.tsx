// ============================================================
// NeonCard - Reusable cyberpunk card component
// ============================================================
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface NeonCardProps {
  children: ReactNode;
  className?: string;
  variant?: "default" | "green" | "cyan" | "magenta" | "amber";
  glow?: boolean;
}

export function NeonCard({ children, className, variant = "default", glow = false }: NeonCardProps) {
  const variants = {
    default: "neon-border",
    green: "neon-border",
    cyan: "neon-border-cyan",
    magenta: "neon-border-magenta",
    amber: "border border-[#ffaa00]/40 shadow-[0_0_5px_rgba(255,170,0,0.2)]",
  };

  return (
    <div className={cn(
      "glass rounded-xl p-6",
      variants[variant],
      glow && "animate-[glow-breathe_3s_ease-in-out_infinite]",
      className
    )}>
      {children}
    </div>
  );
}
