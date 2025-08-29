<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>استبيان أنماط التعلم</title>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap');

        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }

        body {
            font-family: 'Almarai', sans-serif;
            line-height: 1.6;
            color: #333;
            background: #fff;
            padding: 20px;
        }

        .container {
            max-width: 800px;
            margin: 0 auto;
            background: #fff;
            padding: 30px;
            border: 2px solid #1e40af;
            border-radius: 10px;
            box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
        }

        .header {
            text-align: center;
            margin-bottom: 30px;
            border-bottom: 3px solid #1e40af;
            padding-bottom: 20px;
        }

        .logo {
            width: 80px;
            height: 80px;
            margin: 0 auto 15px;
            background: #1e40af;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            color: white;
            font-size: 24px;
            font-weight: bold;
        }

        .title {
            font-size: 24px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
        }

        .subtitle {
            font-size: 16px;
            color: #666;
            margin-bottom: 5px;
        }

        .date {
            font-size: 14px;
            color: #888;
        }

        .section {
            margin-bottom: 25px;
        }

        .section-title {
            font-size: 18px;
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 15px;
            padding: 10px;
            background: #f3f4f6;
            border-right: 4px solid #1e40af;
            border-radius: 5px;
        }

        .field-group {
            margin-bottom: 15px;
        }

        .field-label {
            font-weight: bold;
            color: #374151;
            margin-bottom: 5px;
            display: block;
        }

        .field-value {
            padding: 8px 12px;
            border: 1px solid #d1d5db;
            border-radius: 5px;
            background: #f9fafb;
            min-height: 20px;
            margin-bottom: 10px;
        }

        .question {
            margin-bottom: 20px;
            padding: 15px;
            border: 1px solid #e5e7eb;
            border-radius: 8px;
            background: #fafafa;
        }

        .question-title {
            font-weight: bold;
            color: #1e40af;
            margin-bottom: 10px;
            font-size: 16px;
        }

        .option {
            display: flex;
            align-items: center;
            margin-bottom: 8px;
            padding: 8px;
            border-radius: 5px;
        }

        .option.selected {
            background: #dbeafe;
            border: 1px solid #3b82f6;
        }

        .checkbox-icon {
            width: 16px;
            height: 16px;
            border: 2px solid #3b82f6;
            border-radius: 3px;
            margin-left: 10px;
            position: relative;
        }

        .option.selected .checkbox-icon::after {
            content: '✓';
            position: absolute;
            top: -2px;
            left: 1px;
            color: #3b82f6;
            font-weight: bold;
            font-size: 12px;
        }

        .style-icon {
            width: 20px;
            height: 20px;
            margin-left: 8px;
            display: inline-block;
        }

        .visual {
            color: #3b82f6;
        }

        .auditory {
            color: #10b981;
        }

        .reading {
            color: #f59e0b;
        }

        .kinesthetic {
            color: #ef4444;
        }

        .results-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 20px 0;
        }

        .result-item {
            display: flex;
            align-items: center;
            padding: 10px;
            border: 1px solid #e5e7eb;
            border-radius: 5px;
            background: #f9fafb;
        }

        .signatures {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 30px;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
        }

        .signature-item {
            text-align: center;
        }

        .signature-line {
            border-bottom: 1px solid #000;
            height: 30px;
            margin-top: 10px;
        }

        .note {
            background: #fef3c7;
            border: 1px solid #f59e0b;
            border-radius: 5px;
            padding: 15px;
            margin: 20px 0;
            font-size: 14px;
            color: #92400e;
        }

        @media print {
            body {
                padding: 0;
            }

            .container {
                border: none;
                box-shadow: none;
            }
        }
    </style>
</head>

