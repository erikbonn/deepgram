import "~/styles/globals.css";
import { Cairo } from "@next/font/google";

const cairo = Cairo({
  weight: "400",
  subsets: ["latin", "arabic", "latin-ext"],
  display: "swap",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cairo.className}>
      <body>{children}</body>
    </html>
  );
}
