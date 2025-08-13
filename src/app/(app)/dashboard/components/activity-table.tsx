
"use client";

import React, { useState, useMemo, useEffect } from "react";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { activities as initialActivities } from "@/lib/data";
import { Activity, ActivityStatus } from "@/lib/types";
import { useRouter } from "next/navigation";
import { ListFilter, Search, PlusCircle, X, Save, Ban } from "lucide-react";
import { useRole } from "@/context/RoleContext";
import { cn } from "@/lib/utils";

const statusOptions: ActivityStatus[] = [
  "Draft",
  "Pending IO Creation",
  "Pending PO",
  "Pending Claim",
  "Pending Reconciliation",
  "Completed",
  "Cancelled",
];

const filterableColumns = [
    { value: 'id', label: 'Activity ID' },
    { value: 'nameOfActivity', label: 'Name' },
    { value: 'vendor', label: 'Vendor' },
    { value: 'country', label: 'Country' },
    { value: 'status', label: 'Status' },
    { value: 'fundingAmountUSD', label: 'Amount (USD)' },
];

const filterOperators = [
    { value: 'contains', label: 'contains' },
    { value: 'not_contains', label: 'does not contain' },
    { value: '=', label: '=' },
    { value: '!=', label: '!=' },
    { value: '>', label: '>' },
    { value: '<', label: '<' },
    { value: '>=', label: '>=' },
    { value: '<=', label: '<=' },
    { value: 'starts_with', label: 'starts with' },
    { value: 'ends_with', label: 'ends with' },
];

type Filter = {
  id: string;
  column: string;
  operator: string;
  value: string;
};

