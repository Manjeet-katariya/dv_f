"use client";

import { useState, useEffect } from 'react';
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
    tag: 'Interior Designing',
    title: 'Bespoke Indoors & Furniture',
    desc: 'From space planning and material curation to custom furniture design, we create cohesive interiors that represent your personal tastes and functional requirements.',
    features: ['Space Curation & Layouts', 'Bespoke Furniture & Fit-outs', 'Material & Paint Consulting', 'Decorative Lighting & Accents'],
    img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900',
  },
  {
    num: '04',
    tag: 'Hospitality',
    title: 'Immersive Guest Experiences',
    desc: 'We design hotels, resorts, cafés, and restaurants that foster memorable guest experiences through exceptional ambiance, clever spatial layouts, and durable luxury materials.',
    features: ['Bespoke Restaurant & Café Layouts', 'Lobby & Reception Styling', 'Luxury Resort Masterplanning', 'Guest Room & Suite Ergonomics'],
    img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900',
  },
  {
    num: '05',
    tag: 'Architecture & PMC',
    title: 'We Run the Site. You Rest.',
    desc: 'Acting as your eyes and ears on-site, we coordinate every contractor, enforce timelines, audit quality, and protect your investment throughout the entire build.',
    features: ['Contractor Coordination', 'Timeline & Budget Control', 'On-Site Quality Audits', 'Risk & Compliance Management'],
    img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900',
  },
  {
    num: '06',
    tag: 'Cost Estimation',
    title: 'Know Every Number. Always.',
    desc: 'No hidden costs. No budget shocks. We deliver detailed financial blueprints — material breakdowns, labour estimates, and contingency plans — so you commit with full confidence.',
    features: ['Detailed Material Estimates', 'Labour & Timeline Costing', 'Budget Optimisation Reports', 'Financial Feasibility Studies'],
    img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900',
  },
];

const process = [
  { num: '01', title: 'Listen & Discover', desc: 'We immerse ourselves in your world — your aspirations, lifestyle, and spatial needs — before a single line is drawn.' },
  { num: '02', title: 'Design & Envision', desc: 'Detailed floor plans, mood boards, material palettes, and photorealistic 3D renders bring your vision to life on screen.' },
  { num: '03', title: 'Build & Supervise', desc: 'Our on-site team manages every contractor, material, and timeline to ensure flawless quality at every stage.' },
  { num: '04', title: 'Reveal & Celebrate', desc: 'A curated final walkthrough of your completed space, styled to perfection, followed by our post-handover care.' },
];

