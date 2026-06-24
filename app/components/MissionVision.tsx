"use client";

import { motion } from 'framer-motion';

export default function MissionVision() {
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
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-4 mb-6">
            <div className="h-px w-10 bg-stone-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.45em] text-[#878076]">Core Philosophy</span>
            <div className="h-px w-10 bg-stone-400" />
          </div>
          <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#1C1917]">
            Our Purpose &{' '}
            <span className="text-stone-850 italic font-serif">Future Trajectory.</span>
          </h2>
        </motion.div>

        {/* Two columns separated by vertical stone line */}
        <div className="grid lg:grid-cols-[1fr_1px_1fr] items-start gap-0">

          {/* ── MISSION ── */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9 }}
            className="py-12 lg:pr-20 group"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-8xl font-serif font-bold text-stone-300 group-hover:text-stone-400 transition-colors duration-500 leading-none">I</span>
              <div className="text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.45em] text-[#878076]">The Mandate</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-stone-400 mt-1">Mission</p>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#1C1917] leading-tight tracking-tight mb-8">
              Elevating the{' '}
              <span className="text-stone-850 italic font-serif">Standard</span>{' '}
              of Living
            </h3>

            <p className="text-[#57534E] text-sm leading-relaxed font-light mb-12 max-w-lg">
              We are dedicated to crafting spaces that seamlessly blend aesthetic brilliance with everyday functionality. Our mission is to transform environments into bespoke sanctuaries that perfectly reflect the unique identity of those who inhabit them.
            </p>

            <div className="grid grid-cols-3 gap-8 border-t border-stone-200 pt-10">
              {[{ v: '500+', l: 'Spaces' }, { v: '15+', l: 'Years' }, { v: '100%', l: 'Precision' }].map((s, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold font-serif text-[#1C1917] mb-1 group-hover:text-stone-600 transition-colors">{s.v}</div>
                  <div className="text-[8px] uppercase tracking-[0.25em] text-[#878076]">{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Vertical divider */}
          <div className="hidden lg:block bg-gradient-to-b from-transparent via-stone-200 to-transparent self-stretch" />

          {/* ── VISION ── */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.12 }}
            className="py-12 lg:pl-20 border-t border-stone-200 lg:border-t-0 group"
          >
            <div className="flex items-center justify-between mb-12">
              <span className="text-8xl font-serif font-bold text-stone-300 group-hover:text-stone-400 transition-colors duration-500 leading-none">II</span>
              <div className="text-right">
                <p className="text-[8px] font-bold uppercase tracking-[0.45em] text-[#878076]">The Horizon</p>
                <p className="text-[8px] font-bold uppercase tracking-[0.25em] text-stone-400 mt-1">Vision</p>
              </div>
            </div>

            <h3 className="text-2xl lg:text-3xl font-serif font-bold text-[#1C1917] leading-tight tracking-tight mb-8">
              Pioneering{' '}
              <span className="text-stone-850 italic font-serif">Architectural</span>{' '}
              Legacy
            </h3>

            <p className="text-[#57534E] text-sm leading-relaxed font-light mb-12 max-w-lg">
              To be the global benchmark in luxury architecture and interior design. We envision a future where our creations not only define modern elegance but stand as enduring landmarks of sustainable and innovative design.
            </p>

            <div className="space-y-5 border-t border-stone-200 pt-10">
              {['Global Design Influence', 'Sustainable Luxury', 'Uncompromising Quality'].map((item, i) => (
                <div key={i} className="flex items-center gap-5">
                  <div className="w-2 h-2 bg-[#1C1917] flex-shrink-0" />
                  <span className="text-[#57534E] text-[11px] uppercase tracking-[0.25em] font-bold group-hover:text-[#1C1917] transition-colors">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
