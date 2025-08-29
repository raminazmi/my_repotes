<?php

namespace App\Http\Controllers;

use App\Models\Form;
use App\Models\Report;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FormController extends Controller
{
    public function index(Request $request): Response
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
        $forms = $query->offset(($page - 1) * $perPage)->limit($perPage)->get();

        return Inertia::render('Dashboard/Forms/Index', [
            'initialForms' => $forms,
            'filters' => $request->only(['search', 'type', 'status']),
            'total' => $total,
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Dashboard/Forms/Create');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:report,survey,assessment',
            'template' => 'required|string',
            'settings' => 'nullable|array',
        ]);

        $form = auth()->user()->forms()->create($validated);

        return redirect()->route('forms.show', $form)->with('success', 'تم إنشاء النموذج بنجاح');
    }

    public function show(Form $form): Response
    {
        if (!$form->is_template) {
            abort(403, 'هذا النموذج ليس قالبًا جاهزًا.');
        }

        $report = $form->reports()->where('user_id', auth()->id())->latest()->first();

        // تحويل settings إلى array إذا لزم الأمر
        $settings = $form->settings;
        if (is_string($settings)) {
            $settings = json_decode($settings, true) ?: [];
        }
        
        // التأكد من أن templateBlocks موجودة
        if (!isset($settings['templateBlocks']) || !is_array($settings['templateBlocks'])) {
            $settings['templateBlocks'] = [];
        }

        // إعادة تعيين settings
        $form->setAttribute('settings', $settings);

        return Inertia::render('Dashboard/Forms/Show', [
            'form' => $form,
            'report' => $report,
            'auth' => ['user' => auth()->user()],
        ]);
    }

    public function edit(Form $form): Response
    {
        return Inertia::render('Dashboard/Forms/Edit', [
            'form' => $form
        ]);
    }

    public function update(Request $request, Form $form): RedirectResponse
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'type' => 'required|string|in:report,survey,assessment',
            'template' => 'required|string',
            'settings' => 'nullable|array',
            'is_active' => 'boolean',
        ]);

        $form->update($validated);

        return redirect()->route('forms.show', $form)->with('success', 'تم تحديث النموذج بنجاح');
    }

    public function destroy(Form $form): RedirectResponse
    {
        $form->delete();

        return redirect()->route('forms.index')->with('success', 'تم حذف النموذج بنجاح');
    }

    public function submit(Request $request, Form $form): RedirectResponse
    {
        if (!$form->is_template) {
            abort(403, 'هذا النموذج ليس قالبًا جاهزًا.');
        }

        // التحقق من الحقول المطلوبة
        $rules = [];
        
        // تحويل settings إلى array إذا لزم الأمر
        $settings = $form->settings;
        if (is_string($settings)) {
            $settings = json_decode($settings, true) ?: [];
        }
        
        foreach ($settings['templateBlocks'] ?? [] as $block) {
            foreach ($block['fields'] ?? [] as $field) {
                if ($field['required']) {
                    if ($field['type'] === 'image') {
                        $rules["answers.{$field['label']}"] = 'required|image';
                    } else {
                        $rules["answers.{$field['label']}"] = 'required';
                    }
                } else {
                    if ($field['type'] === 'image') {
                        $rules["answers.{$field['label']}"] = 'nullable|image';
                    } else {
                        $rules["answers.{$field['label']}"] = 'nullable';
                    }
                }
            }
        }

        $data = $request->validate($rules);

        $answers = $data['answers'] ?? [];

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
            'form_id' => $form->id,
            'user_id' => auth()->id(),
            'data' => $answers,
        ]);

        return redirect()->route('forms.show', $form->id)->with('success', 'تم إنشاء التقرير بنجاح');
    }

    public function destroyReport(Report $report): RedirectResponse
    {
        if ($report->user_id !== auth()->id()) {
            abort(403, 'غير مصرح لك بحذف هذا التقرير.');
        }

        $report->delete();
        return back()->with('success', 'تم حذف التقرير بنجاح');
    }
}
