import React from 'react';

export default function ExtraWitnessesFullPreview({ witnessKeys = [], answers = {} }) {
  if (!witnessKeys.length) return null;

  const getImage = (key) => answers?.[key]
    ? <img src={typeof answers[key] === 'string' ? answers[key] : URL.createObjectURL(answers[key])} alt={key} className="w-80 h-80 object-cover rounded-xl border border-[#00BFAE] shadow-sm bg-white mx-auto" />
    : <div className="w-80 h-80 flex flex-col items-center justify-center rounded-xl border border-[#00BFAE] bg-white text-[#00BFAE] shadow-sm mx-auto">
      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></svg>
      لا يوجد صورة
    </div>;

  return (
    <div dir="rtl" className="min-h-screen py-10 px-2 bg-[#F7F7F7] font-[Tajawal,sans-serif]">
      <div className="max-w-3xl mx-auto rounded-xl shadow-lg border border-[#E0E0E0] bg-white relative overflow-hidden">
        {/* Header */}
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
              {answers["اسم المدرسة"] || ""}
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="mt-8 mb-2" />
        <div className="px-8 mb-6">
          <div className="text-center text-2xl font-bold text-[#009966] mb-6">ملحق شواهد برنامج</div>
          <div className={`flex flex-col md:grid gap-6 md:gap-4 justify-center items-stretch mt-2 witnesses-container ${witnessKeys.length === 1 ? 'md:grid-cols-1' : witnessKeys.length >= 2 ? 'md:grid-cols-2' : ''}`}>
            {witnessKeys.map((key, idx) => (
              <div key={key} className="w-full flex flex-col items-center justify-center min-h-[100px]">
                {getImage(key)}
              </div>
            ))}
          </div>
        </div>
        {/* Footer */}
        <div className="w-full mt-4" dir="ltr">
          <div className="flex items-center py-1.5 px-4" style={{ background: '#20445a', minHeight: '36px' }}>
            <span className="flex items-center justify-center rounded-full bg-white mx-2" style={{ width: '28px', height: '28px' }}>
              <svg viewBox="0 0 120 120" width="22" height="22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="60" cy="60" r="60" fill="#fff" />
                <path d="M78.7 36H91L68.2 62.1L94.1 92H76.2L60.8 73.2L43.7 92H31.3L55.2 64.7L30.1 36H48.5L62.1 52.2L78.7 36ZM75.6 87.1H80.7L51.1 41.2H45.7L75.6 87.1Z" fill="#20445a" />
              </svg>
            </span>
            <span className="text-white font-medium text-base">@{answers["حساب تويتر"] || ""}</span>
          </div>
          <div className="flex items-center" style={{ background: '#009A8E', minHeight: '3px' }}></div>
        </div>
        <style>{`
          .witnesses-container { gap: 18px; }
          @media (max-width: 700px) {
            .witnesses-container { flex-direction: column !important; gap: 12px !important; }
          }
        `}</style>
      </div>
    </div>
  );
} 