<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Product;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;

class SearchController extends Controller
{
    public function search(Request $request)
    {
        $query = $request->input('q');

        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->get();

       

        return response()->json($products);
    }
}
