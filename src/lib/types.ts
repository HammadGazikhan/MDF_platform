export type UserRole = 'Marketing' | 'Marketing Ops' | 'Admin';

export type User = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

export type ActivityStatus = 'Draft' | 'Pending IO Creation' | 'Pending PO' | 'Pending Claim' | 'Pending Reconciliation' | 'Completed' | 'Cancelled';

export type Activity = {
  id: string;
  owner: string;
  nameOfActivity: string;
  vendor: string;
  country: string;
  fundSource: string;
  fundingAmountUSD: number;
  startDate: string;
  endDate: string;
  status: ActivityStatus;
  createdAt: string;
};

export type Vendor = {
  id: string;
  name: string;
  country: string;
};

export type GLCode = {
  id: string;
  code: string;
  description: string;
};

export type KPI = {
  id: string;
  name: string;
  description: string;
};

export type VendorQuarter = {
  id: string;
  vendorId: string;
  quarter: string; // e.g., "Q1 2024"
  year: number;
};

export type CountryApprover = {
  id: string;
  country: string;
  approverName: string;
  approverEmail: string;
};

export type AuditLog = {
  id: string;
  activityId: string;
  step: string;
  action: string;
  fieldChanged?: string;
  oldValue?: string;
  newValue?: string;
  performedBy: string;
  timestamp: string;
};

export type Attachment = {
  id: string;
  activityId: string;
  fileName: string;
  url: string;
  uploadedBy: string;
  uploadedAt: string;
};

export type Comment = {
  id: string;
  activityId: string;
  text: string;
  author: string;
  createdAt: string;
};

export type ProcessStep = {
    id: string;
    activityId: string;
    stepName: string;
    status: 'Pending' | 'In Progress' | 'Completed' | 'Skipped';
    updatedAt: string;
    updatedBy: string;
}
