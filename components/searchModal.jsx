"use client";

import React, { Fragment, useEffect, useState } from "react";
import {
  Dialog,
  DialogPanel,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { BsSearch } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiCrosshairFill } from "react-icons/pi";
import "./searchModal.css"; // keep your existing styles
import ClearableTime from "./clearableTime";

export default function SearchModal({
  searchPlaceholder,
  isOpen,
  onClose,
  onSearch,
  initialFilters = {},
}) {
  // guaranteed blank state so inputs are always controlled
  const blankFilters = {
    name: "",
    experience: "",
    specialization: "",
    city: "",
    min_price: "",
    max_price: "",
    start_time: "",
    end_time: "",
    location: "",
  };

  const [filters, setFilter] = useState({ ...blankFilters, ...initialFilters });

  /* reset fields whenever modal closes */
  useEffect(() => {
    if (!isOpen) setFilter({ ...blankFilters, ...initialFilters });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  /* -------- helpers -------- */

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert("Geolocation is not supported by your browser.");
      return;
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords }) =>
        setFilter((prev) => ({
          ...prev,
          location: `${coords.latitude},${coords.longitude}`,
        })),
      () => alert("Could not detect your location.")
    );
  };

  const handleSearch = () => {
    const { start_time, end_time } = filters;

    if ((start_time && !end_time) || (!start_time && end_time)) {
      alert("Please provide both a start and end time.");
      return;
    }
    if (start_time && end_time && start_time > end_time) {
      alert("Invalid date range");
      return;
    }

    onSearch(filters);
  };

  /* -------- render -------- */

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog onClose={onClose} className="search-modal">
        {/* modal body */}
        <TransitionChild
          as={Fragment}
          enter="modal-fade-slide"
          enterFrom="modal-fade-slide-from"
          enterTo="modal-fade-slide-to"
        >
          <DialogPanel as="div" className="modal-body">
            {/* ------- SEARCH BAR ------- */}
            <div className="search-bar">
              {/* name / keyword */}
              <div className="search">
                <div className="icon">
                  <BsSearch />
                </div>
                <input
                  type="search"
                  placeholder={searchPlaceholder ?? "search…"}
                  value={filters.name}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, name: e.target.value }))
                  }
                />
              </div>

              {/* minimum experience */}
              <div className="experience">
                <input
                  type="number"
                  min="0"
                  placeholder="Minimum experience"
                  value={filters.experience}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, experience: e.target.value }))
                  }
                />
              </div>

              {/* specialization */}
              <div className="specialization">
                <input
                  type="text"
                  placeholder="Specialization"
                  value={filters.specialization}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, specialization: e.target.value }))
                  }
                />
              </div>

              {/* city selector + detect button */}
              <div className="location">
                <div className="icon">
                  <FaMapMarkerAlt />
                </div>
                <select
                  value={filters.city}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, city: e.target.value }))
                  }
                >
                  <option value="">select city</option>
                  <option value="karachi">Karachi</option>
                  <option value="lahore">Lahore</option>
                  <option value="islamabad">Islamabad</option>
                </select>

                <button type="button" onClick={handleDetectLocation}>
                  <PiCrosshairFill /> Detect
                </button>
              </div>

              {/* price range */}
              <div className="price-range">
                <input
                  type="number"
                  min="1"
                  placeholder="Min price"
                  value={filters.min_price}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, min_price: e.target.value }))
                  }
                />
                <input
                  type="number"
                  min="1"
                  placeholder="Max price"
                  value={filters.max_price}
                  onChange={(e) =>
                    setFilter((p) => ({ ...p, max_price: e.target.value }))
                  }
                />
              </div>

              {/* availability window */}
              <h6 className="mt-3 fw-bold">Availability</h6>
              <div className="availability">
                <div style={{ flex: 1 }}>
                  <label>From</label>
                  <ClearableTime
                    value={filters.start_time}
                    onChange={(e) =>
                      setFilter((p) => ({ ...p, start_time: e.target.value }))
                    }
                  />
                </div>
                <div style={{ flex: 1 }}>
                  <label>To</label>
                  <ClearableTime
                    value={filters.end_time}
                    onChange={(e) =>
                      setFilter((p) => ({ ...p, end_time: e.target.value }))
                    }
                  />
                </div>
              </div>
            </div>

            {/* submit */}
            <button
              type="button"
              onClick={handleSearch}
              className="search-submit-btn btn btn-primary"
            >
              search
            </button>
          </DialogPanel>
        </TransitionChild>
      </Dialog>
    </Transition>
  );
}
