import { memo } from "react";
import { MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/seo";

export const WhatsAppButton = memo(function WhatsAppButton() {
  return (
    <a
      href={COMPANY_INFO.whatsapp}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-4 z-50 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-110 md:flex md:h-16 md:w-16"
      aria-label="WhatsApp Kontakt"
      // Optimize touch target for mobile
      style={{ 
        touchAction: "manipulation",
        // Use CSS animation instead of animate-float class for performance
        animation: "float 3s ease-in-out infinite"
      }}
    >
      <MessageCircle className="h-7 w-7 md:h-8 md:w-8" aria-hidden="true" />
    </a>
  );
});
