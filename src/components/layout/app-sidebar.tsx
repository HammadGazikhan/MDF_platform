
"use client";

import { usePathname } from 'next/navigation';
import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  SidebarGroup,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  FilePlus2,
  Book,
  History,
  HardHat,
  ChevronDown,
  Warehouse,
  Key,
  Database,
  Globe,
  Users
} from 'lucide-react';
import Link from 'next/link';
import { useRole } from '@/context/RoleContext';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { cn } from '@/lib/utils';
import React from 'react';

export default function AppSidebar() {
  const pathname = usePathname();
  const { role } = useRole();

  const isActive = (path: string) => pathname === path || (path !== '/dashboard' && pathname.startsWith(path));

  const lookupTablesOpen = [
    '/lookup/vendors',
    '/lookup/gl-codes',
    '/lookup/kpi',
    '/lookup/vendor-quarter',
    '/lookup/country-approver'
  ].some(p => isActive(p));
  
  const [isLookupOpen, setIsLookupOpen] = React.useState(lookupTablesOpen);

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center gap-2">
            <HardHat className="h-8 w-8 text-primary" />
            <div className="flex flex-col">
                <h2 className="text-lg font-semibold text-sidebar-foreground">MDF Platform</h2>
                <p className="text-xs text-sidebar-foreground/80">by Westcon</p>
            </div>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarMenu>
          <SidebarMenuItem>
            <Link href="/dashboard" passHref>
              <SidebarMenuButton isActive={isActive('/dashboard')} tooltip="Dashboard">
                <LayoutDashboard />
                <span>Dashboard</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          <SidebarMenuItem>
            <Link href="/activities/create" passHref>
              <SidebarMenuButton isActive={isActive('/activities/create')} tooltip="Create Activity">
                <FilePlus2 />
                <span>Create Activity</span>
              </SidebarMenuButton>
            </Link>
          </SidebarMenuItem>
          
          {(role === 'Admin' || role === 'Marketing Ops') && (
            <SidebarGroup>
               <Collapsible open={isLookupOpen} onOpenChange={setIsLookupOpen}>
                <CollapsibleTrigger asChild>
                    <SidebarMenuButton className='justify-between group w-full'>
                        <div className='flex items-center gap-2'>
                            <Book />
                            <span>Lookup Tables</span>
                        </div>
                        <ChevronDown className={cn('h-4 w-4 transition-transform duration-200', isLookupOpen && 'rotate-180')} />
                    </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent className='py-2 pl-4 data-[state=closed]:hidden'>
                    <SidebarMenu>
                         <SidebarMenuItem>
                            <Link href="/lookup/vendors" passHref><SidebarMenuButton size="sm" isActive={isActive('/lookup/vendors')}><Warehouse /><span>Vendors</span></SidebarMenuButton></Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/lookup/gl-codes" passHref><SidebarMenuButton size="sm" isActive={isActive('/lookup/gl-codes')}><Key /><span>GL Codes</span></SidebarMenuButton></Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/lookup/kpi" passHref><SidebarMenuButton size="sm" isActive={isActive('/lookup/kpi')}><Database /><span>KPI</span></SidebarMenuButton></Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/lookup/vendor-quarter" passHref><SidebarMenuButton size="sm" isActive={isActive('/lookup/vendor-quarter')}><Globe /><span>Vendor Quarter</span></SidebarMenuButton></Link>
                        </SidebarMenuItem>
                        <SidebarMenuItem>
                            <Link href="/lookup/country-approver" passHref><SidebarMenuButton size="sm" isActive={isActive('/lookup/country-approver')}><Users /><span>Country Approver</span></SidebarMenuButton></Link>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </CollapsibleContent>
               </Collapsible>
            </SidebarGroup>
          )}

          {role === 'Admin' && (
            <SidebarMenuItem>
                <Link href="/audit-logs" passHref>
                    <SidebarMenuButton isActive={isActive('/audit-logs')} tooltip="Audit Logs">
                        <History />
                        <span>Audit Logs</span>
                    </SidebarMenuButton>
                </Link>
            </SidebarMenuItem>
          )}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        {/* Can add footer items here if needed */}
      </SidebarFooter>
    </Sidebar>
  );
}
