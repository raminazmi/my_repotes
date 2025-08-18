<?php

namespace Database\Seeders;

use App\Models\Form;
use Illuminate\Database\Seeder;

class FormSeeder extends Seeder
{
    public function run(): void
    {
        // فقط نموذج تنفيذ استراتيجية مختصرة
        Form::updateOrCreate(
            ['template' => 'strategy_brief'],
            [
                'title' => 'نموذج تنفيذ استراتيجية مختصرة',
                'description' => 'نموذج لتنفيذ استراتيجية مختصرة',
                'type' => 'report',
                'template' => 'strategy_brief',
                'settings' => json_encode([
                    'templateBlocks' => [
                        [
                            'type' => 'header',
                            'label' => 'معلومات المدرسة',
                            'fields' => [
                                ['label' => 'اسم المدرسة', 'type' => 'text', 'required' => true],
                                ['label' => 'تاريخ التنفيذ', 'type' => 'date', 'required' => true],
                                ['label' => 'المادة', 'type' => 'text', 'required' => true],
                                ['label' => 'استراتيجية التعلم', 'type' => 'text', 'required' => true],
                                ['label' => 'عدد المستفيدين', 'type' => 'text', 'required' => false],
                                ['label' => 'المرحلة الدراسية', 'type' => 'text', 'required' => true],
                                ['label' => 'الفصل', 'type' => 'text', 'required' => false],
                                ['label' => 'اسم الدرس', 'type' => 'text', 'required' => true],
                            ],
                        ],
                        [
                            'type' => 'section',
                            'label' => 'الأهداف',
                            'fields' => [
                                ['label' => 'الهدف الأول', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الثاني', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الثالث', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الرابع', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الخامس', 'type' => 'text', 'required' => false],
                            ],
                        ],
                        [
                            'type' => 'section',
                            'label' => 'بيانات المعلم والإدارة',
                            'fields' => [
                                ['label' => 'اسم المعلم', 'type' => 'text', 'required' => true],
                                ['label' => 'اسم مدير المدرسة', 'type' => 'text', 'required' => true],
                                ['label' => 'حساب تويتر', 'type' => 'text', 'required' => false],
                            ],
                        ],
                        [
                            'type' => 'section',
                            'label' => 'الوسائل التعليمية المستخدمة',
                            'fields' => [
                                ['label' => 'جهاز عرض', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'جهاز الحاسب', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'صور توضيحية', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'أدوات رياضية', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'كتاب', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'سبورة تقليدية', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'سبورة ذكية', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'بطاقات تعليمية', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'أوراق عمل', 'type' => 'checkbox', 'required' => false],
                                ['label' => 'عرض تقديمي', 'type' => 'checkbox', 'required' => false],
                            ],
                        ],
                        [
                            'type' => 'images',
                            'label' => 'صور الشواهد',
                            'fields' => [
                                ['label' => 'الشاهد الأول', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثاني', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثالث', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الرابع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الخامس', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد السادس', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد السابع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثامن', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد التاسع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد العاشر', 'type' => 'image', 'required' => false],
                            ],
                        ],
                    ],
                ]),
                'is_active' => true,
                'user_id' => 1,
                'is_template' => true,
                'image' => '/assets/StrategyBriefPreview.jpg', // أضف هذا السطر
            ]
        );

        // قالب تقرير تنفيذ برنامج (تغطية) 4 شواهد
        Form::updateOrCreate(
            ['template' => 'report_moe_3'],
            [
                'title' => 'تقرير تنفيذ برنامج (تغطية) 4 شواهد',
                'description' => 'نموذج لتوثيق تنفيذ برنامج مع 4 شواهد',
                'type' => 'report',
                'template' => 'report_moe_3',
                'settings' => json_encode([
                    'templateBlocks' => [
                        [
                            'type' => 'header',
                            'label' => 'معلومات المدرسة',
                            'fields' => [
                                ['label' => 'اسم المدرسة', 'type' => 'text', 'required' => true],
                                ['label' => 'اسم البرنامج', 'type' => 'text', 'required' => true],
                                ['label' => 'اسم منفذ البرنامج أو المنفذين', 'type' => 'text', 'required' => true],
                                ['label' => 'مكان التنفيذ', 'type' => 'text', 'required' => true],
                                ['label' => 'المستهدفون', 'type' => 'text', 'required' => true],
                                ['label' => 'عدد المستهدفين', 'type' => 'text', 'required' => true],
                                ['label' => 'تاريخ التنفيذ', 'type' => 'date', 'required' => true],
                                ['label' => 'حساب تويتر', 'type' => 'text', 'required' => false],
                            ],
                        ],
                        [
                            'type' => 'section',
                            'label' => 'الأهداف',
                            'fields' => [
                                ['label' => 'الهدف الأول', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الثاني', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الثالث', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الرابع', 'type' => 'text', 'required' => false],
                                ['label' => 'الهدف الخامس', 'type' => 'text', 'required' => false],
                            ],
                        ],
                        [
                            'type' => 'images',
                            'label' => 'الشواهد',
                            'fields' => [
                                ['label' => 'الشاهد الأول', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثاني', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثالث', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الرابع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الخامس', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد السادس', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد السابع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد الثامن', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد التاسع', 'type' => 'image', 'required' => false],
                                ['label' => 'الشاهد العاشر', 'type' => 'image', 'required' => false],
                            ],
                        ],
                    ],
                ]),
                'is_active' => true,
                'user_id' => 1,
                'is_template' => true,
            ]
        );
    }
}
