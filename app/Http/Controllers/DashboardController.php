<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Form;
use App\Models\Report;
use App\Models\User;

class DashboardController extends Controller
{
    public function index()
    {
        $user = auth()->user();
        $stats = [
            'total_forms' => Form::count(),
            'active_forms' => Form::where('is_active', true)->count(),
            'total_reports' => Report::count(),
            'total_users' => User::count(),
        ];
        $forms = Form::select('id', 'title as name', 'description', 'template', 'is_active', 'created_at')
            ->where('is_active', true)
            ->get();
        return inertia('Dashboard/Index', [
            'auth' => ['user' => $user],
            'stats' => $stats,
            'forms' => $forms,
        ]);
    }
}