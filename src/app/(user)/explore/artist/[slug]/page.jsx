import ArtistProfilePage from "@/templates/user/artist/ArtistProfilePage"

const page = async ({ params }) => {
    const { slug } = await params
    return <ArtistProfilePage slug={slug} />
}

export default page
