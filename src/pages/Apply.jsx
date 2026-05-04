import { useState } from "react";
import { useAppData } from "../App";
import SectionHeading from "../components/SectionHeading";

const initialForm = {
  fullName: "",
  email: "",
  roleId: "",
  experience: "",
  portfolio: "",
  github: "",
  availability: "",
  motivation: "",
  terms: false,
};

function validateForm(form) {
  const nextErrors = {};

  if (!form.fullName.trim()) nextErrors.fullName = "Please enter your full name.";
  if (!/\S+@\S+\.\S+/.test(form.email)) nextErrors.email = "Enter a valid email address.";
  if (!form.roleId) nextErrors.roleId = "Select the role you want to apply for.";
  if (!form.experience) nextErrors.experience = "Choose your current experience level.";
  if (!/^https?:\/\/.+/.test(form.portfolio)) nextErrors.portfolio = "Add a valid portfolio URL.";
  if (!/^https?:\/\/.+/.test(form.github)) nextErrors.github = "Add a valid GitHub URL.";
  if (!form.availability) nextErrors.availability = "Share your joining availability.";
  if (form.motivation.trim().length < 40) {
    nextErrors.motivation = "Tell us a bit more about why this role fits you.";
  }
  if (!form.terms) nextErrors.terms = "Please confirm the submission terms.";

  return nextErrors;
}

