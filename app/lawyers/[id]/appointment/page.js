"use client";

import Base from "@/layout/base";
import useAuthFetch from "@/hooks/useAuthFetch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams } from "next/navigation";
import { useState } from "react";
import { withLoader } from "@/utils";
import { useRouter } from "next/navigation";

export default function AppointmentForm() {
  const api = useAuthFetch();
  const router = useRouter();
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState(false);

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      await withLoader(
        () =>
          api.post(
            "/appointment",
            { ...data, lawyer_id: id },
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          ),
        setIsLoading
      );

      reset();
      router.replace("/success");
    } catch (error) {
      console.error(error);
      toast.error("Failed to book appointment");
    }
  };

  return (
    <Base>
      <div className="container my-5">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h4 className="mb-3">Book an Appointment</h4>

          {/* Date/Time Field */}
          <div className="mb-3">
            <label htmlFor="dateTime" className="form-label">
              Choose Date &amp; Time <span className="text-danger">*</span>
            </label>
            <input
              type="datetime-local"
              className={`form-control ${errors.dateTime ? "is-invalid" : ""}`}
              id="dateTime"
              {...register("meeting_date", { required: true })}
            />
            {errors.dateTime && (
              <div className="invalid-feedback">
                Please select a valid date and time.
              </div>
            )}
          </div>

          {/* Details Field */}
          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details <span className="text-danger">*</span>
            </label>
            <textarea
              className={`form-control ${errors.details ? "is-invalid" : ""}`}
              id="details"
              rows="3"
              placeholder="Enter appointment details..."
              {...register("details", { required: true })}
            ></textarea>
            {errors.details && (
              <div className="invalid-feedback">
                Please provide some details.
              </div>
            )}
          </div>

          {/* File Field (Optional) */}
          <div className="mb-3">
            <label htmlFor="files" className="form-label">
              Upload Files (Optional)
            </label>
            <input
              type="file"
              className="form-control"
              id="files"
              multiple
              accept="image/jpg, image/png, image/webp, application/pdf"
              {...register("attachment")}
            />
            <div className="form-text">
              You can attach any supporting documents or images.
            </div>
          </div>
          <button className="btn btn-primary" disabled={isLoading}>
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>
                Booking...
              </>
            ) : (
              "Book Appointment"
            )}
          </button>
        </form>
      </div>
    </Base>
  );
}
