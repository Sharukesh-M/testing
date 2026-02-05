export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00f7ff",
        deep: "#02070f"
      },
      boxShadow: {
        glow: "0 0 40px rgba(0,247,255,0.5)"
      }
    }
  },
  plugins: []
};
