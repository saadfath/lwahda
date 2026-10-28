import { useEffect, useRef, useState } from 'react';
import type { Lang } from '../i18n/types';

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoPlayMs?: number;
  lang?: Lang;
}

export default function ImageCarousel({ images, autoPlayMs = 4000, lang = 'fr' }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, images.length, autoPlayMs]);

  const next = () => setIndex((i) => (i + 1) % images.length);
  const prev = () => setIndex((i) => (i - 1 + images.length) % images.length);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) next();
      else prev();
    }
  };

  if (images.length === 0) return null;

  return (
    <div
      className="w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative overflow-hidden rounded-xl border border-gold-metallic/25 shadow-moroccan bg-surface-container">
        <img
          src={images[index].src}
          alt={images[index].alt}
          loading={index === 0 ? 'eager' : 'lazy'}
          className="w-full object-cover"
          style={{ aspectRatio: '4/3' }}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface-container-lowest/60 via-transparent to-transparent"></div>

        {images.length > 1 && (
          <>
            <button
              onClick={prev}
              aria-label={lang === 'ar' ? 'الصورة السابقة' : 'Image précédente'}
              className="absolute start-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/70 backdrop-blur text-text-on-dark-primary hover:bg-surface-container-lowest transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined rtl:rotate-180">chevron_left</span>
            </button>
            <button
              onClick={next}
              aria-label={lang === 'ar' ? 'الصورة التالية' : 'Image suivante'}
              className="absolute end-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-surface-container-lowest/70 backdrop-blur text-text-on-dark-primary hover:bg-surface-container-lowest transition-colors flex items-center justify-center"
            >
              <span className="material-symbols-outlined rtl:rotate-180">chevron_right</span>
            </button>
            <div className="absolute bottom-1.5 inset-x-0 flex gap-1 justify-center">
              {images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setIndex(i)}
                  aria-label={lang === 'ar' ? `الصورة ${i + 1}` : `Aller à l'image ${i + 1}`}
                  aria-current={i === index}
                  className="h-7 w-7 flex items-center justify-center"
                >
                  <span className={`block h-2 rounded-full transition-all ${i === index ? 'w-6 bg-gold-metallic' : 'w-2 bg-ivory-base/60 hover:bg-ivory-base'}`} />
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
