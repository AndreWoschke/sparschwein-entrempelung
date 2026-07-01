import { memo } from "react";
import { Phone, MessageCircle } from "lucide-react";
import { COMPANY_INFO } from "@/lib/seo";

export const MobileCallBar = memo(function MobileCallBar() {
  return (
    <div 
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t bg-background shadow-[0_-4px_20px_rgba(0,0,0,0.1)] md:hidden"
      // Reserve space in layout to prevent CLS
      style={{ height: "52px" }}
    >
      <a
        href={`tel:${COMPANY_INFO.phoneLink}`}
        className="flex flex-1 items-center justify-center gap-2 py-3 font-semibold text-primary transition-colors active:bg-secondary"
        style={{ touchAction: "manipulation" }}
        aria-label={`Anrufen: ${COMPANY_INFO.phone}`}
      >
        <Phone className="h-5 w-5" aria-hidden="true" />
        Anrufen
      </a>
      <div className="w-px bg-border" aria-hidden="true" />
      <a
        href={COMPANY_INFO.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-1 items-center justify-center gap-2 bg-[#25D366] py-3 font-semibold text-white transition-colors active:bg-[#20BD5A]"
        style={{ touchAction: "manipulation" }}
        aria-label="WhatsApp-Nachricht senden"
      >
        <MessageCircle className="h-5 w-5" aria-hidden="true" />
        WhatsApp
      </a>
    </div>
  );
});
