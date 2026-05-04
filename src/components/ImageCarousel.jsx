import { useState } from "react";

function GalleryFallback({ name }) {
  return (
    <div className="flex min-h-[20rem] items-center justify-center rounded-[2rem] bg-gradient-to-br from-sand-200 via-white to-pine-500/10 text-center dark:from-sand-700/30 dark:via-stone-900 dark:to-pine-500/20">
      <div className="px-6">
        <p className="font-display text-3xl text-stone-900 dark:text-stone-50">{name}</p>
        <p className="mt-3 text-sm text-stone-600 dark:text-stone-300">Photo gallery unavailable</p>
      </div>
    </div>
  );
}

export default function ImageCarousel({ images = [], name }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (!images.length) {
    return <GalleryFallback name={name} />;
  }

  const goTo = (index) => setCurrentIndex(index);
  const goNext = () => setCurrentIndex((current) => (current + 1) % images.length);
  const goPrev = () => setCurrentIndex((current) => (current - 1 + images.length) % images.length);

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-[2rem]">
        <img
          alt={`${name} gallery ${currentIndex + 1}`}
          className="h-[22rem] w-full rounded-[2rem] object-cover sm:h-[32rem]"
          onError={(event) => {
            event.currentTarget.style.display = "none";
            event.currentTarget.nextSibling.style.display = "flex";
          }}
          src={images[currentIndex]}
        />
        <div className="hidden">
          <GalleryFallback name={name} />
        </div>
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-sm font-semibold text-stone-900 backdrop-blur dark:bg-stone-900/70 dark:text-white"
          onClick={goPrev}
          type="button"
        >
          Prev
        </button>
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-white/80 px-4 py-3 text-sm font-semibold text-stone-900 backdrop-blur dark:bg-stone-900/70 dark:text-white"
          onClick={goNext}
          type="button"
        >
          Next
        </button>
      </div>

      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {images.map((image, index) => (
          <button
            className={`overflow-hidden rounded-3xl border-2 transition ${
              index === currentIndex
                ? "border-sand-500 dark:border-sand-300"
                : "border-transparent hover:border-sand-200 dark:hover:border-white/20"
            }`}
            key={`${image}-${index}`}
            onClick={() => goTo(index)}
            type="button"
          >
            <img alt={`${name} thumbnail ${index + 1}`} className="h-24 w-full object-cover" src={image} />
          </button>
        ))}
      </div>
    </div>
  );
}
