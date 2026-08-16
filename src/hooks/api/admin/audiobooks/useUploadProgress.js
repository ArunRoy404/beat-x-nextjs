"use client"

import { useEffect, useState } from "react"
import { env } from "@/config/env"

const TERMINAL_STATUSES = ["done", "failed", "aborted"]

/**
 * Tracks a chapter audio upload via SSE (GET /uploads/:uploadId/progress).
 * Bypasses the same-origin /api/proxy relay on purpose — that route buffers
 * the whole response before replying, which defeats a live event stream —
 * so this always hits the backend directly, matching the endpoint's own
 * "no Authorization header required" contract.
 *   const { percent, status, result, error } = useUploadProgress(trackingId)
 */
export function useUploadProgress(uploadId) {
  const [state, setState] = useState({ percent: 0, status: "idle", result: null, error: null })

  useEffect(() => {
    if (!uploadId) {
      setState({ percent: 0, status: "idle", result: null, error: null })
      return
    }

    setState({ percent: 0, status: "uploading", result: null, error: null })

    const source = new EventSource(`${env.apiBaseUrl}/uploads/${uploadId}/progress`)

    source.onmessage = (event) => {
      let payload
      try {
        const parsed = JSON.parse(event.data)
        payload = parsed?.data ?? parsed
      } catch {
        return
      }

      setState({
        percent: payload?.percent ?? 0,
        status: payload?.status ?? "uploading",
        result: payload?.result ?? null,
        error: null,
      })

      if (TERMINAL_STATUSES.includes(payload?.status)) {
        source.close()
      }
    }

    source.onerror = () => {
      setState((prev) => ({ ...prev, status: "failed", error: "Lost connection to the upload progress stream." }))
      source.close()
    }

    return () => source.close()
  }, [uploadId])

  return state
}
