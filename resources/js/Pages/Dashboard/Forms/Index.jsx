import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { FaRegFileAlt, FaUsers, FaCalendar, FaCog, FaEye, FaEdit, FaPlus } from "react-icons/fa";

export default function FormsIndex({ forms }) {
  return (
    <DashboardLayout>
      <Head title="النماذج" />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">النماذج</h2>
        <p className="text-gray-600">إدارة النماذج والاستطلاعات الخاصة بك</p>
      </div>
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Forms Grid */}
        {forms.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {forms.map((form) => (
              <Card key={form.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <CardTitle className="text-lg mb-2">{form.title}</CardTitle>
                      <p className="text-gray-600 text-sm mb-3">{form.description}</p>
                      <div className="flex items-center gap-2 mb-3">
                        <Badge variant={form.is_active ? "default" : "secondary"}>
                          {form.is_active ? "نشط" : "غير نشط"}
                        </Badge>
                        <Badge variant="outline">{form.type}</Badge>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Link href={route('forms.show', form.id)}>
                        <Button variant="outline" size="sm">
                          <FaEye className="w-4 h-4" />
                        </Button>
                      </Link>
                      <Link href={route('forms.edit', form.id)}>
                        <Button variant="outline" size="sm">
                          <FaEdit className="w-4 h-4" />
                        </Button>
                      </Link>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center gap-1">
                      <FaCalendar className="w-4 h-4" />
                      <span>{new Date(form.created_at).toLocaleDateString('ar-SA')}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Link href={route('forms.show', form.id)} className="flex-1">
                      <Button variant="outline" className="w-full">
                        عرض التفاصيل
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="text-center py-12">
            <div className="mb-6">
              <FaRegFileAlt className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                لا توجد نماذج بعد
              </h3>
              <p className="text-gray-600 mb-6">
                ابدأ بإنشاء نموذجك الأول لجمع البيانات والتقارير
              </p>
              <Link href={route('forms.create')}>
                <Button className="bg-gradient-to-r from-blue-500 to-purple-600">
                  <FaPlus className="w-4 h-4 mr-2" />
                  إنشاء نموذج جديد
                </Button>
              </Link>
            </div>
          </Card>
        )}
      </main>
    </DashboardLayout>
  );
} 