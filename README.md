# 🤖 Formify.ai — AI-Powered Form Builder SaaS

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/singhayush007/AI_FORM_GENERATOR?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/singhayush007/AI_FORM_GENERATOR?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/singhayush007/AI_FORM_GENERATOR?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Stack-Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)

**A production-ready full-stack AI-powered Form Builder SaaS using Next.js 15, Groq AI (Llama 3.3), Supabase, Clerk Auth, and Razorpay.**

[🌐 Live Demo](https://ai-fullstack-form-generator.vercel.app) · [🐛 Report Bug](https://github.com/singhayush007/AI_FORM_GENERATOR/issues) · [✨ Request Feature](https://github.com/singhayush007/AI_FORM_GENERATOR/issues)

</div>

---

## 📸 Screenshot

<div align="center">
  <img src="/public/ai-form-generator.png" alt="Formify.ai Screenshot" width="100%" style="border-radius: 12px; border: 1px solid #e5e7eb;" />
</div>

---

## 📋 Table of Contents

- [About](#-about)
- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Folder Structure](#️-folder-structure)
- [Getting Started](#-getting-started)
- [Environment Variables](#-environment-variables)
- [Running the App](#️-running-the-app)
- [Deployment](#️-deployment)
- [Contributing](#-contributing)
- [License](#-license)

---

## 🧠 About

**Formify.ai** is a SaaS platform that lets you build professional forms in seconds by simply describing what you need in plain English. The AI (Groq's Llama 3.3-70B) generates complete forms with proper field types, validation, and smart dropdowns — no coding required.

Once generated, you can publish your form with a single click, share the unique link, and collect responses from anyone — no login required to fill.

---

## ✨ Features

- 🤖 **AI Form Generation** — Describe your form, Groq Llama 3.3 generates it instantly
- 🎯 **Smart Field Types** — Auto-detects email, phone, file upload, dropdowns, date pickers
- 📋 **Form Management** — Create, edit, publish, delete forms from a beautiful dashboard
- 🔒 **Auth via Clerk** — Secure sign-in/sign-up with social auth support
- 📊 **Analytics Dashboard** — Track total forms, submissions, published vs drafts
- 💳 **Razorpay Payments** — Integrated payment flow for Pro/Enterprise plans
- 🌐 **Public Form Links** — Shareable URLs work on Vercel (dynamic origin resolution)
- 🌙 **Dark Mode** — Full dark/light mode with `next-themes`
- ✅ **Form Validation** — Formik + Yup validation on all generated forms
- 📱 **Responsive** — Works across all screen sizes

---

## 🛠 Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript |
| AI | Groq API (llama-3.3-70b-versatile) |
| Auth | Clerk v7 |
| Database | Supabase (PostgreSQL) |
| ORM | Prisma v6 |
| Styling | Tailwind CSS v4 |
| UI Components | shadcn/ui (Radix UI) |
| Form Validation | Formik + Yup |
| Payments | Razorpay |
| Dark Mode | next-themes |
| Notifications | react-hot-toast, sonner |
| Icons | lucide-react |
| Deployment | Vercel |

---

## 🗂️ Folder Structure

```
ai_form_generator/
│
├── app/                                         # Next.js App Router — routing ONLY, no business logic
│   ├── (auth)/                                  # Clerk auth routes (sign-in, sign-up)
│   ├── (home)/                                  # Landing page + public layout
│   │   ├── layout.tsx                           # Nav with conditional auth buttons
│   │   └── page.tsx                             # Landing page (Hero + Pricing + Footer)
│   ├── dashboard/                               # Protected dashboard routes
│   │   ├── page.tsx                             # Dashboard home (stats + recent forms)
│   │   ├── layout.tsx                           # Dashboard layout (Sidebar + Header)
│   │   ├── analytics/page.tsx                   # Analytics overview
│   │   ├── upgrade/page.tsx                     # Plans & pricing page
│   │   └── forms/
│   │       ├── page.tsx                         # My Forms list
│   │       ├── [formId]/page.tsx                # Form detail view
│   │       ├── [formId]/submissions/page.tsx    # All submissions for a form
│   │       └── edit/[formId]/page.tsx           # Form edit/publish page
│   ├── forms/[formId]/page.tsx                  # Public shareable form fill page
│   ├── api/razorpay/route.ts                    # Razorpay order creation API
│   ├── success/page.tsx                         # Post-submit/payment success page
│   ├── not-found.tsx
│   └── layout.tsx                               # Root layout (Clerk, ThemeProvider, Toasters)
│
├── features/                                    # 🏗️ Feature-based domain modules (colocated)
│   │
│   ├── forms/                                   # Everything related to AI form management
│   │   ├── actions/                             # Next.js Server Actions
│   │   │   ├── generateForm.ts                  # Groq AI form generation
│   │   │   ├── submitForm.ts                    # Form response submission
│   │   │   ├── publishForm.ts                   # Publish form (make live)
│   │   │   ├── deleteForm.ts                    # Delete form + its submissions
│   │   │   ├── getForms.ts                      # Fetch all forms for current user
│   │   │   ├── getFormById.ts                   # Fetch single form (replaces direct prisma)
│   │   │   ├── getFormSubmissions.ts            # Fetch submissions for a form
│   │   │   └── index.ts                         # Barrel export
│   │   ├── components/                          # Pure UI — views only
│   │   │   ├── AiGeneratedForm.tsx              # Dynamic form renderer (consumes hooks/utils)
│   │   │   ├── FormFieldInput.tsx               # Renders correct input per field type
│   │   │   ├── FileUploadField.tsx              # File upload input UI
│   │   │   ├── InlineFieldError.tsx             # Inline validation error message
│   │   │   ├── FormSubmitButton.tsx             # Submit / Publish button
│   │   │   ├── FormList.tsx                     # Form card (uses FormStatusBadge + DeleteFormDialog)
│   │   │   ├── FormStatusBadge.tsx              # Live / Draft badge
│   │   │   ├── DeleteFormDialog.tsx             # Delete confirmation alert dialog
│   │   │   ├── FormPublishDialog.tsx            # Post-publish share link dialog (uses useShareLink)
│   │   │   ├── CreateFormDialog.tsx             # Reusable AI form creation dialog
│   │   │   ├── GenerateFormInput.tsx            # AI prompt input (uses GenerateButton)
│   │   │   ├── GenerateButton.tsx               # Generate / Upgrade locked button
│   │   │   └── CopyButton.tsx                   # Clipboard copy button (uses useClipboard)
│   │   ├── hooks/                               # All client-side logic lives here
│   │   │   ├── useFormGenerate.ts               # AI generation — Formik + action call
│   │   │   ├── useFormPublish.ts                # Publish flow — loading + dialog state
│   │   │   ├── useFormSubmit.ts                 # Submission — dynamic Yup schema + Formik
│   │   │   ├── useShareLink.ts                  # Share URL resolver + clipboard + toast
│   │   │   └── useClipboard.ts                  # Clipboard copy with copied state / auto-reset
│   │   ├── types/
│   │   │   └── index.ts                         # Fields, FormContent, Form TypeScript types
│   │   ├── utils/
│   │   │   ├── fieldHelpers.ts                  # getFieldType, getDefaultOptions, buildFieldValidator
│   │   │   └── formUtils.ts                     # parseFormContent, getFormTitle, getFormFieldCount, formatDate
│   │   └── index.ts                             # Feature barrel export
│   │
│   ├── dashboard/                               # Dashboard stats & navigation
│   │   ├── actions/
│   │   │   ├── formStats.ts                     # Aggregate stats (total, published, drafts, submissions)
│   │   │   └── index.ts
│   │   ├── components/                          # Pure UI views
│   │   │   ├── Analytics.tsx                    # Analytics page (uses MetricCard + ConversionRateBanner)
│   │   │   ├── MetricCard.tsx                   # Individual stat card
│   │   │   ├── ConversionRateBanner.tsx         # Conversion rate gradient banner
│   │   │   ├── Sidebar.tsx                      # Desktop sidebar (uses NavItem + NAV_ITEMS)
│   │   │   ├── MobileNav.tsx                    # Mobile Sheet drawer nav (uses NavItem + NAV_ITEMS)
│   │   │   ├── NavItem.tsx                      # Shared nav link with active state
│   │   │   ├── Header.tsx                       # Dashboard topbar (uses useBreadcrumb)
│   │   │   ├── UpgradeButton.tsx                # Free-tier usage progress bar (server component)
│   │   │   └── SubmissionsDetails.tsx           # Submission Q&A table
│   │   ├── hooks/
│   │   │   └── useBreadcrumb.ts                 # Resolves route pathname → human-readable label
│   │   ├── constants/
│   │   │   └── navItems.ts                      # Shared NAV_ITEMS array (used by Sidebar + MobileNav)
│   │   └── index.ts
│   │
│   ├── billing/                                 # Pricing & payments
│   │   ├── actions/
│   │   │   ├── userSubscription.ts              # Create & verify user subscription
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── PricingPage.tsx                  # Grid of pricing cards + Razorpay checkout
│   │   │   ├── PricingCard.tsx                  # Individual plan card (uses PricingFeatureItem)
│   │   │   └── PricingFeatureItem.tsx           # Single feature row with check icon
│   │   └── index.ts
│   │
│   └── landing/                                 # Public marketing pages
│       ├── components/
│       │   ├── HeroSection.tsx                  # Hero (uses HeroBackground + HeroStats + sub-components)
│       │   ├── HeroBackground.tsx               # Animated blobs + grid overlay
│       │   ├── HeroStats.tsx                    # 10x / 100% / Free stat row
│       │   ├── SuggestionButtons.tsx            # Quick-fill prompt suggestion pills
│       │   ├── TrustBadges.tsx                  # Zap / Shield / BarChart trust indicators
│       │   └── Footer.tsx                       # Footer with brand + newsletter
│       └── index.ts
│
├── components/                                  # ✅ Truly shared, cross-feature UI
│   ├── ui/                                      # shadcn/ui primitives (Button, Card, Dialog…)
│   ├── DarkMode.tsx                             # Direct dark/light toggle (no dropdown)
│   ├── Logo.tsx                                 # Brand gradient wordmark
│   └── theme-provider.tsx                       # next-themes ThemeProvider wrapper
│
├── lib/                                         # Shared singletons & config
│   ├── prisma.ts                                # Prisma client singleton (prevents hot-reload issues)
│   ├── utils.ts                                 # cn() helper + MAX_FREE_FORM constant
│   └── pricingplan.ts                           # Pricing plan config (Free / Pro / Enterprise)
│
├── types/
│   └── form.ts                                  # Re-export shim → features/forms/types
│
├── prisma/
│   └── schema.prisma                            # DB schema (Form, Submissions, Subscription models)
│
├── public/
│   └── ai-form-generator.png                    # App screenshot used in README + favicon
│
├── .env                                         # Local secrets (not committed)
├── .env.example                                 # Environment variable template (committed)
├── .npmrc                                       # legacy-peer-deps=true (for Vercel compatibility)
├── next.config.ts
├── tailwind.config.js
└── tsconfig.json
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm
- A [Supabase](https://supabase.com) project (PostgreSQL)
- A [Clerk](https://clerk.com) account
- A [Groq](https://console.groq.com) API key
- A [Razorpay](https://razorpay.com) account (for payments)

### 1. Clone the repository

```bash
git clone https://github.com/singhayush007/AI_FORM_GENERATOR.git
cd AI_FORM_GENERATOR
```

### 2. Install dependencies

```bash
npm install --legacy-peer-deps
```

### 3. Configure environment variables

```bash
cp .env.example .env
```

Fill in your values in `.env` (see [Environment Variables](#-environment-variables) below).

### 4. Set up the database

```bash
npx prisma generate
npx prisma migrate deploy
```

### 5. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

---

## 🔐 Environment Variables

Create a `.env` file at the root with the following variables:

```env
# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up

# Supabase / Prisma
DATABASE_URL=postgresql://...?pgbouncer=true&connection_limit=1
DIRECT_URL=postgresql://...

# Groq AI
GROQ_API_KEY=gsk_...

# Razorpay
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_...
RAZORPAY_KEY_SECRET=...
```

See `.env.example` for the full template.

---

## ▶️ Running the App

```bash
# Development
npm run dev

# Production build
npm run build
npm start

# Lint
npm run lint
```

---

## ☁️ Deployment

This project is deployed on **Vercel**.

1. Push your code to GitHub
2. Connect your repo on [Vercel](https://vercel.com)
3. Add all environment variables from `.env` in Vercel project settings
4. Vercel auto-deploys on every push to `main`

> **Note:** The `.npmrc` file in the root sets `legacy-peer-deps=true` to resolve peer dependency conflicts during Vercel builds.

---

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  Built with ❤️ by <a href="https://github.com/singhayush007">Ayush Singh</a>
</div>
