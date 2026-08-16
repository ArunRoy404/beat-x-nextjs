import Image from "next/image"
import { Compass } from "lucide-react"
import Logo from "@/components/shared/Logo"
import BackOrHomeButton from "@/components/shared/BackOrHomeButton"
import SonicFrequencyWidget from "@/components/shared/AuthLayout/SonicFrequencyWidget"

export const metadata = {
    title: "Page Not Found | BeatX",
    description: "The page you're looking for doesn't exist.",
}

export default function NotFound() {
    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Background Art */}
            <Image
                src="/bg-images/dashboard_bg.png"
                alt=""
                fill
                priority
                sizes="100vw"
                className="object-cover"
            />

            {/* Card */}
            <div
                className="relative z-10 w-full max-w-[648px] mx-4 rounded-[48px] p-12 backdrop-blur-[20px] flex flex-col items-center justify-center gap-8 text-center"
                style={{ background: "var(--auth-card-bg)", borderColor: "var(--auth-card-border)", borderWidth: 1, borderStyle: "solid" }}
            >
                <Logo />

                <div className="flex flex-col items-center gap-6">
                    <div className="w-16 h-16 rounded-full border border-white/10 bg-white/5 flex items-center justify-center">
                        <Compass className="w-7 h-7 text-secondary" />
                    </div>

                    <span className="bg-gradient-to-r from-secondary to-[#B1FE4D] bg-clip-text text-transparent text-7xl md:text-8xl font-bold leading-none">
                        404
                    </span>

                    <div className="flex flex-col items-center gap-2">
                        <h1 className="text-whitetext text-xl md:text-2xl font-semibold">
                            Page not found
                        </h1>
                        <p className="text-light-gray text-sm md:text-base max-w-sm">
                            The page you're looking for doesn't exist or may have been moved.
                        </p>
                    </div>
                </div>

                <BackOrHomeButton className="min-w-[180px]">
                    Go Back
                </BackOrHomeButton>
            </div>

            <SonicFrequencyWidget />
        </div>
    )
}
