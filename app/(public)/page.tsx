"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

import MissionVision from '../components/MissionVision';
import FeaturedProjects from '../components/FeaturedProjects';

const services = [
  {
    num: '01',
    title: 'Residential Design',
    desc: 'Bespoke living spaces that reflect your personality — from concept to a fully-styled sanctuary.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
  },
  {
    num: '02',
    title: 'Commercial Spaces',
    desc: 'Dynamic environments that inspire productivity, impress clients, and embody your brand identity.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80',
  },
  {
    num: '03',
    title: 'Architecture & PMC',
    desc: 'End-to-end project management, contractor coordination, and on-site quality supervision.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80',
  },
  {
    num: '04',
    title: 'Cost Estimation',
    desc: 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=800&q=80',
  },
];

const process = [
  { num: '01', title: 'Discovery', desc: 'We listen, analyse, and immerse ourselves in your vision and lifestyle to understand every detail.' },
  { num: '02', title: 'Concept', desc: 'Spatial layouts, mood boards, and 3D previews that define the creative direction of your project.' },
  { num: '03', title: 'Execution', desc: 'Procurement, contractor management, and meticulous quality audits at every stage.' },
  { num: '04', title: 'Handover', desc: 'A curated reveal of your new space, followed by our ongoing partnership and post-care.' },
];

const stats = [
  { value: '500+', label: 'Projects Delivered' },
  { value: '15+', label: 'Years Experience' },
  { value: '100%', label: 'Client Satisfaction' },
  { value: '2M+', label: 'Social Followers' },
];

const advantage = [
  { title: 'Post-Delivery Care', desc: 'Our commitment extends beyond handover. We offer continuous structural support long after project completion.' },
  { title: 'Zero-Disruption Process', desc: 'We manage every granular detail so you can maintain your schedule undisturbed during the entire transformation.' },
  { title: 'Dedicated Art Director', desc: 'A senior principal architect serves as your exclusive liaison from sketch to final styling and handover.' },
  { title: 'Bespoke Sourcing', desc: 'Access to rare materials, custom furniture artisans, and exclusive design catalogs.' },
];

function ServicesList() {
  const [hovered, setHovered] = useState<number | null>(null);
  return (
    <div className="divide-y divide-stone-100">
      {services.map((service, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: idx * 0.06 }}
          onMouseEnter={() => setHovered(idx)}
          onMouseLeave={() => setHovered(null)}
          className={`group transition-colors duration-300 ${hovered === idx ? 'bg-[#1C1917]' : 'bg-white'}`}
        >
          <Link href="/services" className="grid grid-cols-[56px_1fr_auto] lg:grid-cols-[72px_1fr_auto_auto] gap-6 lg:gap-12 items-center py-7 lg:py-8">
            <span className={`text-[9px] font-mono transition-colors duration-300 ${hovered === idx ? 'text-stone-600' : 'text-stone-300'}`}>
              {service.num}
            </span>
            <div>
              <h3 className={`font-serif font-bold text-xl lg:text-2xl transition-colors duration-300 ${hovered === idx ? 'text-white' : 'text-[#1C1917]'}`}>
                {service.title}
              </h3>
            </div>
            <p className={`hidden lg:block text-xs font-light leading-relaxed max-w-xs transition-colors duration-300 ${hovered === idx ? 'text-stone-500' : 'text-stone-400'}`}>
              {service.desc}
            </p>
            <div className={`w-9 h-9 border flex items-center justify-center flex-shrink-0 transition-all duration-300 ${hovered === idx ? 'border-stone-700 bg-stone-800' : 'border-stone-200'}`}>
              <ArrowUpRight className={`w-4 h-4 transition-colors duration-300 ${hovered === idx ? 'text-white' : 'text-stone-400'}`} />
            </div>
          </Link>
        </motion.div>
      ))}
    </div>
  );
}

