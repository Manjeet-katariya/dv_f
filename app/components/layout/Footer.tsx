"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';

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

const FacebookIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const InstagramIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const TwitterIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const Footer = () => {
  const year = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState({ twitter: '', facebook: '', instagram: '', linkedin: '' });
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const [socialRes, contactRes] = await Promise.all([
          fetch(`${API_URL}/api/social-icons`),
          fetch(`${API_URL}/api/contact-details`),
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
        /* silent fail */
      }
    };
    fetchData();
  }, []);

  const trackSocialClick = (channel: string) => {
    const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
    fetch(`${API_URL}/api/social/click`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' }, keepalive: true,
      body: JSON.stringify({ channel })
    }).catch(() => {});
  };

  const socials = [
    { key: 'facebook', href: socialLinks.facebook, Icon: FacebookIcon },
    { key: 'instagram', href: socialLinks.instagram, Icon: InstagramIcon },
    { key: 'twitter', href: socialLinks.twitter, Icon: TwitterIcon },
    { key: 'linkedin', href: socialLinks.linkedin, Icon: LinkedinIcon },
  ].filter(s => s.href);

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

  return (
    <footer className="bg-[#1C1917] text-white relative border-t border-stone-800">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-14 pt-24 pb-12">

        {/* ── CENTRAL LOGO & ETHOS ── */}
        <div className="flex flex-col items-center justify-center text-center mb-24">
          <Link href="/" className="inline-block mb-6 group">
            <img
              src="/logo-dvl.png"
              alt="DVL Architects"
              className="h-16 w-16 md:h-20 md:w-20 object-cover rounded-full border border-stone-700 shadow-sm opacity-90 group-hover:opacity-100 transition-opacity mx-auto"
            />
            <span className="block mt-6 font-serif text-[12px] md:text-[14px] tracking-[0.4em] uppercase text-white">
              DVL Architects
            </span>
          </Link>
          <p className="max-w-md text-[11px] md:text-[12px] font-light text-stone-400 leading-relaxed tracking-wide mb-8">
            Where Vision Meets Timeless Design. Creating Architecture That Inspires Every Generation.
          </p>

          {socials.length > 0 && (
            <div className="flex items-center gap-4 justify-center">
              {socials.map(({ key, href, Icon }) => (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  onClick={() => trackSocialClick(key)}
                  className="flex items-center justify-center w-10 h-10 border border-stone-700 rounded-full text-stone-400 hover:text-[#1C1917] hover:border-white hover:bg-white transition-all duration-300"
                >
                  <Icon />
                </a>
              ))}
            </div>
          )}
        </div>

        {/* ── SYMMETRICAL LINKS & CONTACT ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 lg:gap-24 mb-16 text-center md:text-left">
          
          {/* Left: Quick Links */}
          <div className="flex flex-col items-center md:items-end">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-6">
              Navigation
            </h3>
            <div className="flex flex-col gap-4">
              {leftLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif text-lg text-stone-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Center: Contact Info */}
          <div className="flex flex-col items-center text-center border-t border-b md:border-t-0 md:border-b-0 md:border-l md:border-r border-stone-800 py-10 md:py-0 md:px-10">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-6">
              Studio
            </h3>
            <div className="space-y-4 text-[11px] font-light text-stone-300 leading-relaxed">
              <p>
                {contactDetails?.address?.street ? `${contactDetails.address.street}` : 'Jaike-e-Jaipur Chowpatty'}<br />
                {contactDetails?.address?.city ? `${contactDetails.address.city}, ${contactDetails.address.state}` : 'Sirsi Road, Jaipur - 302012'}<br />
                {contactDetails?.address?.country || 'Rajasthan, India'}
              </p>
              <p>
                <a href={`tel:${contactDetails?.phone || '+918619633247'}`} className="hover:text-white transition-colors">
                  {contactDetails?.phone || '+91-8619633247'}
                </a>
              </p>
              <p>
                <a href={`mailto:${contactDetails?.email || 'sparchitects93@gmail.com'}`} className="hover:text-white transition-colors">
                  {contactDetails?.email || 'sparchitects93@gmail.com'}
                </a>
              </p>
            </div>
          </div>

          {/* Right: More Links / Connect */}
          <div className="flex flex-col items-center md:items-start">
            <h3 className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-500 mb-6">
              Explore
            </h3>
            <div className="flex flex-col gap-4 mb-8">
              {rightLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="font-serif text-lg text-stone-300 hover:text-white transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

        </div>

        {/* ── BOTTOM ROW ── */}
        <div className="pt-8 border-t border-stone-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-stone-500 font-light text-center">
              © {year} DVL Architects. All rights reserved.
            </p>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
