"use client";

import Base from "@/layout/base";
import useAuthFetch from "@/hooks/useAuthFetch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { withLoader } from "@/utils";

const dayOfWeekMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const todayStr     = new Date().toISOString().split("T")[0];

export default function AppointmentForm() {
  const api                                                                = useAuthFetch();
  const router                                                             = useRouter();
  const { id }                                                             = useParams();
  const [availability, setAvailability]                                    = useState(null);
  const [isLoading, setIsLoading]                                          = useState(false);
  const [selectedDate, setSelectedDate]                                    = useState("");
  const {register,handleSubmit,formState: { errors },reset,watch,setValue} = useForm();
  const watchDate                                                          = watch("date");
  const selectedDayCode                                                    = useMemo(() => selectedDate ? dayOfWeekMap[new Date(selectedDate).getDay()] : null, [selectedDate]);
  const availableTimes                                                     = useMemo(() => availability?.[selectedDayCode] ?? [], [availability, selectedDayCode]);
  
  const fetchAvailability = async () => {
    try {
      const res = await api.get(`lawyer/${id}/availability`);
      setAvailability(res.data.data);
    } catch {
      toast.error("Failed to fetch availability");
    }
  }

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      formData.append("date_time", `${data.date} ${data.time}`);
      formData.append("lawyer_id", id);
      formData.append("details", data.details);
      formData.append("country", data.country);

      if (data.attachment?.length) {
        Array.from(data.attachment).forEach((file) =>
          formData.append("attachment[]", file)
        );
      }

      await withLoader(() => api.post("/appointment", formData), setIsLoading);

      reset();
      router.replace("/success");
    } catch {
      toast.error("Failed to book appointment");
    }
  };

  const renderTimeOptions = () => {
    if (availableTimes.length === 0) return null

    return availableTimes.map((time) => {
      const [hour, minute] = time.split(":");
      const date           = new Date();

      date.setHours(+hour, +minute);
      
      const formattedTime = date.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });

      return (
        <option key={time} value={time}>
          {formattedTime}
        </option>
      );
    });
  };

  useEffect(() => {
    setSelectedDate(watchDate || "");
    setValue("time", "");
  }, [watchDate]);

  useEffect(() => {
    fetchAvailability();
  }, []);


  return (
    <Base>
      <div className="container my-5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h4 className="mb-3">Book an Appointment</h4>

          <div className="mb-3">
            <label htmlFor="date" className="form-label">
              Appointment Date <span className="text-danger">*</span>
            </label>
            <input
              id="date"
              type="date"
              min={todayStr}
              className={`form-control ${errors.date ? "is-invalid" : ""}`}
              {...register("date", { required: "Please select a date" })}
            />
            {errors.date && (<div className="invalid-feedback">{errors.date.message}</div>)}
          </div>

          <div className="mb-3">
            <label htmlFor="time" className="form-label">Appointment Time <span className="text-danger">*</span>
            </label>
            <select
              id="time"
              className={`form-select ${errors.time ? "is-invalid" : ""}`}
              {...register("time", { required: "Please select a time slot" })}
              disabled={!selectedDate || availableTimes.length === 0}
            >
              <option value="">Select a time slot</option>
              {renderTimeOptions()}
            </select>
            {selectedDate && availableTimes.length === 0 && (<div className="text-warning mt-1">No time slots available for this date</div>)}
            {errors.time && (<div className="invalid-feedback">{errors.time.message}</div>)}
          </div>

          <div className="mb-3">
            <label htmlFor="details" className="form-label">
              Details <span className="text-danger">*</span>
            </label>
            <textarea
              id="details"
              rows={3}
              placeholder="Enter appointment details..."
              className={`form-control ${errors.details ? "is-invalid" : ""}`}
              {...register("details", { required: "Please provide some details" })}
            />
            {errors.details && (
              <div className="invalid-feedback">{errors.details.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="country" className="form-label">
              Country <span className="text-danger">*</span>
            </label>
            <input
              id="country"
              placeholder="Enter country"
              className={`form-control ${errors.country ? "is-invalid" : ""}`}
              {...register("country", { required: "Please provide country name" })}
            />
            {errors.country && (
              <div className="invalid-feedback">{errors.country.message}</div>
            )}
          </div>

          <div className="mb-3">
            <label htmlFor="attachment" className="form-label">
              Upload Files (Optional)
            </label>
            <input
              id="attachment"
              type="file"
              multiple
              accept="image/jpg,image/png,image/webp,application/pdf"
              className="form-control"
              {...register("attachment")}
            />
            <div className="form-text">
              You can attach any supporting documents or images.
            </div>
          </div>

          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm"
                  role="status"
                  aria-hidden="true"
                ></span>{" "}
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
