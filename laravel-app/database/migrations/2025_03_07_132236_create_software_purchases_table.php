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
        Schema::create('software_purchases', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('product_id')->constrained('software_products')->onDelete('cascade');
            $table->foreignId('plan_id')->constrained('software_plans')->onDelete('cascade');
            $table->enum('status', ['pending', 'active', 'redeemed', 'failed', 'expired'])->default('pending');
            $table->string('redemption_code')->nullable()->unique();
            $table->string('redemption_url')->nullable();
            $table->string('external_account_id')->nullable();
            $table->string('external_username')->nullable();
            $table->string('external_password')->nullable();
            $table->timestamp('purchased_at')->nullable();
            $table->timestamp('redeemed_at')->nullable();
            $table->timestamp('expires_at')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('software_purchases');
    }
};
