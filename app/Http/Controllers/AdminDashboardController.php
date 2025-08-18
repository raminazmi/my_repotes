<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Form;
use App\Models\Report;
use Inertia\Inertia;

class AdminDashboardController extends Controller
{
    public function index()
    {
        $stats = [
            'total_users' => User::count(),
            'total_forms' => Form::count(),
            'active_forms' => Form::where('is_active', true)->count(),
            'total_reports' => Report::count(),
        ];
        $users = User::select('id', 'name', 'email', 'role', 'created_at')->get();
        $forms = Form::select('id', 'title', 'is_active', 'user_id', 'created_at')->get();
        $reports = Report::select('id', 'template_id', 'user_id', 'created_at')->get();

        return Inertia::render('Admin/Dashboard', [
            'stats' => $stats,
            'users' => $users,
            'forms' => $forms,
            'reports' => $reports,
        ]);
    }
}
