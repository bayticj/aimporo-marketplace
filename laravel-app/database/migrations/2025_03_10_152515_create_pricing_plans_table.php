<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('pricing_plans', function (Blueprint $table) {
            $table->id();
            
            // Polymorphic relationship to either gigs or digital_products
            $table->morphs('priceable');
            
            // Plan details
            $table->string('title'); // Basic, Standard, Premium, etc.
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('original_price', 10, 2)->nullable(); // For showing discounts
            
            // Pricing model
            $table->enum('pricing_model', [
                'lifetime', 'month', 'year', 'session', 'appointment', 
                'slot', 'hour', 'delivery', 'starting'
            ])->default('delivery');
            
            // Discount information
            $table->decimal('discount_percentage', 5, 2)->nullable();
            $table->timestamp('discount_valid_until')->nullable();
            
            // Service-specific fields
            $table->string('delivery_time')->nullable(); // e.g., "2 days"
            $table->string('revisions')->nullable(); // e.g., "Unlimited"
            
            // Features included in this plan
            $table->json('features')->nullable();
            
            // Plan order (for display)
            $table->integer('display_order')->default(0);
            
            // Is this the recommended/featured plan?
            $table->boolean('is_recommended')->default(false);
            
            // Is this plan active?
            $table->boolean('is_active')->default(true);
            
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('pricing_plans');
    }
};
