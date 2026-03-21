import React from "react";
import { Zap, Shield, BarChart3 } from "lucide-react";

const badges = [
  { icon: Zap, text: "Instant generation" },
  { icon: Shield, text: "Secure & private" },
  { icon: BarChart3, text: "Built-in analytics" },
];

const TrustBadges = () => (
  <div className="flex flex-wrap items-center justify-center gap-4 text-sm text-white/50">
    {badges.map(({ icon: Icon, text }) => (
      <div key={text} className="flex items-center gap-1.5">
        <Icon className="w-3.5 h-3.5 text-white/40" />
        {text}
      </div>
    ))}
  </div>
);

export default TrustBadges;
