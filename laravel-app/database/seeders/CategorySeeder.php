<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\Category;

class CategorySeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        Category::updateOrCreate(
            ['id' => 1],
            [
                'name' => 'Web Development',
                'slug' => 'web-development',
                'description' => 'Web development services including frontend and backend development',
                'is_active' => true,
            ]
        );
        
        Category::updateOrCreate(
            ['id' => 2],
            [
                'name' => 'Graphic Design',
                'slug' => 'graphic-design',
                'description' => 'Graphic design services including logos, banners, and marketing materials',
                'is_active' => true,
            ]
        );
        
        Category::updateOrCreate(
            ['id' => 3],
            [
                'name' => 'Digital Marketing',
                'slug' => 'digital-marketing',
                'description' => 'Digital marketing services including SEO, social media, and content marketing',
                'is_active' => true,
            ]
        );
        
        $this->command->info('Categories created successfully!');
    }
} 