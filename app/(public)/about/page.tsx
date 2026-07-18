"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  bio: string;
  image: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
}

interface Founder {
  _id?: string;
  name: string;
  title: string;
  quote: string;
  image: string;
  bio?: string;
}

const journeySteps = [
  { year: '2010', title: 'The Inception', desc: 'Founded with a vision to redefine interior spaces through thoughtful design and premium craftsmanship in Jaipur.' },
  { year: '2015', title: 'First Recognition', desc: 'Awarded the National Design Excellence Award for our groundbreaking work on the Horizon Residential Complex.' },
  { year: '2020', title: 'Expanding Horizons', desc: 'Scaled our studio to serve commercial clients across Rajasthan with end-to-end project management capabilities.' },
  { year: '2024', title: 'Sustainable Future', desc: 'Committed to integrating eco-friendly materials and sustainable practices into every new project we undertake.' },
];

const fallbackTeam: TeamMember[] = [
  { _id: 't1', name: 'Eleanor Vance', position: 'Principal Architect', bio: 'With over 20 years of experience, Eleanor leads the studio with a distinct vision for blending modern minimalism with timeless warmth.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80' },
  { _id: 't2', name: 'Marcus Sterling', position: 'Design Director', bio: 'Marcus oversees all creative operations, ensuring every project aligns with our uncompromising standards of luxury and functionality.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80' },
  { _id: 't3', name: 'Sophia Lin', position: 'Lead Interior Designer', bio: 'Sophia specializes in bespoke furniture curation and textile selection, bringing distinct character to every residential and commercial space.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80' },
];

const DEFAULT_ABOUT = {
  heroHeading: 'We design spaces\n*that outlast*\ntrends.',
  heroDescription: 'DVL Architects & Interiors is a full-service design studio based in Jaipur. We combine architectural rigour with interior sensibility to create spaces that are beautiful, functional, and built to last.',
  heroImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?q=80&w=1400',
  heroStats: [
    { val: '180+', label: 'Projects Delivered' },
    { val: '8+', label: 'Years of Practice' }
  ],
  ethosTitle1: 'Design with Purpose.',
  ethosTitle2: 'Build with Integrity.',
  ethosDescription1: 'At D.V.L Architects, we believe exceptional architecture begins with clarity of thought, not excess of form. Every project is shaped by its purpose, its context, and the people who will experience it. We create spaces that are timeless, functional, and emotionally meaningful—where beauty is a natural outcome of thoughtful design.',
  ethosDescription2: 'Our process is built on collaboration, transparency, and meticulous attention to detail. From the first conversation to the final handover, we remain committed to delivering architecture that reflects your vision while exceeding expectations.',
  pillar1Title: 'Precision',
  pillar1Desc: 'Every material, dimension, and finish is deliberate. We leave nothing to chance.',
  pillar2Title: 'Permanence',
  pillar2Desc: 'We design for longevity — spaces that look as good in 20 years as on day one.',
  pillar3Title: 'Partnership',
  pillar3Desc: 'Your vision is the brief. We listen first, then create — together.',
  value1Title: 'Uncompromising Quality',
  value1Desc: 'We source only the finest materials and partner with master craftsmen. Every detail is an opportunity to exceed expectations.',
  value2Title: 'Sustainable Thinking',
  value2Desc: 'Beauty should not come at the cost of the environment. We integrate eco-conscious choices into every project decision.',
  value3Title: 'Collaborative Vision',
  value3Desc: 'Your aspirations are our blueprint. We maintain full transparency and work alongside you from concept to completion.',
  journey1Year: '2010',
  journey1Title: 'The Inception',
  journey1Desc: 'Founded with a vision to redefine interior spaces through thoughtful design and premium craftsmanship in Jaipur.',
  journey2Year: '2015',
  journey2Title: 'First Recognition',
  journey2Desc: 'Awarded the National Design Excellence Award for our groundbreaking work on the Horizon Residential Complex.',
  journey3Year: '2020',
  journey3Title: 'Expanding Horizons',
  journey3Desc: 'Scaled our studio to serve commercial clients across Rajasthan with end-to-end project management capabilities.',
  journey4Year: '2024',
  journey4Title: 'Sustainable Future',
  journey4Desc: 'Committed to integrating eco-friendly materials and sustainable practices into every new project we undertake.',
};

