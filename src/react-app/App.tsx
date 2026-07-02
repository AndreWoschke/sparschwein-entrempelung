import { lazy, Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Helmet, HelmetProvider } from "react-helmet-async";

// Critical: HomePage loaded eagerly for LCP
import HomePage from "./pages/HomePage";

// Lazy-loaded pages for code-splitting
const PreisePage = lazy(() => import("./pages/PreisePage"));
const ImpressumPage = lazy(() => import("./pages/ImpressumPage"));
const DatenschutzPage = lazy(() => import("./pages/DatenschutzPage"));
const NotFound = lazy(() => import("./pages/NotFound"));
const BlogIndexPage = lazy(() => import("./pages/BlogIndexPage"));
const BlogPostPage = lazy(() => import("./pages/BlogPostPage"));

// Service Pages
const WohnungsentruempelungPage = lazy(() => import("./pages/services/WohnungsentruempelungPage"));
const HausentruempelungPage = lazy(() => import("./pages/services/HausentruempelungPage"));
const KellerentruempelungPage = lazy(() => import("./pages/services/KellerentruempelungPage"));
const DachbodenentruempelungPage = lazy(() => import("./pages/services/DachbodenentruempelungPage"));
const HaushaltsaufloesungPage = lazy(() => import("./pages/services/HaushaltsaufloesungPage"));
const GewerbeentruempelungPage = lazy(() => import("./pages/services/GewerbeentruempelungPage"));
const SchrottabholungPage = lazy(() => import("./pages/services/SchrottabholungPage"));
const ContainerdienstPage = lazy(() => import("./pages/services/ContainerdienstPage"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5,
      gcTime: 1000 * 60 * 30,
    },
  },
});

const PageLoader = () => (
  <div className="flex min-h-screen items-center justify-center">
    <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
  </div>
);

const App = () => (
  <HelmetProvider>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider delayDuration={0}>
        <Helmet>
          <title>Sparschwein Entrümpelung | Entrümpelung Brieselang & Havelland</title>
          <meta name="description" content="Professionelle Entrümpelung in Brieselang, Falkensee & Havelland. Festpreisgarantie, kostenlose Besichtigung, besenreine Übergabe. ☎ 01579 2639408" />
        </Helmet>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Suspense fallback={<PageLoader />}>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/preise" element={<PreisePage />} />
                <Route path="/blog" element={<BlogIndexPage />} />
                <Route path="/blog/:slug" element={<BlogPostPage />} />
                <Route path="/impressum" element={<ImpressumPage />} />
                <Route path="/datenschutz" element={<DatenschutzPage />} />
                
                {/* Leistungsseiten */}
                <Route path="/wohnungsentruempelung" element={<WohnungsentruempelungPage />} />
                <Route path="/hausentruempelung" element={<HausentruempelungPage />} />
                <Route path="/kellerentruempelung" element={<KellerentruempelungPage />} />
                <Route path="/dachbodenentruempelung" element={<DachbodenentruempelungPage />} />
                <Route path="/haushaltsaufloesung" element={<HaushaltsaufloesungPage />} />
                <Route path="/firmen-gewerbeentruempelung" element={<GewerbeentruempelungPage />} />
                <Route path="/schrottabholung" element={<SchrottabholungPage />} />
                <Route path="/containerdienst-brieselang" element={<ContainerdienstPage />} />

                <Route path="*" element={<NotFound />} />
              </Routes>
          </Suspense>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
