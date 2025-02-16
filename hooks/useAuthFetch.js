import axios from "axios";
import { useMemo } from "react";
import { useAuth } from "./useAuth";
import { flashMessage } from "@/utils";
import { useRouter } from "next/navigation";

export default function useAuthFetch() {
  const { signout, token, status } = useAuth();
  const router = useRouter();

  return useMemo(() => {
    const instance = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_BASE_URL, // Use environment variable for API URL
      headers: {
        "Content-Type": `application/json`,
        "Authorization": `Bearer ${token}`
      },
    });

    // Add response interceptor to handle errors globally
    instance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          const { status } = error.response;

          if (status === 401) {
            flashMessage("error","Session expired please sign in again.");
            signout(); // Clear auth state
            router.push("/signin"); // Redirect to login page
            return
          }
        }
        return Promise.reject(error);
      }
    );

    return instance;
  }, [router, token]);
}
