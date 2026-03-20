"use client";
import React, { useState } from "react";
import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import { Sparkles, Zap, Shield, BarChart3 } from "lucide-react";

type SuggestionText = { label: string; text: string };

const suggestionBtnText: SuggestionText[] = [
  { label: "📋 Job Application", text: "Develop a job application form collecting essential information from applicants including personal details, experience, education, and skills." },
  { label: "📝 Registration Form", text: "Create a course registration form suitable for any school or institution with student details, course selection, and payment info." },
  { label: "💬 Feedback Form", text: "Create a client feedback form to gather valuable insights with rating, experience, and suggestions fields." },
  { label: "📞 Contact Form", text: "Create a simple contact form with name, email, subject, phone number and message fields." },
];

const stats = [
  { value: "10x", label: "Faster than manual" },
  { value: "100%", label: "AI-powered" },
  { value: "Free", label: "To get started" },
];

const HeroSection = () => {
  const [text, setText] = useState<string>("");

  return (
    <section className="w-full">
      <div className="relative min-h-[92vh] flex flex-col items-center justify-center overflow-hidden bg-gradient-to-br from-[#0f0c29] via-[#302b63] to-[#24243e] text-white px-4 py-20">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
          <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/30 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-purple-600/30 blur-[120px]" />
          <div className="absolute top-[40%] left-[40%] w-[300px] h-[300px] rounded-full bg-indigo-500/20 blur-[100px]" />
        </div>

        <div className="absolute inset-0 opacity-[0.04] pointer-events-none" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)`, backgroundSize: "60px 60px" }} />

        <div className="relative z-10 w-full max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-4 py-1.5 text-sm font-medium mb-8 text-blue-200">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            AI-Powered Form Builder
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black leading-[1.05] tracking-tight mb-6">
            Build Forms{" "}
            <span className="relative inline-block">
              <span className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-400 bg-clip-text text-transparent">Instantly</span>
            </span>
            <br />
            <span className="text-white/90">with AI</span>
          </h1>

          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed">
            Describe your form in plain English. Our AI generates a complete, production-ready form in seconds — no coding, no drag & drop.
          </p>

          <div className="flex items-center justify-center gap-8 mb-10">
            {stats.map(({ value, label }) => (
              <div key={label} className="text-center">
                <div className="text-2xl font-black text-white">{value}</div>
                <div className="text-xs text-white/50 mt-0.5">{label}</div>
              </div>
            ))}
          </div>

          <div className="bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-3 mb-6 max-w-2xl mx-auto shadow-2xl shadow-black/40">
            <GenerateFormInput text={text} variant="hero" />
          </div>

          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {suggestionBtnText.map((item, index) => (
              <Button key={index} onClick={() => setText(item.text)} className="rounded-full h-8 px-3.5 text-xs cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all" variant="ghost">
                {item.label}
              </Button>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
            {[{ icon: Zap, text: "Instant generation" }, { icon: Shield, text: "Secure & private" }, { icon: BarChart3, text: "Built-in analytics" }].map(({ icon: Icon, text }) => (
              <div key={text} className="flex items-center gap-1.5">
                <Icon className="w-3.5 h-3.5 text-white/40" />
                {text}
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white dark:from-neutral-950 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;
