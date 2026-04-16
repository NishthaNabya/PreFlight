"use client"

interface ApprovalBarProps {
  flagged: boolean
}

export function ApprovalBar({ flagged }: ApprovalBarProps) {
  return (
    <footer
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 px-6 py-4 z-50"
      style={{ boxShadow: "0 -4px 12px rgba(0,0,0,0.03)" }}
    >
      <div className="mx-auto max-w-[880px] flex items-center justify-between">
        <span className="text-xs font-mono text-gray-400">
          Run #2847 · $312,847.23 · Mar 31, 2026
        </span>

        {flagged ? (
          <button
            className="bg-amber-500 hover:bg-amber-600 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            style={{ transition: "all 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Hold for review
          </button>
        ) : (
          <button
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2.5 rounded-lg text-sm font-semibold shadow-sm transition-all hover:shadow-md active:scale-[0.98]"
            style={{ transition: "all 150ms ease" }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.02)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            Approve and submit →
          </button>
        )}
      </div>
    </footer>
  )
}
