"use client";

import Link from "next/link";
import { useActionState } from "react";
import { signIn, signUp } from "@/app/actions/auth";

interface AuthFormProps {
  mode: "login" | "signup";
  confirmationFailed?: boolean;
}

export default function AuthForm({
  mode,
  confirmationFailed = false,
}: AuthFormProps) {
  const isSignUp = mode === "signup";
  const [state, formAction, isPending] = useActionState(
    isSignUp ? signUp : signIn,
    {
      error: confirmationFailed
        ? "Your confirmation link could not be verified. Try logging in or signing up again."
        : null,
      message: null,
    }
  );

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-16">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-[#18093E]/80 p-8 shadow-2xl shadow-black/20 sm:p-10">
        <Link href="/" className="text-sm font-semibold text-amber-400">
          WATsForFree
        </Link>
        <h1 className="mt-8 text-3xl font-semibold tracking-tight text-white">
          {isSignUp ? "Create your account" : "Welcome back"}
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-slate-400">
          {isSignUp
            ? "Sign up with your email to see free food, events, and campus finds."
            : "Log in to browse free food, events, and campus finds."}
        </p>

        <form action={formAction} className="mt-8 space-y-5">
          <div className="space-y-2">
            <label
              htmlFor={isSignUp ? "email" : "identifier"}
              className="text-sm font-medium text-slate-200"
            >
              {isSignUp ? "Email" : "Email or admin username"}
            </label>
            <input
              id={isSignUp ? "email" : "identifier"}
              name={isSignUp ? "email" : "identifier"}
              type={isSignUp ? "email" : "text"}
              autoComplete={isSignUp ? "email" : "username"}
              autoCapitalize="none"
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
              placeholder={isSignUp ? "you@example.com" : "you@example.com or admin"}
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-200"
            >
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete={isSignUp ? "new-password" : "current-password"}
              minLength={isSignUp ? 8 : undefined}
              required
              className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition focus:border-amber-400"
              placeholder={isSignUp ? "At least 8 characters" : "Your password"}
            />
          </div>

          {state.error && (
            <p role="alert" className="text-sm text-rose-300">
              {state.error}
            </p>
          )}
          {state.message && (
            <p role="status" className="text-sm text-emerald-300">
              {state.message}
            </p>
          )}

          <button
            type="submit"
            disabled={isPending}
            className="w-full rounded-xl bg-amber-400 px-4 py-3 font-semibold text-slate-950 transition hover:bg-amber-300 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending
              ? "Please wait..."
              : isSignUp
                ? "Sign up"
                : "Log in"}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-slate-400">
          {isSignUp ? "Already have an account?" : "New to WATsForFree?"}{" "}
          <Link
            href={isSignUp ? "/login" : "/signup"}
            className="font-medium text-amber-300 hover:text-amber-200"
          >
            {isSignUp ? "Log in" : "Sign up"}
          </Link>
        </p>
      </div>
    </main>
  );
}
