import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export function useScrollToHash() {
  const { hash, pathname } = useLocation();
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    // Header height offset (fixed header)
    const headerOffset = 80;

    // Cleanup any pending animation frame
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
    }

    if (hash) {
      // Retry logic to ensure element exists - batched with requestAnimationFrame
      const scrollToElement = (attempts = 0) => {
        const element = document.getElementById(hash.slice(1));
        if (element) {
          // Batch DOM read in requestAnimationFrame to prevent layout thrashing
          rafRef.current = requestAnimationFrame(() => {
            const elementPosition = element.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;
            
            window.scrollTo({
              top: offsetPosition,
              behavior: "smooth"
            });
          });
        } else if (attempts < 10) {
          // Retry after 100ms if element not found yet
          setTimeout(() => scrollToElement(attempts + 1), 100);
        }
      };
      
      // Start scrolling after a small delay using requestIdleCallback if available
      if ('requestIdleCallback' in window) {
        requestIdleCallback(() => scrollToElement(), { timeout: 200 });
      } else {
        setTimeout(() => scrollToElement(), 50);
      }
    } else if (pathname) {
      // Scroll to top when navigating to a new page without hash
      // Use requestAnimationFrame to avoid layout thrashing
      rafRef.current = requestAnimationFrame(() => {
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    }

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
    };
  }, [hash, pathname]);
}
