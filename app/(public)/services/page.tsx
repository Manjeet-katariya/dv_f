"use client";

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, ArrowRight } from 'lucide-react';
import Link from 'next/link';

const services = [
  {
    num: '01',
    tag: 'Residential',
    title: 'Homes Built Around You',
    desc: 'We design homes that are deeply personal — where architecture meets lifestyle. From sprawling villas to compact urban apartments, every space is planned for beauty, function, and longevity.',
    features: ['Custom Villa & Bungalow Design', 'Kitchen & Bathroom Remodels', 'Bedroom & Living Sanctuaries', 'Lighting & Material Planning'],
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',
  },
  {
    num: '02',
    tag: 'Commercial',
    title: 'Spaces That Mean Business',
    desc: 'Your workspace is your brand made physical. We design offices, retail stores, and hospitality venues that communicate excellence and leave a lasting impression on every visitor.',
    features: ['Corporate Office Strategy', 'Retail & Showroom Design', 'Hospitality & Restaurant Ambience', 'Brand Identity Integration'],
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900',
  },
  {
    num: '03',
    tag: 'Architecture & PMC',
    title: 'We Run the Site. You Rest.',
    desc: 'Acting as your eyes and ears on-site, we coordinate every contractor, enforce timelines, audit quality, and protect your investment throughout the entire build.',
    features: ['Contractor Coordination', 'Timeline & Budget Control', 'On-Site Quality Audits', 'Risk & Compliance Management'],
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900',
  },
  {
    num: '04',
    tag: 'Cost Estimation',
    title: 'Know Every Number. Always.',
    desc: 'No hidden costs. No budget shocks. We deliver detailed financial blueprints — material breakdowns, labour estimates, and contingency plans — so you commit with full confidence.',
    features: ['Detailed Material Estimates', 'Labour & Timeline Costing', 'Budget Optimisation Reports', 'Financial Feasibility Studies'],
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900',
  },
];

const process = [
  { num: '01', title: 'Listen', desc: 'Deep discovery — understanding your lifestyle, goals, and spatial needs.' },
  { num: '02', title: 'Design', desc: 'Floor plans, mood boards, 3D renders — a complete visual language.' },
  { num: '03', title: 'Approve', desc: 'You review and sign off. Nothing moves until you are satisfied.' },
  { num: '04', title: 'Build', desc: 'We supervise every stage — materials, contractors, checkpoints.' },
  { num: '05', title: 'Handover', desc: 'A curated reveal followed by dedicated post-handover support.' },
];

