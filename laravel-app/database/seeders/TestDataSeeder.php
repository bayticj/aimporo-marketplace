<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Gig;
use App\Models\Order;
use App\Models\UserProfile;
use App\Models\Dispute;
use App\Models\DisputeComment;
use App\Models\DisputeEvidence;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;

class TestDataSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create roles if they don't exist
        if (!Role::where('name', 'admin')->exists()) {
            Role::create(['name' => 'admin', 'guard_name' => 'web']);
        }
        if (!Role::where('name', 'seller')->exists()) {
            Role::create(['name' => 'seller', 'guard_name' => 'web']);
        }
        if (!Role::where('name', 'buyer')->exists()) {
            Role::create(['name' => 'buyer', 'guard_name' => 'web']);
        }

        // Create admin user
        $admin = User::updateOrCreate(
            ['email' => 'admin@example.com'],
            [
                'name' => 'Admin User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $admin->assignRole('admin');
        
        // Create seller user
        $seller = User::updateOrCreate(
            ['email' => 'seller@example.com'],
            [
                'name' => 'Seller User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $seller->assignRole('seller');
        
        // Create buyer user
        $buyer = User::updateOrCreate(
            ['email' => 'buyer@example.com'],
            [
                'name' => 'Buyer User',
                'password' => Hash::make('password'),
                'email_verified_at' => now(),
            ]
        );
        $buyer->assignRole('buyer');
        
        // Create user profiles
        UserProfile::updateOrCreate(
            ['user_id' => $admin->id],
            [
                'bio' => 'Admin user profile',
                'title' => 'System Administrator',
                'phone' => '123-456-7890',
                'address' => '123 Admin St',
                'city' => 'Admin City',
                'state' => 'Admin State',
                'country' => 'Admin Country',
                'postal_code' => '12345',
                'website' => 'https://admin.example.com',
                'account_type' => 'both',
                'is_verified_seller' => true,
                'last_active_at' => now(),
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $seller->id],
            [
                'bio' => 'Professional seller with years of experience',
                'title' => 'Senior Web Developer',
                'phone' => '123-456-7891',
                'address' => '456 Seller St',
                'city' => 'Seller City',
                'state' => 'Seller State',
                'country' => 'Seller Country',
                'postal_code' => '23456',
                'website' => 'https://seller.example.com',
                'account_type' => 'seller',
                'is_verified_seller' => true,
                'last_active_at' => now(),
                'skills' => json_encode(['Web Development', 'UI/UX Design', 'JavaScript']),
                'languages' => json_encode(['English', 'Spanish']),
            ]
        );
        
        UserProfile::updateOrCreate(
            ['user_id' => $buyer->id],
            [
                'bio' => 'Looking for quality services',
                'title' => 'Business Owner',
                'phone' => '123-456-7892',
                'address' => '789 Buyer St',
                'city' => 'Buyer City',
                'state' => 'Buyer State',
                'country' => 'Buyer Country',
                'postal_code' => '34567',
                'website' => 'https://buyer.example.com',
                'account_type' => 'buyer',
                'is_verified_seller' => false,
                'last_active_at' => now(),
            ]
        );
        
        // Create a gig
        $gig = Gig::updateOrCreate(
            ['title' => 'Professional Web Development'],
            [
                'user_id' => $seller->id,
                'description' => 'I will create a professional website for your business',
                'price' => 500.00,
                'delivery_time' => 7,
                'requirements' => 'Client needs to provide content and branding guidelines',
                'location' => 'Remote',
                'is_featured' => true,
                'is_active' => true,
                'category_id' => 1, // Assuming category 1 exists
                'subcategory' => 'Website Development',
                'tags' => json_encode(['web development', 'responsive design', 'business website']),
                'rating' => 5,
                'reviews_count' => 10,
            ]
        );
        
        // Create an order
        $order = Order::updateOrCreate(
            [
                'gig_id' => $gig->id,
                'buyer_id' => $buyer->id,
            ],
            [
                'seller_id' => $seller->id,
                'total_amount' => 500.00,
                'status' => 'in_progress',
                'delivery_date' => now()->addDays(7),
                'requirements' => 'I need a 5-page website with contact form',
                'buyer_instructions' => 'Please make it mobile responsive',
                'seller_notes' => 'Will deliver high-quality work',
                'revisions_allowed' => 3,
                'revisions_used' => 0,
                'is_completed' => false,
            ]
        );
        
        // Create a dispute
        $dispute = Dispute::updateOrCreate(
            [
                'order_id' => $order->id,
                'user_id' => $buyer->id,
            ],
            [
                'status' => 'open',
                'type' => 'quality',
                'title' => 'Website not responsive as requested',
                'description' => 'The delivered website is not mobile responsive as specified in my requirements.',
                'is_escalated' => false,
            ]
        );
        
        // Create dispute comments
        DisputeComment::updateOrCreate(
            [
                'dispute_id' => $dispute->id,
                'user_id' => $buyer->id,
                'comment' => 'I specifically requested a mobile responsive design, but the delivered website doesn\'t work well on mobile devices.',
            ],
            [
                'is_admin_comment' => false,
                'is_system_comment' => false,
            ]
        );
        
        DisputeComment::updateOrCreate(
            [
                'dispute_id' => $dispute->id,
                'user_id' => $seller->id,
                'comment' => 'I apologize for the issue. I can fix the responsive design within 2 days.',
            ],
            [
                'is_admin_comment' => false,
                'is_system_comment' => false,
            ]
        );
        
        DisputeComment::updateOrCreate(
            [
                'dispute_id' => $dispute->id,
                'user_id' => $buyer->id,
                'comment' => 'That would be acceptable. Please make sure it works on all devices.',
            ],
            [
                'is_admin_comment' => false,
                'is_system_comment' => false,
            ]
        );
        
        // Create a system comment
        DisputeComment::updateOrCreate(
            [
                'dispute_id' => $dispute->id,
                'user_id' => $buyer->id,
                'comment' => 'Dispute created',
            ],
            [
                'is_admin_comment' => false,
                'is_system_comment' => true,
            ]
        );
        
        // Create an admin comment
        DisputeComment::updateOrCreate(
            [
                'dispute_id' => $dispute->id,
                'user_id' => $admin->id,
                'comment' => 'We are reviewing this dispute. Please try to resolve it between yourselves first.',
            ],
            [
                'is_admin_comment' => true,
                'is_system_comment' => false,
            ]
        );
        
        $this->command->info('Test data created successfully!');
    }
} 