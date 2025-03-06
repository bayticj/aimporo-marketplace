'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { gigService } from '@/services/api';
import Link from 'next/link';

interface GigFormData {
  title: string;
  description: string;
  category_id: string;
  subcategory: string;
  price: string;
  delivery_time: string;
  requirements: string;
  location: string;
  tags: string[];
  images: File[];
  thumbnail: File | null;
  status: 'draft' | 'published';
  pricing_tiers: {
    basic: {
      title: string;
      description: string;
      price: string;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
    standard: {
      title: string;
      description: string;
      price: string;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
    premium: {
      title: string;
      description: string;
      price: string;
      delivery_time: string;
      revisions: string;
      features: string[];
    };
  };
}

export default function CreateGigPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<GigFormData>({
    title: '',
    description: '',
    category_id: '',
    subcategory: '',
    price: '',
    delivery_time: '',
    requirements: '',
    location: '',
    tags: [],
    images: [],
    thumbnail: null,
    status: 'draft',
    pricing_tiers: {
      basic: {
        title: '',
        description: '',
        price: '',
        delivery_time: '',
        revisions: '',
        features: [],
      },
      standard: {
        title: '',
        description: '',
        price: '',
        delivery_time: '',
        revisions: '',
        features: [],
      },
      premium: {
        title: '',
        description: '',
        price: '',
        delivery_time: '',
        revisions: '',
        features: [],
      },
    },
  });
  const [tagInput, setTagInput] = useState('');
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState([
    { id: '1', name: 'Programming & Tech' },
    { id: '2', name: 'Digital Marketing' },
    { id: '3', name: 'Videography' },
    { id: '4', name: 'Music & Audio' },
    { id: '5', name: 'Graphic Design' },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleTagInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTagInput(e.target.value);
  };

  const addTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      
      // Limit to 10 images total
      const remainingSlots = 10 - formData.images.length;
      if (remainingSlots <= 0) {
        setError('Maximum of 10 images allowed');
        return;
      }
      
      // Only take as many files as we have slots for
      const filesToAdd = filesArray.slice(0, remainingSlots);
      
      // Validate file types and sizes
      const invalidFiles = filesToAdd.filter(file => !file.type.match(/image\/(jpeg|jpg|png|gif|webp)/));
      if (invalidFiles.length > 0) {
        setError('Only image files (JPEG, PNG, GIF, WebP) are allowed');
        return;
      }
      
      // Check file sizes (limit to 5MB each)
      const oversizedFiles = filesToAdd.filter(file => file.size > 5 * 1024 * 1024);
      if (oversizedFiles.length > 0) {
        setError('Images must be less than 5MB each');
        return;
      }
      
      // Create preview URLs
      const newPreviewUrls = filesToAdd.map(file => URL.createObjectURL(file));
      
      // Update state
      setPreviewImages([...previewImages, ...newPreviewUrls]);
      setFormData({
        ...formData,
        images: [...formData.images, ...filesToAdd]
      });
      
      // Clear any previous errors
      setError(null);
    }
  };

