import '../css/app.css';
import './bootstrap';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot } from 'react-dom/client';
import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';

const appName = import.meta.env.VITE_APP_NAME || 'EduForms';

createInertiaApp({
    title: (title) => `${title} - ${appName}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob('./Pages/**/*.jsx'),
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);

        // إضافة كلاس rtl على body عند تشغيل التطبيق
        const AppWithProviders = () => {
            return (
                <Provider store={store}>
                  <App {...props} />
                </Provider>
            );
        };

        root.render(<AppWithProviders />);
    },
    progress: {
        color: '#3B82F6',
        showSpinner: true,
    },
});
