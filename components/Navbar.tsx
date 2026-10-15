'use client';
import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { NAV_ITEMS } from '../constants/navigation'

const Navbar = () => {
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Only hide after scrolling past 100px from top
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setIsVisible(false); // Scrolling DOWN -> Hide navbar
      } else {
        setIsVisible(true);  // Scrolling UP -> Show navbar
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const targetId = href.split('#')[1];
    const element = targetId ? document.getElementById(targetId) : null;

    if (targetId && window.location.pathname === '/' && element) {
      e.preventDefault();
      element.scrollIntoView({ behavior: 'smooth' });
      window.history.pushState(null, '', href);
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-xl bg-[#11052C]/80 border-b border-white/10 transition-transform duration-300 ${
        isVisible ? 'translate-y-0' : '-translate-y-full'
      }`}
    >
      <div className="w-full mx-auto px-6 md:px-32 py-5 grid grid-cols-3 items-center">
        {/* LOGO */}
        <div className="flex items-center justify-start">
          <Link href="/" className="flex items-center gap-3">
            <img src="/logo.png" alt="Logo" width={48} height={48} />
            <div className="flex items-center">
              <span className="text-2xl font-bold text-amber-400">WAT</span>
              <span className="text-2xl font-bold font-serif text-slate-300">sForFree</span>
            </div>
          </Link>
        </div>

        {/* NAV ITEMS */}
        <div className="flex justify-center">
          <nav className="hidden md:flex items-center bg-white/[0.03] border border-white/10 p-1 rounded-full backdrop-blur-md">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.href} 
                href={item.href} 
                onClick={(e) => handleNavClick(e, item.href)}
                className="px-4 py-1.5 text-xs font-semibold text-slate-400 hover:text-amber-400 hover:bg-white/10 rounded-full transition-all duration-200 tracking-tight whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* AUTH BUTTONS */}
        <div className="flex items-center justify-end gap-3">
          <nav className="hidden md:flex items-center bg-white/[0.03] border border-white/10 p-1 rounded-full backdrop-blur-md">
            <Link 
              href="/login" 
              className="px-4 py-2 text-xs font-semibold text-slate-300 hover:text-white transition-colors"
            >
              Log In
            </Link>
            <Link 
              href="/signup" 
              className="px-4 py-2 text-xs font-semibold text-slate-950 bg-amber-400 hover:bg-amber-300 rounded-full transition-all shadow-md shadow-amber-400/20 whitespace-nowrap"
            >
              Sign Up
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Navbar;