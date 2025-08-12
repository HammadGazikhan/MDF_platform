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
import { vendorQuarters, vendors } from "@/lib/data";

export default function VendorQuarterPage() {
  const getVendorName = (vendorId: string) => {
    return vendors.find(v => v.id === vendorId)?.name || 'Unknown Vendor';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor Quarters</CardTitle>
        <CardDescription>Configuration of vendors per quarter.</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Vendor</TableHead>
              <TableHead>Quarter</TableHead>
              <TableHead>Year</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorQuarters.map((vq) => (
              <TableRow key={vq.id}>
                <TableCell className="font-medium">{getVendorName(vq.vendorId)}</TableCell>
                <TableCell>{vq.quarter}</TableCell>
                <TableCell>{vq.year}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
