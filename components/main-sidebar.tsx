'use client'

import React, { ReactNode } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import dynamic from 'next/dynamic'
import { 
  Home, FileText, Calendar, DollarSign, Briefcase, Archive, UploadCloud, 
  Users, User, Settings, BarChart2, CreditCard, Filter, MessageCircle, 
  Award, BookOpen, UserCheck, Activity, UserPlus 
} from 'lucide-react'

// Dynamic imports for icons to reduce bundle size
const UserCheckIcon = dynamic(() => import('lucide-react').then((mod) => mod.UserCheck), { ssr: false })

// Route configuration by role
type RouteItem = {
  label: string
  href: string
  icon: React.ReactNode
}

const ROUTES_BY_ROLE: Record<string, RouteItem[]> = {
  contributor: [
    { label: 'Dashboard', href: '/contributor', icon: <Home className="h-5 w-5" /> },
    { label: 'Applications', href: '/contributor/applications', icon: <FileText className="h-5 w-5" /> },
    { label: 'Deadlines', href: '/contributor/deadlines', icon: <Calendar className="h-5 w-5" /> },
    { label: 'Earnings', href: '/contributor/earnings', icon: <DollarSign className="h-5 w-5" /> },
    { label: 'Opportunities', href: '/contributor/opportunities', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Portfolio', href: '/contributor/portfolio', icon: <Archive className="h-5 w-5" /> },
    { label: 'Submissions', href: '/contributor/submissions', icon: <UploadCloud className="h-5 w-5" /> },
  ],
  sponsor: [
    { label: 'Dashboard', href: '/sponsor', icon: <Home className="h-5 w-5" /> },
    { label: 'Analytics', href: '/sponsor/analytics', icon: <BarChart2 className="h-5 w-5" /> },
    { label: 'Opportunities', href: '/sponsor/opportunities', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Payments', href: '/sponsor/payments', icon: <CreditCard className="h-5 w-5" /> },
  ],
  mentor: [
    { label: 'Dashboard', href: '/mentor', icon: <Home className="h-5 w-5" /> },
    { label: 'Feedback', href: '/mentor/feedback', icon: <MessageCircle className="h-5 w-5" /> },
    { label: 'Filter', href: '/mentor/filter', icon: <Filter className="h-5 w-5" /> },
    { label: 'Submissions', href: '/mentor/submissions', icon: <UploadCloud className="h-5 w-5" /> },
  ],
  learner: [
    { label: 'Dashboard', href: '/learner', icon: <Home className="h-5 w-5" /> },
    { label: 'Certifications', href: '/learner/certifications', icon: <Award className="h-5 w-5" /> },
    { label: 'Learn', href: '/learner/learn', icon: <BookOpen className="h-5 w-5" /> },
    { label: 'Mentorship', href: '/learner/mentorship', icon: <UserCheck className="h-5 w-5" /> },
    { label: 'Opportunities', href: '/learner/opportunities', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Progress', href: '/learner/progress', icon: <Activity className="h-5 w-5" /> },
  ],
  admin: [
    { label: 'Dashboard', href: '/admin', icon: <Home className="h-5 w-5" /> },
    { label: 'Contributors', href: '/admin/contributors', icon: <UserPlus className="h-5 w-5" /> },
    { label: 'Opportunities', href: '/admin/opportunities', icon: <Briefcase className="h-5 w-5" /> },
    { label: 'Referral', href: '/admin/referral', icon: <UserCheckIcon className="h-5 w-5" /> },
    { label: 'Submissions', href: '/admin/submissions', icon: <UploadCloud className="h-5 w-5" /> },
    { label: 'Users', href: '/admin/users', icon: <Users className="h-5 w-5" /> },
  ],
  default: [
    { label: 'Dashboard', href: '/dashboard', icon: <Home className="h-5 w-5" /> },
    { label: 'Profile', href: '/profile', icon: <User className="h-5 w-5" /> },
    { label: 'Settings', href: '/settings', icon: <Settings className="h-5 w-5" /> },
  ],
}

// Error boundary component
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
  const [role, setRole] = React.useState<string>('contributor')
  const [isLoading, setIsLoading] = React.useState(true)
  const [isCollapsed, setIsCollapsed] = React.useState(false)

  // Initialize role on client-side only, after mount
  React.useEffect(() => {
    const storedRole = localStorage.getItem('astro-role') || 'contributor'
    setRole(storedRole)
    setIsLoading(false)
  }, [])

  const routes = ROUTES_BY_ROLE[role] || ROUTES_BY_ROLE['default']
  const isActive = (href: string) => pathname === href || pathname?.startsWith(href + '/')

  const toggleSidebar = () => setIsCollapsed(!isCollapsed)

  if (isLoading) {
    return <div className="p-4 text-gray-600 dark:text-gray-400">Loading sidebar...</div>
  }

  return (
    <ErrorBoundary fallback={<div className="p-4 text-red-500">Error: Sidebar failed to render</div>}>
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside
          className={`
            bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100
            border-r border-gray-200 dark:border-gray-700
            transition-all duration-300 ease-in-out
            ${isCollapsed ? 'w-16' : 'w-64'}
            flex flex-col
          `}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 dark:border-gray-700">
            {!isCollapsed && (
              <span className="text-lg font-bold">My App</span>
            )}
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800"
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isCollapsed ? 'M9 5l7 7-7 7' : 'M15 19l-7-7 7-7'}
                />
              </svg>
            </button>
          </div>

          {/* Menu */}
          <nav className="flex-1 overflow-y-auto">
            <ul className="p-2">
              {routes.map(({ label, href, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`
                      flex items-center gap-3 px-4 py-2 rounded-md
                      ${isActive(href)
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-900 dark:text-gray-100'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-800'}
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    aria-current={isActive(href) ? 'page' : undefined}
                  >
                    {icon}
                    {!isCollapsed && <span>{label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-600 dark:text-gray-400">
            {!isCollapsed && `© ${new Date().getFullYear()} My Company`}
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-gray-50 dark:bg-gray-900 p-6">
          {children}
        </main>
      </div>
    </ErrorBoundary>
  )
}