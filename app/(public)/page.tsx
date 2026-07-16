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
    title: 'Interior Designing',
    desc: 'Bespoke indoors and furniture fit-outs crafted to represent your personal tastes.',
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920',
  },
  {
    num: '04',
    title: 'Hospitality',
    desc: 'Immersive café, hotel, and restaurant designs that foster memorable guest experiences.',
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920',
  },
  {
    num: '05',
    title: 'Architecture & PMC',
    desc: 'End-to-end project management, contractor coordination, and on-site quality supervision.',
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920',
  },
  {
    num: '06',
    title: 'Cost Estimation',
    desc: 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920',
  },
];

const customEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

const DEFAULT_HOME = {
  heroSubtitle: 'Architecture & Interiors',
  heroTitle: 'Designing Spaces\n*That Inspire.*',
  heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=90',
  heroDescription: 'We make architecture, interiors, and design that is innovative, refined, and remarkable.',
  heroStats: [
    { val: '180', label: 'Projects Delivered' },
    { val: '8+', label: 'Years Experience' },
    { val: '100%', label: 'Client Satisfaction' }
  ],
  ethosHeading: 'We translate human aspirations into architectural realities, creating spaces that *inspire.*',
  ethosLinkText: 'Our Philosophy',
  service1Title: 'Residential',
  service1Desc: 'Bespoke living spaces that reflect your personality — from concept to a fully-styled sanctuary.',
  service1Img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920',
  service2Title: 'Commercial',
  service2Desc: 'Dynamic environments that inspire productivity, impress clients, and embody your brand identity.',
  service2Img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920',
  service3Title: 'Interior Designing',
  service3Desc: 'Bespoke indoors and furniture fit-outs crafted to represent your personal tastes.',
  service3Img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920',
  service4Title: 'Hospitality',
  service4Desc: 'Immersive café, hotel, and restaurant designs that foster memorable guest experiences.',
  service4Img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920',
  service5Title: 'Architecture & PMC',
  service5Desc: 'End-to-end project management, contractor coordination, and on-site quality supervision.',
  service5Img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920',
  service6Title: 'Cost Estimation',
  service6Desc: 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
  service6Img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920',
  philosophyHeading: 'Turning Dreams into\n*Timeless Spaces.*',
  philosophySubheading: 'Every great space begins with a dream.',
  philosophyDescription: 'At D.V.L Architects, we work closely with our clients to understand not just what they want to build, but how they want to live. We believe exceptional architecture is deeply personal—it should reflect your identity, enhance your daily life, and remain beautiful for generations.',
  philosophyQuote: 'Our purpose is simple: to create spaces that inspire, comfort, and leave a lasting legacy.',
  philosophyStat1Val: '180+',
  philosophyStat1Label: 'Projects Delivered',
  philosophyStat2Val: '8+',
  philosophyStat2Label: 'Years Experience',
  philosophyStat3Val: '100%',
  philosophyStat3Label: 'Client Satisfaction',
};

const renderDynamicText = (text: string, italicClass = "italic font-light") => {
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

export default function Home() {
  const [hoveredService, setHoveredService] = useState<number | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [homeData, setHomeData] = useState(DEFAULT_HOME);

  const servicesList = [
    {
      num: '01',
      title: homeData.service1Title || 'Residential',
      desc: homeData.service1Desc || 'Bespoke living spaces that reflect your personality — from concept to a fully-styled sanctuary.',
      img: homeData.service1Img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1920',
    },
    {
      num: '02',
      title: homeData.service2Title || 'Commercial',
      desc: homeData.service2Desc || 'Dynamic environments that inspire productivity, impress clients, and embody your brand identity.',
      img: homeData.service2Img || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920',
    },
    {
      num: '03',
      title: homeData.service3Title || 'Interior Designing',
      desc: homeData.service3Desc || 'Bespoke indoors and furniture fit-outs crafted to represent your personal tastes.',
      img: homeData.service3Img || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=1920',
    },
    {
      num: '04',
      title: homeData.service4Title || 'Hospitality',
      desc: homeData.service4Desc || 'Immersive café, hotel, and restaurant designs that foster memorable guest experiences.',
      img: homeData.service4Img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1920',
    },
    {
      num: '05',
      title: homeData.service5Title || 'Architecture & PMC',
      desc: homeData.service5Desc || 'End-to-end project management, contractor coordination, and on-site quality supervision.',
      img: homeData.service5Img || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1920',
    },
    {
      num: '06',
      title: homeData.service6Title || 'Cost Estimation',
      desc: homeData.service6Desc || 'Precision budgeting with transparent breakdowns. Know your numbers before the first brick is laid.',
      img: homeData.service6Img || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=1920',
    },
  ];

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const fetchHomeContent = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
        const res = await fetch(`${API_URL}/api/website-content`);
        const data = await res.json();
        if (data.success && data.data?.home) {
          setHomeData(data.data.home);
        }
      } catch (err) {
        console.error('Error fetching home content:', err);
      }
    };
    fetchHomeContent();
  }, []);

  return (
    <div className="bg-[#FAF9F5] text-[#1C1917] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">
      {/* ── 01 — HERO (Full Screen Cinematic) ── */}
      <section className="relative w-full h-[80dvh] md:h-[100dvh] min-h-[500px] md:min-h-[600px] overflow-hidden flex flex-col items-center justify-center">
        {/* Parallax Background Image */}
        <motion.div
          className="absolute inset-0 z-0"
          style={{ y: typeof window !== 'undefined' && window.innerWidth > 768 ? scrollY * 0.3 : 0 }}
        >
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2.5, ease: customEase }}
            src={homeData.heroImage}
            alt="DVL Architects"
            className="w-full h-full object-cover object-center"
          />
          {/* Vignette Overlay for pure editorial feel & readability */}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-transparent to-black/75" />
        </motion.div>
 
        {/* Centered Typography */}
        <div className="relative z-10 text-center px-6 mt-20 w-full max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.2, ease: customEase }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <div className="w-8 md:w-12 h-[1px] bg-white/60" />
            <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.4em] text-white/80">{homeData.heroSubtitle}</span>
            <div className="w-8 md:w-12 h-[1px] bg-white/60" />
          </motion.div>
          
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.5, delay: 0.4, ease: customEase }}
            className="font-serif text-white tracking-tight leading-[1.05] md:leading-[0.95] text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl"
          >
            {renderDynamicText(homeData.heroTitle, "italic font-light")}
          </motion.h1>
        </div>

        {/* Hero Bottom Strip (Stats only) */}
        <div className="absolute bottom-8 left-0 right-0 w-full px-8 lg:px-16 hidden md:flex items-end justify-end z-10 text-white">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.5, delay: 0.8 }}
            className="flex items-center gap-8 lg:gap-12 text-right"
          >
            {(homeData.heroStats || []).map((stat, i) => (
              <div key={i}>
                <div className="text-xl lg:text-2xl font-serif font-bold text-white leading-none">{stat.val}</div>
                <div className="text-[8px] uppercase tracking-[0.2em] text-white/50 mt-2 font-bold">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
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
            {renderDynamicText(homeData.ethosHeading, "italic font-light text-stone-400")}
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
              <span className="border-b border-[#1C1917]/20 group-hover:border-[#1C1917] pb-1 transition-colors">{homeData.ethosLinkText}</span>
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
                src={servicesList[hoveredService].img} 
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
            {servicesList.map((service, idx) => (
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

      <div className="relative z-20">
        <MissionVision data={homeData} />
      </div>

    </div>
  );
}
