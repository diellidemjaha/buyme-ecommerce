<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Ratings;

class Product extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'description', 'price', 'user_id', 'stock', 'image_path', 'category'];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function updateOverallRating()
{
    $averageRating = $this->ratings()->avg('rating');
    $this->rating = $averageRating;
    $this->save();
}
public function ratings()
{
    return $this->hasMany(Ratings::class);
}
}
