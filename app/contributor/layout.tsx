"use client"
import './globals.css'
import { ReactNode } from "react"
import Link from "next/link"
import { Wallet } from "@coinbase/onchainkit/wallet"
import MainSidebar from "@/components/main-sidebar"


export default function ContributorLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col">

      {/* Body: Sidebar + Content */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}


        {/* Main content area */}
        <main className="flex-1 overflow-auto bg-gray-50 p-6">
          <MainSidebar >
            {/* Header */}
            <header className="flex items-center justify-between px-6 py-4 border-b bg-white z-20">
              <Link href="/contributor" className="font-bold text-lg">
                Astrodome
              </Link>
              <Wallet /> {/* shadcn-styled inside OnchainKit */}
            </header>
            {children}</MainSidebar>
        </main>
      </div>
    </div>
  )
}
