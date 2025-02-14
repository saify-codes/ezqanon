"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/hooks/useAuth";
import { useState, useEffect } from "react";
import { withLoader } from "@/utils";
import Link from "next/link";

export default function Forgot() {
  const [error, setError] = useState();
  const [success, setSuccess] = useState();
  const [isLoading, setIsLoading] = useState();
  const [countdown, setCountdown] = useState(0);
  const auth = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  // Effect to start countdown when email is successfully sent
  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }

    // Cleanup the interval on component unmount or when countdown reaches 0
    if (countdown === 0) {
      clearInterval(timer);
    }

    return () => clearInterval(timer);
  }, [countdown]);

  const onSubmit = async (data) => {
    try {
      const response = await withLoader(
        () => auth.forgot(data.email),
        setIsLoading
      );
      setSuccess(response);
      setCountdown(30);
    } catch (error) {
      const { response } = error;
      setError(response.data.message || "Something went wrong");
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

        {success && (
          <div
            className="alert alert-success"
            role="alert"
            dangerouslySetInnerHTML={{ __html: success }}
          ></div>
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

          {/* Submit Button */}
          <SubmitBtn loading={isLoading} countdown={countdown} />
        </form>
        {/* Sign In Link */}
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

function SubmitBtn({ loading = false, countdown = 0 }) {
  return (
    <button
      type="submit"
      className="btn btn-primary w-100 py-2"
      disabled={loading || countdown > 0}
    >
      {loading ? (
        <span className="spinner-border spinner-border-sm"></span>
      ) : countdown > 0 ? (
        `Resend in ${countdown}s` // Display countdown time
      ) : (
        "Reset"
      )}
    </button>
  );
}