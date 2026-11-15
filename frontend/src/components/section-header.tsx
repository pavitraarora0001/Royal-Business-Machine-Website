import React from "react";

interface SectionHeaderProps {
  badge?: string;
  title: string;
  subtitle?: string;
  centered?: boolean;
  className?: string;
}

export function SectionHeader({
  badge,
  title,
  subtitle,
  centered = true,
  className = "",
}: SectionHeaderProps) {
  return (
    <div
      className={`max-w-3xl mb-12 sm:mb-16 ${
        centered ? "mx-auto text-center" : "text-left"
      } ${className}`}
    >
      {badge && (
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest bg-gold/10 text-gold border border-gold/25 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-gold animate-pulse" />
          <span>{badge}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-charcoal dark:text-warm-white mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-base sm:text-lg text-slate-muted leading-relaxed font-normal">
          {subtitle}
        </p>
      )}
    </div>
  );
}
