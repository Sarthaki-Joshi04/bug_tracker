import { Link } from "react-router-dom";

function ImageFallback({ name }) {
  return (
    <div className="flex h-full items-center justify-center bg-gradient-to-br from-sand-200 via-white to-pine-500/20 px-6 text-center dark:from-sand-700/40 dark:via-stone-900 dark:to-pine-500/30">
      <div>
        <p className="font-display text-2xl text-stone-900 dark:text-stone-50">{name}</p>
        <p className="mt-2 text-sm text-stone-600 dark:text-stone-300">Image temporarily unavailable</p>
      </div>
    </div>
  );
}

export default function BreedCard({ breed, isFavorite, onToggleFavorite }) {
  const description =
    breed.description.length > 112 ? `${breed.description.slice(0, 112)}...` : breed.description;

  return (
    <article className="group glass-panel overflow-hidden">
      <div className="relative h-64 overflow-hidden">
        {breed.images?.[0] ? (
          <img
            alt={breed.name}
            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
            onError={(event) => {
              event.currentTarget.style.display = "none";
              event.currentTarget.nextSibling.style.display = "flex";
            }}
            src={breed.images[0]}
          />
        ) : null}
        <div className={breed.images?.[0] ? "hidden h-full" : "flex h-full"}>
          <ImageFallback name={breed.name} />
        </div>
        <button
          aria-label={`Save ${breed.name} as favorite`}
          className={`absolute right-4 top-4 rounded-full px-3 py-2 text-sm font-semibold backdrop-blur ${
            isFavorite
              ? "bg-stone-900 text-white dark:bg-sand-300 dark:text-stone-950"
              : "bg-white/80 text-stone-700 dark:bg-stone-900/70 dark:text-stone-100"
          }`}
          onClick={() => onToggleFavorite(breed.id)}
          type="button"
        >
          {isFavorite ? "Saved" : "Favorite"}
        </button>
      </div>

      <div className="space-y-4 p-5">
        <div className="flex flex-wrap gap-2">
          <span className="chip">{breed.group}</span>
          <span className="chip">{breed.size}</span>
        </div>

        <div>
          <h3 className="font-display text-2xl text-stone-900 dark:text-stone-50">{breed.name}</h3>
          <p className="mt-2 text-sm leading-6 text-stone-600 dark:text-stone-300">{description}</p>
        </div>

        <div className="grid gap-3 text-sm text-stone-700 dark:text-stone-200 sm:grid-cols-2">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Origin</p>
            <p className="mt-1 font-medium">{breed.origin}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Temperament</p>
            <p className="mt-1 font-medium">{breed.temperament}</p>
          </div>
        </div>

        <Link className="primary-button w-full" to={`/breeds/${breed.id}`}>
          View Details
        </Link>
      </div>
    </article>
  );
}
