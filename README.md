# Blackroad

**A full-stack travel discovery and booking platform built with Next.js, TypeScript, Prisma, and PostgreSQL.**

Blackroad is a portfolio project focused on building a practical travel-booking experience: exploring tours, narrowing down destinations, managing an account, and moving from tour selection toward booking and payment. It combines a responsive user interface with database-backed features and third-party services.

> **Project status:** MVP / active development. The application is being prepared for a live portfolio demonstration. Booking and payment functionality should be treated as work in progress until the full deployed flow has been verified. Use Stripe test mode for demonstrations.

## Live demo

- **Website:** [https://blackroad-eight.vercel.app](https://blackroad-eight.vercel.app)
- **Source code:** [github.com/summermoved0n/project-Blackroad](https://github.com/summermoved0n/project-Blackroad)

## Features

### Explore tours
- Browse the tour catalog and view individual tour pages.
- Filter and sort tours using available search criteria.
- Explore tour details, departure dates, descriptions, and reviews.
- Browse a responsive interface designed for desktop and mobile devices.

### Account experience
- Register an account and confirm the email address.
- Sign in and sign out.
- Access account and profile pages.
- Save tours to favorites and review booking history.
- Use password recovery and profile management flows.

### Booking and communications
- Select departure details and submit booking information.
- Integrate a Stripe-based payment flow (**test mode recommended; end-to-end deployment verification pending**).
- Subscribe to a newsletter with email confirmation.
- Send transactional emails through Resend.

> **Verification note:** A successful production build and basic route checks do not establish that every third-party flow works end to end. Registration, email delivery, booking, and payment should be tested on the actual deployment before a live demonstration.

## Technology stack

| Layer | Technologies |
| --- | --- |
| Application | Next.js 16 (App Router), React 19, TypeScript |
| Styling | Tailwind CSS 4, responsive UI components |
| Database | PostgreSQL, Prisma ORM 7, `@prisma/adapter-pg` |
| Authentication | JWT-based authentication, password hashing with bcrypt |
| Forms and validation | React Hook Form, Zod |
| Payments | Stripe, Stripe.js, React Stripe.js |
| Email | Resend, React Email |
| Additional UI | Embla Carousel, React Day Picker, React Hot Toast |
| Deployment target | Vercel |

## Project structure

The Next.js application lives in **`my-app/`** rather than the repository root.

```text
project-Blackroad/
└── my-app/
    ├── prisma/          # Database schema, migrations, seed data
    ├── src/
    │   ├── app/         # App Router pages, layouts, and API routes
    │   ├── components/  # Shared UI components
    │   ├── emails/      # Transactional email templates
    │   ├── hooks/       # React hooks
    │   ├── lib/         # Database, integrations, services, repositories
    │   └── types/       # TypeScript types
    ├── public/          # Static assets
    ├── .env.example     # Environment-variable names
    └── package.json
```

## Getting started

**Prerequisites:** Node.js compatible with Next.js 16, npm, and a PostgreSQL database.

```bash
git clone https://github.com/summermoved0n/project-Blackroad.git
cd project-Blackroad/my-app
npm ci
```

Create a local environment file:

```bash
cp .env.example .env.local
```

On Windows, you can copy `.env.example` to `.env.local` manually.

Fill in the values described below. Never commit `.env.local`, production credentials, or real customer data.

Generate Prisma Client and validate the schema:

```bash
npx prisma generate
npx prisma validate
```

Make sure the target PostgreSQL database has the expected schema before running the app. For a **new, disposable development database**, apply the repository's reviewed migrations using the appropriate Prisma migration workflow. Do **not** reset or migrate a database containing real data without a backup and review.

Start the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Refer to [`my-app/.env.example`](./.env.example) for the current variable names.

| Variable | Purpose |
| --- | --- |
| `DATABASE_URL` | PostgreSQL connection string |
| `JWT_SECRET` | Secret used to sign and verify authentication tokens |
| `RESEND_API_KEY` | Resend API key |
| `RESEND_EMAIL_FROM` | Verified sender address for application emails |
| `BASE_URL` | Public application origin, used for links in emails |
| `STRIPE_SECRET_KEY` | Server-side Stripe secret key |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Browser-safe Stripe publishable key |
| `STRIPE_WEBHOOK_SECRET` | Stripe webhook signature secret |
| `SEED_USER_PASSWORD` | Password for seed/demo users, when running the seed process |

For local testing, `BASE_URL` typically points to `http://localhost:3000`. For Vercel, set it to the exact deployed origin, without a path. Stripe test credentials should be used for portfolio demonstrations.

## Quality checks

Run these checks from `my-app/`:

```bash
npm run lint
npx tsc --noEmit
npx prisma validate
npm run build
```

A passing local build is a prerequisite, **not** a guarantee that external services will work after deployment.

## Deploying to Vercel

1. Import the GitHub repository into Vercel.
2. Set **Root Directory** to `my-app` and select the Next.js framework preset.
3. Configure the necessary environment variables in the Vercel project settings.
4. Connect the deployment to the intended PostgreSQL database and ensure its migrations are correctly applied.
5. Confirm Prisma Client generation succeeds during the build.
6. Deploy, then smoke-test the live site using non-sensitive demo data.
7. Confirm Resend sender-domain verification and Stripe webhook settings before testing email and payment flows.

Avoid real payments during a portfolio demonstration.

## Suggested demo walkthrough

1. Open the homepage and navigate to the tour catalog.
2. Apply a filter and open a tour details page.
3. Register or sign in using a prepared test account.
4. Visit the profile and add/remove a favorite tour.
5. Show the booking form and booking history.
6. Demonstrate newsletter subscription if email delivery has been verified.
7. Demonstrate a payment **only** if the Stripe test flow has been successfully verified on the deployed site.

## Current limitations and next steps

- Complete live end-to-end verification of registration, email links, favorites, newsletter, bookings, and payments on Vercel.
- Continue improving resilience of booking and payment operations before accepting real transactions.
- Expand automated integration and end-to-end test coverage.
- Document and address remaining deployment-specific issues discovered in live testing.

## Author

Developed by [summermoved0n](https://github.com/summermoved0n) as a full-stack portfolio project.
