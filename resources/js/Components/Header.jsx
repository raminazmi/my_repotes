import { useState, useEffect, useRef } from "react";
import { Button } from "@/Components/ui/button";
import { FaBookOpen, FaStar, FaBars, FaTimes, FaChevronDown, FaUser, FaSignOutAlt, FaCog } from "react-icons/fa";
import { Link, usePage, router } from "@inertiajs/react";

export default function Header() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isUserDropdownOpen, setIsUserDropdownOpen] = useState(false);
    const sidebarRef = useRef(null);
    const menuButtonRef = useRef(null);
    const userDropdownRef = useRef(null);
    
    const { auth } = usePage().props;
    const user = auth?.user;

    const navItems = [
        { to: route('features'), label: "الميزات" },
        { to: route('pricing'), label: "الباقات والأسعار" },
        { to: route('contact'), label: "تواصل معنا" },
        { to: route('about'), label: "من نحن" },
        { to: route('privacy'), label: "سياسة الخصوصية" },
    ];

    const handleClickOutside = (event) => {
        if (
            sidebarRef.current &&
            !sidebarRef.current.contains(event.target) &&
            menuButtonRef.current &&
            !menuButtonRef.current.contains(event.target)
        ) {
            setIsSidebarOpen(false);
        }
        
        if (
            userDropdownRef.current &&
            !userDropdownRef.current.contains(event.target)
        ) {
            setIsUserDropdownOpen(false);
        }
    };

    const handleLogout = () => {
        router.post(route('logout'));
    };

    useEffect(() => {
        if (isSidebarOpen || isUserDropdownOpen) {
            document.addEventListener("mousedown", handleClickOutside);
            if (isSidebarOpen) {
                document.body.classList.add("overflow-hidden");
            }
        } else {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("overflow-hidden");
        }
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
            document.body.classList.remove("overflow-hidden");
        };
    }, [isSidebarOpen, isUserDropdownOpen]);

    const UserDropdown = () => (
        <div className="relative" ref={userDropdownRef}>
            <button
                onClick={() => setIsUserDropdownOpen(!isUserDropdownOpen)}
                className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
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
                    <Link
                        href={route('dashboard')}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                    >
                        <FaUser className="w-4 h-4" />
                        لوحة التحكم
                    </Link>
                    <Link
                        href={route('profile.edit')}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors"
                        onClick={() => setIsUserDropdownOpen(false)}
                    >
                        <FaCog className="w-4 h-4" />
                        الإعدادات
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="flex items-center gap-3 px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors w-full text-right"
                    >
                        <FaSignOutAlt className="w-4 h-4" />
                        تسجيل الخروج
                    </button>
                </div>
            )}
        </div>
    );

    const AuthButtons = () => (
        <>
            <Link href={route('login')}>
                <Button variant="outline" className="border-blue-200 hover:bg-blue-50">
                    تسجيل الدخول
                </Button>
            </Link>
            <Link href={route('register')}>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                    إنشاء حساب
                </Button>
            </Link>
        </>
    );

    return (
        <>
            <header className="bg-white/95 backdrop-blur-sm shadow-lg sticky top-0 z-50 border-b border-blue-100">
                <div className="max-w-7xl mx-auto px-6 py-4">
                    <div className="flex items-center justify-between">
                        {/* Logo */}
                        <Link href="/" className="flex items-center gap-4">
                            <div className="relative">
                                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                                    <FaBookOpen className="w-7 h-7 text-white" />
                                </div>
                                <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                                    <FaStar className="w-2 h-2 text-yellow-800" />
                                </div>
                            </div>
                            <div>
                                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                                    EduForms
                                </h1>
                                <p className="text-sm text-gray-600 font-medium">
                                    صديق المعلم والإداري
                                </p>
                            </div>
                        </Link>
                        {/* Desktop Navigation */}
                        <nav className="hidden lg:flex items-center gap-8">
                            {navItems.map((item, index) => (
                                <Link
                                    key={index}
                                    href={item.to}
                                    className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                >
                                    {item.label}
                                </Link>
                            ))}
                        </nav>
                        {/* Desktop Buttons */}
                        <div className="hidden lg:flex items-center gap-4">
                            {user ? <UserDropdown /> : <AuthButtons />}
                        </div>
                        {/* Mobile Menu Button */}
                        <button
                            ref={menuButtonRef}
                            className="lg:hidden p-2 rounded-md hover:bg-gray-100 z-50"
                            onClick={() => setIsSidebarOpen(true)}
                            aria-label="فتح القائمة"
                        >
                            <FaBars className="w-6 h-6 text-gray-700" />
                        </button>
                    </div>
                </div>
            </header>
            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/60 z-40 transition-opacity duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
            {/* Sidebar */}
            <div
                ref={sidebarRef}
                className={`fixed top-0 right-0 h-full w-64 bg-white shadow-2xl transform transition-transform duration-300 z-50 ${isSidebarOpen ? "translate-x-0" : "translate-x-full"
                    }`}
                role="menu"
            >
                <div className="p-6">
                    {/* Close Button */}
                    <button
                        onClick={() => setIsSidebarOpen(false)}
                        className="mb-6 p-2 rounded-md hover:bg-gray-100"
                        aria-label="إغلاق القائمة"
                    >
                        <FaTimes className="w-6 h-6 text-gray-700" />
                    </button>
                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-4">
                        {navItems.map((item, index) => (
                            <Link
                                key={index}
                                href={item.to}
                                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>
                    {/* Mobile User Section */}
                    {user ? (
                        <div className="mt-8 space-y-3">
                            <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                    {user.name.charAt(0)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-medium text-sm truncate">{user.name}</p>
                                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                                </div>
                            </div>
                            <Link
                                href={route('dashboard')}
                                className="flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <FaUser className="w-4 h-4" />
                                لوحة التحكم
                            </Link>
                            <Link
                                href={route('profile.edit')}
                                className="flex items-center gap-3 p-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors"
                                onClick={() => setIsSidebarOpen(false)}
                            >
                                <FaCog className="w-4 h-4" />
                                الإعدادات
                            </Link>
                            <button
                                onClick={handleLogout}
                                className="flex items-center gap-3 p-2 text-sm text-red-600 hover:bg-red-50 rounded-md transition-colors w-full text-right"
                            >
                                <FaSignOutAlt className="w-4 h-4" />
                                تسجيل الخروج
                            </button>
                        </div>
                    ) : (
                        <div className="mt-8 flex flex-col gap-3">
                            <Link href={route('login')} onClick={() => setIsSidebarOpen(false)}>
                                <Button variant="outline" className="w-full">
                                    تسجيل الدخول
                                </Button>
                            </Link>
                            <Link href={route('register')} onClick={() => setIsSidebarOpen(false)}>
                                <Button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                                    إنشاء حساب
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
} 