import { useState } from "react";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Link, useForm } from "@inertiajs/react";
import { BookOpen, Star } from "lucide-react";

export default function Login({ status, canResetPassword }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    email: '',
    password: '',
    remember: false,
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('login'), {
      onFinish: () => reset('password'),
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#00BFAE]/5 via-[#009A8E]/10 to-[#008B7A]/15 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        {/* Header */}
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center gap-3 mb-6">
            <div className="relative">
              <div className="w-12 h-12 bg-gradient-to-r from-[#00BFAE] to-[#009A8E] rounded-xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-7 h-7 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 w-4 h-4 bg-yellow-400 rounded-full flex items-center justify-center">
                <Star className="w-2 h-2 text-yellow-800" />
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#00BFAE] to-[#009A8E] bg-clip-text text-transparent">My Reports</h1>
              <p className="text-sm text-gray-600 font-medium">صديق المعلم والإداري</p>
            </div>
          </Link>
          <h2 className="text-3xl font-bold text-gray-800">تسجيل الدخول</h2>
          <p className="text-gray-600 mt-2">ادخل إلى حسابك للوصول للتقارير</p>
        </div>

        {status && (
          <div className="mb-4 text-sm font-medium text-green-600 text-center">
            {status}
          </div>
        )}

        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-[#00BFAE] to-[#009A8E] text-white rounded-t-lg">
            <CardTitle className="text-center text-xl">مرحباً بعودتك</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-700 font-medium">البريد الإلكتروني</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="teacher@example.com"
                  value={data.email}
                  onChange={(e) => setData('email', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
                {errors.email && (
                  <div className="text-red-500 text-sm mt-1">{errors.email}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">كلمة المرور</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  value={data.password}
                  onChange={(e) => setData('password', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
                {errors.password && (
                  <div className="text-red-500 text-sm mt-1">{errors.password}</div>
                )}
              </div>
              <div className="flex items-center justify-between">
                <label className="flex items-center space-x-2 space-x-reverse">
                  <input
                    type="checkbox"
                    className="rounded border-gray-300"
                    checked={data.remember}
                    onChange={(e) => setData('remember', e.target.checked)}
                  />
                  <span className="text-sm text-gray-600">تذكرني</span>
                </label>
                {canResetPassword && (
                  <Link href={route('password.request')} className="text-sm text-[#00BFAE] hover:text-[#009A8E] font-medium">
                    نسيت كلمة المرور؟
                  </Link>
                )}
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00BFAE] to-[#009A8E] hover:from-[#37a299] hover:to-[#23bbae] py-3 text-lg font-bold"
                disabled={processing}
              >
                {processing ? "جاري تسجيل الدخول..." : "تسجيل الدخول"}
              </Button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                ليس لديك حساب؟{" "}
                <Link href={route('register')} className="text-[#00BFAE] hover:text-[#009A8E] font-bold">
                  إنشاء حساب جديد
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="mt-6 text-center">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-800 font-medium">
            ← العودة للصفحة الرئيسية
          </Link>
        </div>
      </div>
    </div>
  );
}
