'use client';

import React, { useState, useEffect } from 'react';
import { getDigitalProduct, purchaseDigitalProduct, getPreview, DigitalProduct } from '@/services/digitalProductService';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

interface DigitalProductPageProps {
  params: {
    id: string;
  };
}

const DigitalProductPage: React.FC<DigitalProductPageProps> = ({ params }) => {
  const { id } = params;
  const [product, setProduct] = useState<DigitalProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(false);
  const [purchaseError, setPurchaseError] = useState<string | null>(null);
  
  const router = useRouter();
  const { user } = useAuth();
  
  // Format file size for display
  const formatFileSize = (sizeInBytes: string) => {
    const size = parseInt(sizeInBytes);
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(1)} KB`;
    if (size < 1024 * 1024 * 1024) return `${(size / (1024 * 1024)).toFixed(1)} MB`;
    return `${(size / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  };
  
  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getDigitalProduct(parseInt(id));
        setProduct(response.data);
      } catch (err) {
        console.error('Error fetching digital product:', err);
        setError('Failed to load digital product. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]);
  
  const handlePurchase = async () => {
    if (!user) {
      router.push(`/login?redirect=/digital-products/${id}`);
      return;
    }
    
    setPurchasing(true);
    setPurchaseError(null);
    
    try {
      const response = await purchaseDigitalProduct(parseInt(id));
      setPurchaseSuccess(true);
      
      // Redirect to purchases page after a short delay
      setTimeout(() => {
        router.push('/account/purchases');
      }, 3000);
    } catch (err) {
      console.error('Error purchasing digital product:', err);
      setPurchaseError('Failed to purchase digital product. Please try again later.');
    } finally {
      setPurchasing(false);
    }
  };
  
  const handlePreview = async () => {
    try {
      const blob = await getPreview(parseInt(id));
      const url = URL.createObjectURL(blob);
      window.open(url, '_blank');
    } catch (err) {
      console.error('Error getting preview:', err);
      alert('Failed to load preview. Please try again later.');
    }
  };
  
  // Get preview image or placeholder
  const previewImage = product?.preview_path 
    ? `${process.env.NEXT_PUBLIC_API_URL}/storage/${product.preview_path}`
    : '/assets/img/placeholder.jpg';

  // Generate a deterministic avatar number based on the product ID or seller name
  const getAvatarNumber = (productId: number, sellerName: string) => {
    // Use the product ID if available, otherwise hash the seller name
    const hashValue = productId || sellerName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    // Ensure it's between 1 and 10 (we have 10 avatar images)
    return (hashValue % 10) + 1;
  };

  if (loading) {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center py-5">
              <div className="spinner-border text-primary" role="status">
                <span className="visually-hidden">Loading...</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  if (error || !product) {
    return (
      <div className="content">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="alert alert-danger" role="alert">
                {error || 'Product not found'}
              </div>
              <div className="text-center mt-4">
                <Link href="/digital-products" className="btn btn-primary">
                  Back to Digital Products
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  // Check if the current user is the owner of the product
  const isOwner = user && user.id === product.user_id;

  return (
    <div className="content">
      <div className="container">
        {purchaseSuccess && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="alert alert-success" role="alert">
                <h4 className="alert-heading">Purchase Successful!</h4>
                <p>Thank you for your purchase. You will be redirected to your purchases page shortly.</p>
              </div>
            </div>
          </div>
        )}
        
        {purchaseError && (
          <div className="row mb-4">
            <div className="col-md-12">
              <div className="alert alert-danger" role="alert">
                {purchaseError}
              </div>
            </div>
          </div>
        )}
        
        <div className="row">
          {/* Product Preview */}
          <div className="col-lg-6">
            <div className="product-preview">
              <div className="product-img">
                <div className="relative h-96 w-full overflow-hidden rounded-lg">
                  <Image 
                    src={previewImage} 
                    alt={product.title} 
                    fill
                    style={{ objectFit: 'cover' }}
                    className="rounded-lg"
                  />
                </div>
                
                {product.is_featured && (
                  <div className="featured-badge">
                    <span className="badge bg-primary">Featured</span>
                  </div>
                )}
                
                {product.preview_path && (
                  <div className="preview-button">
                    <button 
                      className="btn btn-outline-primary"
                      onClick={handlePreview}
                    >
                      <i className="fas fa-eye me-2"></i>
                      Preview
                    </button>
                  </div>
                )}
              </div>
              
              <div className="product-details mt-4">
                <div className="file-info">
                  <div className="file-type">
                    <i className="fas fa-file me-2"></i>
                    <span>{product.file_type.split('/')[1]?.toUpperCase() || 'FILE'}</span>
                  </div>
                  <div className="file-size">
                    <i className="fas fa-weight-hanging me-2"></i>
                    <span>{formatFileSize(product.file_size)}</span>
                  </div>
                  {product.download_limit && (
                    <div className="download-limit">
                      <i className="fas fa-download me-2"></i>
                      <span>Limited to {product.download_limit} downloads</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
          
          {/* Product Info */}
          <div className="col-lg-6">
            <div className="product-info">
              <h1 className="product-title">{product.title}</h1>
              
              <div className="seller-info d-flex align-items-center mt-3 mb-4">
                <div className="seller-avatar me-3">
                  <Image 
                    src={`/assets/img/profiles/avatar-${getAvatarNumber(parseInt(params.id), product.user?.name || 'Seller')}.jpg`} 
                    alt={product.user?.name || 'Seller'}
                    width={44}
                    height={44}
                    className="rounded-circle"
                  />
                </div>
                <div className="seller-details">
                  <h5 className="seller-name mb-0">
                    {product.user?.name || 'Unknown Seller'}
                  </h5>
                  <span className="seller-type text-muted">Digital Creator</span>
                </div>
              </div>
              
              <div className="product-price mb-4">
                <span className="price-label">Price:</span>
                <span className="price-value">${product.price.toFixed(2)}</span>
              </div>
              
              <div className="product-description mb-4">
                <h4>Description</h4>
                <p>{product.description}</p>
              </div>
              
              <div className="product-categories mb-4">
                <h4>Categories</h4>
                <div className="categories-list">
                  {product.categories && product.categories.length > 0 ? (
                    <div className="d-flex flex-wrap gap-2">
                      {product.categories.map(category => (
                        <Link 
                          key={category.id} 
                          href={`/digital-products?category=${category.slug}`}
                          className="badge bg-light text-dark"
                        >
                          {category.name}
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <span className="text-muted">No categories</span>
                  )}
                </div>
              </div>
              
              <div className="product-actions">
                {isOwner ? (
                  <div className="owner-actions">
                    <div className="alert alert-info" role="alert">
                      <i className="fas fa-info-circle me-2"></i>
                      You are the owner of this digital product.
                    </div>
                    <Link 
                      href={`/account/digital-products/edit/${product.id}`}
                      className="btn btn-outline-primary me-3"
                    >
                      <i className="fas fa-edit me-2"></i>
                      Edit Product
                    </Link>
                    <Link 
                      href="/account/digital-products"
                      className="btn btn-outline-secondary"
                    >
                      <i className="fas fa-list me-2"></i>
                      My Products
                    </Link>
                  </div>
                ) : (
                  <button 
                    className="btn btn-primary btn-lg"
                    onClick={handlePurchase}
                    disabled={purchasing}
                  >
                    {purchasing ? (
                      <>
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                        Processing...
                      </>
                    ) : (
                      <>
                        <i className="fas fa-shopping-cart me-2"></i>
                        Buy Now
                      </>
                    )}
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Related Products */}
        {/* This would be implemented in a future update */}
      </div>
    </div>
  );
};

export default DigitalProductPage; 