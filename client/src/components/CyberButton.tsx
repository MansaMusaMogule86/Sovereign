// ============================================================
// CyberButton - Cyberpunk styled button component
// ============================================================
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface CyberButtonProps {
  children: ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  variant?: "primary" | "secondary" | "danger" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  type?: "button" | "submit";
}

export default function CyberButton({
  children,
  onClick,
  disabled,
  variant = "primary",
  size = "md",
  className,
  type = "button",
}: CyberButtonProps) {
  const variants = {
    primary: "cyber-btn",
    secondary: "glass border border-[#00d4ff]/30 text-[#00d4ff] hover:border-[#00d4ff] hover:text-[#00ff88]",
    danger: "glass border border-red-500/30 text-red-400 hover:border-red-500 hover:bg-red-500/10",
    ghost: "text-[#556677] hover:text-white hover:bg-white/5",
  };

  const sizes = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-5 py-2.5 text-sm",
    lg: "px-8 py-4 text-base",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "rounded-lg font-heading font-bold flex items-center gap-2 justify-center transition-all duration-200",
        variants[variant],
        sizes[size],
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      {children}
    </button>
  );
}
