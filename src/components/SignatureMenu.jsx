import React, { useState, useRef, useEffect } from 'react';
import { Coffee, CupSoda, Utensils, Cake, Plus, Check, Sparkles, ChevronDown, ArrowDown } from 'lucide-react';

const MENU_CATEGORIES = [
  { id: 'coffee', label: 'Coffee & Brews', icon: Coffee },
  { id: 'cold', label: 'Cold Botanicals', icon: CupSoda },
  { id: 'bites', label: 'Garden Bites', icon: Utensils },
  { id: 'desserts', label: 'Artisan Desserts', icon: Cake },
];

const MENU_DATA = {
  coffee: [
    {
      id: 'c1',
      name: 'Botanical Lavender Latte',
      price: 260,
      badge: "Chef's Special",
      desc: 'Double espresso, velvety oat milk, organic garden lavender blossom syrup, topped with dried violet petals.',
      tags: ['Organic', 'Vegan Option'],
      rating: 4.9,
    },
    {
      id: 'c2',
      name: 'Claypot Dum Kulhad Chai',
      price: 160,
      badge: 'Traditional',
      desc: 'Slow-brewed Assam CTC simmered with fresh crushed green cardamom, ginger & garden lemongrass in an earthen terracotta cup.',
      tags: ['House Heritage', 'Spiced'],
      rating: 5.0,
    },
    {
      id: 'c3',
      name: 'Golden Tulip Cappuccino',
      price: 240,
      badge: 'Signature',
      desc: 'Double ristretto pull, silky microfoam dusted with golden cinnamon bark and cocoa dusting in our signature ceramic cup.',
      tags: ['Single Origin', 'Creamy'],
      rating: 4.8,
    },
    {
      id: 'c4',
      name: 'Cold Drip Ethiopian Yirgacheffe',
      price: 280,
      badge: 'Single Origin',
      desc: '12-hour slow gravity drip revealing delicate notes of bergamot, peach blossoms and sweet wildflower honey.',
      tags: ['Light Roast', 'Chilled'],
      rating: 4.9,
    },
    {
      id: 'c5',
      name: 'Cacao Hazelnut Mocha',
      price: 270,
      badge: 'Popular',
      desc: 'Artisanal dark chocolate ganache blended with Chikmagalur espresso, textured milk and roasted hazelnut brittle.',
      tags: ['Indulgent', 'Rich'],
      rating: 4.7,
    },
    {
      id: 'c6',
      name: 'Classic V60 Manual Pour-Over',
      price: 230,
      badge: 'Barista Choice',
      desc: 'Artisan manual brew prepared tableside. Crisp floral acidity, hints of red berries and clean lingering finish.',
      tags: ['Filter Coffee', 'Zero Sugar'],
      rating: 4.9,
    },
  ],
  cold: [
    {
      id: 'd1',
      name: 'Cucumber Mint Botanical Tonic',
      price: 210,
      badge: 'Garden Pick',
      desc: 'Crisp garden cucumber ribbons, hand-plucked spearmint, elderflower tonic reduction, served over crystalline ice blocks.',
      tags: ['Zero Sugar', 'Ultra Refreshing'],
      rating: 4.8,
    },
    {
      id: 'd2',
      name: 'Cascara Sun-Brewed Iced Tea',
      price: 190,
      badge: 'Sustainable',
      desc: 'Sun-dried coffee cherry cascara steeped with wild hibiscus, blood orange wheels, and honey blossom spritz.',
      tags: ['Antioxidant Rich', 'Floral'],
      rating: 4.7,
    },
    {
      id: 'd3',
      name: 'Iced Spanish Saffron Latte',
      price: 290,
      badge: 'Luxury',
      desc: 'Chilled espresso shaken with silky condensed milk, Kashmiri saffron threads, cardamom foam and flaky sea salt.',
      tags: ['Signature Cold', 'Sweet'],
      rating: 5.0,
    },
    {
      id: 'd4',
      name: 'Wild Berry Rosé Sparkler',
      price: 220,
      badge: 'Bestseller',
      desc: 'Muddled garden blackberries & raspberries, garden rosemary sprig, fresh Persian lime and effervescent water.',
      tags: ['Caffeine Free', 'Crisp'],
      rating: 4.8,
    },
    {
      id: 'd5',
      name: 'Ceremonial Matcha Coconut Cloud',
      price: 270,
      badge: 'Superfood',
      desc: 'First-harvest Kyoto Uji matcha whisked with tender organic coconut water and topped with cold vanilla cream cloud.',
      tags: ['Kyoto Matcha', 'Energizing'],
      rating: 4.9,
    },
  ],
  bites: [
    {
      id: 'b1',
      name: 'Garden Basil Stone-Oven Pizza',
      price: 420,
      badge: 'Woodfired',
      desc: '48-hour slow fermented sourdough, San Marzano plum tomatoes, fior di latte mozzarella, and garden-plucked sweet basil.',
      tags: ['Sourdough', 'Vegetarian'],
      rating: 5.0,
    },
    {
      id: 'b2',
      name: 'Smoked Herb Brioche Burger',
      price: 360,
      badge: 'House Favorite',
      desc: 'Grilled artisan patty, melted aged English cheddar, slow-caramelized garden onions, crisp butterhead lettuce and truffle aioli.',
      tags: ['Handcrafted', 'Juicy'],
      rating: 4.9,
    },
    {
      id: 'b3',
      name: 'Wok-Tossed Garden Street Noodles',
      price: 320,
      badge: 'Savory',
      desc: 'Hand-pulled flat noodles tossed with crisp garden bell peppers, scallions, toasted sesame, and chili-infused herb oil.',
      tags: ['Spicy', 'Vegan Friendly'],
      rating: 4.8,
    },
    {
      id: 'b4',
      name: 'Avocado & Whipped Ricotta Tartine',
      price: 340,
      badge: 'Breakfast All Day',
      desc: 'Thick sliced country sourdough loaf, Hass avocado slices, lemon whipped herb ricotta, pomegranate seeds and Egyptian dukkah.',
      tags: ['Healthy', 'High Fiber'],
      rating: 4.9,
    },
    {
      id: 'b5',
      name: 'Truffle & Rosemary Garden Fries',
      price: 220,
      badge: 'Snack',
      desc: 'Hand-cut double cooked skin-on Russet potatoes tossed in aromatic garden rosemary, white truffle oil, and parmesan shreds.',
      tags: ['Crispy', 'Shareable'],
      rating: 4.7,
    },
  ],
  desserts: [
    {
      id: 's1',
      name: 'Honey Lavender Basque Cheesecake',
      price: 290,
      badge: 'Signature Dessert',
      desc: 'Deeply caramelized rustic top giving way to a velvety molten core infused with wild forest clover honey and floral lavender.',
      tags: ['Gluten Free', 'Decadent'],
      rating: 5.0,
    },
    {
      id: 's2',
      name: 'Pistachio Rose Blossom Croissant',
      price: 230,
      badge: 'French Laminated',
      desc: 'Flaky Normandy butter croissant filled with stone-ground Sicilian pistachio paste and glazed with Persian rose syrup.',
      tags: ['Pastry', 'Nutty'],
      rating: 4.9,
    },
    {
      id: 's3',
      name: 'Dark Belgian Chocolate Flourless Torte',
      price: 280,
      badge: 'Rich Cacao',
      desc: 'Dense 72% Valrhona dark chocolate cake sprinkled with Maldon sea salt flakes, accompanied by chilled espresso crème chantilly.',
      tags: ['Intense', 'Gluten Free'],
      rating: 4.8,
    },
    {
      id: 's4',
      name: 'Warm Orchard Apple & Almond Crumble',
      price: 260,
      badge: 'Warm & Cozy',
      desc: 'Cinnamon & nutmeg stewed Himachal apples baked beneath an organic oat and toasted almond crust, topped with Madagascar vanilla gelato.',
      tags: ['Served Warm', 'Classic'],
      rating: 4.9,
    },
  ],
};

