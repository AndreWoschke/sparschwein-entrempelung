import React from "react";

interface ServiceIntroSectionProps {
  title: string;
  imageSrc: string;
  imageAlt: string;
  paragraphs: string[];
}

export function ServiceIntroSection({
  title,
  imageSrc,
  imageAlt,
  paragraphs,
}: ServiceIntroSectionProps) {
  return (
    <section className="section-container">
      <div className="mx-auto max-w-6xl">
        {/* Mobile: Image oben, Text unten | Desktop: Image links, Text rechts */}
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Bild mit festen Dimensionen für CLS */}
          <div className="order-1">
            <div className="aspect-[4/3] overflow-hidden rounded-2xl shadow-lg">
              <img
                src={imageSrc}
                alt={imageAlt}
                width={600}
                height={450}
                className="h-full w-full object-cover"
                loading="lazy"
                decoding="async"
              />
            </div>
          </div>

          {/* Text */}
          <div className="order-2">
            {/* Badge */}
            <span className="mb-4 inline-block rounded-full bg-accent/10 px-4 py-1.5 text-sm font-medium text-accent">
              Kurz erklärt
            </span>

            {/* Überschrift */}
            <h2 className="mb-6 text-2xl font-bold leading-tight text-foreground sm:text-3xl lg:text-4xl">
              {title}
            </h2>

            {/* Absätze mit mehr Weißraum */}
            <div className="space-y-4">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-base leading-relaxed text-muted-foreground lg:text-lg"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
