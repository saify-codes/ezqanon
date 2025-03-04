"use client";

import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";
import api from "@/services/api";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

export default function Lawyers() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  console.log(searchQuery)

  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["lawyers", currentPage,],
    queryFn: async () => {
      const res = await api.get(`/lawyer?page=${currentPage}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  // If there's an error from the server or network
  const errorMessage = isError
    ? error?.message ?? "Failed to fetch lawyers."
    : null;

  // Helpers
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

  return (
    <Base>
      <section className="lawyers section">
        <SearchbarWrapper className="container">
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery}  />
        </SearchbarWrapper>
        <Wrapper className="container">
          {/* Spinner when data is loading or refetching */}
          {(isLoading || isFetching) && <Spinner />}

          {errorMessage && <p className="text-danger">{errorMessage}</p>}

          {/* If no lawyers found (not loading and not error) */}
          {!isLoading && lawyers?.length === 0 && <p>No lawyers found</p>}

          {/* Lawyers List */}
          {lawyers?.map((lawyer) => (
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
        )}
      </section>
    </Base>
  );
}

function Spinner() {
  return <div className="mx-auto">
    <div className="spinner-border" role="status"></div>
  </div>
}


function SearchBar({searchQuery,setSearchQuery}) {
  return (
    <div className="search-bar">
      <input
        type="text"
        placeholder="Search lawyers..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="form-control"
      />
      <button  className="btn btn-primary">
        Search
      </button>
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

const SearchbarWrapper = styled.div`
  margin-bottom: 2rem;
  .search-bar {
    display: flex;
    gap: 0.6rem;
    align-items: center;

    input {
      flex: 1;
      width: 3rem;
      min-width: 130px;
      &:focus {
        outline: none;
        box-shadow: none;
      }
    }

    button {
      white-space: nowrap;
    }

    /* Mobile screens (max-width: 768px) */
    @media (max-width: 768px) {
      flex-direction: column;
      width: 100%;

      input {
        width: 100%;
        min-width: auto;
      }

      button {
        width: 100%;
      }
    }
  }
`;
