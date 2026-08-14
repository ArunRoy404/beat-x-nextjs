"use client"

import * as React from "react"
import { SessionProvider } from "next-auth/react"

export default function AuthSessionProvider({ children, session }) {
  return (
    <SessionProvider session={session}>
      {children}
    </SessionProvider>
  )
}
