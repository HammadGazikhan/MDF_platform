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

export default function CreateIOPage({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="flex items-center gap-4 mb-6">
        <BackButton />
        <h1 className="text-2xl font-semibold">Create IO</h1>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Create IO (Internal Order)</CardTitle>
          <CardDescription>
            Create the Internal Order for activity <span className="font-bold">{params.id}</span>.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="ioNumber">IO Number</Label>
            <Input id="ioNumber" placeholder="System Generated or Manual Entry" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="ioAmount">IO Amount (USD)</Label>
            <Input id="ioAmount" type="number" placeholder="Enter amount" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="notes">Notes</Label>
            <Textarea id="notes" placeholder="Add any relevant notes for the IO." />
          </div>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button variant="outline">Cancel</Button>
          <Button>Submit IO</Button>
        </CardFooter>
      </Card>
    </>
  );
}
