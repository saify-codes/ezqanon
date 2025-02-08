"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState } from "react";
import { getFlashMessage, withLoader } from "@/utils";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUp() {
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState();
  const auth = useAuth();
  const router = useRouter();
  const message = getFlashMessage('auth')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const {email, password, remember} = data
      await withLoader(()=>auth.signin(email, password, remember), setIsLoading)
      router.push('/');
      
    } catch (error) {
      console.log(error);
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

        {message && (
          <div className="alert alert-success" role="alert">
            {message}
          </div>
        )}

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
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
              <Link href="/">forgot password?</Link>
            </div>
          </div>

          {/* Submit Button */}
          <SubmitBtn loading={isLoading} />
        </form>

        {/* Sign In Link */}
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
        <span
          className="spinner-border spinner-border-sm"
        ></span>
      ) : (
        "Sign in"
      )}
    </button>
  );
}
