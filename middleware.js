import { NextResponse } from "next/server";
import { routes } from "./routes";

export function middleware(request) {
  const token = request.cookies.get("auth_token")?.value;
  const url = request.nextUrl.clone();

  const isProtectedRoute = routes.protected.includes(url.pathname);
  const isGuestRoute = routes.guest.includes(url.pathname);

  // If user is not authenticated and trying to access a protected route, redirect to sign-in page
  if (!token && isProtectedRoute) {
    url.pathname = "/signin";
    return NextResponse.redirect(url);
  }

  // If user is authenticated and trying to access a guest-only route, redirect to dashboard
  if (token && isGuestRoute) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // Allow the request to proceed if no redirection is needed
  return NextResponse.next();
}


