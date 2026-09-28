import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';

export default function TrayDrawer({
  isOpen,
  onClose,
  items,
  onUpdateQty,
  onRemoveItem,
  onClearTray,
  onProceedToReservation
}) {
  if (!isOpen) return null;

  const totalAmount = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-fadeIn">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-forest-darker/60 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-cream-50 shadow-2xl border-l-2 border-olive/30 flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 bg-cream-100 border-b border-olive/20 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-full bg-olive text-cream-100 flex items-center justify-center">
                <ShoppingBag className="w-4 h-4 text-mustard" />
              </div>
              <div>
                <h3 className="font-heading text-xl text-forest font-bold">
                  Your Garden Tray
                </h3>
                <span className="font-sub text-[11px] text-olive font-semibold tracking-wider uppercase">
                  {items.length} {items.length === 1 ? 'item' : 'items'} selected
                </span>
              </div>
            </div>

            <button
              onClick={onClose}
              data-cursor="pointer"
              aria-label="Close tray"
              className="p-2 rounded-full hover:bg-cream-200 text-espresso transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Tray Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {items.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center text-espresso/60 py-12">
                <span className="text-4xl mb-3">☕</span>
                <p className="font-heading text-xl text-forest font-bold">Your tray is empty</p>
                <p className="font-body text-xs text-espresso/70 mt-1 max-w-xs">
                  Explore our Signature Menu and tap <strong>ADD</strong> on your favorite handcrafted coffees and garden bites.
                </p>
                <button
                  onClick={onClose}
                  data-cursor="pointer"
                  className="mt-6 px-6 py-2.5 rounded-full font-sub text-xs font-bold tracking-wider bg-olive text-cream-100 hover:bg-olive-dark transition-all"
                >
                  EXPLORE MENU
                </button>
              </div>
            ) : (
              items.map((item) => (
                <div
                  key={item.id}
                  className="p-4 bg-cream-100/90 rounded-2xl border border-olive/20 flex items-center justify-between gap-3 shadow-warm-sm"
                >
                  <div className="flex-1 min-w-0">
                    <span className="font-sub text-[10px] uppercase font-bold text-olive">
                      {item.badge}
                    </span>
                    <h4 className="font-heading text-base text-forest font-bold truncate">
                      {item.name}
                    </h4>
                    <span className="font-sub text-xs text-espresso font-bold">
                      ₹{item.price} each
                    </span>
                  </div>

                  {/* Quantity Controls */}
                  <div className="flex items-center gap-2 bg-cream-200 px-2 py-1 rounded-xl border border-olive/20">
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity - 1)}
                      className="p-1 hover:text-olive transition-colors"
                      aria-label="Decrease quantity"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <span className="font-sub text-xs font-bold text-forest w-4 text-center">
                      {item.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQty(item.id, item.quantity + 1)}
                      className="p-1 hover:text-olive transition-colors"
                      aria-label="Increase quantity"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>

                  {/* Line Total & Remove */}
                  <div className="text-right">
                    <div className="font-sub text-xs font-bold text-forest">
                      ₹{item.price * item.quantity}
                    </div>
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-espresso/40 hover:text-red-600 transition-colors p-1"
                      aria-label="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer with Subtotal & Proceed */}
          {items.length > 0 && (
            <div className="p-6 bg-cream-100 border-t border-olive/20 space-y-4">
              <div className="flex items-center justify-between">
                <span className="font-sub text-xs uppercase font-bold text-espresso/70">
                  Estimated Total:
                </span>
                <span className="font-heading text-2xl text-forest font-bold">
                  ₹{totalAmount}
                </span>
              </div>

              <div className="space-y-2">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToReservation(items);
                  }}
                  data-cursor="pointer"
                  className="w-full py-3.5 px-6 rounded-2xl bg-mustard hover:bg-mustard-light text-espresso font-sub font-bold text-xs tracking-widest shadow-warm-md flex items-center justify-center gap-2 transition-all"
                >
                  <span>RESERVE TABLE WITH THIS ORDER</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClearTray}
                  className="w-full py-2 text-center font-sub text-[11px] text-espresso/60 hover:text-red-600 transition-colors uppercase tracking-wider"
                >
                  Clear all items
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
