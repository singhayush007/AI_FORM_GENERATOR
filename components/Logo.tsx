import Link from 'next/link';
import React from 'react';

const Logo = () => {
  return (
    <Link href="/">
      <h1 className="font-extrabold text-2xl cursor-pointer bg-clip-text text-transparent 
                     bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
                     hover:scale-105 transition-transform duration-300">
        Formify.ai
      </h1>
    </Link>
  );
};

export default Logo;
