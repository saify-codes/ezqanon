"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { withLoader } from "@/utils";
import Link from "next/link";

export default function Forgot() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [countdown, setCountdown] = useState(0);
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    // Clear any previous alert on new submission
    setAlert({ type: "", message: "" });

    try {
      // Using a loader for asynchronous operation
      const response = await withLoader(
        () => auth.forgot(data.email),
        setIsLoading
      );
      // If the API call is successful:
      setAlert({ type: "success", message: response });
      setCountdown(30);

      // timer
      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 0) clearInterval(interval);
          return prev - 1;
        });
      }, 1000);
    } catch (err) {
      const { response } = err;
      setAlert({
        type: "danger",
        message: response?.data?.message || "Something went wrong",
      });
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card col-12 col-md-6 col-lg-4">
        <div className="text-center mb-4">
          <img
            src="/assets/img/logo.png"
            alt="Logo"
            className="mb-3"
            width="80"
          />
          <h3 className="fw-bold">Client Portal</h3>
          <p className="text-muted">Secure access for legal professionals</p>
        </div>

        {alert.message && (
          <div
            className={`alert alert-${alert.type}`}
            role="alert"
            dangerouslySetInnerHTML={{ __html: alert.message }}
          />
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Email Field */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+\-]+@[a-zA-Z0-9.\-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
              placeholder="e.g. johndoe@gmail.com"
            />
            {errors.email && (
              <small className="text-danger d-block mt-2">
                {errors.email.message}
              </small>
            )}
          </div>

          {/* Submit Button */}
          <SubmitBtn loading={isLoading} countdown={countdown} />
        </form>

        {/* Back to Login */}
        <div className="text-center mt-3">
          back to login{" "}
          <Link href="/signin" className="text-decoration-underline">
            here
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubmitBtn({ loading, countdown }) {
  return (
    <button
      type="submit"
      className="btn btn-primary w-100 py-2"
      disabled={loading || countdown > 0}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm" />
      ) : countdown > 0 ? (
        `Resend in ${countdown}s`
      ) : (
        "Reset"
      )}
    </button>
  );
}
