import { NextResponse, type NextRequest } from "next/server";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get("code");
  const next = request.nextUrl.searchParams.get("next");
  const requestedDestination = new URL(next ?? "/listings", request.url);
  const destination =
    requestedDestination.origin === request.nextUrl.origin
      ? requestedDestination
      : new URL("/listings", request.url);
  const config = getSupabasePublicConfig();

  if (code && config) {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);

    if (!error) {
      return NextResponse.redirect(destination);
    }
  }

  return NextResponse.redirect(
    new URL("/login?confirmation=failed", request.url)
  );
}
