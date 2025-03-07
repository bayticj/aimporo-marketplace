'use client';

import React, { useState, useEffect } from 'react';
import { getDigitalProducts, getDigitalProductCategories, DigitalProduct, DigitalProductCategory } from '@/services/digitalProductService';
import DigitalProductCard from '@/components/DigitalProductCard';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';
import { useSearchParams, useRouter } from 'next/navigation';

const DigitalProductsPage = () => {
  const [products, setProducts] = useState<DigitalProduct[]>([]);
  const [categories, setCategories] = useState<DigitalProductCategory[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const category = searchParams.get('category');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteDigitalProducts');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Fetch categories
    const fetchCategories = async () => {
      try {
        const response = await getDigitalProductCategories();
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
      }
    };
    
    fetchCategories();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const params: any = {
          page: page,
          per_page: 12,
        };
        
        if (category) {
          params.category = category;
        }
        
        if (search) {
          params.search = search;
        }
        
        if (sort) {
          const [sortBy, sortOrder] = sort.split('-');
          params.sort_by = sortBy;
          params.sort_order = sortOrder;
        }
        
        const response = await getDigitalProducts(params);
        
        if (response.success && response.data) {
          setProducts(response.data.data);
          setTotalPages(response.data.last_page);
          setCurrentPage(response.data.current_page);
        } else {
          setError('Failed to load digital products. Please try again later.');
          // Use mock data as fallback
          setProducts(getMockDigitalProducts());
          setTotalPages(3);
          setCurrentPage(page);
        }
      } catch (err: any) {
        console.error('Error fetching digital products:', err);
        setError(err.message || 'Failed to load digital products. Please try again later.');
        
        // Use mock data as fallback
        setProducts(getMockDigitalProducts());
        setTotalPages(3);
        setCurrentPage(page);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [category, search, sort, page]);
  
  const handleToggleFavorite = (id: number) => {
    setFavorites(prevFavorites => {
      const newFavorites = prevFavorites.includes(id)
        ? prevFavorites.filter(favId => favId !== id)
        : [...prevFavorites, id];
      
      // Save to localStorage
      localStorage.setItem('favoriteDigitalProducts', JSON.stringify(newFavorites));
      
      return newFavorites;
    });
  };
  
  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', page.toString());
    router.push(`/digital-products?${params.toString()}`);
  };
  
  const handleCategoryChange = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug) {
      params.set('category', categorySlug);
    } else {
      params.delete('category');
    }
    params.delete('page'); // Reset to page 1
    router.push(`/digital-products?${params.toString()}`);
  };
  
  const handleSortChange = (sortValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    params.delete('page'); // Reset to page 1
    router.push(`/digital-products?${params.toString()}`);
  };
  
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const searchTerm = formData.get('search') as string;
    
    const params = new URLSearchParams(searchParams.toString());
    if (searchTerm) {
      params.set('search', searchTerm);
    } else {
      params.delete('search');
    }
    params.delete('page'); // Reset to page 1
    router.push(`/digital-products?${params.toString()}`);
  };

  // Function to generate mock digital products
  const getMockDigitalProducts = (): DigitalProduct[] => {
    return Array.from({ length: 12 }, (_, i) => ({
      id: i + 1,
      user_id: 1,
      title: `Digital Product ${i + 1}`,
      description: `This is a description for digital product ${i + 1}. It includes all the details about the product.`,
      price: Math.floor(Math.random() * 100) + 5,
      file_path: '/path/to/file.zip',
      file_name: 'product-file.zip',
      file_size: '2.5 MB',
      file_type: 'application/zip',
      preview_path: null,
      download_limit: null,
      is_featured: i < 3,
      status: 'published',
      created_at: '2023-01-01',
      updated_at: '2023-01-01',
      user: {
        id: 1,
        name: 'John Doe',
        email: 'john@example.com'
      },
      categories: [
        { id: (i % 5) + 1, name: ['E-books', 'Templates', 'Software', 'Graphics', 'Audio'][i % 5], slug: ['e-books', 'templates', 'software', 'graphics', 'audio'][i % 5], description: 'Category description', icon: 'icon', is_active: true, created_at: '2023-01-01', updated_at: '2023-01-01' }
      ]
    }));
  };

  return (
    <div>
      <PageBanner
        title="Digital Products"
        subtitle="Download high-quality digital assets instantly"
        backgroundImage="/assets/img/bg/digital-products-banner.jpg"
      />
      
      <div className="content">
        <div className="container">
          <div className="row">
            {/* Sidebar Filters */}
            <div className="col-lg-3 col-md-4 sidebar-col">
              <div className="card filter-card">
                <div className="card-body">
                  <h4 className="card-title">Filters</h4>
                  
                  {/* Search */}
                  <div className="filter-widget">
                    <h4 className="filter-title">Search</h4>
                    <form onSubmit={handleSearch}>
                      <div className="input-group">
                        <input
                          type="text"
                          name="search"
                          className="form-control"
                          placeholder="Search products..."
                          defaultValue={search || ''}
                        />
                        <button type="submit" className="btn btn-primary">
                          <i className="fas fa-search"></i>
                        </button>
                      </div>
                    </form>
                  </div>
                  
                  {/* Categories */}
                  <div className="filter-widget">
                    <h4 className="filter-title">Categories</h4>
                    <div>
                      <div className="form-group">
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="category"
                            checked={!category}
                            onChange={() => handleCategoryChange(null)}
                          />
                          <span className="checkmark"></span>
                          All Categories
                        </label>
                      </div>
                      
                      {categories.map(cat => (
                        <div className="form-group" key={cat.id}>
                          <label className="custom-radio">
                            <input
                              type="radio"
                              name="category"
                              checked={category === cat.slug}
                              onChange={() => handleCategoryChange(cat.slug)}
                            />
                            <span className="checkmark"></span>
                            {cat.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Sort By */}
                  <div className="filter-widget">
                    <h4 className="filter-title">Sort By</h4>
                    <div>
                      <div className="form-group">
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="sort"
                            checked={!sort}
                            onChange={() => handleSortChange(null)}
                          />
                          <span className="checkmark"></span>
                          Newest
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="sort"
                            checked={sort === 'price_asc'}
                            onChange={() => handleSortChange('price_asc')}
                          />
                          <span className="checkmark"></span>
                          Price: Low to High
                        </label>
                      </div>
                      <div className="form-group">
                        <label className="custom-radio">
                          <input
                            type="radio"
                            name="sort"
                            checked={sort === 'price_desc'}
                            onChange={() => handleSortChange('price_desc')}
                          />
                          <span className="checkmark"></span>
                          Price: High to Low
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Products Grid */}
            <div className="col-lg-9 col-md-8">
              <div className="row">
                <div className="col-md-12">
                  <div className="grid-header">
                    <div className="row align-items-center">
                      <div className="col-6">
                        <div className="result-count">
                          Showing {products.length} products
                        </div>
                      </div>
                      <div className="col-6 text-end">
                        <div className="sort-by">
                          <span>View:</span>
                          <div className="view-icons">
                            <a href="#" className="grid-view active">
                              <i className="fas fa-th"></i>
                            </a>
                            <a href="#" className="list-view">
                              <i className="fas fa-bars"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {loading ? (
                <div className="row">
                  <div className="col-md-12 text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                      <span className="visually-hidden">Loading...</span>
                    </div>
                  </div>
                </div>
              ) : error ? (
                <div className="row">
                  <div className="col-md-12">
                    <div className="alert alert-danger" role="alert">
                      {error}
                    </div>
                  </div>
                </div>
              ) : products.length === 0 ? (
                <div className="row">
                  <div className="col-md-12">
                    <div className="alert alert-info" role="alert">
                      No digital products found. Try adjusting your filters.
                    </div>
                  </div>
                </div>
              ) : (
                <div className="row">
                  {products.map(product => (
                    <div className="col-lg-4 col-md-6 col-sm-6" key={product.id}>
                      <DigitalProductCard
                        product={product}
                        isFavorite={favorites.includes(product.id)}
                        onToggleFavorite={handleToggleFavorite}
                      />
                    </div>
                  ))}
                </div>
              )}
              
              {/* Pagination */}
              {totalPages > 1 && (
                <div className="row">
                  <div className="col-md-12">
                    <div className="pagination-wrapper">
                      <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DigitalProductsPage; 