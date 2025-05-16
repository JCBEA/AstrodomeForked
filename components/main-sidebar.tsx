'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { Home, FileText, Calendar, DollarSign, Briefcase, Archive, UploadCloud, Users, User, Settings, BarChart2, CreditCard, Filter, MessageCircle, Award, BookOpen, UserCheck, Activity, UserPlus, UserCheck as UserCheckIcon } from 'lucide-react'

// Dynamic imports for sidebar components
const SidebarProvider = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarProvider).catch((err) => {
  console.error('[MainSidebar] Failed to load SidebarProvider:', err)
  return () => <div>Error loading sidebar</div>
}), { ssr: false })
const Sidebar = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.Sidebar).catch((err) => {
  console.error('[MainSidebar] Failed to load Sidebar:', err)
  return () => <div>Error loading sidebar</div>
}), { ssr: false })
const SidebarContent = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarContent), { ssr: false })
const SidebarFooter = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarFooter), { ssr: false })
const SidebarHeader = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarHeader), { ssr: false })
const SidebarMenu = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarMenu), { ssr: false })
const SidebarMenuButton = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarMenuButton), { ssr: false })
const SidebarMenuItem = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarMenuItem), { ssr: false })
const SidebarSeparator = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarSeparator), { ssr: false })
const SidebarTrigger = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarTrigger), { ssr: false })
const SidebarInset = dynamic(() => import('@/components/ui/sidebar').then((mod) => mod.SidebarInset), { ssr: false })

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

interface ErrorBoundaryProps {
  children: ReactNode
  fallback: ReactNode
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, { hasError: boolean }> {
  constructor(props: ErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('[MainSidebar] Error caught in ErrorBoundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback
    }
    return this.props.children
  }
}

export default function MainSidebar({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const [role, setRole] = React.useState<string>('contributor') // Hardcoded for testing
  const [isLoading, setIsLoading] = React.useState(true)

  React.useEffect(() => {
    console.log('[MainSidebar] useEffect running')
    if (typeof window !== 'undefined') {
      const storedRole = localStorage.getItem('astro-role') || 'contributor'
      console.log('[MainSidebar] Role from localStorage:', storedRole)
      setRole(storedRole)
      setIsLoading(false)
    } else {
      console.log('[MainSidebar] Running on server, skipping localStorage')
    }
  }, [])

  const routes = ROUTES_BY_ROLE[role] || ROUTES_BY_ROLE['default']
  console.log('[MainSidebar] Rendered routes:', routes.map((r) => r.label))

  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  if (isLoading) {
    console.log('[MainSidebar] Showing loading state')
    return <div className="p-4">Loading sidebar...</div>
  }

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error: Sidebar failed to render</div>}>
      <SidebarProvider>
        <Sidebar
          collapsible="icon"
          variant="sidebar"
          side="left"
          className="bg-white text-gray-900 dark:bg-gray-900 dark:text-gray-100 min-h-screen"
          style={{ minWidth: '200px', display: 'flex', flexDirection: 'column' }} // Explicit styles
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
    </ErrorBoundary>
  )
}