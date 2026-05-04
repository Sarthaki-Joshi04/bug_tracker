/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        slatebrand: {
          50: "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          300: "#93c5fd",
          400: "#60a5fa",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#172554"
        },
        cyanbrand: {
          400: "#22d3ee",
          500: "#06b6d4",
          700: "#0f766e"
        },
        ember: {
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c"
        }
      },
      fontFamily: {
        display: ["Sora", "Segoe UI", "sans-serif"],
        body: ["Manrope", "Segoe UI", "sans-serif"]
      },
      boxShadow: {
        soft: "0 24px 80px rgba(15, 23, 42, 0.16)"
      },
      backgroundImage: {
        "mesh-light":
          "radial-gradient(circle at top left, rgba(59, 130, 246, 0.18), transparent 30%), radial-gradient(circle at right, rgba(34, 211, 238, 0.18), transparent 28%), linear-gradient(180deg, #f8fbff 0%, #eef4ff 100%)",
        "mesh-dark":
          "radial-gradient(circle at top left, rgba(37, 99, 235, 0.22), transparent 30%), radial-gradient(circle at right, rgba(6, 182, 212, 0.18), transparent 24%), linear-gradient(180deg, #020617 0%, #0f172a 100%)"
      }
    }
  },
  plugins: []
};
