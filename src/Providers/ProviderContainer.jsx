import * as React from "react"
import { ThemeProvider } from "next-themes"
import { Toaster } from "@/components/ui/sonner"

export default function ProviderContainer({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      {children}
      <Toaster position="top-right" closeButton={true} />
    </ThemeProvider>
  )
}
