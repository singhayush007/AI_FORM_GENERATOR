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
├── app/                                    # Next.js App Router — routing ONLY
│   ├── (auth)/                             # Auth routes (sign-in, sign-up)
│   ├── (home)/                             # Landing page + layout
│   ├── dashboard/                          # Protected dashboard routes
│   │   ├── analytics/page.tsx
│   │   ├── forms/
│   │   │   ├── page.tsx
│   │   │   ├── [formId]/page.tsx
│   │   │   ├── [formId]/submissions/page.tsx
│   │   │   └── edit/[formId]/page.tsx
│   │   ├── upgrade/page.tsx
│   │   └── layout.tsx
│   ├── forms/[formId]/page.tsx             # Public shareable form page
│   ├── api/razorpay/route.ts               # Razorpay payment API
│   ├── success/page.tsx
│   ├── not-found.tsx
│   └── layout.tsx
│
├── features/                               # 🏗️ Feature-based domain modules
│   │
│   ├── forms/                              # Everything related to forms
│   │   ├── actions/                        # Server actions (colocated)
│   │   │   ├── generateForm.ts             # AI form generation (Groq)
│   │   │   ├── submitForm.ts               # Form submission handler
│   │   │   ├── publishForm.ts              # Publish form to go live
│   │   │   ├── deleteForm.ts               # Delete form + submissions
│   │   │   ├── getForms.ts                 # Fetch user's forms
│   │   │   └── index.ts                    # Barrel export
│   │   ├── components/
│   │   │   ├── AiGeneratedForm.tsx         # Dynamic form renderer + Formik validation
│   │   │   ├── FormList.tsx                # Form card with edit/delete actions
│   │   │   ├── FormPublishDialog.tsx       # Post-publish share link dialog
│   │   │   ├── CopyButton.tsx              # Clipboard copy button
│   │   │   └── GenerateFormInput.tsx       # AI prompt input with validation
│   │   ├── hooks/
│   │   │   ├── useFormGenerate.ts          # AI generation state + Formik
│   │   │   ├── useFormPublish.ts           # Publish flow with loading state
│   │   │   ├── useFormSubmit.ts            # Form submission + validation
│   │   │   └── useClipboard.ts             # Clipboard copy with auto-reset
│   │   ├── types/
│   │   │   └── index.ts                    # Fields, FormContent, Form types
│   │   └── index.ts                        # Feature barrel export
│   │
│   ├── dashboard/                          # Dashboard stats & navigation
│   │   ├── actions/
│   │   │   ├── formStats.ts                # Aggregate stats (total, published, drafts)
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   ├── Analytics.tsx               # Stats cards + conversion rate
│   │   │   ├── Sidebar.tsx                 # Dashboard sidebar navigation
│   │   │   ├── Header.tsx                  # Dashboard topbar + breadcrumb
│   │   │   ├── UpgradeButton.tsx           # Free tier usage progress bar
│   │   │   └── SubmissionsDetails.tsx      # Submission data table
│   │   └── index.ts
│   │
│   ├── billing/                            # Pricing & subscription
│   │   ├── actions/
│   │   │   ├── userSubscription.ts         # Create & check subscription
│   │   │   └── index.ts
│   │   ├── components/
│   │   │   └── PricingPage.tsx             # Pricing cards + Razorpay integration
│   │   └── index.ts
│   │
│   └── landing/                            # Marketing / public pages
│       ├── components/
│       │   ├── HeroSection.tsx             # Hero with AI input + suggestions
│       │   └── Footer.tsx                  # Footer with newsletter subscribe
│       └── index.ts
│
├── components/                             # ✅ Truly shared, cross-feature components
│   ├── ui/                                 # shadcn/ui (Radix UI) — Button, Card, Dialog…
│   ├── DarkMode.tsx                        # Light/dark mode toggle
│   ├── Logo.tsx                            # Brand logo component
│   └── theme-provider.tsx                  # next-themes provider wrapper
│
├── lib/                                    # Shared utilities & singletons
│   ├── prisma.ts                           # Prisma client singleton
│   ├── utils.ts                            # cn(), MAX_FREE_FORM constant
│   └── pricingplan.ts                      # Pricing plan definitions
│
├── types/
│   └── form.ts                             # Re-export shim → features/forms/types
│
├── prisma/
│   └── schema.prisma                       # Database models (Form, Submissions, Subscription)
│
├── public/
│   └── ai-form-generator.png               # App screenshot / favicon source
│
├── .env.example                            # Environment variable template
├── .npmrc                                  # legacy-peer-deps=true for Vercel
├── next.config.ts
├── tailwind.config.ts
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
