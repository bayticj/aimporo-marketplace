import React, { useEffect } from 'react';

interface ShortDescriptionDisplayProps {
  shortDescription?: string;
  description?: string;
}

const ShortDescriptionDisplay: React.FC<ShortDescriptionDisplayProps> = ({
  shortDescription,
  description
}) => {
  // Debug logs
  console.log('ShortDescriptionDisplay - shortDescription:', shortDescription);
  console.log('ShortDescriptionDisplay - description:', description);
  
  useEffect(() => {
    console.log('ShortDescriptionDisplay mounted with:', { shortDescription, description });
  }, [shortDescription, description]);
  
  // Only render if we have content to display
  if (!shortDescription && !description) {
    console.log('ShortDescriptionDisplay - No content to display');
    return null;
  }
  
  const displayText = shortDescription || description?.substring(0, 100) || '';
  
  return (
    <div className="short-description-container" style={{
      padding: '10px',
      backgroundColor: '#fff9e6',
      border: '2px solid #ff8c00',
      borderRadius: '4px',
      marginBottom: '12px',
      position: 'relative',
      zIndex: 10,
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    }}>
      <div style={{ 
        fontSize: '10px', 
        fontWeight: 'bold', 
        color: '#ff8c00', 
        marginBottom: '4px',
        textTransform: 'uppercase'
      }}>
        Description
      </div>
      <div style={{ 
        fontSize: '14px', 
        fontWeight: '500', 
        color: '#333333',
        lineHeight: '1.4'
      }}>
        {displayText}
      </div>
    </div>
  );
};

export default ShortDescriptionDisplay; 