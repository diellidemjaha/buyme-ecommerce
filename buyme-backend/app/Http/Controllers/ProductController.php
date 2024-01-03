<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;

class ProductController extends Controller
{
    public function index()
    {
        $products = Product::where('user_id', auth()->id())->get();
        return response()->json($products);
    }

    public function store(Request $request)
    {
        // $request->validate([
        //     'name' => 'required',
        //     'description' => 'required',
        //     'price' => 'required|numeric',
        // ]);

        $user = Auth::user();

        if (!$user) {
            return response()->json(['error' => 'Unauthenticated.'], 401);
        }

        $product = Product::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
        // Ensure the product belongs to the authenticated user
        abort_if($product->user_id != auth()->id(), 403);

        return response()->json($product);
    }

    public function update(Request $request, Product $product)
    {
        // Ensure the product belongs to the authenticated user
        abort_if($product->user_id != auth()->id(), 403);

        // $request->validate([
        //     'name' => 'required',
        //     'description' => 'required',
        //     'price' => 'required|numeric',
        // ]);

        $product->update([
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
        ]);

        return response()->json($product);
    }

    public function destroy(Product $product)
    {
        // Ensure the product belongs to the authenticated user
        abort_if($product->user_id != auth()->id(), 403);

        $product->delete();

        return response()->json(['message' => 'Product deleted successfully']);
    }
    public function indexByUser($userId)
    {
        // Retrieve products by the specified user_id
        $products = Product::where('user_id', $userId)->get();

        return response()->json($products);
    }
}
