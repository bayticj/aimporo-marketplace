<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\Dispute;
use App\Models\User;
use App\Models\Order;
use App\Models\DisputeComment;
use App\Models\DisputeEvidence;

class TestDisputesApi extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'test:disputes-api';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Test the disputes API by checking the database';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $this->info('Testing Disputes API...');
        
        // Check if disputes exist
        $disputesCount = Dispute::count();
        $this->info("Found {$disputesCount} disputes in the database.");
        
        if ($disputesCount === 0) {
            $this->warn('No disputes found. Creating a test dispute...');
            
            // Find a user with admin role
            $admin = User::whereHas('roles', function($query) {
                $query->where('name', 'admin');
            })->first();
            
            if (!$admin) {
                $this->error('No admin user found. Please run the seeders first.');
                return 1;
            }
            
            // Find a buyer
            $buyer = User::whereHas('roles', function($query) {
                $query->where('name', 'buyer');
            })->first();
            
            if (!$buyer) {
                $this->error('No buyer user found. Please run the seeders first.');
                return 1;
            }
            
            // Find a seller
            $seller = User::whereHas('roles', function($query) {
                $query->where('name', 'seller');
            })->first();
            
            if (!$seller) {
                $this->error('No seller user found. Please run the seeders first.');
                return 1;
            }
            
            // Find an order
            $order = Order::first();
            
            if (!$order) {
                $this->error('No orders found. Please run the seeders first.');
                return 1;
            }
            
            // Create a dispute
            $dispute = Dispute::create([
                'order_id' => $order->id,
                'user_id' => $buyer->id,
                'status' => 'open',
                'type' => 'quality',
                'title' => 'Test Dispute',
                'description' => 'This is a test dispute created by the TestDisputesApi command.',
                'is_escalated' => false,
            ]);
            
            // Create a system comment
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $buyer->id,
                'comment' => 'Dispute created',
                'is_system_comment' => true,
            ]);
            
            // Create a buyer comment
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $buyer->id,
                'comment' => 'I have an issue with this order.',
                'is_system_comment' => false,
            ]);
            
            // Create a seller comment
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $seller->id,
                'comment' => 'I will look into this issue.',
                'is_system_comment' => false,
            ]);
            
            // Create an admin comment
            DisputeComment::create([
                'dispute_id' => $dispute->id,
                'user_id' => $admin->id,
                'comment' => 'We are reviewing this dispute.',
                'is_admin_comment' => true,
            ]);
            
            $this->info('Test dispute created successfully!');
        }
        
        // List all disputes
        $disputes = Dispute::with(['user', 'order', 'comments', 'evidence'])->get();
        
        foreach ($disputes as $dispute) {
            $this->info("Dispute #{$dispute->id}: {$dispute->title}");
            $this->info("Status: {$dispute->status}");
            $this->info("Type: {$dispute->type}");
            $this->info("Created by: {$dispute->user->name}");
            $this->info("Order: #{$dispute->order->id}");
            $this->info("Comments: " . $dispute->comments->count());
            $this->info("Evidence: " . $dispute->evidence->count());
            $this->info('---');
        }
        
        $this->info('Test completed successfully!');
        
        return 0;
    }
}
