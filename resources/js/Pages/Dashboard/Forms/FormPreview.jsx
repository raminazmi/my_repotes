import React from "react";
import StrategyBriefPreview from "./Previews/StrategyBriefPreview";
import ReportMoe3Preview from "./Previews/ReportMoe3Preview";

export default function FormPreview({ template, answers, user }) {
  if (!template) return <div className="text-center text-red-600">لا يوجد قالب للعرض أو البيانات غير صحيحة</div>;

  // دعم المعاينة الديناميكية لقالب تنفيذ استراتيجية مختصرة
  if (template.template === "strategy_brief") {
    return <StrategyBriefPreview answers={answers} user={user} />;
  }
  // دعم معاينة تقرير تنفيذ برنامج (تغطية) 4 شواهد
  if (template.template === "report_moe_3") {
    return <ReportMoe3Preview answers={answers} user={user} />;
  }

  // المعاينة الافتراضية للقوالب الأخرى
  if (!template || !Array.isArray(template) || template.length === 0) {
    return <div className="text-center text-red-600">لا يوجد قالب للعرض أو البيانات غير صحيحة</div>;
  }

  return (
    <div dir="rtl" className="font-almarai bg-gray-50 min-h-screen py-8">
      لا يوجد معاينة
    </div>
  );
}