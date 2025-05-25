"use client";

import Base from "@/layout/base";
import useAuthFetch from "@/hooks/useAuthFetch";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState, useMemo } from "react";
import { withLoader } from "@/utils";

/* -------------------------------------------------------------------------- */
/*  CONSTANTS                                                                 */
/* -------------------------------------------------------------------------- */

const dayOfWeekMap = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];
const todayStr     = new Date().toISOString().split("T")[0];

/* -------------------------------------------------------------------------- */
/*  COMPONENT                                                                 */
/* -------------------------------------------------------------------------- */

export default function AppointmentForm() {
  /* -------------------------- hooks / state -------------------------- */

  const api    = useAuthFetch();
  const router = useRouter();

  // Next 13 App-Router params
  const { id } = useParams();               // dynamic segment: /firms/[id]/…

  // app state
  const [availability, setAvailability] = useState({});   // { sun: ["13:00", …], … }
  const [isLoading, setIsLoading]       = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // react-hook-form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm();

  const watchDate      = watch("date");
  const selectedDayKey = useMemo(() => (selectedDate ? dayOfWeekMap[new Date(selectedDate).getDay()] : ""),[selectedDate]);

  /* ---------------------- availability helpers ----------------------- */

  const rawTimes = useMemo(() => availability[selectedDayKey] ?? [],[availability, selectedDayKey]);

  useEffect(()=>{
    console.log('rawTimes', rawTimes);
    console.log('selected date', selectedDate);
    
  })

  // is the picked date today?
  const isToday = useMemo(() => {
    if (!selectedDate) return false;
    const now    = new Date();
    const picked = new Date(selectedDate);
    return picked.toDateString() === now.toDateString();
  }, [selectedDate]);

  // hide past slots if date === today
  const filteredTimes = useMemo(() => {
    if (!selectedDate) return [];
    if (!isToday) return rawTimes;

    const now = new Date();

    return rawTimes.filter((t) => {
      const [h, m] = t.split(":");
      const slot   = new Date(selectedDate);
      slot.setHours(+h, +m, 0, 0);
      return slot.getTime() > now.getTime(); // keep only future slots
    });
  }, [rawTimes, isToday, selectedDate]);

  /* ------------------------- side effects ---------------------------- */

  // fetch weekly availability once
  useEffect(() => {
    const fetchAvailability = async () => {
      try {
        const res = await api.get(`firm/${id}/availability`);
        setAvailability(res.data.data ?? {});
      } catch {
        toast.error("Failed to fetch availability");
      }
    };

    fetchAvailability();
  }, [api, id]);

  // reset time when user changes the date
  useEffect(() => {
    setSelectedDate(watchDate || "");
    setValue("time", "");
  }, [watchDate, setValue]);

  /* --------------------------- handlers ------------------------------ */

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("date_time", `${data.date} ${data.time}`);
      formData.append("firm_id", id);
      formData.append("details", data.details);
      formData.append("country", data.country);

      if (data.attachment?.length) {
        Array.from(data.attachment).forEach((file) =>
          formData.append("attachment[]", file)
        );
      }

      await withLoader(
        () =>
          api.post("/appointment/firm", formData, {
            headers: { "Content-Type": "multipart/form-data" },
          }),
        setIsLoading
      );

      reset();
      router.replace("/success");
    } catch {
      toast.error("Failed to book appointment");
    }
  };

  /* ------------------------- render helpers -------------------------- */

  const renderTimeOptions = () =>
    filteredTimes.map((time) => {
      const [hour, minute] = time.split(":");
      const date           = new Date();
      date.setHours(+hour, +minute);

      return (
        <option key={time} value={time}>
          {date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", hour12: true })}
        </option>
      );
    });

  /* ------------------------------------------------------------------ */
  /*  JSX                                                               */
  /* ------------------------------------------------------------------ */

  return (
    <Base>
      <div className="container my-5">
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h4 className="mb-3">Book an Appointment</h4>

          {/* DATE ----------------------------------------------------- */}
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
            {errors.date && (
              <div className="invalid-feedback">{errors.date.message}</div>
            )}
          </div>

          {/* TIME ----------------------------------------------------- */}
          <div className="mb-3">
            <label htmlFor="time" className="form-label">
              Appointment Time <span className="text-danger">*</span>
            </label>
            <select
              id="time"
              className={`form-select ${errors.time ? "is-invalid" : ""}`}
              {...register("time", { required: "Please select a time slot" })}
              disabled={!selectedDate || filteredTimes.length === 0}
            >
              <option value="">Select a time slot</option>
              {renderTimeOptions()}
            </select>
            {selectedDate && filteredTimes.length === 0 && (
              <div className="text-warning mt-1">
                No remaining slots for the selected date
              </div>
            )}
            {errors.time && (
              <div className="invalid-feedback">{errors.time.message}</div>
            )}
          </div>

          {/* DETAILS -------------------------------------------------- */}
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

          {/* COUNTRY -------------------------------------------------- */}
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

          {/* ATTACHMENT ---------------------------------------------- */}
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

          {/* SUBMIT --------------------------------------------------- */}
          <button className="btn btn-primary" type="submit" disabled={isLoading}>
            {isLoading ? (
              <>
                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>{" "}
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
