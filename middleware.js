import { NextResponse } from "next/server";

const routes = {
  auth: ["/dashboard"],
  redirectIfAuth: ["/login"],
};

export function middleware(request) {
  const { pathname } = request.nextUrl;
  // Get the authentication token from cookies (adjust the cookie name as needed)
  const token = request.cookies.get("token")?.value;

  // --- Redirect authenticated users away from public routes (like /login) ---
  if (
    routes.redirectIfAuth.some((publicRoute) => pathname.startsWith(publicRoute)) &&
    token
  ) {
    const url = request.nextUrl.clone();
    // Redirect to the default authenticated route, e.g., the first element in routes.auth
    url.pathname = routes.auth[0];
    return NextResponse.redirect(url);
  }

  // --- Protect routes that require authentication ---
  if (
    routes.auth.some((authRoute) => pathname.startsWith(authRoute)) &&
    !token
  ) {
    const url = request.nextUrl.clone();
    // Redirect to the default public route, e.g., the first element in routes.public
    url.pathname = routes.public[0];
    // Optionally, attach a message query parameter
    url.searchParams.set("message", "You have been logged out");
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}