const FRAME_FILES = [
  "ezgif-frame-001.jpg","ezgif-frame-006.jpg","ezgif-frame-011.jpg","ezgif-frame-016.jpg",
  "ezgif-frame-021.jpg","ezgif-frame-026.jpg","ezgif-frame-031.jpg","ezgif-frame-036.jpg",
  "ezgif-frame-041.jpg","ezgif-frame-046.jpg","ezgif-frame-051.jpg","ezgif-frame-056.jpg",
  "ezgif-frame-061.jpg","ezgif-frame-066.jpg","ezgif-frame-071.jpg","ezgif-frame-076.jpg",
  "ezgif-frame-081.jpg","ezgif-frame-086.jpg","ezgif-frame-091.jpg","ezgif-frame-096.jpg",
  "ezgif-frame-101.jpg","ezgif-frame-106.jpg","ezgif-frame-111.jpg","ezgif-frame-116.jpg",
  "ezgif-frame-121.jpg","ezgif-frame-126.jpg","ezgif-frame-131.jpg","ezgif-frame-136.jpg",
  "ezgif-frame-141.jpg","ezgif-frame-146.jpg","ezgif-frame-151.jpg","ezgif-frame-156.jpg",
  "ezgif-frame-161.jpg","ezgif-frame-166.jpg","ezgif-frame-171.jpg","ezgif-frame-176.jpg",
  "ezgif-frame-181.jpg","ezgif-frame-186.jpg","ezgif-frame-191.jpg","ezgif-frame-196.jpg",
  "ezgif-frame-201.jpg","ezgif-frame-206.jpg","ezgif-frame-211.jpg","ezgif-frame-216.jpg",
  "ezgif-frame-221.jpg","ezgif-frame-226.jpg","ezgif-frame-231.jpg","ezgif-frame-236.jpg",
  "ezgif-frame-241.jpg","ezgif-frame-246.jpg","ezgif-frame-251.jpg","ezgif-frame-256.jpg",
  "ezgif-frame-261.jpg","ezgif-frame-266.jpg","ezgif-frame-271.jpg","ezgif-frame-276.jpg",
  "ezgif-frame-281.jpg","ezgif-frame-286.jpg","ezgif-frame-291.jpg","ezgif-frame-296.jpg",
  "ezgif-frame-300.jpg"
];

