<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Gig;

class GigSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a web development gig
        Gig::create([
            'user_id' => 2,
            'title' => 'Professional Web Development',
            'description' => 'I will create a professional website for your business',
            'category_id' => 1,
            'subcategory' => 'Website Development',
            'price' => 500.00,
            'delivery_time' => 7,
            'requirements' => 'Client needs to provide content and branding guidelines',
            'location' => 'Remote',
            'is_featured' => true,
            'is_active' => true,
            'tags' => json_encode(['web development', 'responsive design', 'business website']),
            'average_rating' => 0.0,
            'rating' => 5,
            'reviews_count' => 10,
        ]);

        // Create a logo design gig
        Gig::create([
            'user_id' => 2,
            'title' => 'Professional Logo Design',
            'description' => 'I will design a professional logo for your business',
            'category_id' => 1,
            'subcategory' => 'Logo Design',
            'price' => 99.99,
            'delivery_time' => 3,
            'requirements' => 'Client needs to provide brand guidelines',
            'location' => 'Remote',
            'is_featured' => true,
            'is_active' => true,
            'tags' => json_encode(['logo design', 'branding', 'business logo']),
            'average_rating' => 0.0,
            'rating' => 5,
            'reviews_count' => 0,
        ]);
    }
} 