"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { CalendarIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"
import { vendors, glCodes, kpis } from "@/lib/data"

const formSchema = z.object({
  owner: z.string().min(2, { message: "Owner name is required." }),
  nameOfActivity: z.string().min(5, { message: "Activity name must be at least 5 characters." }),
  vendor: z.string({ required_error: "Please select a vendor." }),
  country: z.string({ required_error: "Please select a country." }),
  fundSource: z.string({ required_error: "Please select a fund source." }),
  fundingAmountUSD: z.coerce.number().positive({ message: "Funding amount must be positive." }),
  dateRange: z.object({
    from: z.date({ required_error: "A start date is required." }),
    to: z.date({ required_error: "An end date is required." }),
  }),
  glCode: z.string().optional(),
  kpi: z.string().optional(),
})

export default function CreateActivityPage() {
    const { toast } = useToast()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            owner: "John Doe",
            nameOfActivity: "",
            fundingAmountUSD: 0,
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        console.log(values)
        toast({
            title: "Activity Created (Simulated)",
            description: "The new activity has been saved as a draft.",
        })
        form.reset()
    }

    return (
        <Card>
            <CardHeader>
                <CardTitle>Create New Activity</CardTitle>
                <CardDescription>Fill out the details below to register a new MDF activity. All fields are mandatory unless marked otherwise.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                        <div className="grid md:grid-cols-2 gap-8">
                            <FormField
                                control={form.control}
                                name="owner"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Owner</FormLabel>
                                    <FormControl>
                                    <Input placeholder="Enter owner's name" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="nameOfActivity"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Name of Activity</FormLabel>
                                    <FormControl>
                                    <Input placeholder="e.g., Q4 Product Webinar" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="vendor"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Vendor</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a vendor" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {vendors.map(v => <SelectItem key={v.id} value={v.name}>{v.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="country"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Country</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a country" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="USA">USA</SelectItem>
                                                <SelectItem value="UK">UK</SelectItem>
                                                <SelectItem value="Germany">Germany</SelectItem>
                                                <SelectItem value="Canada">Canada</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="fundSource"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Fund Source</FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a fund source" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                <SelectItem value="MDF">MDF</SelectItem>
                                                <SelectItem value="Co-op">Co-op</SelectItem>
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                             <FormField
                                control={form.control}
                                name="fundingAmountUSD"
                                render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Funding Amount (USD)</FormLabel>
                                    <FormControl>
                                    <Input type="number" placeholder="e.g., 5000" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                                )}
                            />
                        </div>
                         <FormField
                            control={form.control}
                            name="dateRange"
                            render={({ field }) => (
                                <FormItem className="flex flex-col">
                                <FormLabel>Start & End Date</FormLabel>
                                <Popover>
                                    <PopoverTrigger asChild>
                                    <FormControl>
                                        <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal",
                                            !field.value?.from && "text-muted-foreground"
                                        )}
                                        >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {field.value?.from ? (
                                            field.value.to ? (
                                            <>
                                                {format(field.value.from, "LLL dd, y")} -{" "}
                                                {format(field.value.to, "LLL dd, y")}
                                            </>
                                            ) : (
                                            format(field.value.from, "LLL dd, y")
                                            )
                                        ) : (
                                            <span>Pick a date range</span>
                                        )}
                                        </Button>
                                    </FormControl>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-auto p-0" align="start">
                                    <Calendar
                                        mode="range"
                                        selected={field.value}
                                        onSelect={field.onChange}
                                        initialFocus
                                    />
                                    </PopoverContent>
                                </Popover>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                         <div className="grid md:grid-cols-2 gap-8">
                             <FormField
                                control={form.control}
                                name="glCode"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>GL Code <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a GL code" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {glCodes.map(g => <SelectItem key={g.id} value={g.code}>{g.code} - {g.description}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="kpi"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Primary KPI <span className="text-muted-foreground">(Optional)</span></FormLabel>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <FormControl>
                                                <SelectTrigger><SelectValue placeholder="Select a KPI" /></SelectTrigger>
                                            </FormControl>
                                            <SelectContent>
                                                {kpis.map(k => <SelectItem key={k.id} value={k.name}>{k.name}</SelectItem>)}
                                            </SelectContent>
                                        </Select>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                         </div>
                        
                        <div className="flex justify-end gap-2">
                             <Button type="button" variant="outline" onClick={() => form.reset()}>
                                Reset
                            </Button>
                            <Button type="submit">Save as Draft</Button>
                        </div>
                    </form>
                </Form>
            </CardContent>
        </Card>
    )
}
