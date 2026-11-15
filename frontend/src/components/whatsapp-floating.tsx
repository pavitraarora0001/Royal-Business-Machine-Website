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
      className="fixed bottom-5 right-5 sm:bottom-7 sm:right-7 z-40 flex items-center gap-2 group print:hidden select-none"
    >
      <span className="hidden md:inline-block px-3 py-1.5 rounded-full text-xs font-bold bg-[#20252B] text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none border border-gold/30">
        Chat with Operations
      </span>
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp with Royal Business Machine (+91 9057287689)"
        className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:shadow-2xl hover:scale-105 active:scale-95 transition-all duration-200 relative focus:outline-none focus:ring-4 focus:ring-[#25D366]/30"
      >
        <span className="absolute -top-0.5 -right-0.5 w-3.5 h-3.5 bg-gold rounded-full border-2 border-white animate-pulse" />
        <MessageSquare className="w-6 h-6 fill-current" />
      </a>
    </aside>
  );
}
