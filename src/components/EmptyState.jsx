export default function EmptyState({ title, copy }) {
  return (
    <div className="glass-panel p-10 text-center">
      <p className="eyebrow">No results</p>
      <h3 className="mt-4 font-display text-3xl text-slate-900 dark:text-white">{title}</h3>
      <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        {copy}
      </p>
    </div>
  );
}
