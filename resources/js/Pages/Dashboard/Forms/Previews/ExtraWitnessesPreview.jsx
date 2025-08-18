import React from 'react';

export default function ExtraWitnessesPreview({ witnessKeys = [], answers = {} }) {
  if (!witnessKeys.length) return null;

  const getImage = (key) => answers?.[key]
    ? <img src={typeof answers[key] === 'string' ? answers[key] : URL.createObjectURL(answers[key])} alt={key} className="w-80 h-80 object-cover rounded-xl border border-[#00BFAE] shadow-sm bg-white mx-auto" />
    : <div className="w-80 h-80 flex flex-col items-center justify-center rounded-xl border border-[#00BFAE] bg-white text-[#00BFAE] shadow-sm mx-auto">
      <svg className="w-10 h-10 mb-2" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V7M16 3H8a2 2 0 00-2 2v2h12V5a2 2 0 00-2-2z" /></svg>
      لا يوجد صورة
    </div>;

  return (
    <fieldset className="w-full border-2 border-[#009966] rounded-lg px-2 py-4 mb-4 relative witnesses-fieldset">
      <legend className="witnesses-legend mx-auto px-3 text-[#009966] font-bold text-base text-center" style={{ letterSpacing: '0.5px' }}>ملحق شواهد برنامج</legend>
      <div className={`flex flex-col md:grid gap-6 md:gap-4 justify-center items-stretch mt-2 witnesses-container ${witnessKeys.length === 1 ? 'md:grid-cols-1' : witnessKeys.length >= 2 ? 'md:grid-cols-2' : ''}`}>
        {witnessKeys.map((key, idx) => (
          <div key={key} className="w-full flex flex-col items-center justify-center min-h-[100px]">
            {getImage(key)}
          </div>
        ))}
      </div>
      <style>{`
        .witnesses-fieldset { border-color: #009A8E !important; }
        .witnesses-legend { color: #009A8E !important; font-weight: 600; font-size: 1.1rem; letter-spacing: 0.5px; }
        .witnesses-container { gap: 18px; }
        .witness-card { border-color: #009A8E !important; border-radius: 8px; background: #fff; }
        @media (max-width: 700px) {
          .witnesses-container { flex-direction: column !important; gap: 12px !important; }
          .witness-card { max-width: 100%; }
        }
      `}</style>
    </fieldset>
  );
} 