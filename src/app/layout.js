import { getServerSession } from "next-auth/next";
import "./globals.css";
import ProviderContainer from "@/Providers/ProviderContainer";
import { authOptions } from "@/lib/auth/authOptions";

export const metadata = {
  title: "BeatX",
  description: "BeatX - Music, Videos, Podcasts & Audiobooks Streaming",
};

export default async function RootLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">
        <ProviderContainer session={session}>
          {children}
        </ProviderContainer>
      </body>
    </html>
  );
}

