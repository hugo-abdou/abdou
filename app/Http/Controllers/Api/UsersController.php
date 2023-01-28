<?php

namespace App\Http\Controllers\Api;

use App\Actions\Fortify\CreateNewUser;
use App\Actions\Fortify\UpdateUserProfileInformation;
use App\Http\Controllers\Controller;
use App\Http\Resources\UserResource;
use App\Models\User;
use Illuminate\Http\Request;

class UsersController extends Controller
{
    public function list(Request $request)
    {
        $perPage = $request->get('perPage', 10);
        $currentPage = $request->get('currentPage', 1);
        $search = $request->get('search', false);
        $status = $request->get('status', false);
        $plan = $request->get('plan', false);
        $role = $request->get('role', false);
        $users = User::query()->whereNot('id', auth()->id());



        if ($search) $users = $users->where('name', 'LIKE', "%$search%")
            ->orWhere('email', 'LIKE', "%$search%");

        // if ($status) $users = $users->where('status', 'LIKE', "%$status%");
        // if ($plan) $users = $users->where('plan', 'LIKE', "%$plan%");
        // if ($role) $users = $users->where('name', 'LIKE', "%$role%");

        return UserResource::collection($users->paginate($perPage, page: $currentPage));
    }

    public function get_user(User $user)
    {
        return $user;
    }

    public function store(Request $request, CreateNewUser $user_service)
    {
        $user = $user_service->create($request->all());
        return $user;
    }
    public function update(Request $request, User $user, UpdateUserProfileInformation $user_service)
    {
        $user = $user_service->update($user, $request->all());
        return $user;
    }
}
