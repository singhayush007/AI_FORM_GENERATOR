"use client";
import React, { useState } from "react";
import { Sparkles } from "lucide-react";
import GenerateFormInput from "@/features/forms/components/GenerateFormInput";
import HeroBackground from "@/features/landing/components/HeroBackground";
import HeroStats from "@/features/landing/components/HeroStats";
import SuggestionButtons from "@/features/landing/components/SuggestionButtons";
import TrustBadges from "@/features/landing/components/TrustBadges";

const HeroSection = () => {
  const [text, setText] = useState<string>("");

  return (
    <section className="w-full">
      <div className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-20">
        <HeroBackground />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 text-blue-200">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI-Powered Form Builder
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Build Forms{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400 bg-clip-text text-transparent">
                Instantly
              </span>
            </span>
            <br />
            <span className="text-white/90">with AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your form in plain English. Our AI generates a complete, production-ready form in seconds — no coding, no drag & drop.
          </p>

          <HeroStats />

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 mb-6 max-w-2xl mx-auto shadow-2xl shadow-black/40">
            <GenerateFormInput text={text} variant="hero" />
          </div>

          <SuggestionButtons onSelect={setText} />

          <TrustBadges />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
