import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Link, useForm } from "@inertiajs/react";
import { BookOpen, Star } from "lucide-react";

export default function Signup() {
  const { data, setData, post, processing, errors, reset } = useForm({
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
    school: '',
    subject: ''
  });

  const submit = (e) => {
    e.preventDefault();
    post(route('register'), {
      onFinish: () => reset('password', 'password_confirmation'),
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
          <h2 className="text-3xl font-bold text-gray-800">إنشاء حساب جديد</h2>
          <p className="text-gray-600 mt-2">انضم إلى منصة My Reports للتقارير التعليمية</p>
        </div>
        <Card className="shadow-2xl border-0">
          <CardHeader className="bg-gradient-to-r from-[#00BFAE] to-[#009A8E] text-white rounded-t-lg">
            <CardTitle className="text-center text-xl">معلوماتك الشخصية</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name" className="text-gray-700 font-medium">الاسم الكامل</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="أحمد محمد العلي"
                  value={data.name}
                  onChange={(e) => setData('name', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
                {errors.name && (
                  <div className="text-red-500 text-sm mt-1">{errors.name}</div>
                )}
              </div>
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
                <Label htmlFor="school" className="text-gray-700 font-medium">اسم المدرسة</Label>
                <Input
                  id="school"
                  type="text"
                  placeholder="مدرسة الأمير فيصل الابتدائية"
                  value={data.school}
                  onChange={(e) => setData('school', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
                {errors.school && (
                  <div className="text-red-500 text-sm mt-1">{errors.school}</div>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="subject" className="text-gray-700 font-medium">التخصص</Label>
                <Select value={data.subject} onValueChange={(value) => setData('subject', value)}>
                  <SelectTrigger className="border-gray-300 focus:border-blue-500">
                    <SelectValue placeholder="اختر تخصصك" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="arabic">اللغة العربية</SelectItem>
                    <SelectItem value="math">الرياضيات</SelectItem>
                    <SelectItem value="science">العلوم</SelectItem>
                    <SelectItem value="english">اللغة الإنجليزية</SelectItem>
                    <SelectItem value="social">الاجتماعيات</SelectItem>
                    <SelectItem value="islamic">التربية الإسلامية</SelectItem>
                    <SelectItem value="other">أخرى</SelectItem>
                  </SelectContent>
                </Select>
                {errors.subject && (
                  <div className="text-red-500 text-sm mt-1">{errors.subject}</div>
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
              <div className="space-y-2">
                <Label htmlFor="password_confirmation" className="text-gray-700 font-medium">تأكيد كلمة المرور</Label>
                <Input
                  id="password_confirmation"
                  type="password"
                  placeholder="••••••••"
                  value={data.password_confirmation}
                  onChange={(e) => setData('password_confirmation', e.target.value)}
                  className="border-gray-300 focus:border-blue-500"
                  required
                />
                {errors.password_confirmation && (
                  <div className="text-red-500 text-sm mt-1">{errors.password_confirmation}</div>
                )}
              </div>
              <div className="flex items-center space-x-2 space-x-reverse">
                <input type="checkbox" className="rounded border-gray-300" required />
                <span className="text-sm text-gray-600">
                  أوافق على{" "}
                  <Link href="/terms" className="text-[#00BFAE] hover:text-[#009A8E] font-medium">
                    الشروط والأحكام
                  </Link>
                  {" "}
                  و{" "}
                  <Link href="/privacy" className="text-[#00BFAE] hover:text-[#009A8E] font-medium">
                    سياسة الخصوصية
                  </Link>
                </span>
              </div>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#00BFAE] to-[#009A8E] hover:from-[#37a299] hover:to-[#23bbae] py-3 text-lg font-bold"
                disabled={processing}
              >
                {processing ? "جاري إنشاء الحساب..." : "إنشاء الحساب"}
              </Button>
            </form>
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600">
                لديك حساب بالفعل؟{" "}
                <Link href={route('login')} className="text-[#00BFAE] hover:text-[#009A8E] font-bold">
                  تسجيل الدخول
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
