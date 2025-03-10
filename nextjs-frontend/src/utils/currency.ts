/**
 * Currency utility functions for consistent formatting across the application
 */

/**
 * Format a number as Philippine Peso (₱)
 * @param amount - The amount to format
 * @param options - Formatting options
 * @returns Formatted currency string
 */
export const formatCurrency = (
  amount: number, 
  options: { 
    decimals?: number; 
    showSymbol?: boolean;
    compact?: boolean;
    pricingModel?: 'lifetime' | 'month' | 'year' | 'session' | 'appointment' | 'slot' | 'hour' | 'delivery' | 'starting' | null;
    showSlash?: boolean;
    isDigitalProduct?: boolean;
    useSimpleFormat?: boolean;
    originalPrice?: number; // For showing discount
    useDollarSign?: boolean; // Use $ instead of ₱
    useStyledFormat?: boolean; // For the new styled format with HTML
  } = {}
): string => {
  const { 
    decimals = 2, 
    showSymbol = true,
    compact = false,
    pricingModel = null,
    showSlash = true,
    isDigitalProduct = false,
    useSimpleFormat = false,
    originalPrice = null,
    useDollarSign = false,
    useStyledFormat = false
  } = options;
  
  // Use Intl.NumberFormat for localized formatting
  const formatter = new Intl.NumberFormat('en-PH', {
    style: 'currency',
    currency: useDollarSign ? 'USD' : 'PHP',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    ...(compact && { notation: 'compact' })
  });
  
  let formatted = formatter.format(amount);
  
  // If showSymbol is false, remove the currency symbol
  if (!showSymbol) {
    // Remove the ₱ or $ symbol and any non-breaking spaces
    formatted = formatted.replace(/^[₱$]\s*/, '');
  }
  
  // For styled format with HTML (for the new design)
  if (useStyledFormat) {
    // Replace ₱ with $ if needed
    const currencySymbol = useDollarSign ? '$' : 'P';
    const priceValue = formatted.replace(/^[₱$]\s*/, '').replace(/,/g, '');
    
    // Determine the plan text (digital products are always lifetime)
    const planText = isDigitalProduct ? 'lifetime' : pricingModel;
    
    // Create the styled HTML string
    let styledPrice = `<span class="price-amount">${currencySymbol}${priceValue}</span>`;
    
    // Add the plan text if provided
    if (planText) {
      styledPrice += `<span class="price-plan">/${planText}</span>`;
    }
    
    // Add the original price for discount if provided
    if (originalPrice && originalPrice > amount) {
      const formattedOriginal = formatter.format(originalPrice).replace(/^[₱$]\s*/, '').replace(/,/g, '');
      styledPrice += ` <span class="price-original">${currencySymbol}${formattedOriginal}</span>`;
    }
    
    return styledPrice;
  }
  
  // For simple format (P799/plan style)
  if (useSimpleFormat) {
    // Replace ₱ with P or $ based on option
    const currencySymbol = useDollarSign ? '$' : 'P';
    formatted = currencySymbol + formatted.replace(/^[₱$]\s*/, '').replace(/,/g, '');
    
    // Digital products are always lifetime
    if (isDigitalProduct) {
      return `${formatted}/lifetime`;
    }
    
    // Add pricing model suffix if provided
    if (pricingModel) {
      return `${formatted}/${pricingModel}`;
    }
    
    return formatted;
  }
  
  // Add pricing model suffix if provided (original format)
  if (pricingModel) {
    // Digital products are always lifetime in this format too
    if (isDigitalProduct) {
      const slash = showSlash ? '/' : ' ';
      return `${formatted}${slash}lifetime`;
    }
    
    const slash = showSlash ? '/' : ' ';
    
    switch (pricingModel) {
      case 'lifetime':
        return `${formatted}${slash}lifetime`;
      case 'month':
        return `${formatted}${slash}month`;
      case 'year':
        return `${formatted}${slash}year`;
      case 'session':
        return `${formatted}${slash}session`;
      case 'appointment':
        return `${formatted}${slash}appointment`;
      case 'slot':
        return `${formatted}${slash}slot`;
      case 'hour':
        return `${formatted}${slash}hour`;
      case 'delivery':
        return `${formatted}${slash}delivery`;
      case 'starting':
        return `${formatted} starting`;
      default:
        return formatted;
    }
  }
  
  return formatted;
};

/**
 * Parse a currency string back to a number
 * @param currencyString - The currency string to parse
 * @returns The parsed number
 */
export const parseCurrency = (currencyString: string): number => {
  // Remove currency symbol, commas, and other non-numeric characters except decimal point
  const numericString = currencyString.replace(/[^\d.-]/g, '');
  return parseFloat(numericString);
};

/**
 * Format a discount percentage
 * @param percentage - The percentage value (e.g., 0.2 for 20%)
 * @returns Formatted percentage string
 */
export const formatDiscount = (percentage: number): string => {
  return `${Math.round(percentage * 100)}% off`;
};

/**
 * Calculate discounted price
 * @param originalPrice - The original price
 * @param discountPercentage - The discount percentage (e.g., 0.2 for 20%)
 * @returns The discounted price
 */
export const calculateDiscountedPrice = (
  originalPrice: number,
  discountPercentage: number
): number => {
  return originalPrice * (1 - discountPercentage);
}; 