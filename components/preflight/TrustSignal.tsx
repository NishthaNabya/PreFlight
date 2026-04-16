"use client"

import { useEffect, useRef } from "react"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface TrustSignalProps {
  flagged: boolean
}

export function TrustSignal({ flagged }: TrustSignalProps) {
  const scoreRef = useRef<HTMLSpanElement>(null)
  const targetScore = flagged ? 62.1 : 98.4
  const prevTarget = useRef<number>(targetScore)

  useEffect(() => {
    const el = scoreRef.current
    if (!el) return

    const from = prevTarget.current === targetScore ? 0 : prevTarget.current
    const to = targetScore
    const duration = 600
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      if (el) el.textContent = current.toFixed(1) + "%"
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    prevTarget.current = to
  }, [targetScore])

  return (
    <div className="bg-white border border-[#E8E8E3] rounded-xl p-10 text-center"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {/* Score */}
      <span
        ref={scoreRef}
        className={`text-6xl font-bold tracking-tighter tabular-nums font-mono ${
          flagged ? "text-amber-600" : "text-emerald-600"
        }`}
      >
        {flagged ? "62.1%" : "98.4%"}
      </span>

      {/* Status row */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {flagged ? (
          <>
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-base font-medium text-red-600">1 item needs review</span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-base font-medium text-emerald-700">All changes accounted for</span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-gray-100" />

      {/* Metadata */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <span className="font-semibold text-gray-900">Acme Corp</span>
        <span className="text-gray-300">·</span>
        <span className="text-gray-500">Mar 16 – Mar 31, 2026</span>
        <span className="text-gray-300">·</span>
        <span className="font-mono text-gray-400">#2847</span>
      </div>

      {/* Stats */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
          <div className="text-lg font-semibold text-gray-900">47</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">Employees</div>
        </div>
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
          <div className="text-lg font-semibold text-gray-900 font-mono">$312,847</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">Gross pay</div>
        </div>
        <div className="bg-gray-50 rounded-lg px-4 py-3 text-center">
          <div className="text-lg font-semibold text-gray-900">12</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">States</div>
        </div>
      </div>
    </div>
  )
}
