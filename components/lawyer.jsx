import styled from "styled-components";
import { useAuth } from "@/hooks/useAuth";
import { flashMessage } from "@/utils";
import { useRouter } from "next/navigation";
import { BsPinMap } from "react-icons/bs";
import { useCallback } from "react";

export default function LawyerCard({ lawyer, className }) {
  const router = useRouter();
  const auth = useAuth();

  const viewProfile = useCallback(() => {
    router.push(`/lawyers/${lawyer.id}`);
  }, [router, lawyer.id]);

  const book = useCallback(() => {
    if (!auth.authenticated()) {
      flashMessage("error", "Please login to continue");
      router.push(`/signin?redirect=/lawyers/${lawyer.id}/appointment`);
      return;
    }
    router.push(`/lawyers/${lawyer.id}/appointment`);
  }, [auth, router, lawyer.id]);

  return (
    <Card>
      <Avatar>
        <img src={lawyer.avatar} alt={`${lawyer.name}'s profile`} />
      </Avatar>
      <Content>
        <Title>{lawyer.name}</Title>
        <div className="text-secondary">Fee: <strong style={{color: 'var(--primary)'}}>Rs.{lawyer.price}</strong>
        </div>
        {/* <Rating className="justify-content-center justify-content-md-start">
          {Array(5)
            .fill()
            .map((_, index) =>
              index < (lawyer.rating || 0) ? (
                <BsStarFill key={index} />
              ) : (
                <BsStar key={index} />
              )
            )}
        </Rating> */}
        <div className="d-flex flex-wrap gap-1">
          <Badge>{lawyer.experience} years experience</Badge>
          <Badge><BsPinMap /> {lawyer.location}</Badge>
          {
            lawyer.specialization?.map(specialization => <Badge>{specialization}</Badge>)
          }
        </div>
      </Content>
      <Action>
        <ButtonOutline onClick={viewProfile}>View Profile</ButtonOutline>
        <ButtonPrimary onClick={book}>Book Appointment</ButtonPrimary>
      </Action>
    </Card>
  );
}

/** Styled Components **/
const Card = styled.div`
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    text-align: center;
  }
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
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

const ButtonOutline = styled.button`
  flex: 1;
  text-align: center;
  font-size: clamp(0.8rem, 2vw, 1rem);
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  background: transparent;
  border-radius: 5px;
  cursor: pointer;
  transition: 0.3s;

  &:hover {
    background: var(--primary);
    color: white;
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
