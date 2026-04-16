import type { PayrollRun, Verdict } from '../types';
import { diffRuns } from './diff';
import { detectAnomalies } from './anomaly';
import { scoreRun } from './scorer';

export function analyzePayrollRun(prev: PayrollRun, curr: PayrollRun): Verdict {
  const deltas = diffRuns(prev, curr);
  const findings = detectAnomalies(prev, curr);
  const { score, status, summary } = scoreRun(deltas, findings);

  const totalGross = curr.employees.reduce((sum, e) => sum + e.grossPay, 0);
  const stateCount = new Set(curr.employees.map(e => e.state)).size;

  return {
    score,
    status,
    totalEmployees: curr.employees.length,
    totalGross,
    stateCount,
    summary,
    deltas,
    findings,
  };
}
