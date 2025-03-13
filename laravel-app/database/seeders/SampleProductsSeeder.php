<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\DigitalProduct;
use App\Models\Gig;
use App\Models\Category;
use App\Models\Partner;
use App\Models\SoftwareProduct;
use App\Models\SoftwarePlan;
use Carbon\Carbon;

class SampleProductsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create a sample user if none exists
        $user = User::firstOrCreate(
            ['email' => 'demo@example.com'],
            [
                'name' => 'Demo User',
                'password' => bcrypt('password'),
                'email_verified_at' => now(),
            ]
        );
        
        // Create a sample category if none exists
        $category = Category::firstOrCreate(
            ['name' => 'Digital Products'],
            [
                'description' => 'Digital products and services',
                'slug' => 'digital-products',
            ]
        );
        
        // Add sample digital products
        $this->createSampleDigitalProducts($user->id);
        
        // Add sample gigs
        $this->createSampleGigs($user->id, $category->id);
        
        // Add sample software products and plans
        $this->createSampleSoftwareProducts($user->id);
    }
    
    /**
     * Create sample digital products.
     */
    private function createSampleDigitalProducts($userId): void
    {
        $digitalProducts = [
            [
                'title' => 'Premium UI Kit',
                'description' => 'A comprehensive UI kit for modern web applications',
                'price' => 89.00,
                'original_price' => 129.00,
                'file_name' => 'premium-ui-kit.zip',
                'file_size' => '25600000', // 25MB
                'file_type' => 'application/zip',
            ],
            [
                'title' => 'E-commerce Templates Bundle',
                'description' => 'Complete e-commerce templates for your online store',
                'price' => 59.00,
                'original_price' => 79.00,
                'file_name' => 'ecommerce-templates.zip',
                'file_size' => '18400000', // 18MB
                'file_type' => 'application/zip',
            ],
            [
                'title' => 'Social Media Marketing Guide',
                'description' => 'Comprehensive guide to social media marketing strategies',
                'price' => 39.00,
                'original_price' => 49.00,
                'file_name' => 'social-media-guide.pdf',
                'file_size' => '8200000', // 8.2MB
                'file_type' => 'application/pdf',
            ],
        ];
        
        foreach ($digitalProducts as $product) {
            $discountPercentage = round(($product['original_price'] - $product['price']) / $product['original_price'] * 100, 2);
            
            DigitalProduct::create([
                'user_id' => $userId,
                'title' => $product['title'],
                'description' => $product['description'],
                'price' => $product['price'],
                'original_price' => $product['original_price'],
                'discount_percentage' => $discountPercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
                'pricing_model' => 'lifetime',
                'file_path' => 'digital_products/' . strtolower(str_replace(' ', '-', $product['title'])) . '/' . $product['file_name'],
                'file_name' => $product['file_name'],
                'file_size' => $product['file_size'],
                'file_type' => $product['file_type'],
                'preview_path' => null,
                'download_limit' => null,
                'is_featured' => true,
                'status' => 'published',
            ]);
        }
        
        $this->command->info('Created ' . count($digitalProducts) . ' sample digital products');
    }
    
    /**
     * Create sample gigs.
     */
    private function createSampleGigs($userId, $categoryId): void
    {
        $gigs = [
            [
                'title' => 'Professional Logo Design',
                'description' => 'I will design a professional logo for your business',
                'price' => 99.00,
                'original_price' => 129.00,
                'delivery_time' => 3, // days
                'is_digital_product' => false,
                'is_service' => true,
            ],
            [
                'title' => 'Website Development',
                'description' => 'I will develop a responsive website for your business',
                'price' => 299.00,
                'original_price' => 399.00,
                'delivery_time' => 7, // days
                'is_digital_product' => false,
                'is_service' => true,
            ],
            [
                'title' => 'Social Media Management',
                'description' => 'I will manage your social media accounts for one month',
                'price' => 199.00,
                'original_price' => 249.00,
                'delivery_time' => 30, // days
                'is_digital_product' => false,
                'is_service' => true,
            ],
        ];
        
        foreach ($gigs as $gig) {
            $discountPercentage = round(($gig['original_price'] - $gig['price']) / $gig['original_price'] * 100, 2);
            
            Gig::create([
                'user_id' => $userId,
                'title' => $gig['title'],
                'description' => $gig['description'],
                'category_id' => $categoryId,
                'subcategory' => null,
                'price' => $gig['price'],
                'original_price' => $gig['original_price'],
                'discount_percentage' => $discountPercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
                'pricing_model' => 'delivery',
                'delivery_time' => $gig['delivery_time'],
                'requirements' => 'Please provide your business details and requirements.',
                'location' => 'Remote',
                'is_featured' => true,
                'is_active' => true,
                'is_digital_product' => $gig['is_digital_product'],
                'is_service' => $gig['is_service'],
                'thumbnail' => null,
                'images' => json_encode([]),
                'tags' => json_encode(['professional', 'quality', 'fast']),
                'rating' => 5,
                'reviews_count' => 0,
            ]);
        }
        
        $this->command->info('Created ' . count($gigs) . ' sample gigs');
    }
    
    /**
     * Create sample software products and plans.
     */
    private function createSampleSoftwareProducts($userId): void
    {
        // Create a sample partner
        $partner = Partner::firstOrCreate(
            ['name' => 'Demo Software Company'],
            [
                'company_name' => 'Demo Software Company',
                'email' => 'partner@example.com',
                'api_key' => Partner::generateApiKey(),
                'webhook_url' => 'https://example.com/webhook',
                'integration_type' => 'api',
                'api_endpoint' => 'https://example.com/api',
                'redemption_url' => 'https://example.com/redeem',
            ]
        );
        
        // Create a sample software product
        $softwareProduct = SoftwareProduct::create([
            'partner_id' => $partner->id,
            'name' => 'Project Management Software',
            'slug' => 'project-management-software',
            'description' => 'A comprehensive project management software for teams of all sizes',
            'version' => '1.0.0',
            'logo_path' => null,
            'screenshots' => json_encode([]),
            'short_description' => 'Manage your projects efficiently',
            'is_active' => true,
        ]);
        
        // Create sample software plans
        $plans = [
            [
                'name' => 'Basic',
                'description' => 'For small teams',
                'price' => 29.00,
                'original_price' => 39.00,
                'duration_days' => 30, // Monthly
                'features' => ['Up to 5 users', 'Basic features', 'Email support'],
                'is_recommended' => false,
                'display_order' => 1,
            ],
            [
                'name' => 'Professional',
                'description' => 'For growing teams',
                'price' => 79.00,
                'original_price' => 99.00,
                'duration_days' => 30, // Monthly
                'features' => ['Up to 20 users', 'Advanced features', 'Priority support', 'API access'],
                'is_recommended' => true,
                'display_order' => 2,
            ],
            [
                'name' => 'Enterprise',
                'description' => 'For large organizations',
                'price' => 199.00,
                'original_price' => 249.00,
                'duration_days' => 30, // Monthly
                'features' => ['Unlimited users', 'All features', 'Dedicated support', 'Custom integrations'],
                'is_recommended' => false,
                'display_order' => 3,
            ],
        ];
        
        foreach ($plans as $plan) {
            $discountPercentage = round(($plan['original_price'] - $plan['price']) / $plan['original_price'] * 100, 2);
            
            SoftwarePlan::create([
                'product_id' => $softwareProduct->id,
                'name' => $plan['name'],
                'description' => $plan['description'],
                'price' => $plan['price'],
                'original_price' => $plan['original_price'],
                'discount_percentage' => $discountPercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
                'pricing_model' => 'month',
                'duration_days' => $plan['duration_days'],
                'features' => json_encode($plan['features']),
                'is_active' => true,
                'display_order' => $plan['display_order'],
                'is_recommended' => $plan['is_recommended'],
            ]);
        }
        
        $this->command->info('Created 1 sample software product with ' . count($plans) . ' plans');
    }
}
