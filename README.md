# 🌿 THE GARDEN CAFE (Est. 2018) — Premium 3D Interactive Website

An immersive, handcrafted 3D single-page experience for **The Garden Cafe**, an artisanal botanical sanctuary cafe established in 2018.

---

## 🎨 Brand Identity & Color Palette

- **Cream / Parchment:** `#F6EFDC` (Main Background)
- **Olive Green:** `#6B7F2E` (Primary, Ribbons, Brand Accents)
- **Deep Forest Green:** `#3E4A22` (Headings, Dark Sections, Footer)
- **Golden Mustard:** `#E2A72E` (Accent CTAs, Teacup Glow, Highlights)
- **Espresso Brown:** `#3B2A1E` (Typography, Brand Wordmark)
- **Leaf Green:** `#7FA043` (Secondary Accents, Botanicals)

---

## 🚀 Key Features

1. **3D Blooming Teacup Hero (Three.js + R3F + Drei)**
   - Centerpiece: 3D stylized golden teacup sitting on a tulip stem with leaves matching the authentic badge logo.
   - Growth animation on load: stem rises from the earth, botanical leaves unfurl, and golden teacup blooms open.
   - Gentle idle animation with floating sway, rising steam curls, and drifting coffee beans, petals, and leaves.
   - Cursor parallax tilt (and mobile gyroscope orientation).
   - Rotating text stamp badge (*"FRESHLY BREWED • EST. 2018 •"*).

2. **Scroll-Driven 3D Journey (`Scene3DManager.jsx`)**
   - Seamless camera journey through the garden as the user scrolls.
   - Canopy fairy string lights shimmering over the patio.
   - Floating organic garden foliage.
   - Sunset golden hour transition with glowing hanging lanterns in the footer.

3. **"The Living Journal" & 3D Tilt Signature Menu (`SignatureMenu.jsx`)**
   - Interactive canvas scrubber driven by the 61-frame sequence of the heritage leather menu opening and dishes materializing.
   - Category tabs: Coffee & Brews, Cold Botanicals, Garden Bites, Artisan Desserts.
   - Dynamic 3D tilt hover cards with perspective.
   - Leaf-shaped price tags in Indian Rupees (₹).
   - "Add to Tray" interaction with floating cafe order drawer (`TrayDrawer.jsx`).

4. **"Our Story" (`About.jsx`)**
   - Narrative of the cafe's founding in 2018.
   - Animated stats counters (Est. 2018, 140k+ Happy Guests, 38+ Signature Drinks, 100% Organic Greens).
   - Hand-drawn vintage botanical illustrations.

5. **Why Garden Cafe (`WhyGardenCafe.jsx`)**
   - 4 organic feature cards: Farm-to-Cup Freshness, Sun-Dappled Seating, Handcrafted Slow Brews, Pet & Family Friendly.

6. **Gallery & Moments (`Gallery.jsx`)**
   - Masonry grid with thin green ribbon borders.
   - Category filter (All, Ambiance, Brews, Bites).
   - Soft zoom hover effect and high-resolution Lightbox modal.

7. **Testimonials (`Testimonials.jsx`)**
   - Folded ribbon banner shaped review cards with golden mustard 5-star ratings.
   - Auto-rotating slider with manual navigation controls.

8. **Reservations & Interactive Map (`ReservationContact.jsx`)**
   - Table reservation form with date/time pickers and seating preference (Open Garden Patio, Veranda, Gazebo, Greenhouse).
   - Golden and green celebratory confetti on successful booking.
   - Google Maps embed, direct WhatsApp and Instagram shortcuts, and operating hours.

9. **Footer (`Footer.jsx`)**
   - Deep forest green with vine border and animated mini teacup.
   - Quick navigation links, garden hours, and "Garden Letters" newsletter subscription.

10. **Micro-Interactions & Mobile Polish**
    - **Custom Cursor (`CustomCursor.jsx`):** Smooth following golden mustard dot that transforms into a coffee cup or leaf on hover.
    - **Ambient Garden Sound (`AudioAmbient.jsx`):** Synthesized garden morning breeze and soft birdsong using the Web Audio API (offline ready, no broken links).
    - **Page Loader (`PageLoader.jsx`):** Logo badge drawing in with rising coffee fill.
    - **Mobile Sticky Bar (`MobileStickyBar.jsx`):** Instant one-tap "Call", "Directions", and "Reserve" bar.
    - **Lenis Smooth Scroll:** 60fps buttery scrolling experience.

---

## 🛠️ Project Structure

```
cafe/
├── public/
│   ├── logo.png                # Authentic Garden Cafe logo badge
│   ├── menu-cover.jpg          # Leather menu book cover photo
│   ├── menu-feast.jpg          # Spread feast photo
│   └── menu-book-frames/       # 61 sampled animation frames for Living Journal
├── src/
│   ├── components/
│   │   ├── About.jsx           # Our Story & stats counters
│   │   ├── AudioAmbient.jsx    # Web Audio API garden soundscape
│   │   ├── CustomCursor.jsx    # Custom interactive cursor
│   │   ├── Footer.jsx          # Deep forest green footer
│   │   ├── Gallery.jsx         # Image gallery with lightbox
│   │   ├── Hero3D.jsx          # 3D Golden Teacup plant canvas
│   │   ├── MobileStickyBar.jsx # Mobile-first bottom quick bar
│   │   ├── Navbar.jsx          # Blur sticky navbar with links & audio toggle
│   │   ├── PageLoader.jsx      # Animated SVG badge load intro
│   │   ├── ReservationContact.jsx # Booking form, confetti & Google Maps
│   │   ├── Scene3DManager.jsx  # Persistent scroll-driven 3D background
│   │   ├── SignatureMenu.jsx   # 3D tilt cards & Living Menu scrubber
│   │   ├── Testimonials.jsx    # Ribbon-banner shaped review cards
│   │   ├── TrayDrawer.jsx      # Slide-out cafe order basket
│   │   └── WhyGardenCafe.jsx   # 4 feature blocks
│   ├── App.jsx                 # Main application layout & Lenis scroll
│   ├── index.css               # Tailwind directives & custom CSS ribbon styles
│   └── main.jsx                # React root mount
├── index.html                  # Fonts & SEO meta tags
├── tailwind.config.js          # Brand theme colors & typography
├── vite.config.js              # Vite bundler config
└── package.json
```

---

## 📦 Getting Started

### 1. Install Dependencies
```bash
npm install
```

### 2. Start Local Development Server
```bash
npm run dev
```
Open your browser at `http://localhost:3000` to experience the website.

### 3. Build for Production
```bash
npm run build
```

---

## 📌 Easily Replaceable Placeholders
All contact details and placeholders are clearly designated in `src/components/ReservationContact.jsx`:
- **Address:** `[PLACEHOLDER: 42 Jasmine Lane, Botanical Enclave, Indiranagar, Bengaluru, Karnataka 560038]`
- **Phone:** `[PLACEHOLDER: +91 (80) 4123 5678 / +91 98450 12018]`
- **Email:** `[PLACEHOLDER: hello@thegardencafe.in]`
- **Photos:** Located in `public/` and `src/components/Gallery.jsx`.
