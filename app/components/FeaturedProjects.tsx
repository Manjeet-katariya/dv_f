"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const fallbackProjects = [
  {
    id: 'glass-pavilion',
    title: 'The Glass Pavilion',
    category: 'Residential',
    location: 'Swiss Alps',
    year: '2024',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
  {
    id: 'aura-tower',
    title: 'Aura Skyscraper',
    category: 'Commercial',
    location: 'Dubai, UAE',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
  },
  {
    id: 'zenith-estate',
    title: 'Zenith Estate',
    category: 'Luxury Villa',
    location: 'Malibu, CA',
    year: '2023',
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80',
  },
];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
        const res = await fetch(`${API_URL}/api/projects?limit=3`);
        if (!res.ok) throw new Error('failed');
        const data = await res.json();
        if (data.success && Array.isArray(data.data) && data.data.length > 0) {
          setProjects(data.data.slice(0, 3));
        } else {
          setProjects(fallbackProjects);
        }
      } catch {
        setProjects(fallbackProjects);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  const displayed = projects.length > 0 ? projects : fallbackProjects;

  if (loading) {
    return (
      <section className="bg-[#FAF9F5] py-24 flex items-center justify-center border-t border-stone-200">
        <div className="flex items-center gap-4 text-[#878076]">
          <div className="w-4 h-4 border border-stone-300 border-t-[#1C1917] rounded-full animate-spin" />
          <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-500">Loading Portfolio</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF9F5] border-t border-stone-200 py-24">
      <div className="max-w-[1800px] mx-auto px-8 lg:px-20">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-14 pb-8 border-b border-stone-200"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-[1px] bg-stone-400" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">Selected Works</span>
            </div>
            <h2 className="text-3xl lg:text-4xl font-serif font-bold text-[#1C1917]">
              Our Portfolio
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1C1917] hover:text-stone-500 transition-colors"
          >
            <span className="border-b border-[#1C1917]/20 group-hover:border-stone-500 pb-0.5 transition-colors">View All Projects</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* ── GALLERY GRID (clean, no card boxes) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {displayed.map((project, idx) => {
            const projectImg = project.image || project.featuredImage;
            const projectYear = project.year || project.completionYear;
            const projectId = project._id || project.id;

            return (
              <motion.div
                key={projectId}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
              >
                <Link href={`/portfolio/${projectId}`} className="group block">
                  {/* Image */}
                  <div className="relative w-full aspect-[4/3] overflow-hidden border border-stone-200 mb-4">
                    <img
                      src={projectImg}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                    />
                  </div>

                  {/* Text — no card, clean typography */}
                  <div>
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-[8px] font-bold uppercase tracking-[0.25em] text-stone-400">
                        {project.category} · {projectYear}
                      </span>
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#1C1917] group-hover:text-stone-500 transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-stone-500 font-light mt-1">{project.location}</p>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
