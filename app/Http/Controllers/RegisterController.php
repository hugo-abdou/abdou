<?php

namespace App\Http\Controllers;

use App\Actions\Fortify\CreateNewUser;
use Illuminate\Http\Request;

class RegisterController extends Controller
{
    /**
     * Register api
     *
     * @return \Illuminate\Http\Response
     */
    public function register(Request $request, CreateNewUser $createUser)
    {
        $user = $createUser->create($request->all());

        return $user;
    }
}
