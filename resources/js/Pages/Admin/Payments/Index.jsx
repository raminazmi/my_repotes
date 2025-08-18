import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { FaCreditCard, FaCheckCircle, FaTimesCircle, FaUsers, FaMoneyBill, FaChartBar } from 'react-icons/fa';

export default function AdminPaymentsIndex({ payments, stats }) {
  return (
    <DashboardLayout>
      <Head title="كل المدفوعات" />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">لوحة مدفوعات النظام</h2>
        <div className="grid md:grid-cols-4 gap-6 mb-6">
          <Card className="bg-gradient-to-r from-blue-500 to-blue-600 text-white">
            <CardHeader><CardTitle className="flex items-center gap-2"><FaMoneyBill /> إجمالي المدفوعات</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.total} ريال</div></CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-green-500 to-green-600 text-white">
            <CardHeader><CardTitle className="flex items-center gap-2"><FaChartBar /> عدد العمليات</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.count}</div></CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-purple-500 to-purple-600 text-white">
            <CardHeader><CardTitle className="flex items-center gap-2"><FaUsers /> اشتراكات شهرية</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.monthly}</div></CardContent>
          </Card>
          <Card className="bg-gradient-to-r from-pink-500 to-pink-600 text-white">
            <CardHeader><CardTitle className="flex items-center gap-2"><FaUsers /> اشتراكات سنوية</CardTitle></CardHeader>
            <CardContent><div className="text-2xl font-bold">{stats.yearly}</div></CardContent>
          </Card>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2">#</th>
                <th className="p-2">المستخدم</th>
                <th className="p-2">المبلغ</th>
                <th className="p-2">النوع</th>
                <th className="p-2">الحالة</th>
                <th className="p-2">تاريخ البداية</th>
                <th className="p-2">تاريخ الانتهاء</th>
              </tr>
            </thead>
            <tbody>
              {payments.map((p, i) => (
                <tr key={p.id} className="border-b">
                  <td className="p-2">{i + 1}</td>
                  <td className="p-2">{p.user?.name || '-'}</td>
                  <td className="p-2">{p.amount} {p.currency}</td>
                  <td className="p-2">{p.subscription_type === 'yearly' ? 'سنوي' : 'شهري'}</td>
                  <td className="p-2">
                    {p.status === 'paid' ? <span className="text-green-600 flex items-center gap-1"><FaCheckCircle /> مدفوع</span> : <span className="text-red-600 flex items-center gap-1"><FaTimesCircle /> {p.status}</span>}
                  </td>
                  <td className="p-2">{p.start_date || '-'}</td>
                  <td className="p-2">{p.end_date || '-'}</td>
                </tr>
              ))}
              {payments.length === 0 && (
                <tr><td colSpan={7} className="text-center p-4 text-gray-400">لا توجد مدفوعات بعد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 