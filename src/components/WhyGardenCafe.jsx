import React from 'react';
import { Sprout, SunMedium, Coffee, HeartHandshake, Sparkles } from 'lucide-react';

const FEATURES = [
  {
    icon: Sprout,
    title: 'Farm-to-Cup Freshness',
    tagline: 'Harvested Daily in Our Greenhouse',
    desc: 'Every sprig of mint, rosemary, basil and edible floral garnish is plucked fresh from our rooftop garden just minutes before your order is prepared.',
    badge: '100% Organic',
  },
  {
    icon: SunMedium,
    title: 'Sun-Dappled Seating',
    tagline: 'Breathe Amidst Blooming Jasmine',
    desc: 'Step into rustic teakwood tables nestled under climbing jasmine vines, soft natural light, and evening fairy lanterns that transport you far away from city noise.',
    badge: 'Open Air Patio',
  },
  {
    icon: Coffee,
    title: 'Handcrafted Slow Brews',
    tagline: 'Single-Origin Micro-Lots',
    desc: 'Our baristas calibrate grinders every morning. From slow gravity cold drips to manual V60 pour-overs, every cup is an artisanal masterpiece.',
    badge: 'Master Roasters',
  },
  {
    icon: HeartHandshake,
    title: 'Pet & Family Friendly',
    tagline: 'Everyone Belongs in the Garden',
    desc: 'Bring your beloved pets to our open garden lawn! We provide complimentary fresh filtered water bowls and wholesome treats for furry companions.',
    badge: 'Paws Welcome',
  },
];

export default function WhyGardenCafe() {
  return (
    <section id="why" className="relative py-24 sm:py-32 bg-cream-100/60 overflow-hidden">
      
      {/* Decorative leaf SVGs in corners */}
      <div className="absolute top-10 right-10 pointer-events-none opacity-25 text-olive">
        <svg width="150" height="150" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M10 80 Q40 20 90 10 Q80 60 10 80 Z" />
          <path d="M25 65 Q50 45 75 25" />
          <path d="M40 50 Q60 55 70 60" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16 sm:mb-20">
          <span className="ribbon-banner text-xs sm:text-sm mb-4">
            THE GARDEN EXPERIENCE
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight">
            Why Guests Call Us Their Sanctuary
          </h2>
          <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
            Handcrafted with love • Rooted in hospitality
          </p>
        </div>

        {/* 4 Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {FEATURES.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div
                key={idx}
                data-cursor="leaf"
                className="relative flex flex-col justify-between p-7 bg-cream-50/90 rounded-3xl border-2 border-olive/20 shadow-warm-sm hover:shadow-warm-lg hover:border-olive/50 hover:-translate-y-2 transition-all duration-300 group"
              >
                {/* Floating Badge */}
                <div className="flex justify-between items-center mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-olive/10 group-hover:bg-olive group-hover:text-cream-100 text-olive flex items-center justify-center transition-colors duration-300 shadow-sm">
                    <Icon className="w-7 h-7" />
                  </div>
                  <span className="text-[10px] font-sub font-bold tracking-wider px-3 py-1 bg-mustard/20 text-espresso rounded-full uppercase">
                    {item.badge}
                  </span>
                </div>

                {/* Content */}
                <div>
                  <h3 className="font-heading text-xl sm:text-2xl text-forest font-bold group-hover:text-olive transition-colors leading-snug">
                    {item.title}
                  </h3>
                  <div className="font-sub text-xs font-semibold text-olive/80 uppercase tracking-wider mt-1">
                    {item.tagline}
                  </div>
                  <p className="mt-3 font-body text-xs sm:text-sm text-espresso/75 leading-relaxed">
                    {item.desc}
                  </p>
                </div>

                {/* Bottom decorative plant sprout indicator */}
                <div className="mt-6 pt-4 border-t border-olive/15 flex items-center gap-2 text-olive/60 group-hover:text-olive transition-colors">
                  <Sparkles className="w-3.5 h-3.5 text-mustard" />
                  <span className="font-handwriting text-base">Handpicked everyday</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
