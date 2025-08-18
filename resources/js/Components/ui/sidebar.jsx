import React from "react";

export function Sidebar({ children, side = "right", className = "" }) {
  return (
    <aside
      className={`flex flex-col h-full w-64 bg-white border-l border-gray-200 shadow-lg ${className}`}
      dir="rtl"
    >
      {children}
    </aside>
  );
}

export function SidebarHeader({ children, className = "" }) {
  return <div className={`border-b px-6 py-4 ${className}`}>{children}</div>;
}

export function SidebarContent({ children, className = "" }) {
  return <div className={`flex-1 overflow-y-auto px-2 py-4 ${className}`}>{children}</div>;
}

export function SidebarFooter({ children, className = "" }) {
  return <div className={`border-t px-6 py-4 ${className}`}>{children}</div>;
}

export function SidebarGroup({ children, className = "" }) {
  return <div className={`mb-6 ${className}`}>{children}</div>;
}

export function SidebarGroupLabel({ children, className = "" }) {
  return <div className={`text-xs font-bold text-gray-400 mb-2 px-2 ${className}`}>{children}</div>;
}

export function SidebarGroupContent({ children, className = "" }) {
  return <div className={`space-y-2 my-4 ${className}`}>{children}</div>;
}

export function SidebarMenu({ children, className = "" }) {
  return <nav className={`flex flex-col gap-3 px-2 ${className}`}>{children}</nav>;
}

export function SidebarMenuItem({ children, className = "" }) {
  return <div className={`w-full ${className}`}>{children}</div>;
}

export function SidebarMenuButton({ children, asChild = false, className = "" }) {
  if (asChild) return children;
  return (
    <button
      className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-right text-gray-700 hover:bg-blue-50 hover:text-blue-700 transition font-medium ${className}`}
    >
      {children}
    </button>
  );
} 