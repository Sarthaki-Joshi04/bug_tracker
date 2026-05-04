export default function Contact() {
  return (
    <main className="content-wrap pt-8">
      <section className="grid gap-6 lg:grid-cols-[0.9fr,1.1fr]">
        <div className="glass-panel p-8">
          <p className="chip">Contact</p>
          <h1 className="mt-5 font-display text-4xl text-stone-900 dark:text-stone-50">
            Get in touch with Dog World
          </h1>
          <p className="mt-4 text-sm leading-7 text-stone-600 dark:text-stone-300">
            Reach out for partnership ideas, content corrections, new breed suggestions, or general
            feedback about the Dog World experience.
          </p>

          <div className="mt-6 space-y-4 text-sm text-stone-700 dark:text-stone-200">
            <div className="detail-pill">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Email</p>
              <p className="mt-2 font-medium">hello@dogworld.example</p>
            </div>
            <div className="detail-pill">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Support</p>
              <p className="mt-2 font-medium">Response time within 1-2 business days</p>
            </div>
            <div className="detail-pill">
              <p className="text-xs uppercase tracking-[0.2em] text-stone-500 dark:text-stone-400">Community</p>
              <p className="mt-2 font-medium">Dog lovers, breeders, rescues, and curious families welcome</p>
            </div>
          </div>
        </div>

        <form
          className="glass-panel grid gap-5 p-8"
          onSubmit={(event) => {
            event.preventDefault();
          }}
        >
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200" htmlFor="name">
              Full name
            </label>
            <input
              className="w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm outline-none focus:border-sand-300 dark:border-white/10 dark:bg-white/5"
              id="name"
              placeholder="Your name"
              type="text"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200" htmlFor="email">
              Email address
            </label>
            <input
              className="w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm outline-none focus:border-sand-300 dark:border-white/10 dark:bg-white/5"
              id="email"
              placeholder="you@example.com"
              type="email"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200" htmlFor="topic">
              Topic
            </label>
            <select
              className="w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm outline-none focus:border-sand-300 dark:border-white/10 dark:bg-white/5"
              id="topic"
            >
              <option>General feedback</option>
              <option>Breed correction</option>
              <option>Partnership</option>
              <option>Feature request</option>
            </select>
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-stone-700 dark:text-stone-200" htmlFor="message">
              Message
            </label>
            <textarea
              className="min-h-40 w-full rounded-2xl border border-stone-200 bg-white/85 px-4 py-3 text-sm outline-none focus:border-sand-300 dark:border-white/10 dark:bg-white/5"
              id="message"
              placeholder="Tell us what you would like to share..."
            />
          </div>
          <button className="primary-button w-full sm:w-max" type="submit">
            Send Message
          </button>
        </form>
      </section>
    </main>
  );
}
