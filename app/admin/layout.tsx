// app/admin/layout.tsx
'use client'

import { ReactNode } from 'react'
import Link from 'next/link'
import MainSidebar from '@/components/main-sidebar'
import { Wallet } from 'lucide-react'

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Body: Sidebar + Content */}
      <MainSidebar>
        {/* Header goes inside MainSidebar's children */}
        <header className="flex items-center justify-between px-6 py-4 border-b bg-white z-20">
          <Link href="/contributor" className="font-bold text-lg">
            Astrodome
          </Link>
          <Wallet />
        </header>

        {/* The main page content */}
        {children}
      </MainSidebar>
    </div>
  )
}
