<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class HelloWorldController extends Controller
{
    public function helloWorld() {
        return response()->json(["test" => "Hello World!"]);
    }
}
