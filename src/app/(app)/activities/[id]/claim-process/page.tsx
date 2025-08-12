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

export default function ClaimProcessPage({ params }: { params: { id:string } }) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Claim Process</CardTitle>
        <CardDescription>
          Submit claim for activity <span className="font-bold">{params.id}</span>.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="claimAmount">Claim Amount (USD)</Label>
          <Input id="claimAmount" type="number" placeholder="Enter amount to be claimed" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="pop">Proof of Performance (POP)</Label>
          <Input id="pop" type="file" />
          <p className="text-xs text-muted-foreground">Upload documents, reports, or images as proof of activity execution.</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="notes">Claim Notes</Label>
          <Textarea id="notes" placeholder="Add any notes for the finance team." />
        </div>
      </CardContent>
      <CardFooter className="justify-end gap-2">
        <Button variant="outline">Save Claim Draft</Button>
        <Button className="bg-accent hover:bg-accent/90">Submit Claim</Button>
      </CardFooter>
    </Card>
  );
}
