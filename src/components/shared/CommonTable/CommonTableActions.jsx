import React from "react"
import { Eye, Check, X, Trash2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

const CommonTableActions = ({
    status,
    onViewDetails,
    onTakeDown,
    onRestore,
    onApprove,
    onReject,
    onDelete,
    className
}) => {
    return (
        <div className={cn("flex items-center justify-end gap-3 pr-2", className)}>
            {/* Conditional status-based actions */}
            {status === "Published" && (
                <Button
                    notImplemented
                    onClick={onTakeDown}
                    variant="outline"
                    className="text-yellow-warning border border-yellow-warning/20 bg-yellow-warning/10 rounded-full"
                >
                    Take Down
                </Button>
            )}

            {status === "Take Down" && (
                <Button
                    notImplemented
                    onClick={onRestore}
                    variant="outline"
                    className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full"
                >
                    Restore
                </Button>
            )}

            {status === "Under Review" && (
                <>
                    <Button
                        notImplemented
                        onClick={onApprove}
                        title="Approve"
                        size="icon"
                        variant="outline"
                        className="text-green-success border border-green-success/20 bg-green-success/10 rounded-full"
                    >
                        <Check className="w-3.5 h-3.5 shrink-0" />
                    </Button>
                    <Button
                        notImplemented
                        onClick={onReject}
                        title="Reject"
                        size="icon"
                        variant="outline"
                        className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full"
                    >
                        <X className="w-3.5 h-3.5 shrink-0" />
                    </Button>
                </>
            )}

            {/* Details circle button */}
            <Button
                notImplemented
                onClick={onViewDetails}
                title="View Details"
                size="icon"
                variant="outline"
                className="text-secondary border border-secondary/20 bg-secondary/10 rounded-full"
            >
                <Eye className="w-3.5 h-3.5 shrink-0" />
            </Button>

            {/* Delete icon */}
            <Button
                notImplemented
                onClick={onDelete}
                title="Delete Song"
                size="icon"
                variant="outline"
                className="text-red-error border border-red-error/20 bg-red-error/10 rounded-full"
            >
                <Trash2 className="w-4 h-4 shrink-0" />
            </Button>
        </div>
    )
}

export default CommonTableActions