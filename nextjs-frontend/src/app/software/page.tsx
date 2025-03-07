'use client';

import React, { useState, useEffect } from 'react';
import { getSoftwareProducts, getPartners, SoftwareProduct } from '@/services/softwareService';
import SoftwareProductCard from '@/components/SoftwareProductCard';
import PageBanner from '@/components/PageBanner';
import Pagination from '@/components/Pagination';
import { useSearchParams, useRouter } from 'next/navigation';

const SoftwareProductsPage = () => {
  const [products, setProducts] = useState<SoftwareProduct[]>([]);
  const [partners, setPartners] = useState<{id: number, name: string}[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const partner = searchParams.get('partner');
  const search = searchParams.get('search');
  const sort = searchParams.get('sort');
  const page = searchParams.get('page') ? parseInt(searchParams.get('page') as string) : 1;
  const hasLifetime = searchParams.get('has_lifetime') === 'true';
  
  useEffect(() => {
    // Load favorites from localStorage
    const savedFavorites = localStorage.getItem('favoriteSoftwareProducts');
    if (savedFavorites) {
      setFavorites(JSON.parse(savedFavorites));
    }
    
    // Fetch partners
    const fetchPartners = async () => {
      try {
        const response = await getPartners();
        setPartners(response.data);
      } catch (err) {
        console.error('Error fetching partners:', err);
        // Don't set error state here to allow the page to still function
      }
    };
    
    fetchPartners();
  }, []);
  
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await getSoftwareProducts({
          page: page,
          per_page: 12,
          search: search || undefined,
          partner_id: partner || undefined,
          sort_by: sort ? sort.split('-')[0] : undefined,
          sort_order: sort ? sort.split('-')[1] as 'asc' | 'desc' : undefined,
          has_lifetime: hasLifetime || undefined
        });
        
        setProducts(response.data);
        setTotalPages(response.last_page);
        setCurrentPage(response.current_page);
      } catch (err: any) {
        console.error('Error fetching software products:', err);
        setError(err.message || 'Failed to load software products. Please try again later.');
        
        // Use mock data as fallback
        const mockData = getMockSoftwareProducts();
        setProducts(mockData);
        setTotalPages(3);
        setCurrentPage(page);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProducts();
  }, [page, search, partner, sort, hasLifetime]);
  
  const handlePageChange = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('page', newPage.toString());
    router.push(`/software?${params.toString()}`);
  };
  
  const handleToggleFavorite = (id: number) => {
    const newFavorites = favorites.includes(id)
      ? favorites.filter(favId => favId !== id)
      : [...favorites, id];
    
    setFavorites(newFavorites);
    localStorage.setItem('favoriteSoftwareProducts', JSON.stringify(newFavorites));
  };
  
  // Mock data for fallback
  const getMockSoftwareProducts = (): SoftwareProduct[] => {
    return [
      {
        id: 1,
        name: 'Design Pro Suite',
        slug: 'design-pro-suite',
        description: 'Professional design software for graphic designers and artists',
        short_description: 'Professional design software for graphic designers and artists',
        logo_path: '/assets/img/software/design-pro-logo.png',
        screenshots: ['/assets/img/software/design-pro-1.jpg'],
        version: '2.5.1',
        partner_id: 1,
        partner_name: 'Design Pro Tools',
        is_active: true,
        plans: [
          {
            id: 1,
            name: 'Basic',
            description: 'Essential tools for beginners',
            price: 49.99,
            duration_days: 365,
            features: ['Basic design tools', 'Standard templates', 'Email support'],
            is_active: true
          }
        ],
        created_at: '2023-01-01',
        updated_at: '2023-01-01'
      },
      // Add more mock products as needed
    ];
  };
  
  const handlePartnerChange = (partnerId: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (partnerId) {
      params.set('partner', partnerId);
    } else {
      params.delete('partner');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };
  
  const handleSortChange = (sortValue: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (sortValue) {
      params.set('sort', sortValue);
    } else {
      params.delete('sort');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
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
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };
  
  const handleLifetimeToggle = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (hasLifetime) {
      params.delete('has_lifetime');
    } else {
      params.set('has_lifetime', 'true');
    }
    params.delete('page');
    router.push(`/software?${params.toString()}`);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <PageBanner 
        title="Software Products" 
        subtitle="Discover premium software solutions for your business and personal needs"
        bgImage="/assets/img/banners/software-banner.jpg"
      />
      
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6">
            <h3 className="text-lg font-semibold mb-4">Filters</h3>
            
            {/* Search */}
            <div className="mb-6">
              <form onSubmit={handleSearch}>
                <div className="relative">
                  <input
                    type="text"
                    name="search"
                    placeholder="Search software..."
                    defaultValue={search || ''}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
                  />
                  <button
                    type="submit"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-orange-500"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <circle cx="11" cy="11" r="8" />
                      <path d="M21 21l-4.35-4.35" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
            
            {/* Partners Filter */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Partners</h4>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="all-partners"
                    name="partner"
                    checked={!partner}
                    onChange={() => handlePartnerChange(null)}
                    className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="all-partners" className="ml-2 text-sm text-gray-700">
                    All Partners
                  </label>
                </div>
                
                {partners.map((p) => (
                  <div key={p.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`partner-${p.id}`}
                      name="partner"
                      checked={partner === p.id.toString()}
                      onChange={() => handlePartnerChange(p.id.toString())}
                      className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                    />
                    <label htmlFor={`partner-${p.id}`} className="ml-2 text-sm text-gray-700">
                      {p.name}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Lifetime Option */}
            <div className="mb-6">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="lifetime"
                  checked={hasLifetime}
                  onChange={handleLifetimeToggle}
                  className="h-4 w-4 text-orange-600 focus:ring-orange-500"
                />
                <label htmlFor="lifetime" className="ml-2 text-sm text-gray-700">
                  Lifetime Plans Only
                </label>
              </div>
            </div>
            
            {/* Sort By */}
            <div className="mb-6">
              <h4 className="font-medium mb-2">Sort By</h4>
              <select
                value={sort || 'newest'}
                onChange={(e) => handleSortChange(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            
            {/* Reset Filters */}
            <button
              onClick={() => router.push('/software')}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Reset Filters
            </button>
          </div>
        </div>
        
        {/* Products Grid */}
        <div className="lg:col-span-3">
          {/* Results Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold">
              {loading ? 'Loading...' : `${products.length} Software Products`}
            </h2>
          </div>
          
          {/* Error Message */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-lg mb-6">
              {error}
            </div>
          )}
          
          {/* Loading State */}
          {loading && (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-orange-500"></div>
            </div>
          )}
          
          {/* No Results */}
          {!loading && products.length === 0 && (
            <div className="bg-gray-100 p-8 rounded-lg text-center">
              <h3 className="text-lg font-semibold mb-2">No software products found</h3>
              <p className="text-gray-600 mb-4">Try adjusting your filters or search terms</p>
              <button
                onClick={() => router.push('/software')}
                className="px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
              >
                Clear Filters
              </button>
            </div>
          )}
          
          {/* Products Grid */}
          {!loading && products.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <SoftwareProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  slug={product.slug}
                  description={product.description}
                  short_description={product.short_description}
                  logo_path={product.logo_path}
                  screenshots={product.screenshots}
                  version={product.version}
                  partner_name={product.partner_name}
                  is_active={product.is_active}
                  plans={product.plans}
                  isFavorite={favorites.includes(product.id)}
                  onToggleFavorite={handleToggleFavorite}
                />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8">
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SoftwareProductsPage; 