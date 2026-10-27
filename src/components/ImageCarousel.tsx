import { useEffect, useRef, useState } from 'react';

interface CarouselProps {
  images: { src: string; alt: string }[];
  autoPlayMs?: number;
}

export default function ImageCarousel({ images, autoPlayMs = 4000 }: CarouselProps) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const startX = useRef(0);

  useEffect(() => {
    if (paused || images.length <= 1) return;
    const t = setInterval(() => setIndex((i) => (i + 1) % images.length), autoPlayMs);
    return () => clearInterval(t);
  }, [paused, images.length, autoPlayMs]);

  const onTouchStart = (e: React.TouchEvent) => { startX.current = e.touches[0].clientX; };
  const onTouchEnd = (e: React.TouchEvent) => {
    const dx = e.changedTouches[0].clientX - startX.current;
    if (Math.abs(dx) > 40) {
      if (dx < 0) setIndex((i) => (i + 1) % images.length);
      else setIndex((i) => (i - 1 + images.length) % images.length);
    }
  };

  if (images.length === 0) return null;

  return (
    <div className="w-full" onMouseEnter={() => setPaused(true)} onMouseLeave={() => setPaused(false)} onTouchStart={onTouchStart} onTouchEnd={onTouchEnd}>
      <img src={images[index].src} alt={images[index].alt} className="w-full object-cover rounded-[11px]" style={{ aspectRatio: '4/3' }} />
      <div className="flex gap-2 justify-center mt-3">
        {images.map((_, i) => (
          <button key={i} onClick={() => setIndex(i)} className={`w-2 h-2 rounded-full ${i === index ? 'bg-amber' : 'bg-cream/40'}`} />
        ))}
      </div>
    </div>
  );
}
