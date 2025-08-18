import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  reports: [],
  templates: [],
  loading: false,
  error: null,
  selectedReport: null,
  filters: {
    type: 'all',
    status: 'all',
    dateRange: null,
  },
};

const reportsSlice = createSlice({
  name: 'reports',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setReports: (state, action) => {
      state.reports = action.payload;
      state.loading = false;
      state.error = null;
    },
    setTemplates: (state, action) => {
      state.templates = action.payload;
    },
    addReport: (state, action) => {
      state.reports.unshift(action.payload);
    },
    updateReport: (state, action) => {
      const index = state.reports.findIndex(report => report.id === action.payload.id);
      if (index !== -1) {
        state.reports[index] = action.payload;
      }
    },
    deleteReport: (state, action) => {
      state.reports = state.reports.filter(report => report.id !== action.payload);
    },
    setSelectedReport: (state, action) => {
      state.selectedReport = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setError: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setReports,
  setTemplates,
  addReport,
  updateReport,
  deleteReport,
  setSelectedReport,
  setFilters,
  setError,
  clearError,
} = reportsSlice.actions;

export default reportsSlice.reducer; 