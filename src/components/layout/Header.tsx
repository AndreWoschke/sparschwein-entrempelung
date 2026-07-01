import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Menu, X, Phone, MessageCircle, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO, SERVICES, REGIONS } from "@/lib/seo";
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mobileServicesOpen, setMobileServicesOpen] = useState(false);
  const [mobileRegionsOpen, setMobileRegionsOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    let lastScrollY = 0;
    
    const handleScroll = () => {
      lastScrollY = window.scrollY;
      
      if (!ticking) {
        // Use requestAnimationFrame to batch reads and prevent layout thrashing
        requestAnimationFrame(() => {
          setIsScrolled(lastScrollY > 10);
          ticking = false;
        });
        ticking = true;
      }
    };

    // Use passive listener for better scroll performance
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      role="banner"
      className={cn(
        "fixed left-0 right-0 top-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-background/95 shadow-md backdrop-blur-sm"
          : "bg-background"
      )}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xl">
              🐷
            </div>
            <div className="hidden sm:block">
              <span className="text-lg font-bold text-primary">
                Sparschwein
              </span>
              <span className="ml-1 text-lg font-medium text-foreground">
                Entrümpelung
              </span>
            </div>
          </Link>

          {/* Desktop Navigation - Leistungen Dropdown + Preise */}
          <div className="hidden lg:flex lg:items-center lg:gap-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary">
                  Leistungen
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-56 bg-background border border-border shadow-lg z-50">
                {SERVICES.map((service) => (
                  <DropdownMenuItem key={service.id} asChild>
                    <Link
                      to={service.slug}
                      className="cursor-pointer w-full px-3 py-2 text-sm hover:bg-secondary hover:text-primary"
                    >
                      {service.title}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary">
                  Einsatzgebiet
                  <ChevronDown className="h-4 w-4" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="w-64 max-h-[70vh] overflow-y-auto bg-background border border-border shadow-lg z-50">
                {REGIONS.map((region) => (
                  <DropdownMenuItem key={region.id} asChild>
                    <Link
                      to={region.slug}
                      className="cursor-pointer w-full px-3 py-2 text-sm hover:bg-secondary hover:text-primary"
                    >
                      {region.name}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/preise"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              Preise
            </Link>
            <Link
              to="/blog"
              className="rounded-md px-3 py-2 text-sm font-medium text-foreground transition-colors hover:bg-secondary hover:text-primary"
            >
              Ratgeber
            </Link>
          </div>

          {/* CTA Buttons - Phone + WhatsApp */}
          <div className="hidden items-center gap-2 md:flex">
            <a href={`tel:${COMPANY_INFO.phoneLink}`} aria-label={`Anrufen: ${COMPANY_INFO.phone}`}>
              <Button variant="outline" size="sm" className="gap-2">
                <Phone className="h-4 w-4" aria-hidden="true" />
                <span>{COMPANY_INFO.phone}</span>
              </Button>
            </a>
            <a
              href={COMPANY_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp-Nachricht senden"
            >
              <Button size="sm" className="gap-2 bg-[#25D366] hover:bg-[#20BD5A]">
                <MessageCircle className="h-4 w-4" aria-hidden="true" />
                <span>WhatsApp</span>
              </Button>
            </a>
          </div>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={isMobileMenuOpen ? "Menü schließen" : "Menü öffnen"}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" aria-hidden="true" />
            ) : (
              <Menu className="h-6 w-6" aria-hidden="true" />
            )}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <nav id="mobile-menu" className="lg:hidden max-h-[calc(100vh-4rem)] overflow-y-auto" aria-label="Mobile Navigation">
          <div className="space-y-0.5 bg-background px-3 pb-3 pt-1 shadow-lg">
            {/* Leistungen - collapsible */}
            <button
              type="button"
              onClick={() => setMobileServicesOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              aria-expanded={mobileServicesOpen}
            >
              <span>Leistungen</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileServicesOpen && "rotate-180")} />
            </button>
            {mobileServicesOpen && (
              <div className="border-l-2 border-border ml-4 pl-1 pb-1">
                {SERVICES.map((service) => (
                  <Link
                    key={service.id}
                    to={service.slug}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                  >
                    {service.title}
                  </Link>
                ))}
              </div>
            )}

            {/* Einsatzgebiet - collapsible */}
            <button
              type="button"
              onClick={() => setMobileRegionsOpen((v) => !v)}
              className="flex w-full items-center justify-between rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary"
              aria-expanded={mobileRegionsOpen}
            >
              <span>Einsatzgebiet</span>
              <ChevronDown className={cn("h-4 w-4 transition-transform", mobileRegionsOpen && "rotate-180")} />
            </button>
            {mobileRegionsOpen && (
              <div className="border-l-2 border-border ml-4 pl-1 pb-1 max-h-56 overflow-y-auto">
                {REGIONS.map((region) => (
                  <Link
                    key={region.id}
                    to={region.slug}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="block rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-secondary hover:text-primary"
                  >
                    {region.name}
                  </Link>
                ))}
              </div>
            )}

            <Link
              to="/preise"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary"
            >
              Preise
            </Link>
            <Link
              to="/blog"
              onClick={() => setIsMobileMenuOpen(false)}
              className="block rounded-md px-3 py-2 text-sm font-semibold text-foreground hover:bg-secondary hover:text-primary"
            >
              Ratgeber
            </Link>
            <div className="flex gap-2 pt-2">
              <a href={`tel:${COMPANY_INFO.phoneLink}`} className="flex-1" aria-label={`Anrufen: ${COMPANY_INFO.phone}`}>
                <Button variant="outline" size="sm" className="w-full gap-2">
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Anrufen
                </Button>
              </a>
              <a
                href={COMPANY_INFO.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1"
                aria-label="WhatsApp-Nachricht senden"
              >
                <Button
                  size="sm"
                  className="w-full gap-2 bg-[#25D366] hover:bg-[#20BD5A]"
                >
                  <MessageCircle className="h-4 w-4" aria-hidden="true" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </div>
        </nav>
      )}
    </header>
  );
}
