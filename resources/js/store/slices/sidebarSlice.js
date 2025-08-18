import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isOpen: true,
  collapsed: false,
  activeItem: 'dashboard',
  menuItems: [
    {
      id: 'dashboard',
      title: 'لوحة التحكم',
      icon: '🏠',
      url: '/dashboard',
    },
    {
      id: 'reports',
      title: 'التقارير',
      icon: '📊',
      url: '/reports',
      children: [
        {
          id: 'students',
          title: 'تقارير الطلاب',
          icon: '👥',
          url: '/reports/students',
        },
        {
          id: 'attendance',
          title: 'تقارير الحضور',
          icon: '📈',
          url: '/reports/attendance',
        },
        {
          id: 'grades',
          title: 'تقارير الدرجات',
          icon: '⭐',
          url: '/reports/grades',
        },
        {
          id: 'behavior',
          title: 'تقارير السلوك',
          icon: '🎯',
          url: '/reports/behavior',
        },
        {
          id: 'financial',
          title: 'التقارير المالية',
          icon: '💰',
          url: '/reports/financial',
        },
      ],
    },
    {
      id: 'templates',
      title: 'قوالب التقارير',
      icon: '📋',
      url: '/templates',
    },
    {
      id: 'settings',
      title: 'الإعدادات',
      icon: '⚙️',
      url: '/settings',
    },
  ],
};

const sidebarSlice = createSlice({
  name: 'sidebar',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.isOpen = !state.isOpen;
    },
    setSidebarOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    toggleCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
    setCollapsed: (state, action) => {
      state.collapsed = action.payload;
    },
    setActiveItem: (state, action) => {
      state.activeItem = action.payload;
    },
    updateMenuItems: (state, action) => {
      state.menuItems = action.payload;
    },
  },
});

export const {
  toggleSidebar,
  setSidebarOpen,
  toggleCollapsed,
  setCollapsed,
  setActiveItem,
  updateMenuItems,
} = sidebarSlice.actions;

export default sidebarSlice.reducer; 