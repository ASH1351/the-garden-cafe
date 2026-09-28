import React, { useState } from 'react';
import { ArrowUp, Instagram, Facebook, MessageCircle, Mail, Heart, Sparkles } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 4000);
    }
  };

  return (
    <footer className="relative bg-forest-dark text-cream-100 overflow-hidden pt-16 pb-12 border-t-4 border-olive">
      
      {/* Decorative Vine & Leaf Border along the top */}
      <div className="absolute top-0 left-0 right-0 h-6 -translate-y-3 pointer-events-none flex justify-center items-center overflow-hidden opacity-90">
        <div className="w-full flex items-center justify-around text-leaf">
          {[...Array(12)].map((_, i) => (
            <div key={i} className="flex items-center gap-4">
              <svg width="32" height="18" viewBox="0 0 32 18" fill="currentColor">
                <path d="M0 9 Q16 0 32 9 Q16 18 0 9 Z" />
              </svg>
              {i === 6 && (
                /* Small Animated Teacup in Vine Border */
                <div className="relative -top-2 flex flex-col items-center">
                  <div className="w-1 h-2 bg-mustard rounded-full animate-bounce" />
                  <span className="text-xl">☕</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 pt-4">
        
        {/* Main 4-Column Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-cream-200/15">
          
          {/* Col 1: Brand & Logo Badge */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-full overflow-hidden border-2 border-mustard bg-cream-100 shadow-md">
                <img
                  src="/logo.png"
                  alt="The Garden Cafe Badge"
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <span className="font-sub text-[10px] tracking-[0.25em] text-mustard font-bold block uppercase">
                  THE
                </span>
                <span className="font-heading text-2xl text-cream-100 font-bold block tracking-tight">
                  GARDEN CAFE
                </span>
                <span className="font-sub text-[10px] tracking-[0.3em] text-cream-300/70 font-semibold block">
                  EST. 2018
                </span>
              </div>
            </div>

            <p className="font-body text-sm text-cream-200/80 leading-relaxed pr-4">
              A botanical sanctuary where time slows down. Fresh garden ingredients, slow-roasted artisanal coffee, and lush garden seating for peaceful souls.
            </p>

            <div className="pt-1 flex items-center gap-3">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                data-cursor="pointer"
                className="w-9 h-9 rounded-full bg-forest text-cream-100 hover:bg-mustard hover:text-espresso flex items-center justify-center transition-all duration-300"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href="https://whatsapp.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                data-cursor="pointer"
                className="w-9 h-9 rounded-full bg-forest text-cream-100 hover:bg-mustard hover:text-espresso flex items-center justify-center transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                data-cursor="pointer"
                className="w-9 h-9 rounded-full bg-forest text-cream-100 hover:bg-mustard hover:text-espresso flex items-center justify-center transition-all duration-300"
              >
                <Facebook className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="font-heading text-lg text-mustard font-bold tracking-wide">
              Explore
            </h4>
            <ul className="space-y-2 font-sub text-xs tracking-wider">
              {['Home', 'Our Story', 'Menu', 'Experience', 'Gallery', 'Reviews', 'Visit Us'].map((item) => (
                <li key={item}>
                  <a
                    href={`#${item.toLowerCase().replace(' ', '')}`}
                    data-cursor="pointer"
                    className="text-cream-200/80 hover:text-mustard transition-colors flex items-center gap-1.5"
                  >
                    <span>›</span>
                    <span>{item.toUpperCase()}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Hours & Cafe Timings */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg text-mustard font-bold tracking-wide">
              Garden Hours
            </h4>
            <div className="space-y-2 font-body text-xs text-cream-200/80">
              <div className="flex justify-between border-b border-cream-200/10 pb-1.5">
                <span>Mon – Fri:</span>
                <span className="font-semibold text-cream-100">8:00 AM – 10:30 PM</span>
              </div>
              <div className="flex justify-between border-b border-cream-200/10 pb-1.5">
                <span>Saturday:</span>
                <span className="font-semibold text-cream-100">7:30 AM – 11:00 PM</span>
              </div>
              <div className="flex justify-between border-b border-cream-200/10 pb-1.5">
                <span>Sunday Brunch:</span>
                <span className="font-semibold text-cream-100">7:30 AM – 11:00 PM</span>
              </div>
              <p className="font-handwriting text-base text-mustard pt-1">
                Pet-friendly garden lawn open all day!
              </p>
            </div>
          </div>

          {/* Col 4: Newsletter / Garden Letters */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="font-heading text-lg text-mustard font-bold tracking-wide">
              Garden Letters
            </h4>
            <p className="font-body text-xs text-cream-200/80">
              Subscribe to receive seasonal menu announcements, coffee tasting invites, and botanical gardening tips.
            </p>

            <form onSubmit={handleSubscribe} className="space-y-2">
              <div className="relative">
                <input
                  type="email"
                  required
                  placeholder="your.email@garden.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-cream-100/10 border border-cream-100/20 text-cream-100 placeholder:text-cream-100/40 text-xs focus:outline-none focus:border-mustard"
                />
              </div>
              <button
                type="submit"
                data-cursor="pointer"
                className="w-full py-2.5 px-4 rounded-xl bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-xs tracking-wider transition-all duration-200 shadow-warm-sm"
              >
                {isSubscribed ? 'WELCOME TO THE GARDEN! 🌿' : 'SUBSCRIBE TO NEWSLETTER'}
              </button>
            </form>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sub text-cream-200/60">
          <div>
            © 2018–2026 THE GARDEN CAFE. All rights reserved.
          </div>

          <div className="flex items-center gap-1 font-body">
            <span>Handcrafted with</span>
            <Heart className="w-3.5 h-3.5 text-mustard fill-mustard inline mx-0.5" />
            <span>& single-origin coffee in the garden.</span>
          </div>

          <button
            onClick={scrollToTop}
            data-cursor="pointer"
            aria-label="Back to top"
            className="flex items-center gap-2 p-2 px-3 rounded-full bg-forest hover:bg-forest-light text-cream-100 border border-cream-200/20 transition-all hover:-translate-y-0.5"
          >
            <span>TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-mustard" />
          </button>
        </div>

      </div>
    </footer>
  );
}
