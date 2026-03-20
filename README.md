# 🤖 Formify.ai — AI-Powered Form Builder SaaS (Next.js + Groq + Supabase)

<div align="center">

![GitHub stars](https://img.shields.io/github/stars/singhayush007/ai_form_generator?style=flat-square)
![GitHub forks](https://img.shields.io/github/forks/singhayush007/ai_form_generator?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/singhayush007/ai_form_generator?style=flat-square)
![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)
![Made with Next.js](https://img.shields.io/badge/Stack-Next.js_15-000000?style=flat-square&logo=next.js&logoColor=white)

**A production-ready full-stack AI-powered Form Builder SaaS using Next.js 15, Groq AI, Supabase, Clerk, and Razorpay.**

[🌐 Live Demo](https://ai-form-generator.vercel.app) · [🐛 Report Bug](https://github.com/singhayush007/ai_form_generator/issues) · [✨ Request Feature](https://github.com/singhayush007/ai_form_generator/issues)

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

## 📖 About

**Formify.ai** is a full-stack SaaS application built on **Next.js 15 App Router** that lets users generate complete, production-ready forms in seconds by just describing them in plain English.

It uses **Groq AI (Llama-3.3-70b)** to generate structured JSON form schemas, **Supabase (PostgreSQL)** via **Prisma** for data storage, **Clerk** for authentication, and **Razorpay** for subscription payments. Forms are instantly publishable with a shareable link, and all submissions are collected and viewable on a dashboard.

---

## ✨ Features

| Feature | Description |
| --- | --- |
| 🤖 **AI Form Generation** | Describe your form in plain English — Groq AI builds the complete form schema in seconds |
| 🔐 **Authentication** | Secure sign-up / sign-in with **Clerk** (social login, email, magic link) |
| 📋 **Dynamic Form Fields** | AI auto-assigns correct field types: text, email, phone, file upload, date, number, textarea, URL, and dropdowns |
| ✅ **Form Validation** | Client-side validation using **Formik + Yup** with type-specific rules (email, URL, phone, required) |
| 🌐 **One-Click Publishing** | Publish forms and share a unique public URL — no login required to fill |
| 📥 **Response Collection** | Every submission is stored securely and viewable in the dashboard |
| 📊 **Analytics Dashboard** | Track total forms, submissions, published vs draft stats, and conversion rate |
| 💳 **Subscription Plans** | Free, Pro, and Enterprise plans with **Razorpay** payment gateway integration |
| 🌙 **Dark Mode** | Full dark/light mode support via **next-themes** |
| 🗑️ **Delete Confirmation** | Safe delete with confirmation dialog before removing forms |
| 📎 **Shareable Links** | Auto-resolves to the correct domain on any deployment (localhost or Vercel) |

---

## 💻 Tech Stack

### Frontend
![Next.js](https://img.shields.io/badge/Next.js_15-000000?style=flat&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS_v4-06B6D4?style=flat&logo=tailwind-css&logoColor=white)
![shadcn/ui](https://img.shields.io/badge/shadcn/ui-000000?style=flat&logo=shadcnui&logoColor=white)
![Formik](https://img.shields.io/badge/Formik-172B4D?style=flat)
![Yup](https://img.shields.io/badge/Yup-FF6B6B?style=flat)
![next-themes](https://img.shields.io/badge/next--themes-000000?style=flat)

### Backend / Services
![Groq](https://img.shields.io/badge/Groq_AI-FF4D00?style=flat&logo=groq&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma_v6-0C344B?style=flat&logo=prisma&logoColor=white)
![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-6C47FF?style=flat&logo=clerk&logoColor=white)
![Razorpay](https://img.shields.io/badge/Razorpay-528FF0?style=flat&logo=razorpay&logoColor=white)

---

## 🗂️ Folder Structure

```
ai_form_generator/
│
├── app/                          # Next.js App Router
│   ├── (home)/                   # Landing page + layout
│   │   ├── page.tsx              # Home page (Hero, Features, Pricing)
│   │   └── layout.tsx            # Navbar layout
│   ├── (auth)/                   # Auth pages (Clerk)
│   │   ├── sign-in/
│   │   └── sign-up/
│   ├── dashboard/                # Protected dashboard
│   │   ├── page.tsx              # Dashboard home (stats + recent forms)
│   │   ├── forms/                # My Forms, Form Detail, Edit, Submissions
│   │   ├── analytics/            # Analytics page
│   │   ├── upgrade/              # Pricing / upgrade page
│   │   └── layout.tsx            # Dashboard layout (Sidebar + Header)
│   ├── forms/[formId]/           # Public form fill page
│   ├── success/                  # Success page (payment / submission)
│   ├── not-found.tsx             # 404 page
│   └── layout.tsx                # Root layout (theme provider, toaster)
│
├── actions/                      # Next.js Server Actions
│   ├── generatorForm.ts          # AI form generation (Groq)
│   ├── getForms.ts               # Fetch user's forms
│   ├── publishForm.ts            # Publish a form
│   ├── submitForm.ts             # Submit a form response
│   ├── deleteForm.ts             # Delete a form
│   ├── formStats.ts              # Dashboard statistics
│   └── userSubscription.ts      # Subscription status check
│
├── components/                   # Reusable React components
│   ├── AiGeneratedForm.tsx       # Dynamic form renderer with Formik+Yup validation
│   ├── GenerateFormInput.tsx     # AI prompt input with validation
│   ├── FormPublishDialog.tsx     # Publish success dialog with shareable link
│   ├── FormList.tsx              # Form card with delete confirmation dialog
│   ├── CopyButton.tsx            # Copy-to-clipboard button (resolves URL dynamically)
│   ├── HeroSection.tsx           # Landing page hero
│   ├── Analytics.tsx             # Analytics metric cards
│   ├── Sidebar.tsx               # Dashboard sidebar navigation
│   ├── Header.tsx                # Dashboard header with breadcrumb
│   ├── PricingPage.tsx           # Pricing cards with Razorpay integration
│   ├── Footer.tsx                # Landing page footer
│   ├── UpgradeButton.tsx         # Free tier upgrade prompt
│   └── ui/                       # shadcn/ui components
│
├── prisma/
│   ├── schema.prisma             # Database schema (Form, Submissions, Subscription)
│   └── migrations/               # Prisma migration files
│
├── lib/
│   ├── prisma.ts                 # Prisma client singleton
│   ├── utils.ts                  # Utility functions + MAX_FREE_FORM constant
│   └── pricingplan.ts            # Pricing plan config
│
├── types/
│   └── form.ts                   # TypeScript types for form fields
│
├── middleware.ts                 # Clerk middleware (public routes config)
├── .env                          # Local env (not committed)
├── .env.example                  # Env template ← copy this
├── next.config.ts                # Next.js config
├── tailwind.config.ts            # Tailwind CSS config
├── package.json
└── README.md
```

---

## 🏁 Getting Started

### Prerequisites

Make sure you have the following:

- [Node.js](https://nodejs.org/) v18+
- [npm](https://www.npmjs.com/) v9+
- [Supabase](https://supabase.com/) account (free tier works)
- [Clerk](https://clerk.dev/) account (free tier works)
- [Groq API Key](https://console.groq.com/) (free tier available)
- [Razorpay](https://razorpay.com/) account (for payment integration)

### 1. Clone the repository

```bash
git clone https://github.com/singhayush007/ai_form_generator.git
cd ai_form_generator
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

```bash
cp .env.example .env
```

Fill in your values in `.env` (see [Environment Variables](#-environment-variables) below).

### 4. Set up the database

```bash
# Run Prisma migrations to create the tables in Supabase
npx prisma migrate deploy

# Generate the Prisma client
npx prisma generate
```

---

## 🔐 Environment Variables

Copy `.env.example` to `.env` and fill in your values:

```bash
cp .env.example .env
```

| Variable | Description |
| --- | --- |
| `DATABASE_URL` | Supabase connection pooling URL (port 6543, `?pgbouncer=true`) |
| `DIRECT_URL` | Supabase direct connection URL (port 5432, used for migrations) |
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk publishable key from your Clerk dashboard |
| `CLERK_SECRET_KEY` | Clerk secret key from your Clerk dashboard |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | Sign-in route — set to `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | Sign-up route — set to `/sign-up` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL` | Redirect after sign-in — set to `/` |
| `NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL` | Redirect after sign-up — set to `/` |
| `GROQ_API_KEY` | Groq API key — get it from [console.groq.com](https://console.groq.com/) |
| `NEXT_PUBLIC_RAZORPAY_KEY_ID` | Razorpay public key ID (from Razorpay dashboard) |
| `RAZORPAY_KEY_SECRET` | Razorpay secret key (server-side only) |
| `NEXT_PUBLIC_BASE_URL` | App base URL — `http://localhost:3000` locally, your Vercel URL in production |

---

## ▶️ Running the App

```bash
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

---

## ☁️ Deployment

This project is optimized for deployment on **Vercel**.

| Service | Recommended For |
| --- | --- |
| [Vercel](https://vercel.com) | Full-stack Next.js app (frontend + server actions) |
| [Supabase](https://supabase.com) | PostgreSQL database |
| [Clerk](https://clerk.dev) | Authentication |
| [Groq](https://console.groq.com) | AI form generation |
| [Razorpay](https://razorpay.com) | Payment gateway |

### Deploy to Vercel

1. Push your repository to GitHub
2. Import the repo at [vercel.com/new](https://vercel.com/new)
3. Add all environment variables from `.env.example` in the Vercel dashboard
4. Set `NEXT_PUBLIC_BASE_URL` to your Vercel deployment URL (e.g. `https://yourapp.vercel.app`)
5. Deploy!

> **Important:** After deploying, run `npx prisma migrate deploy` against your Supabase production DB if you haven't already, or use Vercel's build command to run it automatically.

---

## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new branch: `git checkout -b feature/your-feature-name`
3. Commit your changes: `git commit -m 'add: your feature description'`
4. Push to the branch: `git push origin feature/your-feature-name`
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License** — feel free to use and modify it as per your needs.

---

<div align="center">
  Made with ❤️ by <a href="https://github.com/singhayush007">Ayush Singh</a>
</div>
