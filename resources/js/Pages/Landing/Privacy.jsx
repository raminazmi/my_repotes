import { Button } from "@/Components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Shield, Lock, Eye, UserCheck } from "lucide-react";
import { Link } from "@inertiajs/react";
import Header from "@/Components/Header";
import Footer from "@/Components/Footer";

export default function Privacy() {
  const sections = [
    {
      icon: <Shield className="w-6 h-6 text-blue-500" />,
      title: "المعلومات التي نجمعها",
      content: [
        "المعلومات الشخصية مثل الاسم والبريد الإلكتروني عند إنشاء الحساب",
        "معلومات المدرسة والتخصص لتخصيص الخدمة",
        "بيانات الاستخدام لتحسين تجربة المستخدم",
        "معلومات الدفع والفوترة (محمية بأعلى معايير الأمان)"
      ]
    },
    {
      icon: <Lock className="w-6 h-6 text-green-500" />,
      title: "كيف نحمي معلوماتك",
      content: [
        "تشفير جميع البيانات الحساسة باستخدام تقنيات SSL/TLS",
        "خوادم آمنة ومحمية بجدران حماية متقدمة",
        "نسخ احتياطية منتظمة لضمان استمرارية الخدمة",
        "مراقبة أمنية على مدار الساعة لاكتشاف أي تهديدات محتملة"
      ]
    },
    {
      icon: <Eye className="w-6 h-6 text-purple-500" />,
      title: "كيف نستخدم معلوماتك",
      content: [
        "تقديم الخدمات المطلوبة وتخصيص المحتوى",
        "إرسال إشعارات مهمة حول حسابك والخدمة",
        "تحسين وتطوير منصة EduForms",
        "التواصل معك للدعم الفني والمساعدة عند الحاجة"
      ]
    },
    {
      icon: <UserCheck className="w-6 h-6 text-orange-500" />,
      title: "حقوقك في البيانات",
      content: [
        "الحق في الوصول إلى بياناتك الشخصية وتحديثها",
        "الحق في حذف حسابك وجميع البيانات المرتبطة به",
        "الحق في تصدير بياناتك بصيغة قابلة للقراءة",
        "الحق في الاعتراض على معالجة بياناتك لأغراض التسويق"
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      <Header />

      {/* Hero Section */}
      <section className="py-20 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="p-4 bg-blue-100 rounded-full">
              <Shield className="w-12 h-12 text-blue-600" />
            </div>
          </div>
          <h1 className="text-5xl font-bold text-gray-800 mb-6">سياسة الخصوصية</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            نحن في EduForms نلتزم بحماية خصوصيتك وأمان بياناتك. هذه السياسة توضح كيف نجمع ونستخدم ونحمي معلوماتك الشخصية.
          </p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <p className="text-blue-800 font-medium">
              آخر تحديث: 1 يناير 2025 | سارية المفعول من: 1 يناير 2025
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-12 px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          {/* Introduction */}
          <Card className="p-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">مقدمة</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              مرحباً بك في EduForms. نحن شركة تقنية تعليمية مقرها في المملكة العربية السعودية، نقدم
              منصة EduFormsة لإنشاء وإدارة النماذج والتقارير التعليمية للمعلمين والإداريين.
            </p>
            <p className="text-gray-600 leading-relaxed">
              هذه السياسة تشرح بوضوح كيف نتعامل مع بياناتك الشخصية، وما هي حقوقك، وكيف يمكنك
              التحكم في معلوماتك. نلتزم بمبادئ الشفافية والأمان في جميع عملياتنا.
            </p>
          </Card>

          {/* Sections */}
          {sections.map((section, index) => (
            <Card key={index} className="p-8 shadow-lg border-0">
              <CardHeader className="p-0 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-2 bg-gray-50 rounded-lg">
                    {section.icon}
                  </div>
                  <CardTitle className="text-2xl text-gray-800">{section.title}</CardTitle>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="space-y-3">
                  {section.content.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-600 leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          ))}

          {/* Cookies Section */}
          <Card className="p-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">ملفات الارتباط (Cookies)</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              نستخدم ملفات الارتباط لتحسين تجربتك في استخدام المنصة. هذه الملفات تساعدنا في:
            </p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">تذكر تسجيل دخولك للجلسات المستقبلية</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">حفظ تفضيلاتك وإعداداتك الشخصية</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">تحليل كيفية استخدام المنصة لتحسينها</span>
              </li>
            </ul>
            <p className="text-gray-600 leading-relaxed">
              يمكنك التحكم في ملفات الارتباط من خلال إعدادات متصفحك، لكن تعطيلها قد يؤثر على بعض وظائف المنصة.
            </p>
          </Card>

          {/* Third Party Services */}
          <Card className="p-8 shadow-lg border-0">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">الخدمات الخارجية</h2>
            <p className="text-gray-600 leading-relaxed mb-4">
              نستخدم بعض الخدمات الخارجية الموثوقة لتقديم خدمة أفضل لك:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">خدمات الدفع الآمنة مثل Stripe للمعالجة الآمنة للمدفوعات</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">خدمات التحليلات لفهم استخدام المنصة وتحسينها</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                <span className="text-gray-600">خدمات البريد الإلكتروني لإرسال الإشعارات المهمة</span>
              </li>
            </ul>
          </Card>

          {/* Contact */}
          <Card className="p-8 shadow-lg border-0 bg-gradient-to-br from-blue-50 to-purple-50">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">تواصل معنا</h2>
            <p className="text-gray-600 leading-relaxed mb-6">
              إذا كان لديك أي أسئلة حول سياسة الخصوصية هذه أو كيفية تعاملنا مع بياناتك،
              لا تتردد في التواصل معنا:
            </p>
            <div className="space-y-2 mb-6">
              <p className="text-gray-600"><strong>البريد الإلكتروني:</strong> privacy@eduforms.sa</p>
              <p className="text-gray-600"><strong>الهاتف:</strong> +966 11 123 4567</p>
              <p className="text-gray-600"><strong>العنوان:</strong> الرياض، المملكة العربية السعودية</p>
            </div>
            <Link href="/contact">
              <Button className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700">
                تواصل معنا الآن
              </Button>
            </Link>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-6 bg-gradient-to-r from-blue-600 to-purple-700 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">خصوصيتك أولويتنا</h2>
          <p className="text-lg mb-6 opacity-95">
            نلتزم بحماية بياناتك وخصوصيتك في كل خطوة. ابدأ استخدام EduForms بثقة تامة.
          </p>
          <Link href="/signup">
            <Button size="lg" variant="secondary" className="px-8 py-3 text-lg bg-white text-blue-600 hover:bg-gray-100 font-bold">
              ابدأ الآن بأمان
            </Button>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}