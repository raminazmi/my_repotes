import React, { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../../store/store';
import { Toaster } from "@/Components/ui/toaster";
import { Toaster as Sonner } from "@/Components/ui/sonner";
import { TooltipProvider } from "@/Components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "@/Components/AuthProvider";

const queryClient = new QueryClient();

const App = ({ children }) => {
  useEffect(() => {
    document.body.classList.add('rtl');
    document.body.dir = 'rtl';
    return () => {
      document.body.classList.remove('rtl');
      document.body.dir = '';
    };
  }, []);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            {children}
            <Toaster />
            <Sonner />
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default App; 