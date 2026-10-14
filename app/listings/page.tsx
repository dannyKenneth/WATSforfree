import Link from "next/link";
import listingsData from "@/data/listings.json";
import { redirect } from "next/navigation";
import ListingsFeed from "@/components/ListingsFeed";
import type { Listing } from "@/lib/listings";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

const listings: Listing[] = listingsData;

export default async function ListingsPage() {
  if (!getSupabasePublicConfig()) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="max-w-lg rounded-2xl border border-white/10 bg-white/[0.03] p-8">
          <h1 className="text-2xl font-semibold text-white">
            Authentication setup required
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-slate-400">
            Add the Supabase project URL and publishable key to your local
            environment to sign in and view listings.
          </p>
          <Link
            href="/login"
            className="mt-6 inline-flex rounded-full bg-amber-400 px-5 py-2.5 text-sm font-semibold text-slate-950"
          >
            Go to log in
          </Link>
        </div>
      </main>
    );
  }

  const supabase = await createSupabaseServerClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return <ListingsFeed email={user.email ?? ""} listings={listings} />;
}
