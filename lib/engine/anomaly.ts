import type { PayrollRun, Finding } from '../types';

function fmt(n: number): string {
  return n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

export function detectAnomalies(prev: PayrollRun, curr: PayrollRun): Finding[] {
  const findings: Finding[] = [];
  const prevMap = new Map(prev.employees.map(e => [e.id, e]));

  for (const emp of curr.employees) {
    const prevEmp = prevMap.get(emp.id);

    if (prevEmp && emp.grossPay > prevEmp.grossPay * 2) {
      const ratio = emp.grossPay / prevEmp.grossPay;
      findings.push({
        severity: 'critical',
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        description: `${emp.name} was paid $${fmt(emp.grossPay)} this period. Their usual pay is around $${fmt(prevEmp.grossPay)}. That\u2019s ${ratio.toFixed(1)}\u00D7 their normal amount.`,
        suggestedAction: `Verify hours with ${emp.name}\u2019s manager before approving this run.`,
      });
    }

    if (emp.payType === 'hourly' && emp.hoursWorked !== null && emp.hoursWorked > 80) {
      findings.push({
        severity: 'critical',
        employeeId: emp.id,
        employeeName: emp.name,
        department: emp.department,
        description: `${emp.hoursWorked} hours reported for ${emp.name} in a single pay period. This exceeds federal overtime thresholds and is likely a data entry error.`,
        suggestedAction: "Confirm actual hours with the employee\u2019s manager.",
      });
    }
  }

  return findings;
}
