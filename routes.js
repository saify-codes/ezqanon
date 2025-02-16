export const routes = {
  protected: ["/profile", "/dashboard", "/settings", "/appointments"], // Pages that require authentication
  guest: ["/signin", "/signup"], // Pages for unauthenticated users
};
