import { useParams, Link, Navigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowLeft, Phone, MessageCircle, Quote } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CTASection } from "@/components/ui/cta-section";
import {
  getBlogPostBySlug,
  getRelatedPosts,
  type BlogBlock,
} from "@/lib/blog";
import { COMPANY_INFO, generateBreadcrumbSchema } from "@/lib/seo";

function renderBlock(block: BlogBlock, idx: number) {
  switch (block.type) {
    case "h2":
      return (
        <h2 key={idx} className="mb-4 mt-10 text-2xl font-bold text-foreground sm:text-3xl">
          {block.text}
        </h2>
      );
    case "h3":
      return (
        <h3 key={idx} className="mb-3 mt-8 text-xl font-semibold text-foreground">
          {block.text}
        </h3>
      );
    case "p":
      return (
        <p key={idx} className="mb-4 leading-relaxed text-foreground/90">
          {block.text}
        </p>
      );
    case "ul":
      return (
        <ul key={idx} className="mb-6 ml-6 list-disc space-y-2 text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ul>
      );
    case "ol":
      return (
        <ol key={idx} className="mb-6 ml-6 list-decimal space-y-2 text-foreground/90">
          {block.items.map((item, i) => (
            <li key={i} className="leading-relaxed">{item}</li>
          ))}
        </ol>
      );
    case "quote":
      return (
        <blockquote
          key={idx}
          className="my-8 rounded-lg border-l-4 border-accent bg-accent/5 p-6"
        >
          <Quote className="mb-2 h-6 w-6 text-accent" />
          <p className="text-lg italic text-foreground">{block.text}</p>
        </blockquote>
      );
    case "links":
      return (
        <aside
          key={idx}
          className="my-8 rounded-lg border bg-secondary/50 p-5"
          aria-label={block.title}
        >
          <p className="mb-3 text-sm font-bold uppercase tracking-wide text-primary">
            {block.title}
          </p>
          <ul className="flex flex-wrap gap-2">
            {block.items.map((item, i) => (
              <li key={i}>
                <Link
                  to={item.to}
                  className="inline-block rounded-full border border-primary/30 bg-card px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:bg-primary hover:text-primary-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      );
    default:
      return null;
  }
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = slug ? getBlogPostBySlug(slug) : undefined;

  if (!post) {
    return <Navigate to="/blog" replace />;
  }

  const canonical = `${COMPANY_INFO.website}/blog/${post.slug}`;
  const related = getRelatedPosts(post.slug, 2);

  // Article-Schema (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.metaDescription,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    author: {
      "@type": "Organization",
      name: COMPANY_INFO.legalName,
      url: COMPANY_INFO.website,
    },
    publisher: {
      "@type": "Organization",
      name: COMPANY_INFO.name,
      logo: {
        "@type": "ImageObject",
        url: `${COMPANY_INFO.website}/favicon.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": canonical,
    },
    keywords: post.keywords.join(", "),
  };

  const breadcrumbSchema = generateBreadcrumbSchema([
    { name: "Startseite", url: "/" },
    { name: "Blog", url: "/blog" },
    { name: post.title, url: `/blog/${post.slug}` },
  ]);

  return (
    <Layout>
      <Helmet>
        <title>{post.metaTitle}</title>
        <meta name="description" content={post.metaDescription} />
        <meta name="keywords" content={post.keywords.join(", ")} />
        <link rel="canonical" href={canonical} />
        <meta property="og:title" content={post.title} />
        <meta property="og:description" content={post.metaDescription} />
        <meta property="og:url" content={canonical} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={post.publishedAt} />
        <meta property="article:modified_time" content={post.updatedAt} />
        <script type="application/ld+json">{JSON.stringify(articleSchema)}</script>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>

      {/* Hero */}
      <section className="bg-gradient-to-br from-primary to-primary/80 py-16 text-primary-foreground lg:py-20">
        <div className="section-container">
          <div className="mx-auto max-w-3xl">
            <nav className="mb-6 text-sm text-primary-foreground/80">
              <Link to="/" className="hover:text-primary-foreground">Startseite</Link>
              <span className="mx-2">/</span>
              <Link to="/blog" className="hover:text-primary-foreground">Blog</Link>
            </nav>
            <span className="mb-4 inline-block rounded-full bg-primary-foreground/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide">
              {post.category}
            </span>
            <h1 className="mb-4 text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-sm text-primary-foreground/80">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-4 w-4" />
                {new Date(post.publishedAt).toLocaleDateString("de-DE", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" />
                {post.readingTimeMin} Min Lesezeit
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article body */}
      <article className="section-container">
        <div className="mx-auto max-w-3xl">
          <p className="mb-8 border-l-4 border-primary bg-secondary p-4 text-lg font-medium leading-relaxed text-foreground">
            {post.excerpt}
          </p>

          <div className="prose prose-lg max-w-none">
            {post.content.map((block, idx) => renderBlock(block, idx))}
          </div>

          {/* Inline-CTA */}
          <aside className="mt-12 rounded-xl border bg-card p-6 shadow-sm" aria-label="Festpreisangebot anfordern">
            <p className="mb-2 text-xl font-bold">Festpreisangebot anfordern</p>
            <p className="mb-4 text-muted-foreground">
              Kostenlose Besichtigung, verbindlicher Festpreis, keine Anfahrtskosten.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href={`tel:${COMPANY_INFO.phoneLink}`}>
                <Button className="btn-cta gap-2">
                  <Phone className="h-4 w-4" />
                  {COMPANY_INFO.phone}
                </Button>
              </a>
              <a href={COMPANY_INFO.whatsapp} target="_blank" rel="noopener noreferrer">
                <Button className="gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]">
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp
                </Button>
              </a>
            </div>
          </aside>

          {/* Zurück */}
          <div className="mt-12">
            <Link to="/blog" className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline">
              <ArrowLeft className="h-4 w-4" /> Zurück zur Übersicht
            </Link>
          </div>
        </div>
      </article>

      {/* Related */}
      {related.length > 0 && (
        <section className="bg-secondary">
          <div className="section-container">
            <h2 className="mb-8 text-center text-2xl font-bold">Weitere Ratgeber</h2>
            <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
              {related.map((p) => (
                <Link key={p.slug} to={`/blog/${p.slug}`} className="group">
                  <Card className="card-hover h-full">
                    <CardContent className="p-6">
                      <h3 className="mb-2 font-bold group-hover:text-primary">{p.title}</h3>
                      <p className="text-sm text-muted-foreground">{p.excerpt}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTASection
        title="Bereit für Ihre Entrümpelung?"
        description="Kostenlose Besichtigung, verbindlicher Festpreis, besenreine Übergabe."
      />
    </Layout>
  );
}
