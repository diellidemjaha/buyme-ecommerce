<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Auth;
use App\Models\Product;
use App\Models\Order;

use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function purchase(Product $product, Request $request)
    {
        if ($product->stock <= 0) {
            return response()->json(['error' => 'Product is out of stock.'], 400);
        }

        // $totalPrice = $product->price;
        if ($product->stock < $request->input('quantity')) {
            return response()->json(['error' => 'Insufficient stock.'], 400);
        }

        $totalPrice = $product->price * $request->input('quantity');
        $buyerId = Auth::id();

        $order = Order::create([
            'user_id' => Auth::id(),
            'product_id' => $product->id,
            'total_price' => $totalPrice,
            'quantity' => $request->input('quantity'),
        ]);

        $product->decrement('stock', $request->input('quantity'));
        $order->load('user');

        return response()->json($order, 201);
    }
    public function productsBoughtByUser()
    {
        $orders = Order::with(['product', 'product.user'])->where('user_id', Auth::id())->get();

        $products = $orders->map(function ($order) {
            return [
                'product' => $order->product,
                'seller' => $order->product->user,
            ];
        });
    
        return response()->json($products);
    }
}
