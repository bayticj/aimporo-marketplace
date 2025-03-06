<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use App\Models\User;

class RolesAndPermissionsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Reset cached roles and permissions
        app()[\Spatie\Permission\PermissionRegistrar::class]->forgetCachedPermissions();

        // Create permissions
        // Gig permissions
        Permission::create(['name' => 'create gigs']);
        Permission::create(['name' => 'edit gigs']);
        Permission::create(['name' => 'delete gigs']);
        Permission::create(['name' => 'view gigs']);
        
        // Order permissions
        Permission::create(['name' => 'create orders']);
        Permission::create(['name' => 'manage orders']);
        Permission::create(['name' => 'view orders']);
        
        // Deliverable permissions
        Permission::create(['name' => 'submit deliverables']);
        Permission::create(['name' => 'review deliverables']);
        
        // User permissions
        Permission::create(['name' => 'manage users']);
        Permission::create(['name' => 'view users']);
        
        // Payment permissions
        Permission::create(['name' => 'process payments']);
        Permission::create(['name' => 'view transactions']);
        
        // Create roles and assign permissions
        
        // Admin role
        $adminRole = Role::create(['name' => 'admin']);
        $adminRole->givePermissionTo(Permission::all());
        
        // Seller role
        $sellerRole = Role::create(['name' => 'seller']);
        $sellerRole->givePermissionTo([
            'create gigs',
            'edit gigs',
            'delete gigs',
            'view gigs',
            'manage orders',
            'view orders',
            'submit deliverables',
            'view transactions'
        ]);
        
        // Buyer role
        $buyerRole = Role::create(['name' => 'buyer']);
        $buyerRole->givePermissionTo([
            'view gigs',
            'create orders',
            'view orders',
            'review deliverables',
            'view transactions'
        ]);
        
        // Create a default admin user
        $admin = User::where('email', 'admin@example.com')->first();
        if (!$admin) {
            $admin = User::factory()->create([
                'name' => 'Admin User',
                'email' => 'admin@example.com',
                'password' => bcrypt('password'),
            ]);
        }
        $admin->assignRole('admin');
        
        // Create a default seller user
        $seller = User::where('email', 'seller@example.com')->first();
        if (!$seller) {
            $seller = User::factory()->create([
                'name' => 'Seller User',
                'email' => 'seller@example.com',
                'password' => bcrypt('password'),
            ]);
        }
        $seller->assignRole('seller');
        
        // Create a default buyer user
        $buyer = User::where('email', 'buyer@example.com')->first();
        if (!$buyer) {
            $buyer = User::factory()->create([
                'name' => 'Buyer User',
                'email' => 'buyer@example.com',
                'password' => bcrypt('password'),
            ]);
        }
        $buyer->assignRole('buyer');
    }
} 