"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { flashMessage, withLoader } from "@/utils";

export default function ResetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token"); // Get token from ?token=...
  const auth = useAuth();

  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await withLoader(() => auth.reset({ ...data, token }), setIsLoading);
      flashMessage("success", `Password has been reset successfully`);
      router.replace("/signin");
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: error.response?.message || "Something went wrong",
      });
    }
  };

  // Check if token is missing, then redirect
  useEffect(() => {
    if (!token) {
      router.replace("/signin"); // Immediately redirect if no token
    }
  }, [token, router]);


  if (!token) {
    return <div id="preloader"></div>;
  }

  return (
    <div className="container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card p-5 col-md-6 col-lg-4">
        <div className="text-center mb-4">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className="mb-3"
            width="80"
          />
          <h3 className="fw-bold">Reset Password</h3>
          <p className="text-muted">Enter your new password below</p>
        </div>

        {/* Alert (success or error) */}
        {alert.message && (
          <div className={`alert alert-${alert.type}`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* New Password Field */}
          <div className="mb-3">
            <label className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your new password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters long",
                },
              })}
            />
            {errors.password && (
              <small className="text-danger d-block mt-2">
                {errors.password.message}
              </small>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Re-enter your new password"
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.confirmPassword && (
              <small className="text-danger d-block mt-2">
                {errors.confirmPassword.message}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={isLoading}
          >
            {isLoading ? (
              <span className="spinner-border spinner-border-sm"></span>
            ) : (
              "Reset Password"
            )}
          </button>
        </form>

        <div className="text-center mt-3">
          <Link href="/signin" className="text-decoration-underline">
            Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}
