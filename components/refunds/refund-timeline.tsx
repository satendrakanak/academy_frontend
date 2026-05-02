"use client";

import { RefundRequest } from "@/types/order";
import { RefundStatusBadge } from "./refund-status-badge";

function formatEventDate(value?: string | null) {
  if (!value) return "NA";
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
}

export function RefundTimeline({
  refundRequest,
  title = "Refund timeline",
}: {
  refundRequest: RefundRequest;
  title?: string;
}) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white/80 p-4 dark:border-white/10 dark:bg-white/8">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-sm font-semibold text-slate-950 dark:text-white">{title}</p>
          <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
            Requested on {formatEventDate(refundRequest.createdAt)}
          </p>
        </div>
        <RefundStatusBadge status={refundRequest.status} />
      </div>

      <div className="mt-4 space-y-3">
        {refundRequest.logs?.length ? (
          refundRequest.logs.map((log) => {
            const actorName = log.actor
              ? `${log.actor.firstName || ""} ${log.actor.lastName || ""}`.trim() ||
                log.actor.email
              : log.actorType;

            return (
              <div
                key={log.id}
                className="rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3 dark:border-white/10 dark:bg-white/6"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">
                      {log.action.replaceAll("_", " ")}
                    </p>
                    <p className="text-xs text-slate-500 dark:text-slate-400">
                      By {actorName} • {formatEventDate(log.createdAt)}
                    </p>
                  </div>
                  {log.toStatus ? (
                    <RefundStatusBadge status={log.toStatus} className="text-[10px]" />
                  ) : null}
                </div>
                {log.message ? (
                  <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    {log.message}
                  </p>
                ) : null}
              </div>
            );
          })
        ) : (
          <p className="text-sm text-slate-500 dark:text-slate-400">No refund events recorded yet.</p>
        )}
      </div>
    </div>
  );
}
