"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';
import { X } from 'lucide-react';

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

const navLinks = [
  { name: 'Home', href: '/', num: '01' },
  { name: 'Portfolio', href: '/portfolio', num: '02' },
  { name: 'Services', href: '/services', num: '03' },
  { name: 'About', href: '/about', num: '04' },
  { name: 'Calculator', href: '/calculator', num: '05' },
  { name: 'Contact', href: '/contact', num: '06' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [socialLinks, setSocialLinks] = useState<SocialLinks>({});

  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const fetchSocialLinks = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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

  return (
    <>
      {/* ── NAVBAR ── */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-stone-100 shadow-sm">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-16">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link href="/" className="group z-10 relative">
              <img
                src="/logo-dvl.png"
                alt="DVL Architects"
                className="h-10 w-10 object-cover rounded-full border border-stone-200 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity"
              />
            </Link>

            {/* Desktop Navigation Links */}
            <div className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="text-[9px] font-bold uppercase tracking-[0.25em] text-[#57534E] hover:text-[#1C1917] transition-colors relative group py-2"
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-[1.5px] bg-[#1C1917] transition-all duration-300 group-hover:w-full" />
                </Link>
              ))}
            </div>

            {/* Right actions */}
            <div className="flex items-center gap-6 z-10">
              {/* Desktop Start Project Button */}
              <Link
                href="/contact"
                className="hidden lg:inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] px-6 py-2.5 rounded-full border border-[#1C1917] text-[#1C1917] hover:bg-[#1C1917] hover:text-[#FAF9F5] transition-all duration-300"
              >
                Start Project
              </Link>

              {/* Mobile Menu trigger */}
              <button
                onClick={() => setIsOpen(true)}
                className="lg:hidden flex items-center gap-3 group relative"
                aria-label="Open navigation"
              >
                <div className="flex flex-col gap-[5px]">
                  <span className="block w-7 h-[1px] bg-[#1C1917] transition-all duration-300 group-hover:w-9" />
                  <span className="block w-5 h-[1px] bg-[#1C1917] transition-all duration-300 group-hover:w-9" />
                  <span className="block w-7 h-[1px] bg-[#1C1917] transition-all duration-300 group-hover:w-9" />
                </div>
              </button>
            </div>

          </div>
        </div>
      </nav>

      {/* ── FULLSCREEN OVERLAY MENU ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[100] flex"
          >
            {/* Left: Nav content */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
              className="relative w-full lg:w-[58%] bg-[#FAF9F5] flex flex-col px-10 lg:px-20 py-8 overflow-y-auto border-r border-stone-200"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-16 flex-shrink-0">
                <img src="/logo-dvl.png" alt="DVL Architects" className="h-9 w-9 object-cover rounded-full border border-stone-200 shadow-sm" />
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center gap-3 group"
                >
                  <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-[#878076] group-hover:text-[#1C1917] transition-colors">Close</span>
                  <div className="w-9 h-9 border border-stone-200 flex items-center justify-center group-hover:border-stone-400 transition-colors">
                    <X className="w-4 h-4 text-[#57534E] group-hover:text-[#1C1917] transition-colors" />
                  </div>
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-1">
                {navLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.15 + i * 0.07, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-6 py-5 border-b border-stone-200/60 hover:border-stone-400 transition-all"
                    >
                      <span className="text-[10px] font-mono text-[#1C1917]/30 group-hover:text-[#1C1917]/80 transition-colors w-6 flex-shrink-0">
                        {link.num}
                      </span>
                      <span className="text-[clamp(2.5rem,6vw,4.5rem)] font-serif font-bold text-[#1C1917] group-hover:text-stone-500 transition-colors leading-none tracking-tight">
                        {link.name}
                      </span>
                      <span className="ml-auto text-[#1C1917] opacity-0 group-hover:opacity-100 transition-opacity text-lg">↗</span>
                    </Link>
                  </motion.div>
                ))}
              </nav>

              {/* Bottom row */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65 }}
                className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-10 mt-6 border-t border-stone-200/80 flex-shrink-0"
              >
                {/* Social */}
                {socials.length > 0 && (
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#878076] mb-4">Follow Us</p>
                    <div className="flex gap-5">
                      {socials.map(({ key, href, Icon }) => (
                        <a key={key} href={href} target="_blank" rel="noopener noreferrer"
                          onClick={() => trackSocialClick(key)}
                          className="text-[#57534E] hover:text-[#1C1917] transition-colors">
                          <Icon />
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                <Link
                  href="/contact"
                  onClick={() => setIsOpen(false)}
                  className="inline-flex items-center gap-3 text-[9px] font-bold uppercase tracking-[0.3em] px-7 py-3 bg-[#1C1917] text-[#FAF9F5] hover:bg-stone-800 transition-colors"
                >
                  Start Project
                </Link>
              </motion.div>
            </motion.div>

            {/* Right: Architecture image panel (desktop only) */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="hidden lg:block flex-1 relative overflow-hidden bg-[#F4F3EE]"
              onClick={() => setIsOpen(false)}
            >
              <img
                src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1400&q=80"
                alt=""
                className="w-full h-full object-cover opacity-45 grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#FAF9F5] via-[#FAF9F5]/40 to-transparent" />

              {/* Contact info on right panel */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="absolute bottom-16 left-16"
              >
                <p className="text-[8px] font-bold uppercase tracking-[0.4em] text-[#1C1917]/60 mb-5">Get In Touch</p>
                <p className="text-[#57534E] text-sm mb-2">+91-8619633247</p>
                <p className="text-[#57534E] text-sm">sparchitects93@gmail.com</p>
                <p className="text-[#878076] text-xs mt-3">Jaipur, Rajasthan, India</p>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
}
