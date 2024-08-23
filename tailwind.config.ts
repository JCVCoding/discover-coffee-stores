import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        purple: {
          951: "rgba(79, 70, 229, 1)",
        },
        gray: {
          950: "hsla(0, 0%, 100%, 0.7);",
          951: "hsla(0, 0%, 100%, 0.4);",
          952: "#373b64",
        },
        green: { 123: "#d7e3de", 124: "#104936" },
        blue: { 123: "#7aaecb" },
      },
    },
  },
  plugins: [],
};
export default config;