const DEFAULT_SERVICES = {
  heroHeading: 'What We\n*Create For You.*',
  heroDescription: 'End-to-end architectural and interior design services — from the first sketch to a curated handover.',
  heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1920',
  process1Title: 'Listen & Discover',
  process1Desc: 'We immerse ourselves in your world — your aspirations, lifestyle, and spatial needs — before a single line is drawn.',
  process2Title: 'Design & Envision',
  process2Desc: 'Detailed floor plans, mood boards, material palettes, and photorealistic 3D renders bring your vision to life on screen.',
  process3Title: 'Build & Supervise',
  process3Desc: 'Our on-site team manages every contractor, material, and timeline to ensure flawless quality at every stage.',
  process4Title: 'Reveal & Celebrate',
  process4Desc: 'A curated final walkthrough of your completed space, styled to perfection, followed by our post-handover care.',
  discipline1Tag: 'Residential',
  discipline1Title: 'Homes Built Around You',
  discipline1Desc: 'We design homes that are deeply personal — where architecture meets lifestyle. From sprawling villas to compact urban apartments, every space is planned for beauty, function, and longevity.',
  discipline1Feature1: 'Custom Villa & Bungalow Design',
  discipline1Feature2: 'Kitchen & Bathroom Remodels',
  discipline1Feature3: 'Bedroom & Living Sanctuaries',
  discipline1Feature4: 'Lighting & Material Planning',
  discipline1Img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',

  discipline2Tag: 'Commercial',
  discipline2Title: 'Spaces That Mean Business',
  discipline2Desc: 'Your workspace is your brand made physical. We design offices, retail stores, and hospitality venues that communicate excellence and leave a lasting impression on every visitor.',
  discipline2Feature1: 'Corporate Office Strategy',
  discipline2Feature2: 'Retail & Showroom Design',
  discipline2Feature3: 'Hospitality & Restaurant Ambience',
  discipline2Feature4: 'Brand Identity Integration',
  discipline2Img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900',

  discipline3Tag: 'Interior Designing',
  discipline3Title: 'Bespoke Indoors & Furniture',
  discipline3Desc: 'From space planning and material curation to custom furniture design, we create cohesive interiors that represent your personal tastes and functional requirements.',
  discipline3Feature1: 'Space Curation & Layouts',
  discipline3Feature2: 'Bespoke Furniture & Fit-outs',
  discipline3Feature3: 'Material & Paint Consulting',
  discipline3Feature4: 'Decorative Lighting & Accents',
  discipline3Img: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900',

  discipline4Tag: 'Hospitality',
  discipline4Title: 'Immersive Guest Experiences',
  discipline4Desc: 'We design hotels, resorts, cafés, and restaurants that foster memorable guest experiences through exceptional ambiance, clever spatial layouts, and durable luxury materials.',
  discipline4Feature1: 'Bespoke Restaurant & Café Layouts',
  discipline4Feature2: 'Lobby & Reception Styling',
  discipline4Feature3: 'Luxury Resort Masterplanning',
  discipline4Feature4: 'Guest Room & Suite Ergonomics',
  discipline4Img: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900',

  discipline5Tag: 'Architecture & PMC',
  discipline5Title: 'We Run the Site. You Rest.',
  discipline5Desc: 'Acting as your eyes and ears on-site, we coordinate every contractor, enforce timelines, audit quality, and protect your investment throughout the entire build.',
  discipline5Feature1: 'Contractor Coordination',
  discipline5Feature2: 'Timeline & Budget Control',
  discipline5Feature3: 'On-Site Quality Audits',
  discipline5Feature4: 'Risk & Compliance Management',
  discipline5Img: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900',

  discipline6Tag: 'Cost Estimation',
  discipline6Title: 'Know Every Number. Always.',
  discipline6Desc: 'No hidden costs. No budget shocks. We deliver detailed financial blueprints — material breakdowns, labour estimates, and contingency plans — so you commit with full confidence.',
  discipline6Feature1: 'Detailed Material Estimates',
  discipline6Feature2: 'Labour & Timeline Costing',
  discipline6Feature3: 'Budget Optimisation Reports',
  discipline6Feature4: 'Financial Feasibility Studies',
  discipline6Img: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900',

  why1Title: 'End-to-End Ownership',
  why1Desc: "We don't just design — we manage the entire process from concept to handover, so you never have to chase contractors or worry about timelines.",
  why2Title: 'Transparent Pricing',
  why2Desc: 'Detailed cost estimates before work begins. No surprises, no hidden charges — just clarity at every stage of your project.',
  why3Title: 'Post-Handover Support',
  why3Desc: "Our relationship doesn't end at handover. We provide structural support and care for months after your space is delivered.",
};

