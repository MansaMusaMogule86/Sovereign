// ============================================================
// GlitchText - Cyberpunk glitch text effect
// ============================================================
import { ReactNode } from "react";

interface GlitchTextProps {
  children: ReactNode;
  className?: string;
}

export default function GlitchText({ children, className = "" }: GlitchTextProps) {
  return (
    <span className={`relative inline-block ${className}`}>
      <span className="relative z-10">{children}</span>
      <span
        className="absolute top-0 left-0 z-0 opacity-70"
        style={{
          color: "#00ff88",
          clipPath: "polygon(0 0, 100% 0, 100% 45%, 0 45%)",
          transform: "translate(-2px, -1px)",
          animation: "glitch 2.5s infinite",
        }}
      >
        {children}
      </span>
      <span
        className="absolute top-0 left-0 z-0 opacity-70"
        style={{
          color: "#ff0080",
          clipPath: "polygon(0 55%, 100% 55%, 100% 100%, 0 100%)",
          transform: "translate(2px, 1px)",
          animation: "glitch 2.5s infinite reverse",
        }}
      >
        {children}
      </span>
    </span>
  );
}
