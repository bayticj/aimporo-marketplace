import React, { useState } from 'react';
import { FaCheck } from 'react-icons/fa';

interface PricingTier {
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  delivery_time: string;
  revisions: string;
  features: string[];
}

interface ServicePricingCardProps {
  pricingTiers: {
    basic: PricingTier;
    standard?: PricingTier;
    premium?: PricingTier;
  };
  onSelectPackage: (packageType: 'basic' | 'standard' | 'premium') => void;
}

const ServicePricingCard: React.FC<ServicePricingCardProps> = ({ 
  pricingTiers,
  onSelectPackage
}) => {
  const [activeTab, setActiveTab] = useState<'basic' | 'standard' | 'premium'>('basic');
  
  // Get the active pricing tier
  const activePricingTier = pricingTiers[activeTab] || pricingTiers.basic;
  
  // Calculate discount percentage if original price exists
  const calculateDiscount = (price: number, originalPrice?: number) => {
    if (!originalPrice || originalPrice <= price) return null;
    return Math.round(((originalPrice - price) / originalPrice) * 100);
  };
  
  const discount = calculateDiscount(activePricingTier.price, activePricingTier.originalPrice);
  
  return (
    <div className="bg-white rounded-lg border overflow-hidden">
      {/* Tabs */}
      <div className="flex border-b">
        <button
          onClick={() => setActiveTab('basic')}
          className={`flex-1 py-3 text-center font-medium text-sm ${
            activeTab === 'basic' 
              ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' 
              : 'text-gray-700 hover:bg-gray-50'
          }`}
        >
          Basic
        </button>
        
        {pricingTiers.standard && (
          <button
            onClick={() => setActiveTab('standard')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'standard' 
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Standard
          </button>
        )}
        
        {pricingTiers.premium && (
          <button
            onClick={() => setActiveTab('premium')}
            className={`flex-1 py-3 text-center font-medium text-sm ${
              activeTab === 'premium' 
                ? 'bg-orange-50 text-orange-600 border-b-2 border-orange-500' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            Premium
          </button>
        )}
      </div>
      
      {/* Active Package Content */}
      <div className="p-6">
        {/* Price and Delivery */}
        <div className="flex justify-between items-start mb-4">
          <div>
            <div className="flex items-baseline">
              <span className="text-3xl font-bold text-gray-900">₱{activePricingTier.price.toFixed(0)}</span>
              {activePricingTier.originalPrice && activePricingTier.originalPrice > activePricingTier.price && (
                <span className="ml-2 text-lg text-gray-500 line-through">
                  ₱{activePricingTier.originalPrice.toFixed(0)}
                </span>
              )}
            </div>
            {discount && discount >= 10 && (
              <span className="bg-green-100 text-green-800 text-xs font-semibold px-2.5 py-0.5 rounded">
                {discount}% OFF
              </span>
            )}
          </div>
          <div className="text-right">
            <span className="text-sm text-gray-700">
              {activePricingTier.delivery_time}
            </span>
          </div>
        </div>
        
        {/* Description */}
        <p className="text-gray-700 text-sm mb-6">
          {activePricingTier.description}
        </p>
        
        {/* Features List */}
        <div className="mb-6">
          <div className="flex items-center mb-3">
            <FaCheck className="text-green-500 mr-2" />
            <span className="text-sm text-gray-700">{activePricingTier.delivery_time} Delivery</span>
          </div>
          <div className="flex items-center mb-3">
            <FaCheck className="text-green-500 mr-2" />
            <span className="text-sm text-gray-700">{activePricingTier.revisions} Revisions</span>
          </div>
          {activePricingTier.features.map((feature, index) => (
            <div key={index} className="flex items-center mb-3">
              <FaCheck className="text-green-500 mr-2" />
              <span className="text-sm text-gray-700">{feature}</span>
            </div>
          ))}
        </div>
        
        {/* CTA Button */}
        <button
          onClick={() => onSelectPackage(activeTab)}
          className="w-full py-3 bg-orange-600 hover:bg-orange-700 text-white font-medium rounded-md transition duration-200"
        >
          Continue (₱{activePricingTier.price.toFixed(0)})
        </button>
        
        {/* Compare Packages Link */}
        {(pricingTiers.standard || pricingTiers.premium) && (
          <button className="w-full mt-3 text-sm text-center text-orange-600 hover:text-orange-700">
            Compare Packages
          </button>
        )}
      </div>
    </div>
  );
};

export default ServicePricingCard; 