import React, { useState, useEffect } from 'react';
import { Menu, X, ShoppingBag, Calendar, Phone } from 'lucide-react';
import AudioAmbient from './AudioAmbient';

export default function Navbar({
  isAudioPlaying,
  onToggleAudio,
  onOpenReservation,
  onOpenTray,
  trayItemCount = 0
}) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { label: 'HOME', href: '#hero' },
    { label: 'OUR STORY', href: '#about' },
    { label: 'MENU', href: '#menu' },
    { label: 'EXPERIENCE', href: '#why' },
    { label: 'GALLERY', href: '#gallery' },
    { label: 'REVIEWS', href: '#reviews' },
    { label: 'VISIT US', href: '#contact' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-cream-200/90 backdrop-blur-md shadow-warm-sm border-b border-olive/15 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo on Left */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, '#hero')}
            className="flex items-center gap-3 group"
            data-cursor="cup"
          >
            <div className="relative w-12 h-12 rounded-full overflow-hidden border-2 border-forest/30 shadow-warm-sm group-hover:scale-105 transition-transform duration-300 bg-cream-100 flex-shrink-0">
              <img
                src="/logo.png"
                alt="The Garden Cafe Logo"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex flex-col text-left">
              <span className="font-sub text-[10px] tracking-[0.25em] text-olive font-bold uppercase leading-none">
                THE
              </span>
              <span className="font-heading text-lg sm:text-xl text-forest font-bold tracking-tight leading-tight">
                GARDEN CAFE
              </span>
              <span className="font-sub text-[9px] tracking-[0.28em] text-espresso/60 font-semibold leading-none">
                EST. 2018
              </span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center space-x-7">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                data-cursor="pointer"
                className="relative font-sub text-xs tracking-[0.16em] font-semibold text-espresso hover:text-olive transition-colors py-1 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-olive transition-all duration-300 group-hover:w-full rounded-full" />
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden sm:flex items-center gap-3">
            {/* Ambient Audio Toggle */}
            <AudioAmbient isPlaying={isAudioPlaying} onToggle={onToggleAudio} />

            {/* Tray / Order Cart */}
            <button
              onClick={onOpenTray}
              data-cursor="pointer"
              title="View your cafe tray"
              aria-label="Cafe tray"
              className="relative p-2.5 rounded-full bg-cream-100/90 hover:bg-cream-100 text-espresso border border-olive/20 shadow-warm-sm hover:scale-105 transition-all"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              {trayItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-olive text-cream-100 font-sub text-[11px] font-bold flex items-center justify-center animate-bounce">
                  {trayItemCount}
                </span>
              )}
            </button>

            {/* Mustard CTA Button */}
            <button
              onClick={onOpenReservation}
              data-cursor="pointer"
              className="flex items-center gap-2 bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-xs tracking-wider px-5 py-2.5 rounded-full shadow-warm-md hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5" />
              <span>RESERVE A TABLE</span>
            </button>
          </div>

          {/* Mobile menu trigger */}
          <div className="flex items-center gap-2 lg:hidden">
            <button
              onClick={onOpenTray}
              data-cursor="pointer"
              aria-label="Cafe tray"
              className="relative p-2 rounded-full bg-cream-100 text-espresso border border-olive/20"
            >
              <ShoppingBag className="w-4 h-4 text-forest" />
              {trayItemCount > 0 && (
                <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-olive text-cream-100 text-[10px] font-bold flex items-center justify-center">
                  {trayItemCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-cursor="pointer"
              aria-label="Toggle navigation menu"
              className="p-2 rounded-lg text-espresso hover:text-olive focus:outline-none"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-cream-100/98 backdrop-blur-xl border-b border-olive/20 px-6 py-6 shadow-warm-lg animate-fadeIn">
          <div className="flex flex-col space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={(e) => handleNavClick(e, link.href)}
                className="font-sub text-sm tracking-wider font-semibold text-espresso hover:text-olive py-1 border-b border-olive/10"
              >
                {link.label}
              </a>
            ))}

            <div className="pt-3 flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <span className="font-sub text-xs text-espresso/70">Background Atmosphere:</span>
                <AudioAmbient isPlaying={isAudioPlaying} onToggle={onToggleAudio} />
              </div>

              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenReservation();
                }}
                className="w-full bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-xs tracking-wider py-3 rounded-xl shadow-warm-md flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>RESERVE A TABLE</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
