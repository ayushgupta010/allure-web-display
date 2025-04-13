
import React from 'react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-navy-dark text-white/70 py-8 px-6 text-center">
      <div className="container max-w-5xl mx-auto">
        <p>
          &copy; {2025} Ayush Gupta. All rights reserved.
        </p>
        <p className="mt-2 text-sm">
          Built with React, TypeScript, and TailwindCSS.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
