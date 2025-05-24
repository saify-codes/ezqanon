import { useState } from "react";
import styled from "styled-components";

export default function ({totalPages, onPageChange}) {

  const [currentPage, setCurrentPage] = useState(1);

  // Generate Pagination Links Dynamically
  const generatePaginationLinks = () => {
    const range     = 1; // Number of pages shown before and after the current page
    const pageLinks = [];
    let start       = Math.max(1, currentPage - range);
    let end         = Math.min(totalPages, currentPage + range);

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

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
        setCurrentPage(page)
        onPageChange(page)
    }
  };
  
  return (
    <div className="container mt-3">
      <PaginationWrapper>
        <ul className="pagination justify-content-end flex-wrap">
          {/* Previous Button */}
          <li
            className = {`page-item ${currentPage === 1 ? "disabled" : ""}`}
            onClick   = {() => handlePageChange(currentPage - 1)}
          >
            <a className="page-link">Previous</a>
          </li>

          {/* Pages */}
          {generatePaginationLinks().map((page, index) => (
            <li
              key       = {index}
              className = {`page-item ${currentPage === page ? "active" : ""} ${page === "..." ? "disabled" : ""}`}
              onClick   = {() => handlePageChange(page)}
            >
              <a className="page-link">{page}</a>
            </li>
          ))}

          {/* Next Button */}
          <li
            className   = {`page-item ${(totalPages === 0 || currentPage === totalPages) ? "disabled" : ""}`}
            onClick     = {() => handlePageChange(currentPage + 1)}
          >
            <a className="page-link">Next</a>
          </li>
        </ul>
      </PaginationWrapper>
    </div>
  );
}

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
