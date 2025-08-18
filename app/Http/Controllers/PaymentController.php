<?php

namespace App\Http\Controllers;

use App\Models\Payment;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PaymentController extends Controller
{
    // صفحة المستخدم: سجل مدفوعاته
    public function index(Request $request)
    {
        $user = $request->user();
        $payments = Payment::where('user_id', $user->id)->orderByDesc('created_at')->get();
        return Inertia::render('User/Payments/Index', [
            'payments' => $payments,
            'user' => $user,
        ]);
    }

    // صفحة الإدمن: كل المدفوعات + إحصائيات
    public function adminIndex(Request $request)
    {
        $payments = Payment::with('user')->orderByDesc('created_at')->get();
        $stats = [
            'total' => Payment::sum('amount'),
            'count' => Payment::count(),
            'monthly' => Payment::where('subscription_type', 'monthly')->count(),
            'yearly' => Payment::where('subscription_type', 'yearly')->count(),
            'paid' => Payment::where('status', 'paid')->count(),
            'pending' => Payment::where('status', 'pending')->count(),
        ];
        return Inertia::render('Admin/Payments/Index', [
            'payments' => $payments,
            'stats' => $stats,
        ]);
    }
}
