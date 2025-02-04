"use client";

import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container not-found">
      <h1 className="">404</h1>
      <Link href="/">Go to home</Link>
    </div>
  );
}
