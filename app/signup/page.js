"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { flashMessage, withLoader } from "@/utils";

export default function SignUp() {
  const [error, setError] = useState();
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
      flashMessage('auth', 'Account created')
      router.push("/signin");
    } catch (error) {
      setError(error.response?.data.message || "something went wrong");
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
        
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name Field */}
          <div className="mb-3">
            <label className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              {...register("name", { required: "Name is required" })}
              placeholder="e.g. john Doe"
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
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
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

          {/* Phone Number Field */}
          <div className="mb-3">
            <label className="form-label">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              {...register("phone", {
                required: "Phone number is required",
                pattern: {
                  value: /^\+?\d{10,15}$/,
                  message: "Enter a valid phone number",
                },
              })}
              placeholder="e.g. 03123456789"
              value="03122030440"
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
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              value="password"
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
              {...register("password_confirmation", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === watch("password") || "Passwords do not match",
              })}
              value="password"
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
