"use client";

import styled from "styled-components";
import Base from "@/layout/base";
import Lawyer from "@/components/lawyer";
import api from "@/services/api";
import SearchModal from "@/components/searchModal";
import Pagination from "@/components/paination";
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

  const handleModalSearch = (filters)=>{
    setFilter(filters)
    setIsOpen(false)

    // Remove filters that are null or empty strings
    const queryString = new URLSearchParams(
                              Object.fromEntries(
                                Object.entries(filters).filter(([_, value]) => value != null && value.trim() !== '')
                              )
                            ).toString();

    // Update the URL without reloading the page
    window.history.replaceState({}, '', `/lawyers?${queryString}`);

  }

  return (
    <Base>
      <SearchModal 
        searchPlaceholder={"search lawyers"}
        isOpen        = {isOpen} 
        onSearch      = {handleModalSearch} 
        onClose       = {() => setIsOpen(false)} 
        initialFilters= {filter} 
      />
      <section className="lawyers section">
        <div className="container d-flex flex-column gap-4">
          <div className="row">
            <div className="col">
              <div className="d-flex gap-2" onClick={()=>setIsOpen(true)}>
                <input className="form-control" placeholder="search lawyers..." defaultValue={filter.name ?? ''}/>
                <button className="btn btn-primary" type="button">Search</button>
              </div>
            </div>
          </div>

          {/* Spinner when data is loading or refetching */}
          {(isLoading || isFetching) && <Spinner />}

          {/* If sonthing went wrong show message */}
          {isError && <p className="text-danger">{error.message ?? "Failed to fetch lawyers."}</p>}

          {/* If no lawyers found (not loading and not error) */}
          {!isLoading && data?.lawyers?.length === 0 && <p>No lawyers found</p>}

          {/* Lawyers List */}
          {data?.lawyers?.map((lawyer) => <Lawyer key={lawyer.id} lawyer={lawyer} />)}

        </div>

        {/* Pagination */}
        <Pagination totalPages={data?.total ?? 0} onPageChange={() => {}}/>
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
