import type { PayrollRun, EmployeeDelta } from '../types';

export function diffRuns(prev: PayrollRun, curr: PayrollRun): EmployeeDelta[] {
  const prevMap = new Map(prev.employees.map(e => [e.id, e]));
  const currMap = new Map(curr.employees.map(e => [e.id, e]));
  const deltas: EmployeeDelta[] = [];

  for (const emp of curr.employees) {
    if (!prevMap.has(emp.id)) {
      deltas.push({
        employee: emp,
        changeType: 'new_hire',
        dollarDelta: emp.grossPay,
        explanation: `Onboarded this period. ${emp.state} office, ${emp.payType === 'salary' ? 'full-time' : 'hourly'}.`,
      });
    }
  }

  for (const emp of prev.employees) {
    if (!currMap.has(emp.id)) {
      deltas.push({
        employee: emp,
        changeType: 'termination',
        dollarDelta: -emp.grossPay,
        explanation: 'No longer on payroll this period.',
      });
    }
  }

  for (const currEmp of curr.employees) {
    const prevEmp = prevMap.get(currEmp.id);
    if (!prevEmp) continue;

    const delta = currEmp.grossPay - prevEmp.grossPay;
    if (Math.abs(delta) < 1) continue;

    const percentChange = delta / prevEmp.grossPay;

    if (Math.abs(percentChange) <= 0.20) {
      deltas.push({
        employee: currEmp,
        changeType: 'raise',
        dollarDelta: delta,
        explanation: `Compensation adjustment of ${(percentChange * 100).toFixed(1)}%.`,
      });
    } else {
      deltas.push({
        employee: currEmp,
        changeType: 'unexplained',
        dollarDelta: delta,
        explanation: `Gross pay ${(currEmp.grossPay / prevEmp.grossPay).toFixed(1)}× previous period. No matching event found.`,
      });
    }
  }

  return deltas;
}
