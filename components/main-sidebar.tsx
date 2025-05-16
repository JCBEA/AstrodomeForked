'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarSeparator,
  SidebarTrigger,
  SidebarInset,
} from '@/components/ui/sidebar'

import {
  Home,
  FileText,
  Calendar,
  DollarSign,
  Briefcase,
  Archive,
  UploadCloud,
  Users,
  User,
  Settings,
  BarChart2,
  CreditCard,
  Filter,
  MessageCircle,
  Award,
  BookOpen,
  UserCheck,
  Activity,
  UserPlus,
  UserCheck as UserCheckIcon,
} from 'lucide-react'

type RouteItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const ROUTES_BY_ROLE: Record<string, RouteItem[]> = {
  contributor: [
    { label: 'Dashboard', href: '/contributor', icon: <Home /> },
    { label: 'Applications', href: '/contributor/applications', icon: <FileText /> },
    { label: 'Deadlines', href: '/contributor/deadlines', icon: <Calendar /> },
    { label: 'Earnings', href: '/contributor/earnings', icon: <DollarSign /> },
    { label: 'Opportunities', href: '/contributor/opportunities', icon: <Briefcase /> },
    { label: 'Portfolio', href: '/contributor/portfolio', icon: <Archive /> },
    { label: 'Submissions', href: '/contributor/submissions', icon: <UploadCloud /> },
  ],
  sponsor: [
    { label: 'Dashboard', href: '/sponsor', icon: <Home /> },
    { label: 'Analytics', href: '/sponsor/analytics', icon: <BarChart2 /> },
    { label: 'Opportunities', href: '/sponsor/opportunities', icon: <Briefcase /> },
    { label: 'Payments', href: '/sponsor/payments', icon: <CreditCard /> },
  ],
  mentor: [
    { label: 'Dashboard', href: '/mentor', icon: <Home /> },
    { label: 'Feedback', href: '/mentor/feedback', icon: <MessageCircle /> },
    { label: 'Filter', href: '/mentor/filter', icon: <Filter /> },
    { label: 'Submissions', href: '/mentor/submissions', icon: <UploadCloud /> },
  ],
  learner: [
    { label: 'Dashboard', href: '/learner', icon: <Home /> },
    { label: 'Certifications', href: '/learner/certifications', icon: <Award /> },
    { label: 'Learn', href: '/learner/learn', icon: <BookOpen /> },
    { label: 'Mentorship', href: '/learner/mentorship', icon: <UserCheck /> },
    { label: 'Opportunities', href: '/learner/opportunities', icon: <Briefcase /> },
    { label: 'Progress', href: '/learner/progress', icon: <Activity /> },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: <Home /> },
    { label: 'Contributors', href: '/admin/contributors', icon: <UserPlus /> },
    { label: 'Opportunities', href: '/admin/opportunities', icon: <Briefcase /> },
    { label: 'Referral', href: '/admin/referral', icon: <UserCheckIcon /> },
    { label: 'Submissions', href: '/admin/submissions', icon: <UploadCloud /> },
    { label: 'Users', href: '/admin/users', icon: <Users /> },
  ],
  default: [
    { label: 'Dashboard', href: '/dashboard', icon: <Home /> },
    { label: 'Profile', href: '/profile', icon: <User /> },
    { label: 'Settings', href: '/settings', icon: <Settings /> },
  ],
}

export default function MainSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [role, setRole] = React.useState<string>('default')

  React.useEffect(() => {
    if (typeof window !== 'undefined') {
      setRole(localStorage.getItem('astro-role') || 'default')
    }
  }, [])

  const routes = ROUTES_BY_ROLE[role] || ROUTES_BY_ROLE['default']
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  return (
    <SidebarProvider>
      <Sidebar
        collapsible="icon"
        variant="sidebar"
        side="left"
        className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100"
      >
        <SidebarHeader className="px-4 py-3 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <span className="text-lg font-bold">My App</span>
          <SidebarTrigger />
        </SidebarHeader>

        <SidebarContent>
          <SidebarMenu>
            {routes.map(({ label, href, icon }) => (
              <SidebarMenuItem key={href}>
                <Link href={href} passHref legacyBehavior>
                  <SidebarMenuButton
                    asChild
                    isActive={isActive(href)}
                    aria-current={isActive(href) ? 'page' : undefined}
                    className="
                      hover:bg-gray-100 hover:text-gray-900
                      dark:hover:bg-gray-800 dark:hover:text-gray-100
                      data-[active=true]:bg-gray-200 data-[active=true]:text-gray-900
                      dark:data-[active=true]:bg-gray-700 dark:data-[active=true]:text-gray-100
                    "
                  >
                    <a className="flex items-center gap-2">
                      {icon}
                      <span>{label}</span>
                    </a>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>

        <SidebarSeparator />

        <SidebarFooter className="px-4 py-3 border-t border-gray-200 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400">
          © {new Date().getFullYear()} My Company
        </SidebarFooter>
      </Sidebar>

      <SidebarInset className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
        {children}
      </SidebarInset>
    </SidebarProvider>
  )
}