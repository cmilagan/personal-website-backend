'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const navLinks = [
  { name: 'About', href: '#about' },
  { name: 'Experience', href: '#experience' },
  { name: 'Projects', href: '#projects' },
  { name: 'Contact', href: '#contact' },
];

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-background/80 shadow-lg backdrop-blur-sm' : 'bg-transparent'
      }`}
    >
      <nav className="container mx-auto max-w-7xl px-6 py-4 flex items-center justify-between">
        <Link href="/" className="text-2xl font-bold text-accent hover:text-primary-foreground transition-colors">
          CI
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <ol className="flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <li key={link.name} className="font-mono text-sm">
                <a href={link.href} className="hover:text-accent transition-colors">
                  <span className="text-accent">0{index + 1}.</span> {link.name}
                </a>
              </li>
            ))}
          </ol>
          <a href="/files/resume.pdf" target="_blank" rel="noopener noreferrer">
            <Button variant="outline" size="sm">
              Resume
            </Button>
          </a>
        </div>
        <div className="md:hidden">
          {/* Mobile menu could be added here */}
        </div>
      </nav>
    </header>
  );
};

export default Header;