const renderDynamicText = (text: string, italicClass = "italic font-light text-stone-400") => {
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

export default function AboutPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [founder, setFounder] = useState<Founder | null>(null);
  const [loading, setLoading] = useState(true);
  const [aboutData, setAboutData] = useState(DEFAULT_ABOUT);

  const journeyList = [
    { year: aboutData.journey1Year || '2010', title: aboutData.journey1Title || 'The Inception', desc: aboutData.journey1Desc || 'Founded with a vision to redefine interior spaces through thoughtful design and premium craftsmanship in Jaipur.' },
    { year: aboutData.journey2Year || '2015', title: aboutData.journey2Title || 'First Recognition', desc: aboutData.journey2Desc || 'Awarded the National Design Excellence Award for our groundbreaking work on the Horizon Residential Complex.' },
    { year: aboutData.journey3Year || '2020', title: aboutData.journey3Title || 'Expanding Horizons', desc: aboutData.journey3Desc || 'Scaled our studio to serve commercial clients across Rajasthan with end-to-end project management capabilities.' },
    { year: aboutData.journey4Year || '2024', title: aboutData.journey4Title || 'Sustainable Future', desc: aboutData.journey4Desc || 'Committed to integrating eco-friendly materials and sustainable practices into every new project we undertake.' },
  ];

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const res = await fetch(`${API_URL}/api/team`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) setTeamMembers(data.data);
        else setTeamMembers(fallbackTeam);
      } catch { setTeamMembers(fallbackTeam); }
    };
    const fetchFounder = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const res = await fetch(`${API_URL}/api/founder`);
        const data = await res.json();
        if (data.success && data.data) setFounder(data.data);
      } catch { /* silent */ }
    };
    const fetchWebsiteContent = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
        const res = await fetch(`${API_URL}/api/website-content`);
        const data = await res.json();
        if (data.success && data.data?.about) {
          setAboutData(data.data.about);
        }
      } catch { /* silent */ }
    };
    Promise.all([fetchTeam(), fetchFounder(), fetchWebsiteContent()]).finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans">

      {/* ── 1. HERO: Split Panel / Responsive Background ── */}
      <section className="relative grid grid-cols-1 lg:grid-cols-2 min-h-[100dvh] lg:min-h-[88vh] overflow-hidden">
        
        {/* Background Image on Mobile (Overlay behind text) */}
        <div className="absolute inset-0 z-0 block lg:hidden">
          <img
            src={aboutData.heroImage}
            alt="DVL Studio Mobile"
            className="w-full h-full object-cover object-center"
          />
          {/* Dark overlay for readability */}
          <div className="absolute inset-0 bg-black/65" />
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/75" />
        </div>
 
        {/* Left: Dark content panel (now overlay on mobile, solid on desktop) */}
        <div className="relative z-10 bg-transparent lg:bg-[#1C1917] flex flex-col justify-between px-6 lg:px-16 pt-28 pb-16 lg:pt-44 lg:pb-14 w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
          >
 
            <h1 className="font-serif text-white text-3xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight mb-6 lg:mb-8">
              {renderDynamicText(aboutData.heroHeading, "italic font-light text-stone-400")}
            </h1>
            <p className="text-stone-300 lg:text-stone-500 text-sm font-light leading-relaxed max-w-sm">
              {aboutData.heroDescription}
            </p>
          </motion.div>
 
          {/* Stats */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="grid grid-cols-2 gap-6 border-t border-stone-700 lg:border-stone-800 pt-8 mt-10 lg:mt-14"
          >
            {(aboutData.heroStats || []).map((stat) => (
              <div key={stat.label}>
                <div className="text-4xl font-serif text-white mb-1">{stat.val}</div>
                <div className="text-[9px] uppercase tracking-[0.25em] text-stone-400 lg:text-stone-500 mt-2">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
 
        {/* Right: Image (Desktop only) */}
        <motion.div
          initial={{ opacity: 0, scale: 1.04 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.2, ease: 'easeOut' }}
          className="relative overflow-hidden hidden lg:block"
        >
          <img
            src={aboutData.heroImage}
            alt="DVL Studio"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
        </motion.div>
      </section>

      {/* ── 2. STUDIO ETHOS ── */}
      <section className="bg-[#FAF9F5] py-24 border-b border-stone-200">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

            {/* Left: Quote */}
            <motion.div
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-5 h-[1px] bg-stone-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">Our Ethos</span>
              </div>
              <h2 className="font-serif text-4xl lg:text-5xl text-[#1C1917] leading-tight mb-3">
                {aboutData.ethosTitle1 || 'Design with Purpose.'}
              </h2>
              <h2 className="font-serif text-4xl lg:text-5xl italic font-light text-stone-400 leading-tight mb-10">
                {aboutData.ethosTitle2 || 'Build with Integrity.'}
              </h2>
              <div className="space-y-5 text-[#57534E] text-sm font-light leading-relaxed max-w-md">
                <p>{aboutData.ethosDescription1 || 'At D.V.L Architects, we believe exceptional architecture begins with clarity of thought, not excess of form. Every project is shaped by its purpose, its context, and the people who will experience it. We create spaces that are timeless, functional, and emotionally meaningful—where beauty is a natural outcome of thoughtful design.'}</p>
                <p>{aboutData.ethosDescription2 || 'Our process is built on collaboration, transparency, and meticulous attention to detail. From the first conversation to the final handover, we remain committed to delivering architecture that reflects your vision while exceeding expectations.'}</p>
              </div>
            </motion.div>

            {/* Right: 3 Pillars */}
            <motion.div
              initial={{ opacity: 0, x: 24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="space-y-0 divide-y divide-stone-200 mt-4"
            >
              {[
                { num: '01', title: aboutData.pillar1Title || 'Precision', desc: aboutData.pillar1Desc || 'Every material, dimension, and finish is deliberate. We leave nothing to chance.' },
                { num: '02', title: aboutData.pillar2Title || 'Permanence', desc: aboutData.pillar2Desc || 'We design for longevity — spaces that look as good in 20 years as on day one.' },
                { num: '03', title: aboutData.pillar3Title || 'Partnership', desc: aboutData.pillar3Desc || 'Your vision is the brief. We listen first, then create — together.' },
              ].map((item) => (
                <div key={item.num} className="group flex items-start gap-8 py-8 hover:bg-stone-50 transition-colors px-2">
                  <span className="text-[9px] font-mono text-stone-300 mt-1 flex-shrink-0">{item.num}</span>
                  <div>
                    <h3 className="font-serif text-[#1C1917] text-xl mb-2 group-hover:text-stone-600 transition-colors">{item.title}</h3>
                    <p className="text-[#57534E] text-xs font-light leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── 3. CORE VALUES (Dark) ── */}
      <section className="bg-[#1C1917] py-24 border-b border-stone-800">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-14 pb-10 border-b border-stone-800"
          >
            <div className="w-5 h-[1px] bg-stone-700" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-600">Core Values</span>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 divide-y md:divide-y-0 md:divide-x divide-stone-800">
            {[
              { num: '01', title: aboutData.value1Title || 'Uncompromising Quality', desc: aboutData.value1Desc || 'We source only the finest materials and partner with master craftsmen. Every detail is an opportunity to exceed expectations.' },
              { num: '02', title: aboutData.value2Title || 'Sustainable Thinking', desc: aboutData.value2Desc || 'Beauty should not come at the cost of the environment. We integrate eco-conscious choices into every project decision.' },
              { num: '03', title: aboutData.value3Title || 'Collaborative Vision', desc: aboutData.value3Desc || 'Your aspirations are our blueprint. We maintain full transparency and work alongside you from concept to completion.' },
            ].map((val, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-10 lg:p-12 hover:bg-stone-800/40 transition-colors"
              >
                <div className="text-[4rem] font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-none mb-8">
                  {val.num}
                </div>
                <h3 className="font-serif text-white text-2xl mb-4 group-hover:text-stone-300 transition-colors">{val.title}</h3>
                <p className="text-stone-600 text-sm font-light leading-relaxed group-hover:text-stone-500 transition-colors">{val.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. FOUNDER ── */}
      {founder && (
        <section className="bg-[#FAF9F5] py-24 border-b border-stone-200">
          <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

            <div className="flex items-center gap-3 mb-14">
              <div className="w-5 h-[1px] bg-stone-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">The Founder</span>
            </div>

            <div className="grid lg:grid-cols-2 gap-14 lg:gap-24 items-center">

              {/* Image */}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative aspect-[3/4] overflow-hidden"
              >
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-[1500ms]"
                />
              </motion.div>

              {/* Text */}
              <motion.div
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.15 }}
              >
                <span className="text-[9px] font-mono text-stone-400 block mb-4">{founder.title}</span>
                <h2 className="font-serif text-[#1C1917] text-5xl lg:text-6xl mb-8 leading-tight">{founder.name}</h2>
                <blockquote className="font-serif italic font-light text-2xl text-stone-400 leading-relaxed mb-8 border-l-2 border-stone-300 pl-6">
                  "{founder.quote}"
                </blockquote>
                {founder.bio && (
                  <p className="text-[#57534E] text-sm font-light leading-relaxed max-w-md">{founder.bio}</p>
                )}
              </motion.div>

            </div>
          </div>
        </section>
      )}

      {/* ── 5. TEAM ── */}
      <section className="bg-[#FAF9F5] py-24 border-b border-stone-200">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-14 pb-10 border-b border-stone-200"
          >
            <div>
              <div className="flex items-center gap-3 mb-3">
                <div className="w-5 h-[1px] bg-stone-400" />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">The Team</span>
              </div>
              <h2 className="font-serif text-[#1C1917] text-4xl lg:text-5xl leading-tight">
                People Behind<br />
                <span className="italic font-light text-stone-400">Every Space.</span>
              </h2>
            </div>
            <p className="text-[#57534E] text-sm font-light max-w-xs leading-relaxed">
              A collective of architects, designers, and craftspeople — united by a commitment to exceptional work.
            </p>
          </motion.div>

          {loading ? (
            <div className="flex justify-center py-24">
              <div className="w-6 h-6 border-2 border-stone-200 border-t-[#1C1917] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.1 }}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.03] transition-all duration-[1200ms] ease-out"
                    />
                  </div>

                  {/* Text */}
                  <h3 className="font-serif text-[#1C1917] text-xl mb-2">{member.name}</h3>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold mb-4">{member.position}</p>
                  <div className="w-full h-[1px] bg-stone-200 mb-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 bg-[#1C1917] group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                  <p className="text-[#57534E] text-xs font-light leading-relaxed">{member.bio}</p>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── 6. TIMELINE ── */}
      <section className="bg-[#1C1917] py-24">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center gap-3 mb-14 pb-10 border-b border-stone-800"
          >
            <div className="w-5 h-[1px] bg-stone-700" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-600">Our Journey</span>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-stone-800">
            {journeyList.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="group p-8 lg:p-10 hover:bg-stone-800/30 transition-colors"
              >
                <div className="text-[3.5rem] font-serif text-stone-800 group-hover:text-stone-600 transition-colors leading-none mb-6">
                  {step.year}
                </div>
                <h3 className="font-serif text-white text-lg mb-3 group-hover:text-stone-300 transition-colors">{step.title}</h3>
                <p className="text-stone-600 text-xs font-light leading-relaxed group-hover:text-stone-500 transition-colors">{step.desc}</p>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}