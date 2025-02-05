"use client";

import Link from "next/link";
import { useState } from "react";
import styled from "styled-components";

export default function () {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="position-relative ms-2 ms-xl-5">
      <Avatar
        src="https://www.shutterstock.com/image-vector/young-smiling-man-avatar-brown-600nw-2261401207.jpg"
        alt="user photo"
        onClick={() => setIsMenuOpen((prev) => !prev)}
      />

      {isMenuOpen && (
        <Dropdown>
          <div class="px-4 py-3">
            <strong className="d-block">Bonnie Green</strong>
            <small class="">name@flowbite.com</small>
          </div>
          <ul class="py-2">
            <li className="py-2">
              <Link href="/">Profile</Link>
            </li>
            <li className="py-2">
              <Link href="/">Appointments</Link>
            </li>
            <li className="py-2">
              <a href="#">Sign out</a>
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
