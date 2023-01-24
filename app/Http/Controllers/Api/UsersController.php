<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function list(Request $request)
    {
        return response()->json([
            'users' => UserResource::collection(User::all())
        ]);
    }
}
