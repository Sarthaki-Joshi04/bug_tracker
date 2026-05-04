export default function StatCard({ label, value, change }) {
  return (
    <article className="detail-pill">
      <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-4 font-display text-3xl text-slate-900 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-cyanbrand-700 dark:text-cyanbrand-400">{change}</p>
    </article>
  );
}
