"use client";

import React, { FC } from "react";
import { Github, Twitter, Linkedin, Mail } from "lucide-react";

const Footer: FC = () => {
  return (
    <footer className="bg-gradient-to-b from-gray-100 to-gray-200 dark:from-gray-900 dark:to-gray-950 text-gray-800 dark:text-gray-300 py-14 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Brand & About */}
        <div className="flex flex-col gap-4">
          <h2 className="text-3xl font-extrabold bg-gradient-to-r from-blue-600 to-purple-500 bg-clip-text text-transparent">
            AI Form Generator
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Create AI-driven forms effortlessly and streamline your workflow
            with smart automation tools.
          </p>
          <div className="flex items-center gap-3 mt-3">
            {[
              {
                href: "mailto:support@example.com",
                icon: <Mail size={20} />,
              },
              {
                href: "https://github.com/",
                icon: <Github size={20} />,
              },
              {
                href: "https://twitter.com/",
                icon: <Twitter size={20} />,
              },
              {
                href: "https://linkedin.com/",
                icon: <Linkedin size={20} />,
              },
            ].map((social, index) => (
              <a
                key={index}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-white/50 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition duration-300"
              >
                {social.icon}
              </a>
            ))}
          </div>
        </div>

        {/* Subscribe */}
        <div className="flex flex-col gap-3">
          <h3 className="font-semibold text-lg mb-2 uppercase tracking-wide text-blue-600 dark:text-purple-400">
            Subscribe
          </h3>
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            Get the latest updates and AI tips directly in your inbox.
          </p>
          <form
            onSubmit={(e) => e.preventDefault()}
            className="flex flex-col sm:flex-row gap-2 mt-2 items-stretch"
          >
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-purple-400 transition-all bg-white dark:bg-gray-800"
              required
            />
            <button
              type="submit"
              className="flex-shrink-0 px-4 sm:px-6 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition duration-300 cursor-pointer"
            >
              Subscribe
            </button>
          </form>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="mt-14 border-t border-gray-300 dark:border-gray-700 pt-6 text-center text-sm text-gray-500 dark:text-gray-400 ">
        &copy; {new Date().getFullYear()}{" "}
        <span className="font-semibold text-blue-600 dark:text-purple-400">
          AI Form Generator
        </span>
        . All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
