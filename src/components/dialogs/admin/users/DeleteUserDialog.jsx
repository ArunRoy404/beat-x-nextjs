"use client"

import React from "react"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
// import { Trash2 } from "lucide-react"
// import DeleteUserForm from "@/components/forms/users/DeleteUserForm"
import { toast } from "sonner"

const DeleteUserDialog = ({ user, children }) => {
    // Preserving dialog and form code for future backend integration
    // const [open, setOpen] = useState(false)

    const handleClick = (e) => {
        e?.stopPropagation?.()
        toast.info("This action will be enabled once backend user management endpoints are released.")
    }

    if (children && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick,
        })
    }

    return null

    /*
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[540px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-red-error/10 border border-red-error/25 flex items-center justify-center text-red-error shrink-0">
                            <Trash2 className="w-5 h-5" />
                        </div>
                        <span className="text-[20px] font-semibold leading-none">Confirm Deletion</span>
                    </DialogTitle>
                </DialogHeader>

                <DeleteUserForm
                    user={user}
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
    */
}

export default DeleteUserDialog

