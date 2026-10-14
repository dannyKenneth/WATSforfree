This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Supabase authentication

Authentication uses Supabase Auth with email and password. Copy `.env.example` to `.env.local` and fill in the project URL, publishable key, and site URL from your Supabase project. In the Supabase dashboard, configure the site URL and add `${NEXT_PUBLIC_SITE_URL}/auth/callback` to the allowed redirect URLs.

Enable email/password sign-in in Supabase Authentication settings. When email confirmation is enabled, new users must confirm the message sent to their inbox before logging in. After successful sign-up or login, users are sent to the protected `/listings` page.

For the `admin` username login alias, set `SUPABASE_ADMIN_EMAIL` to the email of a dedicated Supabase Auth user and create that user in **Authentication > Users**. Sign in with username `admin` and that account's Supabase password. Use a unique, strong password managed by Supabase; the username alias does not bypass authentication, and no password belongs in app code or environment variables.

To manage registered accounts, open **Authentication > Users** in the Supabase dashboard. The dashboard provides account emails and status; passwords are securely handled by Supabase and are never readable by the app owner. Do not add a Supabase service-role key to this application.

The free-item listings in `data/listings.json` were imported from the supplied spreadsheet. Events with dates before October 14, 2026 were omitted; verify event details and availability with each linked organizer before attending.
