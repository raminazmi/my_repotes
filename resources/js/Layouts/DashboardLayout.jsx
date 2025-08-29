import { useRef, useEffect, useState } from 'react';
import { AppSidebar } from '@/Components/Sidebar';
import { Link, usePage, router } from '@inertiajs/react';
import { FaChevronDown, FaUser, FaCog, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';

export default function DashboardLayout({ children }) {
  const user = usePage().props.auth.user;
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
  const userDropdownRef = useRef(null);

  const handleLogout = () => router.post(route('logout'));

  useEffect(() => {
    function handleClickOutside(event) {
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target)) {
        setIsUserDropdownOpen(false);
      }
    }
    if (isUserDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isUserDropdownOpen]);

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar Responsive */}
      {/* ثابت في الديسكتوب */}
      <div className="hidden lg:flex w-64 shrink-0 border-l border-gray-200 bg-white h-screen flex-col fixed right-0 top-0 z-40">
        <AppSidebar />
      </div>
      {/* Overlay للجوال/تابلت */}
      <div className={`fixed right-0 top-0 z-50 h-full transition-transform duration-300 bg-white border-l border-gray-200 w-64 ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'} lg:hidden`}>
        {/* زر إغلاق للجوال */}
        <div className="flex justify-end p-2">
          <button onClick={() => setIsSidebarOpen(false)} className="p-2 rounded-md hover:bg-gray-100">
            <FaTimes className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <AppSidebar />
      </div>
      {/* Overlay خلفي للجوال */}
      {isSidebarOpen && <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setIsSidebarOpen(false)} />}
      {/* Main Content */}
      <div className="flex-1 flex flex-col min-h-screen pr-0 lg:pr-64">
        <header className="h-16 flex items-center justify-between px-6 bg-white border-b border-gray-200 shadow-sm sticky top-0 z-30">
          <div className="flex items-center gap-4">
            {/* زر القائمة للجوال */}
            <button className="lg:hidden p-2 rounded-md hover:bg-gray-100" onClick={() => setIsSidebarOpen(true)}>
              <FaBars className="w-6 h-6 text-gray-700" />
            </button>
            <Link href="/dashboard" className="text-xl font-bold text-[#009A8E]">My Reports</Link>
          </div>
          <div className="flex items-center gap-4">
            {/* User Dropdown */}
            <div className="relative" ref={userDropdownRef}>
              <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <div className="w-8 h-8 bg-gradient-to-r from-[#00BFAE] to-[#009A8E] rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {user.name.charAt(0)}
                </div>
                <span className="font-medium text-gray-700">{user.name}</span>
                <FaChevronDown className={`w-4 h-4 text-gray-500 transition-transform ${isUserDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isUserDropdownOpen && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500">{user.email}</p>
                  </div>
                  <Link href={route('dashboard')} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <FaUser className="w-4 h-4" /> لوحة التحكم
                  </Link>
                  <Link href={route('profile.edit')} className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors">
                    <FaCog className="w-4 h-4" /> الإعدادات
                  </Link>
                  <button onClick={handleLogout} className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-right">
                    <FaSignOutAlt className="w-4 h-4" /> تسجيل الخروج
                  </button>
                </div>
              )}
            </div>
          </div>
        </header>
        <main className="flex-1 p-6 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}