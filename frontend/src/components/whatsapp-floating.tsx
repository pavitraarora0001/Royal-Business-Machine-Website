"use client";

import { MessageSquare } from "lucide-react";

export function WhatsAppFloatingButton() {
  const phoneNumber = "919057287689";
  const message = encodeURIComponent(
    "Hello Royal Business Machine, I would like to inquire about your enterprise technology solutions."
  );
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <aside
      aria-label="Direct WhatsApp Contact"
      className="fixed bottom-6 right-6 z-50 flex items-center gap-3 group"
    >
      <span className="hidden sm:inline-block px-3 py-1.5 rounded-full text-xs font-semibold bg-charcoal text-warm-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
        Chat with Us
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Royal Business Machine"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 relative focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-gold rounded-full border-2 border-white animate-pulse" />
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
}
