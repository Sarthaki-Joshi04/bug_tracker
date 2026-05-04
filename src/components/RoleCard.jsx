export default function RoleCard({ role, isSaved, onOpen, onToggleSave }) {
  return (
    <article className="glass-panel flex h-full flex-col p-6 transition duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.22em] text-cyanbrand-700 dark:text-cyanbrand-400">
            {role.team}
          </p>
          <h3 className="mt-3 font-display text-2xl text-slate-900 dark:text-white">{role.title}</h3>
        </div>
        <button className="secondary-button px-4 py-2" onClick={() => onToggleSave(role.id)} type="button">
          {isSaved ? "Saved" : "Save"}
        </button>
      </div>

      <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">{role.summary}</p>

      <div className="mt-5 flex flex-wrap gap-2">
        {role.stack.map((item) => (
          <span
            className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            key={item}
          >
            {item}
          </span>
        ))}
      </div>

      <div className="mt-6 grid gap-3 text-sm text-slate-600 dark:text-slate-300 sm:grid-cols-2">
        <p>{role.location}</p>
        <p>{role.mode}</p>
        <p>{role.type}</p>
        <p>{role.experience}</p>
      </div>

      <div className="mt-6 flex items-center justify-between border-t border-slate-200 pt-5 text-sm dark:border-white/10">
        <div>
          <p className="font-semibold text-slate-900 dark:text-white">{role.applicants} applicants</p>
          <p className="text-slate-500 dark:text-slate-400">{role.posted}</p>
        </div>
        <button className="primary-button" onClick={() => onOpen(role)} type="button">
          View details
        </button>
      </div>
    </article>
  );
}
