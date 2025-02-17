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

  // State to hold file previews and any file upload error message
  const [filePreviews, setFilePreviews] = useState([]);
  const [fileError, setFileError] = useState("");

  // Initialize React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // Handle file selection and validations
  const handleFileChange = (e) => {
    setFileError(""); // Clear any previous errors
    const selectedFiles = Array.from(e.target.files);

    // Check if total files will exceed 10
    if (filePreviews.length + selectedFiles.length > 10) {
      setFileError("You can only upload up to 10 files.");
      return;
    }

    const validTypes = ["image/jpeg", "image/png", "image/webp", "application/pdf"];
    const maxFileSize = 5 * 1024 * 1024; // 5 MB in bytes

    const newPreviews = [];

    for (const file of selectedFiles) {
      // Validate file type
      if (!validTypes.includes(file.type)) {
        setFileError(`Unsupported file type: ${file.name}`);
        continue;
      }

      // Validate file size (<= 5 MB)
      if (file.size > maxFileSize) {
        setFileError(`File too large (max 5MB): ${file.name}`);
        continue;
      }

      // Create a local preview URL for images/PDF
      const previewURL = URL.createObjectURL(file);

      newPreviews.push({
        file,
        previewURL,
      });
    }

    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  // Remove a single file preview
  const removeFile = (index) => {
    const updatedPreviews = [...filePreviews];
    // Revoke the Object URL to avoid memory leaks
    URL.revokeObjectURL(updatedPreviews[index].previewURL);
    updatedPreviews.splice(index, 1);
    setFilePreviews(updatedPreviews);
  };

  // Handle form submission
  const onSubmit = async (data) => {
    try {
      // Construct FormData to send with the request
      const formData = new FormData();
      formData.append("lawyer_id", id);
      formData.append("meeting_date", data.meeting_date);
      formData.append("details", data.details);

      filePreviews.forEach((fileObj) => {
        formData.append("attachment", fileObj.file);
      });

      await withLoader(
        () =>
          api.post("/appointment", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }),
        setIsLoading
      );

      // Reset form and clear file previews on success
      reset();
      setFilePreviews([]);
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
            <label htmlFor="meeting_date" className="form-label">
              Choose Date &amp; Time <span className="text-danger">*</span>
            </label>
            <input
              type="datetime-local"
              className={`form-control ${errors.meeting_date ? "is-invalid" : ""}`}
              id="meeting_date"
              {...register("meeting_date", { required: true })}
            />
            {errors.meeting_date && (
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
              onChange={handleFileChange}
            />
            {fileError && (
              <div className="text-danger mt-1" style={{ whiteSpace: "pre-wrap" }}>
                {fileError}
              </div>
            )}
            <div className="form-text">
              You can attach any supporting documents or images (max 10 files, 5MB each).
            </div>
          </div>

          {/* Preview of uploaded files */}
          {filePreviews.length > 0 && (
            <div className="mb-3">
              <h5>Selected Files</h5>
              <ul className="list-group">
                {filePreviews.map((fileObj, index) => {
                  const isImage = fileObj.file.type.startsWith("image/");
                  const isPDF = fileObj.file.type === "application/pdf";

                  return (
                    <li key={index} className="list-group-item d-flex align-items-center justify-content-between">
                      <div className="d-flex align-items-center">
                        {/* Preview thumbnail or PDF link */}
                        {isImage && (
                          <img
                            src={fileObj.previewURL}
                            alt={fileObj.file.name}
                            style={{ width: 50, height: 50, objectFit: "cover", marginRight: 10 }}
                          />
                        )}
                        {isPDF && (
                          <a
                            href={fileObj.previewURL}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ marginRight: 10 }}
                          >
                            Preview PDF
                          </a>
                        )}
                        <span>{fileObj.file.name}</span>
                      </div>
                      <button
                        type="button"
                        className="btn btn-sm btn-danger"
                        onClick={() => removeFile(index)}
                      >
                        Remove
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}

          <button className="btn btn-primary mt-3" disabled={isLoading}>
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