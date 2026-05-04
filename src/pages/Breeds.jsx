import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDogs } from "../App";
import BreedCard from "../components/BreedCard";
import FilterPanel from "../components/FilterPanel";
import SearchBar from "../components/SearchBar";
import { filterAndSortBreeds, getFilterOptions, paginateBreeds } from "../utils/breedUtils";

const defaultFilters = {
  search: "",
  size: "All",
  group: "All",
  origin: "All",
  sort: "popular",
};

export default function Breeds() {
  const { dogs, favorites, toggleFavorite, error } = useDogs();
  const [searchParams] = useSearchParams();
  const [filters, setFilters] = useState(defaultFilters);
  const [page, setPage] = useState(1);
  const pageSize = 12;

  useEffect(() => {
    const search = searchParams.get("search") ?? "";
    setFilters((current) => ({ ...current, search }));
  }, [searchParams]);

  const options = useMemo(() => getFilterOptions(dogs), [dogs]);
  const filteredBreeds = useMemo(() => filterAndSortBreeds(dogs, filters), [dogs, filters]);
  const pagination = useMemo(
    () => paginateBreeds(filteredBreeds, page, pageSize),
    [filteredBreeds, page, pageSize]
  );

  useEffect(() => {
    setPage(1);
  }, [filters.search, filters.size, filters.group, filters.origin, filters.sort]);

  return (
    <main className="content-wrap pt-8">
      <section className="grid gap-6 xl:grid-cols-[320px,1fr]">
        <FilterPanel
          filters={filters}
          onReset={() => setFilters(defaultFilters)}
          options={options}
          setFilters={setFilters}
          totalResults={filteredBreeds.length}
        />

        <div className="space-y-6">
          <div className="glass-panel p-6">
            <p className="chip">Browse all breeds</p>
            <div className="mt-4 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <h1 className="section-title">All Dog Breeds</h1>
                <p className="section-copy mt-3">
                  Search by breed name, narrow by size, group, or country, and sort the breed list
                  your way.
                </p>
              </div>
              <div className="rounded-full bg-sand-50 px-4 py-3 text-sm font-semibold text-stone-700 dark:bg-white/5 dark:text-stone-200">
                Page {pagination.currentPage} of {pagination.totalPages || 1}
              </div>
            </div>
            <SearchBar
              className="mt-6"
              onChange={(value) => setFilters((current) => ({ ...current, search: value }))}
              value={filters.search}
            />
          </div>

          {error ? (
            <div className="glass-panel p-8 text-sm text-red-600 dark:text-red-300">{error}</div>
          ) : (
            <>
              {pagination.items.length ? (
                <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                  {pagination.items.map((breed) => (
                    <BreedCard
                      breed={breed}
                      isFavorite={favorites.includes(breed.id)}
                      key={breed.id}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              ) : (
                <div className="glass-panel p-10 text-center">
                  <h2 className="font-display text-3xl text-stone-900 dark:text-stone-50">
                    No breeds matched your filters
                  </h2>
                  <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">
                    Try clearing one or two filters, or search with a shorter breed name.
                  </p>
                </div>
              )}

              {pagination.totalPages > 1 ? (
                <div className="glass-panel flex flex-col items-center justify-between gap-4 p-5 sm:flex-row">
                  <button
                    className="secondary-button w-full sm:w-auto"
                    disabled={pagination.currentPage === 1}
                    onClick={() => setPage((current) => Math.max(current - 1, 1))}
                    type="button"
                  >
                    Previous
                  </button>
                  <p className="text-sm text-stone-600 dark:text-stone-300">
                    Showing {pagination.startIndex + 1}-{pagination.endIndex} of {filteredBreeds.length}
                  </p>
                  <button
                    className="primary-button w-full sm:w-auto"
                    disabled={pagination.currentPage === pagination.totalPages}
                    onClick={() =>
                      setPage((current) => Math.min(current + 1, pagination.totalPages))
                    }
                    type="button"
                  >
                    Next
                  </button>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
