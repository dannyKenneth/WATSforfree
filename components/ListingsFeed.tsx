"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import type { Listing } from "@/lib/listings";

interface ListingsFeedProps {
  email: string;
  listings: Listing[];
}

const filters = [
  { id: "all", label: "All listings" },
  { id: "food", label: "Food & drink" },
  { id: "other", label: "Supplies & more" },
] as const;

export default function ListingsFeed({ email, listings }: ListingsFeedProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["id"]>("all");
  const [search, setSearch] = useState("");

  const visibleListings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return listings.filter((listing) => {
      const isFood = /food|drink/i.test(listing.category);
      const matchesFilter =
        activeFilter === "all" ||
        (activeFilter === "food" && isFood) ||
        (activeFilter === "other" && !isFood);
      const matchesSearch =
        !query ||
        [
          listing.title,
          listing.category,
          listing.location,
          listing.date,
          listing.event,
          listing.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
    });
  }, [activeFilter, listings, search]);

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 pb-16 pt-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <Link href="/" className="text-lg font-bold text-amber-400">
          WATsForFree
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <span className="hidden text-slate-400 sm:inline">{email}</span>
          <form action={signOut}>
            <button
              type="submit"
              className="rounded-full border border-white/10 px-4 py-2 text-slate-200 transition hover:border-amber-400/50 hover:text-amber-300"
            >
              Log out
            </button>
          </form>
        </div>
      </header>

      <section className="py-12">
        <p className="text-sm font-medium uppercase tracking-[0.2em] text-amber-300">
          Waterloo Region
        </p>
        <h1 className="mt-3 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Free stuff on campus
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Find free food, events, supplies, and more. Check the organizer&apos;s
          page for the latest details before heading out.
        </p>
      </section>

      <section aria-label="Free item listings">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex flex-wrap gap-2" aria-label="Listing categories">
            {filters.map((filter) => (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={activeFilter === filter.id}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  activeFilter === filter.id
                    ? "border-amber-400 bg-amber-400 text-slate-950"
                    : "border-white/10 bg-white/[0.03] text-slate-300 hover:border-white/25"
                }`}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <label className="sr-only" htmlFor="listing-search">
            Search listings
          </label>
          <input
            id="listing-search"
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search food, events, locations..."
            className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-amber-400 sm:max-w-sm"
          />
        </div>

        <p className="mt-6 text-sm text-slate-500" aria-live="polite">
          {visibleListings.length}{" "}
          {visibleListings.length === 1 ? "listing" : "listings"}
        </p>

        {visibleListings.length ? (
          <div className="mt-4 grid gap-5 md:grid-cols-2">
            {visibleListings.map((listing) => (
              <article
                key={listing.id}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-400/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                    {listing.category}
                  </span>
                  <span className="text-xs text-slate-400">{listing.date}</span>
                </div>
                <h2 className="mt-4 text-xl font-semibold text-white">
                  {listing.event}
                </h2>
                <p className="mt-2 text-sm font-medium text-slate-200">
                  {listing.title}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">
                  {listing.description}
                </p>
                <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-300">
                  {listing.location}
                </p>
                {listing.sourceUrl && (
                  <a
                    href={listing.sourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-amber-300 hover:text-amber-200"
                  >
                    Event details
                  </a>
                )}
              </article>
            ))}
          </div>
        ) : (
          <p className="mt-8 rounded-2xl border border-white/10 bg-white/[0.03] p-8 text-center text-slate-400">
            No listings match your search. Try a different keyword or category.
          </p>
        )}
      </section>
    </main>
  );
}
