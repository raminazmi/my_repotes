import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { FaUsers, FaRegFileAlt, FaChartBar } from "react-icons/fa";
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function AdminDashboard({ stats, users, forms, reports }) {
  return (
    <DashboardLayout>
      <Head title="لوحة تحكم المدير" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        <h2 className="text-3xl font-bold mb-6">لوحة تحكم المدير</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaUsers className="w-5 h-5" />
                المستخدمون
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total_users}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaRegFileAlt className="w-5 h-5" />
                النماذج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total_forms}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaChartBar className="w-5 h-5" />
                النماذج النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.active_forms}</div>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaChartBar className="w-5 h-5" />
                التقارير
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total_reports}</div>
            </CardContent>
          </Card>
        </div>
        {/* يمكنك إضافة جداول لإدارة المستخدمين والنماذج والتقارير هنا */}
      </main>
    </DashboardLayout>
  );
} 