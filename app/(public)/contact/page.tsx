"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { MapPin, Phone, Mail, ArrowRight, Calculator, Send, Loader2, Clock, ArrowUpRight } from 'lucide-react';

interface ContactDetails {
  companyName: string;
  address: { street: string; city: string; state: string; zipCode: string; country: string; };
  phone: string;
  email: string;
  businessHours?: { [key: string]: { closed?: boolean; open?: string; close?: string; } };
}

const DEFAULT_CONTACT = {
  heroTag: 'Get In Touch',
  heroHeading: 'Where Vision Meets\n*Architecture into life.*',
  heroDescription: "Great architecture starts with understanding your story. Share your ideas with us, and together we'll make spaces that are elegant, functional, and designed to stand the test of time."
};

const renderDynamicText = (text: string, italicClass = "italic font-light text-stone-500") => {
  if (!text) return null;
  return text.split('\n').map((line, lineIdx) => {
    const parts = line.split('*');
    const parsedLine = parts.map((part, partIdx) => {
      if (partIdx % 2 === 1) {
        return <span key={partIdx} className={italicClass}>{part}</span>;
      }
      return part;
    });
    return (
      <span key={lineIdx} className="block">
        {parsedLine}
      </span>
    );
  });
};

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [contactDetails, setContactDetails] = useState<ContactDetails | null>(null);
  const [loadingContact, setLoadingContact] = useState(true);
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', projectType: 'residential', subject: '', message: '', budget: 'not-sure'
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [contactData, setContactData] = useState(DEFAULT_CONTACT);

  useEffect(() => {
    const fetchContactDetails = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
        const res = await fetch(`${API_URL}/api/contact-details`);
        if (res.ok) {
          const data = await res.json();
          if (data.success) setContactDetails(data.data);
        }
      } catch { } finally {
        setLoadingContact(false);
      }
    };
    
    const fetchContactContent = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
        const res = await fetch(`${API_URL}/api/website-content`);
        const data = await res.json();
        if (data.success && data.data?.contact) {
          setContactData(data.data.contact);
        }
      } catch (err) {
        console.error('Error fetching contact content:', err);
      }
    };
    
    Promise.all([fetchContactDetails(), fetchContactContent()]);
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage('');
    try {
      const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
      const res = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      const data = await res.json();
      if (res.ok && data.success) {
        setIsSubmitted(true);
        setFormData({ name: '', email: '', phone: '', projectType: 'residential', subject: '', message: '', budget: 'not-sure' });
        setTimeout(() => setIsSubmitted(false), 5000);
      } else {
        setErrorMessage(data.message || 'Failed to submit. Please try again.');
      }
    } catch {
      setErrorMessage('Error submitting form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClass = "w-full border-b border-stone-300 bg-transparent text-[#1C1917] font-serif text-lg py-4 focus:outline-none focus:border-stone-600 transition-colors placeholder:text-stone-400 rounded-none";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">

      {/* ── 1. HEADER (Dark Hero) ── */}
      <section className="bg-[#1C1917] pt-44 pb-36 px-8 lg:px-16">
        <div className="max-w-[1700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-[1px] bg-stone-700" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">{contactData.heroTag}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h1 className="font-serif text-white text-[clamp(3rem,6vw,5.5rem)] leading-[1.05] tracking-tight">
                {renderDynamicText(contactData.heroHeading, "italic font-light text-stone-500")}
              </h1>
              <p className="text-stone-400 text-sm font-light max-w-sm leading-relaxed lg:pb-2">
                {contactData.heroDescription}
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── 2. FLOATING FORM CARD ── */}
      <section className="relative z-20 max-w-[1500px] mx-auto px-6 lg:px-14 pb-20 -mt-20 lg:-mt-28">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="bg-white shadow-[0_30px_100px_rgba(0,0,0,0.06)] border border-stone-200 flex flex-col xl:flex-row relative"
        >
          {/* Subtle Decorative Border inside the card */}
          <div className="absolute inset-3 border border-stone-150 pointer-events-none hidden md:block" />

          {/* Left Side: Context & Direct Info */}
          <div className="w-full xl:w-5/12 bg-[#F4F3EE] p-10 lg:p-16 xl:p-20 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-stone-50 rounded-full blur-3xl pointer-events-none" />
            
            <div>
              <h2 className="font-serif text-[#1C1917] text-5xl lg:text-6xl leading-tight mb-6">
                Initiate a <br className="hidden xl:block" />
                <span className="italic font-light text-stone-500">Dialogue.</span>
              </h2>
              <p className="text-[#57534E] text-base leading-relaxed font-light mb-12 max-w-md">
                Together, let’s bring something extraordinary to life. Whether you have a clear vision or just a blank canvas, our team is ready to help you bring your architectural dreams to life.
              </p>
            </div>

            <div className="space-y-8 border-t border-stone-200 pt-10">
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold block mb-2">Direct Line</span>
                <a href={`tel:${contactDetails?.phone || '+918619633247'}`} className="text-xl font-serif text-[#1C1917] hover:text-stone-600 transition-colors">
                  {loadingContact ? 'Loading...' : (contactDetails?.phone || '+91-8619633247')}
                </a>
              </div>
              <div>
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold block mb-2">Digital Desk</span>
                <a href={`mailto:${contactDetails?.email || 'sparchitects93@gmail.com'}`} className="text-xl font-serif text-[#1C1917] hover:text-stone-600 transition-colors">
                  {loadingContact ? 'Loading...' : (contactDetails?.email || 'sparchitects93@gmail.com')}
                </a>
              </div>
            </div>
          </div>

          {/* Right Side: The Form */}
          <div className="w-full xl:w-7/12 p-10 lg:p-16 xl:p-20 bg-white relative z-10">
            
            {errorMessage && (
              <div className="mb-8 p-5 border border-red-500/20 bg-red-50 text-red-700 text-sm font-light">
                {errorMessage}
              </div>
            )}
            {isSubmitted && (
              <div className="mb-8 p-5 border border-stone-300 bg-[#FAF9F5] text-[#1C1917] text-sm font-medium flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1C1917] text-white flex items-center justify-center shrink-0">✓</div>
                Inquiry submitted successfully. A principal designer will be in touch shortly.
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Your Name *</label>
                  <input type="text" name="name" value={formData.name} onChange={handleInputChange} required placeholder="John Doe" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Email Address *</label>
                  <input type="email" name="email" value={formData.email} onChange={handleInputChange} required placeholder="john@example.com" className={inputClass} />
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Phone Number</label>
                  <input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} placeholder="+91 XXXXX XXXXX" className={inputClass} />
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Estimated Budget</label>
                  <div className="relative">
                    <select name="budget" value={formData.budget} onChange={handleInputChange} className={selectClass}>
                      <option value="not-sure">Select a range (Optional)</option>
                      <option value="under-5lakh">Under 5 Lakh</option>
                      <option value="5-10-lakh">5-10 Lakh</option>
                      <option value="10-25-lakh">10-25 Lakh</option>
                      <option value="25-50-lakh">25-50 Lakh</option>
                      <option value="50-lakh-plus">50 Lakh+</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Project Type</label>
                  <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={selectClass}>
                    <option value="residential">Residential</option>
                    <option value="commercial">Commercial</option>
                    <option value="renovation">Renovation</option>
                    <option value="interior">Interior Design</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Project Title *</label>
                  <input type="text" name="subject" value={formData.subject} onChange={handleInputChange} required placeholder="e.g. Luxury Villa Design" className={inputClass} />
                </div>
              </div>
              
              <div className="pt-2">
                <label className="block text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">Project Details *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  required
                  placeholder="Tell us about your vision, requirements, and timeline..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting || isSubmitted}
                  className="w-full bg-[#1C1917] text-[#FAF9F5] hover:bg-stone-800 px-8 py-4 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-300 flex items-center justify-center gap-4 disabled:opacity-60 shadow-lg cursor-pointer"
                >
                  {isSubmitting ? (
                    <><Loader2 className="w-4 h-4 animate-spin" /> Submitting...</>
                  ) : isSubmitted ? (
                    '✓ Inquiry Received'
                  ) : (
                    <>Submit Inquiry <Send className="w-4 h-4" /></>
                  )}
                </button>
              </div>
            </form>

          </div>
        </motion.div>
      </section>

      {/* ── 3. ESTIMATE CTA (LIGHT BANNER) ── */}
      <section className="py-24 bg-[#F4F3EE] border-t border-stone-200">
        <div className="max-w-[1500px] mx-auto px-6 lg:px-14">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row items-center justify-between gap-10 p-10 lg:p-16 border border-stone-300 bg-[#FAF9F5] shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.02)] transition-all duration-500 group"
          >
            <div className="flex items-center gap-8">
              <div className="hidden md:flex items-center justify-center w-20 h-20 rounded-full border border-stone-300 group-hover:bg-[#1C1917] transition-colors duration-500">
                <Calculator className="w-8 h-8 text-stone-600 group-hover:text-[#FAF9F5] transition-colors duration-500" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-4xl font-serif text-[#1C1917] mb-3">Require a quick cost projection?</h3>
                <p className="text-[#57534E] font-light text-sm">Utilize our smart estimation tool for instant clarity before consulting.</p>
              </div>
            </div>
            <Link
              href="/calculator"
              className="flex-shrink-0 bg-[#1C1917] text-[#FAF9F5] hover:bg-stone-800 px-10 py-5 font-bold uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center gap-3 shadow-md"
            >
              Cost Calculator <ArrowUpRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 4. STUDIO INFO (THE ATELIER GRID) ── */}
      <section className="py-24 bg-[#FAF9F5] border-t border-stone-200">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <div className="h-[1px] w-10 bg-stone-300" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-500">The Atelier</span>
              <div className="h-[1px] w-10 bg-stone-300" />
            </div>
            <h2 className="text-4xl font-serif text-[#1C1917]">Visit Our Studio</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                Icon: MapPin,
                title: 'Headquarters',
                content: loadingContact ? 'Loading...' : contactDetails
                  ? `${contactDetails.address.street}\n${contactDetails.address.city}, ${contactDetails.address.state}`
                  : 'Jaike-e-Jaipur Chowpatty,\nSirsi Road, Jaipur'
              },
              {
                Icon: Phone,
                title: 'Direct Line',
                content: loadingContact ? 'Loading...' : (contactDetails?.phone || '+91-8619633247')
              },
              {
                Icon: Mail,
                title: 'Digital Desk',
                content: loadingContact ? 'Loading...' : (contactDetails?.email || 'sparchitects93@gmail.com')
              },
              {
                Icon: Clock,
                title: 'Operating Hours',
                content: 'Monday to Friday\n11:00 AM — 6:00 PM\nSunday: Closed'
              },
            ].map(({ Icon, title, content }, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="bg-white p-10 flex flex-col items-center text-center border border-stone-200 shadow-[0_4px_20px_rgba(0,0,0,0.01)] group hover:border-[#1C1917] transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-[#FAF9F5] flex items-center justify-center mb-6 group-hover:bg-[#1C1917] transition-colors duration-300 shadow-sm border border-stone-100">
                  <Icon className="w-4 h-4 text-stone-600 group-hover:text-[#FAF9F5] transition-colors duration-300" strokeWidth={1.5} />
                </div>
                <div className="text-[10px] uppercase tracking-[0.2em] text-[#1C1917] font-bold mb-3">{title}</div>
                <p className="text-stone-500 text-xs font-light leading-relaxed whitespace-pre-line">{content}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}