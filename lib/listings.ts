export interface Listing {
  id: string;
  title: string;
  category: string;
  location: string;
  date: string;
  event: string;
  description: string;
  source: string;
  sourceUrl: string | null;
  eligibility?: string;
  conditions?: string;
  verificationStatus?: string;
}

const monthNumbers: Record<string, number> = {
  jan: 0,
  feb: 1,
  mar: 2,
  apr: 3,
  may: 4,
  jun: 5,
  jul: 6,
  aug: 7,
  sep: 8,
  oct: 9,
  nov: 10,
  dec: 11,
};

const weekdays: Record<string, number> = {
  sunday: 0,
  monday: 1,
  tuesday: 2,
  wednesday: 3,
  thursday: 4,
  friday: 5,
  saturday: 6,
};

const monthPattern =
  "Jan(?:uary)?|Feb(?:ruary)?|Mar(?:ch)?|Apr(?:il)?|May|Jun(?:e)?|Jul(?:y)?|Aug(?:ust)?|Sep(?:t(?:ember)?)?|Oct(?:ober)?|Nov(?:ember)?|Dec(?:ember)?";

export function getListingYear(listings: Listing[]) {
  for (const listing of listings) {
    const year = listing.date.match(/\b(20\d{2})\b/);
    if (year) {
      return Number(year[1]);
    }
  }

  return new Date().getFullYear();
}

function makeUtcDate(year: number, month: number, day: number) {
  return new Date(Date.UTC(year, month, day));
}

function getDateRange(dateText: string, defaultYear: number) {
  const range = dateText.match(
    new RegExp(
      `\\b(${monthPattern})\\s+(\\d{1,2})\\s*[–-]\\s*(?:(${monthPattern})\\s+)?(\\d{1,2})(?:,?\\s+(20\\d{2}))?`,
      "i"
    )
  );

  if (!range) {
    return null;
  }

  const startMonth = monthNumbers[range[1].slice(0, 3).toLowerCase()];
  const endMonth = range[3]
    ? monthNumbers[range[3].slice(0, 3).toLowerCase()]
    : startMonth;
  const year = Number(range[5] ?? defaultYear);

  return {
    start: makeUtcDate(year, startMonth, Number(range[2])),
    end: makeUtcDate(year, endMonth, Number(range[4])),
  };
}

function getExcludedDates(dateText: string, year: number) {
  const excluded: string[] = [];
  const exclusion = dateText.match(/\bexcluding\s+(.+)$/i);

  if (!exclusion) {
    return excluded;
  }

  const datePattern = new RegExp(
    `(${monthPattern})\\s+(\\d{1,2})`,
    "gi"
  );

  for (const match of exclusion[1].matchAll(datePattern)) {
    excluded.push(
      makeUtcDate(
        year,
        monthNumbers[match[1].slice(0, 3).toLowerCase()],
        Number(match[2])
      )
        .toISOString()
        .slice(0, 10)
    );
  }

  return excluded;
}

export function getNextOccurrence(
  dateText: string,
  today: string,
  defaultYear: number
) {
  const todayDate = new Date(`${today}T00:00:00.000Z`);
  const recurring = dateText.match(/\bEvery\s+(Sunday|Monday|Tuesday|Wednesday|Thursday|Friday|Saturday)\b/i);

  if (recurring) {
    const range = getDateRange(dateText, defaultYear);
    const start = range?.start ?? todayDate;
    const end = range?.end;

    if (end && end < todayDate) {
      return null;
    }

    const firstDay = start > todayDate ? start : todayDate;
    const weekday = weekdays[recurring[1].toLowerCase()];
    const daysUntilOccurrence =
      (weekday - firstDay.getUTCDay() + 7) % 7;
    const occurrence = new Date(firstDay);
    occurrence.setUTCDate(occurrence.getUTCDate() + daysUntilOccurrence);

    if (end && occurrence > end) {
      return null;
    }

    const excludedDates = getExcludedDates(dateText, defaultYear);
    while (excludedDates.includes(occurrence.toISOString().slice(0, 10))) {
      occurrence.setUTCDate(occurrence.getUTCDate() + 7);
      if (end && occurrence > end) {
        return null;
      }
    }

    return occurrence;
  }

  const datePattern = new RegExp(
    `\\b(${monthPattern})\\s+(\\d{1,2})(?:\\s*[–-]\\s*(?:(?:(${monthPattern})\\s+)?(\\d{1,2})))?`,
    "gi"
  );
  const yearMatch = dateText.match(/\b(20\d{2})\b/);
  const year = Number(yearMatch?.[1] ?? defaultYear);
  const occurrences: Date[] = [];

  for (const match of dateText.matchAll(datePattern)) {
    const month = monthNumbers[match[1].slice(0, 3).toLowerCase()];
    const startDay = Number(match[2]);
    const endMonth = match[3]
      ? monthNumbers[match[3].slice(0, 3).toLowerCase()]
      : month;
    const endDay = Number(match[4] ?? startDay);
    const start = makeUtcDate(year, month, startDay);
    const end = makeUtcDate(year, endMonth, endDay);

    for (
      const occurrence = new Date(start);
      occurrence <= end;
      occurrence.setUTCDate(occurrence.getUTCDate() + 1)
    ) {
      occurrences.push(new Date(occurrence));
    }

    let trailing = dateText.slice(match.index! + match[0].length);
    while (true) {
      const extraDay = trailing.match(/^\s*,\s*(\d{1,2})(?=\s*(?:,|;|$))/);
      if (!extraDay) {
        break;
      }

      occurrences.push(makeUtcDate(year, month, Number(extraDay[1])));
      trailing = trailing.slice(extraDay[0].length);
    }
  }

  return (
    occurrences
      .filter((occurrence) => occurrence >= todayDate)
      .sort((left, right) => left.getTime() - right.getTime())[0] ?? null
  );
}

