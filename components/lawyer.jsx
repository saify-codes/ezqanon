import { BsStar, BsStarFill } from "react-icons/bs";
import styled from "styled-components";

export default function LawyerCard({
  avatar,
  name,
  qualification,
  rating,
  className,
}) {
  return (
    <Card className={className}>
      <Avatar>
        <img src={avatar} alt={`${name}'s profile`} />
      </Avatar>
      <Content>
        <Title>{name}</Title>
        <Qualification>{qualification}</Qualification>
        <Rating>
          {Array(5)
            .fill()
            .map((_, index) =>
              index < rating ? (
                <BsStarFill key={index} />
              ) : (
                <BsStar key={index} />
              )
            )}
        </Rating>
      </Content>
      <Action>
        <ButtonOutline href="#">View Profile</ButtonOutline>
        <ButtonPrimary href="#">Book Appointment</ButtonPrimary>
      </Action>
    </Card>
  );
}

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
  flex: 1;
`;

const Title = styled.h3`
  font-weight: 600;
  margin: 0;
`;

const Qualification = styled.small`
  color: var(--heading-color);
`;

const Rating = styled.div`
  display: flex;
  gap: 0.25rem;
  margin-top: 0.5rem;

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

const ButtonOutline = styled.a`
  flex: 1;
  text-align: center;
  font-size: clamp(0.8rem, 2vw, 1rem);
  white-space: nowrap;
  padding: 0.5rem 1rem;
  border: 1px solid var(--primary);
  color: var(--primary);
  background: transparent;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background: var(--primary);
    color: white;
  }
`;

const ButtonPrimary = styled.a`
  flex: 1;
  text-align: center;
  font-size: clamp(0.8rem, 2vw, 1rem);
  white-space: nowrap;
  padding: 0.5rem 1rem;
  background: var(--secondary);
  color: #fff;
  border: none;
  border-radius: 5px;
  text-decoration: none;

  &:hover {
    background: var(--secondary-hover   );
  }
`;
