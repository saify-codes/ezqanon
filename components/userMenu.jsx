"use client";

import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import styled from "styled-components";

export default function () {
  const { user, signout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();

  const handleSignout = () => {
    signout();
    router.push("/");
  };

  return (
    <div className="position-relative ms-2 ms-xl-5">
      <Avatar
        src={user?.avatar} 
        alt="user photo"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {isMenuOpen && (
        <Dropdown>
          <div className="px-4 py-3">
            <strong className="d-block">{user?.name}</strong>
            <small className="">{user?.email}</small>
          </div>
          <ul className="py-2">
            <li className="py-2">
              <Link href="/profile">Profile</Link>
            </li>
            <li className="py-2">
              <Link href="/appointments">Appointments</Link>
            </li>
            <li className="py-2">
              <a href="#" onClick={handleSignout}>
                Sign out
              </a>
            </li>
          </ul>
        </Dropdown>
      )}
    </div>
  );
}

const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  background: red;
  right: 0;
  top: calc(100% + 10px);
  background: #fff;
  border: 1px solid var(--border-color);
  border-radius: 1rem;
  min-width: 250px;

  ul {
    list-style: none;
  }
`;
