import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import DeleteUserForm from './Partials/DeleteUserForm';
import UpdatePasswordForm from './Partials/UpdatePasswordForm';
import UpdateProfileInformationForm from './Partials/UpdateProfileInformationForm';

export default function Edit({ mustVerifyEmail, status }) {
    return (
        <DashboardLayout>
            <Head title="Profile" />

            <div className="py-12">
                <div className="mx-auto max-w-3xl space-y-6">
                    <div className="bg-white p-6 shadow rounded-lg">
                        <UpdateProfileInformationForm
                            mustVerifyEmail={mustVerifyEmail}
                            status={status}
                        />
                    </div>
                    <div className="bg-white p-6 shadow rounded-lg">
                        <UpdatePasswordForm />
                    </div>
                    <div className="bg-white p-6 shadow rounded-lg">
                        <DeleteUserForm />
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