export default function ServicesPage() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO: Full-bleed image with centered overlay ── */}
      <section className="relative w-full h-[75vh] min-h-[520px] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920"
          alt="DVL Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strong bottom gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />

        {/* Top strip */}
        <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-8 lg:px-16 pt-8 z-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-3"
          >
            <div className="w-5 h-[1px] bg-white/40" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-white/40">Services</span>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="hidden lg:flex items-center gap-10"
          >
            {[['500+', 'Projects'], ['15+', 'Years'], ['4', 'Disciplines']].map(([val, lbl]) => (
              <div key={lbl} className="text-right">
                <div className="text-base font-serif font-bold text-white/70">{val}</div>
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/30">{lbl}</div>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Bottom-left: Headline */}
        <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-16 pb-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h1 className="font-serif font-bold text-white text-[clamp(3rem,6.5vw,6rem)] leading-[0.95] tracking-tight">
              What We<br />
              <span className="italic font-normal text-white/60">Create For You.</span>
            </h1>
            <p className="text-white/45 text-sm font-light mt-5 max-w-sm leading-relaxed">
              End-to-end architectural and interior design services — from the first sketch to a curated handover.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── SERVICES: Hover-reveal list rows ── */}
      <section className="bg-white">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          {/* Section label */}
          <div className="flex items-center justify-between py-8 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-5 h-[1px] bg-stone-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Disciplines</span>
            </div>
            <span className="text-[9px] uppercase tracking-[0.2em] text-stone-300 hidden lg:block">Hover to explore</span>
          </div>

          {/* Service rows — hover reveals image */}
          <div>
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.07 }}
                onMouseEnter={() => setHovered(idx)}
                onMouseLeave={() => setHovered(null)}
                className={`group relative border-b border-stone-100 transition-colors duration-300 ${hovered === idx ? 'bg-[#1C1917]' : 'bg-white'}`}
              >
                <div className="grid grid-cols-[60px_1fr_auto] lg:grid-cols-[80px_1fr_320px_auto] gap-6 lg:gap-12 items-center py-8 lg:py-10 cursor-default">

                  {/* Number */}
                  <span className={`text-[9px] font-mono transition-colors duration-300 ${hovered === idx ? 'text-stone-600' : 'text-stone-300'}`}>
                    {service.num}
                  </span>

                  {/* Title + tag */}
                  <div>
                    <div className={`text-[8px] font-bold uppercase tracking-[0.3em] mb-2 transition-colors duration-300 ${hovered === idx ? 'text-stone-600' : 'text-stone-400'}`}>
                      {service.tag}
                    </div>
                    <h2 className={`font-serif font-bold text-2xl lg:text-3xl transition-colors duration-300 ${hovered === idx ? 'text-white' : 'text-[#1C1917]'}`}>
                      {service.title}
                    </h2>
                  </div>

                  {/* Description — desktop only */}
                  <p className={`hidden lg:block text-xs font-light leading-relaxed transition-colors duration-300 ${hovered === idx ? 'text-stone-400' : 'text-stone-400'}`}>
                    {service.desc}
                  </p>

                  {/* Arrow */}
                  <Link
                    href="/contact"
                    className={`w-10 h-10 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${hovered === idx ? 'border-stone-700 bg-stone-800 text-white' : 'border-stone-200 text-stone-400 group-hover:border-stone-400'}`}
                  >
                    <ArrowUpRight className="w-4 h-4" />
                  </Link>

                </div>

                {/* Hover: expanded features + image */}
                <AnimatePresence>
                  {hovered === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
                      className="overflow-hidden"
                    >
                      <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-16 pb-10 pl-[72px] lg:pl-[92px] pr-16">
                        {/* Features */}
                        <div className="grid grid-cols-2 gap-x-8 gap-y-3">
                          {service.features.map((f, i) => (
                            <div key={i} className="flex items-center gap-2">
                              <div className="w-1 h-1 rounded-full bg-stone-600 flex-shrink-0" />
                              <span className="text-xs text-stone-400 font-light">{f}</span>
                            </div>
                          ))}
                        </div>
                        {/* Image */}
                        <div className="hidden lg:block aspect-video overflow-hidden">
                          <img src={service.img} alt={service.title} className="w-full h-full object-cover opacity-60" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── WHY DVL: 3-column on a tinted background ── */}
      <section className="bg-stone-50 border-y border-stone-100 py-20">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-0 divide-y lg:divide-y-0 lg:divide-x divide-stone-200">
            {[
              { num: 'I', title: 'End-to-End Ownership', desc: "We don't just design — we manage the entire process from concept to handover, so you never have to chase contractors or worry about timelines." },
              { num: 'II', title: 'Transparent Pricing', desc: 'Detailed cost estimates before work begins. No surprises, no hidden charges — just clarity at every stage of your project.' },
              { num: 'III', title: 'Post-Handover Support', desc: "Our relationship doesn't end at handover. We provide structural support and care for months after your space is delivered." },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 lg:p-12"
              >
                <div className="text-[2.5rem] font-serif text-stone-200 font-bold leading-none mb-6">{item.num}</div>
                <h3 className="font-serif font-bold text-[#1C1917] text-lg mb-3">{item.title}</h3>
                <p className="text-[#57534E] text-sm font-light leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── PROCESS: Horizontal numbered row ── */}
      <section className="bg-[#1C1917] py-20">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-14 pb-10 border-b border-stone-800">
            <div className="flex items-center gap-3">
              <div className="w-5 h-[1px] bg-stone-700" />
              <h2 className="font-serif font-bold text-white text-2xl lg:text-3xl">
                Five Steps to Your <span className="italic font-normal text-stone-500">Perfect Space.</span>
              </h2>
            </div>
            <p className="text-stone-600 text-sm font-light max-w-xs">A transparent, proven workflow. No surprises.</p>
          </div>

          {/* Steps — horizontal with connecting line */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[40px] right-[40px] h-[1px] bg-stone-800 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-8 lg:gap-4 relative z-10">
              {process.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="group flex flex-col"
                >
                  {/* Circle node */}
                  <div className="w-16 h-16 rounded-full border border-stone-800 group-hover:border-stone-600 group-hover:bg-stone-800 flex items-center justify-center mb-6 transition-colors duration-300 bg-[#1C1917]">
                    <span className="text-[9px] font-mono text-stone-600 group-hover:text-stone-400 transition-colors">{step.num}</span>
                  </div>
                  <h3 className="font-serif font-bold text-white text-base mb-2 group-hover:text-stone-300 transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-stone-600 text-xs font-light leading-relaxed group-hover:text-stone-500 transition-colors">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-white py-20 border-t border-stone-100">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 flex flex-col lg:flex-row lg:items-center justify-between gap-10">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="w-5 h-[1px] bg-stone-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">Get Started</span>
            </div>
            <h2 className="font-serif font-bold text-[#1C1917] text-3xl lg:text-4xl leading-tight mb-3">
              Ready to build something<br />
              <span className="italic font-normal text-stone-400">remarkable?</span>
            </h2>
            <p className="text-[#57534E] text-sm font-light max-w-md">
              No obligation. Just an honest conversation about what your space could become.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="flex flex-col sm:flex-row gap-4 flex-shrink-0"
          >
            <Link href="/contact" className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#1C1917] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors">
              Start a Conversation <ArrowRight className="w-4 h-4" />
            </Link>
            <Link href="/portfolio" className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-stone-200 text-[#1C1917] text-[10px] font-bold uppercase tracking-[0.2em] hover:border-stone-400 transition-colors">
              View Our Work
            </Link>
          </motion.div>
        </div>
      </section>

    </div>
  );
}