<!DOCTYPE html>
<html lang="ar" dir="rtl">

<head>
    <meta charset="UTF-8">
    <title>{{ $form->title ?? 'تقرير' }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Almarai', sans-serif;
            background: #f5f7fa;
            color: #333;
        }

        .header-section {
            text-align: center;
            padding: 24px;
            background: linear-gradient(to right, #2A5C82, #3A8BCD);
            color: #fff;
            border-radius: 8px 8px 0 0;
            position: relative;
            overflow: hidden;
        }

        .header-section::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
            background-size: 10px 10px;
            opacity: 0.5;
        }

        .section-block {
            background: white;
            border-radius: 8px;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
            margin-bottom: 24px;
            padding: 20px;
            border-left: 4px solid #3A8BCD;
        }

        .section-title {
            color: #3A8BCD;
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 16px;
            padding-bottom: 8px;
            border-bottom: 1px solid #eaeaea;
        }

        .field-item {
            margin-bottom: 16px;
        }

        .field-label {
            color: #2A5C82;
            font-weight: bold;
            margin-bottom: 6px;
            display: block;
        }

        .field-value {
            color: #000;
            border: 1px solid #3A8BCD;
            border-radius: 8px;
            padding: 10px;
            text-align: center;
            background: #f9fbfd;
        }

        .images-container {
            display: flex;
            gap: 24px;
            flex-wrap: wrap;
            margin-top: 12px;
        }

        .image-placeholder {
            width: 140px;
            height: 140px;
            background: #f0f0f0;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 1px solid #3A8BCD;
            border-radius: 6px;
            color: #666;
            font-size: 16px;
            position: relative;
            overflow: hidden;
        }

        .image-placeholder img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }
    </style>
</head>

<body>
    <div class="header-section">
        <h1>{{ $form->title ?? 'تقرير' }}</h1>
    </div>
    <div class="section-block">
        <div class="section-title">البيانات المدخلة</div>
        <table style="width:100%; border-collapse:collapse;">
            <tbody>
                @foreach($answers as $key => $value)
                <tr>
                    <td class="field-label" style="border:1px solid #eaeaea; padding:8px;">{{ $key }}</td>
                    <td class="field-value" style="border:1px solid #eaeaea; padding:8px;">
                        @if(is_string($value) && (str_ends_with($value, '.jpg') || str_ends_with($value, '.jpeg') ||
                        str_ends_with($value, '.png') || str_ends_with($value, '.webp')))
                        <img src="{{ asset('storage/' . $value) }}" alt="{{ $key }}"
                            style="max-width:120px; max-height:120px; border-radius:8px;" />
                        @elseif(is_bool($value))
                        {{ $value ? '✔️' : '❌' }}
                        @else
                        {{ is_array($value) ? json_encode($value, JSON_UNESCAPED_UNICODE) : $value }}
                        @endif
                    </td>
                </tr>
                @endforeach
            </tbody>
        </table>
    </div>
</body>

</html>