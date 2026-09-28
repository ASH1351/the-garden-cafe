import React from 'react';
import { Phone, MapPin, Calendar } from 'lucide-react';

export default function MobileStickyBar({ onOpenReservation }) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 lg:hidden bg-cream-100/95 backdrop-blur-md border-t-2 border-olive/20 shadow-warm-lg p-2.5 px-4 pb-[max(0.65rem,env(safe-area-inset-bottom))] animate-slideUp">
      <div className="flex items-center justify-between gap-2.5">
        {/* Call button */}
        <a
          href="tel:+918041235678"
          data-cursor="pointer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-forest text-cream-100 font-sub text-xs font-bold tracking-wider shadow-sm active:scale-95 transition-transform"
        >
          <Phone className="w-3.5 h-3.5 text-mustard" />
          <span>CALL</span>
        </a>

        {/* Directions button */}
        <a
          href="https://maps.google.com/?q=Indiranagar+Bengaluru"
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="pointer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-olive text-cream-100 font-sub text-xs font-bold tracking-wider shadow-sm active:scale-95 transition-transform"
        >
          <MapPin className="w-3.5 h-3.5 text-mustard" />
          <span>DIRECTIONS</span>
        </a>

        {/* Reserve button */}
        <button
          onClick={onOpenReservation}
          data-cursor="pointer"
          className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-mustard text-espresso font-sub text-xs font-bold tracking-wider shadow-sm active:scale-95 transition-transform"
        >
          <Calendar className="w-3.5 h-3.5 text-forest" />
          <span>RESERVE</span>
        </button>
      </div>
    </div>
  );
}
