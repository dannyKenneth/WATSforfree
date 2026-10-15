"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { signOut } from "@/app/actions/auth";
import ListingsMap from "@/components/ListingsMap";
import {
  formatOccurrence,
  getListingCoordinates,
  getListingTags,
  getListingYear,
  getNextOccurrence,
  type Listing,
  type ListingCoordinates,
} from "@/lib/listings";

interface ListingsFeedProps {
  email: string;
  listings: Listing[];
}

const filters = [
  { id: "all", label: "All listings" },
  { id: "food", label: "Food & drink" },
  { id: "other", label: "Merch / supplies" },
] as const;

function getLocalDateKey(date: Date) {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function getDistanceMeters(
  origin: ListingCoordinates,
  destination: ListingCoordinates
) {
  const earthRadiusMeters = 6_371_000;
  const toRadians = (degrees: number) => (degrees * Math.PI) / 180;
  const latitudeDifference = toRadians(
    destination.latitude - origin.latitude
  );
  const longitudeDifference = toRadians(
    destination.longitude - origin.longitude
  );
  const haversine =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(toRadians(origin.latitude)) *
      Math.cos(toRadians(destination.latitude)) *
      Math.sin(longitudeDifference / 2) ** 2;

  return 2 * earthRadiusMeters * Math.asin(Math.sqrt(haversine));
}

function formatDistance(distanceMeters: number) {
  return distanceMeters < 1000
    ? `${Math.round(distanceMeters)} m away`
    : `${(distanceMeters / 1000).toFixed(1)} km away`;
}

export default function ListingsFeed({ email, listings }: ListingsFeedProps) {
  const [activeFilter, setActiveFilter] =
    useState<(typeof filters)[number]["id"]>("all");
  const [search, setSearch] = useState("");
  const [today, setToday] = useState(() => getLocalDateKey(new Date()));
  const [userLocation, setUserLocation] =
    useState<ListingCoordinates | null>(null);
  const listingYear = useMemo(() => getListingYear(listings), [listings]);

  useEffect(() => {
    const updateDate = () => {
      const currentDate = getLocalDateKey(new Date());
      setToday((previousDate) =>
        previousDate === currentDate ? previousDate : currentDate
      );
    };
    const interval = window.setInterval(updateDate, 60_000);

    return () => window.clearInterval(interval);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        ({ coords }) => {
          setUserLocation({
            latitude: coords.latitude,
            longitude: coords.longitude,
          });
        },
        undefined,
        { enableHighAccuracy: false, maximumAge: 300_000, timeout: 10_000 }
      );
    }
  }, []);

  const upcomingListings = useMemo(
    () =>
      listings.flatMap((listing) => {
        const nextOccurrence = getNextOccurrence(
          listing.date,
          today,
          listingYear
        );

        if (!nextOccurrence) {
          return [];
        }

        const coordinates = getListingCoordinates(listing.location);

        return [
          {
            ...listing,
            coordinates,
            nextOccurrence,
            displayDate: formatOccurrence(
              listing.date,
              nextOccurrence,
              /\bEvery\s+(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i.test(
                listing.date
              )
            ),
            distanceMeters: userLocation
              ? getDistanceMeters(userLocation, coordinates)
              : null,
          },
        ];
      }),
    [listings, listingYear, today, userLocation]
  );

  const visibleListings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return upcomingListings
      .filter((listing) => {
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
          listing.displayDate,
          listing.event,
          listing.description,
        ]
          .join(" ")
          .toLowerCase()
          .includes(query);

      return matchesFilter && matchesSearch;
      })
      .sort((left, right) => {
        const dateDifference =
          left.nextOccurrence.getTime() - right.nextOccurrence.getTime();
        if (dateDifference !== 0) {
          return dateDifference;
        }

        return (
          (left.distanceMeters ?? Number.POSITIVE_INFINITY) -
            (right.distanceMeters ?? Number.POSITIVE_INFINITY) || 0
        );
      });
  }, [activeFilter, upcomingListings, search]);

  const mappedListings = useMemo(
    () =>
      [...upcomingListings].sort(
        (left, right) =>
          (left.distanceMeters ?? Number.POSITIVE_INFINITY) -
          (right.distanceMeters ?? Number.POSITIVE_INFINITY)
      ),
    [upcomingListings]
  );

  return (
    <main className="mx-auto min-h-screen w-full max-w-6xl px-6 pb-16 pt-10">
      <header className="flex flex-wrap items-center justify-between gap-4 border-b border-white/10 pb-6">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-lg font-bold text-amber-400"
        >
          <Image
            src="/logo.png"
            alt=""
            width={40}
            height={40}
            className="rounded-full"
          />
          <span>WATsForFree</span>
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

      <section className="py-10">
        <h1 className="text-4xl font-semibold tracking-tight text-white sm:text-5xl">
          Free stuff on campus
        </h1>
        <p className="mt-4 max-w-2xl text-slate-400">
          Find free food, events, supplies, and more. Check the organizer&apos;s
          page for the latest details before heading out.
        </p>
      </section>

      <section className="pb-10" aria-labelledby="nearby-events-heading">
        <h2
          id="nearby-events-heading"
          className="mb-4 text-2xl font-semibold text-white"
        >
          Find nearby events with free stuff
        </h2>
        <ListingsMap listings={mappedListings} userLocation={userLocation} />
        <p className="mt-3 text-sm text-slate-400">
          Pins show the venue or campus area.
        </p>
        <p className="mt-1 text-xs text-slate-500">
          © OpenStreetMap contributors.
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
                id={`listing-${listing.id}`}
                className="flex flex-col rounded-2xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-amber-400/30"
              >
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1 text-xs font-medium text-amber-200">
                    {listing.category}
                  </span>
                  <span className="text-sm font-semibold text-white">
                    {listing.displayDate}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-2" aria-label="Listing details">
                  {getListingTags(listing).map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-xs text-slate-300"
                    >
                      {tag}
                    </span>
                  ))}
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
                {listing.conditions && (
                  <p className="mt-3 text-sm text-slate-300">
                    <span className="font-medium text-slate-200">
                      Conditions:{" "}
                    </span>
                    {listing.conditions}
                  </p>
                )}
                {listing.verificationStatus && (
                  <p className="mt-2 text-xs text-slate-500">
                    Status: {listing.verificationStatus}
                  </p>
                )}
                <p className="mt-5 border-t border-white/10 pt-4 text-sm text-slate-300">
                  {listing.location}
                </p>
                {listing.distanceMeters !== null && (
                  <p className="mt-2 text-sm font-medium text-amber-200">
                    {formatDistance(listing.distanceMeters)}
                  </p>
                )}
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(listing.location)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 inline-flex w-fit items-center gap-1 text-sm font-medium text-amber-300 hover:text-amber-200"
                >
                  Open in Google Maps
                </a>
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
