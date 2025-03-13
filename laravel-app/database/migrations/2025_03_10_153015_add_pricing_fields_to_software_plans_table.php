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
        Schema::table('software_plans', function (Blueprint $table) {
            // Add original price field for showing discounts
            $table->decimal('original_price', 10, 2)->nullable()->after('price');
            
            // Add pricing model field
            $table->enum('pricing_model', [
                'lifetime', 'month', 'year', 'session', 'appointment', 
                'slot', 'hour', 'delivery', 'starting'
            ])->default('month')->after('original_price');
            
            // Add discount percentage field
            $table->decimal('discount_percentage', 5, 2)->nullable()->after('pricing_model');
            
            // Add discount valid until field
            $table->timestamp('discount_valid_until')->nullable()->after('discount_percentage');
            
            // Add display order for sorting plans
            $table->integer('display_order')->default(0)->after('is_active');
            
            // Add is_recommended flag
            $table->boolean('is_recommended')->default(false)->after('display_order');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('software_plans', function (Blueprint $table) {
            $table->dropColumn('original_price');
            $table->dropColumn('pricing_model');
            $table->dropColumn('discount_percentage');
            $table->dropColumn('discount_valid_until');
            $table->dropColumn('display_order');
            $table->dropColumn('is_recommended');
        });
    }
};
