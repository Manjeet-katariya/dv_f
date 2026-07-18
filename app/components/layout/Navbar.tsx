"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X, Menu } from 'lucide-react';

const FacebookIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);
const InstagramIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);
const TwitterIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);
const LinkedInIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

interface SocialLinks {
  facebook?: string;
  instagram?: string;
  twitter?: string;
  linkedin?: string;
}

const leftLinks = [
  { name: 'Home', href: '/' },
  { name: 'Portfolio', href: '/portfolio' },
  { name: 'Services', href: '/services' },
];

const rightLinks = [
  { name: 'About', href: '/about' },
  { name: 'Calculator', href: '/calculator' },
  { name: 'Contact', href: '/contact' },
];

const allLinks = [...leftLinks, ...rightLinks];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/social-icons`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && data.data) setSocialLinks(data.data);
      } catch {
        setSocialLinks({});
      }
    };
    fetchSocialLinks();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
    const payload = JSON.stringify({ channel });
    if (navigator?.sendBeacon) {
      navigator.sendBeacon(`${API_URL}/api/social/click`, new Blob([payload], { type: 'application/json' }));
    } else {
      fetch(`${API_URL}/api/social/click`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true, body: payload }).catch(() => {});
    }
  };

  const socials = [
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedInIcon },
  ].filter(s => s.href);

  // Chevron style borders and colors
  const borderClass = scrolled ? 'border-stone-700/50' : 'border-white/20';
  const textClass = scrolled ? 'text-white hover:text-stone-300' : 'text-white hover:text-stone-300';
  const bgClass = scrolled ? 'bg-[#1C1917]/60 backdrop-blur-md' : 'bg-transparent';
  const hoverBgClass = scrolled ? 'hover:bg-white/5' : 'hover:bg-black/10';

  return (
    <>
      {/* ── DESKTOP GRID NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${borderClass} ${bgClass} hidden lg:block`}>
        {/* We use a grid or flex to perfectly divide the screen */}
        <div className="flex w-full h-[90px] xl:h-[110px]">
          
          {/* Left Links */}
          {leftLinks.map((link) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex-1 border-r ${borderClass} flex items-center justify-center font-serif text-lg xl:text-xl transition-all duration-300 ${textClass} ${hoverBgClass}`}
            >
              {link.name}
            </Link>
          ))}

          {/* Center Logo Area (wider) */}
          <div className={`flex-[1.5] xl:flex-[1.8] border-r ${borderClass} flex flex-col items-center justify-center ${scrolled ? 'bg-transparent' : 'bg-black/10'}`}>
            <Link href="/" className="flex flex-col items-center group">
              <img
                src="/logo-dvl.png"
                alt="DVL Architects"
                className="h-10 w-10 xl:h-12 xl:w-12 object-cover rounded-full border border-white/30 shadow-sm opacity-90 group-hover:opacity-100 transition-all duration-300"
              />
              <span className={`mt-2 font-serif text-[10px] xl:text-[12px] tracking-[0.3em] uppercase ${scrolled ? 'text-white' : 'text-white'}`}>
                DVL Architects
              </span>
            </Link>
          </div>

          {/* Right Links */}
          {rightLinks.map((link, idx) => (
            <Link
              key={link.name}
              href={link.href}
              className={`flex-1 flex items-center justify-center font-serif text-lg xl:text-xl transition-all duration-300 ${textClass} ${hoverBgClass} ${idx !== rightLinks.length - 1 ? `border-r ${borderClass}` : ''}`}
            >
              {link.name}
            </Link>
          ))}

        </div>
      </nav>

      {/* ── MOBILE NAVBAR ── */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${borderClass} ${bgClass} lg:hidden`}>
        <div className="flex items-center justify-between h-20 px-6">
          <Link href="/" className="flex items-center gap-3">
            <img
              src="/logo-dvl.png"
              alt="DVL"
              className="h-9 w-9 object-cover rounded-full border border-white/30"
            />
            <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-white">DVL</span>
          </Link>

          <button
            onClick={() => setIsOpen(true)}
            className="text-white hover:text-stone-300 transition-colors"
            aria-label="Open navigation"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* ── FULLSCREEN OVERLAY MENU (Mobile) ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex"
          >
            {/* Nav content */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full bg-[#1C1917] flex flex-col px-8 py-8 overflow-y-auto"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-16 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <img src="/logo-dvl.png" alt="DVL" className="h-9 w-9 object-cover rounded-full border border-stone-700" />
                  <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-white">DVL</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-10 h-10 border border-stone-700 text-white rounded-full hover:bg-white hover:text-[#1C1917] transition-all"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1 flex flex-col justify-center gap-6">
                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-center justify-between py-4 border-b border-stone-800"
                    >
                      <span className="text-4xl font-serif text-white group-hover:text-stone-400 transition-colors leading-none tracking-tight">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="pt-10 mt-6 border-t border-stone-800 flex-shrink-0 flex justify-between items-end"
              >
                {/* Social */}
                {socials.length > 0 && (
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-4">Follow Us</p>
                    <div className="flex gap-4">
                      {socials.map(({ key, href, Icon }) => (
                        <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                          onClick={() => trackSocialClick(key)}
                          className="text-stone-400 hover:text-white transition-colors">
                          <Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
