"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface TrustSignalProps {
  flagged: boolean
}

export function TrustSignal({ flagged }: TrustSignalProps) {
  const [displayScore, setDisplayScore] = useState(flagged ? 62.1 : 98.4)
  const [displayPay, setDisplayPay] = useState(312847.23)
  const targetScore = flagged ? 62.1 : 98.4
  const targetPay = 312847.23
  const prevTarget = useRef<number>(targetScore)

  useEffect(() => {
    const from = prevTarget.current === targetScore ? 0 : prevTarget.current
    const to = targetScore
    const duration = 700
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      // ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      const current = from + (to - from) * eased
      setDisplayScore(current)
      const payAmount = targetPay * eased
      setDisplayPay(payAmount)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    prevTarget.current = to
  }, [targetScore])

  return (
    <div className="bg-white border border-[#E8E8E3] rounded-xl p-10 text-center"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {/* Score */}
      <div className="text-6xl font-bold tracking-tighter tabular-nums font-mono"
        style={{ color: flagged ? "#B45309" : "#059669" }}>
        {displayScore.toFixed(1)}<span style={{ fontSize: "0.95em" }}>%</span>
      </div>

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

      {/* Stats - single flex row with dividers */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex-1 text-center">
          <div className="text-lg font-semibold text-gray-900 tabular-nums tracking-normal">47</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">Employees</div>
        </div>
        <div className="border-l border-gray-200 flex-1 text-center pl-6">
          <div className="text-lg font-semibold text-gray-900 font-mono tabular-nums tracking-normal">
            ${displayPay.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">Gross pay</div>
        </div>
        <div className="border-l border-gray-200 flex-1 text-center pl-6">
          <div className="text-lg font-semibold text-gray-900 tabular-nums tracking-normal">12</div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">States</div>
        </div>
      </div>
    </div>
  )
}
