import ProductCard from "@/components/user/artist/products/ProductCard"

const ProductsTab = ({ artist }) => {
    return (
        <div className="grid w-full grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {artist.productsTab.products.map((product) => (
                <ProductCard key={product.id} product={product} />
            ))}
        </div>
    )
}

export default ProductsTab
