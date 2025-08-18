import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm, Link, router } from '@inertiajs/react';
import { useState, useEffect } from "react";
import FormPreview from '@/Pages/Dashboard/Forms/FormPreview';
import { FaSave, FaEdit, FaTrash, FaFilePdf, FaFileImage, FaArrowRight } from 'react-icons/fa';

function ConfirmDeleteDialog({ open, onConfirm, onCancel }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center border border-gray-200">
        <div className="mb-4 flex flex-col items-center">
          <div className="bg-red-100 text-red-600 rounded-full p-3 mb-2">
            <FaTrash className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold mb-2">تأكيد الحذف</h2>
          <p className="text-gray-700 mb-4">هل أنت متأكد أنك تريد حذف هذا التقرير؟ لا يمكن التراجع عن هذه العملية.</p>
        </div>
        <div className="flex justify-center gap-4 mt-4">
          <button
            onClick={onCancel}
            className="px-5 py-2 rounded-lg bg-gray-100 text-gray-700 font-medium hover:bg-gray-200"
          >إلغاء</button>
          <button
            onClick={onConfirm}
            className="px-5 py-2 rounded-lg bg-red-600 text-white font-medium hover:bg-red-700 shadow"
          >نعم، حذف</button>
        </div>
      </div>
    </div>
  );
}