export default function ActivityTable() {
  const router = useRouter();
  const { role } = useRole();
  const isAdmin = role === 'Admin';
  
  const [activities, setActivities] = useState<Activity[]>(initialActivities);
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState<Filter[]>([]);
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const [editingRowId, setEditingRowId] = useState<string | null>(null);
  const [editedData, setEditedData] = useState<Partial<Activity> | null>(null);

  useEffect(() => {
    // Reset editing state if role changes
    setEditingRowId(null);
    setEditedData(null);
  }, [role]);

  const addFilter = () => {
    setFilters([...filters, { id: crypto.randomUUID(), column: 'nameOfActivity', operator: 'contains', value: '' }]);
  };

  const removeFilter = (id: string) => {
    setFilters(filters.filter(f => f.id !== id));
  };

  const updateFilter = (id: string, newFilter: Partial<Filter>) => {
    setFilters(filters.map(f => f.id === id ? { ...f, ...newFilter } : f));
  };

  const handleEdit = (activity: Activity) => {
    if (!isAdmin) return;
    setEditingRowId(activity.id);
    setEditedData({ ...activity });
  };

  const handleCancelEdit = () => {
    setEditingRowId(null);
    setEditedData(null);
  };

  const handleSaveEdit = () => {
    if (!editingRowId || !editedData) return;
    setActivities(activities.map(act => act.id === editingRowId ? { ...act, ...editedData } as Activity : act));
    setEditingRowId(null);
    setEditedData(null);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>, field: keyof Activity) => {
      if (!editedData) return;
      const value = e.target.type === 'number' ? parseFloat(e.target.value) : e.target.value;
      setEditedData({ ...editedData, [field]: value });
  };

  const handleSelectChange = (value: string, field: keyof Activity) => {
      if (!editedData) return;
      setEditedData({ ...editedData, [field]: value });
  };


  const filteredActivities = useMemo(() => {
    let filtered = activities.filter((activity) =>
      search
        ? activity.nameOfActivity.toLowerCase().includes(search.toLowerCase()) ||
          activity.id.toLowerCase().includes(search.toLowerCase())
        : true
    );

    if (filters.length > 0) {
        filtered = filtered.filter(activity => {
            return filters.every(filter => {
                if (!filter.column || !filter.operator) return true;
                
                const activityValue = activity[filter.column as keyof Activity];
                const filterValue = filter.value;
                const activityValueStr = String(activityValue).toLowerCase();
                const filterValueStr = String(filterValue).toLowerCase();

                switch (filter.operator) {
                    case '=': return activityValueStr === filterValueStr;
                    case '!=': return activityValueStr !== filterValueStr;
                    case 'contains': return activityValueStr.includes(filterValueStr);
                    case 'not_contains': return !activityValueStr.includes(filterValueStr);
                    case '>': return activityValue > filterValue;
                    case '<': return activityValue < filterValue;
                    case '>=': return activityValue >= filterValue;
                    case '<=': return activityValue <= filterValue;
                    case 'starts_with': return activityValueStr.startsWith(filterValueStr);
                    case 'ends_with': return activityValueStr.endsWith(filterValueStr);
                    default: return true;
                }
            });
        });
    }

    return filtered.sort(
      (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
  }, [search, filters, activities]);

  const paginatedActivities = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredActivities.slice(start, end);
  }, [filteredActivities, page]);

  const totalPages = Math.ceil(filteredActivities.length / rowsPerPage);

  const getStatusVariant = (status: ActivityStatus) => {
    switch (status) {
      case "Completed": return "default";
      case "Cancelled": return "destructive";
      case "Draft": return "secondary";
      default: return "outline";
    }
  };

  const renderCell = (activity: Activity, field: keyof Activity) => {
    const isEditing = editingRowId === activity.id;
    if (!isEditing) {
        if (field === 'status') {
            return <Badge variant={getStatusVariant(activity.status)}>{activity.status}</Badge>;
        }
        if (field === 'fundingAmountUSD') {
            return `$${activity.fundingAmountUSD.toLocaleString()}`;
        }
        return activity[field] as string;
    }

    // Editing mode
    if (field === 'status') {
        return (
            <Select value={editedData?.status} onValueChange={(val) => handleSelectChange(val, 'status')}>
                <SelectTrigger className="h-8"><SelectValue /></SelectTrigger>
                <SelectContent>
                    {statusOptions.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
            </Select>
        );
    }
    
    if (field === 'fundingAmountUSD') {
        return (
            <Input
                type="number"
                value={editedData?.fundingAmountUSD || ''}
                onChange={(e) => handleInputChange(e, 'fundingAmountUSD')}
                className="h-8"
            />
        )
    }

    return (
        <Input
            value={(editedData?.[field as keyof Activity] as string) || ''}
            onChange={(e) => handleInputChange(e, field)}
            className="h-8"
        />
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-4">
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
          <Button variant="outline" onClick={addFilter}>
            <PlusCircle className="mr-2" />
            Add Filter
          </Button>
        </div>
        {filters.length > 0 && (
            <div className="space-y-2 p-4 border rounded-lg bg-muted/50">
                <h4 className="text-sm font-medium">Filters</h4>
                {filters.map((filter, index) => (
                    <div key={filter.id} className="flex items-center gap-2">
                        <Select value={filter.column} onValueChange={(v) => updateFilter(filter.id, { column: v })}>
                            <SelectTrigger className="w-[180px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {filterableColumns.map(col => <SelectItem key={col.value} value={col.value}>{col.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Select value={filter.operator} onValueChange={(v) => updateFilter(filter.id, { operator: v })}>
                            <SelectTrigger className="w-[150px]"><SelectValue /></SelectTrigger>
                            <SelectContent>
                                {filterOperators.map(op => <SelectItem key={op.value} value={op.value}>{op.label}</SelectItem>)}
                            </SelectContent>
                        </Select>
                        <Input 
                            placeholder="Value" 
                            className="flex-1"
                            value={filter.value} 
                            onChange={(e) => updateFilter(filter.id, { value: e.target.value })}
                        />
                         <Button variant="ghost" size="icon" onClick={() => removeFilter(filter.id)}>
                            <X className="h-4 w-4 text-muted-foreground"/>
                        </Button>
                    </div>
                ))}
            </div>
        )}
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
              {isAdmin && <TableHead className="w-[100px]">Actions</TableHead>}
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedActivities.length > 0 ? (
              paginatedActivities.map((activity: Activity) => (
                <TableRow
                  key={activity.id}
                  onClick={() => editingRowId !== activity.id && router.push(`/activities/${activity.id}`)}
                  className={cn(editingRowId !== activity.id && "cursor-pointer", editingRowId === activity.id && "bg-muted/50")}
                >
                  <TableCell className="font-medium">{renderCell(activity, 'id')}</TableCell>
                  <TableCell>{renderCell(activity, 'nameOfActivity')}</TableCell>
                  <TableCell>{renderCell(activity, 'vendor')}</TableCell>
                  <TableCell>{renderCell(activity, 'country')}</TableCell>
                  <TableCell className="text-right">{renderCell(activity, 'fundingAmountUSD')}</TableCell>
                  <TableCell>{renderCell(activity, 'status')}</TableCell>
                   {isAdmin && (
                        <TableCell>
                            {editingRowId === activity.id ? (
                                <div className="flex gap-2">
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleSaveEdit}><Save className="h-4 w-4"/></Button>
                                    <Button size="icon" variant="outline" className="h-8 w-8" onClick={handleCancelEdit}><Ban className="h-4 w-4"/></Button>
                                </div>
                            ) : (
                                <Button variant="outline" size="sm" onClick={(e) => { e.stopPropagation(); handleEdit(activity); }}>Edit</Button>
                            )}
                        </TableCell>
                   )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={isAdmin ? 7: 6} className="text-center">
                  No activities found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {Math.min(
            filteredActivities.length,
            rowsPerPage * page - rowsPerPage + 1
          )}
          - {Math.min(rowsPerPage * page, filteredActivities.length)} of{" "}
          {filteredActivities.length} activities.
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
