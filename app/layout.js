import { Roboto } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Script from "next/script";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "700", "900"],
  style: ["normal", "italic"],
  display: "swap", // Optimize loading
});

export const metadata = {
  title: "EZQanon",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      <Script
        src="/assets/js/main.js"
        strategy="afterInteractive" // Loads script only after page hydration
      />
    </html>
  );
}
