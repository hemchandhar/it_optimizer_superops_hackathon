import { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  FileText,
  HardDrive,
  Cloud,
  Workflow,
  Database,
  GitCompare,
  Settings,
  BarChart3,
} from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Dashboard', href: '/', icon: LayoutDashboard },
  { name: 'Licenses', href: '/licenses', icon: FileText },
  { name: 'Workflows', href: '/workflows', icon: Workflow },
  { name: 'Hardware', href: '/hardware', icon: HardDrive },
  { name: 'Storage', href: '/storage', icon: Database },
  { name: 'Overlap Analysis', href: '/overlap', icon: GitCompare },
  { name: 'Cloud vs On-Prem', href: '/cloud', icon: Cloud },
  { name: 'Reports', href: '/reports', icon: BarChart3 },
  { name: 'Integrations', href: '/integrations', icon: Settings },
];

export default function Layout({ children }: LayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="fixed inset-y-0 left-0 w-64 bg-gray-900">
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center gap-3 border-b border-gray-800 px-6">
            <div className="text-2xl">🚀</div>
            <div>
              <div className="text-lg font-bold text-white">IT Optimizer</div>
              <div className="text-xs text-gray-400">SuperHack 2025</div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 px-3 py-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? 'bg-primary-600 text-white'
                      : 'text-gray-300 hover:bg-gray-800 hover:text-white'
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-800 p-4">
            <div className="text-xs text-gray-400">
              Team TUA - SuperOps Hackathon
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="pl-64">
        <main className="min-h-screen p-8">{children}</main>
      </div>
    </div>
  );
}
