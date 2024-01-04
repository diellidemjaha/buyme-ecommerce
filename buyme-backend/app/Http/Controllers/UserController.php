<?php

namespace App\Http\Controllers;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    public function getUserById($userId)
{
    $user = User::find($userId);

    return response()->json($user);
}
}
