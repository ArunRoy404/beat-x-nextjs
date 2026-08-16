"use client"

import React from "react"
import { toast } from "sonner"
import { RefreshCw } from "lucide-react"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useSchedulerStatus } from "@/hooks/api/admin/scheduler/useSchedulerStatus"
import { useTriggerSchedulerJob } from "@/hooks/api/admin/scheduler/useTriggerSchedulerJob"

const JOB_NAME = "podcast-scheduled-publish"

const SchedulerStatusWidget = () => {
    const { data: status } = useSchedulerStatus()
    const { mutate: triggerJob, isPending } = useTriggerSchedulerJob()

    const job = status?.registeredJobs?.find((registeredJob) => registeredJob.name === JOB_NAME)

    const handleRunNow = () => {
        triggerJob(
            { jobName: JOB_NAME },
            {
                onSuccess: () => toast.success("Scheduled-publish check triggered."),
                onError: (error) => toast.error(error?.message || "Failed to trigger scheduler job."),
            }
        )
    }

    return (
        <div className="flex items-center justify-between gap-4 p-4 rounded-[16px] border border-secondary/15 bg-secondary/[0.03] w-full flex-wrap">
            <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-[10px] bg-secondary/10 border border-secondary/25 flex items-center justify-center text-secondary shrink-0">
                    <RefreshCw className="w-4 h-4" />
                </div>
                <div className="flex flex-col min-w-0">
                    <span className="text-whitetext text-[14px] font-medium truncate capitalize">
                        Scheduled Publish{status?.status ? ` · ${status.status}` : ""}
                    </span>
                    <span className="text-white/40 text-[12px] truncate">
                        {job?.next ? `Next check: ${format(new Date(job.next), "MMM d, h:mm a")}` : "Checks every minute"}
                    </span>
                </div>
            </div>
            <Button
                onClick={handleRunNow}
                disabled={isPending}
                variant="outline"
                size="sm"
                className="rounded-full shrink-0"
            >
                Run Now
            </Button>
        </div>
    )
}

export default SchedulerStatusWidget
