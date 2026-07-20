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

interface ContactDetails {
  phone?: string;
  email?: string;
  address?: {
    street?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    country?: string;
  };
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
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

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
    const fetchNavbarData = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const [socialRes, contactRes] = await Promise.all([
          fetch(`${API_URL}/api/social-icons`),
          fetch(`${API_URL}/api/contact-details`)
        ]);

        if (socialRes.ok) {
          const socialData = await socialRes.json();
          if (socialData.success && socialData.data) setSocialLinks(socialData.data);
        }

        if (contactRes.ok) {
          const contactData = await contactRes.json();
          if (contactData.success && contactData.data) setContactDetails(contactData.data);
        }
      } catch {
        setSocialLinks({});
        setContactDetails(null);
      }
    };
    fetchNavbarData();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
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

  const mobileBorderClass = scrolled ? 'border-white/10' : 'border-white/15';
  const mobileBgClass = scrolled ? 'bg-[#1C1917]/90 backdrop-blur-lg' : 'bg-[#1C1917]/80 backdrop-blur-md';

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
      <nav className={`fixed top-4 left-4 right-4 z-50 transition-all duration-500 rounded-full border ${mobileBorderClass} ${mobileBgClass} lg:hidden shadow-lg shadow-black/20`}>
        <div className="grid grid-cols-3 items-center h-16 px-5 sm:px-6">
          
          {/* Left Column: Custom Menu Trigger */}
          <div className="flex justify-start">
            <button
              onClick={() => setIsOpen(true)}
              className="flex items-center gap-2 text-white hover:text-stone-300 transition-colors py-2 focus:outline-none group cursor-pointer"
              aria-label="Open navigation"
            >
              <div className="flex flex-col gap-1 w-5">
                <span className="h-[2px] w-5 bg-white rounded-full transition-all duration-300 group-hover:w-4"></span>
                <span className="h-[2px] w-3.5 bg-white rounded-full transition-all duration-300 group-hover:w-5"></span>
              </div>
              <span className="font-sans text-[10px] tracking-[0.2em] uppercase font-bold text-white/90">Menu</span>
            </button>
          </div>

          {/* Center Column: Centered Logo Area */}
          <div className="flex justify-center">
            <Link href="/" className="flex flex-col items-center group">
              <img
                src="/logo-dvl.png"
                alt="DVL Logo"
                className="h-8 w-8 object-cover rounded-full border border-white/30 group-hover:scale-105 transition-transform duration-300"
              />
              <span className="mt-1 font-serif text-[8px] tracking-[0.25em] uppercase text-white/80 group-hover:text-white transition-colors">
                DVL
              </span>
            </Link>
          </div>

          {/* Right Column: Contact/Enquire button */}
          <div className="flex justify-end">
            <Link
              href="/contact"
              className="px-3.5 py-1.5 rounded-full bg-white text-[#1C1917] font-sans text-[9px] font-bold tracking-[0.1em] uppercase hover:bg-stone-200 active:scale-95 transition-all duration-200 shadow-sm"
            >
              Enquire
            </Link>
          </div>

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
              className="relative w-full bg-[#1C1917] bg-[radial-gradient(circle_at_top_right,rgba(168,162,158,0.12),transparent_45%)] flex flex-col px-8 py-8 overflow-y-auto"
            >
              {/* Top row */}
              <div className="flex items-center justify-between mb-16 flex-shrink-0">
                <div className="flex items-center gap-3">
                  <img src="/logo-dvl.png" alt="DVL" className="h-9 w-9 object-cover rounded-full border border-stone-700" />
                  <span className="font-serif text-[10px] tracking-[0.2em] uppercase text-white">DVL</span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center w-10 h-10 border border-stone-700 text-white rounded-full hover:bg-white hover:text-[#1C1917] transition-all cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Nav links */}
              <nav className="flex-grow flex flex-col justify-start gap-1 py-4">
                {allLinks.map((link, i) => (
                  <motion.div
                    key={link.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.12 + i * 0.05, duration: 0.4 }}
                  >
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      className="group flex items-baseline gap-4 py-3 border-b border-stone-800/40"
                    >
                      <span className="font-mono text-[10px] text-stone-500 tracking-wider">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <span className="text-3xl font-serif text-white group-hover:text-stone-300 group-hover:translate-x-2 transition-all duration-300 leading-none tracking-tight">
                        {link.name}
                      </span>
                    </Link>
                  </motion.div>
                ))}
              </nav>
 
              {/* Bottom Info Section */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.55 }}
                className="pt-8 mt-8 border-t border-stone-800/60 flex-shrink-0 grid grid-cols-2 gap-6"
              >
                {/* Contact info column */}
                <div className="space-y-4">
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-1">Direct Line</p>
                    <a
                      href={`tel:${contactDetails?.phone || '+918619633247'}`}
                      className="text-xs font-serif text-white hover:text-stone-300 transition-colors"
                    >
                      {contactDetails?.phone || '+91-8619633247'}
                    </a>
                  </div>
                  
                  <div>
                    <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-1">Email Desk</p>
                    <a
                      href={`mailto:${contactDetails?.email || 'sparchitects93@gmail.com'}`}
                      className="text-xs font-serif text-white hover:text-stone-300 transition-colors break-all"
                    >
                      {contactDetails?.email || 'sparchitects93@gmail.com'}
                    </a>
                  </div>
                </div>

                {/* Socials & Location Column */}
                <div className="flex flex-col justify-between items-end">
                  {socials.length > 0 ? (
                    <div className="text-right">
                      <p className="text-[8px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-2">Follow Us</p>
                      <div className="flex gap-3 justify-end">
                        {socials.map(({ key, href, Icon }) => (
                          <a
                            key={key}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={() => trackSocialClick(key)}
                            className="flex items-center justify-center w-8 h-8 rounded-full border border-stone-800 text-stone-400 hover:text-white hover:border-stone-600 hover:bg-stone-800/40 transition-all cursor-pointer"
                            aria-label={key}
                          >
                            <Icon />
                          </a>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div></div>
                  )}

                  <div className="text-right text-[9px] text-stone-500 tracking-wider">
                    Jaipur, India
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
