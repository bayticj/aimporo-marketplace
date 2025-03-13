import React from 'react';
import { Gig, DigitalProduct, SoftwareProduct } from '@/services/types';

interface DebugDescriptionDisplayProps {
  products: (Gig | DigitalProduct | SoftwareProduct)[];
}

const DebugDescriptionDisplay: React.FC<DebugDescriptionDisplayProps> = ({ products }) => {
  if (!products || products.length === 0) {
    return <div>No products to display</div>;
  }

  return (
    <div style={{ 
      margin: '20px 0', 
      padding: '15px', 
      backgroundColor: '#f8f9fa', 
      border: '2px solid #e9ecef',
      borderRadius: '8px'
    }}>
      <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '10px' }}>
        Debug: Product Descriptions
      </h2>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
        {products.map((product, index) => {
          let shortDesc = '';
          let fullDesc = '';
          
          if (product.type === 'gig') {
            const gig = product as Gig;
            shortDesc = gig.short_description || 'No short description';
            fullDesc = gig.description || 'No description';
          } else if (product.type === 'digital') {
            const digital = product as DigitalProduct;
            shortDesc = digital.short_description || 'No short description';
            fullDesc = digital.description || 'No description';
          } else if (product.type === 'software') {
            const software = product as SoftwareProduct;
            shortDesc = software.short_description || 'No short description';
            fullDesc = software.description || 'No description';
          }
          
          return (
            <div key={index} style={{ 
              padding: '10px', 
              backgroundColor: '#ffffff', 
              border: '1px solid #dee2e6',
              borderRadius: '4px'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
                {product.title} (ID: {product.id}, Type: {product.type})
              </div>
              <div style={{ 
                padding: '5px', 
                backgroundColor: '#fff3cd', 
                marginBottom: '5px',
                borderRadius: '4px',
                fontSize: '14px'
              }}>
                <strong>Short Description:</strong> {shortDesc}
              </div>
              <div style={{ 
                padding: '5px', 
                backgroundColor: '#d1ecf1', 
                borderRadius: '4px',
                fontSize: '12px'
              }}>
                <strong>Full Description:</strong> {fullDesc.substring(0, 100)}...
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DebugDescriptionDisplay; 