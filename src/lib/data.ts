import {
  User,
  Activity,
  Vendor,
  GLCode,
  KPI,
  VendorQuarter,
  CountryApprover,
  AuditLog,
  Attachment,
  Comment,
  ProcessStep,
  UserRole
} from './types';

export const users: User[] = [
  { id: '1', name: 'John Doe', email: 'john.doe@example.com', role: 'Marketing' },
  { id: '2', name: 'Jane Smith', email: 'jane.smith@example.com', role: 'Marketing Ops' },
  { id: '3', name: 'Admin User', email: 'admin@example.com', role: 'Admin' },
];

export const activities: Activity[] = [
  {
    id: 'ACT-001',
    owner: 'John Doe',
    nameOfActivity: 'Q3 Partner Enablement Webinar',
    vendor: 'Cisco',
    country: 'USA',
    fundSource: 'MDF',
    fundingAmountUSD: 5000,
    startDate: '2024-07-15',
    endDate: '2024-07-20',
    status: 'Pending PO',
    createdAt: '2024-06-01'
  },
  {
    id: 'ACT-002',
    owner: 'John Doe',
    nameOfActivity: 'Cybersecurity Roadshow',
    vendor: 'Palo Alto Networks',
    country: 'UK',
    fundSource: 'MDF',
    fundingAmountUSD: 12000,
    startDate: '2024-08-01',
    endDate: '2024-08-05',
    status: 'Pending Claim',
    createdAt: '2024-06-10'
  },
  {
    id: 'ACT-003',
    owner: 'Jane Smith',
    nameOfActivity: 'Cloud Solutions Summit',
    vendor: 'Microsoft Azure',
    country: 'Germany',
    fundSource: 'Co-op',
    fundingAmountUSD: 8500,
    startDate: '2024-09-10',
    endDate: '2024-09-12',
    status: 'Completed',
    createdAt: '2024-05-20'
  },
  {
    id: 'ACT-004',
    owner: 'John Doe',
    nameOfActivity: 'New Product Launch Campaign',
    vendor: 'Juniper Networks',
    country: 'USA',
    fundSource: 'MDF',
    fundingAmountUSD: 25000,
    startDate: '2024-10-01',
    endDate: '2024-10-31',
    status: 'Draft',
    createdAt: '2024-07-01'
  },
  {
    id: 'ACT-005',
    owner: 'Jane Smith',
    nameOfActivity: 'End-of-Year Customer Appreciation Event',
    vendor: 'Cisco',
    country: 'Canada',
    fundSource: 'MDF',
    fundingAmountUSD: 7500,
    startDate: '2024-12-05',
    endDate: '2024-12-05',
    status: 'Pending IO Creation',
    createdAt: '2024-07-05'
  },
];

export const vendors: Vendor[] = [
  { id: 'V01', name: 'Cisco', country: 'Global' },
  { id: 'V02', name: 'Palo Alto Networks', country: 'Global' },
  { id: 'V03', name: 'Microsoft Azure', country: 'Global' },
  { id: 'V04', name: 'Juniper Networks', country: 'Global' },
];

export const glCodes: GLCode[] = [
  { id: 'GL01', code: '64001', description: 'Marketing Events' },
  { id: 'GL02', code: '64002', description: 'Digital Advertising' },
  { id: 'GL03', code: '64003', description: 'Content Creation' },
];

export const kpis: KPI[] = [
  { id: 'KPI01', name: 'Leads Generated', description: 'Total number of new leads from the activity.' },
  { id: 'KPI02', name: 'Sales Pipeline (USD)', description: 'Value of sales opportunities created.' },
  { id: 'KPI03', name: 'Brand Mentions', description: 'Number of social media and press mentions.' },
];

export const vendorQuarters: VendorQuarter[] = [
  { id: 'VQ01', vendorId: 'V01', quarter: 'Q3', year: 2024 },
  { id: 'VQ02', vendorId: 'V02', quarter: 'Q3', year: 2024 },
  { id: 'VQ03', vendorId: 'V03', quarter: 'Q4', year: 2024 },
];

export const countryApprovers: CountryApprover[] = [
  { id: 'CA01', country: 'USA', approverName: 'David Lee', approverEmail: 'david.lee@example.com' },
  { id: 'CA02', country: 'UK', approverName: 'Sophia Green', approverEmail: 'sophia.green@example.com' },
  { id: 'CA03', country: 'Germany', approverName: 'Klaus Mueller', approverEmail: 'klaus.mueller@example.com' },
];

export const auditLogs: AuditLog[] = [
  { id: 'AL01', activityId: 'ACT-001', step: 'Creation', action: 'Create', performedBy: 'John Doe', timestamp: '2024-06-01 10:00:00' },
  { id: 'AL02', activityId: 'ACT-001', step: 'IO Creation', action: 'Update Status', oldValue: 'Draft', newValue: 'Pending IO Creation', performedBy: 'John Doe', timestamp: '2024-06-02 11:30:00' },
  { id: 'AL03', activityId: 'ACT-001', step: 'PO Process', action: 'Update Status', oldValue: 'Pending IO Creation', newValue: 'Pending PO', performedBy: 'Jane Smith', timestamp: '2024-06-05 15:00:00' },
  { id: 'AL04', activityId: 'ACT-002', step: 'Creation', action: 'Create', performedBy: 'John Doe', timestamp: '2024-06-10 09:00:00' },
];

export const attachments: Attachment[] = [
  { id: 'ATT01', activityId: 'ACT-001', fileName: 'Quote_Cisco_Webinar.pdf', url: '#', uploadedBy: 'John Doe', uploadedAt: '2024-06-01' },
  { id: 'ATT02', activityId: 'ACT-002', fileName: 'Roadshow_Plan.docx', url: '#', uploadedBy: 'John Doe', uploadedAt: '2024-06-10' },
  { id: 'ATT03', activityId: 'ACT-003', fileName: 'Final_Invoice.pdf', url: '#', uploadedBy: 'Jane Smith', uploadedAt: '2024-09-15' },
];

export const comments: Comment[] = [
  { id: 'CMT01', activityId: 'ACT-001', text: 'Waiting for final approval from marketing director.', author: 'John Doe', createdAt: '2024-06-03' },
  { id: 'CMT02', activityId: 'ACT-001', text: 'Approved. Please proceed with PO.', author: 'Jane Smith', createdAt: '2024-06-04' },
  { id: 'CMT03', activityId: 'ACT-002', text: 'Can we increase the budget for catering?', author: 'John Doe', createdAt: '2024-06-11' },
];

export const processSteps: ProcessStep[] = [
    { id: 'PS01', activityId: 'ACT-001', stepName: 'Create IO', status: 'Completed', updatedAt: '2024-06-02', updatedBy: 'John Doe' },
    { id: 'PS02', activityId: 'ACT-001', stepName: 'PO Process', status: 'In Progress', updatedAt: '2024-06-05', updatedBy: 'Jane Smith' },
    { id: 'PS03', activityId: 'ACT-001', stepName: 'Claim Process', status: 'Pending', updatedAt: '2024-06-05', updatedBy: 'System' },
    { id: 'PS04', activityId: 'ACT-002', stepName: 'Create IO', status: 'Completed', updatedAt: '2024-06-11', updatedBy: 'John Doe' },
    { id: 'PS05', activityId: 'ACT-002', stepName: 'PO Process', status: 'Completed', updatedAt: '2024-06-15', updatedBy: 'Jane Smith' },
    { id: 'PS06', activityId: 'ACT-002', stepName: 'Claim Process', status: 'In Progress', updatedAt: '2024-08-10', updatedBy: 'John Doe' },
]
