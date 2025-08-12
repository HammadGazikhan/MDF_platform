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
import { countryApprovers } from "@/lib/data";

export default function CountryApproverPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Country Approvers</CardTitle>
        <CardDescription>List of approvers for each country.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Country</TableHead>
              <TableHead>Approver Name</TableHead>
              <TableHead>Approver Email</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {countryApprovers.map((ca) => (
              <TableRow key={ca.id}>
                <TableCell className="font-medium">{ca.country}</TableCell>
                <TableCell>{ca.approverName}</TableCell>
                <TableCell>{ca.approverEmail}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
