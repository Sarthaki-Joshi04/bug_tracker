export default function SearchBar({
  value,
  onChange,
  placeholder = "Search dog breeds by name...",
  className = "",
}) {
  return (
    <label
      className={`flex items-center gap-3 rounded-full border border-stone-200 bg-white/80 px-4 py-3 shadow-sm dark:border-white/10 dark:bg-white/5 ${className}`}
    >
      <span className="text-lg text-sand-500 dark:text-sand-300">⌕</span>
      <input
        className="w-full bg-transparent text-sm text-stone-800 outline-none placeholder:text-stone-400 dark:text-stone-100 dark:placeholder:text-stone-500"
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        type="search"
        value={value}
      />
    </label>
  );
}
