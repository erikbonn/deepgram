import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import { withUt } from "uploadthing/tw";

export default withUt({
  content: ["./src/**/*.{tsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        green: "#00BB7C",
        blue: "#0072FF",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
}) satisfies Config;
