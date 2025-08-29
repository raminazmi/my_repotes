import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { BookOpen, FileText, Users, BarChart3, Plus, Settings, TrendingUp, Calendar, Clock } from "lucide-react";
import { Link } from "@inertiajs/react";
import DashboardLayout from '@/Layouts/DashboardLayout';

export default function Dashboard({ auth, stats }) {
  return (
    <DashboardLayout>
      <Head title="لوحة التحكم" />
      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-gray-800 mb-2">
            مرحباً بك في My Reports
          </h2>
          <p className="text-gray-600">
            {auth.user.school} - {auth.user.subject}
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <FileText className="w-5 h-5" />
                إجمالي النماذج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.total_forms}</div>
              <p className="text-blue-100 text-sm">نموذج نشط</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                النماذج النشطة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stats.active_forms}</div>
              <p className="text-purple-100 text-sm">نموذج نشط</p>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-orange-600 text-white">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg flex items-center gap-2">
                <BarChart3 className="w-5 h-5" />
                معدل الاستجابة
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {stats.total_forms > 0 ? Math.round((stats.total_responses / stats.total_forms) * 100) : 0}%
              </div>
              <p className="text-orange-100 text-sm">معدل شهري</p>
            </CardContent>
          </Card>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-[#00BFAE]" />
                إنشاء نموذج جديد
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                أنشئ نموذجاً جديداً لجمع البيانات والتقارير
              </p>
              <Link href={route('forms.create')}>
                <Button className="w-full bg-gradient-to-r from-[#00BFAE] to-[#009A8E]">
                  إنشاء النموذج
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-green-600" />
                عرض النماذج
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                استعرض النماذج الموجودة والردود المستلمة
              </p>
              <Link href={route('forms.index')}>
                <Button variant="outline" className="w-full">
                  عرض النماذج
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow cursor-pointer">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-purple-600" />
                التقارير والإحصائيات
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                عرض التقارير والإحصائيات التفصيلية
              </p>
              <Button variant="outline" className="w-full">
                عرض التقارير
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="w-5 h-5" />
              النشاط الأخير
            </CardTitle>
          </CardHeader>
          <CardContent>
            {stats.recent_responses && stats.recent_responses.length > 0 ? (
              <div className="space-y-4">
                {stats.recent_responses.map((response, index) => (
                  <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">رد جديد</h4>
                      <p className="text-sm text-gray-600">
                        {response.respondent_name || 'مجهول'} - {response.form?.title}
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(response.submitted_at).toLocaleDateString('ar-SA')}
                    </span>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <FileText className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                <p>لا توجد ردود حديثة</p>
                <p className="text-sm">ابدأ بإنشاء نموذج لجمع الردود</p>
              </div>
            )}
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
}
