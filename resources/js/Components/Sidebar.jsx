import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/Components/ui/sidebar";
import { Link, usePage } from "@inertiajs/react";
import { FaHome, FaUsers, FaChartBar, FaStar, FaMoneyBill, FaCog, FaRegFileAlt, FaBookOpen } from "react-icons/fa";
import { router } from '@inertiajs/react';

export function AppSidebar() {
  const { auth } = usePage().props;
  const user = auth?.user;
  const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
const handleLogout = () => {
  router.post(route('logout'));
};
  const menuItems = [
    {
      title: "لوحة التحكم",
      url: "/dashboard",
      icon: <FaHome />,
    },
    {
      title: auth.user?.role === 'admin' ? "النماذج" : "النماذج الجاهزة",
      url: auth.user?.role === 'admin' ? "/forms" : "/templates",
      icon: <FaRegFileAlt />,
    },
    auth.user?.role === 'admin'
      ? {
          title: "مدفوعات النظام",
          url: "/admin/payments",
          icon: <FaMoneyBill />,
        }
      : {
          title: "مدفوعاتي",
          url: "/payments",
          icon: <FaMoneyBill />,
        },
    {
      title: "الإعدادات",
      url: "/profile",
      icon: <FaCog />,
    },
  ];
  return (
    <Sidebar side="right" className="border-r border-border">
      <SidebarHeader className="p-6">
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
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-muted-foreground font-semibold">
            القائمة الرئيسية
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {/* رابط لوحة تحكم المدير */}
              {user?.role === 'admin' && (
                <SidebarMenuItem>
                  <SidebarMenuButton asChild>
                    <Link href="/admin/dashboard" className="flex items-center gap-3">
                      <span className="text-lg"><FaChartBar /></span>
                      <span className="font-medium">لوحة تحكم المدير</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              )}

              {menuItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    className={`transition-colors hover:bg-accent hover:text-accent-foreground ${currentPath === item.url ? 'bg-primary text-primary-foreground' : ''}`}
                  >
                    <Link href={item.url} className="flex items-center gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <span className="font-medium">{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
      </SidebarFooter>
    </Sidebar>
  );
} 