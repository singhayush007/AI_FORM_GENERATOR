// "use client";

// import React from "react";
// import Link from "next/link";
// import { UserButton } from "@clerk/nextjs";
// import DarkMode from "./DarkMode";

// const Header = () => {
//   return (
//     <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-gray-900 shadow-md">
//       <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
//         AI Form Generator
//       </h1>
//       <div className="flex items-center gap-4">
//         <DarkMode />
//         <Link
//           href="/dashboard"
//           className="hover:text-blue-500 text-gray-900 dark:text-gray-100 cursor-pointer"
//         >
//           Dashboard
//         </Link>
//         <UserButton afterSignOutUrl="/" />
//       </div>
//     </header>
//   );
// };

// export default Header;





"use client";

import React from "react";
import Link from "next/link";
import { UserButton } from "@clerk/nextjs";
import DarkMode from "./DarkMode"; // Dark mode toggle

const Header = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-white dark:bg-black shadow-md">
      <h1 className="text-2xl font-semibold text-black dark:text-white">
        AI Form Generator
      </h1>
      <div className="flex items-center gap-4">
        <DarkMode /> {/* Dark mode toggle */}
        <Link
          href="/dashboard"
          className="text-black dark:text-white hover:text-blue-500 cursor-pointer"
        >
          Dashboard
        </Link>
        <UserButton afterSignOutUrl="/" />
      </div>
    </header>
  );
};

export default Header;
