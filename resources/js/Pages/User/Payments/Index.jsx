import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/Components/ui/card';
import { Button } from '@/Components/ui/button';
import { FaCreditCard, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

export default function PaymentsIndex({ payments, user }) {
  const latest = payments[0];
  const isActive = latest && latest.status === 'paid' && new Date(latest.end_date) > new Date();
  const subType = latest ? (latest.subscription_type === 'yearly' ? 'سنوي' : 'شهري') : '-';
  const endDate = latest ? latest.end_date : '-';

  const handlePay = (type) => {
    fetch('/payments/checkout', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-CSRF-TOKEN': document.querySelector('meta[name="csrf-token"]').content },
      body: JSON.stringify({ subscription_type: type })
    })
      .then(res => res.json())
      .then(data => {
        if (data.url) window.location.href = data.url;
      });
  };

  return (
    <DashboardLayout>
      <Head title="مدفوعاتي" />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">الاشتراك الحالي</h2>
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FaCreditCard className="w-6 h-6 text-blue-500" />
              {isActive ? 'مفعل' : 'غير مفعل'}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <div>
                <div>نوع الاشتراك: <span className="font-bold">{subType}</span></div>
                <div>تاريخ الانتهاء: <span className="font-bold">{endDate}</span></div>
              </div>
              <div className="flex gap-2">
                <Button onClick={() => handlePay('monthly')} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">دفع شهري</Button>
                <Button onClick={() => handlePay('yearly')} className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">دفع سنوي</Button>
              </div>
            </div>
          </CardContent>
        </Card>
        <h3 className="text-2xl font-bold text-gray-800 mb-4">سجل المدفوعات</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded shadow">
            <thead>
              <tr>
                <th className="p-2">#</th>
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
                <tr><td colSpan={6} className="text-center p-4 text-gray-400">لا توجد مدفوعات بعد</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
} 