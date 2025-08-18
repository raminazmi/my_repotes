import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { FaRegFileAlt, FaUsers, FaChartBar, FaPlus, FaCog, FaEye, FaEdit, FaTrash, FaDownload, FaImage } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Dashboard({ auth, stats, forms }) {
  // حماية من القيم غير المعرفة
  const user = auth?.user || {};
  const safeStats = stats || {};
  const safeForms = Array.isArray(forms) ? forms : [];

  // زر إضافة نموذج جديد للإدمن فقط (خارج JSX)
  let createFormButton = null;
  if (user.role === 'admin') {
    createFormButton = (
      <Link href={route('forms.create')}>
        <Button className="bg-gradient-to-r from-blue-500 to-purple-600 flex items-center gap-2">
          <FaPlus />
          إضافة نموذج جديد
        </Button>
      </Link>
    );
  }

  return (
    <DashboardLayout>
      <Head title="لوحة التحكم" />
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            مرحباً بك في EduForms
          </h2>
          <p className="text-gray-600">
            {(user.school || "")} - {(user.subject || "")}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaRegFileAlt className="w-5 h-5" />
                إجمالي النماذج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{safeStats.total_forms ?? 0}</div>
              <p className="text-blue-100 text-sm">نموذج متاح</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaUsers className="w-5 h-5" />
                إجمالي التقارير المستخرجة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{safeStats.total_reports ?? 0}</div>
              <p className="text-green-100 text-sm">تقرير/شهادة</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FaChartBar className="w-5 h-5" />
                نماذج مفعلة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{safeStats.active_forms ?? 0}</div>
              <p className="text-purple-100 text-sm">نموذج نشط</p>
            </CardContent>
          </Card>
          {user.role === 'admin' && (
            <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <FaUsers className="w-5 h-5" />
                  المستخدمون
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{safeStats.total_users ?? 0}</div>
                <p className="text-orange-100 text-sm">مستخدم</p>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Forms List */}
        <div className="mb-8 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-gray-800">النماذج الجاهزة</h3>
          {createFormButton}
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {safeForms.map((form) => (
            <Card key={form.id} className="hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-16 h-16 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                    <FaRegFileAlt className="w-10 h-10 text-gray-300" />
                  </div>
                  <div>
                    <CardTitle className="text-lg mb-1">{form.name || form.title || "بدون عنوان"}</CardTitle>
                    <p className="text-gray-600 text-sm">{form.description || ""}</p>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-2 mb-3">
                  <Button as={Link} href={route('forms.show', form.id)} variant="outline" size="sm" className="flex-1 flex items-center gap-2">
                    <FaEye /> معاينة
                  </Button>
                  {user.role === 'admin' && (
                    <>
                      <Button as={Link} href={route('forms.edit', form.id)} variant="outline" size="sm" className="flex-1 flex items-center gap-2">
                        <FaEdit /> تعديل
                      </Button>
                      <Button variant="outline" size="sm" color="danger" className="flex-1 flex items-center gap-2" onClick={() => {/* حذف النموذج */ }}>
                        <FaTrash /> حذف
                      </Button>
                    </>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>
    </DashboardLayout>
  );
} 