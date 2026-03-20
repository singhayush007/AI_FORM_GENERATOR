import Footer from "@/components/Footer";
import HeroSection from "@/components/HeroSection";
import PricingPage from "@/components/PricingPage";
import { currentUser } from "@clerk/nextjs/server";
import { FileText, Zap, Users, BarChart3, Shield, Globe } from "lucide-react";
import React from "react";

const features = [
  {
    icon: Zap,
    title: "AI-Powered Generation",
    desc: "Just describe what you need. Our AI builds the perfect form in seconds.",
    color: "text-yellow-500",
    bg: "bg-yellow-50 dark:bg-yellow-950",
  },
  {
    icon: FileText,
    title: "Fully Customizable",
    desc: "Edit fields, labels, and placeholders to match your exact requirements.",
    color: "text-blue-500",
    bg: "bg-blue-50 dark:bg-blue-950",
  },
  {
    icon: Globe,
    title: "One-Click Publishing",
    desc: "Publish instantly and share a link with anyone — no login required to fill.",
    color: "text-green-500",
    bg: "bg-green-50 dark:bg-green-950",
  },
  {
    icon: Users,
    title: "Response Collection",
    desc: "Every submission is captured and stored securely for you to review.",
    color: "text-purple-500",
    bg: "bg-purple-50 dark:bg-purple-950",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    desc: "Track total forms, submissions, and engagement from one place.",
    color: "text-pink-500",
    bg: "bg-pink-50 dark:bg-pink-950",
  },
  {
    icon: Shield,
    title: "Secure & Reliable",
    desc: "Data stored on Supabase with row-level security. Always available.",
    color: "text-indigo-500",
    bg: "bg-indigo-50 dark:bg-indigo-950",
  },
];

const HomePage = async () => {
  const user = await currentUser();

  return (
    <div className="min-h-screen">
      {/* Hero — full width, no container */}
      <HeroSection />

      {/* Features Section */}
      <section className="bg-gray-50 dark:bg-neutral-950 py-20 px-4 mt-8">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
              Everything you need to collect data
            </h2>
            <p className="mt-3 text-gray-500 dark:text-gray-400 max-w-xl mx-auto">
              From creation to analytics — Formify.ai handles it all so you can
              focus on what matters.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map(({ icon: Icon, title, desc, color, bg }) => (
              <div
                key={title}
                className="bg-white dark:bg-neutral-900 rounded-2xl p-6 border border-gray-100 dark:border-neutral-800 shadow-sm hover:shadow-md transition-shadow"
              >
                <div
                  className={`inline-flex items-center justify-center w-10 h-10 rounded-xl ${bg} mb-4`}
                >
                  <Icon className={`w-5 h-5 ${color}`} />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-1">
                  {title}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <div className="max-w-5xl mx-auto px-4">
        <PricingPage userId={user?.id} />
      </div>

      <Footer />
    </div>
  );
};

export default HomePage;
