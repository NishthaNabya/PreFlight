import type { PayrollRun, Employee } from './types';

// ── Background employees (44) ──────────────────────────────────────────────
// Present in BOTH previous and current runs with identical pay,
// so the diff engine produces zero deltas for them.

const background: Employee[] = [
  // Engineering (12)
  { id: 'emp-001', name: 'Alex Rivera',       department: 'Engineering',       state: 'CA', grossPay: 9450.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-002', name: 'Jordan Hayes',      department: 'Engineering',       state: 'WA', grossPay: 8820.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-003', name: 'Nina Kowalski',     department: 'Engineering',       state: 'NY', grossPay: 8200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-004', name: 'Dev Chakraborty',   department: 'Engineering',       state: 'TX', grossPay: 7650.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-005', name: 'Emma Larsen',       department: 'Engineering',       state: 'CO', grossPay: 8100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-006', name: 'Raj Anand',         department: 'Engineering',       state: 'CA', grossPay: 6240.00,  hoursWorked: 80,   payType: 'hourly' },
  { id: 'emp-007', name: 'Tanya Brooks',      department: 'Engineering',       state: 'WA', grossPay: 7900.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-008', name: 'Omar Farouk',       department: 'Engineering',       state: 'IL', grossPay: 7350.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-009', name: 'Lisa Nguyen',       department: 'Engineering',       state: 'CA', grossPay: 8500.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-010', name: 'Carlos Mendez',     department: 'Engineering',       state: 'TX', grossPay: 7200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-011', name: 'Wei Zhang',         department: 'Engineering',       state: 'NY', grossPay: 9100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-012', name: "Katie O'Brien",     department: 'Engineering',       state: 'MA', grossPay: 7800.00,  hoursWorked: null, payType: 'salary' },

  // Product Design (5)
  { id: 'emp-013', name: 'Maya Johnson',      department: 'Product Design',    state: 'NY', grossPay: 7200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-014', name: 'Ethan Park',        department: 'Product Design',    state: 'CA', grossPay: 6850.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-015', name: 'Aisha Khan',        department: 'Product Design',    state: 'WA', grossPay: 6500.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-016', name: 'Lucas Moreno',      department: 'Product Design',    state: 'FL', grossPay: 6200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-017', name: 'Hannah Yim',        department: 'Product Design',    state: 'CO', grossPay: 6750.00,  hoursWorked: null, payType: 'salary' },

  // Marketing (5)
  { id: 'emp-018', name: 'Rachel Foster',     department: 'Marketing',         state: 'NY', grossPay: 6400.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-019', name: 'Tom Chen',          department: 'Marketing',         state: 'IL', grossPay: 5900.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-020', name: 'Diana Reeves',      department: 'Marketing',         state: 'GA', grossPay: 5600.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-021', name: 'Sam Okafor',        department: 'Marketing',         state: 'TX', grossPay: 6100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-022', name: 'Megan Li',          department: 'Marketing',         state: 'CA', grossPay: 5800.00,  hoursWorked: null, payType: 'salary' },

  // Sales (7)
  { id: 'emp-023', name: 'Brian Cooper',      department: 'Sales',             state: 'FL', grossPay: 7100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-024', name: 'Ashley Martinez',   department: 'Sales',             state: 'TX', grossPay: 6800.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-025', name: 'David Kim',         department: 'Sales',             state: 'CA', grossPay: 7400.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-026', name: 'Vanessa Cole',      department: 'Sales',             state: 'GA', grossPay: 6500.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-027', name: 'Ryan Schaefer',     department: 'Sales',             state: 'PA', grossPay: 6200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-028', name: 'Julia Santos',      department: 'Sales',             state: 'NC', grossPay: 6900.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-029', name: 'Kevin Murphy',      department: 'Sales',             state: 'IL', grossPay: 7200.00,  hoursWorked: null, payType: 'salary' },

  // Operations (5)
  { id: 'emp-030', name: 'Michelle Taylor',   department: 'Operations',        state: 'OR', grossPay: 5200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-031', name: 'Andre Jackson',     department: 'Operations',        state: 'NC', grossPay: 4800.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-032', name: 'Fiona Gallagher',   department: 'Operations',        state: 'PA', grossPay: 5100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-033', name: 'Chris Wade',        department: 'Operations',        state: 'FL', grossPay: 4950.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-034', name: 'Helen Tran',        department: 'Operations',        state: 'MA', grossPay: 4640.00,  hoursWorked: 80,   payType: 'hourly' },

  // Finance (4)
  { id: 'emp-035', name: 'Steven Grant',      department: 'Finance',           state: 'NY', grossPay: 8200.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-036', name: 'April Lawson',      department: 'Finance',           state: 'CA', grossPay: 7500.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-037', name: 'Nate Herrera',      department: 'Finance',           state: 'TX', grossPay: 7100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-038', name: 'Jenna Powell',      department: 'Finance',           state: 'CO', grossPay: 7650.00,  hoursWorked: null, payType: 'salary' },

  // HR (3)
  { id: 'emp-039', name: 'Daniel Song',       department: 'HR',                state: 'WA', grossPay: 5400.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-040', name: 'Theresa Ruiz',      department: 'HR',                state: 'GA', grossPay: 5100.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-041', name: 'Mike Brennan',      department: 'HR',                state: 'PA', grossPay: 5300.00,  hoursWorked: null, payType: 'salary' },

  // Legal (2)
  { id: 'emp-042', name: 'Claudia Fischer',   department: 'Legal',             state: 'NY', grossPay: 8500.00,  hoursWorked: null, payType: 'salary' },
  { id: 'emp-043', name: 'Henry Douglas',     department: 'Legal',             state: 'MA', grossPay: 7900.00,  hoursWorked: null, payType: 'salary' },

  // Customer Support (1)
  { id: 'emp-044', name: 'Kim Sato',          department: 'Customer Support',  state: 'OR', grossPay: 4132.23,  hoursWorked: 80,   payType: 'hourly' },
];

// ── Named characters ───────────────────────────────────────────────────────

const marcusWebb: Employee = {
  id: 'emp-marcus-webb',
  name: 'Marcus Webb',
  department: 'Engineering',
  state: 'CA',
  grossPay: 3892.00,
  hoursWorked: null,
  payType: 'salary',
};

const sarahChen: Employee = {
  id: 'emp-sarah-chen',
  name: 'Sarah Chen',
  department: 'Product Design',
  state: 'NY',
  grossPay: 4231.00,
  hoursWorked: null,
  payType: 'salary',
};

const priyaPatelPrev: Employee = {
  id: 'emp-priya-patel',
  name: 'Priya Patel',
  department: 'Marketing',
  state: 'CA',
  grossPay: 4217.00,
  hoursWorked: null,
  payType: 'salary',
};

const priyaPatelCurrent: Employee = {
  ...priyaPatelPrev,
  grossPay: 4634.00,
};

const jamesLiu: Employee = {
  id: 'emp-james-liu',
  name: 'James Liu',
  department: 'Engineering',
  state: 'CA',
  grossPay: 4800.00,
  hoursWorked: 80,
  payType: 'hourly',
};

const jamesLiuFlagged: Employee = {
  ...jamesLiu,
  grossPay: 16200.00,
};

const alexRiveraNewHire: Employee = {
  id: 'emp-alex-rivera',
  name: 'Alex Rivera',
  department: 'Sales',
  state: 'CA',
  grossPay: 5100.00,
  hoursWorked: null,
  payType: 'salary',
};

// Reduce the baseline roster so clean_prev has 45 employees.
const baseRoster = background.slice(0, 42);
const returningEmployee = background[42];

// ── Assembled runs ─────────────────────────────────────────────────────────
//
// prev  (45): 42 base + Marcus Webb + Priya Patel (old pay) + James Liu
// curr  (47): 42 base + returning employee + Sarah Chen + Alex Rivera + Priya Patel (new pay) + James Liu
//
// Diff produces: Sarah = new_hire, Alex = new_hire, returning employee = new_hire, Marcus = termination, Priya = raise.
// Flagged variant swaps James's pay to $16,200 → triggers unexplained delta + critical finding.

export const clean_prev: PayrollRun = {
  id: '2846',
  companyName: 'Acme Corp',
  payPeriodStart: '2026-03-01',
  payPeriodEnd: '2026-03-15',
  employees: [...baseRoster, marcusWebb, priyaPatelPrev, jamesLiu],
};

export const clean_current: PayrollRun = {
  id: '2847',
  companyName: 'Acme Corp',
  payPeriodStart: '2026-03-16',
  payPeriodEnd: '2026-03-31',
  employees: [
    ...baseRoster,
    returningEmployee,
    sarahChen,
    alexRiveraNewHire,
    priyaPatelCurrent,
    jamesLiu,
  ],
};

export const flagged_prev: PayrollRun = clean_prev;

export const flagged_current: PayrollRun = {
  ...clean_current,
  employees: clean_current.employees.map(e =>
    e.id === jamesLiu.id ? jamesLiuFlagged : e,
  ),
};
