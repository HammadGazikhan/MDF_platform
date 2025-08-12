# **App Name**: MDF Platform UI Demo

## Core Features:

- Fake Authentication: Authentication pages (/login) with a fake login (no real auth, just redirects to dashboard).
- Role-Based Views: Role-based views: Marketing, Marketing Ops, and Admin — simulate role by setting a variable.
- Activity Dashboard: Dashboard (/dashboard) showing all activities in a table with filters, search, and pagination, all powered by local static arrays.
- Activity Creation Form: Create Activity form (/activities/create) with all mandatory fields populated by data from local static JSON objects.
- Activity Details: Activity Details page (/activities/[id]) showing all info plus dummy attachments, comments, and process step history.
- Process Flow Screens: Process flow screens (Create IO, PO Process, Claim Process, Reconciliation) with dummy form fields and status updates, all using static data.
- Lookup Tables: Lookup Tables pages for Vendors, GLCodes, KPI, VendorQuarter, and CountryApprover displayed in tables with dummy entries, using local data.
- Audit Logs: Audit Logs page showing a table of dummy log entries, sourcing from a local static dataset.

## Style Guidelines:

- Primary color: Slate blue (#708090) for a professional and reliable feel.
- Background color: Light gray (#F0F0F0) for a clean and modern look.
- Accent color: Teal (#008080) for interactive elements and highlights, promoting trust and clarity.
- Body and headline font: 'Inter', a grotesque-style sans-serif with a modern, machined, objective, neutral look; suitable for headlines or body text
- Use consistent, professional icons from a library like FontAwesome or Material Icons.
- Responsive grid-based layout for consistent spacing and alignment across devices.
- Subtle animations for transitions and interactions to enhance user experience.