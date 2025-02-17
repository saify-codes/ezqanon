"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { getFlashMessage, withLoader } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [isResendingVerification, setIsResendingVerification] = useState(false);
  const [showResendVerification, setShowResendVerification] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState("");
  const [countdown, setCountdown] = useState(0);

  const auth = useAuth();
  const router = useRouter();
  const successMessage = getFlashMessage("success");
  const errorMessage = getFlashMessage("error");
  const redirectURL = useSearchParams().get("redirect");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const { email, password, remember } = data;

    try {
      await withLoader(
        () => auth.signin(email, password, remember),
        setIsLoading
      );

      router.replace(redirectURL ? redirectURL : "/");
    } catch (error) {
      console.log(error);

      // If user is unverified (401), show the resend verification option
      if (error.response?.status === 401) {
        setUnverifiedEmail(email);
        setShowResendVerification(true);
      } else {
        setShowResendVerification(false);
      }

      setAlert({
        type: "danger",
        message: error.response?.data.message || "Something went wrong",
      });
    }
  };

  const sendVerificationLinkToEmail = async () => {
    // If countdown is already running, do nothing
    if (countdown > 0) return;

    try {
      await withLoader(
        () => auth.sendVerificationLink(unverifiedEmail),
        setIsResendingVerification
      );

      setCountdown(30);
      const intervalId = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      setAlert({
        type: "success",
        message: "Verification link sent",
      });
    } catch (error) {
      console.log(error);
      setAlert({
        type: "danger",
        message: "Error sending verification link",
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

        {errorMessage && (
          <div
            className="alert alert-danger"
            role="alert"
            dangerouslySetInnerHTML={{ __html: errorMessage }}
          />
        )}

        {successMessage && (
          <div
            className="alert alert-success"
            role="alert"
            dangerouslySetInnerHTML={{ __html: successMessage }}
          />
        )}

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
              placeholder="enter your email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && (
              <small className="text-danger d-block mt-2">
                {errors.email.message}
              </small>
            )}
          </div>

          {/* Show resend verification link or countdown message */}
          {showResendVerification && (
            <div className="text-end">
              {countdown > 0 ? (
                <span className="text-muted">
                  Resend Verification Email in {countdown}s
                </span>
              ) : (
                <button
                  className="btn p-0"
                  onClick={sendVerificationLinkToEmail}
                  disabled={isResendingVerification}
                  style={{ color: "var(--primary)" }}
                >
                  {isResendingVerification
                    ? "Sending..."
                    : "Resend Verification Email"}
                </button>
              )}
            </div>
          )}

          {/* Password Field */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="enter your password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
            />
            {errors.password && (
              <small className="text-danger d-block mt-2">
                {errors.password.message}
              </small>
            )}
          </div>

          <div className="mb-3 d-flex justify-content-between">
            <div className="text-end">
              <input
                className="form-check-input"
                type="checkbox"
                {...register("remember", { required: false })}
              />{" "}
              remember
            </div>

            <div className="text-end">
              <Link href="/forgot">forgot password?</Link>
            </div>
          </div>

          {/* Submit Button */}
          <SubmitBtn loading={isLoading} />
        </form>

        {/* Sign Up Link */}
        <div className="text-center mt-3">
          don't have an account? register{" "}
          <Link href="/signup" className="text-decoration-underline">
            here
          </Link>
        </div>
      </div>
    </div>
  );
}

function SubmitBtn({ loading = false }) {
  return (
    <button
      type="submit"
      className="btn btn-primary w-100 py-2"
      disabled={loading}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
