import { notFound } from "next/navigation";
import { activities, attachments, comments, processSteps } from "@/lib/data";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { format } from "date-fns";
import { ActivityStatus, Attachment, Comment } from "@/lib/types";
import {
  CheckCircle,
  Circle,
  Clock,
  File,
  MessageSquare,
  Paperclip,
} from "lucide-react";
import Link from "next/link";
import { BackButton } from "@/components/layout/back-button";

// Timeline component - creating a new one since it is not in shadcn/ui
const TimelineComponents = {
  Timeline: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLOListElement>) => (
    <ol className="flex flex-col gap-y-6" {...props}>
      {children}
    </ol>
  ),
  TimelineItem: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLLIElement>) => (
    <li className="flex gap-x-3" {...props}>
      {children}
    </li>
  ),
  TimelineConnector: () => <div className="w-px bg-border -mt-8" />,
  TimelineHeader: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex flex-col" {...props}>
      {children}
    </div>
  ),
  TimelineTitle: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLHeadingElement>) => (
    <h3 className="font-semibold" {...props}>
      {children}
    </h3>
  ),
  TimelineIcon: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div
      className="flex items-center justify-center p-1.5 rounded-full bg-primary text-primary-foreground"
      {...props}
    >
      {children}
    </div>
  ),
  TimelineDescription: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLParagraphElement>) => (
    <p className="text-sm text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  TimelineContent: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLDivElement>) => (
    <div className="flex-1" {...props}>
      {children}
    </div>
  ),
  TimelineTime: ({
    children,
    ...props
  }: React.HTMLAttributes<HTMLTimeElement>) => (
    <time className="text-xs text-muted-foreground" {...props}>
      {children}
    </time>
  ),
};

const getStatusVariant = (status: ActivityStatus) => {
  switch (status) {
    case "Completed":
      return "default";
    case "Cancelled":
      return "destructive";
    case "Draft":
      return "secondary";
    default:
      return "outline";
  }
};

