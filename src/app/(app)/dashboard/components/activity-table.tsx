"use client";

import React, { useState, useMemo } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { activities, vendors } from '@/lib/data';
import { Activity, ActivityStatus } from '@/lib/types';
import { useRouter } from 'next/navigation';
import { ListFilter, Search } from 'lucide-react';

const statusOptions: ActivityStatus[] = ['Draft', 'Pending IO Creation', 'Pending PO', 'Pending Claim', 'Pending Reconciliation', 'Completed', 'Cancelled'];

export default function ActivityTable() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const [filters, setFilters] = useState<{ status: Set<ActivityStatus>, vendor: Set<string> }>({
    status: new Set(),
    vendor: new Set(),
  });
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const handleFilterChange = (type: 'status' | 'vendor', value: string) => {
    setFilters(prev => {
      const newSet = new Set(prev[type]);
      if (newSet.has(value as any)) {
        newSet.delete(value as any);
      } else {
        newSet.add(value as any);
      }
      return { ...prev, [type]: newSet };
    });
  };

  const filteredActivities = useMemo(() => {
    return activities
      .filter(activity => 
        search ? activity.nameOfActivity.toLowerCase().includes(search.toLowerCase()) || activity.id.toLowerCase().includes(search.toLowerCase()) : true
      )
      .filter(activity => 
        filters.status.size > 0 ? filters.status.has(activity.status) : true
      )
      .filter(activity =>
        filters.vendor.size > 0 ? filters.vendor.has(activity.vendor) : true
      )
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
  }, [search, filters]);

  const paginatedActivities = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredActivities.slice(start, end);
  }, [filteredActivities, page]);

  const totalPages = Math.ceil(filteredActivities.length / rowsPerPage);

  const getStatusVariant = (status: ActivityStatus) => {
    switch (status) {
      case 'Completed': return 'default';
      case 'Cancelled': return 'destructive';
      case 'Draft': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search by name or ID..."
            className="w-full pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="sm" className="h-9 gap-1">
              <ListFilter className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Filter</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {statusOptions.map(status => (
              <DropdownMenuCheckboxItem
                key={status}
                checked={filters.status.has(status)}
                onCheckedChange={() => handleFilterChange('status', status)}
              >
                {status}
              </DropdownMenuCheckboxItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuLabel>Filter by Vendor</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {vendors.map(vendor => (
              <DropdownMenuCheckboxItem
                key={vendor.id}
                checked={filters.vendor.has(vendor.name)}
                onCheckedChange={() => handleFilterChange('vendor', vendor.name)}
              >
                {vendor.name}
              </DropdownMenuCheckboxItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Activity ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Country</TableHead>
              <TableHead className="text-right">Amount (USD)</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity: Activity) => (
                <TableRow key={activity.id} onClick={() => router.push(`/activities/${activity.id}`)} className="cursor-pointer">
                  <TableCell className="font-medium">{activity.id}</TableCell>
                  <TableCell>{activity.nameOfActivity}</TableCell>
                  <TableCell>{activity.vendor}</TableCell>
                  <TableCell>{activity.country}</TableCell>
                  <TableCell className="text-right">${activity.fundingAmountUSD.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(activity.status)}>{activity.status}</Badge>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center">No activities found.</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing {Math.min(filteredActivities.length, rowsPerPage * page - rowsPerPage + 1)}-{Math.min(rowsPerPage * page, filteredActivities.length)} of {filteredActivities.length} activities.
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}>
            Previous
          </Button>
          <Button variant="outline" size="sm" onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
