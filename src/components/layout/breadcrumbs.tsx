"use client";

import React, { Fragment } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { usePage } from '@/context/PageContext';

const getPageTitle = (segment: string, pageTitle: string): string => {
    if (segment === '[id]') {
        return pageTitle;
    }
    // from "some-path" to "Some Path"
    return segment.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
}

export function Breadcrumbs() {
    const pathname = usePathname();
    const { pageTitle } = usePage();
    const segments = pathname.split('/').filter(Boolean);

    if (segments.length === 0) return null;

    return (
        <nav aria-label="Breadcrumb">
            <ol className="flex items-center gap-1.5 text-sm text-muted-foreground">
                <li>
                    <Link href="/dashboard" className="hover:text-foreground">
                        Dashboard
                    </Link>
                </li>
                {segments.slice(1).map((segment, index) => {
                    const isLast = index === segments.length - 2;
                    const path = `/${segments.slice(0, index + 2).join('/')}`;
                    const title = getPageTitle(segment, pageTitle);
                    
                    return (
                        <Fragment key={path}>
                            <ChevronRight className="h-4 w-4" />
                            <li>
                                <Link
                                    href={path}
                                    className={cn(
                                        "hover:text-foreground",
                                        isLast && "text-foreground"
                                    )}
                                    aria-current={isLast ? 'page' : undefined}
                                >
                                    {title}
                                </Link>
                            </li>
                        </Fragment>
                    );
                })}
            </ol>
        </nav>
    );
}
