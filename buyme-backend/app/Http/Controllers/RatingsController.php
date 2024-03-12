<?php

namespace App\Http\Controllers;

use App\Models\Ratings;
use App\Http\Requests\StoreRatingsRequest;
use App\Http\Requests\UpdateRatingsRequest;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\Request;
use App\Models\Product;



class RatingsController extends Controller
{
    public function store(Request $request)
    {

        $user = Auth::user();

        $rating = new Ratings([
            'product_id' => $request->input('product_id'),
            'user_id' => $user->id,
            'rating' => $request->input('rating'), 
        ]);

        $rating->save();

        $apartment = $rating->product;
        $apartment->updateOverallRating();

        return response()->json(['message' => 'Rating added successfully']);
    }
    // public function getRatings($id)
    // {
    //     try {
    //         $apartment = Apartment::findOrFail($id);
    //         $ratings = $apartment->ratings;

    //         return response()->json(['ratings' => $ratings], 200);
    //     } catch (\Exception $e) {
    //         // Handle the exception, return an error response, or log the error
    //         return response()->json(['error' => 'Failed to fetch ratings.'], 500);
    //     }
    // }
    public function getRatings($id)
{
    try {
        $product = Product::findOrFail($id);
        $ratings = $product->ratings;

        if ($ratings->isEmpty()) {
            return response()->json(['error' => 'No ratings available.'], 404);
        }

        $totalRatings = count($ratings);
        $sumRatings = 0;

        foreach ($ratings as $rating) {
            $sumRatings += $rating->rating;
        }

        $averageRating = $sumRatings / $totalRatings;

        return response()->json(['average_rating' => number_format($averageRating, 2)], 200);
    } catch (\Exception $e) {
        return response()->json(['error' => 'Failed to fetch ratings.'], 500);
    }
}
}
