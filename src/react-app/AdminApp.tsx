import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { AuthProvider } from "@/hooks/useAuth";

import LoginPage from "./pages/admin/LoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import OfferCreate from "./pages/admin/OfferCreate";
import OfferHistory from "./pages/admin/OfferHistory";
import AdminSettings from "./pages/admin/AdminSettings";
import TeamManagement from "./pages/admin/TeamManagement";
import PerformancePage from "./pages/admin/PerformancePage";
import SeoPage from "./pages/admin/SeoPage";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5, gcTime: 1000 * 60 * 30 },
  },
});

/**
 * Eigenstaendige Admin-SPA (React Router + Supabase-Auth).
 * Wird in Astro als ein einziges client:only-Island gemountet.
 */
export default function AdminApp() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider delayDuration={0}>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AuthProvider>
              <Routes>
                <Route path="/admin/login" element={<LoginPage />} />
                <Route path="/admin" element={<AdminLayout />}>
                  <Route index element={<AdminDashboard />} />
                  <Route path="angebot" element={<OfferCreate />} />
                  <Route path="verlauf" element={<OfferHistory />} />
                  <Route path="einstellungen" element={<AdminSettings />} />
                  <Route path="team" element={<TeamManagement />} />
                  <Route path="performance" element={<PerformancePage />} />
                  <Route path="seo" element={<SeoPage />} />
                </Route>
              </Routes>
            </AuthProvider>
          </BrowserRouter>
        </TooltipProvider>
      </QueryClientProvider>
    </HelmetProvider>
  );
}
