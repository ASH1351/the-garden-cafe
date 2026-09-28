import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import {
  Calendar,
  Clock,
  Users,
  Phone,
  Mail,
  MapPin,
  CheckCircle2,
  Send,
  MessageCircle,
  Instagram,
  Sparkles
} from 'lucide-react';

export default function ReservationContact({ defaultOpen = false }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    time: '18:00',
    guests: '2',
    area: 'garden-patio', // garden-patio, veranda, pergola
    specialRequest: '',
  });

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trigger celebratory golden & leaf confetti
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#E2A72E', '#6B7F2E', '#7FA043', '#F6EFDC'],
    });

    const generatedRef = 'GC-' + Math.floor(100000 + Math.random() * 900000);
    setBookingRef(generatedRef);
    setIsSubmitted(true);
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-cream-200 overflow-hidden">
      
      {/* Background ambient light */}
      <div className="absolute top-10 left-10 w-96 h-96 rounded-full bg-olive/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] rounded-full bg-mustard/15 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Ribbon Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <span className="ribbon-banner text-xs sm:text-sm mb-4">
            RESERVATIONS & VISIT
          </span>
          <h2 className="font-heading text-3xl sm:text-5xl text-forest font-bold tracking-tight">
            Reserve Your Garden Table
          </h2>
          <p className="mt-3 font-sub text-xs sm:text-sm tracking-[0.2em] text-olive font-semibold uppercase">
            Join us under the open sky • Walk-ins are always welcomed
          </p>
        </div>

        {/* 2-Column Layout: Reservation Form + Cafe Info & Map */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          
          {/* Left Column: Interactive Reservation Form */}
          <div className="lg:col-span-7 bg-cream-50/95 p-8 sm:p-10 rounded-3xl border-2 border-olive/30 shadow-warm-lg">
            
            {isSubmitted ? (
              <div className="py-12 flex flex-col items-center text-center animate-fadeIn">
                <div className="w-16 h-16 rounded-full bg-olive text-cream-100 flex items-center justify-center mb-5 shadow-leaf-glow">
                  <CheckCircle2 className="w-10 h-10" />
                </div>
                <span className="font-sub text-xs font-bold tracking-widest text-olive uppercase">
                  RESERVATION CONFIRMED
                </span>
                <h3 className="font-heading text-3xl text-forest font-bold mt-2">
                  We'll Have Your Table Ready!
                </h3>
                <p className="mt-3 font-body text-sm sm:text-base text-espresso/80 max-w-md">
                  Thank you, <strong>{formData.name}</strong>. We've reserved a lovely spot for <strong>{formData.guests} guests</strong> in our <strong>{formData.area.replace('-', ' ').toUpperCase()}</strong> on <strong>{formData.date || 'today'}</strong> at <strong>{formData.time}</strong>.
                </p>

                <div className="mt-6 p-4 bg-cream-200/90 rounded-2xl border border-olive/30 font-sub text-xs tracking-wider text-forest font-bold">
                  BOOKING REFERENCE: <span className="text-mustard-dark font-heading text-lg ml-1">{bookingRef}</span>
                </div>

                <button
                  onClick={() => setIsSubmitted(false)}
                  data-cursor="pointer"
                  className="mt-8 px-6 py-2.5 rounded-full font-sub text-xs font-bold tracking-wider bg-forest text-cream-100 hover:bg-forest-light transition-all shadow-warm-sm"
                >
                  MAKE ANOTHER RESERVATION
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <h3 className="font-heading text-2xl text-forest font-bold">
                    Table Booking Form
                  </h3>
                  <p className="font-body text-xs sm:text-sm text-espresso/70 mt-1">
                    Book ahead to guarantee shaded veranda or pet-friendly patio spots.
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Full Name */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      placeholder="e.g. Maya Iyer"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Phone Number */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      placeholder="+91 98765 43210"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Date *
                    </label>
                    <div className="relative">
                      <input
                        type="date"
                        name="date"
                        required
                        value={formData.date}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                      />
                    </div>
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Preferred Time *
                    </label>
                    <select
                      name="time"
                      value={formData.time}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                    >
                      <option value="08:30">08:30 AM (Morning Brew)</option>
                      <option value="10:30">10:30 AM (Garden Brunch)</option>
                      <option value="13:00">01:00 PM (Lunch & Coolers)</option>
                      <option value="16:00">04:00 PM (High Tea & Bakes)</option>
                      <option value="18:00">06:00 PM (Sunset & Sourdough)</option>
                      <option value="20:00">08:00 PM (Fairy Light Dinner)</option>
                    </select>
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Number of Guests
                    </label>
                    <select
                      name="guests"
                      value={formData.guests}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                    >
                      <option value="1">1 Person (Solo Coffee Session)</option>
                      <option value="2">2 Persons (Table for Two)</option>
                      <option value="3-4">3-4 Persons (Cozy Group)</option>
                      <option value="5-8">5-8 Persons (Garden Party Table)</option>
                      <option value="8+">8+ Persons (Private Gazebo)</option>
                    </select>
                  </div>

                  {/* Seating Preference */}
                  <div>
                    <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                      Seating Preference
                    </label>
                    <select
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all"
                    >
                      <option value="garden-patio">🌿 Open Garden Patio (Pet Friendly)</option>
                      <option value="veranda">☕ Shaded Teakwood Veranda</option>
                      <option value="gazebo">🌸 Blooming Jasmine Gazebo</option>
                      <option value="indoor">🪴 Botanical Greenhouse Indoor</option>
                    </select>
                  </div>
                </div>

                {/* Special Notes */}
                <div>
                  <label className="block font-sub text-xs font-bold tracking-wider text-forest uppercase mb-1.5">
                    Special Requests (Optional)
                  </label>
                  <textarea
                    name="specialRequest"
                    rows="2"
                    placeholder="Dietary preferences, bringing pets, celebrating anniversary or birthday..."
                    value={formData.specialRequest}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 bg-cream-100 rounded-xl border border-olive/30 focus:border-olive focus:ring-2 focus:ring-olive/20 text-espresso text-sm outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Mustard Submit Button */}
                <button
                  type="submit"
                  data-cursor="pointer"
                  className="w-full py-4 rounded-2xl bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-sm tracking-widest shadow-warm-md hover:shadow-gold-glow hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4 text-forest" />
                  <span>CONFIRM TABLE RESERVATION</span>
                </button>
              </form>
            )}

          </div>

          {/* Right Column: Cafe Info, Hours & Google Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Quick Contact & Operating Hours Card */}
            <div className="bg-cream-50/95 p-7 rounded-3xl border-2 border-olive/30 shadow-warm-lg space-y-5">
              <h3 className="font-heading text-xl text-forest font-bold">
                Visit & Contact Information
              </h3>

              <div className="space-y-4 font-body text-sm text-espresso">
                {/* Address (Clearly marked placeholder) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sub text-[11px] font-bold text-olive uppercase tracking-wider block">
                      OUR LOCATION
                    </span>
                    <p className="font-medium text-forest">
                      [PLACEHOLDER: 42 Jasmine Lane, Botanical Enclave, Indiranagar, Bengaluru, Karnataka 560038]
                    </p>
                    <span className="text-xs text-espresso/60 block mt-0.5">
                      Adjacent to the Old Rose Nursery
                    </span>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sub text-[11px] font-bold text-olive uppercase tracking-wider block">
                      OPENING HOURS
                    </span>
                    <p className="font-medium text-forest">
                      Monday – Sunday: 8:00 AM – 10:30 PM
                    </p>
                    <span className="text-xs text-olive block mt-0.5 font-semibold">
                      Kitchen open all day • Fresh baking at 8:00 AM & 3:30 PM
                    </span>
                  </div>
                </div>

                {/* Phone & Email (Clearly marked placeholders) */}
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-full bg-olive/10 text-olive flex items-center justify-center flex-shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-sub text-[11px] font-bold text-olive uppercase tracking-wider block">
                      DIRECT CALLS & INQUIRIES
                    </span>
                    <p className="font-medium text-forest">
                      [PLACEHOLDER: +91 (80) 4123 5678 / +91 98450 12018]
                    </p>
                    <p className="text-xs text-espresso/70 mt-0.5">
                      [PLACEHOLDER: hello@thegardencafe.in]
                    </p>
                  </div>
                </div>
              </div>

              {/* Direct Quick WhatsApp & Instagram Actions */}
              <div className="pt-4 border-t border-olive/15 flex items-center gap-3">
                <a
                  href="https://whatsapp.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-olive/15 hover:bg-olive hover:text-cream-100 text-forest font-sub text-xs font-bold rounded-xl transition-all"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>WHATSAPP US</span>
                </a>

                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="pointer"
                  className="flex-1 flex items-center justify-center gap-2 py-2.5 px-4 bg-mustard/20 hover:bg-mustard text-espresso font-sub text-xs font-bold rounded-xl transition-all"
                >
                  <Instagram className="w-4 h-4" />
                  <span>INSTAGRAM</span>
                </a>
              </div>
            </div>

            {/* Google Maps Interactive Embed Card */}
            <div className="bg-cream-50/95 p-4 rounded-3xl border-2 border-olive/30 shadow-warm-lg overflow-hidden">
              <div className="rounded-2xl overflow-hidden aspect-[16/10] relative border border-olive/20">
                <iframe
                  title="The Garden Cafe Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3887.971556096531!2d77.6408226!3d12.9736885!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae168233346d03%3A0x6b42b9370bbffbf7!2sIndiranagar%2C%20Bengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  className="w-full h-full filter saturate-90 contrast-95"
                ></iframe>

                <div className="absolute bottom-2 left-2 right-2 bg-cream-100/90 backdrop-blur-sm p-2 rounded-xl text-center font-sub text-[11px] text-forest font-bold">
                  📍 Click map to navigate via Google Maps
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
