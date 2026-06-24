'use client';

import { useAuth } from '@/app/context/AuthContext';
import { LogOut, Menu, Crown, User } from 'lucide-react';
import { useState } from 'react';
import { usePathname } from 'next/navigation';

interface AdminTopbarProps {
  onMenuClick?: () => void;
}

export default function AdminTopbar({ onMenuClick }: AdminTopbarProps) {
  const { user, logout, isSuperadmin } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const pathname = usePathname();

  const pageNames: Record<string, string> = {
    '/admin/dashboard': 'Overview',
    '/admin/users': 'User Roster',
    '/admin/projects': 'Project Vault',
    '/admin/team': 'Team Studio',
    '/admin/contacts': 'Inquiries Inbox',
    '/admin/contact-details': 'Atelier Settings',
    '/admin/estimates': 'Cost Estimates',
    '/admin/manage-admins': 'Admin Controls',
    '/admin/blogs': 'Architectural Journal',
    '/admin/settings': 'System Settings',
  };

  const currentPage = pageNames[pathname] || 'Dashboard';

  return (
    <header className="bg-white border-b border-stone-200/80 sticky top-0 z-30">
      <div className="px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center min-w-0">
            {/* Mobile Menu Button */}
            <button
              onClick={onMenuClick}
              className="lg:hidden mr-4 p-2 text-stone-600 hover:bg-stone-50 rounded-md transition-colors flex-shrink-0 border border-stone-200"
            >
              <Menu className="w-4 h-4" />
            </button>

            <div className="min-w-0">
              <div className="flex items-center gap-3">
                <h1 className="text-xl lg:text-2xl font-serif font-bold text-[#1C1917] tracking-tight">{currentPage}</h1>
                {isSuperadmin && (
                  <span className="hidden sm:flex items-center gap-1.5 px-2.5 py-0.5 bg-stone-100 text-stone-800 border border-stone-200 rounded-full text-[10px] font-bold uppercase tracking-wider">
                    <Crown className="w-3 h-3 text-stone-600" />
                    Superadmin
                  </span>
                )}
              </div>
              <p className="text-[10px] lg:text-xs text-stone-400 font-medium uppercase tracking-wider mt-0.5">Studio Desk / {user?.name}</p>
            </div>
          </div>

          <div className="flex items-center space-x-4 flex-shrink-0">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center space-x-3 p-1.5 hover:bg-stone-50 border border-stone-200 rounded-md transition-all cursor-pointer"
              >
                <div className="w-8 h-8 rounded-full bg-[#1C1917] flex items-center justify-center border border-stone-800">
                  <User className="w-4 h-4 text-[#FAF9F5]" />
                </div>
                <span className="text-stone-700 hidden sm:inline text-xs font-bold uppercase tracking-wider">{user?.name}</span>
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-52 bg-white rounded-md shadow-[0_10px_30px_rgba(0,0,0,0.08)] border border-stone-200 py-2.5 z-50">
                  <div className="px-4 py-2 border-b border-stone-100">
                    <p className="text-xs font-bold text-stone-800 flex items-center gap-2">
                      {isSuperadmin && <Crown className="w-3.5 h-3.5 text-stone-600" />}
                      {user?.name}
                    </p>
                    <p className="text-[10px] text-stone-400 font-medium truncate mt-0.5">{user?.email}</p>
                    <p className="text-[9px] text-stone-500 font-bold uppercase tracking-widest mt-2 border border-stone-200 bg-stone-50 px-2 py-0.5 rounded inline-block">
                      {isSuperadmin ? '👑 Superadmin' : '👤 Admin'}
                    </p>
                  </div>
                  <button
                    onClick={logout}
                    className="w-full px-4 py-2.5 text-left text-red-600 hover:bg-red-50 flex items-center space-x-2 text-xs font-bold uppercase tracking-wider mt-1.5 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Logout</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}