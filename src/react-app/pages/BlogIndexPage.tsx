import { Calendar, Clock, ArrowRight, BookOpen } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { SectionHeader } from "@/components/ui/section-header";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import { getPublishedPosts } from "@/lib/blog";
import { COMPANY_INFO, generateBreadcrumbSchema } from "@/lib/seo";

export default function BlogIndexPage() {
  const canonical = `${COMPANY_INFO.website}/blog`;
  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Ratgeber & Blog", url: "/blog" },
  ]);
  const blogListSchema = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "Ratgeber & Blog – Sparschwein Entrümpelung",
    url: canonical,
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      url: COMPANY_INFO.website,
    },
    blogPost: getPublishedPosts().map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: `${COMPANY_INFO.website}/blog/${post.slug}`,
      datePublished: post.publishedAt,
      author: { "@type": "Organization", name: COMPANY_INFO.name },
    })),
  };

  return (
    <>
      {/* JSON-LD im Body; <head>-Meta liefert das Astro-Layout (blog.astro) */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema) }} />


      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground lg:py-24">
        <div className="section-container text-center">
          <div className="mx-auto mb-4 inline-flex items-center gap-2 rounded-full bg-primary-foreground/10 px-4 py-2">
            <BookOpen className="h-5 w-5" />
            <span className="font-semibold">Ratgeber & Wissen</span>
          </div>
          <h1 className="mx-auto mb-4 max-w-3xl text-3xl font-bold sm:text-4xl lg:text-5xl">
            Entrümpelungs-Ratgeber für das Havelland
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-primary-foreground/90">
            Ehrliche Antworten auf häufige Fragen rund um Preise, Ablauf und
            Haushaltsauflösung – aus über 10 Jahren Praxis.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="section-container">
        <SectionHeader badge="Aktuelle Artikel" title="Alle Beiträge" />
        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {getPublishedPosts().map((post) => (
            <a key={post.slug} href={`/blog/${post.slug}`} className="group">
              <Card className="card-hover h-full">
                <CardContent className="flex h-full flex-col p-6">
                  <span className="mb-3 inline-block w-fit rounded-full bg-accent/10 px-3 py-1 text-xs font-semibold text-accent">
                    {post.category}
                  </span>
                  <h2 className="mb-3 text-xl font-bold leading-tight group-hover:text-primary">
                    {post.title}
                  </h2>
                  <p className="mb-4 flex-1 text-sm text-muted-foreground">
                    {post.excerpt}
                  </p>
                  <div className="mb-4 flex items-center gap-4 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5" />
                      {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      })}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5" />
                      {post.readingTimeMin} Min
                    </span>
                  </div>
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-primary group-hover:gap-2 transition-all">
                    Artikel lesen <ArrowRight className="h-4 w-4" />
                  </span>
                </CardContent>
              </Card>
            </a>
          ))}
        </div>

        {getPublishedPosts().length === 1 && (
          <p className="mt-8 text-center text-sm text-muted-foreground">
            Weitere Artikel folgen in Kürze – wir veröffentlichen monatlich neue Ratgeber.
          </p>
        )}
      </section>

      <CTASection
        title="Persönliche Beratung gewünscht?"
        description="Kostenlose Besichtigung, verbindlicher Festpreis – im gesamten Havelland."
      />
    </>
  );
}
