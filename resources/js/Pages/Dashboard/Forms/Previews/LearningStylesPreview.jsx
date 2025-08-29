import React from 'react';
import { Badge } from "@/Components/ui/badge";

export default function LearningStylesPreview({ answers = {}, user }) {
  // التأكد من أن answers موجودة
  if (!answers) {
    answers = {};
  }

  const get = (key) => answers?.[key] || "________________";
  const getCheckbox = (key) => answers?.[key] ? (
    <span className="inline-block w-4 h-4 rounded border-2 border-[#009A8E] bg-[#009A8E] flex items-center justify-center text-white text-xs font-bold">✓</span>
  ) : (
    <span className="inline-block w-4 h-4 rounded border-2 border-[#009A8E] bg-white"></span>
  );

  const getStyleIcon = (style) => {
    const icons = {
      visual: '👁️',
      auditory: '👂',
      reading: '📖',
      kinesthetic: '✋'
    };
    return icons[style] || '📝';
  };

  const getStyleColor = (style) => {
    const colors = {
      visual: 'bg-[#00BFAE]/20 text-[#009A8E]',
      auditory: 'bg-green-100 text-green-800',
      reading: 'bg-yellow-100 text-yellow-800',
      kinesthetic: 'bg-red-100 text-red-800'
    };
    return colors[style] || 'bg-gray-100 text-gray-800';
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white">
      {/* Header - مطابق للصورة الأصلية */}
      <div className="text-center mb-8 p-6 bg-gradient-to-r from-[#00BFAE] to-[#009A8E] text-white rounded-lg shadow-lg">
        <div className="w-20 h-20 bg-white rounded-full mx-auto mb-4 flex items-center justify-center">
          <span className="text-[#009A8E] text-2xl font-bold">وزارة التعليم</span>
        </div>
        <div className="text-2xl font-bold mb-2">استبيان أنماط التعلم</div>
        <div className="text-sm opacity-90">الإدارة العامة للتعليم بالمنطقة الشمالية مكتب التعليم</div>
        <div className="text-sm opacity-75 mt-2">١٤٤٦/١٢/١٢هـ</div>
      </div>

      {/* معلومات الطالب */}
      <div className="mb-6">
        <div className="bg-[#00BFAE]/10 border-r-4 border-[#009A8E] p-4 rounded-r-lg mb-4">
          <h3 className="text-[#009A8E] text-lg font-bold">معلومات الطالب</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4"></div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم المدرسة
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
            {get('اسم المدرسة')}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            اسم الطالب/ة
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
            {get('اسم الطالب/ة')}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الاسم الأول
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
            {get('الاسم الأول')}
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            الصف / الفصل
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
            {get('الصف / الفصل')}
          </div>
        </div>
      </div>

      {/* الأسئلة - عمودين */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* العمود الأيسر */}
        <div className="space-y-6">
          {/* السؤال الأول */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال الأول: عندما يتعلم شيئاً جديداً، كيف يستوعبه بشكل أفضل؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('من خلال رؤية صور توضيحية أو مقاطع فيديو')}
                <span className="text-sm text-gray-700 mr-3">من خلال رؤية صور توضيحية أو مقاطع فيديو</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('من خلال الاستماع إلى الشرح')}
                <span className="text-sm text-gray-700 mr-3">من خلال الاستماع إلى الشرح</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('من خلال قراءة التعليمات')}
                <span className="text-sm text-gray-700 mr-3">من خلال قراءة التعليمات</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('من خلال التجربة العملية والممارسة')}
                <span className="text-sm text-gray-700 mr-3">من خلال التجربة العملية والممارسة</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>

          {/* السؤال الثالث */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال الثالث: عندما يشرح معلومة أو قصة لكم، ماذا يفعل عادة؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('يستخدم عبارات مثل "انظر" أو "أرى" ويصف تفاصيل بصرية')}
                <span className="text-sm text-gray-700 mr-3">يستخدم عبارات مثل "انظر" أو "أرى" ويصف تفاصيل بصرية</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يستخدم عبارات مثل "اسمع" أو "قال" ويهتم بنقل ما سمعه')}
                <span className="text-sm text-gray-700 mr-3">يستخدم عبارات مثل "اسمع" أو "قال" ويهتم بنقل ما سمعه</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يروي القصة بتسلسل منطقي ويهتم بالتفاصيل النصية')}
                <span className="text-sm text-gray-700 mr-3">يروي القصة بتسلسل منطقي ويهتم بالتفاصيل النصية</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يستخدم حركات اليدين ويتحرك أثناء الشرح')}
                <span className="text-sm text-gray-700 mr-3">يستخدم حركات اليدين ويتحرك أثناء الشرح</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>

          {/* السؤال الخامس */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال الخامس: ما الذي يشتت انتباهه أثناء الدراسة أو أداء الواجبات؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('الفوضى البصرية أو الحركة المرئية من حوله')}
                <span className="text-sm text-gray-700 mr-3">الفوضى البصرية أو الحركة المرئية من حوله</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('الضوضاء والأصوات')}
                <span className="text-sm text-gray-700 mr-3">الضوضاء والأصوات</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('عدم وضوح التعليمات المكتوبة')}
                <span className="text-sm text-gray-700 mr-3">عدم وضوح التعليمات المكتوبة</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('الجلوس لفترة طويلة دون حركة')}
                <span className="text-sm text-gray-700 mr-3">الجلوس لفترة طويلة دون حركة</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>
        </div>

        {/* العمود الأيمن */}
        <div className="space-y-6">
          {/* السؤال الثاني */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال الثاني: في وقت الفراغ، ما الذي يقوم به؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('مشاهدة الكتب المصورة أو الرسوم المتحركة')}
                <span className="text-sm text-gray-700 mr-3">مشاهدة الكتب المصورة أو الرسوم المتحركة</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('الاستماع إلى القصص')}
                <span className="text-sm text-gray-700 mr-3">الاستماع إلى القصص</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('القراءة أو كتابة القصص')}
                <span className="text-sm text-gray-700 mr-3">القراءة أو كتابة القصص</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('اللعب الحركي أو صنع الأشياء بيديه')}
                <span className="text-sm text-gray-700 mr-3">اللعب الحركي أو صنع الأشياء بيديه</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>

          {/* السؤال الرابع */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال الرابع: عندما يكون في غرفته، ما الذي تلاحظه عادة؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('يهتم بترتيب ألعابه بطريقة جمالية أو حسب الألوان')}
                <span className="text-sm text-gray-700 mr-3">يهتم بترتيب ألعابه بطريقة جمالية أو حسب الألوان</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يتحدث إلى نفسه أو ينشد أثناء اللعب')}
                <span className="text-sm text-gray-700 mr-3">يتحدث إلى نفسه أو ينشد أثناء اللعب</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('لديه مجموعة من الكتب ويهتم بترتيبها')}
                <span className="text-sm text-gray-700 mr-3">لديه مجموعة من الكتب ويهتم بترتيبها</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('لا يستطيع البقاء ساكناً ويستخدم كل مساحة الغرفة للعب')}
                <span className="text-sm text-gray-700 mr-3">لا يستطيع البقاء ساكناً ويستخدم كل مساحة الغرفة للعب</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>

          {/* السؤال السادس */}
          <div className="mb-6">
            <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
              <h3 className="text-gray-800 text-base font-bold">السؤال السادس: عندما يريد التعبير عن فكرة جديدة، ماذا يفعل غالباً؟</h3>
            </div>
            <div className="space-y-3">
              <div className="flex items-center">
                {getCheckbox('يرسم أو يخطط لها')}
                <span className="text-sm text-gray-700 mr-3">يرسم أو يخطط لها</span>
                <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يتحدث عنها كثيراً')}
                <span className="text-sm text-gray-700 mr-3">يتحدث عنها كثيراً</span>
                <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يكتب عنها أو يقرأ عن مواضيع مشابهة')}
                <span className="text-sm text-gray-700 mr-3">يكتب عنها أو يقرأ عن مواضيع مشابهة</span>
                <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
              </div>
              <div className="flex items-center">
                {getCheckbox('يصنع نموذجاً أو يجرب تنفيذها عملياً')}
                <span className="text-sm text-gray-700 mr-3">يصنع نموذجاً أو يجرب تنفيذها عملياً</span>
                <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* تحليل النتائج */}
      <div className="mb-6">
        <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
          <h3 className="text-gray-800 text-base font-bold">تحليل النتائج بحساب عدد الإجابات لكل نمط (يعبأ من قبل المعلم):</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إجابات البصري
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 w-20 min-h-[20px]">
              {get('إجابات البصري')}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إجابات السمعي
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 w-20 min-h-[20px]">
              {get('إجابات السمعي')}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إجابات (قراءة/كتابة)
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 w-20 min-h-[20px]">
              {get('إجابات (قراءة/كتابة)')}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              إجابات الحركي
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 w-20 min-h-[20px]">
              {get('إجابات الحركي')}
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            نمط التعلم المناسب هو
          </label>
          <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
            {get('نمط التعلم المناسب هو')}
          </div>
        </div>
      </div>

      {/* Note - مطابق للصورة الأصلية */}
      <div className="mt-8 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start">
          <div className="text-yellow-600 mr-3 mt-1 text-lg">💡</div>
          <div className="text-sm text-yellow-800">
            <strong>ملاحظة:</strong> معظم الأطفال يتعلمون بأكثر من نمط واحد، لذا فإن وجود إجابات موزعة على عدة أنماط أمر طبيعي
          </div>
        </div>
      </div>

      {/* Style Legend - مطابق للصورة الأصلية */}
      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-bold text-gray-800 mb-4">دليل أنماط التعلم</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="flex items-center">
            <Badge className="bg-[#00BFAE]/20 text-[#009A8E] mr-2">👁️</Badge>
            <span className="text-sm font-medium">بصري</span>
          </div>
          <div className="flex items-center">
            <Badge className="bg-green-100 text-green-800 mr-2">👂</Badge>
            <span className="text-sm font-medium">سمعي</span>
          </div>
          <div className="flex items-center">
            <Badge className="bg-yellow-100 text-yellow-800 mr-2">📖</Badge>
            <span className="text-sm font-medium">قراءة/كتابة</span>
          </div>
          <div className="flex items-center">
            <Badge className="bg-red-100 text-red-800 mr-2">✋</Badge>
            <span className="text-sm font-medium">حركي</span>
          </div>
        </div>
      </div>

      {/* التوقيعات */}
      <div className="mb-6">
        <div className="bg-gray-50 border-r-4 border-gray-400 p-4 rounded-r-lg mb-4">
          <h3 className="text-gray-800 text-base font-bold">التوقيعات</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              أ/ اسم المعلم
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
              {get('أ/ اسم المعلم')}
            </div>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              توقيع ولي الأمر
            </label>
            <div className="border border-gray-300 rounded-md px-3 py-2 bg-gray-50 text-gray-500 min-h-[20px]">
              {get('توقيع ولي الأمر')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
