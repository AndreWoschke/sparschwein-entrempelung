import { useState } from "react";
import { Link, Outlet, useLocation, Navigate } from "react-router-dom";
import { FileText, Settings, History, Menu, X, LogOut, Users, Activity, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/useAuth";

export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, profile, role, isAdmin, loading, signOut } = useAuth();

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/admin/login" replace />;
  }

  const NAV_ITEMS = [
    { to: "/admin", icon: FileText, label: "Dashboard", exact: true },
    { to: "/admin/angebot", icon: FileText, label: "Neues Angebot" },
    { to: "/admin/verlauf", icon: History, label: "Angebotsverlauf" },
    ...(isAdmin
      ? [
          { to: "/admin/performance", icon: Activity, label: "Performance" },
          { to: "/admin/seo", icon: Search, label: "SEO & Search" },
          { to: "/admin/einstellungen", icon: Settings, label: "Einstellungen" },
          { to: "/admin/team", icon: Users, label: "Team verwalten" },
        ]
      : []),
  ];

  const isActive = (path: string, exact?: boolean) =>
    exact ? location.pathname === path : location.pathname.startsWith(path);

  const displayName = profile
    ? `${profile.firstName} ${profile.lastName.charAt(0)}.`
    : user.email;

  return (
    <div className="min-h-screen bg-muted/30">
      {/* Top Bar */}
      <header className="sticky top-0 z-50 border-b bg-background shadow-sm">
        <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4">
          <Link to="/admin" className="flex items-center gap-2 text-lg font-bold text-primary">
            🐷 Admin-Bereich
          </Link>
          <div className="flex items-center gap-3">
            {/* User info */}
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium leading-none">{displayName}</p>
              <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Mitarbeiter"}</p>
            </div>
            <Button variant="ghost" size="sm" onClick={signOut} title="Abmelden">
              <LogOut className="h-4 w-4" />
              <span className="ml-1 hidden sm:inline">Abmelden</span>
            </Button>
            <Link to="/" className="hidden text-xs text-muted-foreground underline sm:inline">
              ← Webseite
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className="sm:hidden"
              onClick={() => setMobileOpen(!mobileOpen)}
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>
      </header>

      <div className="mx-auto flex max-w-6xl">
        {/* Sidebar Desktop */}
        <aside className="hidden w-56 shrink-0 border-r bg-background p-4 sm:block">
          <nav className="flex flex-col gap-1">
            {NAV_ITEMS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                className={cn(
                  "flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  isActive(item.to, item.exact)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
          </nav>
        </aside>

        {/* Mobile Nav */}
        {mobileOpen && (
          <div className="fixed inset-0 top-14 z-40 bg-background p-4 sm:hidden">
            <nav className="flex flex-col gap-2">
              {/* Mobile user info */}
              <div className="mb-2 rounded-lg bg-muted p-3">
                <p className="font-medium">{displayName}</p>
                <p className="text-xs text-muted-foreground">{isAdmin ? "Admin" : "Mitarbeiter"}</p>
              </div>
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={() => setMobileOpen(false)}
                  className={cn(
                    "flex items-center gap-3 rounded-lg px-4 py-3 text-base font-medium",
                    isActive(item.to, item.exact)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  {item.label}
                </Link>
              ))}
              <Button variant="ghost" onClick={signOut} className="mt-2 justify-start">
                <LogOut className="mr-2 h-5 w-5" /> Abmelden
              </Button>
              <Link to="/" className="mt-2 text-sm text-muted-foreground underline">
                ← Zur Webseite
              </Link>
            </nav>
          </div>
        )}

        {/* Main Content */}
        <main className="min-h-[calc(100vh-3.5rem)] flex-1 p-4 sm:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
