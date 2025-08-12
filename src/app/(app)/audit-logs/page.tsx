import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { auditLogs } from "@/lib/data";
import { format } from "date-fns";

export default function AuditLogsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Audit Logs</CardTitle>
        <CardDescription>
          A log of all significant actions taken within the platform.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity ID</TableHead>
              <TableHead>Step</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Field Changed</TableHead>
              <TableHead>Old Value</TableHead>
              <TableHead>New Value</TableHead>
              <TableHead>Performed By</TableHead>
              <TableHead>Timestamp</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {auditLogs.map((log) => (
              <TableRow key={log.id}>
                <TableCell className="font-medium">{log.activityId}</TableCell>
                <TableCell>{log.step}</TableCell>
                <TableCell>{log.action}</TableCell>
                <TableCell>{log.fieldChanged || 'N/A'}</TableCell>
                <TableCell>{log.oldValue || 'N/A'}</TableCell>
                <TableCell>{log.newValue || 'N/A'}</TableCell>
                <TableCell>{log.performedBy}</TableCell>
                <TableCell>{format(new Date(log.timestamp), "yyyy-MM-dd HH:mm:ss")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