/* ------------------------------------------------------------------ */
/* Scroll-Driven Living Menu Journal (Sticky Scroll Scrubbing)        */
/* ------------------------------------------------------------------ */
function ScrollLivingMenu() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentFrameRef = useRef(0);
  const targetFrameRef = useRef(0);

  // Preload all 61 frames
  useEffect(() => {
    let count = 0;
    const imgs = FRAME_FILES.map((filename) => {
      const img = new Image();
      img.src = `/menu-book-frames/${filename}`;
      img.onload = () => {
        count++;
        setLoadedCount(count);
      };
      return img;
    });
    imagesRef.current = imgs;
  }, []);

  // Track scroll position inside sticky section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = rect.height - window.innerHeight;
      if (totalScrollable <= 0) return;

      const progress = Math.max(0, Math.min(1, -rect.top / totalScrollable));
      setScrollProgress(progress);
      targetFrameRef.current = Math.min(
        Math.floor(progress * (FRAME_FILES.length - 1)),
        FRAME_FILES.length - 1
      );
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 60fps Smooth Lerp Rendering on Canvas
  useEffect(() => {
    let animationFrameId;

    const render = () => {
      // Lerp frame for liquid smoothness
      currentFrameRef.current += (targetFrameRef.current - currentFrameRef.current) * 0.22;
      const frameIdx = Math.round(currentFrameRef.current);

      const canvas = canvasRef.current;
      if (canvas && imagesRef.current[frameIdx]) {
        const ctx = canvas.getContext('2d');
        const img = imagesRef.current[frameIdx];

        if (img && img.complete && img.naturalWidth > 0) {
          const dpr = window.devicePixelRatio || 1;
          const displayWidth = canvas.clientWidth;
          const displayHeight = canvas.clientHeight;

          if (canvas.width !== displayWidth * dpr || canvas.height !== displayHeight * dpr) {
            canvas.width = displayWidth * dpr;
            canvas.height = displayHeight * dpr;
          }

          ctx.save();
          ctx.scale(dpr, dpr);

          // Draw image with aspect ratio 'cover'
          const imgRatio = img.naturalWidth / img.naturalHeight;
          const canvasRatio = displayWidth / displayHeight;
          let renderW, renderH, offsetX, offsetY;

          if (canvasRatio > imgRatio) {
            renderW = displayWidth;
            renderH = displayWidth / imgRatio;
            offsetX = 0;
            offsetY = (displayHeight - renderH) / 2;
          } else {
            renderH = displayHeight;
            renderW = displayHeight * imgRatio;
            offsetX = (displayWidth - renderW) / 2;
            offsetY = 0;
          }

          ctx.clearRect(0, 0, displayWidth, displayHeight);
          ctx.drawImage(img, offsetX, offsetY, renderW, renderH);
          ctx.restore();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrameId);
  }, [loadedCount]);

  const scrollToCatalog = () => {
    const el = document.getElementById('menu-catalog');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[260vh] bg-cream-200"
    >
      {/* Sticky Fullscreen Pinned Canvas Viewport */}
      <div className="sticky top-0 h-screen w-full flex items-center justify-center overflow-hidden">
        
        {/* Fullscreen Canvas */}
        <canvas
          ref={canvasRef}
          className="w-full h-full object-cover select-none pointer-events-none"
        />

        {/* Vintage Vignette Overlay */}
        <div className="absolute inset-0 pointer-events-none bg-gradient-to-t from-forest-darker/60 via-transparent to-cream-200/50" />

        {/* Top Header Pill & Instructions */}
        <div className="absolute top-20 sm:top-24 left-0 right-0 z-20 flex flex-col items-center text-center px-4 pointer-events-none">
          <span className="ribbon-banner text-xs sm:text-sm mb-2 shadow-warm-md">
            SCROLL TO UNFOLD THE LIVING MENU
          </span>
          <h2 className="font-heading text-2xl sm:text-4xl text-forest font-bold drop-shadow-sm">
            Watch Recipes Emerge from the Pages
          </h2>
          <p className="font-sub text-[11px] sm:text-xs tracking-[0.2em] text-espresso/80 font-bold uppercase mt-1">
            Scroll smoothly to control time & transformation
          </p>
        </div>

        {/* Dynamic Story Overlays that respond to scroll progress */}
        
        {/* Phase 1: The Closed Heritage Leather Menu (0 - 30%) */}
        <div
          className={`absolute left-6 sm:left-12 bottom-24 sm:bottom-28 max-w-sm p-5 sm:p-6 bg-cream-100/95 backdrop-blur-md rounded-2xl border-2 border-olive/30 shadow-warm-lg transition-all duration-500 pointer-events-auto ${
            scrollProgress < 0.28
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-block px-2.5 py-0.5 bg-olive text-cream-100 font-sub text-[10px] font-bold tracking-widest rounded-md uppercase mb-2">
            CHAPTER 01 • EST. 2018
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-forest font-bold">
            The Heritage Leather Journal
          </h3>
          <p className="mt-2 font-body text-xs sm:text-sm text-espresso/80 leading-relaxed">
            Resting on sun-warmed teakwood in our jasmine courtyard, our leather-bound menu holds generations of culinary stories.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-olive font-sub text-xs font-bold">
            <span>Scroll down to turn the page</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce" />
          </div>
        </div>

        {/* Phase 2: Pages Open & Sketches Reveal (30% - 65%) */}
        <div
          className={`absolute right-6 sm:right-12 bottom-24 sm:bottom-28 max-w-sm p-5 sm:p-6 bg-cream-100/95 backdrop-blur-md rounded-2xl border-2 border-olive/30 shadow-warm-lg transition-all duration-500 pointer-events-auto ${
            scrollProgress >= 0.28 && scrollProgress < 0.65
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-block px-2.5 py-0.5 bg-mustard text-espresso font-sub text-[10px] font-bold tracking-widest rounded-md uppercase mb-2">
            CHAPTER 02 • BOTANICAL CRAFT
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-forest font-bold">
            Hand-Drawn Garden Sketches
          </h3>
          <p className="mt-2 font-body text-xs sm:text-sm text-espresso/80 leading-relaxed">
            Before every recipe reaches your table, it is illustrated with fresh garden herbs, cold-pressed oils, and farm botanicals.
          </p>
          <div className="mt-3 flex items-center gap-1.5 text-forest font-sub text-xs font-bold">
            <span>Keep scrolling to watch dishes bloom</span>
            <ArrowDown className="w-3.5 h-3.5 animate-bounce text-mustard" />
          </div>
        </div>

        {/* Phase 3: The Full Feast Materializes (65% - 100%) */}
        <div
          className={`absolute left-6 sm:left-12 bottom-24 sm:bottom-28 max-w-sm p-5 sm:p-6 bg-cream-100/95 backdrop-blur-md rounded-2xl border-2 border-olive/30 shadow-warm-lg transition-all duration-500 pointer-events-auto ${
            scrollProgress >= 0.65
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-8 pointer-events-none'
          }`}
        >
          <div className="inline-block px-2.5 py-0.5 bg-leaf text-cream-100 font-sub text-[10px] font-bold tracking-widest rounded-md uppercase mb-2">
            CHAPTER 03 • CULINARY BLOOM
          </div>
          <h3 className="font-heading text-xl sm:text-2xl text-forest font-bold">
            The Living Garden Feast
          </h3>
          <p className="mt-2 font-body text-xs sm:text-sm text-espresso/80 leading-relaxed">
            Steaming Kulhad Chai, stone-oven Basil Pizza, Smoked Brioche Burger, and Wok Street Noodles elevate into reality!
          </p>
          <button
            onClick={scrollToCatalog}
            data-cursor="pointer"
            className="mt-3 flex items-center gap-2 px-4 py-2 bg-mustard hover:bg-mustard-light text-espresso font-sub text-xs font-bold tracking-wider rounded-xl transition-all shadow-sm"
          >
            <Sparkles className="w-3.5 h-3.5 text-forest" />
            <span>EXPLORE FULL MENU & ORDER</span>
          </button>
        </div>

        {/* Bottom Milestone Progress Track HUD */}
        <div className="absolute bottom-5 sm:bottom-8 left-1/2 -translate-x-1/2 w-11/12 max-w-xl z-20 flex flex-col items-center">
          <div className="w-full bg-cream-100/90 backdrop-blur-md p-2.5 sm:p-3 rounded-2xl border border-olive/30 shadow-warm-md flex flex-col gap-2">
            <div className="flex items-center justify-between text-[10px] sm:text-[11px] font-sub font-bold uppercase tracking-wider text-forest">
              <span className={scrollProgress < 0.3 ? 'text-olive underline font-black' : 'text-espresso/60'}>
                1. Heritage Book
              </span>
              <span className={scrollProgress >= 0.3 && scrollProgress < 0.65 ? 'text-olive underline font-black' : 'text-espresso/60'}>
                2. Pages Open
              </span>
              <span className={scrollProgress >= 0.65 ? 'text-olive underline font-black' : 'text-espresso/60'}>
                3. Feast Elevates
              </span>
            </div>

            {/* Continuous Progress Fill Bar */}
            <div className="h-2 w-full bg-cream-300 rounded-full overflow-hidden p-0.5">
              <div
                className="h-full bg-gradient-to-r from-olive via-mustard to-leaf rounded-full transition-all duration-75 ease-out"
                style={{ width: `${Math.round(scrollProgress * 100)}%` }}
              />
            </div>
          </div>
        </div>

        {/* Quick Skip to Menu Catalog button on top-right */}
        <button
          onClick={scrollToCatalog}
          data-cursor="pointer"
          className="absolute top-24 right-6 sm:right-10 z-20 hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-cream-100/90 backdrop-blur-md border border-olive/30 text-forest font-sub text-xs font-bold tracking-wider shadow-warm-sm hover:bg-cream-100 hover:scale-105 transition-all"
        >
          <span>Skip to Catalogue</span>
          <ChevronDown className="w-3.5 h-3.5 text-olive" />
        </button>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3D Tilt Card Component                                            */
/* ------------------------------------------------------------------ */
function MenuTiltCard({ item, onAddToCart, isAdded }) {
  const cardRef = useRef(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const tiltX = ((y - centerY) / centerY) * -10;
    const tiltY = ((x - centerX) / centerX) * 10;

    setTilt({ x: tiltX, y: tiltY });
  };

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setTilt({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      data-cursor="cup"
      className="card-3d-wrap group relative"
      style={{
        transform: `perspective(1000px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg) scale3d(${
          isHovered ? 1.02 : 1
        }, ${isHovered ? 1.02 : 1}, 1)`,
        transition: isHovered ? 'transform 0.1s ease-out' : 'transform 0.5s ease-out',
      }}
    >
      <div className="relative h-full flex flex-col justify-between p-6 sm:p-7 bg-cream-50/95 border-2 border-olive/20 rounded-3xl shadow-warm-sm group-hover:shadow-warm-lg group-hover:border-olive/50 transition-all duration-300 overflow-hidden">
        
        {/* Soft background ambient glow */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-mustard/10 rounded-full blur-2xl pointer-events-none group-hover:bg-mustard/20 transition-all duration-500" />

        {/* Top Header: Badge & Leaf Price Tag */}
        <div>
          <div className="flex items-start justify-between gap-3 mb-3">
            <span className="inline-block px-3 py-1 bg-olive/15 text-forest text-[11px] font-sub font-bold tracking-wider rounded-full uppercase">
              {item.badge}
            </span>

            {/* Leaf-shaped Price Tag in INR */}
            <div className="leaf-badge px-3.5 py-1 text-sm font-sub font-bold tracking-wider flex items-center gap-0.5 shadow-sm transform group-hover:scale-105 transition-transform">
              <span className="text-xs">₹</span>
              <span>{item.price}</span>
            </div>
          </div>

          {/* Item Name */}
          <h3 className="font-heading text-xl sm:text-2xl text-forest font-bold tracking-tight group-hover:text-olive transition-colors leading-snug">
            {item.name}
          </h3>

          {/* Description */}
          <p className="mt-2.5 font-body text-xs sm:text-sm text-espresso/75 leading-relaxed">
            {item.desc}
          </p>
        </div>

        {/* Bottom Section: Dietary Tags & Add to Tray Button */}
        <div className="mt-6 pt-4 border-t border-olive/15 flex items-center justify-between gap-3">
          <div className="flex flex-wrap gap-1.5">
            {item.tags.map((tag, i) => (
              <span
                key={i}
                className="text-[10px] font-sub font-medium px-2 py-0.5 bg-cream-200/90 text-espresso/80 rounded-md border border-olive/10"
              >
                {tag}
              </span>
            ))}
          </div>

          <button
            onClick={() => onAddToCart(item)}
            data-cursor="pointer"
            aria-label={`Add ${item.name} to tray`}
            className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-sub text-xs font-bold tracking-wider transition-all duration-300 flex-shrink-0 shadow-warm-sm ${
              isAdded
                ? 'bg-olive text-cream-100 shadow-leaf-glow scale-105'
                : 'bg-mustard hover:bg-mustard-light text-espresso hover:shadow-gold-glow'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>ADDED</span>
              </>
            ) : (
              <>
                <Plus className="w-3.5 h-3.5" />
                <span>ADD</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Main Signature Menu Component with Pinned Scroll Living Journal   */
/* ------------------------------------------------------------------ */
export default function SignatureMenu({ onAddToCart, addedItemIds = [] }) {
  const [activeTab, setActiveTab] = useState('coffee');

  return (
    <section id="menu" className="relative w-full bg-cream-200">
      
      {/* 1. SCROLL-DRIVEN LIVING MENU JOURNAL (Pinned 260vh Scroll Runway) */}
      <ScrollLivingMenu />

      {/* 2. SIGNATURE MENU CATALOGUE & 3D TILT CARDS */}
      <div id="menu-catalog" className="relative py-24 sm:py-32 bg-cream-100/90 overflow-hidden border-t-2 border-olive/20">
        
        {/* Background radial highlights */}
        <div className="absolute top-1/3 left-10 w-96 h-96 rounded-full bg-olive/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-mustard/15 blur-3xl pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          
          {/* Section Header */}
          <div className="flex flex-col items-center text-center mb-16">
            <span className="ribbon-banner text-xs sm:text-sm mb-4">
              SIGNATURE SELECTION
            </span>
            <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight">
              Handcrafted with Nature's Bounty
            </h2>
            <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
              All prices in Indian Rupees (₹) • Taxes inclusive
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-12 overflow-x-auto pb-4 no-scrollbar">
            <div className="inline-flex p-1.5 bg-cream-50 rounded-full border border-olive/25 shadow-warm-sm">
              {MENU_CATEGORIES.map((cat) => {
                const Icon = cat.icon;
                const isActive = activeTab === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setActiveTab(cat.id)}
                    data-cursor="pointer"
                    className={`flex items-center gap-2.5 px-6 py-3 rounded-full font-sub text-xs sm:text-sm font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                      isActive
                        ? 'bg-olive text-cream-100 shadow-warm-md scale-105'
                        : 'text-espresso/70 hover:text-forest hover:bg-cream-200/50'
                    }`}
                  >
                    <Icon className={`w-4 h-4 ${isActive ? 'text-mustard' : 'text-olive'}`} />
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* 3D Tilt Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {MENU_DATA[activeTab].map((item) => (
              <MenuTiltCard
                key={item.id}
                item={item}
                onAddToCart={onAddToCart}
                isAdded={addedItemIds.includes(item.id)}
              />
            ))}
          </div>

          {/* Footer Note */}
          <div className="mt-14 text-center">
            <p className="font-handwriting text-2xl text-olive">
              "Ask our baristas about custom bean roast profiles and dairy-free botanical milks."
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
