# 📝 AI FORM GENERATOR

Build your own **AI-Powered Form Generator SaaS** from scratch! 🚀

Generate dynamic forms with AI, manage users securely, and deploy effortlessly using **Next.js, Prisma, Clerk, OpenRouter, TypeScript, and Docker**. This app is production-ready and scalable for modern web projects.

---

## 🧱Tech Stack

![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)
![Prisma](https://img.shields.io/badge/Prisma-0C344B?style=flat&logo=prisma&logoColor=white)
![Clerk](https://img.shields.io/badge/Clerk-FF3B30?style=flat&logo=clerk&logoColor=white)
![OpenRouter](https://img.shields.io/badge/OpenRouter-FF6C37?style=flat&logo=openai&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white)
![License](https://img.shields.io/badge/License-MIT-green)

---

## Screenshot

![Project Screenshot](./assets/screenshot.png)

---

## 🚀Features 

- ⚡ **Generate dynamic forms** powered by AI
- 🔐 **User authentication & secure data storage**
- 🐳 **Easily deployable** with Docker
- 📈 **Scalable architecture** for production use
- ✨ Clean, responsive, and user-friendly UI

---

## 📁 Project Structure 
```
AI_FORM_GENERATOR/
├── app/                    # Next.js app directory
│   ├── dashboard/          # Dashboard pages
│   ├── success/            # Success page
├── components/             # Reusable UI components
│   ├── AiGeneratedForm.tsx
│   ├── Analytics.tsx
│   ├── FormList.tsx
│   ├── FormPublishDialog.tsx
│   ├── Header.tsx
│   ├── Sidebar.tsx
│   ├── SubmissionsDetails.tsx
│   ├── UpgradeButton.tsx
│   ├── theme-provider.tsx
│   └── ui/                 # UI components
├── actions/                # Server-side actions
│   ├── deleteForm.ts
│   ├── formStats.ts
│   ├── generatorForm.ts
│   ├── getForms.ts
│   ├── publishForm.ts
│   ├── submitForm.ts
│   └── userSubscription.ts
├── lib/                    # Prisma client and utility functions
├── prisma/                 # Prisma schema & migrations
├── tailwind.config.js      # Tailwind CSS configuration
├── types/                  # TypeScript types
│   └── form.ts
├── package.json            # Project metadata and dependencies
└── README.md               # Project documentation

```

## 🏁 Getting Started 
Follow these steps to run the project locally:

1. **Clone the repository:**
```
git clone https://github.com/singhayush007/AI_FORM_GENERATOR.git
```

2. **Navigate to the project folder:**
```
cd AI_FORM_GENERATOR
```

3. **Install dependencies:**
```
npm install
```

4. **Create a .env.local file in the root and add your environment variables:**
```
DATABASE_URL=your_supabase_database_url
DIRECT_URL=your_supabase_direct_url
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
CLERK_SECRET_KEY=your_clerk_secret_key
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL=/
NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL=/
OPENROUTER_API_KEY=your_openrouter_api_key
```

5. **Run the development server:**
```
npm run dev
```

6. **Open the app in your browser:**
```
http://localhost:3000
```

## 💻 Deployment
You can deploy this app using Vercel, Docker, or any Node.js hosting platform.


**🐳Docker**
1. **Build the Docker image:**
```
docker build -t ai-form-generator .
```
2. **Run the container:**
```
docker run -p 3000:3000 ai-form-generator
```

## 📄License 

This project is licensed under the MIT License.




