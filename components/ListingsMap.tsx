"use client";

import { useEffect, useRef, useState } from "react";
import type { Listing, ListingCoordinates } from "@/lib/listings";

interface MappedListing extends Listing {
  coordinates: ListingCoordinates;
}

interface ListingsMapProps {
  listings: MappedListing[];
  userLocation: ListingCoordinates | null;
}

export default function ListingsMap({
  listings,
  userLocation,
}: ListingsMapProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mapError, setMapError] = useState(false);

  useEffect(() => {
    let isCancelled = false;
    let map: import("leaflet").Map | undefined;

    import("leaflet")
      .then((leaflet) => {
        if (isCancelled || !containerRef.current) {
          return;
        }

        map = leaflet
          .map(containerRef.current, { scrollWheelZoom: false })
          .setView([43.4702, -80.5452], 13);
        setMapError(false);
        leaflet
          .tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
            attribution:
              '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19,
          })
          .addTo(map);

        const markers = new Map<string, MappedListing[]>();
        for (const listing of listings) {
          const key = `${listing.coordinates.latitude},${listing.coordinates.longitude}`;
          markers.set(key, [...(markers.get(key) ?? []), listing]);
        }

        const bounds: [number, number][] = [];
        for (const group of markers.values()) {
          const { latitude, longitude } = group[0].coordinates;
          bounds.push([latitude, longitude]);

          const popup = document.createElement("div");
          const heading = document.createElement("strong");
          heading.textContent = group[0].location;
          popup.append(heading);

          for (const listing of group) {
            const item = document.createElement("p");
            item.className = "my-2";
            const title = document.createElement("span");
            title.textContent = listing.event;
            item.append(title);

            const directions = document.createElement("a");
            directions.href = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(listing.location)}`;
            directions.target = "_blank";
            directions.rel = "noopener noreferrer";
            directions.className = "mt-1 block text-amber-700 underline";
            directions.textContent = "Open in Google Maps";
            item.append(directions);
            popup.append(item);
          }

          leaflet
            .marker([latitude, longitude], {
              icon: leaflet.divIcon({
                className: "listing-map-pin",
                html: `<span>${group.length}</span>`,
                iconSize: [34, 34],
                iconAnchor: [17, 17],
              }),
            })
            .bindPopup(popup)
            .addTo(map);
        }

        if (userLocation) {
          const userPoint: [number, number] = [
            userLocation.latitude,
            userLocation.longitude,
          ];
          leaflet
            .circleMarker(userPoint, {
              radius: 8,
              color: "#ffffff",
              weight: 3,
              fillColor: "#2563eb",
              fillOpacity: 1,
            })
            .bindPopup("Your location (only visible in your browser)")
            .addTo(map);
        }

        if (bounds.length > 1) {
          map.fitBounds(bounds, { padding: [28, 28], maxZoom: 14 });
        } else if (bounds.length === 1) {
          map.setView(bounds[0], 14);
        }
        window.setTimeout(() => map?.invalidateSize(), 0);
      })
      .catch((error: unknown) => {
        console.error("Unable to load the event map.", error);
        if (!isCancelled) {
          setMapError(true);
        }
      });

    return () => {
      isCancelled = true;
      map?.remove();
    };
  }, [listings, userLocation]);

  return (
    <>
      <div
        ref={containerRef}
        className="h-[320px] w-full overflow-hidden rounded-2xl sm:h-[400px]"
        aria-label="Map of upcoming event locations"
      />
      {mapError && (
        <p role="alert" className="mt-3 text-sm text-rose-300">
          The event map could not be loaded. Event listings and Google Maps
          directions are still available below.
        </p>
      )}
    </>
  );
}
