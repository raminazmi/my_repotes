<!DOCTYPE html>
<html dir="rtl">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ $template->name ?? 'تقرير ديناميكي' }}</title>
    <link href="https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700&display=swap" rel="stylesheet">
    <style>
        body {
            font-family: 'Almarai', sans-serif;
            margin: 0;
            background: #f8fafc;
        }

        .block {
            margin-bottom: 32px;
        }

        .header,
        .footer {
            text-align: center;
        }

        .section {
            margin: 24px 0;
        }

        .label {
            font-weight: bold;
            color: #2A5C82;
        }

        .value {
            color: #374151;
        }

        .divider {
            border-top: 1px solid #e5e7eb;
            margin: 24px 0;
        }
    </style>
</head>

<body>
    <div class="container"
        style="max-width:900px;margin:40px auto;background:#fff;padding:32px;border-radius:16px;box-shadow:0 4px 12px rgba(0,0,0,0.08);">
        @foreach($template->blocks as $block)
        <div class="block {{ $block['type'] }}">
            @if($block['type'] === 'header')
            @php $selected = $data['header_option'] ?? 0; $option = $block['options'][$selected] ??
            $block['options'][0]; @endphp
            <div class="header">
                @foreach($option['fields'] as $field)
                <div>
                    <span class="label">{{ $field['label'] }}: </span>
                    <span class="value">
                        @if($field['type'] === 'image')
                        @if(!empty($data[$field['name']]))
                        <img src="{{ $data[$field['name']] }}" alt="{{ $field['label'] }}"
                            style="max-width:120px;max-height:120px;" />
                        @endif
                        @else
                        {{ $data[$field['name']] ?? '' }}
                        @endif
                    </span>
                </div>
                @endforeach
            </div>
            @elseif($block['type'] === 'footer')
            @php $selected = $data['footer_option'] ?? 0; $option = $block['options'][$selected] ??
            $block['options'][0]; @endphp
            <div class="footer">
                @foreach($option['fields'] as $field)
                <div>
                    <span class="label">{{ $field['label'] }}: </span>
                    <span class="value">
                        @if($field['type'] === 'image')
                        @if(!empty($data[$field['name']]))
                        <img src="{{ $data[$field['name']] }}" alt="{{ $field['label'] }}"
                            style="max-width:120px;max-height:120px;" />
                        @endif
                        @else
                        {{ $data[$field['name']] ?? '' }}
                        @endif
                    </span>
                </div>
                @endforeach
            </div>
            @else
            <div class="section">
                @if(!empty($block['label']))
                <div class="label" style="font-size:20px;margin-bottom:8px;">{{ $block['label'] }}</div>
                @endif
                @foreach($block['fields'] ?? [] as $field)
                <div>
                    <span class="label">{{ $field['label'] }}: </span>
                    <span class="value">
                        @if($field['type'] === 'image')
                        @if(!empty($data[$field['name']]))
                        <img src="{{ $data[$field['name']] }}" alt="{{ $field['label'] }}"
                            style="max-width:120px;max-height:120px;" />
                        @endif
                        @else
                        {{ $data[$field['name']] ?? '' }}
                        @endif
                    </span>
                </div>
                @endforeach
            </div>
            @endif
            <div class="divider"></div>
        </div>
        @endforeach
    </div>
</body>

</html>