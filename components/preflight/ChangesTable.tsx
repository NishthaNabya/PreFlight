"use client"

import { useRef, useEffect } from "react"

interface ChangesTableProps {
  flagged: boolean
}

function Pill({
  children,
  variant,
}: {
  children: React.ReactNode
  variant: "green" | "gray" | "blue" | "red"
}) {
  const styles = {
    green: "bg-emerald-50 text-emerald-700",
    gray: "bg-gray-100 text-gray-600",
    blue: "bg-blue-50 text-blue-700",
    red: "bg-red-100 text-red-700",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${styles[variant]}`}
    >
      {children}
    </span>
  )
}

export function ChangesTable({ flagged }: ChangesTableProps) {
  const jamesRowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = jamesRowRef.current
    if (!el) return
    if (flagged) {
      el.style.maxHeight = "0px"
      el.style.opacity = "0"
      el.style.overflow = "hidden"
      // force reflow
      void el.offsetHeight
      el.style.transition = "max-height 250ms ease, opacity 200ms ease"
      el.style.maxHeight = "120px"
      el.style.opacity = "1"
    } else {
      el.style.transition = "max-height 200ms ease, opacity 150ms ease"
      el.style.maxHeight = "0px"
      el.style.opacity = "0"
    }
  }, [flagged])

  return (
    <div className="bg-white border border-[#E8E8E3] rounded-xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">Changes from last run</h2>
        <span className="bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 text-xs font-medium">
          {flagged ? "4 changes" : "3 changes"}
        </span>
      </div>

      {/* Column headers */}
      <div className="flex px-4 py-2 border-b border-gray-100">
        <div className="flex-[1.5] text-xs font-medium text-gray-400 uppercase tracking-wider">Employee</div>
        <div className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wider">Change</div>
        <div className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">Impact</div>
        <div className="flex-[3] text-xs font-medium text-gray-400 uppercase tracking-wider pl-6">Details</div>
      </div>

      {/* Row 1 — Sarah Chen */}
      <div className="flex items-center px-4 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
        <div className="flex-[1.5]">
          <div className="text-sm font-medium text-gray-900">Sarah Chen</div>
          <div className="text-xs text-gray-400 mt-0.5">Product Design</div>
        </div>
        <div className="flex-1">
          <Pill variant="green">New hire</Pill>
        </div>
        <div className="flex-1 text-right">
          <span className="text-sm font-mono text-emerald-600 tabular-nums tracking-normal">+$4,231.00</span>
        </div>
        <div className="flex-[3] pl-6">
          <span className="text-sm text-gray-500">Onboarded Mar 18. NY office, full-time W-2.</span>
        </div>
      </div>

      {/* Row 2 — Marcus Webb */}
      <div className="flex items-center px-4 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
        <div className="flex-[1.5]">
          <div className="text-sm font-medium text-gray-900">Marcus Webb</div>
          <div className="text-xs text-gray-400 mt-0.5">Engineering</div>
        </div>
        <div className="flex-1">
          <Pill variant="gray">Termination</Pill>
        </div>
        <div className="flex-1 text-right">
          <span className="text-sm font-mono text-red-500 tabular-nums tracking-normal">-$3,892.00</span>
        </div>
        <div className="flex-[3] pl-6">
          <span className="text-sm text-gray-500">Last day Mar 22. Final paycheck includes accrued PTO.</span>
        </div>
      </div>

      {/* Row 3 — Priya Patel */}
      <div className="flex items-center px-4 py-4 border-b border-gray-50 hover:bg-gray-50/50 transition-colors">
        <div className="flex-[1.5]">
          <div className="text-sm font-medium text-gray-900">Priya Patel</div>
          <div className="text-xs text-gray-400 mt-0.5">Marketing</div>
        </div>
        <div className="flex-1">
          <Pill variant="blue">Raise</Pill>
        </div>
        <div className="flex-1 text-right">
          <span className="text-sm font-mono text-emerald-600 tabular-nums tracking-normal">+$417.00</span>
        </div>
        <div className="flex-[3] pl-6">
          <span className="text-sm text-gray-500">Compensation adjustment effective Mar 1. Approved by manager.</span>
        </div>
      </div>

      {/* Row 4 — James Liu (flagged only, animated) */}
      <div
        ref={jamesRowRef}
        style={{
          maxHeight: flagged ? undefined : "0px",
          opacity: flagged ? undefined : 0,
          overflow: "hidden",
        }}
      >
        <div className="flex items-center px-4 py-4 bg-red-50/60 hover:bg-red-50/80 transition-colors">
          <div className="flex-[1.5]">
            <div className="text-sm font-medium text-gray-900">James Liu</div>
            <div className="text-xs text-gray-400 mt-0.5">Engineering</div>
          </div>
          <div className="flex-1">
            <Pill variant="red">Unexplained</Pill>
          </div>
          <div className="flex-1 text-right">
            <span className="text-sm font-mono text-red-600 font-semibold tabular-nums tracking-normal">+$12,400.00</span>
          </div>
          <div className="flex-[3] pl-6 flex items-center justify-between gap-2">
            <span className="text-sm text-red-600/80">Gross pay 3.2× previous period. No matching event found.</span>
            <a href="#findings" className="shrink-0 text-red-600 text-xs font-medium hover:underline">
              Review →
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
