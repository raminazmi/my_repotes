import DashboardLayout from '@/Layouts/DashboardLayout';
import { Head, Link } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { FaRegFileAlt, FaSearch, FaFilter, FaPlus } from "react-icons/fa";
import { useState, useEffect } from "react";

export default function FormsIndex({ initialForms, filters, total }) {
  const [search, setSearch] = useState(filters.search || "");
  const [type, setType] = useState(filters.type || "");
  const [status, setStatus] = useState(filters.status || "");
  const [currentPage, setCurrentPage] = useState(1);
  const [forms, setForms] = useState(initialForms || []);
  const [totalPages, setTotalPages] = useState(Math.ceil(total / 6));
  const [totalCount, setTotalCount] = useState(total);
  const [loading, setLoading] = useState(false);
  const itemsPerPage = 6;

  // جلب البيانات عبر API
  const fetchForms = async (params = {}) => {
    setLoading(true);
    const query = new URLSearchParams({
      search, type, status, page: currentPage, ...params
    }).toString();
    const res = await fetch(`/api/forms?${query}`);
    const data = await res.json();
    setForms(data.forms);
    setTotalPages(Math.ceil(data.total / itemsPerPage));
    setTotalCount(data.total);
    setLoading(false);
  };

  useEffect(() => {
    // لا تجلب من الـ API عند أول تحميل (إلا إذا تغير شيء)
    if (
      search !== (filters.search || "") ||
      type !== (filters.type || "") ||
      status !== (filters.status || "") ||
      currentPage !== 1
    ) {
      fetchForms();
    }
    // eslint-disable-next-line
  }, [search, type, status, currentPage]);

  const handleSearch = () => {
    setCurrentPage(1);
    fetchForms({ page: 1 });
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Pagination numbers to display
  const getPageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5;
    if (totalPages <= maxPagesToShow) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      let startPage = Math.max(1, currentPage - Math.floor(maxPagesToShow / 2));
      let endPage = startPage + maxPagesToShow - 1;
      if (endPage > totalPages) {
        endPage = totalPages;
        startPage = Math.max(1, endPage - maxPagesToShow + 1);
      }
      for (let i = startPage; i <= endPage; i++) {
        pages.push(i);
      }
    }
    return pages;
  };

  return (
    <DashboardLayout>
      <Head title="النماذج الجاهزة" />
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">النماذج الجاهزة</h2>
        <p className="text-gray-600">اختر من النماذج الجاهزة التي أعدها المشرف وأجب على الأسئلة المطلوبة.</p>
      </div>
      <main className="max-w-7xl mx-auto px-4">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6 border border-[#00BFAE]/20">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none text-gray-400">
                <FaSearch />
              </div>
              <input
                type="text"
                placeholder="ابحث عن نموذج..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-4 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-3">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaFilter className="text-sm" />
                </div>
                <select
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                  className="appearance-none w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>كل الأنواع</option>
                  <option value="report">تقرير</option>
                  <option value="survey">استطلاع</option>
                  <option value="assessment">تقييم</option>
                </select>
              </div>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
                  <FaFilter className="text-sm" />
                </div>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="appearance-none w-full pl-10 pr-10 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="" disabled>كل الحالات</option>
                  <option value="active">نشط</option>
                  <option value="inactive">غير نشط</option>
                </select>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {[...Array(itemsPerPage)].map((_, i) => (
              <div key={i} className="animate-pulse bg-gray-100 rounded-xl h-80 flex flex-col overflow-hidden">
                {/* صورة وهمية */}
                <div className="h-32 w-full bg-[#00BFAE]/20 mb-4 flex items-center justify-center">
                  <div className="w-12 h-12 rounded-full bg-[#009A8E]/20" />
                </div>
                <div className="flex-1 px-6">
                  <div className="h-4 w-32 bg-[#009A8E]/20 rounded mb-2" />
                  <div className="h-3 w-24 bg-gray-200 rounded mb-2" />
                  <div className="h-3 w-20 bg-gray-200 rounded mb-2" />
                </div>
                <div className="px-6 mt-auto pb-4">
                  <div className="h-10 w-full bg-green-200 rounded-lg" />
                </div>
              </div>
            ))}
          </div>
        ) : forms.length > 0 ? (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {forms.map(form => (
                <Card key={form.id} className="flex flex-col h-80 hover:shadow-lg transition-shadow border border-gray-100 rounded-xl overflow-hidden">
                  {/* صورة form */}
                  <div className="h-32 w-full bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center overflow-hidden">
                    {form.image ? (
                      <img src={form.image} alt={form.title} className="object-cover w-full h-full" />
                    ) : (
                      <FaRegFileAlt className="w-12 h-12 text-blue-400 opacity-60" />
                    )}
                  </div>
                  <CardHeader className="p-4 flex-1">
                    <CardTitle className="text-lg font-bold text-gray-800 mb-1 line-clamp-1">{form.title}</CardTitle>
                    <p className="text-gray-600 text-sm line-clamp-2 mb-2">{form.description}</p>
                    <div className="flex justify-between items-center mt-2">
                      <div className="flex items-center">
                        <span className={`w-2 h-2 rounded-full ml-2 ${form.is_active ? 'bg-green-500' : 'bg-gray-400'
                          }`}></span>
                        <span className="text-sm text-gray-600 capitalize">
                          {form.is_active ? 'نشط' : 'غير نشط'}
                        </span>
                      </div>
                      <span className="px-2.5 py-1 text-xs font-medium bg-[#00BFAE]/20 text-[#009A8E] rounded-full">
                        {form.type === 'report' ? 'تقرير' :
                          form.type === 'survey' ? 'استطلاع' :
                            form.type === 'assessment' ? 'تقييم' : form.type}
                      </span>
                    </div>
                  </CardHeader>
                  <div className="p-4 mt-auto">
                    <Link href={route('forms.show', form.id)} className="w-full block">
                      <Button className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 rounded-lg w-full font-medium shadow flex items-center justify-center">
                        <FaPlus className="ml-2 text-sm" /> ابدأ التقرير
                      </Button>
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
            {/* Pagination Controls */}
            <div className="flex flex-col md:flex-row justify-between items-center gap-4 mt-6 pt-6 border-t border-gray-200">
              <div className="text-sm text-gray-600">
                عرض <span className="font-medium">{(currentPage - 1) * itemsPerPage + 1}</span> إلى <span className="font-medium">
                  {Math.min(currentPage * itemsPerPage, totalCount)}
                </span> من أصل <span className="font-medium">{totalCount}</span> نتيجة
              </div>
              <div className="flex gap-1">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  السابق
                </Button>
                {getPageNumbers().map(page => (
                  <Button
                    key={page}
                    onClick={() => handlePageChange(page)}
                    className={`px-3 py-2 rounded-lg ${currentPage === page
                      ? 'bg-[#009A8E] text-white shadow'
                      : 'bg-white border border-gray-300 text-gray-700 hover:bg-gray-50'
                      }`}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                  className="bg-white border border-gray-300 text-gray-700 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50 disabled:opacity-50"
                >
                  التالي
                </Button>
              </div>
            </div>
          </>
        ) : (
          <Card className="text-center py-12 rounded-xl border border-gray-100 shadow-sm">
            <div className="mb-6">
              <div className="mx-auto mb-6 w-24 h-24 rounded-full bg-[#00BFAE]/10 flex items-center justify-center">
                <FaRegFileAlt className="w-12 h-12 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">
                لا توجد نماذج متاحة
              </h3>
              <p className="text-gray-600 mb-6 max-w-md mx-auto">
                لا توجد نماذج جاهزة متاحة لك حالياً. يمكنك المحاولة بتعديل معايير البحث أو الرجوع لاحقاً.
              </p>
              <Button
                onClick={() => {
                  window.location.href = '/forms';
                }}
                className="bg-[#009A8E] hover:bg-[#008B7A] text-white px-5 py-2.5 rounded-lg font-medium"
              >
                عرض جميع النماذج
              </Button>
            </div>
          </Card>
        )}
      </main>
    </DashboardLayout>
  );
} 