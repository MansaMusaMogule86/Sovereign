// ============================================================
// useRecoverySession - Hook for managing recovery sessions
// ============================================================
import { useState, useCallback, useRef } from "react";
import { RecoveryConfig, RecoveryProgress, runRecovery } from "@/lib/recovery-engine";

export type SessionStatus = "idle" | "running" | "paused" | "completed" | "failed";

export function useRecoverySession() {
  const [status, setStatus] = useState<SessionStatus>("idle");
  const [progress, setProgress] = useState<RecoveryProgress | null>(null);
  const generatorRef = useRef<Generator<RecoveryProgress> | null>(null);
  const intervalRef = useRef<number | null>(null);

  const start = useCallback((config: RecoveryConfig) => {
    generatorRef.current = runRecovery(config);
    setStatus("running");

    const tick = () => {
      if (!generatorRef.current) return;
      
      // Process multiple PIDs per tick for speed
      for (let i = 0; i < 5; i++) {
        const result = generatorRef.current.next();
        if (result.done) {
          setStatus("completed");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }
        setProgress(result.value);
      }
    };

    intervalRef.current = window.setInterval(tick, 100);
  }, []);

  const pause = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    setStatus("paused");
  }, []);

  const resume = useCallback(() => {
    if (!generatorRef.current) return;
    setStatus("running");

    const tick = () => {
      if (!generatorRef.current) return;
      for (let i = 0; i < 5; i++) {
        const result = generatorRef.current.next();
        if (result.done) {
          setStatus("completed");
          if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
          }
          return;
        }
        setProgress(result.value);
      }
    };

    intervalRef.current = window.setInterval(tick, 100);
  }, []);

  const cancel = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
    generatorRef.current = null;
    setStatus("idle");
    setProgress(null);
  }, []);

  return { status, progress, start, pause, resume, cancel };
}
