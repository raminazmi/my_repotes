import React from 'react';
import { FaCamera } from 'react-icons/fa';
import ExtraWitnessesPreview from './ExtraWitnessesPreview';
import ExtraWitnessesFullPreview from './ExtraWitnessesFullPreview';

export default function StrategyBriefPreview({ answers, user }) {
  const get = (key) => answers?.[key] || "-";
  const getCheckbox = (key) => answers?.[key] ? (
    <span className="inline-block w-5 h-5 rounded border-2 border-[#009A8E] flex items-center justify-center text-[#009A8E] text-3xl pb-2 pe-1">✓</span>
  ) : (
    <span className="inline-block w-5 h-5 rounded border-2 border-[#009A8E] flex items-center justify-center text-gray-400 text-lg"></span>
  );
  const getImage = (key) => answers?.[key]
    ? <img src={typeof answers[key] === 'string' ? answers[key] : URL.createObjectURL(answers[key])} alt={key} className="w-80 h-80 object-cover rounded-xl border border-[#00BFAE] shadow-sm bg-white mx-auto" />
    : <div className="w-80 h-80 flex flex-col items-center justify-center rounded-xl border border-[#00BFAE] bg-white text-[#00BFAE] shadow-sm mx-auto">
      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></svg>
      لا يوجد صورة
    </div>;

  // استخراج جميع الشواهد (صور) من answers
  const arabicOrder = [
    "الشاهد الأول", "الثاني", "الثالث", "الرابع", "الخامس", "السادس", "السابع", "الثامن", "التاسع", "العاشر",
    "الحادي عشر", "الثاني عشر", "الثالث عشر", "الرابع عشر", "الخامس عشر"
  ];
  const witnessKeys = Object.keys(answers || {}).filter(k => k.startsWith('الشاهد'));
  witnessKeys.sort((a, b) => {
    const aIdx = arabicOrder.findIndex(order => a.includes(order));
    const bIdx = arabicOrder.findIndex(order => b.includes(order));
    return aIdx - bIdx;
  });
  // الصور المضافة فقط
  const witnessImages = witnessKeys.filter(k => answers[k]);
  const mainWitnesses = witnessImages.slice(0, 4);
  const extraWitnesses = witnessImages.slice(4);

  return (
    <>
      <div dir="rtl" className="min-h-screen py-10 px-2 bg-[#F7F7F7] font-[Tajawal,sans-serif]">
        <div className="max-w-3xl mx-auto rounded-xl shadow-lg border border-[#E0E0E0] bg-white relative overflow-hidden">
          {/* رأس الصفحة والشعار */}
          <div className="flex items-center justify-center px-6 pt-6 pb-10 bg-gradient-to-l from-[#00BFAE] to-[#009A8E] rounded-t-xl relative">
            <img src="/assets/logo.png" alt="شعار" className="h-16 w-auto" />
            <div className="h-16 w-1 bg-white mx-4" />
            <div className="text-right">
              <div className="text-white text-lg leading-tight">الإدارة العامة للتعليم <br /> بالمنطقة الشمالية</div>
              <div className="text-white text-base">مكتب التعليم</div>
            </div>
            {/* اسم المدرسة متداخل */}
            <div className="absolute left-1/2 -translate-x-1/2 bottom-[-1rem] z-20">
              <div className="bg-[#20445a] text-white text-lg md:text-xl font-bold rounded-lg px-16 py-1 shadow-lg text-center min-w-[220px]" style={{ letterSpacing: '0.5px' }}>
                {get("اسم المدرسة")}
              </div>
            </div>
          </div>
          {/* عنوان المدرسة */}
          <div className="mt-8 mb-2" />
          {/* معلومات المدرسة */}
          <div className="px-8 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* الاستراتيجية */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">الاستراتيجية:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("استراتيجية التعلم")}</span>
              </fieldset>
              {/* المادة */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">المادة:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("المادة")}</span>
              </fieldset>
              {/* تاريخ التنفيذ */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">تاريخ التنفيذ:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("تاريخ التنفيذ")}</span>
              </fieldset>
              {/* المرحلة الدراسية */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">المرحلة الدراسية:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("المرحلة الدراسية")}</span>
              </fieldset>
              {/* الفصل */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">الفصل:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("الفصل")}</span>
              </fieldset>
              {/* عدد الطلاب */}
              <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
                <legend className="px-1 text-[#009A8E] font-bold text-sm">عدد الطلاب:</legend>
                <span className="text-[#4D4D4F] text-base font-medium text-center">{get("عدد المستفيدين")}</span>
              </fieldset>
            </div>
            {/* الدرس */}
            <fieldset className="border-2 border-[#009A8E] rounded-lg px-2 py-1 mb-4 bg-white">
              <legend className="px-1 text-[#009A8E] font-bold text-sm">الدرس:</legend>
              <span className="text-[#4D4D4F] text-base font-medium text-center block">{get("اسم الدرس")}</span>
            </fieldset>
          </div>
          {/* الأهداف + الأدوات والوسائل التعليمية */}
          <div className="px-8 mb-4 flex flex-col md:flex-row gap-6">
            {/* الأدوات والوسائل التعليمية */}
            <fieldset className="flex-1 border-2 border-[#009A8E] rounded-lg px-4 py-2 bg-white min-w-[220px]">
              <legend className="px-2 text-[#009A8E] font-bold text-lg">الأدوات والوسائل التعليمية:</legend>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2 mt-2">
                {[
                  "سبورة تقليدية", "جهاز عرض",
                  "سبورة ذكية", "جهاز الحاسب",
                  "بطاقات تعليمية", "صور توضيحية",
                  "أوراق عمل", "أدوات رياضية",
                  "كتاب", "عرض تقديمي"
                ].map((tool, idx) => (
                  <div key={tool} className="flex items-center gap-2 text-[#4D4D4F] text-sm font-medium">
                    {getCheckbox(tool)}
                    <span>{tool}</span>
                  </div>
                ))}
              </div>
            </fieldset>
            {/* الأهداف */}
            <fieldset className="flex-1 border-2 border-[#009A8E] rounded-lg px-4 py-2 bg-white min-w-[220px]">
              <legend className="px-2 text-[#009A8E] font-bold text-lg">الأهداف:</legend>
              <ol className="list-decimal list-inside text-right text-[#4D4D4F] text-base font-medium space-y-1 pr-2">
                {["الهدف الأول", "الهدف الثاني", "الهدف الثالث", "الهدف الرابع", "الهدف الخامس"].map((goal, i) => (
                  <li key={goal}>{get(goal)}</li>
                ))}
              </ol>
            </fieldset>
          </div>
          {/* الشواهد */}
          <div className="px-8 mb-4">
            <fieldset className="w-full border-2 border-[#009966] rounded-lg px-2 py-4 mb-4 relative witnesses-fieldset">
              <legend className="witnesses-legend mx-auto px-3 text-[#009966] font-bold text-base text-center" style={{ letterSpacing: '0.5px' }}>الشواهد</legend>
              <div className={`flex flex-col md:grid gap-6 md:gap-4 justify-center items-stretch mt-2 witnesses-container ${mainWitnesses.length === 1 ? 'md:grid-cols-1' : mainWitnesses.length >= 2 ? 'md:grid-cols-2' : ''}`}>
                {mainWitnesses.length > 0 ? mainWitnesses.map((key, idx) => (
                  <div key={key} className="w-full flex flex-col items-center justify-center min-h-[100px]">
                    {getImage(key)}
                  </div>
                )) : (
                  <div className="text-gray-400 text-center w-full">لا يوجد شواهد مضافة</div>
                )}
              </div>
            </fieldset>
            <style>{`
  .witnesses-fieldset { 
    border-color: #009A8E !important; 
  }
  .witnesses-legend { 
    color: #009A8E !important; 
    font-weight: 600; 
    font-size: 1.1rem; 
    letter-spacing: 0.5px; 
  }
  .witnesses-container { 
    gap: 18px; 
  }
  .witness-card { 
    border-color: #009A8E !important; 
    border-radius: 8px; 
    background: #fff; 
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  }
  @media (max-width: 700px) {
    .witnesses-container { 
      flex-direction: column !important; 
      gap: 12px !important; 
    }
    .witness-card { 
      max-width: 100%; 
    }
  }
`}</style>
          </div>
          {/* التوقيعات والتذييل */}
          <div className="flex justify-between items-end px-12 mt-8 mb-2">
            <div className="text-[#4D4D4F] text-base font-[Tajawal,sans-serif] text-center font-semibold">
              اسم المعلم <br />
              <span className="font-normal text-lg">{get("اسم المعلم")}</span>
            </div>
            <div className="text-[#4D4D4F] text-base font-[Tajawal,sans-serif] text-center font-semibold">
              مدير المدرسة <br />
              <span className="font-normal text-lg">{get("اسم مدير المدرسة")}</span>
            </div>
          </div>
          {/* التذييل الجديد */}
          <div className="w-full mt-4" dir="ltr">
            <div className="flex items-center py-1.5 px-4" style={{ background: '#20445a', minHeight: '36px' }}>
              <span className="flex items-center justify-center rounded-full bg-white mx-2" style={{ width: '28px', height: '28px' }}>
                {/* شعار X SVG */}
                <svg viewBox="0 0 120 120" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="60" cy="60" r="60" fill="#fff" />
                  <path d="M78.7 36H91L68.2 62.1L94.1 92H76.2L60.8 73.2L43.7 92H31.3L55.2 64.7L30.1 36H48.5L62.1 52.2L78.7 36ZM75.6 87.1H80.7L51.1 41.2H45.7L75.6 87.1Z" fill="#20445a" />
                </svg>
              </span>
              <span className="text-white font-medium text-base">@{get("حساب تويتر")}</span>
            </div>
            <div className="flex items-center" style={{ background: '#009A8E', minHeight: '3px' }}>
            </div>
          </div>
        </div>
      </div>
      {/* معاينة ملحق الشواهد في صفحة مستقلة إذا كان هناك أكثر من 4 */}
      {extraWitnesses.length > 0 && (
        <ExtraWitnessesFullPreview witnessKeys={extraWitnesses} answers={answers} />
      )}
    </>
  );
} 