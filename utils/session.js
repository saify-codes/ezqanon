'use client'

export function flashMessage(key, value) {
  if (typeof window !== "undefined") {
    sessionStorage.setItem(key, value);
  }
}

export function getFlashMessage(key) {
  if (typeof window !== "undefined") {
    const message = sessionStorage.getItem(key);
    sessionStorage.removeItem(key);
    return message;
  }
  return null; // Return null if window is undefined (e.g., during SSR)
}
