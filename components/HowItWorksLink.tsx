"use client";

import type { MouseEvent, ReactNode } from "react";
import Link from "next/link";

interface HowItWorksLinkProps {
  className: string;
  children: ReactNode;
}

export default function HowItWorksLink({
  className,
  children,
}: HowItWorksLinkProps) {
  function handleClick(event: MouseEvent<HTMLAnchorElement>) {
    if (window.location.pathname !== "/") {
      return;
    }

    const section = document.getElementById("how-it-works");

    if (!section) {
      return;
    }

    event.preventDefault();

    if (window.location.hash !== "#how-it-works") {
      window.history.pushState(null, "", "#how-it-works");
    }

    section.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <Link
      href="/#how-it-works"
      onClick={handleClick}
      className={className}
    >
      {children}
    </Link>
  );
}
