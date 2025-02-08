"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";


export default function Lawyers() {

  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, error } = useQuery({
    queryFn: async ()=> (await axios.get(`/api/mock?page=${currentPage}`)).data,
    queryKey: ['lawyers'], 
  });
  

  console.log(data);
  

  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= data?.last_page) {
      setCurrentPage(page);
    }
  };

  // Generate Pagination Links Dynamically
  const generatePaginationLinks = () => {
    const range = 1; // Number of pages shown before and after the current page
    const pageLinks = [];
    let start = Math.max(1, currentPage - range);
    let end = Math.min(data?.last_page, currentPage + range);

    // Show the middle range
    for (let i = start; i <= end; i++) {
      pageLinks.push(i);
    }

    // Always show the last page
    if (end < data?.last_page) {
      pageLinks.push("...");
      pageLinks.push(data?.last_page);
    }

    return pageLinks;
  };

  return (
    <Base>
      <section className="lawyers section">
        <Wrapper className="container">
          {isLoading && <Skeleton />}
          {isError && <p className="text-danger">{error.message}</p>}
          {data?.map((lawyer) => (
            <Lawyer
              key={lawyer.id}
              name={lawyer.name}
              qualification={lawyer.qualification}
              avatar={lawyer.avatar}
              rating={lawyer.rating}
            />
          ))}
        </Wrapper>

        {data?.length > 0 && (
          <div className="container mt-3">
            <PaginationWrapper>
              <ul className="pagination justify-content-end flex-wrap">
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
                    currentPage === data?.last_page ? "disabled" : ""
                  }`}
                  onClick={() => handlePageChange(currentPage + 1)}
                >
                  <a className="page-link">Next</a>
                </li>
              </ul>
            </PaginationWrapper>
          </div>
        )}
      </section>
    </Base>
  );
}

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
