import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState } from "react";
import FormPreview from '@/Pages/Dashboard/Forms/FormPreview';

export default function TemplateShow({ form, auth, report }) {
  const template = form;
  if (!template || !template.settings || !Array.isArray(template.settings.templateBlocks)) {
    return (
      <DashboardLayout>
        <div className="text-center text-red-600 py-10">
          حدث خطأ في تحميل بيانات القالب. يرجى التأكد من إعدادات القالب أو التواصل مع الدعم الفني.
        </div>
      </DashboardLayout>
    );
  }
  const [showPreview, setShowPreview] = useState(!!report);
  const [activeSection, setActiveSection] = useState(0);
  const { data, setData, post, processing, errors } = useForm({
    answers: report?.data || {},
  });

  // التحقق مما إذا كان القسم الحالي هو قسم الشواهد
  const isWitnessSection = () => {
    const sectionLabel = template.settings.templateBlocks[activeSection]?.label || '';
    return sectionLabel.includes('شواهد') || sectionLabel.includes('صور');
  };

  // الحصول على الشواهد الخاصة بالقسم الحالي فقط
  const getCurrentWitnesses = () => {
    const currentBlockId = template.settings.templateBlocks[activeSection]?.id;
    return data.answers.witnesses?.filter(field => field.blockId === currentBlockId);
  };

  // إضافة شاهد جديد
  const handleAddWitness = () => {
    const currentBlockId = template.settings.templateBlocks[activeSection]?.id;
    const currentWitnesses = getCurrentWitnesses();
    if (currentWitnesses.length < 10) {
      setData("answers", {
        ...data.answers,
        witnesses: [
          ...(data.answers.witnesses || []),
          {
            type: 'image',
            label: `الشاهد ${currentWitnesses.length + 1}`,
            blockId: currentBlockId,
            required: false
          }
        ]
      });
    }
  };

  // حذف صورة شاهد
  const handleRemoveWitness = (label) => {
    setData("answers", { ...data.answers, [label]: null });
  };

  const handleChange = (field, value) => {
    setData("answers", { ...data.answers, [field]: value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    Object.keys(data.answers).forEach(key => {
      formData.append(`answers[${key}]`, data.answers[key]);
    });

    post(route('user.templates.submit', template.id), {
      data: formData,
      onSuccess: () => {
        setShowPreview(true);
      },
      onError: (err) => {
        console.error('Submission errors:', err);
      },
      forceFormData: true,
    });
  };

  const totalSections = template?.settings?.templateBlocks?.length || 0;

  const handleDelete = () => {
    if (report && confirm('هل أنت متأكد من حذف هذا التقرير؟')) {
      router.delete(route('user.reports.destroy', report.id));
    }
  };

  return (
    <DashboardLayout>
      <Head title={template.title} />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">{template.title}</h2>
        <p className="text-gray-600">يرجى تعبئة جميع الحقول المطلوبة ثم اضغط معاينة لرؤية النتيجة قبل التصدير.</p>
      </div>
      <main className="max-w-5xl mx-auto">
        {errors && Object.keys(errors).length > 0 && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {Object.values(errors).map((error, idx) => (
              <p key={idx}>{error}</p>
            ))}
          </div>
        )}
        {!showPreview ? (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="flex border-b">
              {template?.settings?.templateBlocks?.map((block, idx) => (
                <button
                  key={idx}
                  className={`px-6 py-3 font-medium text-sm ${
                    activeSection === idx 
                      ? 'border-b-2 border-blue-600 text-blue-600 bg-blue-50' 
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                  onClick={() => setActiveSection(idx)}
                >
                  {block.label || `القسم ${idx + 1}`}
                </button>
              ))}
            </div>
            <form onSubmit={handlePreview} className="p-6" encType="multipart/form-data">
              <div className="mb-6">
                <h3 className="font-bold text-lg text-gray-800 mb-3 flex items-center">
                  <span className="w-8 h-8 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center ml-2">
                    {activeSection + 1}
                  </span>
                  {template.settings.templateBlocks[activeSection].label || `القسم ${activeSection + 1}`}
                </h3>
                {template.settings.templateBlocks[activeSection]?.fields?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {template.settings.templateBlocks[activeSection].fields.map((field, i) => (
                      <div key={i} className="mb-4">
                        <label className="block text-gray-700 mb-2 font-medium">
                          {field.label} {field.required && <span className="text-red-500">*</span>}
                        </label>
                        {field.type === "text" && (
                          <input
                            type="text"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.answers[field.label] || ""}
                            onChange={e => setData("answers", { ...data.answers, [field.label]: e.target.value })}
                            required={field.required}
                            placeholder={`أدخل ${field.label}`}
                          />
                        )}
                        {field.type === "number" && (
                          <input
                            type="number"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.answers[field.label] || ""}
                            onChange={e => setData("answers", { ...data.answers, [field.label]: e.target.value })}
                            required={field.required}
                            placeholder={`أدخل ${field.label}`}
                          />
                        )}
                        {field.type === "date" && (
                          <input
                            type="date"
                            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.answers[field.label] || ""}
                            onChange={e => setData("answers", { ...data.answers, [field.label]: e.target.value })}
                            required={field.required}
                          />
                        )}
                        {field.type === "checkbox" && (
                          <label className="flex items-center gap-3">
                            <div className="relative">
                              <input
                                type="checkbox"
                                className="sr-only"
                                checked={!!data.answers[field.label]}
                                onChange={e => setData("answers", { ...data.answers, [field.label]: e.target.checked })}
                                required={field.required}
                              />
                              <div className={`block w-14 h-7 rounded-full transition-all duration-300 ${
                                data.answers[field.label] 
                                  ? 'bg-blue-600' 
                                  : 'bg-gray-300'
                              }`}></div>
                              <div className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-all duration-300 ${
                                data.answers[field.label] 
                                  ? 'transform translate-x-7' 
                                  : ''
                              }`}></div>
                            </div>
                            <span>{field.label}</span>
                          </label>
                        )}
                        {field.type === "image" && (
                          <input
                            type="file"
                            accept="image/*"
                            onChange={e => setData("answers", { ...data.answers, [field.label]: e.target.files[0] })}
                            required={field.required}
                          />
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 text-gray-500">
                    لا توجد حقول في هذا القسم
                  </div>
                )}
              </div>
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div>
                  {activeSection > 0 && (
                    <button
                      type="button"
                      className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-lg font-medium"
                      onClick={() => setActiveSection(activeSection - 1)}
                    >
                      السابق
                    </button>
                  )}
                </div>
                <div className="flex gap-3">
                  {activeSection < totalSections - 1 ? (
                    <button
                      type="button"
                      className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center"
                      onClick={() => setActiveSection(activeSection + 1)}
                    >
                      التالي
                    </button>
                  ) : (
                    <button 
                      type="submit" 
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium flex items-center"
                      disabled={processing}
                    >
                      <span>معاينة التقرير</span>
                    </button>
                  )}
                </div>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">معاينة التقرير</h3>
                <div className="flex gap-2">
                  {report ? (
                    <>
                      <Link 
                        href={route('reports.export', { report: report.id, type: 'pdf' })} 
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow font-medium"
                        target="_blank"
                      >
                        PDF
                      </Link>
                      <Link 
                        href={route('reports.export', { report: report.id, type: 'png' })} 
                        className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded shadow font-medium"
                        target="_blank"
                      >
                        PNG
                      </Link>
                      <button onClick={() => setShowPreview(false)} className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded shadow font-medium">
                        تعديل
                      </button>
                      <button onClick={handleDelete} className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded shadow font-medium">
                        حذف
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSubmit}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow font-medium"
                        disabled={processing}
                      >
                        حفظ التقرير
                      </button>
                      <button onClick={() => setShowPreview(false)} className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-medium">
                        تعديل
                      </button>
                    </>
                  )}
                </div>
              </div>
              <FormPreview 
                template={template} 
                answers={report ? report.data : data.answers} 
                user={auth?.user || null} 
              />
            </div>
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}