export default function ActivityDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const activity = activities.find((a) => a.id === params.id);

  if (!activity) {
    notFound();
  }

  const activityAttachments = attachments.filter(
    (a) => a.activityId === activity.id
  );
  const activityComments = comments.filter((c) => c.activityId === activity.id);
  const activityProcessSteps = processSteps.filter(
    (p) => p.activityId === activity.id
  );

  const {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineHeader,
    TimelineTitle,
    TimelineIcon,
    TimelineDescription,
    TimelineContent,
    TimelineTime,
  } = TimelineComponents;

  return (
    <div className="space-y-6">
        <div className="flex items-center gap-4">
            <BackButton />
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6 h-full">
            <Card>
            <CardHeader>
                <div className="flex justify-between items-start">
                <div>
                    <CardTitle className="text-2xl">
                    {activity.nameOfActivity}
                    </CardTitle>
                    <CardDescription>Activity ID: {activity.id}</CardDescription>
                </div>
                <Badge
                    variant={getStatusVariant(activity.status)}
                    className="text-sm"
                >
                    {activity.status}
                </Badge>
                </div>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <p className="text-muted-foreground">Owner</p>
                    <p>{activity.owner}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Vendor</p>
                    <p>{activity.vendor}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Country</p>
                    <p>{activity.country}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Start Date</p>
                    <p>{format(new Date(activity.startDate), "PPP")}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">End Date</p>
                    <p>{format(new Date(activity.endDate), "PPP")}</p>
                </div>
                <div>
                    <p className="text-muted-foreground">Fund Source</p>
                    <p>{activity.fundSource}</p>
                </div>
                </div>
                <Separator className="my-4" />
                <div>
                <p className="text-muted-foreground">Funding Amount (USD)</p>
                <p className="text-2xl font-bold">
                    ${activity.fundingAmountUSD.toLocaleString()}
                </p>
                </div>
            </CardContent>
            </Card>

            <Tabs defaultValue="attachments">
            <TabsList>
                <TabsTrigger value="attachments">
                <Paperclip className="w-4 h-4 mr-2" />
                Attachments
                </TabsTrigger>
                <TabsTrigger value="comments">
                <MessageSquare className="w-4 h-4 mr-2" />
                Comments
                </TabsTrigger>
                <TabsTrigger value="history">
                <File className="w-4 h-4 mr-2" />
                Process History
                </TabsTrigger>
            </TabsList>
            <TabsContent value="attachments">
                <Card>
                <CardContent className="pt-6">
                    {activityAttachments.length > 0 ? (
                    <Table>
                        <TableHeader>
                        <TableRow>
                            <TableHead>File Name</TableHead>
                            <TableHead>Uploaded By</TableHead>
                            <TableHead>Date</TableHead>
                        </TableRow>
                        </TableHeader>
                        <TableBody>
                        {activityAttachments.map((att: Attachment) => (
                            <TableRow key={att.id}>
                            <TableCell>
                                <a
                                href={att.url}
                                className="text-primary hover:underline"
                                >
                                {att.fileName}
                                </a>
                            </TableCell>
                            <TableCell>{att.uploadedBy}</TableCell>
                            <TableCell>
                                {format(new Date(att.uploadedAt), "PPP")}
                            </TableCell>
                            </TableRow>
                        ))}
                        </TableBody>
                    </Table>
                    ) : (
                    <p className="text-muted-foreground text-center">
                        No attachments found.
                    </p>
                    )}
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="comments">
                <Card>
                <CardContent className="pt-6 space-y-4">
                    {activityComments.length > 0 ? (
                    activityComments.map((comment: Comment) => (
                        <div key={comment.id} className="flex gap-3">
                        <div className="flex-shrink-0">
                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold">
                            {comment.author.charAt(0)}
                            </div>
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                            <p className="font-semibold">{comment.author}</p>
                            <p className="text-xs text-muted-foreground">
                                {format(new Date(comment.createdAt), "PPp")}
                            </p>
                            </div>
                            <p className="text-sm">{comment.text}</p>
                        </div>
                        </div>
                    ))
                    ) : (
                    <p className="text-muted-foreground text-center">
                        No comments yet.
                    </p>
                    )}
                </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="history">
                <Card>
                <CardContent className="pt-6">
                    <Timeline>
                    {activityProcessSteps.map((step, index) => (
                        <TimelineItem key={step.id}>
                        <div className="flex flex-col h-full">
                            <TimelineIcon>
                            {step.status === "Completed" ? (
                                <CheckCircle className="h-4 w-4" />
                            ) : step.status === "In Progress" ? (
                                <Clock className="h-4 w-4 animate-spin" />
                            ) : (
                                <Circle className="h-4 w-4" />
                            )}
                            </TimelineIcon>
                            {index < activityProcessSteps.length - 1 && (
                            <TimelineConnector />
                            )}
                        </div>
                        <TimelineContent>
                            <TimelineHeader>
                            <TimelineTitle>{step.stepName}</TimelineTitle>
                            <TimelineTime>
                                {format(new Date(step.updatedAt), "PPP")}
                            </TimelineTime>
                            </TimelineHeader>
                            <TimelineDescription>
                            Status updated to {step.status} by {step.updatedBy}.
                            </TimelineDescription>
                        </TimelineContent>
                        </TimelineItem>
                    ))}
                    </Timeline>
                </CardContent>
                </Card>
            </TabsContent>
            </Tabs>
        </div>

        <div className="lg:col-span-1 space-y-6 h-full">
            <Card>
            <CardHeader>
                <CardTitle>Process Flow</CardTitle>
                <CardDescription>
                Manage the activity through its lifecycle.
                </CardDescription>
            </CardHeader>
            <CardContent className="!space-y-2 flex flex-col gap-0.5">
                <Link href={`/activities/${activity.id}/create-io`} passHref>
                <Button
                    className="w-full justify-start"
                    variant={
                    activity.status === "Pending IO Creation"
                        ? "default"
                        : "outline"
                    }
                >
                    Create IO
                </Button>
                </Link>
                <Link href={`/activities/${activity.id}/po-process`} passHref>
                <Button
                    className="w-full justify-start"
                    variant={
                    activity.status === "Pending PO" ? "default" : "outline"
                    }
                >
                    PO Process
                </Button>
                </Link>
                <Link href={`/activities/${activity.id}/claim-process`} passHref>
                <Button
                    className="w-full justify-start"
                    variant={
                    activity.status === "Pending Claim" ? "default" : "outline"
                    }
                >
                    Claim Process
                </Button>
                </Link>
                <Link href={`/activities/${activity.id}/reconciliation`} passHref>
                <Button
                    className="w-full justify-start"
                    variant={
                    activity.status === "Pending Reconciliation"
                        ? "default"
                        : "outline"
                    }
                >
                    Reconciliation
                </Button>
                </Link>
            </CardContent>
            </Card>
        </div>
        </div>
    </div>
  );
}
