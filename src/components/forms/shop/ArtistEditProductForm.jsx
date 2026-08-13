"use client"

import React from "react"
import { useForm, useWatch, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { DialogClose } from "@/components/ui/dialog"
import { CheckCircle2, Clock, FileText } from "lucide-react"
import { toast } from "sonner"
import { cn } from "@/lib/utils"
import { useArtistShopStore } from "@/zustandStore/artist/artistStore/artistShopStore"
import CommonFormContainer from "@/components/shared/CommonInputs/CommonFormContainer/CommonFormContainer"
import CommonMultiImageUpload from "@/components/shared/CommonInputs/CommonImageUpload/CommonMultiImageUpload"
import CommonInput from "@/components/shared/CommonInputs/CommonInput/CommonInput"
import CommonSelect from "@/components/shared/CommonInputs/CommonInput/CommonSelect"
import CommonSelectCards from "@/components/shared/CommonInputs/CommonInput/CommonSelectCards"
import CommonInputContainer from "@/components/shared/CommonInputs/CommonInput/CommonInputContainer"

const CATEGORIES = ["Apparel", "Vinyl", "Accessories", "Bags", "Posters", "Other"]
const SIZES = ["XS", "S", "M", "L", "XL", "XXL"]

const VISIBILITY_OPTIONS = [
    { value: "publish", label: "Publish Now", icon: CheckCircle2 },
    { value: "schedule", label: "Schedule", icon: Clock },
    { value: "draft", label: "Save as Draft", icon: FileText },
]

const productSchema = z.object({
    images: z.array(z.any()).optional(),
    productName: z.string().min(1, "Product name is required"),
    category: z.string().min(1, "Category is required"),
    artist: z.string().min(1, "Artist is required"),
    price: z.string().min(1, "Price is required"),
    stock: z.string().min(1, "Stock is required"),
    coinReward: z.string().optional(),
    hasSizeVariants: z.boolean().optional(),
    sizes: z.array(z.string()).optional(),
    description: z.string().optional(),
    visibility: z.enum(["publish", "schedule", "draft"]),
})

const ArtistEditProductForm = ({ product, onSuccess, onCancel }) => {
    const updateProduct = useArtistShopStore((state) => state.updateProduct)

    const existingImages = product?.images?.length
        ? [...product.images, ...Array(4 - product.images.length).fill(null)].slice(0, 4)
        : [product?.image || null, null, null, null]

    const {
        register,
        handleSubmit,
        control,
        setValue,
        formState: { errors },
    } = useForm({
        resolver: zodResolver(productSchema),
        defaultValues: {
            images: existingImages,
            productName: product?.title || "",
            category: product?.category || "",
            artist: "TAHSIN",
            price: product?.price ? String(product.price) : "",
            stock: product?.stock !== undefined ? String(product.stock) : "",
            coinReward: product?.coinBadge ? product.coinBadge.replace(/\D/g, "") : "",
            hasSizeVariants: !!product?.sizes?.length,
            sizes: product?.sizes || [],
            description: product?.description || "",
            visibility: product?.status === "Draft" ? "draft" : "publish",
        },
    })

    const hasSizeVariants = useWatch({ control, name: "hasSizeVariants" })
    const selectedSizes = useWatch({ control, name: "sizes" }) || []

    const toggleSize = (size) => {
        const next = selectedSizes.includes(size)
            ? selectedSizes.filter((s) => s !== size)
            : [...selectedSizes, size]
        setValue("sizes", next, { shouldValidate: true })
    }

    const onSubmit = (data) => {
        const images = (data.images || []).filter(Boolean).map((img) =>
            img instanceof File ? URL.createObjectURL(img) : img
        )

        updateProduct({
            ...product,
            title: data.productName,
            artist: data.artist,
            category: data.category,
            price: Number(data.price) || product.price,
            stock: Number(data.stock) || product.stock,
            status: data.visibility === "draft" ? "Draft" : "Active",
            image: images[0] || product.image,
            images,
            coinBadge: data.coinReward ? `${data.coinReward} coin` : product.coinBadge,
            sizes: data.hasSizeVariants ? data.sizes : [],
            description: data.description,
        })
        toast.success("Product updated successfully!")
        onSuccess?.()
    }

    const onInvalid = (validationErrors) => {
        const errorKeys = Object.keys(validationErrors)
        if (errorKeys.length > 0) {
            toast.error(validationErrors[errorKeys[0]].message)
        }
    }

    return (
        <CommonFormContainer onSubmit={handleSubmit(onSubmit, onInvalid)}>
            {/* Product Images Upload */}
            <Controller
                name="images"
                control={control}
                render={({ field }) => (
                    <CommonMultiImageUpload
                        value={field.value}
                        onChange={(index, file) => {
                            const next = [...(field.value || [null, null, null, null])]
                            next[index] = file
                            setValue("images", next, { shouldValidate: true })
                        }}
                        error={errors.images?.message}
                    />
                )}
            />

            {/* Product Name */}
            <CommonInput
                label="Product Name"
                placeholder="Enter product name..."
                {...register("productName")}
                error={errors.productName?.message}
            />

            {/* Category & Artist */}
            <CommonInputContainer>
                <Controller
                    name="category"
                    control={control}
                    render={({ field }) => (
                        <CommonSelect
                            label="Category"
                            placeholder="Select category"
                            value={field.value}
                            onChange={field.onChange}
                            options={CATEGORIES}
                            error={errors.category?.message}
                        />
                    )}
                />

                <CommonInput
                    label="Artist"
                    placeholder="e.g. Tech Weekly BD"
                    {...register("artist")}
                    error={errors.artist?.message}
                />
            </CommonInputContainer>

            {/* Price, Stock & Coin Reward */}
            <CommonInputContainer className="sm:grid-cols-3">
                <CommonInput
                    label="Price (৳)"
                    type="number"
                    placeholder="e.g. 1"
                    {...register("price")}
                    error={errors.price?.message}
                />

                <CommonInput
                    label="Stock"
                    type="number"
                    placeholder="e.g. 14"
                    {...register("stock")}
                    error={errors.stock?.message}
                />

                <CommonInput
                    label="Coin Reward"
                    type="number"
                    placeholder="e.g. 14"
                    {...register("coinReward")}
                    error={errors.coinReward?.message}
                />
            </CommonInputContainer>

            {/* Has Size Variants Toggle */}
            <Controller
                name="hasSizeVariants"
                control={control}
                render={({ field }) => (
                    <div className="flex items-center justify-between py-2 border-t border-b border-whitetext/5 shrink-0">
                        <span className="text-light-gray text-[16px] not-italic font-medium font-sans">
                            Has Size Variants
                        </span>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            className="data-checked:bg-secondary data-unchecked:bg-light-gray/20"
                        />
                    </div>
                )}
            />

            {/* Available Sizes (conditional) */}
            {hasSizeVariants && (
                <div className="flex flex-col gap-2 shrink-0">
                    <label className="text-primary text-[16px] not-italic font-normal font-sans">
                        Available Sizes
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {SIZES.map((size) => {
                            const isSelected = selectedSizes.includes(size)
                            return (
                                <button
                                    key={size}
                                    type="button"
                                    onClick={() => toggleSize(size)}
                                    className={cn(
                                        "w-11 h-11 rounded-full border text-[13px] font-medium cursor-pointer transition-all",
                                        isSelected
                                            ? "bg-secondary/15 border-secondary/15 text-secondary"
                                            : "bg-light-gray/10 border-light-gray/20 text-light-gray hover:bg-light-gray/20"
                                    )}
                                >
                                    {size}
                                </button>
                            )
                        })}
                    </div>
                </div>
            )}

            {/* Description */}
            <CommonInput
                label="Description"
                type="textarea"
                placeholder="Episode description / show notes..."
                {...register("description")}
                error={errors.description?.message}
            />

            {/* Visibility Options */}
            <Controller
                name="visibility"
                control={control}
                render={({ field }) => (
                    <CommonSelectCards
                        label="Visibility"
                        value={field.value}
                        onChange={field.onChange}
                        options={VISIBILITY_OPTIONS}
                        error={errors.visibility?.message}
                    />
                )}
            />

            {/* Footer Actions */}
            <div className="flex items-center gap-4 mt-2 shrink-0">
                <DialogClose asChild className="flex-1 w-full">
                    <Button
                        type="button"
                        variant="outline"
                        className="w-full rounded-full"
                        size="lg"
                        onClick={onCancel}
                    >
                        Cancel
                    </Button>
                </DialogClose>
                <Button
                    type="submit"
                    variant="gradient"
                    className="flex-1"
                    size="lg"
                >
                    Submit for Review
                </Button>
            </div>
        </CommonFormContainer>
    )
}

export default ArtistEditProductForm
