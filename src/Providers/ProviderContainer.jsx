import * as React from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"
import AuthSessionProvider from "./AuthSessionProvider"
import QueryProvider from "./QueryProvider"
import GlobalFloatingMediaPlayer from "@/components/shared/GlobalFloatingMediaPlayer/GlobalFloatingMediaPlayer"

export default function ProviderContainer({ children, session }) {
  return (
    <AuthSessionProvider session={session}>
      <QueryProvider>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <GlobalFloatingMediaPlayer />
          <Toaster position="top-right" closeButton={true} />
        </ThemeProvider>
      </QueryProvider>
    </AuthSessionProvider>
  )
}
