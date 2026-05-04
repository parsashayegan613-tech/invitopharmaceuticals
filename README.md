# InVitvo Pharmaceuticals Website

Next.js marketing and RFQ site for InVitvo Pharmaceuticals Ltd.

## Local Setup

```sh
npm install
cp .env.example .env
npm run dev
```

Open `http://localhost:3000`.

## Required Environment Variables

Server-only variables. Set these in Vercel for Production only unless a separate Preview Supabase project is configured.

```env
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_ROLE_KEY=
RESEND_API_KEY=
RFQ_NOTIFY_EMAIL=info@invitvo.com
```

Public browser variables. These are safe to expose.

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
```

## Database

Apply Supabase migrations before deploying code that depends on new columns.

```sh
# Supabase CLI, when installed and authenticated
supabase db push
```

The RFQ and contact forms submit through Next.js route handlers:

- `POST /api/rfq`
- `POST /api/contact`

Do not re-enable browser-side Supabase inserts for public forms.

## Verification

```sh
npm run lint
npm run build
npm audit --audit-level=moderate
```

After deploying:

1. Submit a test RFQ from `/order?product=terrein&quantity=5mg`.
2. Confirm the row appears in Supabase `orders`.
3. Confirm the internal RFQ email arrives at `RFQ_NOTIFY_EMAIL`.
4. Confirm the customer confirmation email arrives.
5. Submit a test contact form and confirm the internal notification arrives.

## Deployment

The site is deployed on Vercel. Production should use the canonical host:

```txt
https://www.invitvo.com
```

Keep these operational checks outside the repo:

- Microsoft 365 DKIM enabled.
- SPF and DMARC DNS records current.
- Resend domain verified.
- Updated sitemap submitted in Google Search Console.
- Production secrets restricted from Preview deployments unless Preview uses separate data.
