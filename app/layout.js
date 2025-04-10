import ReactQuery from "@/providers/reactQuery";
import Toastify from "@/providers/tostify";
import { AuthProvider } from "@/context/authContext";
import { AosProvider } from "@/context/aosContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import "swiper/css";
import "./globals.css";
import "./overrides.css";
import "./config";

export const metadata = {
  title: "EZQanon",
  description: "...",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        {/* Google fonts */}
        <link href="https://fonts.googleapis.com" rel="preconnect" />
        <link
          href="https://fonts.gstatic.com"
          rel="preconnect"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100;0,300;0,400;0,500;0,700;0,900;1,100;1,300;1,400;1,500;1,700;1,900&family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&family=Ubuntu:ital,wght@0,300;0,400;0,500;0,700;1,300;1,400;1,500;1,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <AuthProvider>
          <AosProvider>
            <ReactQuery>
              <Toastify>{children}</Toastify>
            </ReactQuery>
          </AosProvider>
        </AuthProvider>
        
      </body>
    </html>
  );
}
