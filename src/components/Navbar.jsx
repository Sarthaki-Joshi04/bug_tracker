import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useAppData, useTheme } from "../App";

const navItems = [
  { label: "Home", to: "/" },
  { label: "Roles", to: "/roles" },
  { label: "Insights", to: "/insights" },
  { label: "Apply", to: "/apply" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { savedRoles } = useAppData();
  const { theme, toggleTheme } = useTheme();

  const linkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-semibold transition ${
      isActive
        ? "bg-slate-900 text-white dark:bg-white dark:text-slate-950"
        : "text-slate-700 hover:bg-white/70 dark:text-slate-200 dark:hover:bg-white/10"
    }`;

  return (
    <header className="sticky top-0 z-40 border-b border-white/30 bg-white/65 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/60">
      <div className="content-wrap flex flex-wrap items-center justify-between gap-4 py-4">
        <Link className="flex items-center gap-3" to="/">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slatebrand-600 text-sm font-bold text-white shadow-lg shadow-slatebrand-600/20">
            TF
          </div>
          <div>
            <p className="font-display text-xl font-semibold tracking-tight">TalentForge</p>
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">
              Hiring command
            </p>
          </div>
        </Link>

        <button
          className="secondary-button px-4 py-2 md:hidden"
          onClick={() => setIsOpen((current) => !current)}
          type="button"
        >
          Menu
        </button>

        <div className="hidden items-center gap-2 md:flex">
          {navItems.map((item) => (
            <NavLink className={linkClass} key={item.to} to={item.to}>
              {item.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          <div className="rounded-full border border-slate-300 bg-white/80 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200">
            Saved roles {savedRoles.length}
          </div>
          <button className="secondary-button px-4 py-2" onClick={toggleTheme} type="button">
            {theme === "dark" ? "Light mode" : "Dark mode"}
          </button>
        </div>

        {isOpen ? (
          <div className="glass-panel w-full space-y-4 p-4 md:hidden">
            <div className="grid gap-2">
              {navItems.map((item) => (
                <NavLink
                  className={linkClass}
                  key={item.to}
                  onClick={() => setIsOpen(false)}
                  to={item.to}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
            <div className="flex items-center justify-between gap-3">
              <div className="text-sm text-slate-600 dark:text-slate-300">
                Saved roles {savedRoles.length}
              </div>
              <button className="secondary-button px-4 py-2" onClick={toggleTheme} type="button">
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </header>
  );
}
