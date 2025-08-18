<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Report;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class TemplateUserController extends Controller
{
    public function index(Request $request)
    {
        $query = Form::where('is_template', true);

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        } else {
            $query->where('is_active', true);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $page = $request->input('page', 1);
        $perPage = 6; // نفس قيمة itemsPerPage في الواجهة
        $total = $query->count();
        $templates = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

        return Inertia::render('User/Templates/Index', [
            'initialTemplates' => $templates,
            'filters' => $request->only(['search', 'type', 'status']),
            'total' => $total,
        ]);
    }

    public function show(Form $template)
    {
        if (!$template->is_template) {
            abort(403, 'هذا النموذج ليس قالبًا جاهزًا.');
        }

        $report = $template->reports()->where('user_id', auth()->id())->latest()->first();

        // تصحيح: تحويل settings إلى array إذا لزم الأمر وضمان وجود templateBlocks
        $template->settings = json_decode($template->settings, true) ?? [];
        if (!isset($template->settings['templateBlocks']) || !is_array($template->settings['templateBlocks'])) {
            $template->settings['templateBlocks'] = [];
        }

        return Inertia::render('User/Templates/Show', [
            'template' => $template,
            'report' => $report,
            'auth' => ['user' => auth()->user()],
        ]);
    }

    public function submit(Request $request, Form $template)
    {
        if (!$template->is_template) {
            abort(403, 'هذا النموذج ليس قالبًا جاهزًا.');
        }

        // التحقق من الحقول المطلوبة
        $rules = [];
        $template->settings = json_decode($template->settings, true) ?? [];
        foreach ($template->settings['templateBlocks'] ?? [] as $block) {
            foreach ($block['fields'] ?? [] as $field) {
                if ($field['required']) {
                    $rules["answers.{$field['label']}"] = $field['type'] === 'image' ? 'required|image' : 'required';
                } else {
                    $rules["answers.{$field['label']}"] = $field['type'] === 'image' ? 'nullable|image' : 'nullable';
                }
            }
        }

        $data = $request->validate($rules);

        $answers = $data['answers'];

        // معالجة الصور
        foreach ($answers as $key => $value) {
            if ($request->hasFile("answers.$key")) {
                $file = $request->file("answers.$key");
                if ($file->isValid()) {
                    $path = $file->store('images', 'public');
                    $answers[$key] = $path;
                } else {
                    return back()->withErrors(['answers.' . $key => 'فشل رفع الصورة']);
                }
            }
        }

        $report = Report::create([
            'form_id' => $template->id,
            'user_id' => auth()->id(),
            'data' => $answers,
        ]);

        return redirect()->route('user.templates.show', $template->id)->with('success', 'تم إنشاء التقرير بنجاح');
    }

    public function destroy(Report $report)
    {
        if ($report->user_id !== auth()->id()) {
            abort(403, 'غير مصرح لك بحذف هذا التقرير.');
        }

        foreach ($report->data as $value) {
            if (is_string($value) && Storage::disk('public')->exists($value)) {
                Storage::disk('public')->delete($value);
            }
        }

        $report->delete();
        return back()->with('success', 'تم حذف التقرير بنجاح');
    }

    public function apiIndex(Request $request)
    {
        $query = Form::where('is_template', true);

        if ($request->filled('status')) {
            $query->where('is_active', $request->status === 'active');
        } else {
            $query->where('is_active', true);
        }

        if ($request->filled('search')) {
            $query->where(function ($q) use ($request) {
                $q->where('title', 'like', '%' . $request->search . '%')
                    ->orWhere('description', 'like', '%' . $request->search . '%');
            });
        }

        if ($request->filled('type')) {
            $query->where('type', $request->type);
        }

        $page = $request->input('page', 1);
        $perPage = 6;
        $total = $query->count();
        $templates = $query->offset(($page - 1) * $perPage)->limit($perPage)->get()->map(function ($template) {
            return [
                'id' => $template->id,
                'title' => $template->title,
                'description' => $template->description,
                'type' => $template->type,
                'status' => $template->is_active ? 'active' : 'inactive',
                // أضف أي حقول أخرى تحتاجها في الواجهة
            ];
        });

        return response()->json([
            'templates' => $templates,
            'total' => $total,
        ]);
    }
}
