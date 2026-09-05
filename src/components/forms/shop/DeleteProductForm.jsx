"use client"

import React from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Trash2, Lock, Loader2 } from "lucide-react"
import { toast } from "sonner"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import { useDeleteProduct } from "@/hooks/api/admin/products/useDeleteProduct"

const deleteSchema = z.object({
    password: z.string().min(1, "Password is required"),
})

const DeleteProductForm = ({ product, onSuccess, onCancel }) => {
    const { mutate: deleteProduct, isPending } = useDeleteProduct()
    const productId = product?._id || product?.id

    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(deleteSchema),
        defaultValues: {
            password: "",
        },
    })

    const onSubmit = (data) => {
        if (!productId) {
            toast.error("Invalid product ID")
            return
        }

        deleteProduct(productId, {
            onSuccess: () => {
                toast.success("Product deleted successfully!")
                reset()
                onSuccess?.()
            },
            onError: (err) => {
                toast.error(err?.response?.data?.message || err?.message || "Failed to delete product")
            },
        })
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-4">
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    You are about to permanently delete <strong className="text-white">{product?.title || "this product"}</strong>. This action cannot be undone.
                </p>
                <p className="text-light-whitetext text-[14px] not-italic font-normal leading-[22px] font-sans">
                    Enter your password or confirm deletion to proceed.
                </p>
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-2 shrink-0">
                <label className="text-[#A175FF] text-[14px] font-medium font-sans">
                    Admin Password
                </label>
                <CommonInput
                    type="password"
                    placeholder="Enter deletion password"
                    className="rounded-full bg-white/[0.03] border-white/10"
                    leftIcon={<Lock className="w-4 h-4 text-light-whitetext/40" />}
                    {...register("password")}
                    error={errors.password?.message}
                />
            </div>

            {/* Dialog Footer Actions */}
            <div className="flex items-center gap-4 mt-4 shrink-0">
                <Button
                    type="button"
                    variant="outline"
                    className="flex-1 rounded-full h-[52px]!"
                    size="lg"
                    onClick={onCancel}
                    disabled={isPending}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    disabled={isPending}
                    className="flex-1 rounded-full bg-red-error hover:bg-red-error/90 text-white font-semibold h-[52px]! flex items-center justify-center gap-2 border-0 cursor-pointer disabled:opacity-50"
                    size="lg"
                >
                    {isPending ? (
                        <Loader2 className="w-4 h-4 animate-spin shrink-0" />
                    ) : (
                        <Trash2 className="w-4 h-4 shrink-0" />
                    )}
                    Delete product
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default DeleteProductForm
