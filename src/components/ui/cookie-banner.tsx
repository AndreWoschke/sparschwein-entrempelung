import { useState, useEffect, useCallback, memo } from "react";
import { Link } from "react-router-dom";
import { Cookie, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const COOKIE_CONSENT_KEY = "cookie-consent";

type ConsentType = "all" | "essential" | "declined";

interface CookieConsent {
  type: ConsentType;
  timestamp: string;
}

export const CookieBanner = memo(function CookieBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    // Check if consent was already given or declined
    const storedConsent = localStorage.getItem(COOKIE_CONSENT_KEY);
    // Also check session storage for declined (no persistent storage)
    const sessionDeclined = sessionStorage.getItem("cookie-declined");
    
    if (!storedConsent && !sessionDeclined) {
      // Use requestIdleCallback for non-blocking banner load
      const showBanner = () => {
        setIsVisible(true);
        // Use requestAnimationFrame for smoother animation start
        requestAnimationFrame(() => {
          setIsAnimating(true);
        });
      };

      // Delay banner to improve initial load performance (after LCP)
      if ('requestIdleCallback' in window) {
        const id = requestIdleCallback(showBanner, { timeout: 3000 });
        return () => cancelIdleCallback(id);
      } else {
        const timer = setTimeout(showBanner, 2500);
        return () => clearTimeout(timer);
      }
    }
  }, []);

  const handleConsent = useCallback((type: ConsentType) => {
    if (type === "declined") {
      // Don't store anything in localStorage - only session storage so banner doesn't reappear during session
      sessionStorage.setItem("cookie-declined", "true");
    } else {
      const consent: CookieConsent = {
        type,
        timestamp: new Date().toISOString(),
      };
      localStorage.setItem(COOKIE_CONSENT_KEY, JSON.stringify(consent));
    }
    
    setIsAnimating(false);
    setTimeout(() => setIsVisible(false), 300);
  }, []);

  if (!isVisible) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 p-4 transition-all duration-300",
        isAnimating ? "translate-y-0 opacity-100" : "translate-y-full opacity-0"
      )}
    >
      <div className="mx-auto max-w-4xl">
        <div className="relative rounded-xl border bg-card p-4 shadow-2xl sm:p-6">
          {/* Close button */}
          <button
            onClick={() => handleConsent("essential")}
            className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-secondary hover:text-foreground"
            aria-label="Schließen"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:gap-6">
            {/* Icon */}
            <div className="hidden shrink-0 sm:block">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <Cookie className="h-6 w-6 text-primary" />
              </div>
            </div>

            {/* Content */}
            <div className="flex-1 space-y-3 pr-6 sm:pr-0">
              <div className="flex items-center gap-2 sm:block">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 sm:hidden">
                  <Cookie className="h-4 w-4 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">Cookie-Einstellungen</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten. 
                Essentielle Cookies sind für die Grundfunktionen erforderlich. Optionale Cookies helfen uns, 
                die Website zu verbessern und relevante Inhalte anzuzeigen.{" "}
                <Link 
                  to="/datenschutz" 
                  className="font-medium text-primary underline hover:text-primary/80"
                >
                  Mehr erfahren
                </Link>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConsent("declined")}
                className="w-full whitespace-nowrap sm:w-auto"
              >
                Ablehnen
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleConsent("essential")}
                className="w-full whitespace-nowrap sm:w-auto"
              >
                Nur Essentielle
              </Button>
              <Button
                size="sm"
                onClick={() => handleConsent("all")}
                className="w-full whitespace-nowrap sm:w-auto"
              >
                Alle akzeptieren
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

// Utility function to check cookie consent
export function getCookieConsent(): CookieConsent | null {
  const stored = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

// Utility function to check if all cookies are accepted
export function hasFullConsent(): boolean {
  const consent = getCookieConsent();
  return consent?.type === "all";
}

// Utility function to reset consent (for testing or settings page)
export function resetCookieConsent(): void {
  localStorage.removeItem(COOKIE_CONSENT_KEY);
}
