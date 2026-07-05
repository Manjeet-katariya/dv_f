"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight } from 'lucide-react';

import MissionVision from '../components/MissionVision';
import FeaturedProjects from '../components/FeaturedProjects';

const services = [
  {
    num: '01',
    title: 'Residential',
    desc: 'Bespoke living spaces that reflect your personality — from concept to a fully-styled sanctuary.',
    img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920',
  },
  {
    num: '02',
    title: 'Commercial',
    desc: 'Dynamic environments that inspire productivity, impress clients, and embody your brand identity.',
    img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920',
  },
  {
    num: '03',
    title: 'Architecture',
    desc: 'End-to-end project management, contractor coordination, and on-site quality supervision.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920',
  },
  {
    num: '04',
    title: 'Estimation',
    desc: 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920',
  },
];

const customEase = [0.16, 1, 0.3, 1];

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#FAF9F5] text-[#1C1917] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">

      {/* ── 01 — HERO (Full Screen Cinematic) ── */}
      <section className="relative w-full h-screen min-h-[600px] overflow-hidden flex flex-col items-center justify-center">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: scrollY * 0.4 }} // subtle parallax
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: customEase }}
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90"
            alt="DVL Architects"
            className="w-full h-full object-cover"
          />
          {/* Vignette Overlay for pure editorial feel */}
          <div className="absolute inset-0 bg-black/30" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60" />
        </motion.div>

        {/* Centered Typography */}
        <div className="relative z-10 text-center px-4 mt-20">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: customEase }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-12 h-[1px] bg-white/60" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">Architecture & Interiors</span>
            <div className="w-12 h-[1px] bg-white/60" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: customEase }}
            className="font-serif text-white tracking-tight leading-[0.95] text-[clamp(4rem,10vw,9rem)]"
          >
            Design That<br />
            <span className="italic font-light">Inspires.</span>
          </motion.h1>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 1.2 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 z-10"
        >
          <span className="text-[9px] uppercase tracking-[0.3em] text-white/60">Discover</span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            <ArrowDown className="w-4 h-4 text-white/60" strokeWidth={1.5} />
          </motion.div>
        </motion.div>
      </section>

      {/* ── 02 — THE ETHOS (Massive Statement) ── */}
      <section className="bg-white py-32 lg:py-48 flex items-center justify-center relative z-20">
        <div className="max-w-[1200px] mx-auto px-8 lg:px-16 text-center">
          <motion.h2 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.5, ease: customEase }}
            className="font-serif text-[#1C1917] text-[clamp(2.5rem,5vw,5rem)] leading-[1.1] tracking-tight"
          >
            We translate human aspirations into architectural realities, creating spaces that are <span className="italic font-light text-stone-400">timeless, refined, and distinctly yours.</span>
          </motion.h2>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.4, ease: customEase }}
            className="mt-16 flex justify-center"
          >
            <Link
              href="/about"
              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1917] hover:text-stone-500 transition-colors group"
            >
              <span className="border-b border-[#1C1917]/20 group-hover:border-[#1C1917] pb-1 transition-colors">Our Philosophy</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── 03 — FEATURED PROJECTS ── */}
      <div className="relative z-20 bg-[#FAF9F5]">
        <FeaturedProjects />
      </div>



      {/* ── 05 — EXPERTISE (Massive Hover Reveal) ── */}
      <section className="relative bg-[#1C1917] py-24 lg:py-32 overflow-hidden flex flex-col justify-center z-20">
        
        {/* Background Images for Services */}
        <AnimatePresence>
          {hoveredService !== null && (
            <motion.div
              key={hoveredService}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: customEase }}
              className="absolute inset-0 z-0"
            >
              <img 
                src={services[hoveredService].img} 
                alt="Service Background" 
                className="w-full h-full object-cover opacity-40 grayscale"
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        <div className="absolute inset-0 bg-[#1C1917]/60 z-0 pointer-events-none" />

        <div className="relative z-10 max-w-[1700px] mx-auto w-full px-8 lg:px-20">
          
          <div className="flex items-center gap-4 mb-16">
            <div className="w-8 h-[1px] bg-stone-500" />
            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Expertise</span>
          </div>

          <div className="flex flex-col">
            {services.map((service, idx) => (
              <Link 
                href="/services"
                key={idx}
                onMouseEnter={() => setHoveredService(idx)}
                onMouseLeave={() => setHoveredService(null)}
                className="group border-t border-stone-800 last:border-b py-8 lg:py-12 cursor-pointer relative block"
              >
                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
                  <div className="flex items-start lg:items-center gap-6 lg:gap-16">
                    <span className={`text-sm font-mono transition-colors duration-500 ${hoveredService === idx ? 'text-white' : 'text-stone-600'}`}>
                      {service.num}
                    </span>
                    <h3 className={`font-serif text-4xl lg:text-7xl transition-colors duration-500 tracking-tight ${hoveredService === idx ? 'text-white italic font-light' : 'text-stone-400'}`}>
                      {service.title}
                    </h3>
                  </div>
                  
                  <div className="lg:w-1/3 flex items-center justify-between lg:justify-end gap-10">
                    <p className={`text-sm font-light leading-relaxed max-w-sm transition-all duration-500 ${hoveredService === idx ? 'text-white/90 translate-x-0 opacity-100' : 'text-stone-600 lg:opacity-0 lg:-translate-x-8'}`}>
                      {service.desc}
                    </p>
                    <div className={`w-12 h-12 rounded-full border flex flex-shrink-0 items-center justify-center transition-all duration-500 ${hoveredService === idx ? 'border-white bg-white text-[#1C1917]' : 'border-stone-800 text-stone-600'}`}>
                      <ArrowUpRight className="w-5 h-5" />
                    </div>
                  </div>
                </div>
                
                {/* Hover line fill */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-white group-hover:w-full transition-all duration-1000 ease-out z-20" />
              </Link>
            ))}
          </div>

          <div className="mt-16 flex justify-end">
            <Link
              href="/services"
              className="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-white hover:text-stone-300 transition-colors group"
            >
              <span className="border-b border-white/30 group-hover:border-white pb-1 transition-colors">View All Disciplines</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>
          </div>

        </div>
      </section>

      {/* ── 06 — MISSION & VISION ── */}
      <div className="relative z-20">
        <MissionVision />
      </div>

    </div>
  );
}
