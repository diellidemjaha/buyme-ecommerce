<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Product;

class Ratings extends Model
{
    use HasFactory;
    protected $fillable = [
        'product_id',
        'user_id',
        'rating',
    ];

    // Define relationships or any other model-specific methods here
    public function product()
{
    return $this->belongsTo(Product::class);
}
}
