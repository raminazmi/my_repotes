import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, useForm } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/Components/ui/select";
import { Switch } from "@/Components/ui/switch";
import { FaRegFileAlt, FaUsers, FaChartBar } from "react-icons/fa";
import { Link } from "@inertiajs/react";
import TemplateBuilder from './TemplateBuilder';
import React from 'react';

export default function EditForm({ form }) {
  const { data, setData, put, processing, errors } = useForm({
    title: form.title,
    description: form.description || '',
    type: form.type,
    template: form.template,
    settings: form.settings || {},
    is_active: form.is_active,
  });

  const [templateBlocks, setTemplateBlocks] = React.useState(data.settings?.templateBlocks || []);

  const handleSubmit = (e) => {
    e.preventDefault();
    put(route('forms.update', form.id));
  };

  const formTypes = [
    { value: 'report', label: 'تقرير', icon: <FaRegFileAlt className="w-4 h-4" /> },
    { value: 'survey', label: 'استطلاع', icon: <FaUsers className="w-4 h-4" /> },
    { value: 'assessment', label: 'تقييم', icon: <FaChartBar className="w-4 h-4" /> },
  ];

  const templates = [
    { value: 'basic_report', label: 'تقرير أساسي' },
    { value: 'detailed_report', label: 'تقرير مفصل' },
    { value: 'student_assessment', label: 'تقييم الطلاب' },
    { value: 'teacher_feedback', label: 'تقييم المعلمين' },
    { value: 'parent_survey', label: 'استطلاع أولياء الأمور' },
  ];

  return (
    <DashboardLayout>
      <Head title={`تعديل ${form.title}`} />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">تعديل النموذج</h2>
        <p className="text-gray-600">قم بتعديل بيانات النموذج الحالي.</p>
      </div>
      <main className="max-w-4xl mx-auto px-6 py-8">
        <Card className="shadow-xl border border-[#00BFAE]/20">
          <CardHeader className="bg-gradient-to-r from-[#00BFAE] to-[#009A8E] text-white rounded-t-lg">
            <CardTitle className="text-center text-xl">تعديل النموذج</CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">المعلومات الأساسية</h3>

                <div className="space-y-2">
                  <Label htmlFor="title" className="text-gray-700 font-medium">عنوان النموذج</Label>
                  <Input
                    id="title"
                    type="text"
                    placeholder="مثال: تقرير تقييم الطلاب للفصل الأول"
                    value={data.title}
                    onChange={(e) => setData('title', e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                    required
                  />
                  {errors.title && (
                    <div className="text-red-500 text-sm">{errors.title}</div>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description" className="text-gray-700 font-medium">وصف النموذج</Label>
                  <Textarea
                    id="description"
                    placeholder="وصف مختصر للنموذج وأهدافه"
                    value={data.description}
                    onChange={(e) => setData('description', e.target.value)}
                    className="border-gray-300 focus:border-blue-500"
                    rows={3}
                  />
                  {errors.description && (
                    <div className="text-red-500 text-sm">{errors.description}</div>
                  )}
                </div>
              </div>

              {/* Form Type */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">نوع النموذج</h3>

                <div className="grid md:grid-cols-3 gap-4">
                  {formTypes.map((type) => (
                    <div
                      key={type.value}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${data.type === type.value
                        ? 'border-[#009A8E] bg-[#00BFAE]/10'
                        : 'border-gray-200 hover:border-gray-300'
                        }`}
                      onClick={() => setData('type', type.value)}
                    >
                      <div className="flex items-center gap-3">
                        <div className="text-[#00BFAE]">{type.icon}</div>
                        <div>
                          <h4 className="font-medium text-gray-800">{type.label}</h4>
                          <p className="text-sm text-gray-600">
                            {type.value === 'report' && 'لإنشاء التقارير التعليمية'}
                            {type.value === 'survey' && 'لجمع آراء وملاحظات'}
                            {type.value === 'assessment' && 'لتقييم الأداء والتحصيل'}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {errors.type && (
                  <div className="text-red-500 text-sm">{errors.type}</div>
                )}
              </div>

              {/* Template Selection */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">اختيار القالب</h3>
                <div className="space-y-2">
                  <Label htmlFor="template" className="text-gray-700 font-medium">نوع القالب</Label>
                  <Select value={data.template} onValueChange={(value) => setData('template', value)}>
                    <SelectTrigger className="border-gray-300 focus:border-blue-500">
                      <SelectValue placeholder="اختر قالب النموذج" />
                    </SelectTrigger>
                    <SelectContent>
                      {templates.map((template) => (
                        <SelectItem key={template.value} value={template.value}>
                          {template.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.template && (
                    <div className="text-red-500 text-sm">{errors.template}</div>
                  )}
                </div>
                {/* TemplateBuilder يظهر فقط بعد اختيار القالب */}
                {data.template && (
                  <div className="mt-6">
                    <TemplateBuilder value={templateBlocks} onChange={(blocks) => {
                      setTemplateBlocks(blocks);
                      setData('settings', { ...data.settings, templateBlocks: blocks });
                    }} />
                  </div>
                )}
              </div>

              {/* Form Status */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">حالة النموذج</h3>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <h4 className="font-medium text-gray-800">تفعيل النموذج</h4>
                    <p className="text-sm text-gray-600">السماح بالردود على النموذج</p>
                  </div>
                  <Switch
                    checked={data.is_active}
                    onCheckedChange={(checked) => setData('is_active', checked)}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex items-center justify-end gap-4 pt-6 border-t">
                <Link href={route('forms.show', form.id)}>
                  <Button variant="outline" type="button">
                    إلغاء
                  </Button>
                </Link>
                <Button
                  type="submit"
                  className="bg-gradient-to-r from-[#00BFAE] to-[#009A8E] hover:from-[#37a299] hover:to-[#23bbae]"
                  disabled={processing}
                >
                  {processing ? "جاري التحديث..." : "تحديث النموذج"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </main>
    </DashboardLayout>
  );
} 