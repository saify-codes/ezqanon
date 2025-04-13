"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { getFlashMessage, withLoader } from "@/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const FORM_VALIDATION = {
  email: {
    required: "Email is required",
    pattern: {
      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
      message: "Enter a valid email"
    }
  },
  password: {
    required: "Password is required",
    minLength: { value: 6, message: "Password must be at least 6 characters" }
  }
};

export default function SignIn() {
  const [state, setState] = useState({
    alert: { type: "", message: "" },
    isLoading: false,
    isResendingVerification: false,
    showResendVerification: false,
    unverifiedEmail: "",
    countdown: 0
  });

  const auth = useAuth();
  const router = useRouter();
  const redirectURL = useSearchParams().get("redirect");
  const successMessage = getFlashMessage("success");
  const errorMessage = getFlashMessage("error");

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async ({ email, password, remember }) => {
    try {
      await withLoader(
        () => auth.signin(email, password, remember),
        isLoading => setState(prev => ({ ...prev, isLoading }))
      );
      router.replace(redirectURL || "/");
    } catch (error) {
      const isUnverified = error.response?.status === 401;
      setState(prev => ({
        ...prev,
        unverifiedEmail: isUnverified ? email : "",
        showResendVerification: isUnverified,
        alert: {
          type: "danger",
          message: error.response?.data.message || "Something went wrong"
        }
      }));
    }
  };

  const handleVerificationResend = async () => {
    if (state.countdown > 0) return;

    try {
      await withLoader(
        () => auth.sendVerificationLink(state.unverifiedEmail),
        isResendingVerification => setState(prev => ({ ...prev, isResendingVerification }))
      );

      setState(prev => ({ ...prev, countdown: 30 }));
      
      const timer = setInterval(() => {
        setState(prev => ({
          ...prev,
          countdown: prev.countdown <= 1 ? (clearInterval(timer), 0) : prev.countdown - 1
        }));
      }, 1000);

      setState(prev => ({
        ...prev,
        alert: { type: "success", message: "Verification link sent" }
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        alert: { type: "danger", message: "Error sending verification link" }
      }));
    }
  };

  const renderFormField = (name, type = "text") => (
    <div className="mb-3">
      <label className="form-label">{name.charAt(0).toUpperCase() + name.slice(1)}</label>
      <input
        type={type}
        className="form-control"
        placeholder={`enter your ${name}`}
        {...register(name, FORM_VALIDATION[name])}
      />
      {errors[name] && (
        <small className="text-danger d-block mt-2">{errors[name].message}</small>
      )}
    </div>
  );

  const renderAlert = (type, message) => message && (
    <div 
      className={`alert alert-${type}`} 
      role="alert"
      dangerouslySetInnerHTML={{ __html: message }} 
    />
  );

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="login-card col-12 col-md-6 col-lg-4">
        <header className="text-center mb-4">
          <img src="/assets/img/logo.png" alt="Logo" className="mb-3" width="80" />
          <h3 className="fw-bold">Client Portal</h3>
          <p className="text-muted">Secure access for legal professionals</p>
        </header>

        {renderAlert("danger", errorMessage)}
        {renderAlert("success", successMessage)}
        {renderAlert(state.alert.type, state.alert.message)}

        <form onSubmit={handleSubmit(onSubmit)}>
          {renderFormField("email", "email")}

          {state.showResendVerification && (
            <div className="text-end">
              {state.countdown > 0 ? (
                <span className="text-muted">
                  Resend Verification Email in {state.countdown}s
                </span>
              ) : (
                <button
                  className="btn p-0"
                  onClick={handleVerificationResend}
                  disabled={state.isResendingVerification}
                  style={{ color: "var(--primary)" }}
                >
                  {state.isResendingVerification ? "Sending..." : "Resend Verification Email"}
                </button>
              )}
            </div>
          )}

          {renderFormField("password", "password")}

          <div className="mb-3 d-flex justify-content-between">
            <div>
              <input
                className="form-check-input"
                type="checkbox"
                {...register("remember")}
              /> remember
            </div>
            <Link href="/forgot">forgot password?</Link>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 py-2"
            disabled={state.isLoading}
          >
            {state.isLoading ? (
              <span className="spinner-border spinner-border-sm" />
            ) : "Sign in"}
          </button>
        </form>

        <footer className="text-center mt-3">
          <div>
            don't have an account? register{" "}
            <Link href="/signup" className="text-decoration-underline">here</Link>
          </div>
          <Link className="nav-link mt-3" href="/">
            <FaArrowLeftLong /> Back to home
          </Link>
        </footer>
      </div>
    </div>
  );
}
