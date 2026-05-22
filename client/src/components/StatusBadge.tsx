// ============================================================
// StatusBadge - Consistent status indicator
// ============================================================

interface StatusBadgeProps {
  status: "running" | "completed" | "failed" | "paused" | "cancelled" | "idle";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    running: "bg-[#ffaa00]/10 text-[#ffaa00] animate-pulse",
    completed: "bg-[#00ff88]/10 text-[#00ff88]",
    failed: "bg-red-500/10 text-red-400",
    paused: "bg-[#00d4ff]/10 text-[#00d4ff]",
    cancelled: "bg-[#556677]/10 text-[#556677]",
    idle: "bg-[#556677]/10 text-[#556677]",
  };

  return (
    <span className={`px-2 py-1 rounded-full text-[10px] font-mono uppercase ${styles[status]}`}>
      {status}
    </span>
  );
}
