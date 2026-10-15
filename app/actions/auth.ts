"use server";

import { redirect } from "next/navigation";
import { getSupabasePublicConfig } from "@/lib/supabase/config";
import { createSupabaseServerClient } from "@/lib/supabase/server";

interface AuthFormState {
  error: string | null;
  message: string | null;
}

const emptyState: AuthFormState = { error: null, message: null };

function getCredentials(formData: FormData) {
  const email = formData.get("email");
  const password = formData.get("password");

  if (
    typeof email !== "string" ||
    !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim()) ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return null;
  }

  return { email: email.trim(), password };
}

function getLoginCredentials(formData: FormData) {
  const identifier = formData.get("identifier");
  const password = formData.get("password");

  if (
    typeof identifier !== "string" ||
    typeof password !== "string" ||
    password.length === 0
  ) {
    return null;
  }

  const email =
    identifier.trim().toLowerCase() === "admin"
      ? process.env.SUPABASE_ADMIN_EMAIL
      : identifier.trim();

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return null;
  }

  return { email, password };
}

export async function signIn(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  if (!getSupabasePublicConfig()) {
    return {
      ...emptyState,
      error:
        "Authentication is not configured yet. Add your Supabase URL and publishable key to .env.local.",
    };
  }

  const credentials = getLoginCredentials(formData);

  if (!credentials) {
    return {
      ...emptyState,
      error:
        "Enter a valid email and password. To use the admin username, configure SUPABASE_ADMIN_EMAIL.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signInWithPassword(credentials);

  if (error) {
    return { ...emptyState, error: "Email or password is incorrect." };
  }

  redirect("/listings");
}

export async function signUp(
  _previousState: AuthFormState,
  formData: FormData
): Promise<AuthFormState> {
  if (!getSupabasePublicConfig()) {
    return {
      ...emptyState,
      error:
        "Authentication is not configured yet. Add your Supabase URL and publishable key to .env.local.",
    };
  }

  const credentials = getCredentials(formData);

  if (!credentials) {
    return { ...emptyState, error: "Enter a valid email and password." };
  }

  if (credentials.password.length < 8) {
    return {
      ...emptyState,
      error: "Your password must be at least 8 characters long.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (!siteUrl) {
    return {
      ...emptyState,
      error: "Set NEXT_PUBLIC_SITE_URL in .env.local before creating accounts.",
    };
  }

  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.signUp({
    ...credentials,
    options: {
      emailRedirectTo: new URL(
        "/auth/callback?next=%2Flistings",
        siteUrl
      ).toString(),
    },
  });

  if (error) {
    return {
      ...emptyState,
      error: "Unable to create your account. Check your details and try again.",
    };
  }

  if (data.session) {
    redirect("/listings");
  }

  return {
    ...emptyState,
    message: "Check your inbox for a confirmation email, then log in.",
  };
}

export async function signOut() {
  const supabase = await createSupabaseServerClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    throw new Error(`Unable to sign out: ${error.message}`);
  }

  redirect("/login");
}
