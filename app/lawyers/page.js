"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";

export default function Lawyers() {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchLawyers(currentPage);
  }, [currentPage]);

  const fetchLawyers = async (page) => {
    try {
      const response = await axios.get(`/api/mock?page=${page}`);
      setData(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching lawyers:", error);
    }
  };

  const generatePageNumbers = () => {
    const pages = [];
    let start = Math.max(1, currentPage - 2);
    let end = Math.min(totalPages, start + 4);

    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  };

  return (
    <Base>
      <section className="lawyers section">
        <div className="container">
          {data.map((lawyer) => (
            <Lawyer
              key={lawyer.id}
              name={lawyer.name}
              qualification={lawyer.qualification}
              avatar={lawyer.avatar}
              rating={lawyer.rating}
              className="mb-3"
            />

          ))}
          {/* Pagination */}
          <div className="pagination text-center mt-4">
            <button
              className="btn btn-outline-primary mx-1"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Prev
            </button>

            {generatePageNumbers().map((number) => (
              <button
                key={number}
                className={`btn mx-1 ${
                  currentPage === number ? "btn-primary" : "btn-outline-primary"
                }`}
                onClick={() => setCurrentPage(number)}
              >
                {number}
              </button>
            ))}

            <button
              className="btn btn-outline-primary mx-1"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </Base>
  );
}
