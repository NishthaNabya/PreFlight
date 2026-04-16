"use client"

import { useRef, useEffect } from "react"
import type { Finding } from "@/lib/types"

interface FindingsProps {
  findings: Finding[]
}

export function Findings({ findings }: FindingsProps) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const visible = findings.length > 0

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

  const criticalCount = findings.filter((f) => f.severity === "critical").length
  const warningCount = findings.filter((f) => f.severity === "warning").length
  const badgeParts: string[] = []
  if (criticalCount > 0) badgeParts.push(`${criticalCount} critical`)
  if (warningCount > 0) badgeParts.push(`${warningCount} warning`)

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
            {badgeParts.join(", ")}
          </span>
        </div>

        {/* Finding cards */}
        {findings.map((finding, i) => (
          <div
            key={`${finding.employeeId}-${i}`}
            className="mt-4 bg-red-50/40 rounded-lg p-4"
          >
            <div className="flex items-center gap-2">
              <span
                className={`inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold ${
                  finding.severity === "critical"
                    ? "bg-red-100 text-red-700"
                    : "bg-amber-100 text-amber-700"
                }`}
              >
                {finding.severity === "critical" ? "Critical" : "Warning"}
              </span>
              <span className="text-sm font-medium text-gray-900">
                {finding.employeeName} &middot; {finding.department}
              </span>
            </div>

            <p className="mt-3 text-sm text-gray-700 leading-relaxed">
              {finding.description}
            </p>

            <div className="mt-3 bg-white rounded-md px-3 py-2 border border-gray-200 flex items-start gap-2">
              <span className="text-gray-400 text-sm shrink-0">&rarr;</span>
              <p className="text-sm text-gray-600">
                {finding.suggestedAction}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
