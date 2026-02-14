
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track scrolling to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
    { name: 'Resume', href: '/resume.pdf' },
  ];

  return (
    <header
    className={cn(
      'fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 md:px-12',
      isScrolled ? 'bg-navy/90 backdrop-blur-md py-4 shadow-lg' : 'py-6 bg-transparent'
    )}
  >
    <div className="max-w-7xl mx-auto flex justify-between items-center">
      <a href="#" className="flex items-center gap-2 group">
        <div className="bg-blue rounded p-1">
          <span className="block w-4 h-4 bg-white rounded-sm"></span>
        </div>
        <span className="text-xl font-bold text-slate-lightest uppercase tracking-wider">Ayush.dev</span>
      </a>

      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center gap-8">
        {navLinks.map((link, i) => (
          <a
            key={link.name}
            href={link.href}
            className="nav-link text-slate-light hover:text-blue transition-colors font-medium text-sm"
            style={{ animationDelay: `${i * 100}ms` }}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          className="px-5 py-2.5 bg-blue hover:bg-blue-hover text-white font-medium rounded-md transition-colors duration-300 text-sm"
        >
          Hire Me
        </a>
      </nav>

      {/* Mobile Menu Button */}
      <button
        className="md:hidden p-2 text-slate-lightest"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle mobile menu"
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>

    {/* Mobile Menu */}
    <div
      className={cn(
        'fixed inset-0 bg-navy/95 pt-24 px-6 flex flex-col justify-start z-40 transition-all duration-300 md:hidden',
        mobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
      )}
    >
      <nav className="flex flex-col space-y-6 items-center">
        {navLinks.map((link, i) => (
          <a
            key={link.name}
            href={link.href}
            className="text-2xl text-slate-lightest hover:text-blue transition-colors"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              transitionDelay: `${i * 50}ms`,
              opacity: mobileMenuOpen ? 1 : 0,
              transform: mobileMenuOpen ? 'translateY(0)' : 'translateY(20px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease'
            }}
          >
            {link.name}
          </a>
        ))}
        <a
          href="#contact"
          className="px-8 py-3 bg-blue hover:bg-blue-hover text-white font-medium rounded-md transition-colors duration-300 text-lg mt-4"
          onClick={() => setMobileMenuOpen(false)}
        >
          Hire Me
        </a>
      </nav>
    </div>
  </header>
  );
};

export default Navigation;
