import React, { useState } from 'react';
import { ZoomIn, X, ChevronLeft, ChevronRight, Camera } from 'lucide-react';

const GALLERY_IMAGES = [
  {
    id: 1,
    title: 'The Garden Table & Heritage Journal',
    category: 'Ambiance',
    src: '/menu-cover.jpg',
    caption: 'Sun-warmed rustic cedar tables with our leather-embossed menu journal.',
  },
  {
    id: 2,
    title: 'The Full Garden Feast',
    category: 'Bites',
    src: '/menu-feast.jpg',
    caption: 'Stone-oven basil pizza, smoked brioche burger, wok street noodles, and hot kulhad chai.',
  },
  {
    id: 3,
    title: 'Botanical Latte Art',
    category: 'Brews',
    src: 'https://images.unsplash.com/photo-1517256064527-09c73fc73e38?auto=format&fit=crop&w=800&q=80',
    caption: 'Silky microfoam etched with garden floral motifs and organic cinnamon.',
  },
  {
    id: 4,
    title: 'Sunlit Jasmine Pergola',
    category: 'Ambiance',
    src: 'https://images.unsplash.com/photo-1554118811-1e0d58224f24?auto=format&fit=crop&w=800&q=80',
    caption: 'Cozy conversation nooks bathed in golden afternoon sunlight.',
  },
  {
    id: 5,
    title: 'Artisanal V60 Pour-Over',
    category: 'Brews',
    src: 'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&w=800&q=80',
    caption: 'Slow extraction of single-origin beans roasted to floral perfection.',
  },
  {
    id: 6,
    title: 'Fresh Garden Basil & Herbs Harvest',
    category: 'Ambiance',
    src: 'https://images.unsplash.com/photo-1530595467537-0b5996c41f2d?auto=format&fit=crop&w=800&q=80',
    caption: 'Plucked every morning from our sunlit greenhouse.',
  },
  {
    id: 7,
    title: 'Honey Lavender Basque Cake',
    category: 'Bites',
    src: 'https://images.unsplash.com/photo-1535141192574-5d4897c13136?auto=format&fit=crop&w=800&q=80',
    caption: 'Burnt caramelized crust with a molten clover honey interior.',
  },
  {
    id: 8,
    title: 'Evening Fairy Lanterns',
    category: 'Ambiance',
    src: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&w=800&q=80',
    caption: 'Twilight sets in with warm glowing string lights across the courtyard.',
  },
];

export default function Gallery() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Ambiance', 'Brews', 'Bites'];

  const filteredImages =
    activeCategory === 'All'
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-cream-200 overflow-hidden">
      
      {/* Background accents */}
      <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-olive/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-20 right-10 w-96 h-96 rounded-full bg-mustard/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-14">
          <span className="ribbon-banner text-xs sm:text-sm mb-4">
            GALLERY
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight">
            Moments Captured in the Garden
          </h2>
          <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
            A glimpse into our sunlit courtyard, brews, and culinary crafts
          </p>

          {/* Filter Pills */}
          <div className="mt-6 sm:mt-8 flex items-center gap-1.5 sm:gap-2 p-1 bg-cream-100/90 rounded-full border border-olive/20 shadow-warm-sm overflow-x-auto max-w-full no-scrollbar">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                data-cursor="pointer"
                className={`px-3.5 sm:px-5 py-1.5 sm:py-2 rounded-full font-sub text-[11px] sm:text-xs font-bold tracking-wider transition-all duration-300 whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-olive text-cream-100 shadow-warm-sm scale-105'
                    : 'text-espresso/70 hover:text-forest'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Masonry / Grid with thin green ribbon-style border */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredImages.map((img) => (
            <div
              key={img.id}
              onClick={() => setSelectedImage(img)}
              data-cursor="leaf"
              className="group relative cursor-pointer overflow-hidden rounded-3xl bg-cream-100 border-2 border-olive/30 shadow-warm-sm hover:shadow-warm-lg hover:border-olive transition-all duration-500"
            >
              {/* Ribbon border effect */}
              <div className="relative aspect-[4/3] sm:aspect-square overflow-hidden">
                <img
                  src={img.src}
                  alt={img.title}
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-forest/80 via-forest/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5 text-cream-100">
                  <span className="font-sub text-[10px] tracking-widest uppercase text-mustard font-bold">
                    {img.category}
                  </span>
                  <h3 className="font-heading text-lg font-bold mt-1 text-cream-100">
                    {img.title}
                  </h3>
                  <p className="font-body text-xs text-cream-100/80 mt-1 line-clamp-2">
                    {img.caption}
                  </p>
                  <div className="mt-3 flex items-center gap-1.5 text-xs text-mustard font-sub font-semibold">
                    <ZoomIn className="w-3.5 h-3.5" />
                    <span>Click to expand</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Instagram Invitation */}
        <div className="mt-14 p-6 sm:p-8 bg-cream-100/90 rounded-3xl border border-olive/20 shadow-warm-sm flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="w-12 h-12 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0">
              <Camera className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-heading text-xl text-forest font-bold">
                Tag Us in Your Garden Moments
              </h3>
              <p className="font-body text-xs sm:text-sm text-espresso/70 mt-0.5">
                Share your cozy snaps with <strong>#TheGardenCafeEst2018</strong> for a chance to be featured!
              </p>
            </div>
          </div>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="pointer"
            className="px-6 py-2.5 rounded-full font-sub text-xs font-bold tracking-wider bg-forest text-cream-100 hover:bg-forest-light transition-all shadow-warm-sm flex items-center gap-2 flex-shrink-0"
          >
            <span>@THEGARDENCAFE.OFFICIAL</span>
          </a>
        </div>

      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-forest-darker/90 backdrop-blur-md p-4 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative max-w-4xl w-full bg-cream-100 rounded-3xl overflow-hidden border-2 border-olive/40 shadow-warm-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedImage(null)}
              data-cursor="pointer"
              aria-label="Close image preview"
              className="absolute top-4 right-4 z-10 p-2 rounded-full bg-forest/80 text-cream-100 hover:bg-forest transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="max-h-[75vh] overflow-hidden flex items-center justify-center bg-forest/10">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="w-full h-full object-contain max-h-[75vh]"
              />
            </div>

            <div className="p-6 bg-cream-50 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <span className="font-sub text-[10px] tracking-widest uppercase bg-olive text-cream-100 px-2.5 py-1 rounded-full font-bold">
                  {selectedImage.category}
                </span>
                <h3 className="font-heading text-2xl text-forest font-bold mt-1.5">
                  {selectedImage.title}
                </h3>
                <p className="font-body text-sm text-espresso/75 mt-1">
                  {selectedImage.caption}
                </p>
              </div>

              <span className="font-handwriting text-xl text-olive flex-shrink-0">
                The Garden Cafe Memories
              </span>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
