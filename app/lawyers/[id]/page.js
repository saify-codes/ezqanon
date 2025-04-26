"use client";

import Base from "@/layout/base";
import api from "@/services/api";
import styled from "styled-components";
import { useAuth } from "@/hooks/useAuth";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BsCalendar2, BsPinMap, BsStar, BsStarFill } from "react-icons/bs";
import { toast } from "react-toastify";
import { flashMessage } from "@/utils";

export default function () {
  const { id } = useParams();
  const auth = useAuth();
  const router = useRouter();
  const [lawyer, setLawyer] = useState();
  const [reviews, setReviews] = useState();
  const [tab, setTab] = useState("about");

  const book = () => {
    if (!auth.authenticated()) {
      flashMessage("error", "Please login to continue");
      router.push(`/signin?redirect=/lawyers/${id}/appointment`);
      return;
    }
    router.push(`/lawyers/${id}/appointment`);
  };

  const fetchLawyer = async () => {
    try {
      const { data } = await api.get(`/lawyer/${id}`);
      setLawyer(data.data);
    } catch (error) {
      console.log(erro);
      toast.error("something went wrong");
    }
  };

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/lawyer/${id}/reviews`);
      setReviews(data.data);
    } catch (error) {
      console.log(errro);
      toast.error("something went wrong");
    }
  };

  useEffect(() => {
    fetchLawyer();
    fetchReviews();
  }, []);

  return (
    <Base>
      <div className="container">
        <Card>
          <Avatar>
            <img src={lawyer?.avatar} alt={`${lawyer?.name}'s profile`} />
          </Avatar>
          <Content>
            <Title>{lawyer?.name}</Title>
            <div className="text-secondary">
              {lawyer?.specialization} |{" "}
              <strong style={{ color: "var(--primary)" }}>
                Rs.{lawyer?.price}
              </strong>
            </div>
            <Rating className="justify-content-center justify-content-md-start">
              {Array(5)
                .fill()
                .map((_, index) =>
                  index < (lawyer?.rating || 0) ? (
                    <BsStarFill key={index} />
                  ) : (
                    <BsStar key={index} />
                  )
                )}
            </Rating>
            <div className="d-flex flex-wrap gap-1">
              <Badge>{lawyer?.experience} years experience</Badge>
              <Badge>
                <BsCalendar2 /> {lawyer?.availability_from} -{" "}
                {lawyer?.availability_to}
              </Badge>
              <Badge>
                <BsPinMap /> {lawyer?.location}
              </Badge>
            </div>
          </Content>
          <Action>
            <ButtonPrimary onClick={book}>Book Appointment</ButtonPrimary>
          </Action>
        </Card>

        {/*  Tab Menu  */}
        <ul className="nav nav-tabs mt-5">
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "about" ? "active" : ""}`}
              onClick={() => setTab("about")}
            >
              About
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${tab === "reviews" ? "active" : ""}`}
              onClick={() => setTab("reviews")}
            >
              Reviews
            </button>
          </li>
        </ul>

        <div className="tab-content p-3">
          <div
            className={`tab-pane fade ${tab === "about" ? "show active" : ""}`}
          >
            {lawyer?.description}
          </div>

          <div
            className={`tab-pane fade ${
              tab === "reviews" ? "show active" : ""
            }`}
          >
            working...
          </div>
        </div>
      </div>
    </Base>
  );
}

/** Styled Components **/
const Card = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1;
`;

const Title = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const Badge = styled.div`
  background: #eee;
  padding: 5px 10px;
  border-radius: 999px;
  font-size: 0.8rem;
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;

  svg {
    color: #ffd700;
  }
`;

const Action = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  @media (max-width: 768px) {
    flex-direction: row;
    justify-content: center;
    width: 100%;
  }
`;

const ButtonPrimary = styled.button`
  flex: 1;
  text-align: center;
  font-size: clamp(0.8rem, 2vw, 1rem);
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: var(--secondary);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--secondary-hover);
  }
`;
