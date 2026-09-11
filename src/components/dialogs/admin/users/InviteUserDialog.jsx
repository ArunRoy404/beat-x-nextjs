"use client"

import React from "react"
// import {
//     Dialog,
//     DialogContent,
//     DialogHeader,
//     DialogTitle,
//     DialogTrigger,
// } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { PlusCircle } from "lucide-react"
import { toast } from "sonner"
// import InviteUserForm from "@/components/forms/users/InviteUserForm"

const InviteUserDialog = ({ children }) => {
    // Preserving dialog and form code for future backend integration
    // const [open, setOpen] = useState(false)

    const handleClick = () => {
        toast.info("This action will be enabled once backend user management endpoints are released.")
    }

    if (children && React.isValidElement(children)) {
        return React.cloneElement(children, {
            onClick: handleClick,
        })
    }

    return (
        <Button variant="gradient" onClick={handleClick}>
            <PlusCircle /> Invite User
        </Button>
    )

    /*
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {children || (
                    <Button variant="gradient">
                        <PlusCircle /> Invite User
                    </Button>
                )}
            </DialogTrigger>

            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle>Add User</DialogTitle>
                </DialogHeader>

                <InviteUserForm
                    onSuccess={() => setOpen(false)}
                    onCancel={() => setOpen(false)}
                />
            </DialogContent>
        </Dialog>
    )
    */
}

export default InviteUserDialog

