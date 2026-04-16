"use client"

import { useEffect, useRef, useState } from "react"
import { CheckCircle, AlertTriangle } from "lucide-react"

interface TrustSignalProps {
  score: number
  status: "pass" | "hold"
  summary: string
  companyName: string
  payPeriodStart: string
  payPeriodEnd: string
  runId: string
  totalEmployees: number
  totalGross: number
  stateCount: number
}

export function TrustSignal({
  score,
  status,
  summary,
  companyName,
  payPeriodStart,
  payPeriodEnd,
  runId,
  totalEmployees,
  totalGross,
  stateCount,
}: TrustSignalProps) {
  const [displayScore, setDisplayScore] = useState(0)
  const [displayPay, setDisplayPay] = useState(0)
  const prevScore = useRef(0)
  const prevPay = useRef(0)

  useEffect(() => {
    const fromScore = prevScore.current
    const toScore = score
    const fromPay = prevPay.current
    const toPay = totalGross
    const duration = 700
    const start = performance.now()

    function tick(now: number) {
      const elapsed = now - start
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplayScore(fromScore + (toScore - fromScore) * eased)
      setDisplayPay(fromPay + (toPay - fromPay) * eased)
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
    prevScore.current = toScore
    prevPay.current = toPay
  }, [score, totalGross])

  const isHold = status === "hold"

  const startStr = new Date(payPeriodStart + "T00:00:00").toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric" },
  )
  const endStr = new Date(payPeriodEnd + "T00:00:00").toLocaleDateString(
    "en-US",
    { month: "short", day: "numeric", year: "numeric" },
  )

  return (
    <div
      className="bg-white border border-[#E8E8E3] rounded-xl p-10 text-center"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Score */}
      <div
        className="text-6xl font-bold tracking-tighter tabular-nums font-mono"
        style={{ color: isHold ? "#B45309" : "#059669" }}
      >
        {displayScore.toFixed(1)}
        <span style={{ fontSize: "0.95em" }}>%</span>
      </div>

      {/* Status row */}
      <div className="mt-2 flex items-center justify-center gap-1.5">
        {isHold ? (
          <>
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-base font-medium text-red-600">
              {summary}
            </span>
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-base font-medium text-emerald-700">
              {summary}
            </span>
          </>
        )}
      </div>

      {/* Divider */}
      <div className="mt-6 border-t border-gray-100" />

      {/* Metadata */}
      <div className="mt-6 flex items-center justify-center gap-2 text-sm">
        <span className="font-semibold text-gray-900">{companyName}</span>
        <span className="text-gray-300">&middot;</span>
        <span className="text-gray-500">
          {startStr} &ndash; {endStr}
        </span>
        <span className="text-gray-300">&middot;</span>
        <span className="font-mono text-gray-400">#{runId}</span>
      </div>

      {/* Stats */}
      <div className="mt-6 flex items-center justify-center">
        <div className="flex-1 text-center">
          <div className="text-lg font-semibold text-gray-900 tabular-nums tracking-normal">
            {totalEmployees}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
            Employees
          </div>
        </div>
        <div className="border-l border-gray-200 flex-1 text-center pl-6">
          <div className="text-lg font-semibold text-gray-900 font-mono tabular-nums tracking-normal">
            $
            {displayPay
              .toFixed(2)
              .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
            Gross pay
          </div>
        </div>
        <div className="border-l border-gray-200 flex-1 text-center pl-6">
          <div className="text-lg font-semibold text-gray-900 tabular-nums tracking-normal">
            {stateCount}
          </div>
          <div className="text-xs text-gray-500 uppercase tracking-wide mt-0.5">
            States
          </div>
        </div>
      </div>
    </div>
  )
}
