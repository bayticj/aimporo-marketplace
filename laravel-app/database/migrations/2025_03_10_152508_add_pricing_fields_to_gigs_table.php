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
        Schema::table('gigs', function (Blueprint $table) {
            // Add original price field for showing discounts
            $table->decimal('original_price', 10, 2)->nullable()->after('price');
            
            // Add pricing model field
            $table->enum('pricing_model', [
                'lifetime', 'month', 'year', 'session', 'appointment', 
                'slot', 'hour', 'delivery', 'starting'
            ])->default('delivery')->after('original_price');
            
            // Add discount percentage field
            $table->decimal('discount_percentage', 5, 2)->nullable()->after('pricing_model');
            
            // Add discount valid until field
            $table->timestamp('discount_valid_until')->nullable()->after('discount_percentage');
            
            // Add is_digital_product flag
            $table->boolean('is_digital_product')->default(false)->after('is_active');
            
            // Add is_service flag
            $table->boolean('is_service')->default(true)->after('is_digital_product');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('gigs', function (Blueprint $table) {
            $table->dropColumn('original_price');
            $table->dropColumn('pricing_model');
            $table->dropColumn('discount_percentage');
            $table->dropColumn('discount_valid_until');
            $table->dropColumn('is_digital_product');
            $table->dropColumn('is_service');
        });
    }
};
