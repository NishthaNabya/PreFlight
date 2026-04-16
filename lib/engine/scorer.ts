import type { EmployeeDelta, Finding } from '../types';

export function scoreRun(
  deltas: EmployeeDelta[],
  findings: Finding[],
): { score: number; status: 'pass' | 'hold'; summary: string } {
  let score = 100;
  score -= findings.filter(f => f.severity === 'critical').length * 35;
  score -= findings.filter(f => f.severity === 'warning').length * 10;
  score -= deltas.filter(d => d.changeType === 'unexplained').length * 5;
  score = Math.max(0, Math.min(100, score));

  const status = score >= 80 ? 'pass' : 'hold';

  const newHires = deltas.filter(d => d.changeType === 'new_hire').length;
  const raises = deltas.filter(d => d.changeType === 'raise').length;
  const flaggedCount = findings.length;

  const summary =
    flaggedCount === 0
      ? `${newHires} new hire${newHires !== 1 ? 's' : ''}, ${raises} compensation change${raises !== 1 ? 's' : ''}. All changes accounted for.`
      : `${flaggedCount} item${flaggedCount !== 1 ? 's' : ''} need${flaggedCount === 1 ? 's' : ''} review before approval.`;

  return { score, status, summary };
}
