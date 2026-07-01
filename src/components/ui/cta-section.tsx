import { Phone, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { COMPANY_INFO } from "@/lib/seo";

interface CTASectionProps {
  title?: string;
  description?: string;
  variant?: "default" | "accent" | "primary";
}

export function CTASection({
  title = "Kostenlose Besichtigung vereinbaren",
  description = "Rufen Sie uns an oder schreiben Sie uns – wir erstellen Ihnen ein unverbindliches Festpreisangebot.",
  variant = "primary",
}: CTASectionProps) {
  const bgClass = {
    default: "bg-secondary",
    accent: "bg-accent text-accent-foreground",
    primary: "bg-primary text-primary-foreground",
  }[variant];

  const textClass = {
    default: "text-foreground",
    accent: "text-accent-foreground",
    primary: "text-primary-foreground",
  }[variant];

  const mutedClass = {
    default: "text-muted-foreground",
    accent: "text-accent-foreground/80",
    primary: "text-primary-foreground/80",
  }[variant];

  return (
    <section className={bgClass}>
      <div className="section-container">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className={`text-2xl font-bold sm:text-3xl lg:text-4xl ${textClass}`}>
            {title}
          </h2>
          <p className={`mt-4 text-lg ${mutedClass}`}>{description}</p>
          <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <a href={`tel:${COMPANY_INFO.phoneLink}`} aria-label={`Anrufen: ${COMPANY_INFO.phone}`}>
              <Button
                size="lg"
                className={
                  variant === "accent"
                    ? "gap-2 bg-primary text-primary-foreground hover:bg-primary/90"
                    : "btn-cta"
                }
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                {COMPANY_INFO.phone}
              </Button>
            </a>
            <a
              href={COMPANY_INFO.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="WhatsApp-Nachricht senden"
            >
              <Button
                size="lg"
                className="gap-2 bg-[#25D366] text-white hover:bg-[#20BD5A]"
              >
                <MessageCircle className="h-5 w-5" aria-hidden="true" />
                WhatsApp schreiben
              </Button>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
