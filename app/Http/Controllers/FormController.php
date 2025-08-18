<?php

namespace App\Http\Controllers;

use App\Models\Form;
use Illuminate\Http\Request;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class FormController extends Controller
{
    public function index(): Response
    {
        $forms = auth()->user()->forms()->latest()->get();

        return Inertia::render('Dashboard/Forms/Index', [
            'forms' => $forms
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
        $form->load(['responses' => function ($query) {
            $query->latest();
        }]);

        // تصحيح: تحويل settings إلى array إذا لزم الأمر وضمان وجود templateBlocks
        $form->settings = is_array($form->settings) ? $form->settings : (json_decode($form->settings, true) ?? []);
        if (!isset($form->settings['templateBlocks']) || !is_array($form->settings['templateBlocks'])) {
            $form->settings['templateBlocks'] = [];
        }

        return Inertia::render('Dashboard/Forms/Show', [
            'form' => $form
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
}
