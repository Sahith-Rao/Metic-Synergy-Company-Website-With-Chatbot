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
  sizes?: string; // Responsive sizes attribute
  srcSet?: string; // Custom srcSet for responsive images
  webpSrc?: string; // WebP version of the image (for next-gen formats)
  avifSrc?: string; // AVIF version of the image (for next-gen formats)
}

/**
 * OptimizedImage component for better performance, SEO, and accessibility
 * - Provides native lazy loading for images
 * - Ensures width/height are specified to prevent layout shifts (CLS)
 * - Handles loading state for better UX
 * - Supports next-gen formats (WebP/AVIF) with fallbacks
 * - Uses responsive images with srcset and sizes
 * - Can be configured for priority loading (above the fold)
 * - Ensures proper accessibility attributes
 */
const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  objectFit = 'cover',
  fallbackSrc,
  sizes = '100vw', // Default to full viewport width
  srcSet,
  webpSrc,
  avifSrc
}) => {
  // For image src state management
  const [imgSrc, setImgSrc] = useState<string>(src);
  
  // Generate auto srcSet if none provided and src is a remote URL
  const generateSrcSet = () => {
    if (srcSet) return srcSet;
    
    // Check if this is a remote image (not a local asset)
    if (src.startsWith('http')) {
      // For remote images like Unsplash, we can use their sizing parameters
      if (src.includes('unsplash.com')) {
        return `${src}&w=640 640w, ${src}&w=960 960w, ${src}&w=1280 1280w, ${src}&w=1920 1920w`;
      }
      
      // For other remote images, we can't generate srcSet automatically
      return undefined;
    }
    
    // For local images, we would need to have pre-generated different sizes
    // This would require more infrastructure like an image processing pipeline
    return undefined;
  };
  
  // Auto-generate WebP source if none provided and src is local
  const getWebpSrc = () => {
    if (webpSrc) return webpSrc;
    
    // If it's a local image with common extensions, generate WebP equivalent
    if (!src.startsWith('http') && 
        (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))) {
      // Convert path/to/image.jpg to path/to/image.webp
      return src.replace(/\.(jpe?g|png)$/i, '.webp');
    }
    
    return undefined;
  };
  
  // Auto-generate AVIF source if none provided and src is local
  const getAvifSrc = () => {
    if (avifSrc) return avifSrc;
    
    // If it's a local image with common extensions, generate AVIF equivalent
    if (!src.startsWith('http') && 
        (src.endsWith('.jpg') || src.endsWith('.jpeg') || src.endsWith('.png'))) {
      // Convert path/to/image.jpg to path/to/image.avif
      return src.replace(/\.(jpe?g|png)$/i, '.avif');
    }
    
    return undefined;
  };
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
  
  // Get derived values
  const actualSrcSet = generateSrcSet();
  const actualWebpSrc = getWebpSrc();
  const actualAvifSrc = getAvifSrc();

  // Determine image style based on object fit
  const imgStyle: React.CSSProperties = {
    objectFit,
    opacity: isLoaded ? 1 : 0,
    transition: 'opacity 0.3s ease-in-out',
    width: '100%',
    height: '100%'
  };

  // Use picture element for modern formats if available
  const usePictureElement = actualWebpSrc || actualAvifSrc || actualSrcSet;

  return (
    <div 
      className={`relative overflow-hidden ${className}`}
      style={{ 
        width: width ? `${width}px` : '100%',
        height: height ? `${height}px` : '100%',
        backgroundColor: '#f0f0f0', // Placeholder color while loading
      }}
      role="img"
      aria-label={alt} // Ensure container has accessibility
    >
      {/* Loading placeholder or spinner */}
      {!isLoaded && !error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900 bg-opacity-20">
          <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" aria-hidden="true"></div>
        </div>
      )}
      
      {/* Error state */}
      {error && !imgSrc && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-800 text-white">
          <span>Image failed to load</span>
        </div>
      )}
      
      {/* Image with next-gen format support */}
      {usePictureElement ? (
        <picture>
          {/* AVIF format - best compression and quality */}
          {actualAvifSrc && (
            <source 
              type="image/avif" 
              srcSet={actualAvifSrc}
              sizes={sizes}
            />
          )}
          
          {/* WebP format - widely supported modern format */}
          {actualWebpSrc && (
            <source 
              type="image/webp" 
              srcSet={actualWebpSrc}
              sizes={sizes}
            />
          )}
          
          {/* Original format as fallback */}
          <img
            src={imgSrc}
            alt={alt}
            width={width}
            height={height}
            srcSet={actualSrcSet}
            sizes={sizes}
            loading={loadingStrategy}
            onLoad={handleLoad}
            onError={handleError}
            style={imgStyle}
            decoding={priority ? 'sync' : 'async'} // Optimize decoding strategy
          />
        </picture>
      ) : (
        <img
          src={imgSrc}
          alt={alt}
          width={width}
          height={height}
          srcSet={actualSrcSet}
          sizes={sizes}
          loading={loadingStrategy}
          onLoad={handleLoad}
          onError={handleError}
          style={imgStyle}
          decoding={priority ? 'sync' : 'async'} // Optimize decoding strategy
        />
      )}
    </div>
  );
};

export default OptimizedImage;