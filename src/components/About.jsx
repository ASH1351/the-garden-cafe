import React, { useEffect, useState, useRef } from 'react';
import { Heart, Sparkles, Sprout, Coffee, Users, Award } from 'lucide-react';

function CounterItem({ endValue, suffix = '', label, sublabel, icon: Icon }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const duration = 2000;
    const stepTime = 30;
    const steps = duration / stepTime;
    const increment = endValue / steps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= endValue) {
        setCount(endValue);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [hasStarted, endValue]);

  return (
    <div
      ref={ref}
      className="flex flex-col items-center text-center p-6 bg-cream-100/90 rounded-2xl border border-olive/20 shadow-warm-sm hover:shadow-warm-md hover:-translate-y-1 transition-all duration-300 group"
    >
      <div className="w-12 h-12 rounded-full bg-olive/10 group-hover:bg-olive group-hover:text-cream-100 text-olive flex items-center justify-center transition-colors duration-300 mb-3">
        <Icon className="w-6 h-6" />
      </div>
      <div className="font-heading text-3xl sm:text-4xl text-forest font-bold tracking-tight">
        {count.toLocaleString()}
        {suffix}
      </div>
      <div className="font-sub text-xs sm:text-sm font-bold tracking-wider text-olive mt-1 uppercase">
        {label}
      </div>
      <div className="font-body text-xs text-espresso/60 mt-0.5">
        {sublabel}
      </div>
    </div>
  );
}

export default function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32 bg-cream-100/70 overflow-hidden">
      {/* Hand-drawn organic SVG doodles in background */}
      <div className="absolute top-12 left-8 pointer-events-none opacity-20 text-olive">
        <svg width="120" height="120" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M20 80 Q50 30 80 20 Q70 60 20 80 Z" />
          <path d="M30 65 L65 35" strokeDasharray="3 3" />
        </svg>
      </div>

      <div className="absolute bottom-16 right-10 pointer-events-none opacity-20 text-mustard">
        <svg width="100" height="100" viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="2">
          <circle cx="50" cy="50" r="35" strokeDasharray="5 4" />
          <path d="M50 25 C60 35 60 65 50 75" />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Ribbon Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="ribbon-banner text-xs sm:text-sm mb-4">
            OUR STORY
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight max-w-2xl">
            Rooted in Passion, Brewed with Soul
          </h2>
          <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
            A Botanical Retreat in the Heart of the City
          </p>
        </div>

        {/* Narrative & Visual Story Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Visual Card with Garden Photo & Stamp */}
          <div className="lg:col-span-6 relative">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Frame with Green Ribbon Border */}
              <div className="relative p-3 bg-cream-50 rounded-3xl border-2 border-olive/30 shadow-warm-lg">
                <div className="overflow-hidden rounded-2xl relative aspect-[4/3] group">
                  <img
                    src="/menu-cover.jpg"
                    alt="The Garden Cafe Table and Menu"
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-forest/60 via-transparent to-transparent opacity-80" />
                  
                  {/* Photo Caption Overlay */}
                  <div className="absolute bottom-4 left-4 right-4 text-cream-100">
                    <span className="font-sub text-[10px] tracking-widest uppercase bg-olive px-2.5 py-1 rounded-full">
                      SANCTUARY PATIO
                    </span>
                    <p className="font-heading text-lg mt-1">Under the Sun-Warmed Pergola</p>
                  </div>
                </div>
              </div>

              {/* Handcrafted Seal Stamp */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28 bg-mustard text-espresso rounded-full p-2 shadow-warm-lg flex flex-col items-center justify-center text-center border-4 border-cream-200 rotate-12 hover:rotate-0 transition-transform duration-300">
                <Sprout className="w-5 h-5 text-forest mb-0.5" />
                <span className="font-sub text-[9px] font-black tracking-widest leading-none">
                  FARM FRESH
                </span>
                <span className="font-heading text-xs font-bold mt-0.5">
                  100% ORGANIC
                </span>
              </div>

              {/* Small Note Card */}
              <div className="absolute -top-6 -left-6 hidden sm:flex items-center gap-2 bg-cream-50 border border-olive/30 px-4 py-2.5 rounded-xl shadow-warm-md rotate-[-4deg]">
                <Coffee className="w-4 h-4 text-mustard" />
                <span className="font-handwriting text-base text-espresso">
                  Freshly ground Arabica daily
                </span>
              </div>

            </div>
          </div>

          {/* Right Narrative Text */}
          <div className="lg:col-span-6 space-y-6 text-espresso">
            <h3 className="font-heading text-2xl sm:text-3xl text-forest leading-snug">
              "We didn't just build a cafe. We planted a living sanctuary."
            </h3>

            <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-body">
              Back in the golden spring of <strong>2018</strong>, The Garden Cafe opened its vintage wrought-iron gates with a simple dream: to create a tranquil sanctuary where the rush of the modern world melts away amidst fragrant jasmine vines, handcrafted pour-overs, and warm laughter.
            </p>

            <p className="text-base sm:text-lg text-espresso/80 leading-relaxed font-body">
              Every single cup we pour begins with sustainably grown beans roasted in small micro-lots. Our kitchen sources rosemary, fresh mint, holy basil, and edible flowers directly from our rooftop greenhouse and local organic growers.
            </p>

            {/* Three key pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3">
              <div className="p-3.5 bg-cream-200/80 rounded-xl border border-olive/20">
                <span className="text-olive font-bold text-lg font-heading">01.</span>
                <h4 className="font-sub font-bold text-xs tracking-wider uppercase text-forest mt-1">Farm to Cup</h4>
                <p className="text-xs text-espresso/70 mt-1">Pesticide-free garden botanicals</p>
              </div>

              <div className="p-3.5 bg-cream-200/80 rounded-xl border border-olive/20">
                <span className="text-olive font-bold text-lg font-heading">02.</span>
                <h4 className="font-sub font-bold text-xs tracking-wider uppercase text-forest mt-1">Slow Roasting</h4>
                <p className="text-xs text-espresso/70 mt-1">Ethical single-origin beans</p>
              </div>

              <div className="p-3.5 bg-cream-200/80 rounded-xl border border-olive/20">
                <span className="text-olive font-bold text-lg font-heading">03.</span>
                <h4 className="font-sub font-bold text-xs tracking-wider uppercase text-forest mt-1">Open Skies</h4>
                <p className="text-xs text-espresso/70 mt-1">Pet-friendly patio seating</p>
              </div>
            </div>

            <div className="pt-2">
              <span className="font-handwriting text-2xl text-olive">
                Warmly, The Garden Family & Baristas
              </span>
            </div>
          </div>

        </div>

        {/* Animated Stats Row */}
        <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          <CounterItem
            endValue={2018}
            suffix=""
            label="ESTABLISHED"
            sublabel="Years of Garden Warmth"
            icon={Award}
          />
          <CounterItem
            endValue={140}
            suffix="K+"
            label="HAPPY GUESTS"
            sublabel="Smiles & Memories Served"
            icon={Users}
          />
          <CounterItem
            endValue={38}
            suffix="+"
            label="SIGNATURE DRINKS"
            sublabel="Artisanal Brews & Teas"
            icon={Coffee}
          />
          <CounterItem
            endValue={100}
            suffix="%"
            label="ORGANIC GREENS"
            sublabel="Direct from Garden Greenhouse"
            icon={Sprout}
          />
        </div>

      </div>
    </section>
  );
}
