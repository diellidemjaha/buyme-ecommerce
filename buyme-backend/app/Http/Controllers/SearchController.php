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

        // Perform the search in the products table based on the product name or other criteria
        $products = Product::where('name', 'like', '%' . $query . '%')
            ->orWhere('description', 'like', '%' . $query . '%')
            ->get();

            // if ($products->isEmpty()) {
            //     throw new NotFoundHttpException('No query results for model [App\Models\Product] search');
            // }

        return response()->json($products);
    }
}
