"use client";

import Link from "next/link";
import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { flashMessage, withLoader } from "@/utils";

export default function SignUp() {
  const [alert, setAlert] = useState({ type: "", message: "" });
  const [isLoading, setIsLoading] = useState();

  const auth = useAuth();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      await withLoader(() => auth.signup(data), setIsLoading);
      flashMessage("success", `We have sent a verification link to your email <u>${data.email}</u>`);
      router.push("/signin");
    } catch (error) {
      setAlert({
        type: "danger",
        message: error.response?.data.message || "Something went wrong",
      });
    }
  };

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
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="enter your full name"
              {...register("name", { required: "Name is required" })}
            />
            {errors.name && (
              <small className="text-danger d-block mt-2">
                {errors.name.message}
              </small>
            )}
          </div>

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

          {/* Phone Number Field */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              placeholder="enter your phone"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
            />
            {errors.phone && (
              <small className="text-danger d-block mt-2">
                {errors.phone.message}
              </small>
            )}
          </div>

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

          {/* Confirm Password Field */}
          <div className="mb-4">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="confirm password"
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
            />
            {errors.password_confirmation && (
              <small className="text-danger d-block mt-2">
                {errors.password_confirmation.message}
              </small>
            )}
          </div>

          <SubmitBtn loading={isLoading} />
        </form>

        {/* Sign In Link */}
        <div className="text-center mt-3">
          Already have an account? Login{" "}
          <Link href="/signin" className="text-decoration-underline">
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
        "Create account"
      )}
    </button>
  );
}
