import React from "react";

type Props = {
  publishedForms: number;
  totalSubmissions: number;
};

const ConversionRateBanner: React.FC<Props> = ({ publishedForms, totalSubmissions }) => {
  const rate = publishedForms > 0
    ? Math.round((totalSubmissions / publishedForms) * 10) / 10
    : 0;

  return (
    <div className="rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
      <p className="text-sm font-medium text-blue-100 mb-1">Conversion Rate</p>
      <p className="text-3xl font-bold">{rate}</p>
      <p className="text-sm text-blue-200 mt-0.5">average submissions per published form</p>
    </div>
  );
};

export default ConversionRateBanner;
