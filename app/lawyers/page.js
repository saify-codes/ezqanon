"use client";

import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";
import api from "@/services/api";
import SearchModal from "@/components/searchModal";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

export default function Lawyers() {

  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter]           = useState(Object.fromEntries(useSearchParams().entries()));
  const [isOpen, setIsOpen]           = useState(false);

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: [currentPage, filter],
    queryFn: async () => {
      const queryParams = new URLSearchParams();

      if (filter.name)            queryParams.append("name", filter.name);
      if (filter.city)            queryParams.append("city", filter.city);
      if (filter.location)        queryParams.append("location", filter.location);
      if (filter.start_time)      queryParams.append("start_time", filter.start_time);
      if (filter.end_time)        queryParams.append("end_time", filter.end_time);
      if (filter.min_price)       queryParams.append("min_price", filter.min_price);
      if (filter.max_price)       queryParams.append("max_price", filter.max_price);
      if (filter.experience)      queryParams.append("experience", filter.experience);
      if (filter.specialization)  queryParams.append("specialization", filter.specialization);

      const response = await api.get(`/lawyer?page=${currentPage}&${queryParams.toString()}`);
      return response.data;
    },
    keepPreviousData: true,
  });
  const lawyers = data?.data ?? [];
  const totalPages = data?.last_page ?? 1;


  // Handle page change
  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Generate Pagination Links Dynamically
  const generatePaginationLinks = () => {
    const range = 1; // Number of pages shown before and after the current page
    const pageLinks = [];
    let start = Math.max(1, currentPage - range);
    let end = Math.min(totalPages, currentPage + range);

    // Show the middle range
    for (let i = start; i <= end; i++) {
      pageLinks.push(i);
    }

    // Always show the last page if not included
    if (end < totalPages) {
      pageLinks.push("...");
      pageLinks.push(totalPages);
    }

    return pageLinks;
  };

  const handleModalSearch = (filters)=>{
    setFilter(filters)
    setIsOpen(false)
    window.history.replaceState({},'',`/lawyers?${new URLSearchParams(filters).toString()}`);
  }

  return (
    <Base>
      <SearchModal 
        isOpen={isOpen} 
        onSearch={handleModalSearch} 
        onClose={() => setIsOpen(false)} 
        initialFilters={filter} 
      />
      <section className="lawyers section">
        <Wrapper className="container">
          <div className="row">
            <div className="col">
              <div class="input-group" onClick={()=>setIsOpen(true)}>
                <input className="form-control" placeholder="search lawyers..."/>
                <div class="input-group-append">
                  <button class="btn btn-primary" type="button">Search</button>
                </div>
              </div>
            </div>
          </div>
          {/* Spinner when data is loading or refetching */}
          {(isLoading || isFetching) && <Spinner />}

          {isError && <p className="text-danger">{error.message ?? "Failed to fetch lawyers."}</p>}

          {/* If no lawyers found (not loading and not error) */}
          {!isLoading && lawyers.length === 0 && <p>No lawyers found</p>}

          {/* Lawyers List */}
          {lawyers.map((lawyer) => (
            <Lawyer key={lawyer.id} lawyer={lawyer} />
          ))}
        </Wrapper>
        {/* Pagination */}
        {lawyers?.length > 0 && (
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

                {/* Pages */}
                {generatePaginationLinks().map((page, index) => (
                  <li
                    key={index}
                    className={`page-item ${currentPage === page ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
                    onClick={() =>typeof page === "number" && handlePageChange(page)}
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
        )}
      </section>
    </Base>
  );
}

function Spinner() {
  return (
    <div className="mx-auto">
      <div className="spinner-border" role="status"></div>
    </div>
  );
}

// Styled Components
const Wrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

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
