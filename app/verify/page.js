"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { flashMessage } from "@/utils";
import { useAuth } from "@/hooks/useAuth";
import { useEffect } from "react";

export default function ResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get token from ?token=...
  const auth = useAuth();

  const verifyAccount = async () => {
    try {
      await auth.verify(token);
      flashMessage("success", "Account verified");
    } catch (error) {
      flashMessage(
        "error",
        error.response?.data.message || "Something went wrong"
      );
    }

    router.replace("/signin");
  };

  useEffect(() => {
    verifyAccount();
  }, []);

  return <div id="preloader"></div>;
}
