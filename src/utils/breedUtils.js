export function getFilterOptions(breeds) {
  const uniqueValues = (key) => [...new Set(breeds.map((breed) => breed[key]))].sort();

  return {
    sizes: uniqueValues("size"),
    groups: uniqueValues("group"),
    origins: uniqueValues("origin"),
  };
}

export function filterAndSortBreeds(breeds, filters) {
  const search = filters.search.trim().toLowerCase();

  const filtered = breeds.filter((breed) => {
    const matchesSearch = search ? breed.name.toLowerCase().includes(search) : true;
    const matchesSize = filters.size === "All" ? true : breed.size === filters.size;
    const matchesGroup = filters.group === "All" ? true : breed.group === filters.group;
    const matchesOrigin = filters.origin === "All" ? true : breed.origin === filters.origin;

    return matchesSearch && matchesSize && matchesGroup && matchesOrigin;
  });

  return filtered.sort((a, b) => {
    if (filters.sort === "az") {
      return a.name.localeCompare(b.name);
    }

    if (filters.sort === "za") {
      return b.name.localeCompare(a.name);
    }

    return b.popularity - a.popularity;
  });
}

export function paginateBreeds(breeds, currentPage, pageSize) {
  const totalPages = Math.max(1, Math.ceil(breeds.length / pageSize));
  const safePage = Math.min(currentPage, totalPages);
  const startIndex = (safePage - 1) * pageSize;
  const endIndex = Math.min(startIndex + pageSize, breeds.length);

  return {
    items: breeds.slice(startIndex, endIndex),
    currentPage: safePage,
    totalPages,
    startIndex,
    endIndex,
  };
}
