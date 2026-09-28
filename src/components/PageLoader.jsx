import React, { useEffect, useState } from 'react';

export default function PageLoader({ onFinish }) {
  const [progress, setProgress] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsLoaded(true);
            setTimeout(() => {
              if (onFinish) onFinish();
            }, 700);
          }, 400);
          return 100;
        }
        const step = Math.floor(Math.random() * 8) + 4;
        return Math.min(prev + step, 100);
      });
    }, 55);

    return () => clearInterval(timer);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[100000] flex flex-col items-center justify-center bg-cream-200 transition-all duration-700 ease-in-out ${
        isLoaded ? 'opacity-0 pointer-events-none scale-105' : 'opacity-100 scale-100'
      }`}
    >
      {/* Background radial glow */}
      <div className="absolute w-[500px] h-[500px] rounded-full bg-mustard/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center max-w-sm px-6 text-center">
        {/* Animated Badge & Teacup Bloom */}
        <div className="relative w-40 h-40 mb-6 flex items-center justify-center">
          {/* Circular badge rings */}
          <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
            {/* Outer decorative ring */}
            <circle
              cx="80"
              cy="80"
              r="74"
              fill="none"
              stroke="#6B7F2E"
              strokeWidth="2.5"
              strokeDasharray="4 3"
              className="opacity-70 animate-spin-slow"
            />
            {/* Base track */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="none"
              stroke="#E0CAA0"
              strokeWidth="4"
              className="opacity-40"
            />
            {/* Progress draw stroke */}
            <circle
              cx="80"
              cy="80"
              r="66"
              fill="none"
              stroke="#6B7F2E"
              strokeWidth="4.5"
              strokeDasharray="415"
              strokeDashoffset={415 - (415 * progress) / 100}
              strokeLinecap="round"
              className="transition-all duration-100 ease-out"
            />
          </svg>

          {/* Central Logo Teacup filling up */}
          <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
            {/* Steam animation above cup */}
            <div className="flex gap-1.5 mb-1 h-4">
              <span className="w-1 h-3 bg-mustard/70 rounded-full animate-pulse transform -translate-y-1" />
              <span className="w-1 h-4 bg-mustard/50 rounded-full animate-pulse delay-100 transform -translate-y-2" />
              <span className="w-1 h-3 bg-mustard/70 rounded-full animate-pulse delay-200 transform -translate-y-1" />
            </div>

            {/* Teacup Graphic with clipping mask liquid fill */}
            <div className="relative w-16 h-14">
              <svg viewBox="0 0 64 56" className="w-full h-full">
                {/* Stem and Leaves below */}
                <path
                  d="M32 38 Q32 48 32 54"
                  stroke="#6B7F2E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />
                {/* Left leaf */}
                <path
                  d="M32 46 C24 45 20 38 22 30 C27 34 31 40 32 46 Z"
                  fill="#7FA043"
                />
                {/* Right leaf */}
                <path
                  d="M32 46 C40 45 44 38 42 30 C37 34 33 40 32 46 Z"
                  fill="#7FA043"
                />

                {/* Cup outline & handle */}
                <path
                  d="M48 14 C56 14 56 26 48 28"
                  stroke="#3B2A1E"
                  strokeWidth="3"
                  strokeLinecap="round"
                  fill="none"
                />

                {/* Cup base */}
                <defs>
                  <clipPath id="cupClip">
                    <path d="M16 8 C16 32 48 32 48 8 Z" />
                  </clipPath>
                </defs>

                {/* Cup bowl background */}
                <path
                  d="M16 8 C16 32 48 32 48 8 Z"
                  fill="#FAF6EB"
                  stroke="#3B2A1E"
                  strokeWidth="2.5"
                />

                {/* Rising Golden Coffee Fill */}
                <rect
                  x="14"
                  y={32 - (24 * progress) / 100}
                  width="36"
                  height="26"
                  fill="#E2A72E"
                  clipPath="url(#cupClip)"
                  className="transition-all duration-100 ease-out"
                />

                {/* Cup rim */}
                <ellipse cx="32" cy="8" rx="16" ry="3.5" fill="#E2A72E" stroke="#3B2A1E" strokeWidth="2.5" />
              </svg>
            </div>
          </div>
        </div>

        {/* Vintage Text and Ribbon */}
        <div className="space-y-1">
          <div className="inline-block px-3 py-0.5 bg-olive text-cream-100 text-[10px] font-sub font-bold tracking-[0.25em] rounded-sm">
            THE
          </div>
          <h1 className="font-heading text-2xl tracking-wide text-forest font-bold">
            GARDEN CAFE
          </h1>
          <p className="font-sub text-[11px] tracking-[0.3em] text-olive font-semibold">
            EST. 2018
          </p>
        </div>

        {/* Percentage bar & text */}
        <div className="mt-6 w-48">
          <div className="h-1.5 w-full bg-cream-300 rounded-full overflow-hidden p-0.5">
            <div
              className="h-full bg-mustard rounded-full transition-all duration-100 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <div className="flex justify-between items-center mt-2 font-sub text-xs text-espresso/70">
            <span className="font-handwriting text-sm text-forest">Steeping coffee...</span>
            <span className="font-bold">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
