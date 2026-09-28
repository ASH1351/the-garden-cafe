import React, { useState, useEffect } from 'react';
import Lenis from 'lenis';
import CustomCursor from './components/CustomCursor';
import PageLoader from './components/PageLoader';
import Navbar from './components/Navbar';
import Hero3D from './components/Hero3D';
import Scene3DManager from './components/Scene3DManager';
import About from './components/About';
import SignatureMenu from './components/SignatureMenu';
import WhyGardenCafe from './components/WhyGardenCafe';
import Gallery from './components/Gallery';
import Testimonials from './components/Testimonials';
import ReservationContact from './components/ReservationContact';
import Footer from './components/Footer';
import MobileStickyBar from './components/MobileStickyBar';
import TrayDrawer from './components/TrayDrawer';

export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  const [trayOpen, setTrayOpen] = useState(false);
  const [trayItems, setTrayItems] = useState([]);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      smoothWheel: true,
    });

    let animationFrameId;
    function raf(time) {
      lenis.raf(time);
      animationFrameId = requestAnimationFrame(raf);
    }
    animationFrameId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(animationFrameId);
      lenis.destroy();
    };
  }, []);

  // Tray management handlers
  const handleAddToCart = (item) => {
    setTrayItems((prev) => {
      const existing = prev.find((i) => i.id === item.id);
      if (existing) {
        return prev.map((i) =>
          i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
        );
      }
      return [...prev, { ...item, quantity: 1 }];
    });
  };

  const handleUpdateQty = (itemId, newQty) => {
    if (newQty <= 0) {
      handleRemoveItem(itemId);
      return;
    }
    setTrayItems((prev) =>
      prev.map((i) => (i.id === itemId ? { ...i, quantity: newQty } : i))
    );
  };

  const handleRemoveItem = (itemId) => {
    setTrayItems((prev) => prev.filter((i) => i.id !== itemId));
  };

  const handleClearTray = () => {
    setTrayItems([]);
  };

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const totalTrayCount = trayItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="relative min-h-screen bg-cream-200 text-espresso selection:bg-olive selection:text-cream-100">
      
      {/* Paper Grain Overlay for Handcrafted Texture */}
      <div className="paper-grain-overlay" />

      {/* Custom Mustard / Leaf Follow Cursor */}
      <CustomCursor />

      {/* Page Load Intro Animation */}
      {!isLoaded && <PageLoader onFinish={() => setIsLoaded(true)} />}

      {/* Persistent 3D Scroll Journey Background */}
      <Scene3DManager />

      {/* Main Navigation Header */}
      <Navbar
        isAudioPlaying={isAudioPlaying}
        onToggleAudio={() => setIsAudioPlaying(!isAudioPlaying)}
        onOpenReservation={() => scrollToSection('contact')}
        onOpenTray={() => setTrayOpen(true)}
        trayItemCount={totalTrayCount}
      />

      {/* Main Content Sections */}
      <main className="relative z-10">
        <Hero3D
          onExploreMenu={() => scrollToSection('menu')}
          onBookTable={() => scrollToSection('contact')}
        />

        <About />

        <SignatureMenu
          onAddToCart={handleAddToCart}
          addedItemIds={trayItems.map((i) => i.id)}
        />

        <WhyGardenCafe />

        <Gallery />

        <Testimonials />

        <ReservationContact />
      </main>

      {/* Footer */}
      <Footer />

      {/* Mobile Sticky Action Bar */}
      <MobileStickyBar onOpenReservation={() => scrollToSection('contact')} />

      {/* Order Tray Drawer */}
      <TrayDrawer
        isOpen={trayOpen}
        onClose={() => setTrayOpen(false)}
        items={trayItems}
        onUpdateQty={handleUpdateQty}
        onRemoveItem={handleRemoveItem}
        onClearTray={handleClearTray}
        onProceedToReservation={() => scrollToSection('contact')}
      />

    </div>
  );
}
