export type PayrollRun = {
  id: string;
  companyName: string;
  payPeriodStart: string;
  payPeriodEnd: string;
  employees: Employee[];
};

export type Employee = {
  id: string;
  name: string;
  department: string;
  state: string;
  grossPay: number;
  hoursWorked: number | null;
  payType: 'salary' | 'hourly';
};

export type ChangeType = 'new_hire' | 'termination' | 'raise' | 'unexplained';

export type EmployeeDelta = {
  employee: Employee;
  changeType: ChangeType;
  dollarDelta: number;
  explanation: string;
};

export type Finding = {
  severity: 'critical' | 'warning';
  employeeId: string;
  employeeName: string;
  department: string;
  description: string;
  suggestedAction: string;
};

export type Verdict = {
  score: number;
  status: 'pass' | 'hold';
  totalEmployees: number;
  totalGross: number;
  stateCount: number;
  summary: string;
  deltas: EmployeeDelta[];
  findings: Finding[];
};
