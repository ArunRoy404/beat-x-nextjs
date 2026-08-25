import ProductIcon from "./ProductIcon"
import ProductImagePlaceholder from "./ProductImagePlaceholder"

const ProductBentoSection = ({ description, features }) => {
    const [photoFeature, iconFeature] = features

    return (
        <section className="flex w-full flex-col items-center gap-6">
            <div className="flex flex-col items-center gap-4 text-center">
                <h2 className="text-2xl font-black text-whitetext sm:text-[32px]">{description.title}</h2>
                <p className="max-w-2xl text-sm text-light-gray sm:text-base">{description.body}</p>
            </div>
            <div className="flex w-full flex-col gap-6 lg:flex-row">
                {photoFeature && (
                    <div
                        className="relative flex min-h-64 w-full flex-1 items-end overflow-hidden rounded-[48px] border border-(--glass-panel-border) p-6 sm:p-6.25"
                        style={
                            photoFeature.image
                                ? { backgroundImage: `url(${photoFeature.image})`, backgroundSize: "cover", backgroundPosition: "center" }
                                : undefined
                        }
                    >
                        {!photoFeature.image && (
                            <ProductImagePlaceholder icon={photoFeature.icon} className="absolute inset-0" iconClassName="size-20" />
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                        <div className="relative flex max-w-md flex-col gap-2">
                            <span className="text-2xl font-black text-whitetext">{photoFeature.title}</span>
                            <span className="text-base text-light-gray">{photoFeature.description}</span>
                        </div>
                    </div>
                )}
                {iconFeature && (
                    <div className="flex w-full flex-1 flex-col justify-between gap-14 rounded-[48px] border border-(--glass-panel-border) bg-dark-accent p-6 sm:p-8.5">
                        <span className="flex size-12 items-center justify-center rounded-[32px] bg-secondary/10">
                            <ProductIcon name={iconFeature.icon || "droplet"} className="size-5 text-secondary" />
                        </span>
                        <div className="flex flex-col gap-4">
                            <span className="text-2xl font-black text-whitetext">{iconFeature.title}</span>
                            <span className="text-sm text-light-gray">{iconFeature.description}</span>
                        </div>
                        {iconFeature.stat && <span className="text-sm font-semibold text-secondary">{iconFeature.stat}</span>}
                    </div>
                )}
            </div>
        </section>
    )
}

export default ProductBentoSection