export default function Apply() {
  const { roles } = useAppData();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({
    submitting: false,
    success: "",
    error: "",
  });

  const updateField = (name, value) => {
    setForm((current) => ({
      ...current,
      [name]: value,
    }));
    setErrors((current) => ({
      ...current,
      [name]: "",
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const nextErrors = validateForm(form);
    if (Object.keys(nextErrors).length) {
      setErrors(nextErrors);
      setStatus({
        submitting: false,
        success: "",
        error: "Please fix the highlighted fields and try again.",
      });
      return;
    }

    setStatus({
      submitting: true,
      success: "",
      error: "",
    });

    try {
      // Mock async submission so the form demonstrates a realistic frontend flow.
      await new Promise((resolve, reject) => {
        window.setTimeout(() => {
          if (form.email.endsWith("@testfail.dev")) {
            reject(new Error("The application service is temporarily unavailable."));
            return;
          }

          resolve();
        }, 1200);
      });

      setStatus({
        submitting: false,
        success: "Application submitted successfully. The hiring team will review it shortly.",
        error: "",
      });
      setForm(initialForm);
      setErrors({});
    } catch (submissionError) {
      setStatus({
        submitting: false,
        success: "",
        error: submissionError.message,
      });
    }
  };

  return (
    <main className="content-wrap py-8">
      <section className="animated-entry">
        <SectionHeading
          copy="The form uses controlled inputs, inline validation, loading feedback, and a simulated async submit state to demonstrate real-world frontend patterns."
          eyebrow="Application form"
          title="Submit a polished frontend intern application"
        />
      </section>

      <section className="mt-10 grid gap-6 lg:grid-cols-[0.85fr,1.15fr]">
        <div className="glass-panel p-8">
          <p className="eyebrow">What this demonstrates</p>
          <div className="mt-6 grid gap-4">
            {[
              "Controlled form inputs with React hooks",
              "Client-side validation and field-level messaging",
              "Async submit flow with loading, success, and error states",
              "Responsive layout that stays readable on smaller screens",
            ].map((item) => (
              <div className="detail-pill" key={item}>
                <p className="text-sm leading-7 text-slate-600 dark:text-slate-300">{item}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-sm leading-7 text-slate-500 dark:text-slate-400">
            Demo note: use an email ending in <code>@testfail.dev</code> to preview the error state.
          </p>
        </div>

        <form className="glass-panel grid gap-5 p-8" onSubmit={handleSubmit}>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="fullName">
                Full name
              </label>
              <input
                className="field-input"
                id="fullName"
                onChange={(event) => updateField("fullName", event.target.value)}
                placeholder="Aarav Sharma"
                type="text"
                value={form.fullName}
              />
              {errors.fullName ? <p className="mt-2 text-sm text-red-500">{errors.fullName}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="email">
                Email
              </label>
              <input
                className="field-input"
                id="email"
                onChange={(event) => updateField("email", event.target.value)}
                placeholder="aarav@example.com"
                type="email"
                value={form.email}
              />
              {errors.email ? <p className="mt-2 text-sm text-red-500">{errors.email}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="roleId">
                Role
              </label>
              <select
                className="field-input"
                id="roleId"
                onChange={(event) => updateField("roleId", event.target.value)}
                value={form.roleId}
              >
                <option value="">Select a role</option>
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.title}
                  </option>
                ))}
              </select>
              {errors.roleId ? <p className="mt-2 text-sm text-red-500">{errors.roleId}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="experience">
                Experience
              </label>
              <select
                className="field-input"
                id="experience"
                onChange={(event) => updateField("experience", event.target.value)}
                value={form.experience}
              >
                <option value="">Select experience</option>
                <option value="student">Student</option>
                <option value="fresher">Fresher</option>
                <option value="intern">Internship experience</option>
                <option value="junior">1+ year experience</option>
              </select>
              {errors.experience ? <p className="mt-2 text-sm text-red-500">{errors.experience}</p> : null}
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="field-label" htmlFor="portfolio">
                Portfolio URL
              </label>
              <input
                className="field-input"
                id="portfolio"
                onChange={(event) => updateField("portfolio", event.target.value)}
                placeholder="https://your-portfolio.dev"
                type="url"
                value={form.portfolio}
              />
              {errors.portfolio ? <p className="mt-2 text-sm text-red-500">{errors.portfolio}</p> : null}
            </div>

            <div>
              <label className="field-label" htmlFor="github">
                GitHub URL
              </label>
              <input
                className="field-input"
                id="github"
                onChange={(event) => updateField("github", event.target.value)}
                placeholder="https://github.com/username"
                type="url"
                value={form.github}
              />
              {errors.github ? <p className="mt-2 text-sm text-red-500">{errors.github}</p> : null}
            </div>
          </div>

          <div>
            <label className="field-label" htmlFor="availability">
              Availability
            </label>
            <input
              className="field-input"
              id="availability"
              onChange={(event) => updateField("availability", event.target.value)}
              placeholder="Available to join in 2 weeks"
              type="text"
              value={form.availability}
            />
            {errors.availability ? <p className="mt-2 text-sm text-red-500">{errors.availability}</p> : null}
          </div>

          <div>
            <label className="field-label" htmlFor="motivation">
              Why are you a strong fit?
            </label>
            <textarea
              className="field-input min-h-40"
              id="motivation"
              onChange={(event) => updateField("motivation", event.target.value)}
              placeholder="Share the projects, frontend strengths, and collaboration habits that make you a good match."
              value={form.motivation}
            />
            {errors.motivation ? <p className="mt-2 text-sm text-red-500">{errors.motivation}</p> : null}
          </div>

          <label className="flex items-start gap-3 text-sm text-slate-600 dark:text-slate-300">
            <input
              checked={form.terms}
              className="mt-1 h-4 w-4 rounded border-slate-300 text-slatebrand-600 focus:ring-slatebrand-300"
              onChange={(event) => updateField("terms", event.target.checked)}
              type="checkbox"
            />
            <span>I confirm that the information shared is accurate and ready for review.</span>
          </label>
          {errors.terms ? <p className="text-sm text-red-500">{errors.terms}</p> : null}

          {status.error ? (
            <div className="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-500/30 dark:bg-red-500/10 dark:text-red-300">
              {status.error}
            </div>
          ) : null}

          {status.success ? (
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-300">
              {status.success}
            </div>
          ) : null}

          <button className="primary-button w-full sm:w-max" disabled={status.submitting} type="submit">
            {status.submitting ? "Submitting application..." : "Submit application"}
          </button>
        </form>
      </section>
    </main>
  );
}