const renderDynamicText = (text: string, italicClass = "italic font-light text-white/70") => {
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

export default function ServicesPage() {
  const [hovered, setHovered] = useState<number | null>(null);
  const [servicesData, setServicesData] = useState(DEFAULT_SERVICES);

  const disciplinesList = [
    {
      num: '01',
      tag: servicesData.discipline1Tag || 'Residential',
      title: servicesData.discipline1Title || 'Homes Built Around You',
      desc: servicesData.discipline1Desc || 'We design homes that are deeply personal — where architecture meets lifestyle. From sprawling villas to compact urban apartments, every space is planned for beauty, function, and longevity.',
      features: [
        servicesData.discipline1Feature1 || 'Custom Villa & Bungalow Design',
        servicesData.discipline1Feature2 || 'Kitchen & Bathroom Remodels',
        servicesData.discipline1Feature3 || 'Bedroom & Living Sanctuaries',
        servicesData.discipline1Feature4 || 'Lighting & Material Planning'
      ],
      img: servicesData.discipline1Img || 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=900',
    },
    {
      num: '02',
      tag: servicesData.discipline2Tag || 'Commercial',
      title: servicesData.discipline2Title || 'Spaces That Mean Business',
      desc: servicesData.discipline2Desc || 'Your workspace is your brand made physical. We design offices, retail stores, and hospitality venues that communicate excellence and leave a lasting impression on every visitor.',
      features: [
        servicesData.discipline2Feature1 || 'Corporate Office Strategy',
        servicesData.discipline2Feature2 || 'Retail & Showroom Design',
        servicesData.discipline2Feature3 || 'Hospitality & Restaurant Ambience',
        servicesData.discipline2Feature4 || 'Brand Identity Integration'
      ],
      img: servicesData.discipline2Img || 'https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=900',
    },
    {
      num: '03',
      tag: servicesData.discipline3Tag || 'Interior Designing',
      title: servicesData.discipline3Title || 'Bespoke Indoors & Furniture',
      desc: servicesData.discipline3Desc || 'From space planning and material curation to custom furniture design, we create cohesive interiors that represent your personal tastes and functional requirements.',
      features: [
        servicesData.discipline3Feature1 || 'Space Curation & Layouts',
        servicesData.discipline3Feature2 || 'Bespoke Furniture & Fit-outs',
        servicesData.discipline3Feature3 || 'Material & Paint Consulting',
        servicesData.discipline3Feature4 || 'Decorative Lighting & Accents'
      ],
      img: servicesData.discipline3Img || 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?q=80&w=900',
    },
    {
      num: '04',
      tag: servicesData.discipline4Tag || 'Hospitality',
      title: servicesData.discipline4Title || 'Immersive Guest Experiences',
      desc: servicesData.discipline4Desc || 'We design hotels, resorts, cafés, and restaurants that foster memorable guest experiences through exceptional ambiance, clever spatial layouts, and durable luxury materials.',
      features: [
        servicesData.discipline4Feature1 || 'Bespoke Restaurant & Café Layouts',
        servicesData.discipline4Feature2 || 'Lobby & Reception Styling',
        servicesData.discipline4Feature3 || 'Luxury Resort Masterplanning',
        servicesData.discipline4Feature4 || 'Guest Room & Suite Ergonomics'
      ],
      img: servicesData.discipline4Img || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=900',
    },
    {
      num: '05',
      tag: servicesData.discipline5Tag || 'Architecture & PMC',
      title: servicesData.discipline5Title || 'We Run the Site. You Rest.',
      desc: servicesData.discipline5Desc || 'Acting as your eyes and ears on-site, we coordinate every contractor, enforce timelines, audit quality, and protect your investment throughout the entire build.',
      features: [
        servicesData.discipline5Feature1 || 'Contractor Coordination',
        servicesData.discipline5Feature2 || 'Timeline & Budget Control',
        servicesData.discipline5Feature3 || 'On-Site Quality Audits',
        servicesData.discipline5Feature4 || 'Risk & Compliance Management'
      ],
      img: servicesData.discipline5Img || 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=900',
    },
    {
      num: '06',
      tag: servicesData.discipline6Tag || 'Cost Estimation',
      title: servicesData.discipline6Title || 'Know Every Number. Always.',
      desc: servicesData.discipline6Desc || 'No hidden costs. No budget shocks. We deliver detailed financial blueprints — material breakdowns, labour estimates, and contingency plans — so you commit with full confidence.',
      features: [
        servicesData.discipline6Feature1 || 'Detailed Material Estimates',
        servicesData.discipline6Feature2 || 'Labour & Timeline Costing',
        servicesData.discipline6Feature3 || 'Budget Optimisation Reports',
        servicesData.discipline6Feature4 || 'Financial Feasibility Studies'
      ],
      img: servicesData.discipline6Img || 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=900',
    },
  ];

  const whyChooseList = [
    { num: 'I', title: servicesData.why1Title || 'End-to-End Ownership', desc: servicesData.why1Desc || "We don't just design — we manage the entire process from concept to handover, so you never have to chase contractors or worry about timelines." },
    { num: 'II', title: servicesData.why2Title || 'Transparent Pricing', desc: servicesData.why2Desc || 'Detailed cost estimates before work begins. No surprises, no hidden charges — just clarity at every stage of your project.' },
    { num: 'III', title: servicesData.why3Title || 'Post-Handover Support', desc: servicesData.why3Desc || "Our relationship doesn't end at handover. We provide structural support and care for months after your space is delivered." },
  ];

  const processSteps = [
    { num: '01', title: servicesData.process1Title || 'Listen & Discover', desc: servicesData.process1Desc || 'We immerse ourselves in your world — your aspirations, lifestyle, and spatial needs — before a single line is drawn.' },
    { num: '02', title: servicesData.process2Title || 'Design & Envision', desc: servicesData.process2Desc || 'Detailed floor plans, mood boards, material palettes, and photorealistic 3D renders bring your vision to life on screen.' },
    { num: '03', title: servicesData.process3Title || 'Build & Supervise', desc: servicesData.process3Desc || 'Our on-site team manages every contractor, material, and timeline to ensure flawless quality at every stage.' },
    { num: '04', title: servicesData.process4Title || 'Reveal & Celebrate', desc: servicesData.process4Desc || 'A curated final walkthrough of your completed space, styled to perfection, followed by our post-handover care.' },
  ];

  useEffect(() => {
    const fetchServicesContent = async () => {
      try {
        const API_URL = (globalThis as any).process?.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const res = await fetch(`${API_URL}/api/website-content`);
        const data = await res.json();
        if (data.success && data.data?.services) {
          setServicesData(data.data.services);
        }
      } catch (err) {
        console.error('Error fetching services content:', err);
      }
    };
    fetchServicesContent();
  }, []);

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ── HERO: Full-bleed image with centered overlay ── */}
      <section className="relative w-full h-[75vh] min-h-[520px] overflow-hidden">
        <img
          src={servicesData.heroImage}
          alt="DVL Services"
          className="absolute inset-0 w-full h-full object-cover"
        />
        {/* Strong bottom gradient so text is readable */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/10" />



        {/* Bottom-left: Headline */}
        <div className="absolute bottom-0 left-0 right-0 px-8 lg:px-16 pb-12 z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2 }}
          >
            <h1 className="font-serif text-white text-[clamp(3.5rem,7vw,6.5rem)] leading-[0.95] tracking-tight">
              {renderDynamicText(servicesData.heroHeading, "italic font-light text-white/70")}
            </h1>
            <p className="text-white/45 text-sm font-light mt-5 max-w-sm leading-relaxed">
              {servicesData.heroDescription}
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
            {disciplinesList.map((service, idx) => (
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
                <div className="grid grid-cols-[36px_1fr_auto] lg:grid-cols-[80px_1fr_320px_auto] gap-4 md:gap-8 lg:gap-12 items-center py-6 lg:py-10 cursor-default">

                  {/* Number */}
                  <span className={`text-[9px] font-mono transition-colors duration-300 ${hovered === idx ? 'text-stone-600' : 'text-stone-300'}`}>
                    {service.num}
                  </span>

                  {/* Title + tag */}
                  <div>
                    <div className={`text-[8px] font-bold uppercase tracking-[0.3em] mb-1.5 transition-colors duration-300 ${hovered === idx ? 'text-stone-600' : 'text-stone-400'}`}>
                      {service.tag}
                    </div>
                    <h2 className={`font-serif text-2xl sm:text-3xl lg:text-4xl transition-colors duration-300 ${hovered === idx ? 'text-white' : 'text-[#1C1917]'}`}>
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
                      <div className="grid lg:grid-cols-[1fr_300px] gap-8 lg:gap-16 pb-10 pl-[48px] sm:pl-[72px] lg:pl-[92px] pr-6 sm:pr-16">
                        {/* Features */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
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
            {whyChooseList.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-10 lg:p-12"
              >
                <div className="text-[3rem] font-serif text-stone-200 leading-none mb-6">{item.num}</div>
                <h3 className="font-serif text-[#1C1917] text-xl mb-3">{item.title}</h3>
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
              <h2 className="font-serif text-white text-4xl lg:text-5xl">
                From Brief to <span className="italic font-light text-stone-500">Beautiful Reality.</span>
              </h2>
            </div>
            <p className="text-stone-600 text-sm font-light max-w-xs">A refined four-phase process perfected over 8 years of architectural practice.</p>
          </div>

          {/* Steps — horizontal with connecting line */}
          <div className="relative">
            {/* Connecting line (desktop only) */}
            <div className="hidden lg:block absolute top-8 left-[40px] right-[40px] h-[1px] bg-stone-800 z-0" />

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6 relative z-10">
              {processSteps.map((step, i) => (
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
                  <h3 className="font-serif text-white text-lg mb-2 group-hover:text-stone-300 transition-colors">
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
            <h2 className="font-serif text-[#1C1917] text-4xl lg:text-5xl leading-tight mb-3">
              Ready to build something<br />
              <span className="italic font-light text-stone-400">remarkable?</span>
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