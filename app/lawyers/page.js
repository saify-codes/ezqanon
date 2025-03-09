"use client";

import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";
import api from "@/services/api";
import { useState } from "react";
// import { IoSearchOutline } from "react-icons/io5";
import { CgSearch } from "react-icons/cg";
import { MdFilterListAlt } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";

export default function Lawyers() {
  const [currentPage, setCurrentPage] = useState(1);
 
  const { data, isLoading, isError, error, isFetching } = useQuery({
    queryKey: ["lawyers", currentPage,],
    queryFn: async () => {
      const res = await api.get(
        `/lawyer?page=${currentPage}`
      );
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

  // Handle filter selection
  // const handleFilterSelect = (filter) => {
  //   setFilters([...filters, filter]);
  //   setSearchQuery(`${searchQuery}`);
  //   setSelectFilter(`${filter}`);
  // };

  return (
    <Base>
      <section className="lawyers section">
        <SearchbarWrapper className="container ">
          <SearchBar
            // searchQuery={searchQuery}
            // setSearchQuery={setSearchQuery}
            // setSelectFilter={setSelectFilter}
            // selectFilter={selectFilter}
            // setShowModal={setShowModal}
          />
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
  return (
    <div className="mx-auto">
      <div className="spinner-border" role="status"></div>
    </div>
  );
}



function SearchBar() {
  const workingTypes = ["Remote", "Full-time", "Part-time", "Freelance", "Contract"];
  const [searchQuery, setSearchQuery] = useState("");
  // console.log(searchQuery)
  const [filterQuery, setFilterQuery] = useState("");
  // console.log(filterQuery)
  const [suggestions, setSuggestions] = useState([]);
  // console.log(suggestions)

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value)
  };
  const handleFilterChange = (e) => {
    const value = e.target.value;
    setFilterQuery(value);

    if (value.trim() === "") {
      setSuggestions([]);
      return;
    }
    const filtered = workingTypes.filter((item) =>
        item.toLowerCase().includes(value.toLowerCase())
    );
    console.log(filtered)
    setSuggestions(filtered);
  };

  const handleSuggestionClick = (value, type) => {
    if (type === "filter") {
      setFilterQuery(value);
      setSuggestions([]);
   
    } else {
      setSearchQuery(value);
    }
  };

  return (
    <SearchbarWrapper>
      <div className="search-bar">
        <div className="search-input">
          <CgSearch style={{ fontSize: "1.8em", fontWeight: "bold" }} />
          {/* search-lawyer-bar */}
          <input
            type="text"
            placeholder="Search lawyers..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="form-control searchbar-lawyer"
          />
       
        </div>
        <div className="vertical-line"></div>
        {/* filte-input- bar  */}
        <div className="filter-input">
          <MdFilterListAlt style={{ fontSize: "1.8em" }} />
          <input
            type="text"
            placeholder="Working Type"
            value={filterQuery}
            onChange={handleFilterChange}
            className="form-control filterbar"
          />
          {suggestions.length > 0 && (
            <SuggestionList>
              {suggestions.map((suggestion, index) => (
                <li key={index} onClick={() => handleSuggestionClick(suggestion, "filter")}>
                  {suggestion}
                </li>
              ))}
            </SuggestionList>
          )}
        </div>
        <button className="btn btn-primary">Search</button>
      </div>
    </SearchbarWrapper>
  );
}
//gtp2




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


//gpt
// const SearchbarWrapper = styled.div`
//   .search-bar {
//     position: relative;
//     border: 1px solid var(--accent-color) !important;
//     border-radius: 8px;
//     width: 90%;
//     display: flex;
//     align-items: center;
//     flex-wrap: wrap;
//     gap: 15px;
//     margin: 0 auto 20px;
//     padding: 4px 14px;
//     box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
//   }

//   .search-input,
//   .filter-input {
//     flex: 1;
//     display: flex;
//     align-items: center;
//     gap: 1px;
//     position: relative;
//   }

//   .searchbar-lawyer,
//   .filterbar {
//     width: 100%;
//     height: 9vh;
//     padding: 10px;
//     box-sizing: border-box;
//     border: none;
//     outline: none;
//   }

//   .searchbar-lawyer:focus,
//   .filterbar:focus {
//     border: none !important; 
//    outline: none !important;
//    box-shadow: none !important; 
//   } 

//   .vertical-line {
//     border-left: 1px solid #d3d3d3;
//     height: 5vh;
//     padding-top: 8px;
//   }

//   .btn-primary {
//     padding: 7px 12px;
//     white-space: nowrap;
//   }

//   @media (max-width: 600px) {
//     .search-bar {
//       display: flex;
//       flex-direction: column;
//       align-items: start;
//       width: 100%;
//       border: none !important;
//     }
//     .vertical-line {
//       display: none;
//     }
//     .search-input,
//     .filter-input {
//       width: 100%;
//       border:1px solid red;
//       margin: 0; /* Remove any default margin */
//     padding: 0;
//     }
//     .searchbar-lawyer,
//     .filterbar,
//     .btn-primary {
//       width: 100%;
//       height: 7vh;
//       padding: 8px;
//     }
//   }
// `;
const SearchbarWrapper = styled.div`
  .search-bar {
    position: relative;
    border: 1px solid var(--accent-color) !important;
    border-radius: 8px;
    width: 90%;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 15px; /* This creates the gap between items */
    margin: 0 auto 20px;
    padding: 4px 14px;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 1px 2px 0px;
  }

  .search-input,
  .filter-input {
    flex: 1;
    display: flex;
    align-items: center;
    gap: 1px;
    position: relative;
  }

  .searchbar-lawyer,
  .filterbar {
    width: 100%;
    height: 9vh;
    padding: 10px;
    box-sizing: border-box;
    border: none;
    outline: none;
  }

  .searchbar-lawyer:focus,
  .filterbar:focus {
    border: none !important; 
    outline: none !important;
    box-shadow: none !important; 
  } 

  .vertical-line {
    border-left: 1px solid #d3d3d3;
    height: 5vh;
    padding-top: 8px;
  }

  .btn-primary {
    padding: 7px 12px;
    white-space: nowrap;
  }

  @media (max-width: 600px) {
    .search-bar {
      display: flex;
      flex-direction: column;
      align-items: start;
      width: 100%;
      border: none !important;
      gap: 0;
    }
    .vertical-line {
      display: none;
    }
    .search-input{
      width: 100%;
      border: 1px solid  var(--accent-color);
      margin: 0; 
      padding: 4px;
     border-bottom: none;
     border-radius: 8px 8px 0 0; 
    }
    .filter-input {
      width: 100%;
      border: 1px solid var(--accent-color) ;
      margin: 0; 
      padding: 4px;
     border-radius:  0 0 8px 8px; 

    }
  
    .btn-primary {
      width: 100%;
      height: 7vh;
      padding: 8px;
      margin-top: 10px;
    }
  }
`;
const SuggestionList = styled.ul`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  width: 100%;
  background: white;
  list-style: none;
  padding: 0;
  margin: 0;
  border: 1px solid #ccc;
  border-radius:0px 0px 10px 10px;
  border-top: none;
  z-index: 1000;

  li {
    padding: 10px;
    cursor: pointer;
    border-bottom: 1px solid #eee;
  }
  li:hover {
    background: #f0f0f0;
  }
`;



