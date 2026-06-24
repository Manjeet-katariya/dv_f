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
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
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

  const footerLinks = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Services', href: '/services' },
    { name: 'About', href: '/about' },
    { name: 'Team', href: '/team' },
    { name: 'Blogs', href: '/blogs' },
    { name: 'Calculator', href: '/calculator' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <footer className="bg-[#F4F3EE] relative border-t border-stone-200">
      {/* Top accent line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent opacity-30" />

      <div className="max-w-[1700px] mx-auto px-6 lg:px-14 pt-16 pb-12">

        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

          {/* Logo & Description */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo-dvl.png"
                alt="DVL Architects"
                className="h-14 w-14 object-cover rounded-full border border-stone-200 shadow-sm opacity-90 hover:opacity-100 transition-opacity"
              />
            </Link>
            <p className="text-[11px] font-light text-[#57534E] leading-relaxed tracking-wide mb-6">
              Crafting exceptional spaces that blend luxury, functionality, and timeless design. Transforming visions into architectural masterpieces.
            </p>

            {socials.length > 0 && (
              <div className="flex items-center gap-3">
                {socials.map(({ key, href, Icon }) => (
                  <a
                    key={key}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={key}
                    onClick={() => trackSocialClick(key)}
                    className="flex items-center justify-center w-8 h-8 border border-stone-200/60 text-[#57534E] hover:text-[#1C1917] hover:border-stone-400 hover:bg-stone-50 transition-all duration-300"
                  >
                    <Icon />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Links */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1C1917] mb-8">
              Quick Links
            </h3>
            <div className="space-y-3">
              {footerLinks.map(link => (
                <Link
                  key={link.name}
                  href={link.href}
                  className="block text-[10px] font-medium uppercase tracking-[0.15em] text-[#57534E] hover:text-[#1C1917] transition-colors duration-300"
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1C1917] mb-8">
              Contact Info
            </h3>
            <div className="space-y-4 text-[11px] font-light text-[#57534E] leading-relaxed">
              <div>
                <p className="font-semibold text-[#878076] text-[10px] uppercase tracking-wider mb-1">STUDIO ADDRESS</p>
                <p>{contactDetails?.address?.street ? `${contactDetails.address.street}` : 'Jaike-e-Jaipur Chowpatty'}<br />
                  {contactDetails?.address?.city ? `${contactDetails.address.city}, ${contactDetails.address.state}` : 'Sirsi Road, Jaipur - 302012'}<br />
                  {contactDetails?.address?.country || 'Rajasthan, India'}</p>
              </div>
              <div>
                <p className="font-semibold text-[#878076] text-[10px] uppercase tracking-wider mb-1">PHONE</p>
                <a href={`tel:${contactDetails?.phone || '+918619633247'}`} className="hover:text-[#1C1917] transition-colors">
                  {contactDetails?.phone || '+91-8619633247'}
                </a>
              </div>
              <div>
                <p className="font-semibold text-[#878076] text-[10px] uppercase tracking-wider mb-1">EMAIL</p>
                <a href={`mailto:${contactDetails?.email || 'sparchitects93@gmail.com'}`} className="hover:text-[#1C1917] transition-colors">
                  {contactDetails?.email || 'sparchitects93@gmail.com'}
                </a>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="lg:col-span-1">
            <h3 className="text-[10px] font-black uppercase tracking-[0.25em] text-[#1C1917] mb-8">
              Connect
            </h3>

            <Link
              href="/contact"
              className="inline-flex items-center justify-center text-[9px] font-black uppercase tracking-[0.2em] px-6 py-3 bg-[#1C1917] text-[#FAF9F5] hover:bg-stone-800 transition-all duration-300 shadow-[0_2px_16px_rgba(28,25,23,0.15)] hover:shadow-[0_4px_24px_rgba(28,25,23,0.25)]"
            >
              Start Project
            </Link>
          </div>

        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-stone-200/80">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#878076] font-light">
              © {year} DVL Architects. All rights reserved.
            </p>
            <p className="text-[9px] uppercase tracking-[0.2em] text-[#878076] font-light">
              Designed & Developed by{' '}
              <a
                href="#"
                className="text-[#1C1917] hover:text-stone-500 transition-colors font-medium"
              >
                Nine Degree
              </a>
            </p>
          </div>
        </div>

      </div>

      {/* Bottom line */}
      <div className="h-[1px] w-full bg-gradient-to-r from-transparent via-stone-200 to-transparent" />
    </footer>
  );
};

export default Footer;
