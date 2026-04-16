# Preflight

**The last manual step in "self-driving" payroll is the approval click. Preflight makes that click an informed decision, not a leap of faith.**

Built as a product concept.

---

## What is this?

Warp automates payroll, compliance, and benefits end-to-end. But even with full automation, someone at every company still has to *approve* each payroll run before money moves. At 1,000+ companies processing $1B+ annually, that's thousands of unreviewed trust decisions every month.

Preflight is the missing review layer. It sits between payroll calculation and payment execution, answering the only question that matters:

> **"Is this safe to approve?"**

It diffs the current run against the previous one, flags anything unusual, explains every change in plain English, and gives a confidence score. Green means go. Amber means something needs a second look.

## How it works

Here's what happens when a payroll run hits Preflight:

```
Previous Run (45 employees, $298K)
        │
        ▼
┌─────────────────────────────────┐
│  1. Cross-run diff              │
│     Match employees by ID.      │
│     Classify every change:      │
│     new hire / term / raise /   │
│     unexplained                 │
├─────────────────────────────────┤
│  2. Anomaly detection           │
│     Pay spike > 2× previous?    │
│     Hours > 80 in a period?     │
│     Flag it with severity.      │
├─────────────────────────────────┤
│  3. Batch scorer                │
│     Aggregate all findings.     │
│     Compute confidence score.   │
│     Recommend: pass or hold.    │
└─────────────────────────────────┘
        │
        ▼
Current Run (47 employees, $312K)
Verdict: 98.4% confidence — approve
```

**A concrete example.** In the "Flagged run" demo, an employee named James Liu shows $16,200 in gross pay. His previous period was $4,800. That's 3.4× his normal pay. Almost certainly someone entered 400 hours instead of 40. Preflight catches it, drops the confidence score to 62.1%, and holds the batch. That's a $12,000 mistake that never reaches the bank.

### The three engine functions

Each one is a pure function with no side effects. Input in, verdict out.

**`lib/engine/diff.ts`** takes two `PayrollRun` objects and produces an array of `EmployeeDelta` items. It matches employees by ID across runs: present in current but not previous = new hire, present in previous but not current = termination, pay changed within 20% = raise, anything else = unexplained. Each delta gets a plain-English explanation generated from the data, not from a template.

**`lib/engine/anomaly.ts`** scans the current run for statistical red flags. Right now it checks two things: pay spikes (gross pay more than 2× the previous period) and impossible hours (more than 80 in a single period for hourly employees). Both are common data entry errors that cost real money if undetected.

**`lib/engine/scorer.ts`** takes all deltas and findings and computes a single confidence score. Critical findings subtract 35 points, warnings subtract 10, unexplained deltas subtract 5. Score above 80 = pass. Below = hold. It also generates a summary string describing what it found.

## What's connected and what's not

This is a product prototype built in under 2 hours from ideation to execution. Here's what's real and what's simulated:

**Real (runs actual logic):**
- The diff engine computes all employee changes from raw payroll data
- The anomaly detector flags pay spikes and hour anomalies programmatically
- The scorer aggregates findings into a confidence score and pass/hold decision
- The toggle doesn't flip between two pre-baked views; it feeds different raw fixture data through the full analysis pipeline and the UI renders whatever comes out

**Simulated (would need real infrastructure):**
- The payroll data is fixture JSON, not a live Check API response
- There's no auth, no database, no audit trail persistence
- The plain-English explanations are template-generated, not LLM-generated
- Historical baselines use previous-run comparison, not a rolling statistical model

The frontend components (`BatchSummary`, `ChangesTable`, `FindingsCard`, `ApprovalBar`) read entirely from the `Verdict` object that the engine produces. They don't contain any business logic or hardcoded display values. Swap in a different engine output and the UI updates accordingly.

## Architecture: how this would scale at Warp

The prototype runs client-side as a demo. In production, the architecture changes:

```
┌──────────────┐     ┌──────────────────┐     ┌───────────────┐
│  Check API   │────▶│  Preflight       │────▶│  Warp         │
│  (payroll    │     │  Service (TS)    │     │  Dashboard    │
│   engine)    │     │                  │     │               │
│  Returns     │     │  • diff.ts       │     │  Renders      │
│  calculated  │     │  • anomaly.ts    │     │  verdict for  │
│  payroll run │     │  • scorer.ts     │     │  founder      │
│              │     │  • history store │     │  approval     │
└──────────────┘     └──────────────────┘     └───────────────┘
                            │
                            ▼
                     ┌──────────────────┐
                     │  Postgres        │
                     │  (Drizzle ORM)   │
                     │                  │
                     │  • Run history   │
                     │  • Audit trail   │
                     │  • Baselines     │
                     └──────────────────┘
```

**What changes at scale:**

- **History store.** Instead of comparing against one previous run, maintain a rolling window of 6-12 runs per employee. Anomaly detection shifts from simple ratio checks to z-score deviation against the historical mean. This catches slower-moving anomalies like gradual salary drift.

- **Audit trail.** Every verdict gets persisted with the full finding set, who approved it, and when. Useful for compliance and debugging. Drizzle ORM + Postgres, matching Warp's existing stack.

- **Webhook integration.** Preflight runs automatically when Check posts a completed payroll calculation. No manual trigger needed. The founder only sees the dashboard if something needs attention.

- **Learning loop.** When a founder overrides a hold (approves despite a finding), that signal feeds back to tune the scoring thresholds. Over time, Preflight gets calibrated to each company's payroll patterns.

## Stack

TypeScript, Next.js 14, Tailwind CSS, Vercel. All analysis runs client-side as pure functions. No external dependencies, no data leaves the browser.

## Try the demo

Toggle between "Clean run" and "Flagged run" in the top-right corner. Watch the confidence score, the changes table, and the approval button update based on what the engine finds.

In clean mode, everything checks out: 2 new hires, 1 termination, 1 raise, all accounted for. 98.4% confidence. Green button.

In flagged mode, James Liu's gross pay spikes 3.4×. Preflight catches it, explains it in plain English, and holds the batch. 62.1% confidence. Amber button.

---
