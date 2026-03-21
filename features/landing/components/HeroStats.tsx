import React from "react";

const stats = [
  { value: "10x", label: "Faster than manual" },
  { value: "100%", label: "AI-powered" },
  { value: "Free", label: "To get started" },
];

const HeroStats = () => (
  <div className="flex items-center justify-center gap-8 mb-10">
    {stats.map(({ value, label }) => (
      <div key={label} className="text-center">
        <div className="text-2xl font-black text-white">{value}</div>
        <div className="text-xs text-white/50 mt-0.5">{label}</div>
      </div>
    ))}
  </div>
);

export default HeroStats;
