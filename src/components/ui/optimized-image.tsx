import { useState, useRef, useEffect, ImgHTMLAttributes, memo } from "react";

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, "loading"> {
  src: string;
  alt: string;
  width: number;
  height: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
}

/**
 * Optimized image component for Core Web Vitals (LCP, CLS, INP)
 * - Fixed dimensions to prevent CLS
 * - Lazy loading for below-fold images
 * - Priority loading with fetchpriority="high" for LCP images
 * - Blur placeholder for perceived performance
 * - Native lazy loading with IntersectionObserver fallback
 * - Responsive sizes attribute support
 */
export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  width,
  height,
  priority = false,
  className = "",
  sizes,
  ...props
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    // Use native lazy loading support detection
    if ('loading' in HTMLImageElement.prototype) {
      setIsInView(true);
      return;
    }

    // Fallback to IntersectionObserver for older browsers
    // Use requestIdleCallback to avoid blocking main thread
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Use requestAnimationFrame to batch state updates
            requestAnimationFrame(() => {
              setIsInView(true);
            });
            observer.disconnect();
          }
        },
        {
          rootMargin: "100px",
          threshold: 0,
        }
      );

      if (imgRef.current) {
        observer.observe(imgRef.current);
      }

      return observer;
    };

    let observer: IntersectionObserver | null = null;
    
    if ('requestIdleCallback' in window) {
      const idleId = requestIdleCallback(() => {
        observer = setupObserver();
      }, { timeout: 500 });
      return () => {
        cancelIdleCallback(idleId);
        observer?.disconnect();
      };
    } else {
      observer = setupObserver();
      return () => observer?.disconnect();
    }
  }, [priority]);

  return (
    <div
      ref={imgRef}
      className={`relative overflow-hidden bg-muted ${className}`}
      style={{ 
        aspectRatio: `${width}/${height}`,
        // Prevent layout shift with explicit dimensions
        contain: 'layout'
      }}
    >
      {isInView && (
        <img
          src={src}
          alt={alt}
          width={width}
          height={height}
          loading={priority ? "eager" : "lazy"}
          decoding={priority ? "sync" : "async"}
          // @ts-ignore - fetchpriority is valid HTML but not in React types yet
          fetchpriority={priority ? "high" : "auto"}
          sizes={sizes}
          onLoad={() => setIsLoaded(true)}
          className={`h-full w-full object-cover transition-opacity duration-300 ${
            isLoaded ? "opacity-100" : "opacity-0"
          }`}
          {...props}
        />
      )}
      {/* Placeholder skeleton - hidden once image loads */}
      {!isLoaded && (
        <div 
          className="absolute inset-0 bg-muted" 
          aria-hidden="true"
          style={{ 
            // Use CSS animation instead of JS for better performance
            animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
          }}
        />
      )}
    </div>
  );
});

// Add CSS keyframes via style injection (done once)
if (typeof document !== 'undefined') {
  const styleId = 'optimized-image-styles';
  if (!document.getElementById(styleId)) {
    const style = document.createElement('style');
    style.id = styleId;
    style.textContent = `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `;
    document.head.appendChild(style);
  }
}
