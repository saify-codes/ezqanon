"use client";
import { useEffect, useLayoutEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SuccessPage() {
  const router = useRouter();

//   useLayoutEffect(() => {
//     // Check if user came from booking
//     const appointmentSuccess = sessionStorage.getItem("appointment_success");

//     if (appointmentSuccess) {
//       // Clear the flag after successful visit
//       sessionStorage.removeItem("appointment_success");
//     } else {
//       // If accessed directly, redirect to home or booking page
//       router.replace("/"); // Redirect to booking or home
//     }
//   }, [router]);

  return (
    <div className="d-flex flex-column align-items-center justify-content-center vh-100">
        <h2 className="text-success">Appointment Booked Successfully!</h2>
        <p className="lead mt-3">Thank you for booking your appointment. You will receive a confirmation soon.</p>
        <Link href="/" className="btn btn-primary mt-4">Back to Home</Link>
    </div>
  );
}
