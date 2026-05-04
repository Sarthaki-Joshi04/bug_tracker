export default function About() {
  return (
    <main className="content-wrap pt-8">
      <section className="glass-panel overflow-hidden p-8 sm:p-10">
        <p className="chip">About Dog World</p>
        <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr,0.9fr]">
          <div>
            <h1 className="section-title">A calm, visual guide to the dog breeds people ask about most.</h1>
            <p className="section-copy mt-4">
              Dog World was designed as a breed discovery website where visitors can quickly search,
              compare, and understand major dog breeds without hopping between scattered sources.
            </p>
            <p className="section-copy mt-4">
              Each profile brings together dog images, origins, physical traits, compatibility,
              grooming requirements, and notable care considerations in one clean place.
            </p>
          </div>

          <div className="grid gap-4">
            {[
              "50 dog breeds with detailed profile pages",
              "Search, sorting, filter controls, and pagination",
              "Dark mode, favorites, and responsive layouts",
              "Dog galleries, related breeds, and contact form section",
            ].map((item) => (
              <div className="detail-pill" key={item}>
                <p className="text-sm font-medium text-stone-700 dark:text-stone-200">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-8 grid gap-6 md:grid-cols-3">
        {[
          {
            title: "Thoughtful design",
            copy: "Rounded cards, warm gradients, expressive typography, and a spacious layout keep the experience polished on every screen size.",
          },
          {
            title: "Useful breed details",
            copy: "Breed pages highlight lifespan, size, energy, temperament, health issues, and practical daily care notes for quick understanding.",
          },
          {
            title: "Built for exploration",
            copy: "The homepage and breed grid both make it easy to jump from curiosity to a focused shortlist of breeds that fit a lifestyle.",
          },
        ].map((item) => (
          <article className="glass-panel p-6" key={item.title}>
            <h2 className="font-display text-2xl text-stone-900 dark:text-stone-50">{item.title}</h2>
            <p className="mt-3 text-sm leading-7 text-stone-600 dark:text-stone-300">{item.copy}</p>
          </article>
        ))}
      </section>
    </main>
  );
}