export function formatOccurrence(
  dateText: string,
  occurrence: Date,
  isRecurring: boolean
) {
  if (isRecurring) {
    return dateText;
  }

  const date = new Intl.DateTimeFormat("en-CA", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(occurrence);
  const time = dateText.match(
    /(?:,|;)\s*((?:noon|\d{1,2}(?::\d{2})?\s*(?:AM|PM)?)(?:\s*[–-]\s*(?:noon|\d{1,2}(?::\d{2})?\s*(?:AM|PM)?))?\s*(?:AM|PM)?)\s*$/i
  );

  return `Next: ${date}${time ? ` · ${time[1].trim()}` : ""}`;
}

export function getListingTags(listing: Listing) {
  const tags = listing.category
    .split(/\s*\/\s*/)
    .map((category) => category.trim())
    .filter(Boolean);
  const eligibility = listing.eligibility ?? "";
  const age = `${eligibility} ${listing.description}`.match(
    /\b(?:aged?\s+)?(\d{1,2})\s*[–-]\s*(\d{1,2})\b/i
  );

  if (/all ages/i.test(listing.description)) {
    tags.push("Age: all ages");
  } else if (age) {
    tags.push(`Age: ${age[1]}–${age[2]}`);
  }

  if (eligibility) {
    const audience = eligibility
      .replace(/,?\s*ages?\s+\d{1,2}\s*[–-]\s*\d{1,2}/i, "")
      .trim()
      .replace(/[;,/]\s*$/, "");
    if (audience) {
      tags.push(`Audience: ${audience}`);
    }
  } else {
    const audienceMatch = listing.description.match(
      /(?:open to|for|limited to)\s+([^.;]+)/i
    );
    if (audienceMatch) {
      const audience = audienceMatch[1].trim();
      if (!/students and visitors|all students/i.test(audience)) {
        tags.push(`Audience: ${audience}`);
      }
    }
  }

  return tags;
}

export interface ListingCoordinates {
  latitude: number;
  longitude: number;
}

export function getListingCoordinates(location: string): ListingCoordinates {
  if (/Renison/i.test(location)) {
    return { latitude: 43.4689267, longitude: -80.5477709 };
  }
  if (/Martin Luther University College/i.test(location)) {
    return { latitude: 43.4720557, longitude: -80.5287585 };
  }
  if (/Kitchener City Hall/i.test(location)) {
    return { latitude: 43.4516223, longitude: -80.4921882 };
  }
  if (/187 King St S/i.test(location)) {
    return { latitude: 43.4598805, longitude: -80.5187561 };
  }
  if (/Uptown Waterloo/i.test(location)) {
    return { latitude: 43.463, longitude: -80.521 };
  }
  if (/Davis Centre|, DC\b/i.test(location)) {
    return { latitude: 43.4722101, longitude: -80.541051 };
  }
  if (/\bSCH\b/i.test(location)) {
    return { latitude: 43.4694275, longitude: -80.5462343 };
  }
  if (/\bSLC\b/i.test(location)) {
    return { latitude: 43.4713308, longitude: -80.5454297 };
  }

  return { latitude: 43.4701994, longitude: -80.5452429 };
}
