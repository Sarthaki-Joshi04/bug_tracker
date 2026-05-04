export default function LoadingSpinner({ message = "Loading..." }) {
  return (
    <div className="glass-panel flex min-h-[40vh] flex-col items-center justify-center gap-5 p-10 text-center">
      <div className="relative h-16 w-16">
        <div className="absolute inset-0 animate-ping rounded-full bg-slatebrand-300/60 dark:bg-cyanbrand-500/20" />
        <div className="absolute inset-2 animate-spin rounded-full border-4 border-slate-200 border-t-slatebrand-600 dark:border-white/10 dark:border-t-cyanbrand-400" />
      </div>
      <div>
        <h2 className="font-display text-2xl text-slate-900 dark:text-slate-50">TalentForge</h2>
        <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{message}</p>
      </div>
    </div>
  );
}
