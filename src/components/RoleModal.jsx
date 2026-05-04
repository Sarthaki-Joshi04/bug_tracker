export default function RoleModal({ role, onClose, onToggleSave, isSaved }) {
  if (!role) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-10">
      <div className="glass-panel max-h-[90vh] w-full max-w-3xl overflow-y-auto p-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="eyebrow">{role.team}</p>
            <h2 className="mt-4 font-display text-4xl text-slate-900 dark:text-white">{role.title}</h2>
            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">
              {role.summary}
            </p>
          </div>
          <button className="secondary-button px-4 py-2" onClick={onClose} type="button">
            Close
          </button>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {[
            ["Location", role.location],
            ["Mode", role.mode],
            ["Type", role.type],
            ["Experience", role.experience],
            ["Status", role.status],
            ["Applicants", `${role.applicants} active`],
          ].map(([label, value]) => (
            <div className="detail-pill" key={label}>
              <p className="text-xs uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">{label}</p>
              <p className="mt-3 text-lg font-semibold text-slate-900 dark:text-white">{value}</p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[0.9fr,1.1fr]">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">Primary stack</h3>
            <div className="mt-4 flex flex-wrap gap-2">
              {role.stack.map((item) => (
                <span
                  className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                  key={item}
                >
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 dark:text-white">What you will own</h3>
            <div className="mt-4 grid gap-3">
              {role.outcomes.map((item) => (
                <div className="detail-pill" key={item}>
                  <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <button className="primary-button" onClick={() => onToggleSave(role.id)} type="button">
            {isSaved ? "Remove from saved" : "Save role"}
          </button>
          <button className="secondary-button" onClick={onClose} type="button">
            Keep browsing
          </button>
        </div>
      </div>
    </div>
  );
}
