"use client"

import { useState, useEffect, useRef } from "react"
import { TopBar } from "@/components/preflight/TopBar"
import { TrustSignal } from "@/components/preflight/TrustSignal"
import { ChangesTable } from "@/components/preflight/ChangesTable"
import { Findings } from "@/components/preflight/Findings"
import { ApprovalBar } from "@/components/preflight/ApprovalBar"

export default function PreflightPage() {
  const [flagged, setFlagged] = useState(false)
  const [fading, setFading] = useState(false)
  const pendingFlagged = useRef(flagged)

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
        {/* Section 1 — Trust Signal */}
        <TrustSignal flagged={flagged} />

        {/* Section 2 — Changes Table */}
        <ChangesTable flagged={flagged} />

        {/* Section 3 — Findings (flagged only) */}
        <Findings visible={flagged} />
      </main>

      <ApprovalBar flagged={flagged} />
    </div>
  )
}