export default function TemplateShow({ template, auth, report }) {
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
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [witnessFields, setWitnessFields] = useState([]);

  // استخراج حقول الشواهد من القالب عند التحميل
  useEffect(() => {
    const fields = [];
    template?.settings?.templateBlocks?.forEach(block => {
      block.fields?.forEach(field => {
        if (field.type === 'image') {
          fields.push({
            ...field,
            blockId: block.id
          });
        }
      });
    });
    setWitnessFields(fields);
  }, [template]);

  // بعد useEffect الخاص باستخراج الشواهد:ِ
  useEffect(() => {
    // إضافة شاهدين افتراضيًا إذا لم يوجد شواهد في القسم الحالي
    const currentBlockId = template.settings.templateBlocks[activeSection]?.id;
    const currentWitnesses = witnessFields.filter(field => field.blockId === currentBlockId);
    if (isWitnessSection() && currentWitnesses.length === 0) {
      setWitnessFields(prev => ([
        ...prev,
        {
          type: 'image',
          label: 'الشاهد 1',
          blockId: currentBlockId,
          required: false
        },
        {
          type: 'image',
          label: 'الشاهد 2',
          blockId: currentBlockId,
          required: false
        }
      ]));
    }
    // eslint-disable-next-line
  }, [activeSection, template]);

  const handleChange = (field, value) => {
    setData("answers", { ...data.answers, [field]: value });
  };

  const handlePreview = (e) => {
    e.preventDefault();
    setShowPreview(true);
  };

  const handleSave = () => {
    const formData = new FormData();
    Object.keys(data.answers).forEach(key => {
      formData.append(`answers[${key}]`, data.answers[key]);
    });
    
    post(route('user.templates.submit', template.id), {
      data: formData,
      onSuccess: () => {
        window.location.reload();
      },
      onError: (errors) => {
        console.error('Submission errors:', errors);
      },
      forceFormData: true,
    });
  };

  const handleDelete = () => {
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    setShowDeleteDialog(false);
    if (report) {
      router.delete(route('user.reports.destroy', report.id), {
        onSuccess: () => {
          router.visit(route('user.templates.index'));
        }
      });
    }
  };

  const totalSections = template?.settings?.templateBlocks?.length || 0;

  // الحصول على الشواهد الخاصة بالقسم الحالي فقط
  const getCurrentWitnesses = () => {
    const currentBlockId = template.settings.templateBlocks[activeSection]?.id;
    return witnessFields.filter(field => field.blockId === currentBlockId);
  };

  // التحقق مما إذا كان القسم الحالي هو قسم الشواهد
  const isWitnessSection = () => {
    const sectionLabel = template.settings.templateBlocks[activeSection]?.label || '';
    return sectionLabel.includes('شواهد') || sectionLabel.includes('صور');
  };

  return (
    <DashboardLayout>
      <Head title={template.title} />
      <ConfirmDeleteDialog open={showDeleteDialog} onConfirm={confirmDelete} onCancel={() => setShowDeleteDialog(false)} />
      <div className="mb-6 flex justify-between items-center">
        <div>
          <Link href={route('user.templates.index')} className="inline-flex items-center text-blue-600 hover:text-blue-800">
            <FaArrowRight className="me-2" /> العودة إلى القائمة
          </Link>
          <h2 className="text-3xl font-bold text-gray-800 mt-2 mb-1">{template.title}</h2>
          <p className="text-gray-600 max-w-2xl">يرجى تعبئة جميع الحقول المطلوبة ثم اضغط معاينة لرؤية النتيجة قبل التصدير.</p>
        </div>
      </div>
      
      <main className="max-w-5xl mx-auto">
        {errors && Object.keys(errors).length > 0 && (
          <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
            <div className="font-bold">حدثت الأخطاء التالية:</div>
            <ul className="list-disc pl-5 mt-2">
              {Object.values(errors).map((error, idx) => (
                <li key={idx}>{error}</li>
              ))}
            </ul>
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
                    {template.settings.templateBlocks[activeSection].fields.map((field, i) => {
                      // إذا كان القسم الحالي هو قسم الشواهد، نعرض كل الحقول بما فيها الصور
                      if (isWitnessSection()) {
                        // ملاحظة للمستخدم حول اختيار عدد الصور
                        if (i === 0) {
                          return (
                            <>
                              {/* عرض حقل الصورة */}
                              {field.type === 'image' ? (
                                <div className="mb-4">
                                
                                  <label className="block text-gray-700 mb-2 font-medium">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                  </label>
                                  <div className="relative">
                                    <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                      {data.answers[field.label] ? (
                                        <img 
                                          src={typeof data.answers[field.label] === 'string' 
                                            ? data.answers[field.label] 
                                            : URL.createObjectURL(data.answers[field.label])}
                                          alt={field.label} 
                                          className="w-full h-full object-cover rounded-lg"
                                        />
                                      ) : (
                                        <>
                                          <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                          </svg>
                                          <p className="text-sm text-gray-500 text-center px-2">
                                            <span className="font-semibold">انقر للرفع</span> أو اسحب الصورة هنا
                                          </p>
                                        </>
                                      )}
                                      <input
                                        type="file"
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={e => handleChange(field.label, e.target.files[0])}
                                      />
                                    </label>
                                                                  <div className="mt-4  p-3 bg-yellow-50 border-l-4 border-yellow-400 text-yellow-800 rounded">
                                <span>يمكنك اختيار عدد الشواهد (الصور) التي ترغب في رفعها، وليس من الضروري رفع جميع الصور.</span>
                              </div>
                                    {data.answers[field.label] && (
                                      <button
                                        type="button"
                                        className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                                        onClick={() => handleChange(field.label, null)}
                                      >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                        </svg>
                                      </button>
                                    )}
                                  </div>
                                </div>
                              ) : (
                                // عرض الحقول الأخرى في قسم الشواهد
                                <div className="mb-4">
                                  <label className="block text-gray-700 mb-2 font-medium">
                                    {field.label} {field.required && <span className="text-red-500">*</span>}
                                  </label>
                                  
                                  {field.type === "text" && (
                                    <input
                                      type="text"
                                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      value={data.answers[field.label] || ""}
                                      onChange={e => handleChange(field.label, e.target.value)}
                                      required={field.required}
                                      placeholder={`أدخل ${field.label}`}
                                    />
                                  )}
                                  
                                  {field.type === "date" && (
                                    <input
                                      type="date"
                                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                      value={data.answers[field.label] || ""}
                                      onChange={e => handleChange(field.label, e.target.value)}
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
                                          onChange={e => handleChange(field.label, e.target.checked)}
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
                                </div>
                              )}
                            </>
                          );
                        }
                        // عرض حقل الصورة بشكل خاص في قسم الشواهد (لبقية الشواهد)
                        if (field.type === 'image') {
                          return (
                            <div key={i} className="mb-4">
                              <label className="block text-gray-700 mb-2 font-medium">
                                {field.label} {field.required && <span className="text-red-500">*</span>}
                              </label>
                              <div className="relative">
                                <label className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                                  {data.answers[field.label] ? (
                                    <img 
                                      src={typeof data.answers[field.label] === 'string' 
                                        ? data.answers[field.label] 
                                        : URL.createObjectURL(data.answers[field.label])}
                                      alt={field.label} 
                                      className="w-full h-full object-cover rounded-lg"
                                    />
                                  ) : (
                                    <>
                                      <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                                      </svg>
                                      <p className="text-sm text-gray-500 text-center px-2">
                                        <span className="font-semibold">انقر للرفع</span> أو اسحب الصورة هنا
                                      </p>
                                    </>
                                  )}
                                  <input
                                    type="file"
                                    className="hidden" 
                                    accept="image/*"
                                    onChange={e => handleChange(field.label, e.target.files[0])}
                                  />
                                </label>
                                {data.answers[field.label] && (
                                  <button
                                    type="button"
                                    className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-1.5 hover:bg-red-600"
                                    onClick={() => handleChange(field.label, null)}
                                  >
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                    </svg>
                                  </button>
                                )}
                              </div>
                            </div>
                          );
                        }
                        // عرض الحقول الأخرى في قسم الشواهد
                        return (
                          <div key={i} className="mb-4">
                            <label className="block text-gray-700 mb-2 font-medium">
                              {field.label} {field.required && <span className="text-red-500">*</span>}
                            </label>
                            
                            {field.type === "text" && (
                              <input
                                type="text"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={data.answers[field.label] || ""}
                                onChange={e => handleChange(field.label, e.target.value)}
                                required={field.required}
                                placeholder={`أدخل ${field.label}`}
                              />
                            )}
                            
                            {field.type === "date" && (
                              <input
                                type="date"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                                value={data.answers[field.label] || ""}
                                onChange={e => handleChange(field.label, e.target.value)}
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
                                    onChange={e => handleChange(field.label, e.target.checked)}
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
                          </div>
                        );
                      }
                      
                      // إذا لم يكن قسم الشواهد، نتجاهل حقول الصور ونعرض الباقي
                      if (field.type === 'image') return null;
                      
                      return (
                        <div key={i} className="mb-4">
                          <label className="block text-gray-700 mb-2 font-medium">
                            {field.label} {field.required && <span className="text-red-500">*</span>}
                          </label>
                          
                          {field.type === "text" && (
                            <input
                              type="text"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={data.answers[field.label] || ""}
                              onChange={e => handleChange(field.label, e.target.value)}
                              required={field.required}
                              placeholder={`أدخل ${field.label}`}
                            />
                          )}
                          
                          {field.type === "date" && (
                            <input
                              type="date"
                              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              value={data.answers[field.label] || ""}
                              onChange={e => handleChange(field.label, e.target.value)}
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
                                  onChange={e => handleChange(field.label, e.target.checked)}
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
                        </div>
                      );
                    })}
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
                        <FaFilePdf />
                      </Link>
                      <Link 
                        href={route('reports.export', { report: report.id, type: 'png' })} 
                        className="flex items-center gap-1 bg-purple-600 hover:bg-purple-700 text-white px-3 py-2 rounded shadow font-medium"
                        target="_blank"
                      >
                        <FaFileImage />
                      </Link>
                      <button 
                        onClick={() => setShowPreview(false)} 
                        className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded shadow font-medium"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow font-medium"
                        disabled={processing}
                      >
                        <FaSave />
                      </button>
                      <button 
                        onClick={handleDelete} 
                        className="flex items-center gap-1 bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded shadow font-medium"
                      >
                        <FaTrash />
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={handleSave}
                        className="flex items-center gap-1 bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded shadow font-medium"
                        disabled={processing}
                      >
                        <FaSave /> حفظ التقرير
                      </button>
                      <button 
                        onClick={() => setShowPreview(false)} 
                        className="flex items-center gap-1 bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded shadow font-medium"
                      >
                        <FaEdit /> تعديل
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