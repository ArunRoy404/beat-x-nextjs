import { userArtistProfileAssets } from "@/dummyData/user/userArtistProfileAssets"

const peopleAlsoLike = [
    { id: "pal-1", name: "Fahim Islam", role: "Artist", avatar: userArtistProfileAssets.people.fahimIslam, isFollowing: false },
    { id: "pal-2", name: "Nabila", role: "Artist", avatar: userArtistProfileAssets.people.nabila, isFollowing: true },
    { id: "pal-3", name: "Jisan Khan Shuvo", role: "Artist", avatar: userArtistProfileAssets.people.jisanKhanShuvo, isFollowing: false },
    { id: "pal-4", name: "Kazi Shuvo", role: "Artist", avatar: userArtistProfileAssets.people.kaziShuvo, isFollowing: false },
]

export const artistProfiles = {
    "tashrif-khan": {
        slug: "tashrif-khan",
        name: "Tashrif Khan",
        isVerified: true,
        heroImage: userArtistProfileAssets.hero.tashrifKhan,
        description:
            "Experience the chart-topping cinematic journey that redefined modern production. Over 45 million streams this week.",
        stats: [
            { id: "listeners", value: "12.4M", label: "MONTHLY LISTENERS" },
            { id: "followers", value: "4.8M", label: "FOLLOWERS" },
        ],
        songsTab: {
            bestSongs: {
                title: "Best's",
                viewAllLabel: "View all albums",
                items: [
                    { id: "song-1", title: "Aura Borealis", subtitle: "Lumina Specter • Echoes of Silence", duration: "3:45", art: userArtistProfileAssets.songs.auraBorealis },
                    { id: "song-2", title: "Tumi Onek Dami", subtitle: "Fahim Islam • Single", duration: "4:20", art: userArtistProfileAssets.songs.tumiOnekDami },
                    { id: "song-3", title: "Amar Hote Hote", subtitle: "Amar Hote Hote • Single", duration: "4:20", art: userArtistProfileAssets.songs.amarHoteHote },
                    { id: "song-4", title: "Emon Ekta Golpo", subtitle: "Nabila • Single", duration: "3:15", art: userArtistProfileAssets.songs.emonEktaGolpo },
                    { id: "song-5", title: "Deep Space Pulse", subtitle: "Gravity Flow", duration: "4:20", art: userArtistProfileAssets.songs.deepSpacePulse },
                    { id: "song-6", title: "Neon Horizon", subtitle: "SynthWave Pro", duration: "3:15", art: userArtistProfileAssets.songs.neonHorizon },
                ],
            },
            hits: {
                title: "Hit's",
                viewAllLabel: "View all live streams",
                items: [
                    { id: "hit-1", rank: 1, title: "Neon Pulse", subtitle: "The Architect", image: userArtistProfileAssets.hits.neonPulse },
                    { id: "hit-2", rank: 2, title: "Subterranean", subtitle: "Vela Nova", image: userArtistProfileAssets.hits.subterranean },
                    { id: "hit-3", rank: 3, title: "Circuit Breaker", subtitle: "The Architect", image: userArtistProfileAssets.hits.circuitBreaker },
                    { id: "hit-4", rank: 4, title: "Vanta Black Dreams", subtitle: "Nyx Aurelia", image: userArtistProfileAssets.hits.vantaBlackDreams },
                    { id: "hit-5", rank: 5, title: "Frequency X", subtitle: "Echo System", image: userArtistProfileAssets.hits.frequencyX },
                ],
            },
            tourDates: {
                title: "Tour Dates",
                viewAllLabel: "Explore All",
                items: [
                    { id: "tour-1", month: "NOV", day: "24", venue: "Neon City Arena", location: "Tokyo, Japan", status: "available" },
                    { id: "tour-2", month: "DEC", day: "02", venue: "The Grid Pavilion", location: "Berlin, Germany", status: "available" },
                    { id: "tour-3", month: "DEC", day: "15", venue: "Sphere One", location: "London, UK", status: "sold-out" },
                ],
            },
        },
        productsTab: {
            title: "Artist Products",
            products: [
                { id: "product-1", title: "Oversized \"Void\" Hoodie", subtitle: "Heavyweight Cotton / Prism Black", price: "$85.00", coinPrice: "50 coin", badge: null, image: userArtistProfileAssets.products.voidHoodie1 },
                { id: "product-2", title: "Neon Pulse LP", subtitle: "Limited Cyan Pressing", price: "৳250.00", coinPrice: "50 coin", badge: "LOW STOCK", image: userArtistProfileAssets.products.neonPulseLp },
                { id: "product-3", title: "Oversized \"Void\" Hoodie", subtitle: "Water-Resistant Tech-Wear", price: "৳250.00", coinPrice: "50 coin", badge: null, image: userArtistProfileAssets.products.voidHoodie2 },
                { id: "product-4", title: "Refraction Tee", subtitle: "100% Organic Cotton / White", price: "৳250.00", coinPrice: "50 coin", badge: null, image: userArtistProfileAssets.products.refractionTee },
                { id: "product-5", title: "Clipart guitar", subtitle: "Clipart guitar, old, classic, watercolor, Hi-res JPEG", price: "৳250.00", coinPrice: "50 coin", badge: null, image: userArtistProfileAssets.products.clipartGuitar },
                { id: "product-6", title: "Artist outfit Casual Jackets", subtitle: "Welcome to [Cotton Clan] - where modern fashion meets timeless design.", price: "৳250.00", coinPrice: "50 coin", badge: null, image: userArtistProfileAssets.products.artistJacket },
            ],
        },
        podcastTab: {
            activeSeries: {
                title: "Active Series",
                viewAllLabel: "View All",
                items: [
                    { id: "series-1", title: "The Singularity Dialogues", subtitle: "Exploring the boundary where biology…", badge: "NEW SEASON", image: userArtistProfileAssets.podcast.seriesSingularity },
                    { id: "series-2", title: "Sonic Architecture", subtitle: "Weekly sound engineering insights.", badge: null, image: userArtistProfileAssets.podcast.seriesSonicArchitecture },
                ],
            },
            recentEpisodes: {
                title: "Recent Episodes",
                viewAllLabel: "LATEST",
                items: [
                    { id: "episode-1", title: "Ep 142: Quantum", meta: "Oct 24 • 48 min", listens: "42k", art: userArtistProfileAssets.podcast.episode142 },
                    { id: "episode-2", title: "Ep 141: The Art of", meta: "Oct 17 • 32 min", listens: "58k", art: userArtistProfileAssets.podcast.episode141 },
                    { id: "episode-3", title: "Ep 140: Decentralized", meta: "Oct 10 • 55 min", listens: "39k", art: userArtistProfileAssets.podcast.episode140 },
                ],
            },
        },
        peopleAlsoLike,
    },
}
