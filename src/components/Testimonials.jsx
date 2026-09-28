import React, { useState, useEffect } from 'react';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: 'Aanya Sharma',
    role: 'Local Food Critic & Architect',
    rating: 5,
    date: 'August 2026',
    comment:
      'Stepping into The Garden Cafe feels like leaving the entire city behind. The aroma of freshly baked sourdough pizza and the gentle sound of leaves in the breeze is pure therapy. The Botanical Lavender Latte is the finest in town!',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    ribbonSub: 'REGULAR PATRON',
  },
  {
    id: 2,
    name: 'Devraj Mukherjee',
    role: 'Coffee Enthusiast & Writer',
    rating: 5,
    date: 'July 2026',
    comment:
      'Their 12-hour cold drip Ethiopian roast is exceptionally clean and fruity. Finding a peaceful garden where you can write for hours while sipping artisanal brews has made this my second home since 2020.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
    ribbonSub: 'VERIFIED VISITOR',
  },
  {
    id: 3,
    name: 'Priya & Siddharth V.',
    role: 'Weekend Brunchers & Pet Parents',
    rating: 5,
    date: 'September 2026',
    comment:
      'We bring our Golden Retriever Leo every Sunday morning! The staff brought him a fresh water bowl and dog treats before we even ordered. And the Claypot Kulhad Chai paired with their hot fries is unmatched!',
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
    ribbonSub: 'PET PARENTS',
  },
  {
    id: 4,
    name: 'Rohan Mehta',
    role: 'Photographer',
    rating: 5,
    date: 'June 2026',
    comment:
      'The natural diffused sunlight filtering through the jasmine arbor makes for magical portraits. You can taste the freshness in the herbs. That honey lavender cheesecake is out of this world.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
    ribbonSub: 'GARDEN LOVER',
  },
];

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? REVIEWS.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % REVIEWS.length);
  };

  const current = REVIEWS[currentIndex];

  return (
    <section id="reviews" className="relative py-24 sm:py-32 bg-cream-100/70 overflow-hidden">
      
      {/* Background radial warmth */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-mustard/10 blur-3xl pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="ribbon-banner text-xs sm:text-sm mb-4">
            TESTIMONIALS
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight">
            Loved by Garden Wanderers
          </h2>
          <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
            Over 140,000 peaceful coffee moments shared since 2018
          </p>
        </div>

        {/* Featured Ribbon Review Card */}
        <div className="relative mx-auto max-w-3xl">
          
          {/* Main Card with Ribbon Styling */}
          <div className="relative p-8 sm:p-12 bg-cream-50 rounded-3xl border-2 border-olive/30 shadow-warm-lg">
            
            {/* Top folded ribbon banner tab on the card */}
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <span className="ribbon-banner text-[11px] py-1 px-5">
                {current.ribbonSub}
              </span>
            </div>

            {/* Quote Icon */}
            <div className="w-12 h-12 rounded-full bg-olive/10 text-olive flex items-center justify-center mb-6 mx-auto">
              <Quote className="w-6 h-6" />
            </div>

            {/* Mustard Star Rating */}
            <div className="flex justify-center items-center gap-1.5 mb-6">
              {[...Array(current.rating)].map((_, i) => (
                <Star
                  key={i}
                  className="w-5 h-5 fill-mustard text-mustard filter drop-shadow-sm"
                />
              ))}
            </div>

            {/* Review Comment */}
            <p className="font-heading text-lg sm:text-2xl text-forest text-center leading-relaxed">
              "{current.comment}"
            </p>

            {/* Author Profile */}
            <div className="mt-8 pt-6 border-t border-olive/20 flex flex-col sm:flex-row items-center justify-center gap-4 text-center sm:text-left">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-mustard shadow-warm-sm">
                <img
                  src={current.avatar}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
              </div>

              <div>
                <h4 className="font-heading text-xl text-forest font-bold">
                  {current.name}
                </h4>
                <div className="flex items-center gap-2 justify-center sm:justify-start">
                  <span className="font-sub text-xs text-olive font-semibold tracking-wider">
                    {current.role}
                  </span>
                  <span className="text-espresso/40">•</span>
                  <span className="font-body text-xs text-espresso/60">
                    {current.date}
                  </span>
                </div>
              </div>
            </div>

          </div>

          {/* Navigation Controls */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handlePrev}
              data-cursor="pointer"
              aria-label="Previous review"
              className="p-3 rounded-full bg-cream-50 hover:bg-cream-200 text-forest border border-olive/30 shadow-warm-sm hover:scale-110 transition-all"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            {/* Dot indicators */}
            <div className="flex items-center gap-2">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentIndex(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-8 bg-olive'
                      : 'w-2.5 bg-olive/30 hover:bg-olive/50'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              data-cursor="pointer"
              aria-label="Next review"
              className="p-3 rounded-full bg-cream-50 hover:bg-cream-200 text-forest border border-olive/30 shadow-warm-sm hover:scale-110 transition-all"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
