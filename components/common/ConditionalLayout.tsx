'use client';

import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';
import Header from '@/components/common/Header';
import Navigation from '@/components/common/Navigation';
import AIChatbot from '@/components/common/AIChatbot';

// Pages that should NOT have the app shell (Header + Sidebar)
const PUBLIC_PATHS = ['/landing', '/auth/login', '/auth/signup', '/auth/forgot-password'];

interface Props {
    children: ReactNode;
}

export default function ConditionalLayout({ children }: Props) {
    const pathname = usePathname();

    const isPublicPage = PUBLIC_PATHS.some(p => pathname === p || pathname.startsWith(p));

    if (isPublicPage) {
        // Public pages: just render children, no app shell
        return <>{children}</>;
    }

    // App pages: full shell with Header + Navigation
    return (
        <div className="min-h-screen flex flex-col" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-primary)' }}>
            <Header />
            <div className="flex flex-1">
                <Navigation />
                <main className="flex-1 p-4 md:p-6 overflow-auto">
                    {children}
                </main>
            </div>
            <AIChatbot />
            <footer
                style={{ backgroundColor: '#1f2937', color: 'white', borderTop: '1px solid #374151' }}
                className="p-4 text-center"
            >
                <p className="text-sm" style={{ color: '#d1d5db' }}>
                    &copy; {new Date().getFullYear()} KhetTech. All rights reserved.
                </p>
            </footer>
        </div>
    );
}
