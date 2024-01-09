<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;
use App\Models\User;
use App\Models\Order;

class ProductController extends Controller
{
    public function index(Request $request)
    {
        $category = $request->input('category');
    
        // If a category is specified, filter products accordingly
        $products = $category ? Product::where('category', $category)->get() : Product::all();
    
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

        $uniqueFilename = uniqid() . '_' . time() . '.' . $request->file('image')->getClientOriginalExtension();
        $imagePath = $request->file('image')->storeAs('product_images', $uniqueFilename, 'public');

        $product = Product::create([
            'user_id' => $user->id,
            'name' => $request->name,
            'description' => $request->description,
            'price' => $request->price,
            'image_path' => $imagePath, 
            'stock' => $request->stock,
            'category' => $request->category,
        ]);

        return response()->json($product, 201);
    }

    public function show(Product $product)
    {
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
    // public function productsSoldByUser()
    // {
    //     // Fetch products sold by the authenticated user
    //     $orders = Order::with(['product', 'user'])->where('user_id', Auth::id())->get();

    //     return response()->json($orders);
    // }
    public function productsSoldByUser()
{
    // Fetch products sold by the authenticated user as a seller
    $orders = Order::with(['product', 'product.user'])
        ->whereHas('product.user', function ($query) {
            // Ensure the seller's ID matches the authenticated user's ID
            $query->where('id', Auth::id());
        })
        ->get();

    // Extract products and buyers from orders
    $products = $orders->map(function ($order) {
        return [
            'product' => $order->product,
            'buyer' => $order->user,
        ];
    });

    return response()->json($products);
}
}
