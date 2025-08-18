<?php

use App\Http\Controllers\ProfileController;
use App\Http\Controllers\LandingController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\ReportExportController;
use App\Http\Controllers\TemplateUserController;
use App\Http\Controllers\FormController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [LandingController::class, 'index'])->name('landing');
Route::get('/about', [LandingController::class, 'about'])->name('about');
Route::get('/features', [LandingController::class, 'features'])->name('features');
Route::get('/pricing', [LandingController::class, 'pricing'])->name('pricing');
Route::get('/contact', [LandingController::class, 'contact'])->name('contact');
Route::get('/privacy', [LandingController::class, 'privacy'])->name('privacy');

Route::get('/login', function () {
    return Inertia::render('Landing/Login');
})->name('landing.login');

Route::get('/signup', function () {
    return Inertia::render('Landing/Signup');
})->name('landing.signup');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');
    Route::get('/templates', [TemplateUserController::class, 'index'])->name('user.templates.index');
    Route::get('/templates/{template}', [TemplateUserController::class, 'show'])->name('user.templates.show');
    Route::post('/templates/{template}/submit', [TemplateUserController::class, 'submit'])->name('user.templates.submit');
    Route::delete('/reports/{report}', [TemplateUserController::class, 'destroy'])->name('user.reports.destroy');
    Route::get('/payments', [\App\Http\Controllers\PaymentController::class, 'index'])->name('payments.index');
    // مسارات النماذج
    Route::get('/forms', [FormController::class, 'index'])->name('forms.index');
    Route::get('/forms/create', [FormController::class, 'create'])->name('forms.create');
    Route::post('/forms', [FormController::class, 'store'])->name('forms.store');
    Route::get('/forms/{form}', [FormController::class, 'show'])->name('forms.show');
    Route::get('/forms/{form}/edit', [FormController::class, 'edit'])->name('forms.edit');
    Route::patch('/forms/{form}', [FormController::class, 'update'])->name('forms.update');
    Route::delete('/forms/{form}', [FormController::class, 'destroy'])->name('forms.destroy');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/reports/{report}/export/{type}', [ReportExportController::class, 'export'])
    ->name('reports.export')
    ->middleware(['auth', 'verified']);


require __DIR__ . '/auth.php';
