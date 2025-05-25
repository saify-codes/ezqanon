"use client";

import { useState, useEffect } from "react";
import Base from "@/layout/base";

const CITY_OPTIONS = ["Karachi", "Lahore", "Islamabad", "Quetta"];

export default function LegalGpt() {
  // ---------- state ----------
  const [showModal, setShowModal] = useState(false);
  const [city, setCity] = useState("");

  // ---------- open modal on first render ----------
  useEffect(() => {
    setShowModal(true);
  }, []);

  // ---------- handler ----------
  const handleSave = () => {
    // TODO: persist city (context, Zustand, Redux, localStorage, etc.)
    console.log("Chosen city:", city);
    setShowModal(false);
  };

  return (
    <Base>
      <section className="legal-gpt section">
        <div className="container">hi there</div>

        {/* -------- modal -------- */}
        {showModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="w-full max-w-md rounded bg-white p-6 shadow-lg">
              <h2 className="mb-4 text-xl font-semibold">Select your city</h2>

              <select
                className="w-full rounded border p-2"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              >
                <option value="" disabled>
                  -- choose --
                </option>
                {CITY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>

              <div className="mt-6 flex justify-end gap-2">
                <button
                  className="rounded bg-gray-200 px-4 py-1"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>
                <button
                  className="rounded bg-blue-600 px-4 py-1 text-white disabled:opacity-50"
                  disabled={!city}
                  onClick={handleSave}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </section>
    </Base>
  );
}
