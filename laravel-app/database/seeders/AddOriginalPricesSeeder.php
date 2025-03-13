<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\DigitalProduct;
use App\Models\Gig;
use App\Models\SoftwarePlan;
use Carbon\Carbon;

class AddOriginalPricesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Add original prices to digital products
        $this->addOriginalPricesToDigitalProducts();
        
        // Add original prices to gigs
        $this->addOriginalPricesToGigs();
        
        // Add original prices to software plans
        $this->addOriginalPricesToSoftwarePlans();
    }
    
    /**
     * Add original prices to digital products.
     */
    private function addOriginalPricesToDigitalProducts(): void
    {
        $digitalProducts = DigitalProduct::all();
        
        foreach ($digitalProducts as $product) {
            // Calculate an original price that's 20-40% higher than the current price
            $increasePercentage = rand(20, 40);
            $originalPrice = round($product->price * (1 + $increasePercentage / 100), 2);
            
            // Update the product with the original price and discount info
            $product->update([
                'original_price' => $originalPrice,
                'discount_percentage' => $increasePercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
            ]);
        }
        
        $this->command->info('Added original prices to ' . $digitalProducts->count() . ' digital products');
    }
    
    /**
     * Add original prices to gigs.
     */
    private function addOriginalPricesToGigs(): void
    {
        $gigs = Gig::all();
        
        foreach ($gigs as $gig) {
            // Calculate an original price that's 15-35% higher than the current price
            $increasePercentage = rand(15, 35);
            $originalPrice = round($gig->price * (1 + $increasePercentage / 100), 2);
            
            // Update the gig with the original price and discount info
            $gig->update([
                'original_price' => $originalPrice,
                'discount_percentage' => $increasePercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
                'pricing_model' => $gig->is_digital_product ? 'lifetime' : 'delivery',
            ]);
        }
        
        $this->command->info('Added original prices to ' . $gigs->count() . ' gigs');
    }
    
    /**
     * Add original prices to software plans.
     */
    private function addOriginalPricesToSoftwarePlans(): void
    {
        $softwarePlans = SoftwarePlan::all();
        
        foreach ($softwarePlans as $plan) {
            // Calculate an original price that's 10-30% higher than the current price
            $increasePercentage = rand(10, 30);
            $originalPrice = round($plan->price * (1 + $increasePercentage / 100), 2);
            
            // Update the plan with the original price and discount info
            $plan->update([
                'original_price' => $originalPrice,
                'discount_percentage' => $increasePercentage,
                'discount_valid_until' => Carbon::now()->addMonths(rand(1, 3)),
                'pricing_model' => $plan->isLifetime() ? 'lifetime' : 'month',
            ]);
        }
        
        $this->command->info('Added original prices to ' . $softwarePlans->count() . ' software plans');
    }
}
