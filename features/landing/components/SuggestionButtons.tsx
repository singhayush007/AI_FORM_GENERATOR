"use client";
import React from "react";
import { Button } from "@/components/ui/button";

type Suggestion = { label: string; text: string };

const suggestions: Suggestion[] = [
  { label: "📋 Job Application", text: "Develop a job application form collecting essential information from applicants including personal details, experience, education, and skills." },
  { label: "📝 Registration Form", text: "Create a course registration form suitable for any school or institution with student details, course selection, and payment info." },
  { label: "💬 Feedback Form", text: "Create a client feedback form to gather valuable insights with rating, experience, and suggestions fields." },
  { label: "📞 Contact Form", text: "Create a simple contact form with name, email, subject, phone number and message fields." },
];

type Props = { onSelect: (text: string) => void };

const SuggestionButtons: React.FC<Props> = ({ onSelect }) => (
  <div className="flex flex-wrap justify-center gap-2 mb-10">
    {suggestions.map((item, index) => (
      <Button
        key={index}
        onClick={() => onSelect(item.text)}
        className="rounded-full h-8 px-3.5 text-xs cursor-pointer bg-white/10 hover:bg-white/20 border border-white/20 text-white/80 hover:text-white transition-all"
        variant="ghost"
      >
        {item.label}
      </Button>
    ))}
  </div>
);

export default SuggestionButtons;
