import React from "react";
import { CheckCircle2, Loader2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

export const TranscodeStatusBadge = ({ status = "pending", className }) => {
  const normalized = (status || "pending").toLowerCase();

  if (normalized === "ready") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0",
          className
        )}
      >
        <CheckCircle2 className="w-3 h-3 text-emerald-400" />
        <span>Ready</span>
      </span>
    );
  }

  if (normalized === "failed") {
    return (
      <span
        className={cn(
          "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-red-500/10 text-red-400 border border-red-500/20 shrink-0",
          className
        )}
      >
        <AlertCircle className="w-3 h-3 text-red-400" />
        <span>Failed</span>
      </span>
    );
  }

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20 shrink-0",
        className
      )}
    >
      <Loader2 className="w-3 h-3 text-amber-400 animate-spin" />
      <span>Processing</span>
    </span>
  );
};

export default TranscodeStatusBadge;
