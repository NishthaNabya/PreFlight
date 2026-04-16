"use client"

import type { EmployeeDelta, ChangeType } from "@/lib/types"

interface ChangesTableProps {
  deltas: EmployeeDelta[]
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

const changeConfig: Record<
  ChangeType,
  { variant: "green" | "gray" | "blue" | "red"; label: string }
> = {
  new_hire: { variant: "green", label: "New hire" },
  termination: { variant: "gray", label: "Termination" },
  raise: { variant: "blue", label: "Raise" },
  unexplained: { variant: "red", label: "Unexplained" },
}

function formatDelta(amount: number): string {
  const sign = amount >= 0 ? "+" : "\u2212"
  const formatted = Math.abs(amount)
    .toFixed(2)
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  return `${sign}$${formatted}`
}

export function ChangesTable({ deltas }: ChangesTableProps) {
  return (
    <div
      className="bg-white border border-[#E8E8E3] rounded-xl overflow-hidden"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}
    >
      {/* Card header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
        <h2 className="text-lg font-semibold text-gray-900">
          Changes from last run
        </h2>
        <span className="bg-gray-100 text-gray-600 rounded-full px-2.5 py-0.5 text-xs font-medium">
          {deltas.length} change{deltas.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Column headers */}
      <div className="flex px-4 py-2 border-b border-gray-100">
        <div className="flex-[1.5] text-xs font-medium text-gray-400 uppercase tracking-wider">
          Employee
        </div>
        <div className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wider">
          Change
        </div>
        <div className="flex-1 text-xs font-medium text-gray-400 uppercase tracking-wider text-right">
          Impact
        </div>
        <div className="flex-[3] text-xs font-medium text-gray-400 uppercase tracking-wider pl-6">
          Details
        </div>
      </div>

      {/* Rows */}
      {deltas.map((delta) => {
        const config = changeConfig[delta.changeType]
        const isUnexplained = delta.changeType === "unexplained"
        const amountColor = isUnexplained
          ? "text-red-600 font-semibold"
          : delta.dollarDelta >= 0
            ? "text-emerald-600"
            : "text-red-500"

        return (
          <div
            key={delta.employee.id}
            className={`flex items-center px-4 py-4 border-b border-gray-50 transition-colors ${
              isUnexplained
                ? "bg-red-50/60 hover:bg-red-50/80"
                : "hover:bg-gray-50/50"
            }`}
          >
            <div className="flex-[1.5]">
              <div className="text-sm font-medium text-gray-900">
                {delta.employee.name}
              </div>
              <div className="text-xs text-gray-400 mt-0.5">
                {delta.employee.department}
              </div>
            </div>
            <div className="flex-1">
              <Pill variant={config.variant}>{config.label}</Pill>
            </div>
            <div className="flex-1 text-right">
              <span
                className={`text-sm font-mono tabular-nums tracking-normal ${amountColor}`}
              >
                {formatDelta(delta.dollarDelta)}
              </span>
            </div>
            <div
              className={`flex-[3] pl-6 ${isUnexplained ? "flex items-center justify-between gap-2" : ""}`}
            >
              <span
                className={`text-sm ${isUnexplained ? "text-red-600/80" : "text-gray-500"}`}
              >
                {delta.explanation}
              </span>
              {isUnexplained && (
                <a
                  href="#findings"
                  className="shrink-0 text-red-600 text-xs font-medium hover:underline"
                >
                  Review &rarr;
                </a>
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}
