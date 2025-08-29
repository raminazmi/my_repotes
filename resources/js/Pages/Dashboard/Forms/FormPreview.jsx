import React from "react";
import StrategyBriefPreview from "./Previews/StrategyBriefPreview";
import ReportMoe3Preview from "./Previews/ReportMoe3Preview";
import LearningStylesPreview from "./Previews/LearningStylesPreview";

export default function FormPreview({ template, answers, user }) {
  // التأكد من أن template موجود
  if (!template) {
    return <div className="text-center text-red-600 p-8">لا يوجد قالب للعرض أو البيانات غير صحيحة</div>;
  }

  // التأكد من أن template.template موجود
  if (!template.template) {
    return <div className="text-center text-red-600 p-8">نوع القالب غير محدد</div>;
  }

  // دعم المعاينة الديناميكية لقالب تنفيذ استراتيجية مختصرة
  if (template.template === "strategy_brief") {
    return <StrategyBriefPreview answers={answers} user={user} />;
  }
  // دعم معاينة تقرير تنفيذ برنامج (تغطية) 4 شواهد
  if (template.template === "report_moe_3") {
    return <ReportMoe3Preview answers={answers} user={user} />;
  }
  // دعم معاينة استبيان أنماط التعلم
  if (template.template === "learning_styles_survey") {
    return <LearningStylesPreview answers={answers || {}} user={user} />;
  }

  // المعاينة الافتراضية للقوالب الأخرى
  return (
    <div dir="rtl" className="font-almarai bg-gray-50 min-h-screen py-8">
      <div className="text-center text-red-600 p-8">
        لا يوجد معاينة لهذا النوع من القوالب: {template.template}
      </div>
    </div>
  );
}