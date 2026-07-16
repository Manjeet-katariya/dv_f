"use client";

import { motion } from 'framer-motion';

interface MissionVisionProps {
  data?: {
    philosophyHeading?: string;
    philosophySubheading?: string;
    philosophyDescription?: string;
    philosophyQuote?: string;
    philosophyStat1Val?: string;
    philosophyStat1Label?: string;
    philosophyStat2Val?: string;
    philosophyStat2Label?: string;
    philosophyStat3Val?: string;
    philosophyStat3Label?: string;
  };
}

const renderDynamicHeading = (text: string, italicClass = "text-stone-500 italic font-light") => {
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

export default function MissionVision({ data }: MissionVisionProps) {
  return (
    <section className="bg-white py-32 border-t border-stone-200 relative overflow-hidden">

      {/* Giant watermark */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span className="font-serif font-bold text-stone-300/[0.08] leading-none"
          style={{ fontSize: 'clamp(10rem, 28vw, 28rem)' }}>
          DVL
        </span>
      </div>

      {/* Charcoal radial glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(28,25,23,0.02),transparent_70%)] pointer-events-none" />

      <div className="max-w-[1800px] mx-auto px-10 lg:px-20 relative z-10">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-stone-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#878076]">Core philosophy</span>
            <div className="h-px w-10 bg-stone-400" />
          </div>
          <h2 className="text-3xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight">
            {renderDynamicHeading(data?.philosophyHeading || 'Turning Dreams into\n*Timeless Spaces.*')}
          </h2>
        </motion.div>

        {/* Philosophy Details */}
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          {/* Left Column: Slogan/Callout */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="lg:col-span-5 py-6"
          >
            <h3 className="text-3xl lg:text-4xl font-serif font-light italic text-stone-500 leading-tight">
              {data?.philosophySubheading || 'Every great space begins with a dream.'}
            </h3>
          </motion.div>

          {/* Right Column: Statement */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="lg:col-span-7 space-y-6 text-[#57534E] text-base font-light leading-relaxed"
          >
            <p>
              {data?.philosophyDescription || 'At D.V.L Architects, we work closely with our clients to understand not just what they want to build, but how they want to live. We believe exceptional architecture is deeply personal—it should reflect your identity, enhance your daily life, and remain beautiful for generations.'}
            </p>
            <p className="text-[#1C1917] font-medium font-serif text-lg border-l-2 border-stone-300 pl-4">
              {data?.philosophyQuote || 'Our purpose is simple: to create spaces that inspire, comfort, and leave a lasting legacy.'}
            </p>
          </motion.div>
        </div>

        {/* Stats strip below */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid grid-cols-3 gap-6 md:gap-12 max-w-4xl mx-auto border-t border-stone-200 pt-12 mt-16 text-center"
        >
          {[
            { v: data?.philosophyStat1Val || '180+', l: data?.philosophyStat1Label || 'Projects Delivered' },
            { v: data?.philosophyStat2Val || '8+', l: data?.philosophyStat2Label || 'Years Experience' },
            { v: data?.philosophyStat3Val || '100%', l: data?.philosophyStat3Label || 'Client Satisfaction' }
          ].map((s, i) => (
            <div key={i}>
              <div className="text-3xl lg:text-4xl font-serif font-bold text-[#1C1917] mb-2">{s.v}</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-[#878076] font-bold">{s.l}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
