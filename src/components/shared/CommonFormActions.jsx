import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

/**
 * Standard dialog/form footer: a cancel button beside a submit button, both
 * full-width pills of equal height.
 *
 * The `outline` and `default` Button variants don't set a radius of their
 * own (only `gradient` does), so every dialog in the app has been repeating
 * `rounded-full h-[52px]!` by hand — which is exactly how footers drift out
 * of sync. Routing them through here keeps one definition.
 */
const CommonFormActions = ({
    onCancel,
    cancelLabel = "Cancel",
    submitLabel,
    submitVariant = "gradient",
    submitClassName,
    isPending = false,
    className,
}) => {
    return (
        <div className={cn("mt-4 flex shrink-0 items-center gap-4", className)}>
            <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-[52px]! flex-1 rounded-full"
                onClick={onCancel}
            >
                {cancelLabel}
            </Button>

            <Button
                type="submit"
                variant={submitVariant}
                size="lg"
                className={cn("h-[52px]! flex-1 rounded-full", submitClassName)}
                isLoading={isPending}
            >
                {submitLabel}
            </Button>
        </div>
    )
}

export default CommonFormActions
