import { Link, useParams } from "react-router-dom";
import { useDogs } from "../App";
import BreedCard from "../components/BreedCard";
import ImageCarousel from "../components/ImageCarousel";

const detailItems = [
  ["Country of origin", "origin"],
  ["Average lifespan", "lifespan"],
  ["Height", "height"],
  ["Weight", "weight"],
  ["Temperament", "temperament"],
  ["Coat type", "coat"],
  ["Colors", "colors"],
  ["Energy level", "energy"],
  ["Exercise needs", "exercise"],
  ["Grooming needs", "grooming"],
];

export default function BreedDetails() {
  const { breedId } = useParams();
  const { dogs, favorites, toggleFavorite } = useDogs();
  const breed = dogs.find((item) => String(item.id) === breedId);

  if (!breed) {
    return (
      <main className="content-wrap pt-8">
        <div className="glass-panel p-10 text-center">
          <h1 className="font-display text-4xl text-stone-900 dark:text-stone-50">Breed not found</h1>
          <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
            The breed profile you opened does not exist in the current dataset.
          </p>
          <Link className="primary-button mt-6" to="/breeds">
            Back to All Breeds
          </Link>
        </div>
      </main>
    );
  }

  const relatedBreeds = dogs
    .filter((item) => item.id !== breed.id && (item.group === breed.group || item.size === breed.size))
    .slice(0, 3);

  return (
    <main className="content-wrap pt-8">
      <section className="grid gap-8 xl:grid-cols-[1.1fr,0.9fr]">
        <ImageCarousel images={breed.images} name={breed.name} />

        <div className="space-y-6">
          <div className="glass-panel p-7">
            <div className="flex flex-wrap gap-3">
              <span className="chip">{breed.group}</span>
              <span className="chip">{breed.size}</span>
              <span className="chip">Popularity {breed.popularity}</span>
            </div>
            <h1 className="mt-5 font-display text-5xl leading-none text-stone-900 dark:text-stone-50">
              {breed.name}
            </h1>
            <p className="mt-5 text-base leading-8 text-stone-600 dark:text-stone-300">
              {breed.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <button
                className={favorites.includes(breed.id) ? "primary-button" : "secondary-button"}
                onClick={() => toggleFavorite(breed.id)}
                type="button"
              >
                {favorites.includes(breed.id) ? "Saved to favorites" : "Save as favorite"}
              </button>
              <Link className="secondary-button" to="/breeds">
                Back to All Breeds
              </Link>
            </div>
          </div>

          <div className="glass-panel p-7">
            <h2 className="font-display text-3xl text-stone-900 dark:text-stone-50">Breed details</h2>
            <div className="mt-5 grid gap-4 sm:grid-cols-2">
              {detailItems.map(([label, key]) => (
                <div className="detail-pill" key={label}>
                  <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                    {label}
                  </p>
                  <p className="mt-2 text-sm font-medium leading-6 text-stone-700 dark:text-stone-200">
                    {Array.isArray(breed[key]) ? breed[key].join(", ") : breed[key]}
                  </p>
                </div>
              ))}
              <div className="detail-pill">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  Good with children
                </p>
                <p className="mt-2 text-sm font-medium text-stone-700 dark:text-stone-200">
                  {breed.goodWithChildren ? "Yes" : "No"}
                </p>
              </div>
              <div className="detail-pill">
                <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">
                  Good with other pets
                </p>
                <p className="mt-2 text-sm font-medium text-stone-700 dark:text-stone-200">
                  {breed.goodWithPets ? "Yes" : "No"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-8 lg:grid-cols-2">
        <div className="glass-panel p-7">
          <h2 className="font-display text-3xl text-stone-900 dark:text-stone-50">Common health issues</h2>
          <div className="mt-5 flex flex-wrap gap-3">
            {breed.healthIssues.map((issue) => (
              <span
                className="rounded-full bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 dark:bg-rose-500/10 dark:text-rose-200"
                key={issue}
              >
                {issue}
              </span>
            ))}
          </div>
        </div>

        <div className="glass-panel p-7">
          <h2 className="font-display text-3xl text-stone-900 dark:text-stone-50">Fun facts</h2>
          <ul className="mt-5 space-y-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
            {breed.facts.map((fact) => (
              <li className="rounded-2xl bg-sand-50 px-4 py-3 dark:bg-white/5" key={fact}>
                {fact}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mt-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="chip">Related breeds</p>
            <h2 className="section-title mt-4">You may also like these breeds</h2>
          </div>
          <Link className="secondary-button" to="/breeds">
            Explore more dogs
          </Link>
        </div>

        <div className="mt-8 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {relatedBreeds.map((item) => (
            <BreedCard
              breed={item}
              isFavorite={favorites.includes(item.id)}
              key={item.id}
              onToggleFavorite={toggleFavorite}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
