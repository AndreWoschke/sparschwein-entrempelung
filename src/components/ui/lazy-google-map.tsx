import { useState, useRef, useEffect, memo } from "react";

interface LazyGoogleMapProps {
  src: string;
  title: string;
  className?: string;
}

/**
 * Lazy-loads Google Maps iframe only when visible in viewport
 * Reduces initial page load and improves LCP/INP on mobile
 * - Uses IntersectionObserver for efficient loading
 * - Placeholder prevents layout shift (CLS)
 * - Loading state with minimal animation
 */
export const LazyGoogleMap = memo(function LazyGoogleMap({ 
  src, 
  title, 
  className = "" 
}: LazyGoogleMapProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [shouldLoad, setShouldLoad] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Use requestIdleCallback to setup observer without blocking main thread
    const setupObserver = () => {
      const observer = new IntersectionObserver(
        (entries) => {
          if (entries[0].isIntersecting) {
            // Use requestAnimationFrame to batch state update
            requestAnimationFrame(() => {
              setShouldLoad(true);
            });
            observer.disconnect();
          }
        },
        {
          rootMargin: "300px", // Load 300px before visible for smooth experience
          threshold: 0,
        }
      );

      if (containerRef.current) {
        observer.observe(containerRef.current);
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
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative bg-muted ${className}`}
      style={{ 
        minHeight: "400px",
        // Prevent layout shift
        contain: 'layout'
      }}
    >
      {shouldLoad ? (
        <>
          <iframe
            src={src}
            width="100%"
            height="100%"
            style={{ 
              border: 0, 
              minHeight: "400px",
              opacity: isLoaded ? 1 : 0,
              transition: "opacity 0.3s ease"
            }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title={title}
            className="aspect-square lg:aspect-auto"
            onLoad={() => setIsLoaded(true)}
          />
          {/* Loading overlay - hidden once map loads */}
          {!isLoaded && (
            <div 
              className="absolute inset-0 flex items-center justify-center"
              aria-hidden="true"
            >
              <div className="text-center text-muted-foreground">
                <div className="mx-auto mb-2 h-8 w-8 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
                <p className="text-sm">Karte wird geladen...</p>
              </div>
            </div>
          )}
        </>
      ) : (
        <div 
          className="flex h-full min-h-[400px] items-center justify-center"
          aria-label="Interaktive Karte wird geladen, wenn sichtbar"
        >
          <div className="text-center text-muted-foreground">
            <div className="mx-auto mb-2 h-8 w-8 rounded-full bg-primary/10" />
            <p className="text-sm">Karte</p>
          </div>
        </div>
      )}
    </div>
  );
});
