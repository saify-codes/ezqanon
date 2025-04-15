'use client';

import { useState, useEffect } from 'react';
import { FaMapMarkerAlt, FaSearch } from 'react-icons/fa';
import { BsCrosshair } from 'react-icons/bs';
import { IoMdClose } from 'react-icons/io';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';
import './SearchModal.css';
import { lawyerData } from '@/data/lawyer';

export default function SearchModal({ show, handleClose }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [results, setResults] = useState(lawyerData); 
  const [selectedItem, setSelectedItem] = useState(null);

  // Handle search input
  const handleSearch = (e) => {
    const keyword = e.target.value;
    setSearchTerm(keyword);
    if (keyword.trim() === '') {
      setResults(lawyerData); 
      return;
    }
    const filtered = lawyerData.filter((item) =>
      item.toLowerCase().includes(keyword.toLowerCase())
    );
    setResults(filtered);
  };

  // Handle click on a search result
  const handleResultClick = (item) => {
    setSearchTerm(item);
    setResults([]); // Clear the results after selection
    setSelectedItem(item);
  };

  // Reset states when modal closes and initialize results when modal opens
  useEffect(() => {
    if (show) {
      setResults(lawyerData); 
      document.body.style.overflow = 'hidden'; 
    } else {
      setSearchTerm('');
      setResults([]);
      setSelectedItem(null);
      document.body.style.overflow = 'auto'; 
    }

    // Cleanup on component unmount
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [show]);

  return (
    <Transition appear show={show} as={Fragment}>
      <Dialog as="div" className="modal-container" onClose={handleClose}>
        {/* Backdrop */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="modal-backdrop" />
        </Transition.Child>

        {/* Modal Content */}
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0 scale-95"
          enterTo="opacity-100 scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 scale-100"
          leaveTo="opacity-0 scale-95"
        >
          <div className="modal-content-wrapper">
            <Dialog.Panel className="modal-panel">
              <div className="modal-inner">
                {/* Search Section */}
                <div className="search-section">
                  {/* Close Button */}
                  <button onClick={handleClose} className="close-button">
                    <IoMdClose />
                  </button>

                  <h5 className="search-title">Search for lawyers</h5>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaMapMarkerAlt className="icon-map" />
                    </span>
                    <input
                      type="text"
                      placeholder="Enter Location or City"
                      defaultValue="Karachi"
                      className="input-field"
                    />
                    <button className="detect-button">
                      <BsCrosshair className="icon-crosshair" />
                      Detect
                    </button>
                  </div>

                  <div className="input-group">
                    <span className="input-group-text">
                      <FaSearch className="icon-search" />
                    </span>
                    <input
                      type="text"
                      placeholder="Search for lawyers, law firms"
                      value={searchTerm}
                      onChange={handleSearch}
                      className="input-field"
                    />
                  </div>
                </div>

                {/* Results Section */}
                <div className="results-section">
                  <ul className="results-list">
                    {results.length === 0 && searchTerm ? (
                      <div className="no-results">No results found.</div>
                    ) : (
                      results.map((item, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleResultClick(item)}
                          className="result-item"
                        >
                          <div className="result-content">
                            <FaSearch className="icon-search" />
                            <span className="result-text">{item}</span>
                          </div>
                          <span className="result-label">Specialty</span>
                        </li>
                      ))
                    )}
                  </ul>
                </div>
              </div>
            </Dialog.Panel>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition>
  );
}