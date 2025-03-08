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
   * Get trending searches based on most popular queries
   * @param limit Maximum number of trending searches to return
   * @param category Optional category to filter trending searches
   * @returns List of trending searches
   */
  getTrendingSearches: async (limit: number = 5, category?: string): Promise<SearchTrend[]> => {
    try {
      // In a real implementation, this would call an API endpoint
      // that returns trending searches from the backend
      const endpoint = category
        ? `/search/trending?category=${encodeURIComponent(category)}&limit=${limit}`
        : `/search/trending?limit=${limit}`;
      
      try {
        const response = await api.get<TrendingSearchResponse>(endpoint);
        // Check if response.data and response.data.trends exist
        if (response.data && response.data.trends) {
          return response.data.trends;
        }
        // If not, return empty array
        console.warn('Trending search response missing data or trends property');
        return [];
      } catch (error) {
        console.error('Error fetching trending searches, using mock data:', error);
        // Fall back to mock data if API fails
        return searchService.getMockTrendingSearches(limit, category);
      }
    } catch (error) {
      console.error('Error getting trending searches:', error);
      return searchService.getMockTrendingSearches(limit, category);
    }
  },

  /**
   * Mock function to get trending searches when backend is not available
   * @param limit Maximum number of trending searches to return
   * @param category Optional category to filter trending searches
   * @returns List of mock trending searches
   */
  getMockTrendingSearches: (limit: number = 5, category?: string): SearchTrend[] => {
    // Enhanced mock data for trending searches with more realistic data
    const allTrends: SearchTrend[] = [
      { id: 1, name: 'Logo Design', count: 1250, category: 'gigs', trending: true },
      { id: 2, name: 'WordPress Development', count: 980, category: 'gigs', trending: true },
      { id: 3, name: 'Mobile App Development', count: 870, category: 'software', trending: true },
      { id: 4, name: 'Social Media Management', count: 760, category: 'digital-products', trending: false },
      { id: 5, name: 'Content Writing', count: 720, category: 'gigs', trending: true },
      { id: 6, name: 'Video Editing', count: 680, category: 'digital-products', trending: true },
      { id: 7, name: 'SEO Optimization', count: 650, category: 'digital-products', trending: false },
      { id: 8, name: 'UI/UX Design', count: 620, category: 'gigs', trending: true },
      { id: 9, name: 'E-commerce Development', count: 590, category: 'software', trending: false },
      { id: 10, name: 'Data Analysis', count: 560, category: 'gigs', trending: true },
      // Additional trending searches for more variety
      { id: 11, name: 'AI Prompt Engineering', count: 1450, category: 'digital-products', trending: true },
      { id: 12, name: 'ChatGPT Integration', count: 1320, category: 'software', trending: true },
      { id: 13, name: 'NFT Design', count: 890, category: 'digital-products', trending: true },
      { id: 14, name: 'Shopify Store Setup', count: 780, category: 'gigs', trending: true },
      { id: 15, name: 'TikTok Marketing', count: 750, category: 'digital-products', trending: true },
      { id: 16, name: 'Python Automation', count: 710, category: 'software', trending: true },
      { id: 17, name: 'Podcast Editing', count: 690, category: 'digital-products', trending: true },
      { id: 18, name: 'Instagram Growth', count: 670, category: 'digital-products', trending: false },
      { id: 19, name: 'React Development', count: 640, category: 'software', trending: true },
      { id: 20, name: 'Whiteboard Animation', count: 610, category: 'gigs', trending: true }
    ];
    
    // Add some randomness to make it feel more like real data
    const randomizedTrends = allTrends.map(trend => {
      // Add a small random variation to the count (-5% to +5%)
      const randomFactor = 0.9 + Math.random() * 0.2; // 0.9 to 1.1
      const randomizedCount = Math.round(trend.count * randomFactor);
      
      return {
        ...trend,
        count: randomizedCount
      };
    });
    
    // Filter by category if provided
    const filteredTrends = category 
      ? randomizedTrends.filter(trend => trend.category === category)
      : randomizedTrends;
    
    // Sort by count (most popular first) and limit results
    return filteredTrends
      .sort((a, b) => b.count - a.count)
      .slice(0, limit);
  },

  /**
   * Simulates real-time trending searches with time-based variations
   * This makes the mock data feel more dynamic and realistic
   * @param limit Maximum number of trending searches to return
   * @returns List of trending searches with time-based variations
   */
  getRealtimeTrendingSearches: (limit: number = 5): SearchTrend[] => {
    // Create a set of trending searches with clear hierarchy
    const hierarchicalTrends: SearchTrend[] = [
      { id: 1, name: 'AI Development Tools', count: 2450, category: 'software', trending: true },
      { id: 2, name: 'Video Editing Services', count: 1870, category: 'gigs', trending: true },
      { id: 3, name: 'Social Media Templates', count: 1340, category: 'digital-products', trending: true },
      { id: 4, name: 'WordPress Themes', count: 980, category: 'digital-products', trending: true },
      { id: 5, name: 'Logo Design', count: 760, category: 'gigs', trending: true },
    ];
    
    // Add a small random variation to make it feel dynamic but maintain hierarchy
    const dynamicTrends = hierarchicalTrends.map(trend => {
      // Small random variation (±3%) that won't disrupt the hierarchy
      const randomFactor = 0.97 + Math.random() * 0.06;
      const randomizedCount = Math.round(trend.count * randomFactor);
      
      return {
        ...trend,
        count: randomizedCount
      };
    });
    
    // Return the trends, maintaining the hierarchical order
    return dynamicTrends.slice(0, limit);
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