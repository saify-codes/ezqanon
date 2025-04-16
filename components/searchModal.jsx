"use client";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
} from "@headlessui/react";
import { Fragment } from "react";
import { BsSearch, BsX } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import { PiCrosshairFill } from "react-icons/pi";
import "./searchModal.css";

export default function ({ isOpen, onClose }) {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      transition
      as="div"
      className="search-modal"
    >
      <DialogPanel as="div" className="modal-body">
        <button id="close-modal-btn" onClick={onClose}>
          <BsX size="25" />
        </button>
        <div className="search-bar">
          <DialogTitle className="title">Search for lawyers</DialogTitle>
          <div className="location">
            <div className="icon">
              <FaMapMarkerAlt />
            </div>
            <select>
              <option value="khi">karachi</option>
              <option value="lhr">lahore</option>
            </select>
            <button>
              <PiCrosshairFill /> Detect
            </button>
          </div>
          <div className="search">
            <div className="icon">
              <BsSearch />
            </div>
            <input type="search" placeholder="search lawyers" />
          </div>
        </div>
      </DialogPanel>
    </Dialog>
  );
}
