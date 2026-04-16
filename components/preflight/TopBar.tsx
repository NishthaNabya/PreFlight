"use client"

interface TopBarProps {
  flagged: boolean
  onToggle: (flagged: boolean) => void
}

export function TopBar({ flagged, onToggle }: TopBarProps) {
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-gray-100 px-6 py-3">
      <div className="mx-auto max-w-[880px] flex items-center justify-between">
        {/* Logo / wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500" />
          <span className="text-base font-semibold tracking-tight text-gray-900">Preflight</span>
        </div>

        {/* Mode toggle */}
        <div className="inline-flex items-center bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => onToggle(false)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              !flagged
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Clean run
          </button>
          <button
            onClick={() => onToggle(true)}
            className={`px-3 py-1.5 text-sm font-medium rounded-md transition-all ${
              flagged
                ? "bg-white text-gray-900 shadow-sm"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Flagged run
          </button>
        </div>
      </div>
    </header>
  )
}
