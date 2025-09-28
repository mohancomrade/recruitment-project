import React from 'react';

interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  text?: string;
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  size = 'md', 
  text = 'Loading...' 
}) => {
  const sizeClasses = {
    sm: 'h-4 w-4',
    md: 'h-8 w-8',
    lg: 'h-12 w-12',
  };

  return (
    <div className="loading-spinner">
      <div className="spinner" style={{ 
        width: size === 'sm' ? '20px' : size === 'lg' ? '60px' : '40px',
        height: size === 'sm' ? '20px' : size === 'lg' ? '60px' : '40px'
      }}></div>
      {text && (
        <p style={{ marginTop: '8px', fontSize: '14px', color: '#666' }}>{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
