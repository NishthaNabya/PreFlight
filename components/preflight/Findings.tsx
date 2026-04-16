"use client"

import { useRef, useEffect } from "react"

interface FindingsProps {
  visible: boolean
}

export function Findings({ visible }: FindingsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return
    if (visible) {
      el.style.maxHeight = "0px"
      el.style.opacity = "0"
      el.style.overflow = "hidden"
      void el.offsetHeight
      el.style.transition = "max-height 300ms ease, opacity 250ms ease"
      el.style.maxHeight = "500px"
      el.style.opacity = "1"
    } else {
      el.style.transition = "max-height 200ms ease, opacity 150ms ease"
      el.style.maxHeight = "0px"
      el.style.opacity = "0"
    }
  }, [visible])

  return (
    <div
      ref={wrapperRef}
      id="findings"
      style={{
        maxHeight: visible ? undefined : "0px",
        opacity: visible ? undefined : 0,
        overflow: "hidden",
      }}
    >
      <div
        className="bg-white border border-[#E8E8E3] border-l-4 border-l-red-500 rounded-xl p-6"
        style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
      >
        {/* Header */}
        <div className="flex items-center gap-2">
          <h2 className="text-base font-semibold text-gray-900">Findings</h2>
          <span className="bg-red-100 text-red-700 rounded-full px-2 py-0.5 text-xs font-semibold">
            1 critical
          </span>
        </div>

        {/* Finding card */}
        <div className="mt-4 bg-red-50/40 rounded-lg p-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold bg-red-100 text-red-700">
              Critical
            </span>
            <span className="text-sm font-medium text-gray-900">James Liu · Engineering</span>
          </div>

          <p className="mt-3 text-sm text-gray-700 leading-relaxed">
            James was paid <span className="font-mono font-semibold tabular-nums tracking-normal">$12,400</span> this period. His usual pay is around{" "}
            <span className="font-mono font-semibold tabular-nums tracking-normal">$4,800</span>. That&apos;s more than 2.5× his normal amount. This is
            almost certainly a data entry error — likely hours were entered as{" "}
            <span className="font-mono">100</span> instead of <span className="font-mono">40</span>.
          </p>

          <div className="mt-3 bg-white rounded-md px-3 py-2 border border-gray-200 flex items-start gap-2">
            <span className="text-gray-400 text-sm shrink-0">→</span>
            <p className="text-sm text-gray-600">
              Verify hours with James&apos;s manager before approving this run
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
