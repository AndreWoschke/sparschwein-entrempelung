import { ReactNode, lazy, Suspense, useEffect, useState } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { useScrollToHash } from "@/hooks/useScrollToHash";

// Lazy load non-critical floating UI components
const WhatsAppButton = lazy(() => 
  import("@/components/ui/whatsapp-button").then(m => ({ default: m.WhatsAppButton }))
);
const MobileCallBar = lazy(() => 
  import("@/components/ui/mobile-call-bar").then(m => ({ default: m.MobileCallBar }))
);
const ScrollToTop = lazy(() => 
  import("@/components/ui/scroll-to-top").then(m => ({ default: m.ScrollToTop }))
);
const CookieBanner = lazy(() => 
  import("@/components/ui/cookie-banner").then(m => ({ default: m.CookieBanner }))
);

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  useScrollToHash();
  const [showFloatingUI, setShowFloatingUI] = useState(false);

  // Delay loading of floating UI elements until after initial paint
  // This improves LCP and INP by not blocking the main thread
  useEffect(() => {
    // Use requestIdleCallback if available, otherwise setTimeout
    // Increased timeout to ensure LCP completes first
    if ('requestIdleCallback' in window) {
      const id = requestIdleCallback(() => {
        // Use requestAnimationFrame to batch the state update
        requestAnimationFrame(() => {
          setShowFloatingUI(true);
        });
      }, { timeout: 3000 });
      return () => cancelIdleCallback(id);
    } else {
      const timer = setTimeout(() => {
        requestAnimationFrame(() => {
          setShowFloatingUI(true);
        });
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, []);
  
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      {/* Add padding-bottom on mobile for fixed call bar */}
      <main id="main-content" role="main" className="flex-1 pt-16 pb-14 md:pb-0 lg:pt-20">
        {children}
      </main>
      <Footer />
      
      {/* Floating UI - loaded after initial paint for better LCP/INP */}
      {showFloatingUI && (
        <Suspense fallback={null}>
          <WhatsAppButton />
          <MobileCallBar />
          <ScrollToTop />
          <CookieBanner />
        </Suspense>
      )}
    </div>
  );
}