<body>
    <div class="container">
        <!-- Header -->
        <div class="header">
            <div class="logo">وزارة التعليم</div>
            <div class="title">استبيان أنماط التعلم</div>
            <div class="subtitle">الإدارة العامة للتعليم بالمنطقة الشمالية مكتب التعليم</div>
            <div class="date">١٤٤٦/١٢/١٢هـ</div>
        </div>

        <!-- Student Information -->
        <div class="section">
            <div class="section-title">معلومات الطالب</div>
            <div class="field-group">
                <label class="field-label">اسم المدرسة:</label>
                <div class="field-value">{{ $answers['اسم المدرسة'] ?? '________________' }}</div>
            </div>
            <div class="field-group">
                <label class="field-label">اسم الطالب/ة:</label>
                <div class="field-value">{{ $answers['اسم الطالب/ة'] ?? '________________' }}</div>
            </div>
            <div class="field-group">
                <label class="field-label">الاسم الأول:</label>
                <div class="field-value">{{ $answers['الاسم الأول'] ?? '________________' }}</div>
            </div>
            <div class="field-group">
                <label class="field-label">الصف / الفصل:</label>
                <div class="field-value">{{ $answers['الصف / الفصل'] ?? 'أول متوسط / 1' }}</div>
            </div>
        </div>

        <!-- Questions -->
        <div class="section">
            <div class="section-title">أسئلة الاستبيان</div>

            <!-- Question 1 -->
            <div class="question">
                <div class="question-title">السؤال الأول: عندما يتعلم شيئاً جديداً، كيف يستوعبه بشكل أفضل؟</div>
                <div class="option {{ isset($answers['من خلال رؤية صور توضيحية أو مقاطع فيديو']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    من خلال رؤية صور توضيحية أو مقاطع فيديو
                </div>
                <div class="option {{ isset($answers['من خلال الاستماع إلى الشرح']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    من خلال الاستماع إلى الشرح
                </div>
                <div class="option {{ isset($answers['من خلال قراءة التعليمات']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    من خلال قراءة التعليمات
                </div>
                <div class="option {{ isset($answers['من خلال التجربة العملية والممارسة']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    من خلال التجربة العملية والممارسة
                </div>
            </div>

            <!-- Question 2 -->
            <div class="question">
                <div class="question-title">السؤال الثاني: في وقت الفراغ، ما الذي يقوم به؟</div>
                <div class="option {{ isset($answers['مشاهدة الكتب المصورة أو الرسوم المتحركة']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    مشاهدة الكتب المصورة أو الرسوم المتحركة
                </div>
                <div class="option {{ isset($answers['الاستماع إلى القصص']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    الاستماع إلى القصص
                </div>
                <div class="option {{ isset($answers['القراءة أو كتابة القصص']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    القراءة أو كتابة القصص
                </div>
                <div class="option {{ isset($answers['اللعب الحركي أو صنع الأشياء بيديه']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    اللعب الحركي أو صنع الأشياء بيديه
                </div>
            </div>

            <!-- Question 3 -->
            <div class="question">
                <div class="question-title">السؤال الثالث: عندما يشرح معلومة أو قصة لكم، ماذا يفعل عادة؟</div>
                <div class="option {{ isset($answers['يستخدم عبارات مثل " انظر" أو "أرى" ويصف تفاصيل بصرية'])
                    ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    يستخدم عبارات مثل "انظر" أو "أرى" ويصف تفاصيل بصرية
                </div>
                <div class="option {{ isset($answers['يستخدم عبارات مثل " اسمع" أو "قال" ويهتم بنقل ما سمعه'])
                    ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    يستخدم عبارات مثل "اسمع" أو "قال" ويهتم بنقل ما سمعه
                </div>
                <div
                    class="option {{ isset($answers['يروي القصة بتسلسل منطقي ويهتم بالتفاصيل النصية']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    يروي القصة بتسلسل منطقي ويهتم بالتفاصيل النصية
                </div>
                <div class="option {{ isset($answers['يستخدم حركات اليدين ويتحرك أثناء الشرح']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    يستخدم حركات اليدين ويتحرك أثناء الشرح
                </div>
            </div>

            <!-- Question 4 -->
            <div class="question">
                <div class="question-title">السؤال الرابع: عندما يكون في غرفته، ما الذي تلاحظه عادة؟</div>
                <div
                    class="option {{ isset($answers['يهتم بترتيب ألعابه بطريقة جمالية أو حسب الألوان']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    يهتم بترتيب ألعابه بطريقة جمالية أو حسب الألوان
                </div>
                <div class="option {{ isset($answers['يتحدث إلى نفسه أو ينشد أثناء اللعب']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    يتحدث إلى نفسه أو ينشد أثناء اللعب
                </div>
                <div class="option {{ isset($answers['لديه مجموعة من الكتب ويهتم بترتيبها']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    لديه مجموعة من الكتب ويهتم بترتيبها
                </div>
                <div
                    class="option {{ isset($answers['لا يستطيع البقاء ساكناً ويستخدم كل مساحة الغرفة للعب']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    لا يستطيع البقاء ساكناً ويستخدم كل مساحة الغرفة للعب
                </div>
            </div>

            <!-- Question 5 -->
            <div class="question">
                <div class="question-title">السؤال الخامس: ما الذي يشتت انتباهه أثناء الدراسة أو أداء الواجبات؟</div>
                <div class="option {{ isset($answers['الفوضى البصرية أو الحركة المرئية من حوله']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    الفوضى البصرية أو الحركة المرئية من حوله
                </div>
                <div class="option {{ isset($answers['الضوضاء والأصوات']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    الضوضاء والأصوات
                </div>
                <div class="option {{ isset($answers['عدم وضوح التعليمات المكتوبة']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    عدم وضوح التعليمات المكتوبة
                </div>
                <div class="option {{ isset($answers['الجلوس لفترة طويلة دون حركة']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    الجلوس لفترة طويلة دون حركة
                </div>
            </div>

            <!-- Question 6 -->
            <div class="question">
                <div class="question-title">السؤال السادس: عندما يريد التعبير عن فكرة جديدة، ماذا يفعل غالباً؟</div>
                <div class="option {{ isset($answers['يرسم أو يخطط لها']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon visual">👁️</span>
                    يرسم أو يخطط لها
                </div>
                <div class="option {{ isset($answers['يتحدث عنها كثيراً']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon auditory">👂</span>
                    يتحدث عنها كثيراً
                </div>
                <div class="option {{ isset($answers['يكتب عنها أو يقرأ عن مواضيع مشابهة']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon reading">📖</span>
                    يكتب عنها أو يقرأ عن مواضيع مشابهة
                </div>
                <div class="option {{ isset($answers['يصنع نموذجاً أو يجرب تنفيذها عملياً']) ? 'selected' : '' }}">
                    <div class="checkbox-icon"></div>
                    <span class="style-icon kinesthetic">✋</span>
                    يصنع نموذجاً أو يجرب تنفيذها عملياً
                </div>
            </div>
        </div>

        <!-- Results Analysis -->
        <div class="section">
            <div class="section-title">تحليل النتائج بحساب عدد الإجابات لكل نمط (يعبأ من قبل المعلم):</div>
            <div class="results-grid">
                <div class="result-item">
                    <span class="style-icon visual">👁️</span>
                    <strong>إجابات البصري:</strong> {{ $answers['إجابات البصري'] ?? '___' }}
                </div>
                <div class="result-item">
                    <span class="style-icon auditory">👂</span>
                    <strong>إجابات السمعي:</strong> {{ $answers['إجابات السمعي'] ?? '___' }}
                </div>
                <div class="result-item">
                    <span class="style-icon reading">📖</span>
                    <strong>إجابات (قراءة/كتابة):</strong> {{ $answers['إجابات (قراءة/كتابة)'] ?? '___' }}
                </div>
                <div class="result-item">
                    <span class="style-icon kinesthetic">✋</span>
                    <strong>إجابات الحركي:</strong> {{ $answers['إجابات الحركي'] ?? '___' }}
                </div>
            </div>
            <div class="field-group">
                <label class="field-label">نمط التعلم المناسب هو:</label>
                <div class="field-value">{{ $answers['نمط التعلم المناسب هو'] ?? '________________' }}</div>
            </div>
            <div class="note">
                <strong>ملاحظة:</strong> معظم الأطفال يتعلمون بأكثر من نمط واحد، لذا فإن وجود إجابات موزعة على عدة أنماط
                أمر طبيعي
            </div>
        </div>

        <!-- Signatures -->
        <div class="signatures">
            <div class="signature-item">
                <div class="field-label">أ/ اسم المعلم</div>
                <div class="field-value">{{ $answers['أ/ اسم المعلم'] ?? '________________' }}</div>
                <div class="signature-line"></div>
            </div>
            <div class="signature-item">
                <div class="field-label">توقيع ولي الأمر</div>
                <div class="field-value">{{ $answers['توقيع ولي الأمر'] ?? '________________' }}</div>
                <div class="signature-line"></div>
            </div>
        </div>
    </div>
</body>

</html>