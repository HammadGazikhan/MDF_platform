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
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

export default function ReconciliationPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-2xl font-semibold">Reconciliation</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Reconciliation</CardTitle>
          <CardDescription>
            Reconcile the final costs for activity <span className="font-bold">{params.id}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="finalAmount">Final Amount Paid (USD)</Label>
            <Input id="finalAmount" type="number" placeholder="Enter the final settled amount" />
          </div>
          <div className="space-y-2">
            <Label>Status</Label>
            <RadioGroup defaultValue="completed" className="flex gap-4">
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="completed" id="r1" />
                <Label htmlFor="r1">Completed</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="cancelled" id="r2" />
                <Label htmlFor="r2">Cancelled / No Claim</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Reconciliation Notes</Label>
            <Textarea id="notes" placeholder="Add final notes for auditing purposes." />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Complete Reconciliation</Button>
        </CardFooter>
      </Card>
    </>
  );
}