export default function Home() {
  const heroImage = 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90';


  return (
    <div className="bg-[#FAF9F5] text-[#1C1917] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">

      {/* ── 01 — HERO (Full Bleed Image with Overlaid Text) ── */}
      <section className="relative w-full h-[78vh] md:h-[82vh] min-h-[500px] overflow-hidden">

        {/* Background Image */}
        <motion.div
          initial={{ scale: 1.06 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease: 'easeOut' }}
          className="absolute inset-0"
        >
          <img
            src={heroImage}
            alt="DVL Architects — Architecture & Interiors"
            className="w-full h-full object-cover"
          />
          {/* Dark gradient overlay — stronger at bottom-left where text sits */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/30 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-transparent to-transparent" />
        </motion.div>


        {/* Bottom-left: Main content */}
        <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-16 pb-12 z-10">
          <div className="max-w-[900px]">

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.9, delay: 0.4, ease: 'easeOut' }}
              className="font-serif font-bold text-white tracking-tight leading-[1.0] text-[clamp(2.8rem,7vw,6rem)] mb-5"
            >
              Designing Spaces<br />
              <span className="italic font-normal text-white/80">That Inspire.</span>
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.65 }}
            >
              <p className="text-white/65 text-sm sm:text-base font-light leading-relaxed max-w-sm">
                We make architecture, interiors, and design that is innovative, refined, and remarkable.
              </p>
            </motion.div>

          </div>

          {/* Bottom right: Stats strip */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.9 }}
            className="hidden md:flex absolute bottom-12 right-8 lg:right-16 gap-8 lg:gap-12"
          >
            {stats.slice(0, 3).map((s, i) => (
              <div key={i} className="text-right">
                <div className="text-xl font-serif font-bold text-white">{s.value}</div>
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/50 font-bold mt-0.5">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>

      </section>

      {/* ── 02 — SELECTED WORKS ── */}
      <FeaturedProjects />

      {/* ── 03 — ABOUT ── */}
      <section className="bg-white py-24 lg:py-32 border-t border-stone-200">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-20">

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end gap-8 mb-16 pb-12 border-b border-stone-200"
          >
            <div className="lg:w-1/3 flex-shrink-0">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[1px] bg-stone-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">About The Studio</span>
              </div>
              <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400">Jaipur, India · Established 2009</span>
            </div>
            <h2 className="lg:w-2/3 text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] leading-tight tracking-tight">
              We translate human aspirations into architectural realities, creating spaces{' '}
              <span className="italic font-serif">that inspire.</span>
            </h2>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="aspect-[4/3] overflow-hidden border border-stone-200">
                <img
                  src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80"
                  alt="Studio Interior"
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-[1500ms]"
                />
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="flex flex-col gap-8"
            >
              <p className="text-[#57534E] text-base leading-relaxed font-light">
                Our practice is built on a commitment to spatial logic, material integrity, and refined detailing. From spatial flows to furniture selection, we ensure each project expresses a unified design concept.
              </p>

              <div className="grid grid-cols-2 gap-6 border-t border-b border-stone-200 py-6">
                {stats.map((s, i) => (
                  <div key={i}>
                    <div className="text-2xl font-bold font-serif text-[#1C1917]">{s.value}</div>
                    <div className="text-[9px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">{s.label}</div>
                  </div>
                ))}
              </div>

              <Link
                href="/about"
                className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1917] hover:text-stone-500 transition-colors group w-fit"
              >
                <span className="border-b border-[#1C1917]/20 group-hover:border-[#1C1917] pb-0.5 transition-colors">Our Approach</span>
                <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── 04 — SERVICES (Image Card Grid) ── */}
      <section className="bg-[#1C1917] py-24 border-t border-stone-800">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-20">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12 pb-10 border-b border-stone-700"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[1px] bg-stone-500" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Proficiency</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                Services We Offer
              </h2>
            </div>
            <p className="text-stone-400 max-w-xs text-sm leading-relaxed font-light">
              Comprehensive interior design and architectural consultancy.
            </p>
          </motion.div>

          {/* 2×2 Image Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-5">
            {services.map((service, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <Link
                  href="/services"
                  className="group relative block h-[320px] lg:h-[380px] overflow-hidden"
                >
                  {/* Image */}
                  <img
                    src={service.img}
                    alt={service.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-[1800ms] ease-out scale-100 group-hover:scale-108"
                  />

                  {/* Base dark overlay */}
                  <div className="absolute inset-0 bg-black/55 group-hover:bg-black/35 transition-all duration-700" />

                  {/* Content */}
                  <div className="absolute inset-0 p-7 flex flex-col justify-between">
                    {/* Top: number */}
                    <span className="text-[10px] font-mono text-white/40 group-hover:text-white/70 transition-colors duration-500">
                      {service.num}
                    </span>

                    {/* Bottom: title + desc */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white leading-tight mb-3 translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                        {service.title}
                      </h3>
                      <p className="text-white/0 group-hover:text-white/75 text-sm font-light leading-relaxed max-w-xs transition-all duration-500 translate-y-3 group-hover:translate-y-0">
                        {service.desc}
                      </p>
                    </div>
                  </div>

                  {/* Bottom-right arrow */}
                  <div className="absolute bottom-7 right-7 w-9 h-9 border border-white/20 group-hover:border-white/60 flex items-center justify-center transition-all duration-500">
                    <ArrowUpRight className="w-4 h-4 text-white/40 group-hover:text-white transition-colors duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 04b — SERVICES LIST (Editorial hover rows) ── */}
      <section className="bg-white border-t border-stone-100">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-20">
          <div className="flex items-center justify-between py-8 border-b border-stone-100">
            <div className="flex items-center gap-3">
              <div className="w-5 h-[1px] bg-stone-300" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">All Services</span>
            </div>
            <Link href="/services" className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-[#1C1917] transition-colors font-bold hidden lg:block">
              View All →
            </Link>
          </div>

          <ServicesList />

          <div className="py-8 border-t border-stone-100 flex justify-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1917] hover:text-stone-500 transition-colors group"
            >
              <span className="border-b border-[#1C1917]/20 group-hover:border-[#1C1917] pb-0.5 transition-colors">Explore All Services</span>
              <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── 05 — WHY DVL (Split Dark Layout) ── */}
      <section className="bg-[#FAF9F5] py-24 border-t border-stone-200">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-20">

          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Big Statement */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:sticky lg:top-32"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-6 h-[1px] bg-stone-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">Why DVL</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] leading-[1.1] mb-8 tracking-tight">
                Built on trust,<br />
                <span className="italic font-normal text-stone-400">delivered</span><br />
                with precision.
              </h2>
              <p className="text-[#57534E] text-base font-light leading-relaxed max-w-sm">
                Every project is a commitment — to quality, to the client, and to creating spaces that stand the test of time.
              </p>
            </motion.div>

            {/* Right: 2×2 Bordered Items */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-0 border border-stone-200">
              {[
                { num: '01', title: 'On-Time Delivery', desc: 'We honour every deadline with disciplined project schedules and proactive risk management.' },
                { num: '02', title: 'Transparent Budgeting', desc: 'No hidden costs. Every rupee is accounted for with detailed breakdowns from day one.' },
                { num: '03', title: 'End-to-End Service', desc: 'From concept sketches to the final styling of your space — one team, zero handoffs.' },
                { num: '04', title: '15+ Years of Mastery', desc: 'Over 500 completed spaces across Rajasthan, backed by a legacy of design excellence.' },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.08 }}
                  className={`p-8 hover:bg-stone-50 transition-colors ${
                    idx === 0 || idx === 1 ? 'border-b border-stone-200' : ''
                  } ${idx % 2 === 0 ? 'sm:border-r border-stone-200' : ''}`}
                >
                  <span className="text-[9px] font-mono text-stone-400 block mb-4">{item.num}</span>
                  <h3 className="text-base font-serif font-bold text-[#1C1917] mb-2 leading-snug">{item.title}</h3>
                  <p className="text-[#57534E] text-xs leading-relaxed font-light">{item.desc}</p>
                </motion.div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ── 06 — HOW WE WORK (Numbered Vertical Steps) ── */}
      <section className="bg-[#1C1917] py-24 border-t border-stone-800">
        <div className="max-w-[1800px] mx-auto px-8 lg:px-20">

          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-16 pb-10 border-b border-stone-700"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-[1px] bg-stone-600" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">How We Work</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-serif font-bold text-white leading-tight">
                From Brief to<br />
                <span className="italic font-normal text-stone-400">Beautiful Reality.</span>
              </h2>
            </div>
            <p className="text-stone-500 max-w-xs text-sm leading-relaxed font-light">
              A refined four-phase process perfected over 15 years of architectural practice.
            </p>
          </motion.div>

          {/* Large numbered steps — alternating layout */}
          <div className="space-y-0">
            {[
              { num: '01', title: 'Listen & Discover', sub: 'Understanding You', desc: 'We immerse ourselves in your world — your aspirations, lifestyle, and spatial needs — before a single line is drawn.' },
              { num: '02', title: 'Design & Envision', sub: 'Creating the Blueprint', desc: 'Detailed floor plans, mood boards, material palettes, and photorealistic 3D renders bring your vision to life on screen.' },
              { num: '03', title: 'Build & Supervise', sub: 'Precision Execution', desc: 'Our on-site team manages every contractor, material, and timeline to ensure flawless quality at every stage.' },
              { num: '04', title: 'Reveal & Celebrate', sub: 'Your New Space', desc: 'A curated final walkthrough of your completed space, styled to perfection, followed by our post-handover care.' },
            ].map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="group grid grid-cols-[auto_1fr] lg:grid-cols-[120px_1fr_1fr] gap-6 lg:gap-16 py-10 border-b border-stone-800 last:border-0 items-start"
              >
                {/* Large number */}
                <span className="text-[4rem] lg:text-[5rem] font-serif font-bold text-stone-700 group-hover:text-stone-500 transition-colors duration-500 leading-none">
                  {step.num}
                </span>

                {/* Title block */}
                <div className="pt-2">
                  <span className="text-[9px] font-bold uppercase tracking-[0.3em] text-stone-600 block mb-1">{step.sub}</span>
                  <h3 className="text-2xl lg:text-3xl font-serif font-bold text-white group-hover:text-stone-300 transition-colors duration-300 leading-tight">
                    {step.title}
                  </h3>
                </div>

                {/* Description — hidden on mobile, shown lg */}
                <p className="hidden lg:block text-stone-500 text-sm font-light leading-relaxed pt-3 max-w-md group-hover:text-stone-400 transition-colors duration-300">
                  {step.desc}
                </p>

                {/* Mobile description */}
                <p className="lg:hidden col-span-2 text-stone-500 text-sm font-light leading-relaxed -mt-4">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ── 07 — MISSION & VISION ── */}
      <MissionVision />

    </div>
  );
}
