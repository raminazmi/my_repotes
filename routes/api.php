<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TemplateUserController;

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/templates', [TemplateUserController::class, 'apiIndex']);
});