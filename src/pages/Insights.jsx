import { useAppData } from "../App";
import SectionHeading from "../components/SectionHeading";
import StatCard from "../components/StatCard";

export default function Insights() {
  const { metrics, pipeline, skills, activity } = useAppData();

  return (
    <main className="content-wrap py-8">
      <section className="animated-entry">
        <SectionHeading
          copy="This view turns mock product and hiring data into simple dashboard visuals without adding charting libraries, keeping the stack lightweight and interview-friendly."
          eyebrow="Insights"
          title="Data-rich UI with responsive charts and delivery signals"
        />
      </section>

      <section className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map((metric) => (
          <StatCard change={metric.change} key={metric.id} label={metric.label} value={metric.value} />
        ))}
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[1.1fr,0.9fr]">
        <div className="glass-panel p-6">
          <h2 className="font-display text-3xl text-slate-900 dark:text-white">Hiring funnel health</h2>
          <div className="mt-6 grid gap-5">
            {pipeline.map((stage) => (
              <div key={stage.id}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>{stage.label}</span>
                  <span>
                    {stage.count} candidates • {stage.percent}%
                  </span>
                </div>
                <div className="chart-bar h-3">
                  <span style={{ width: `${stage.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel p-6">
          <h2 className="font-display text-3xl text-slate-900 dark:text-white">Skill demand snapshot</h2>
          <div className="mt-6 grid gap-5">
            {skills.map((skill) => (
              <div key={skill.id}>
                <div className="mb-2 flex items-center justify-between text-sm text-slate-600 dark:text-slate-300">
                  <span>{skill.label}</span>
                  <span>{skill.percent}%</span>
                </div>
                <div className="chart-bar h-3">
                  <span style={{ width: `${skill.percent}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-4">
        {activity.map((item) => (
          <div className="glass-panel p-6" key={item.id}>
            <p className="text-sm text-slate-500 dark:text-slate-400">{item.label}</p>
            <p className="mt-5 font-display text-5xl text-slate-900 dark:text-white">{item.value}</p>
          </div>
        ))}
      </section>
    </main>
  );
}
