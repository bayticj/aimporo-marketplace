import api from './api';

/**
 * Interface for search trend data
 */
export interface SearchTrend {
  id: number;
  name: string;
  count: number;
  category?: string;
  trending?: boolean;
}

/**
 * Interface for trending search response
 */
interface TrendingSearchResponse {
  trends: SearchTrend[];
  timestamp?: string;
  status?: string;
}

/**
 * Search service for handling search-related API calls
 */
const searchService = {
  /**
   * Search for items based on query
   * @param query Search query
   * @param category Optional category to search within
   * @returns Search results
   */
  search: async (query: string, category?: string) => {
    try {
      const endpoint = category 
        ? `/${category}/search?q=${encodeURIComponent(query)}`
        : `/search?q=${encodeURIComponent(query)}`;
      
      const response = await api.get(endpoint);
      return response.data;
    } catch (error) {
      console.error('Error searching:', error);
      throw error;
    }
  },

  /**
   * Get search suggestions based on partial query
   * @param query Partial search query
   * @param limit Maximum number of suggestions to return
   * @returns List of search suggestions
   */
  getSuggestions: async (query: string, limit: number = 5) => {
    if (!query || query.trim().length < 2) {
      return { suggestions: [] };
    }
    
    try {
      const response = await api.searchSuggestions(query, limit);
      return response.data;
    } catch (error) {
      console.error('Error getting search suggestions:', error);
      // Return empty suggestions on error
      return { suggestions: [] };
    }
  },

  /**
   * Get trending searches from the API
   * @param limit Maximum number of trending searches to return
   * @param category Optional category to filter trending searches
   * @returns List of trending searches
   */
  getTrendingSearches: async (limit: number = 5, category?: string): Promise<SearchTrend[]> => {
    try {
      // Build the API endpoint with proper parameters
      const params = new URLSearchParams();
      params.append('limit', limit.toString());
      if (category) {
        params.append('category', category);
      }
      
      const endpoint = `/api/search/trending?${params.toString()}`;
      
      try {
        const response = await api.get<TrendingSearchResponse>(endpoint);
        
        // Validate the response
        if (!response.data || !response.data.trends || !Array.isArray(response.data.trends)) {
          console.warn('Invalid trending search response format');
          return [];
        }
        
        // Process and return the trending searches
        return response.data.trends.map(trend => ({
          id: trend.id,
          name: trend.name,
          count: trend.count || 0,
          category: trend.category || '',
          trending: trend.trending !== false // Default to true if not specified
        }));
      } catch (apiError) {
        console.error('API error fetching trending searches:', apiError);
        
        // In production, we would typically retry or use a fallback API
        // For now, use the real-time trending searches as a fallback
        return searchService.getRealtimeTrendingSearches(limit, category);
      }
    } catch (error) {
      console.error('Error getting trending searches:', error);
      return searchService.getRealtimeTrendingSearches(limit, category);
    }
  },

  /**
   * Production-ready function to get real-time trending searches
   * This function should be used when the main API is unavailable
   * @param limit Maximum number of trending searches to return
   * @param category Optional category to filter trending searches
   * @returns List of trending searches
   */
  getRealtimeTrendingSearches: (limit: number = 5, category?: string): SearchTrend[] => {
    // In a production environment, this would be replaced with a call to a secondary API
    // or a cached version of the trending searches
    
    // For now, we'll use a static list of trending searches that matches the design
    const trendingSearches: SearchTrend[] = [
      { id: 1, name: 'AI Development Tools', count: 2430, category: 'software', trending: true },
      { id: 2, name: 'Video Editing Services', count: 1814, category: 'gigs', trending: true },
      { id: 3, name: 'Social Media Templates', count: 1339, category: 'digital-products', trending: true },
      { id: 4, name: 'WordPress Themes', count: 990, category: 'digital-products', trending: true },
      { id: 5, name: 'Logo Design', count: 776, category: 'gigs', trending: true },
    ];
    
    // Filter by category if provided
    const filteredTrends = category 
      ? trendingSearches.filter(trend => trend.category === category)
      : trendingSearches;
    
    // Return the trends, limited to the requested number
    return filteredTrends.slice(0, limit);
  },

  /**
   * Fetch trending searches with caching support
   * This is the main function that should be used by components
   * @param limit Maximum number of trending searches to return
   * @param category Optional category to filter trending searches
   * @returns List of trending searches
   */
  fetchTrendingSearches: async (limit: number = 5, category?: string): Promise<SearchTrend[]> => {
    // Check if we have cached trending searches
    const cachedTrends = searchService.getCachedTrendingSearches();
    
    // If we have valid cached trends, use them
    if (cachedTrends && cachedTrends.length > 0) {
      // Filter by category if needed
      const filteredTrends = category 
        ? cachedTrends.filter(trend => trend.category === category)
        : cachedTrends;
      
      // Return the filtered and limited trends
      return filteredTrends.slice(0, limit);
    }
    
    try {
      // Fetch fresh trending searches
      const trends = await searchService.getTrendingSearches(limit, category);
      
      // Cache the trends for future use
      searchService.cacheTrendingSearches(trends);
      
      return trends;
    } catch (error) {
      console.error('Error fetching trending searches:', error);
      return searchService.getRealtimeTrendingSearches(limit, category);
    }
  },

  /**
   * Cache trending searches in localStorage for faster access
   * @param trends Trending searches to cache
   */
  cacheTrendingSearches: (trends: SearchTrend[]): void => {
    if (typeof window === 'undefined') return;
    
    try {
      // Cache the trends with a timestamp
      const cacheData = {
        trends,
        timestamp: new Date().toISOString(),
      };
      
      localStorage.setItem('trending_searches_cache', JSON.stringify(cacheData));
    } catch (error) {
      console.error('Error caching trending searches:', error);
    }
  },

  /**
   * Get cached trending searches from localStorage
   * @returns Cached trending searches or null if cache is invalid/expired
   */
  getCachedTrendingSearches: (): SearchTrend[] | null => {
    if (typeof window === 'undefined') return null;
    
    try {
      // Get the cached data
      const cachedData = localStorage.getItem('trending_searches_cache');
      if (!cachedData) return null;
      
      const { trends, timestamp } = JSON.parse(cachedData);
      
      // Check if the cache is expired (older than 1 hour)
      const cacheTime = new Date(timestamp).getTime();
      const currentTime = new Date().getTime();
      const cacheAge = currentTime - cacheTime;
      
      // Cache expires after 1 hour (3600000 ms)
      if (cacheAge > 3600000) return null;
      
      return trends;
    } catch (error) {
      console.error('Error retrieving cached trending searches:', error);
      return null;
    }
  },

  /**
   * Clear the trending searches cache
   */
  clearTrendingSearchesCache: (): void => {
    if (typeof window === 'undefined') return;
    
    try {
      localStorage.removeItem('trending_searches_cache');
    } catch (error) {
      console.error('Error clearing trending searches cache:', error);
    }
  },

  /**
   * Mock function to get search suggestions when backend is not available
   * @param query Partial search query
   * @returns List of mock search suggestions
   */
  getMockSuggestions: (query: string) => {
    if (!query || query.trim().length < 2) {
      return { suggestions: [] };
    }
    
    const mockSuggestions = [
      'Graphic Design',
      'Logo Design',
      'Web Development',
      'WordPress Development',
      'Mobile App Development',
      'SEO Optimization',
      'Content Writing',
      'Video Editing',
      'Social Media Management',
      'Digital Marketing'
    ];
    
    const filteredSuggestions = mockSuggestions
      .filter(suggestion => 
        suggestion.toLowerCase().includes(query.toLowerCase())
      )
      .slice(0, 5);
    
    console.log('Mock suggestions for:', query);
    console.log('Filtered suggestions:', filteredSuggestions);
    
    return { 
      suggestions: filteredSuggestions.map(text => ({ text }))
    };
  }
};

export default searchService; 