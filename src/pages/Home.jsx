import { Link, useNavigate } from "react-router-dom";
import { useAppData } from "../App";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";
import RoleCard from "../components/RoleCard";

export default function Home() {
  const navigate = useNavigate();
  const { company, metrics, roles, savedRoles, toggleSavedRole, pipeline } = useAppData();
  const featuredRoles = roles.slice(0, 3);

  return (
    <main>
      <section className="content-wrap pt-8">
        <div className="grid gap-6 lg:grid-cols-[1.15fr,0.85fr]">
          <div className="animated-entry overflow-hidden rounded-[2.4rem] border border-white/40 bg-slate-950 p-8 text-white shadow-soft sm:p-12">
            <p className="eyebrow border-white/20 bg-white/10 text-white">Frontend internship assignment</p>
            <h1 className="mt-6 max-w-3xl font-display text-5xl leading-none sm:text-6xl lg:text-7xl">
              {company.headline}
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-7 text-white/80 sm:text-lg">
              {company.summary}
            </p>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link className="primary-button" to="/roles">
                Explore roles
              </Link>
              <Link className="secondary-button border-white/30 bg-white/10 text-white hover:text-white" to="/apply">
                Start application
              </Link>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Reusable components", value: "12+" },
                { label: "Responsive breakpoints", value: "3 layouts" },
                { label: "Interactive flows", value: "Search + form + modal" },
              ].map((item) => (
                <div className="rounded-3xl border border-white/10 bg-white/5 p-4" key={item.label}>
                  <p className="text-xs uppercase tracking-[0.22em] text-white/60">{item.label}</p>
                  <p className="mt-3 font-display text-2xl">{item.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel grid gap-5 p-6">
            <div>
              <p className="eyebrow">At a glance</p>
              <h2 className="mt-4 font-display text-3xl text-slate-900 dark:text-slate-50">
                A dashboard UI that feels like a real product, not just a page of cards.
              </h2>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              {metrics.map((item) => (
                <StatCard change={item.change} key={item.id} label={item.label} value={item.value} />
              ))}
            </div>
            <div className="rounded-[1.75rem] bg-slate-50 p-5 dark:bg-white/5">
              <p className="text-sm font-semibold text-slate-800 dark:text-slate-100">Why this works for an intern review</p>
              <p className="mt-2 text-sm leading-7 text-slate-600 dark:text-slate-300">
                It shows routing, state management, reusable components, a clear data model, async
                form behavior, filters, theming, and polished responsive presentation in one app.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap mt-16">
        <div className="grid gap-6 lg:grid-cols-[0.95fr,1.05fr]">
          <div className="glass-panel p-8">
            <SectionHeading
              copy="The landing page previews real app depth instead of stopping at hero copy. Reviewers can immediately see product metrics, funnel health, and saved state."
              eyebrow="Experience design"
              title="Built for quick comprehension and strong visual hierarchy"
            />

            <div className="mt-8 grid gap-5">
              {pipeline.slice(0, 3).map((stage) => (
                <div key={stage.id}>
                  <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                    <span>{stage.label}</span>
                    <span>{stage.percent}%</span>
                  </div>
                  <div className="chart-bar h-3">
                    <span style={{ width: `${stage.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="eyebrow">Featured roles</p>
                <h2 className="section-title mt-4">Live openings rendered from mock product data</h2>
              </div>
              <Link className="primary-button" to="/roles">
                View all roles
              </Link>
            </div>

            <div className="grid gap-6">
              {featuredRoles.map((role) => (
                <RoleCard
                  isSaved={savedRoles.includes(role.id)}
                  key={role.id}
                  onOpen={() => navigate("/roles")}
                  onToggleSave={toggleSavedRole}
                  role={role}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="content-wrap mt-16 pb-6">
        <div className="glass-panel overflow-hidden p-8 sm:p-10">
          <div className="grid gap-8 lg:grid-cols-[1fr,auto] lg:items-center">
            <div>
              <p className="eyebrow">Final call to action</p>
              <h2 className="mt-4 font-display text-4xl text-slate-900 dark:text-white">
                Review the dashboard, inspect the interactions, then submit the form flow.
              </h2>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
                This project is intentionally scoped to show senior-level frontend habits: clear
                structure, practical state modeling, UI consistency, and accessible interaction patterns.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link className="primary-button" to="/insights">
                Open insights
              </Link>
              <Link className="secondary-button" to="/apply">
                Apply now
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
