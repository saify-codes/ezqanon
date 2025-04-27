"use client";

import React, { useEffect, useState } from "react";
import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";
import { BsSearch, BsX } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiCrosshairFill } from "react-icons/pi";
import "./searchModal.css";

export default function SearchModal({
  isOpen,
  onClose,
  onSearch,
  initialFilters = {},
}) {
  const [filters, setFilter] = useState(initialFilters);

  // geolocation detection
  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      return alert("Geolocation is not supported by your browser.");
    }
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setFilter((prev) => ({
          ...prev,
          location: `${latitude},${longitude}`,
        }));
      },
      (err) => {
        console.error(err);
        alert("Could not detect your location.");
      }
    );
  };

  const handleSearch = () => {
    const { start_time, end_time } = filters;
    // if one time is set, the other must be set
    if ((start_time && !end_time) || (!start_time && end_time)) {
      alert("Please provide both a start and end time.");
      return;
    }

    if (start_time > end_time) {
      alert("Invalid date range");
      return;
    }

    onSearch(
      Object.fromEntries(
        Object.entries(filters).filter(([, v]) => v != null && v !== "")
      )
    );
  };

  return (
    <Dialog open={isOpen} onClose={onClose} as="div" className="search-modal">
      <DialogPanel as="div" className="modal-body">
        <div className="search-bar">
          <div className="search">
            <div className="icon">
              <BsSearch />
            </div>
            <input
              type="search"
              placeholder="search lawyers"
              value={filters.name}
              onChange={({ target }) =>
                setFilter((prev) => ({ ...prev, name: target.value }))
              }
            />
          </div>

          <div className="experience">
            <input
              type="number"
              min="0"
              placeholder="Minimum experience"
              value={filters.experience}
              onChange={({ target }) =>
                setFilter((prev) => ({
                  ...prev,
                  experience: target.value,
                }))
              }
            />
          </div>

          <div className="specialization">
            <input
              type="text"
              placeholder="Specialization"
              value={filters.specialization}
              onChange={({ target }) =>
                setFilter((prev) => ({
                  ...prev,
                  specialization: target.value,
                }))
              }
            />
          </div>

          <div className="location">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <select
              value={filters.city}
              onChange={({ target }) =>
                setFilter((prev) => ({ ...prev, city: target.value }))
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

          <div className="price-range">
            <input
              type="number"
              min="1"
              placeholder="Min price"
              value={filters.min_price}
              onChange={({ target }) =>
                setFilter((prev) => ({
                  ...prev,
                  min_price: target.value,
                }))
              }
            />
            <input
              type="number"
              min="1"
              placeholder="Max price"
              value={filters.max_price}
              onChange={({ target }) =>
                setFilter((prev) => ({
                  ...prev,
                  max_price: target.value,
                }))
              }
            />
          </div>

          <h6 className="mt-3 fw-bold">Availability</h6>
          <div className="availability">
            <div style={{ flex: 1 }}>
              <label>From</label>
              <input
                type="time"
                value={filters.start_time}
                onChange={({ target }) =>
                  setFilter((prev) => ({
                    ...prev,
                    start_time: target.value,
                  }))
                }
              />
            </div>
            <div style={{ flex: 1 }}>
              <label>To</label>
              <input
                type="time"
                value={filters.end_time}
                onChange={({ target }) =>
                  setFilter((prev) => ({
                    ...prev,
                    end_time: target.value,
                  }))
                }
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={handleSearch}
          className="search-submit-btn btn btn-primary"
        >
          search
        </button>
      </DialogPanel>
    </Dialog>
  );
}
