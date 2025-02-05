"use client";

import { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";

// Styled Components
const PaginationWrapper = styled.nav`
  .page-item.active .page-link {
    background-color: var(--accent-color) !important;
    border-color: var(--accent-color) !important;
    color: white !important;
  }

  .page-item .page-link {
    color: #555;
    cursor: pointer;
  }
`;

const Skeleton = styled.div`
  position: absolute;
  background: #0003;
  border-radius: 1rem;
  margin: 0 12px;
  inset: 0;
`;

const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default function Lawyers() {
  const [lawyers, setLawyers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch Lawyers
  const fetchLawyers = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data } = await axios.get(`/api/mock?page=${currentPage}`);
      setLawyers(data.data);
      setTotalPages(data.last_page);
    } catch (err) {
      setError("Failed to fetch lawyers. Please try again.");
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLawyers();
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate Pagination Links Dynamically
  const generatePaginationLinks = () => {
    const range = 2; // Number of pages shown before and after the current page
    const pageLinks = [];
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Show the middle range
    for (let i = start; i <= end; i++) {
      pageLinks.push(i);
    }

    // Always show the last page
    if (end < totalPages) {
      pageLinks.push("...");
      pageLinks.push(totalPages);
    }

    return pageLinks;
  };

  return (
    <Base>
      <section className="lawyers section">
        <Wrapper className="container">
          {loading && <Skeleton />}
          {error && <p className="text-danger">{error}</p>}
          {lawyers.map((lawyer) => (
            <Lawyer
              key={lawyer.id}
              name={lawyer.name}
              qualification={lawyer.qualification}
              avatar={lawyer.avatar}
              rating={lawyer.rating}
            />
          ))}
        </Wrapper>

        <div className="container mt-3">
          <PaginationWrapper>
            <ul className="pagination justify-content-end">
              {/* Previous Button */}
              <li
                className={`page-item ${currentPage === 1 ? "disabled" : ""}`}
                onClick={() => handlePageChange(currentPage - 1)}
              >
                <a className="page-link">Previous</a>
              </li>

              {/* Dynamic Page Links */}
              {generatePaginationLinks().map((page, index) => (
                <li
                  key={index}
                  className={`page-item ${
                    currentPage === page ? "active" : ""
                  } ${page === "..." ? "disabled" : ""}`}
                  onClick={() =>
                    typeof page === "number" && handlePageChange(page)
                  }
                >
                  <a className="page-link">{page}</a>
                </li>
              ))}

              {/* Next Button */}
              <li
                className={`page-item ${
                  currentPage === totalPages ? "disabled" : ""
                }`}
                onClick={() => handlePageChange(currentPage + 1)}
              >
                <a className="page-link">Next</a>
              </li>
            </ul>
          </PaginationWrapper>
        </div>
      </section>
    </Base>
  );
}
