<?php

use App\Http\Controllers\InstallController;
use App\Http\Controllers\RegisterController;
use App\Http\Resources\AuthResource;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
 */

Route::get('/is_loged_in', fn() => auth()->check());
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return AuthResource::make($request->user());
});

Route::post('/register', [RegisterController::class, 'register']);

/** Installation Steps */
Route::get('/install/init', [InstallController::class, 'init'])->name('install.init');
Route::get('/install/pre_installation', [InstallController::class, 'pre_installation'])->name('install.pre_installation');
Route::get('/install/purchase_code', [InstallController::class, 'purchase_code'])->name('install.purchase_code');
Route::post('/install/purchase_code/verify', [InstallController::class, 'purchaseCodeVerify'])->name('install.purchase_code.verify');
Route::get('/install/database_setup', [InstallController::class, 'database_setup'])->name('install.database_setup');
Route::post('/install/database_installation', [InstallController::class, 'database_installation'])->name('install.db');
Route::get('/install/mail_setup', [InstallController::class, 'mail_setup'])->name('install.mail_setup');
Route::post('/install/mail_setup', [InstallController::class, 'mailSetupStore'])->name('install.mail_setup.save');
Route::get('/install/admin_setup', [InstallController::class, 'admin_setup'])->name('install.admin_setup');
Route::post('/install/system_settings', [InstallController::class, 'adminSetupSave'])->name('install.admin_setup.save');
Route::get('/install/migrate', [InstallController::class, 'migrate'])->name('install.migrate');
