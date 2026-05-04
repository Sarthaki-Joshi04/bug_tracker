const baseSelectClass =
  "w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm text-stone-700 outline-none transition focus:border-sand-300 dark:border-white/10 dark:bg-white/5 dark:text-stone-100";

export default function FilterPanel({
  filters,
  setFilters,
  options,
  totalResults,
  onReset,
}) {
  return (
    <aside className="glass-panel h-fit p-5">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="chip">Filter</p>
          <h2 className="mt-3 font-display text-2xl text-stone-900 dark:text-stone-50">
            Find your ideal breed
          </h2>
        </div>
        <button className="text-sm font-semibold text-sand-600 dark:text-sand-300" onClick={onReset} type="button">
          Reset
        </button>
      </div>

      <div className="mt-5 space-y-4">
        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">Size</span>
          <select
            className={baseSelectClass}
            onChange={(event) =>
              setFilters((current) => ({ ...current, size: event.target.value }))
            }
            value={filters.size}
          >
            <option value="All">All sizes</option>
            {options.sizes.map((size) => (
              <option key={size} value={size}>
                {size}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
            Breed group
          </span>
          <select
            className={baseSelectClass}
            onChange={(event) =>
              setFilters((current) => ({ ...current, group: event.target.value }))
            }
            value={filters.group}
          >
            <option value="All">All groups</option>
            {options.groups.map((group) => (
              <option key={group} value={group}>
                {group}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">
            Country of origin
          </span>
          <select
            className={baseSelectClass}
            onChange={(event) =>
              setFilters((current) => ({ ...current, origin: event.target.value }))
            }
            value={filters.origin}
          >
            <option value="All">All countries</option>
            {options.origins.map((origin) => (
              <option key={origin} value={origin}>
                {origin}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-medium text-stone-600 dark:text-stone-300">Sort</span>
          <select
            className={baseSelectClass}
            onChange={(event) =>
              setFilters((current) => ({ ...current, sort: event.target.value }))
            }
            value={filters.sort}
          >
            <option value="popular">Most popular</option>
            <option value="az">A-Z</option>
            <option value="za">Z-A</option>
          </select>
        </label>
      </div>

      <div className="mt-5 rounded-2xl bg-sand-50 p-4 text-sm text-stone-700 dark:bg-sand-500/10 dark:text-stone-200">
        Showing <span className="font-semibold">{totalResults}</span> matching breeds.
      </div>
    </aside>
  );
}