  const handleThumbnailUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Validate file type
      if (!file.type.match(/image\/(jpeg|jpg|png|gif|webp)/)) {
        setError('Thumbnail must be an image file (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Check file size (limit to 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('Thumbnail must be less than 5MB');
        return;
      }
      
      // Create preview URL
      const previewUrl = URL.createObjectURL(file);
      
      // Update state
      if (thumbnailPreview) {
        URL.revokeObjectURL(thumbnailPreview);
      }
      setThumbnailPreview(previewUrl);
      setFormData({
        ...formData,
        thumbnail: file
      });
      
      // Clear any previous errors
      setError(null);
    }
  };

  const removeImage = (index: number) => {
    setFormData(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index)
    }));
    
    // Revoke the object URL to avoid memory leaks
    URL.revokeObjectURL(previewImages[index]);
    setPreviewImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeThumbnail = () => {
    setFormData(prev => ({
      ...prev,
      thumbnail: null
    }));
    
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Validate form data
      const validationErrors = validateForm();
      if (validationErrors.length > 0) {
        setError(validationErrors.join(', '));
        setLoading(false);
        return;
      }

      // Create FormData object for file uploads
      const formDataToSend = new FormData();
      
      // Append text fields
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description);
      formDataToSend.append('category_id', formData.category_id);
      formDataToSend.append('subcategory', formData.subcategory);
      formDataToSend.append('price', formData.price);
      formDataToSend.append('delivery_time', formData.delivery_time);
      formDataToSend.append('requirements', formData.requirements);
      formDataToSend.append('location', formData.location);
      formDataToSend.append('status', formData.status);
      
      // Append pricing tiers as JSON
      formDataToSend.append('pricing_tiers', JSON.stringify(formData.pricing_tiers));
      
      // Append tags as JSON
      formDataToSend.append('tags', JSON.stringify(formData.tags));
      
      // Append thumbnail if exists
      if (formData.thumbnail) {
        formDataToSend.append('thumbnail', formData.thumbnail);
      }
      
      // Append images
      formData.images.forEach((image, index) => {
        formDataToSend.append(`images[${index}]`, image);
      });

      // Send the data to the API
      const response = await gigService.createGig(formDataToSend);
      
      // Redirect to the gig page
      router.push(`/gigs/${response.data.id}`);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to create gig. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Form validation function
  const validateForm = (): string[] => {
    const errors: string[] = [];

    if (!formData.title.trim()) errors.push('Title is required');
    if (!formData.description.trim()) errors.push('Description is required');
    if (!formData.category_id) errors.push('Category is required');
    
    // Validate pricing tiers if any are filled out
    const hasPricingTiers = Object.values(formData.pricing_tiers).some(tier => 
      tier.title || tier.price || tier.description
    );

    if (hasPricingTiers) {
      // If using pricing tiers, at least Basic tier must be complete
      const basicTier = formData.pricing_tiers.basic;
      if (!basicTier.title) errors.push('Basic tier title is required');
      if (!basicTier.price) errors.push('Basic tier price is required');
      if (!basicTier.delivery_time) errors.push('Basic tier delivery time is required');
    } else if (!formData.price) {
      // If not using pricing tiers, regular price is required
      errors.push('Price is required');
    }

    // Validate images
    if (formData.images.length === 0) errors.push('At least one image is required');
    if (!formData.thumbnail) errors.push('Thumbnail image is required');

    return errors;
  };

  // Handle pricing tier feature input
  const [tierFeatureInput, setTierFeatureInput] = useState({
    basic: '',
    standard: '',
    premium: ''
  });

  const handleTierChange = (
    tier: 'basic' | 'standard' | 'premium',
    field: string,
    value: string
  ) => {
    setFormData({
      ...formData,
      pricing_tiers: {
        ...formData.pricing_tiers,
        [tier]: {
          ...formData.pricing_tiers[tier],
          [field]: value
        }
      }
    });
  };

  const addTierFeature = (tier: 'basic' | 'standard' | 'premium') => {
    if (tierFeatureInput[tier].trim()) {
      setFormData({
        ...formData,
        pricing_tiers: {
          ...formData.pricing_tiers,
          [tier]: {
            ...formData.pricing_tiers[tier],
            features: [...formData.pricing_tiers[tier].features, tierFeatureInput[tier].trim()]
          }
        }
      });
      setTierFeatureInput({
        ...tierFeatureInput,
        [tier]: ''
      });
    }
  };

  const removeTierFeature = (tier: 'basic' | 'standard' | 'premium', index: number) => {
    const newFeatures = [...formData.pricing_tiers[tier].features];
    newFeatures.splice(index, 1);
    setFormData({
      ...formData,
      pricing_tiers: {
        ...formData.pricing_tiers,
        [tier]: {
          ...formData.pricing_tiers[tier],
          features: newFeatures
        }
      }
    });
  };

  // Toggle between single price and tiered pricing
  const [useTieredPricing, setUseTieredPricing] = useState(false);
  
  // Track active tier for UI
  const [activeTier, setActiveTier] = useState<'basic' | 'standard' | 'premium'>('basic');

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      previewImages.forEach(url => URL.revokeObjectURL(url));
      if (thumbnailPreview) URL.revokeObjectURL(thumbnailPreview);
    };
  }, []);

  return (
    <div className="bg-gray-100 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-4">Create a New Gig</h1>
          <p className="text-gray-600">Share your skills and start earning</p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <p>{error}</p>
          </div>
        )}

        <div className="bg-white p-6 rounded-lg shadow-md">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Gig Title *</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="I will do something I'm really good at"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <select
                  name="category_id"
                  value={formData.category_id}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Subcategory */}
              <div>
                <label className="block text-sm font-medium mb-1">Subcategory</label>
                <input
                  type="text"
                  name="subcategory"
                  value={formData.subcategory}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. Web Development, Logo Design"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Description *</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={6}
                  placeholder="Describe your service in detail..."
                  required
                ></textarea>
              </div>

              {/* Pricing Type Toggle */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Pricing Type</label>
                <div className="flex items-center space-x-4 mt-2">
                  <button
                    type="button"
                    onClick={() => setUseTieredPricing(false)}
                    className={`px-4 py-2 rounded-lg ${!useTieredPricing ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Single Price
                  </button>
                  <button
                    type="button"
                    onClick={() => setUseTieredPricing(true)}
                    className={`px-4 py-2 rounded-lg ${useTieredPricing ? 'bg-orange-600 text-white' : 'bg-gray-200 text-gray-700'}`}
                  >
                    Tiered Pricing
                  </button>
                </div>
              </div>

              {/* Single Price Option */}
              {!useTieredPricing && (
                <>
                  {/* Price */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Price ($) *</label>
                    <input
                      type="number"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. 50"
                      min="1"
                      step="0.01"
                      required={!useTieredPricing}
                    />
                  </div>

                  {/* Delivery Time */}
                  <div>
                    <label className="block text-sm font-medium mb-1">Delivery Time (days) *</label>
                    <input
                      type="number"
                      name="delivery_time"
                      value={formData.delivery_time}
                      onChange={handleChange}
                      className="w-full p-2 border border-gray-300 rounded-lg"
                      placeholder="e.g. 3"
                      min="1"
                      required={!useTieredPricing}
                    />
                  </div>
                </>
              )}

              {/* Tiered Pricing Option */}
              {useTieredPricing && (
                <div className="md:col-span-2">
                  <div className="bg-gray-50 p-4 rounded-lg mb-4">
                    <h3 className="text-lg font-semibold mb-4">Pricing Tiers</h3>
                    
                    {/* Tier Tabs */}
                    <div className="mb-6">
                      <div className="flex border-b">
                        <button
                          type="button"
                          onClick={() => setActiveTier('basic')}
                          className={`py-2 px-4 ${activeTier === 'basic' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Basic
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTier('standard')}
                          className={`py-2 px-4 ${activeTier === 'standard' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Standard
                        </button>
                        <button
                          type="button"
                          onClick={() => setActiveTier('premium')}
                          className={`py-2 px-4 ${activeTier === 'premium' ? 'border-b-2 border-orange-600 text-orange-600' : 'text-gray-500 hover:text-gray-700'}`}
                        >
                          Premium
                        </button>
                      </div>
                    </div>

                    {/* Basic Tier */}
                    {activeTier === 'basic' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title *</label>
                          <input
                            type="text"
                            value={formData.pricing_tiers.basic.title}
                            onChange={(e) => handleTierChange('basic', 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. Basic Package"
                            required={useTieredPricing}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Price ($) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.basic.price}
                            onChange={(e) => handleTierChange('basic', 'price', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 50"
                            min="1"
                            step="0.01"
                            required={useTieredPricing}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Delivery Time (days) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.basic.delivery_time}
                            onChange={(e) => handleTierChange('basic', 'delivery_time', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 3"
                            min="1"
                            required={useTieredPricing}
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.basic.revisions}
                            onChange={(e) => handleTierChange('basic', 'revisions', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 2"
                            min="0"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea
                            value={formData.pricing_tiers.basic.description}
                            onChange={(e) => handleTierChange('basic', 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="Describe what's included in this package..."
                          ></textarea>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Features</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={tierFeatureInput.basic}
                              onChange={(e) => setTierFeatureInput({...tierFeatureInput, basic: e.target.value})}
                              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                              placeholder="e.g. 1 page design"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTierFeature('basic'))}
                            />
                            <button
                              type="button"
                              onClick={() => addTierFeature('basic')}
                              className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.pricing_tiers.basic.features.map((feature, index) => (
                              <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                <span>{feature}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTierFeature('basic', index)}
                                  className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Standard Tier */}
                    {activeTier === 'standard' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title *</label>
                          <input
                            type="text"
                            value={formData.pricing_tiers.standard.title}
                            onChange={(e) => handleTierChange('standard', 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. Standard Package"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Price ($) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.standard.price}
                            onChange={(e) => handleTierChange('standard', 'price', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 100"
                            min="1"
                            step="0.01"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Delivery Time (days) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.standard.delivery_time}
                            onChange={(e) => handleTierChange('standard', 'delivery_time', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 5"
                            min="1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.standard.revisions}
                            onChange={(e) => handleTierChange('standard', 'revisions', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 5"
                            min="0"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea
                            value={formData.pricing_tiers.standard.description}
                            onChange={(e) => handleTierChange('standard', 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="Describe what's included in this package..."
                          ></textarea>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Features</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={tierFeatureInput.standard}
                              onChange={(e) => setTierFeatureInput({...tierFeatureInput, standard: e.target.value})}
                              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                              placeholder="e.g. 3 page designs"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTierFeature('standard'))}
                            />
                            <button
                              type="button"
                              onClick={() => addTierFeature('standard')}
                              className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.pricing_tiers.standard.features.map((feature, index) => (
                              <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                <span>{feature}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTierFeature('standard', index)}
                                  className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Premium Tier */}
                    {activeTier === 'premium' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-1">Title *</label>
                          <input
                            type="text"
                            value={formData.pricing_tiers.premium.title}
                            onChange={(e) => handleTierChange('premium', 'title', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. Premium Package"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Price ($) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.premium.price}
                            onChange={(e) => handleTierChange('premium', 'price', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 200"
                            min="1"
                            step="0.01"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Delivery Time (days) *</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.premium.delivery_time}
                            onChange={(e) => handleTierChange('premium', 'delivery_time', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. 7"
                            min="1"
                          />
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium mb-1">Revisions</label>
                          <input
                            type="number"
                            value={formData.pricing_tiers.premium.revisions}
                            onChange={(e) => handleTierChange('premium', 'revisions', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            placeholder="e.g. Unlimited"
                            min="0"
                          />
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Description</label>
                          <textarea
                            value={formData.pricing_tiers.premium.description}
                            onChange={(e) => handleTierChange('premium', 'description', e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded-lg"
                            rows={3}
                            placeholder="Describe what's included in this package..."
                          ></textarea>
                        </div>
                        
                        <div className="md:col-span-2">
                          <label className="block text-sm font-medium mb-1">Features</label>
                          <div className="flex items-center">
                            <input
                              type="text"
                              value={tierFeatureInput.premium}
                              onChange={(e) => setTierFeatureInput({...tierFeatureInput, premium: e.target.value})}
                              className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                              placeholder="e.g. Complete website"
                              onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTierFeature('premium'))}
                            />
                            <button
                              type="button"
                              onClick={() => addTierFeature('premium')}
                              className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700"
                            >
                              Add
                            </button>
                          </div>
                          <div className="flex flex-wrap gap-2 mt-2">
                            {formData.pricing_tiers.premium.features.map((feature, index) => (
                              <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                                <span>{feature}</span>
                                <button
                                  type="button"
                                  onClick={() => removeTierFeature('premium', index)}
                                  className="ml-2 text-gray-600 hover:text-gray-800"
                                >
                                  &times;
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* Location */}
              <div>
                <label className="block text-sm font-medium mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  placeholder="e.g. New York, Remote"
                />
              </div>

              {/* Requirements */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Requirements from Buyers</label>
                <textarea
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-lg"
                  rows={4}
                  placeholder="What do you need from the buyer to get started?"
                ></textarea>
              </div>

              {/* Tags */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Tags</label>
                <div className="flex items-center">
                  <input
                    type="text"
                    value={tagInput}
                    onChange={handleTagInputChange}
                    className="flex-grow p-2 border border-gray-300 rounded-l-lg"
                    placeholder="e.g. wordpress, logo, seo"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addTag())}
                  />
                  <button
                    type="button"
                    onClick={addTag}
                    className="bg-orange-600 text-white px-4 py-2 rounded-r-lg hover:bg-orange-700"
                  >
                    Add
                  </button>
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {formData.tags.map((tag, index) => (
                    <div key={index} className="bg-gray-200 px-3 py-1 rounded-full flex items-center">
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => removeTag(tag)}
                        className="ml-2 text-gray-600 hover:text-gray-800"
                      >
                        &times;
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Thumbnail */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Thumbnail Image *</label>
                <p className="text-sm text-gray-500 mb-2">This will be the main image displayed in search results</p>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailUpload}
                    className="hidden"
                    id="thumbnail-upload"
                  />
                  <label
                    htmlFor="thumbnail-upload"
                    className="cursor-pointer bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center"
                  >
                    {thumbnailPreview ? (
                      <div className="relative">
                        <img
                          src={thumbnailPreview}
                          alt="Thumbnail preview"
                          className="w-full h-40 object-cover rounded-lg"
                        />
                        <button
                          type="button"
                          onClick={(e) => {
                            e.preventDefault();
                            removeThumbnail();
                          }}
                          className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                        >
                          &times;
                        </button>
                      </div>
                    ) : (
                      <>
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                          ></path>
                        </svg>
                        <p className="mt-2 text-sm text-gray-500">Click to upload thumbnail</p>
                      </>
                    )}
                  </label>
                </div>
              </div>

              {/* Gallery Images */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium mb-1">Portfolio Images *</label>
                <p className="text-sm text-gray-500 mb-2">Upload high-quality images showcasing your work (max 10 images)</p>
                <div className="mt-2">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="gallery-upload"
                    disabled={formData.images.length >= 10}
                  />
                  <label
                    htmlFor="gallery-upload"
                    className={`cursor-pointer bg-white border border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center ${formData.images.length >= 10 ? 'opacity-50' : ''}`}
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      ></path>
                    </svg>
                    <p className="mt-2 text-sm text-gray-500">
                      {formData.images.length >= 10 
                        ? 'Maximum number of images reached' 
                        : 'Click to upload portfolio images'}
                    </p>
                  </label>
                </div>
                {previewImages.length > 0 && (
                  <>
                    <p className="text-sm text-gray-500 mt-4 mb-2">
                      {previewImages.length} of 10 images uploaded
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-2">
                      {previewImages.map((preview, index) => (
                        <div key={index} className="relative">
                          <img
                            src={preview}
                            alt={`Preview ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => removeImage(index)}
                            className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center"
                          >
                            &times;
                          </button>
                          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs py-1 px-2 rounded-b-lg">
                            Image {index + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>

            <div className="mt-8 flex justify-end space-x-4">
              <Link
                href="/gigs"
                className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </Link>
              <button
                type="button"
                onClick={() => {
                  setFormData({...formData, status: 'draft'});
                  setTimeout(() => {
                    const form = document.querySelector('form');
                    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }, 100);
                }}
                className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading && formData.status === 'draft' ? 'Saving...' : 'Save as Draft'}
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData({...formData, status: 'published'});
                  setTimeout(() => {
                    const form = document.querySelector('form');
                    if (form) form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
                  }, 100);
                }}
                className="px-6 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 disabled:opacity-50"
                disabled={loading}
              >
                {loading && formData.status === 'published' ? 'Publishing...' : 'Publish Gig'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 