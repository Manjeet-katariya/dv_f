'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/app/context/AuthContext';
import {
  LayoutDashboard,
  Users,
  FolderOpen,
  Settings,
  UserPlus,
  ChevronLeft,
  ChevronRight,
  Mail,
  Calculator,
  X,
  Shield,
  Share2,
  Globe,
  ExternalLink
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuItem {
  href: string;
  label: string;
  icon: any;
  target?: string;
}

const baseMenuItems: MenuItem[] = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/website-content', label: 'Website Content', icon: Globe },
  { href: '/admin/contact-details', label: 'Site Settings', icon: Settings },
  { href: '/admin/social-icons', label: 'Social Icons', icon: Share2 },
  { href: '/admin/founder', label: 'Founder Profile', icon: UserPlus },
  { href: '/admin/team', label: 'Team Roster', icon: Users },
  { href: '/admin/projects', label: 'Projects', icon: FolderOpen },
  { href: '/admin/contacts', label: 'Inquiries', icon: Mail },
  { href: '/admin/estimates', label: 'Estimates', icon: Calculator },
];

const superadminMenuItems: MenuItem[] = [
  { href: '/admin/manage-admins', label: 'Manage Admins', icon: Shield },
];

interface AdminSidebarProps {
  sidebarOpen?: boolean;
  setSidebarOpen?: (open: boolean) => void;
}

export default function AdminSidebar({ sidebarOpen = false, setSidebarOpen }: AdminSidebarProps) {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const { isSuperadmin } = useAuth();

  const menuItems = isSuperadmin ? [...baseMenuItems, ...superadminMenuItems] : baseMenuItems;

  return (
    <>
      {/* ── DESKTOP SIDEBAR ── */}
      <aside 
        className={`hidden lg:flex bg-[#1C1917] border-r border-stone-800 text-stone-300 transition-all duration-300 ease-in-out ${collapsed ? 'w-20' : 'w-64'} h-screen sticky top-0 flex-col overflow-hidden z-40 shrink-0`}
      >
        {/* Logo & Toggle Header */}
        <div className="h-20 border-b border-stone-800 flex items-center justify-between px-5 shrink-0 relative bg-[#151312]">
          
          {/* Logo container */}
          <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${collapsed ? 'w-0 opacity-0' : 'w-44 opacity-100'}`}>
            <img 
              src="/logo-dvl.png" 
              alt="DVL Architects" 
              className="h-9 w-9 object-cover rounded-full border border-stone-700"
            />
            <span className="font-serif font-bold text-white text-sm tracking-[0.15em] uppercase">DVL Studio</span>
          </div>
          
          {/* Toggle Button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className={`p-1.5 rounded-md text-stone-500 hover:text-white hover:bg-stone-800 transition-all absolute ${collapsed ? 'left-1/2 -translate-x-1/2' : 'right-4'}`}
            title={collapsed ? "Expand Sidebar" : "Collapse Sidebar"}
          >
            {collapsed ? <ChevronRight className="w-4 h-4" /> : <ChevronLeft className="w-4 h-4" />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="mt-8 flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/admin');
            
            return (
              <Link
                key={item.href}
                href={item.href}
                target={item.target}
                title={collapsed ? item.label : ""}
                className={`
                  flex items-center px-6 py-3.5 transition-all duration-200 group relative text-sm
                  ${isActive
                    ? 'bg-stone-800/50 text-white font-semibold border-l-4 border-white'
                    : 'text-stone-400 hover:bg-stone-900/30 hover:text-stone-100 font-medium border-l-4 border-transparent'
                  }
                  ${collapsed ? 'justify-center px-0' : 'justify-start'}
                `}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 transition-transform duration-200 ${isActive ? 'scale-110 text-white' : 'text-stone-500 group-hover:text-stone-300'}`} />
                
                {!collapsed && (
                  <span className="ml-4 whitespace-nowrap tracking-wide">{item.label}</span>
                )}
              </Link>
            );
          })}
        </nav>
        
        {/* User Badge / Footer */}
        {!collapsed && (
          <div className="p-6 shrink-0 border-t border-stone-800 bg-[#151312]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-stone-800 flex items-center justify-center text-white font-bold text-xs border border-stone-700">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-[10px] font-bold text-white uppercase tracking-wider">Admin Workspace</span>
                <span className="text-[9px] text-stone-500 font-medium">DVL Architects</span>
              </div>
            </div>
          </div>
        )}
      </aside>

      {/* ── MOBILE SIDEBAR (OFFCANVAS) ── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen?.(false)}
              className="lg:hidden fixed inset-0 bg-stone-900/60 backdrop-blur-sm z-40"
            />
            
            {/* Sidebar Panel */}
            <motion.aside 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', bounce: 0, duration: 0.4 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-72 bg-[#1C1917] border-r border-stone-800 flex flex-col shadow-2xl"
            >
              <div className="h-20 border-b border-stone-800 flex justify-between items-center px-6 shrink-0 bg-[#151312]">
                
                {/* Logo & title (Mobile) */}
                <div className="flex items-center gap-3">
                  <img 
                    src="/logo-dvl.png" 
                    alt="DVL Architects" 
                    className="h-9 w-9 object-cover rounded-full border border-stone-700"
                  />
                  <span className="font-serif font-bold text-white text-sm tracking-[0.15em] uppercase">DVL Studio</span>
                </div>

                <button
                  onClick={() => setSidebarOpen?.(false)}
                  className="p-2 text-stone-500 hover:text-white hover:bg-stone-800 rounded-md transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-8 flex-1 overflow-y-auto px-4 space-y-1">
                {menuItems.map((item) => {
                  const Icon = item.icon;
                  const isActive = pathname === item.href || (pathname.startsWith(`${item.href}/`) && item.href !== '/admin');
                  
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      target={item.target}
                      onClick={() => setSidebarOpen?.(false)}
                      className={`
                        flex items-center px-4 py-3.5 rounded-none transition-all duration-200 text-sm
                        ${isActive
                          ? 'bg-stone-800 text-white font-semibold shadow-md border-l-4 border-white'
                          : 'text-stone-400 hover:bg-stone-900/30 hover:text-stone-100 font-medium border-l-4 border-transparent'
                        }
                      `}
                    >
                      <Icon className="w-4 h-4 flex-shrink-0" />
                      <span className="ml-4 tracking-wide">{item.label}</span>
                    </Link>
                  );
                })}
              </nav>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}