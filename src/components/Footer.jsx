import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-white/30 bg-white/60 py-10 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/45">
      <div className="content-wrap grid gap-8 md:grid-cols-[1.2fr,0.8fr,0.8fr]">
        <div>
          <p className="eyebrow">TalentForge</p>
          <h2 className="mt-4 font-display text-2xl text-slate-900 dark:text-slate-50">
            A modern frontend assignment built to show product thinking, clean code, and UI polish.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
            Browse the hiring pipeline, inspect role demand, and submit an application through a
            responsive React and Tailwind experience designed like a production product.
          </p>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Explore
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
            <Link to="/">Home</Link>
            <Link to="/roles">Roles</Link>
            <Link to="/insights">Insights</Link>
            <Link to="/apply">Apply</Link>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
            Highlights
          </h3>
          <div className="mt-4 grid gap-3 text-sm text-slate-700 dark:text-slate-200">
            <p>Responsive landing and dashboard views</p>
            <p>Dark mode, routing, and saved roles</p>
            <p>Search, filters, and modal details</p>
            <p>Validated async application form</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
