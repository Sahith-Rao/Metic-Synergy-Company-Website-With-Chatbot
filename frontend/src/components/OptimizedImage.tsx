import React, { useState, useEffect } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean; // Use for above-the-fold images that should load without delay
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
  fallbackSrc?: string; // Optional fallback image if main image fails to load
}

/**
 * OptimizedImage component for better performance and SEO
 * - Provides native lazy loading for images
 * - Ensures width/height are specified to prevent layout shifts
 * - Handles loading state for better UX
 * - Supports fallback images
 * - Can be configured for priority loading (above the fold)
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  fallbackSrc
}) => {
  const [imgSrc, setImgSrc] = useState<string>(src);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);

  // Reset loading state when src changes
  useEffect(() => {
    setImgSrc(src);
    setIsLoaded(false);
    setError(false);
  }, [src]);

  // Handle image load success
  const handleLoad = () => {
    setIsLoaded(true);
  };

  // Handle image load error
  const handleError = () => {
    setError(true);
    if (fallbackSrc && fallbackSrc !== src) {
      setImgSrc(fallbackSrc);
    }
  };

  // Determine if we should lazy load
  // Don't lazy load priority images (typically above the fold)
  const loadingStrategy = priority ? 'eager' : 'lazy';

  // Determine image style based on object fit
  const imgStyle: React.CSSProperties = {
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    width: '100%',
    height: '100%'
  };

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        backgroundColor: '#f0f0f0', // Placeholder color while loading
      }}
    >
      {/* Loading placeholder or spinner */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && !imgSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <span>Image failed to load</span>
        </div>
      )}
      
      {/* Actual image */}
      <img
        src={imgSrc}
        alt={alt}
        width={width}
        height={height}
        loading={loadingStrategy}
        onLoad={handleLoad}
        onError={handleError}
        style={imgStyle}
      />
    </div>
  );
};

export default OptimizedImage;