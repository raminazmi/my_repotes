# EduForms - منصة النماذج التعليمية

## نظرة عامة

EduForms هي منصة متكاملة لإنشاء وإدارة النماذج والتقارير التعليمية. تم تطويرها باستخدام Laravel و React مع Inertia.js لتوفير تجربة مستخدم سلسة ومتطورة.

## الميزات الرئيسية

### 🎯 للمعلمين والإداريين
- **إنشاء النماذج**: إنشاء نماذج تقارير مخصصة
- **إدارة الردود**: تتبع وإدارة الردود المستلمة
- **التقارير**: عرض إحصائيات مفصلة
- **التصدير**: تصدير البيانات بصيغ مختلفة

### 🎨 واجهة مستخدم متطورة
- **تصميم متجاوب**: يعمل على جميع الأجهزة
- **دعم اللغة العربية**: واجهة باللغة العربية بالكامل
- **تصميم عصري**: استخدام Tailwind CSS و Radix UI
- **تجربة مستخدم سلسة**: انتقالات سلسة وواجهة بديهية

### 🔧 التقنيات المستخدمة

#### Backend
- **Laravel 12**: إطار عمل PHP قوي
- **MySQL**: قاعدة بيانات علائقية
- **Inertia.js**: ربط Frontend مع Backend
- **Breeze**: نظام المصادقة

#### Frontend
- **React 18**: مكتبة واجهة المستخدم
- **Tailwind CSS**: إطار عمل CSS
- **Radix UI**: مكونات واجهة المستخدم
- **Lucide React**: أيقونات جميلة

## التثبيت والتشغيل

### المتطلبات
- PHP 8.2+
- Composer
- Node.js 18+
- MySQL 8.0+

### خطوات التثبيت

1. **استنساخ المشروع**
```bash
git clone <repository-url>
cd EduFormsBuilder
```

2. **تثبيت dependencies**
```bash
composer install
npm install
```

3. **إعداد البيئة**
```bash
cp .env.example .env
php artisan key:generate
```

4. **تكوين قاعدة البيانات**
```bash
# تحديث .env مع بيانات قاعدة البيانات
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=eduforms
DB_USERNAME=root
DB_PASSWORD=
```

5. **تشغيل الـ migrations**
```bash
php artisan migrate
```

6. **تشغيل التطبيق**
```bash
# Terminal 1 - Laravel
php artisan serve

# Terminal 2 - Vite
npm run dev
```

## هيكل المشروع

```
EduFormsBuilder/
├── app/
│   ├── Http/Controllers/
│   │   ├── Auth/
│   │   ├── DashboardController.php
│   │   └── FormController.php
│   ├── Models/
│   │   ├── User.php
│   │   ├── Form.php
│   │   └── FormResponse.php
│   └── Policies/
│       └── FormPolicy.php
├── database/migrations/
│   ├── create_users_table.php
│   ├── create_forms_table.php
│   └── create_form_responses_table.php
├── resources/js/
│   ├── Components/
│   │   ├── ui/
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── Pages/
│   │   ├── Dashboard/
│   │   ├── Landing/
│   │   └── Auth/
│   └── data/
│       ├── featuresData.jsx
│       ├── pricingData.jsx
│       └── valuesData.jsx
└── routes/
    ├── web.php
    └── auth.php
```

## الصفحات المتاحة

### صفحات Landing
- **الرئيسية** (`/`): صفحة الترحيب والميزات
- **الميزات** (`/features`): عرض ميزات المنصة
- **الأسعار** (`/pricing`): خطط الاشتراك
- **تواصل معنا** (`/contact`): معلومات التواصل
- **سياسة الخصوصية** (`/privacy`): سياسة الخصوصية

### صفحات المصادقة
- **تسجيل الدخول** (`/login`): تسجيل الدخول
- **إنشاء حساب** (`/register`): إنشاء حساب جديد

### صفحات Dashboard (تتطلب تسجيل الدخول)
- **لوحة التحكم** (`/dashboard`): الإحصائيات والنشاط
- **النماذج** (`/forms`): إدارة النماذج
- **إنشاء نموذج** (`/forms/create`): إنشاء نموذج جديد
- **عرض النموذج** (`/forms/{id}`): تفاصيل النموذج
- **تعديل النموذج** (`/forms/{id}/edit`): تعديل النموذج

## الميزات التقنية

### نظام المصادقة
- تسجيل دخول وإنشاء حساب
- إدارة الملف الشخصي
- حماية الصفحات

### إدارة النماذج
- إنشاء نماذج مخصصة
- أنواع مختلفة من النماذج (تقرير، استطلاع، تقييم)
- قوالب جاهزة
- إعدادات متقدمة

### نظام الردود
- جمع الردود من المستخدمين
- تخزين البيانات بصيغة JSON
- تتبع معلومات المستجيبين

### الإحصائيات والتقارير
- إحصائيات فورية
- رسوم بيانية تفاعلية
- تصدير البيانات

## التخصيص والتطوير

### إضافة مكونات جديدة
```jsx
// مثال: إنشاء مكون جديد
import { Card, CardContent, CardHeader, CardTitle } from "@/Components/ui/card";

export default function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>عنوان المكون</CardTitle>
      </CardHeader>
      <CardContent>
        محتوى المكون
      </CardContent>
    </Card>
  );
}
```

### إضافة صفحات جديدة
```php
// في routes/web.php
Route::get('/my-page', function () {
    return Inertia::render('MyPage');
})->name('my-page');
```

### إضافة نماذج جديدة
```php
// إنشاء migration
php artisan make:migration create_my_table

// إنشاء Model
php artisan make:model MyModel

// إنشاء Controller
php artisan make:controller MyController
```

## المساهمة

1. Fork المشروع
2. إنشاء branch جديد (`git checkout -b feature/amazing-feature`)
3. Commit التغييرات (`git commit -m 'Add amazing feature'`)
4. Push إلى Branch (`git push origin feature/amazing-feature`)
5. فتح Pull Request

## الترخيص

هذا المشروع مرخص تحت رخصة MIT. راجع ملف `LICENSE` للتفاصيل.

## الدعم

للدعم التقني أو الاستفسارات:
- البريد الإلكتروني: support@eduforms.sa
- الهاتف: +966 11 123 4567

---

**EduForms** - صديق المعلم والإداري 🎓
