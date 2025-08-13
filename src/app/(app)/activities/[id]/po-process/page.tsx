import { BackButton } from "@/components/layout/back-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

export default function POProcessPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-2xl font-semibold">PO Process</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>PO (Purchase Order) Process</CardTitle>
          <CardDescription>
            Manage the Purchase Order for activity <span className="font-bold">{params.id}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="poNumber">PO Number</Label>
            <Input id="poNumber" placeholder="Enter PO Number from finance" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="invoice">Upload Invoice</Label>
            <Input id="invoice" type="file" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Comments</Label>
            <Textarea id="notes" placeholder="Add any comments related to the PO." />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Save as Draft</Button>
          <Button>Submit for Approval</Button>
        </CardFooter>
      </Card>
    </>
  );
}
