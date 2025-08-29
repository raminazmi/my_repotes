import React from "react";

export default function StrategyBriefPreview({ answers, user }) {
  // حماية من عدم وجود answers
  const get = (key) => answers?.[key] || "-";
  const getCheckbox = (key) => answers?.[key] ? "✅" : "❌";
  const getImage = (key) => answers?.[key] ? <img src={answers[key]} alt={key} className="w-32 h-32 object-cover rounded border" /> : <span className="text-gray-400">لا يوجد صورة</span>;

  return (
    <div dir="rtl" className="font-almarai bg-gray-50 min-h-screen py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header Section */}
        <div className="header-section relative bg-gradient-to-r from-blue-800 to-blue-600 text-white text-center py-6">
          <div className="absolute inset-0 bg-[radial-gradient(circle,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[length:10px_10px] opacity-50"></div>
          <h1 className="text-3xl font-bold relative z-10">الإدارة العامة للتعليم بالمنطقة الشمالية</h1>
          <p className="text-sm relative z-10">مكتب التعليم</p>
        </div>

        <div className="p-6">
          {/* School Info */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-blue-800 mb-2">{get("اسم المدرسة")}</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><b>تاريخ التنفيذ:</b> {get("تاريخ التنفيذ")}</div>
              <div><b>المادة:</b> {get("المادة")}</div>
              <div><b>استراتيجية التعلم:</b> {get("استراتيجية التعلم")}</div>
              <div><b>عدد المستفيدين:</b> {get("عدد المستفيدين")}</div>
              <div><b>المرحلة الدراسية:</b> {get("المرحلة الدراسية")}</div>
              <div><b>الفصل:</b> {get("الفصل")}</div>
              <div><b>اسم الدرس:</b> {get("اسم الدرس")}</div>
            </div>
          </div>

          {/* Goals */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">الأهداف</h3>
            <ol className="list-decimal pr-5 space-y-2">
              {["الهدف الأول", "الهدف الثاني", "الهدف الثالث", "الهدف الرابع", "الهدف الخامس"].map((goal) => (
                <li key={goal}>{get(goal)}</li>
              ))}
            </ol>
          </div>

          {/* Teacher/Admin Info */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">بيانات المعلم والإدارة</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div><b>اسم المعلم:</b> {get("اسم المعلم")}</div>
              <div><b>اسم مدير المدرسة:</b> {get("اسم مدير المدرسة")}</div>
              <div><b>حساب تويتر:</b> {get("حساب تويتر")}</div>
            </div>
          </div>

          {/* Tools Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">الوسائل التعليمية المستخدمة</h3>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {["جهاز عرض", "جهاز حاسب", "صورة توضيحية", "أدوات رياضية", "كتاب", "سبورة تقليدية", "سبورة ذكية", "بطاقات تعليمية", "أوراق عمل", "عرض تقديمي"].map((tool) => (
                <div key={tool} className="flex items-center gap-2">
                  <span>{tool}:</span>
                  <span>{getCheckbox(tool)}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence Section */}
          <div className="mb-8">
            <h3 className="text-xl font-bold text-blue-800 mb-2">صور الشواهد</h3>
            <div className="flex gap-8">
              <div className="flex flex-col items-center">
                <span className="mb-2">الشاهد الأول</span>
                {getImage("الشاهد الأول")}
              </div>
              <div className="flex flex-col items-center">
                <span className="mb-2">الشاهد الثاني</span>
                {getImage("الشاهد الثاني")}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="bg-[#20445a] text-white text-center py-2 text-sm">
          © وزارة التربية والتعليم
        </div>
      </div>
    </div>
  );
} 