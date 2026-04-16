"use client"

import { useState, useMemo, useRef } from "react"
import { TopBar } from "@/components/preflight/TopBar"
import { TrustSignal } from "@/components/preflight/TrustSignal"
import { ChangesTable } from "@/components/preflight/ChangesTable"
import { Findings } from "@/components/preflight/Findings"
import { ApprovalBar } from "@/components/preflight/ApprovalBar"
import { analyzePayrollRun } from "@/lib/engine"
import { clean_prev, clean_current, flagged_prev, flagged_current } from "@/lib/fixtures"

export default function PreflightPage() {
  const [flagged, setFlagged] = useState(false)
  const [fading, setFading] = useState(false)
  const pendingFlagged = useRef(flagged)

  const cleanVerdict = useMemo(() => analyzePayrollRun(clean_prev, clean_current), [])
  const flaggedVerdict = useMemo(() => analyzePayrollRun(flagged_prev, flagged_current), [])

  const verdict = flagged ? flaggedVerdict : cleanVerdict
  const run = flagged ? flagged_current : clean_current

  function handleToggle(next: boolean) {
    if (next === flagged) return
    pendingFlagged.current = next
    setFading(true)
    setTimeout(() => {
      setFlagged(pendingFlagged.current)
      setFading(false)
    }, 150)
  }

  return (
    <div className="min-h-screen bg-white">
      <TopBar flagged={flagged} onToggle={handleToggle} />

      <main
        className="mx-auto max-w-[880px] px-6 py-8 pb-32 flex flex-col gap-5"
        style={{
          opacity: fading ? 0 : 1,
          transition: "opacity 150ms ease",
        }}
      >
        <TrustSignal
          score={verdict.score}
          status={verdict.status}
          summary={verdict.summary}
          companyName={run.companyName}
          payPeriodStart={run.payPeriodStart}
          payPeriodEnd={run.payPeriodEnd}
          runId={run.id}
          totalEmployees={verdict.totalEmployees}
          totalGross={verdict.totalGross}
          stateCount={verdict.stateCount}
        />

        <ChangesTable deltas={verdict.deltas} />

        <Findings findings={verdict.findings} />
      </main>

      <ApprovalBar
        status={verdict.status}
        runId={run.id}
        totalGross={verdict.totalGross}
        payPeriodEnd={run.payPeriodEnd}
      />
    </div>
  )
}
