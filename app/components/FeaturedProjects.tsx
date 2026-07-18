"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';

const fallbackProjects = [
  {
    _id: 'glass-pavilion',
    title: 'The Glass Pavilion',
    category: 'residential',
    location: 'Swiss Alps',
    completionYear: 2024,
    featuredImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80',
  },
  {
    _id: 'aura-tower',
    title: 'Aura Skyscraper',
    category: 'commercial',
    location: 'Dubai, UAE',
    completionYear: 2023,
    featuredImage: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80',
  },
  {
    _id: 'zenith-estate',
    title: 'Zenith Estate',
    category: 'residential',
    location: 'Malibu, CA',
    completionYear: 2023,
    featuredImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80',
  },
];

const customEase = [0.16, 1, 0.3, 1] as [number, number, number, number];

export default function FeaturedProjects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'https://dvlarchitects.com';
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
      <section className="bg-[#FAF9F5] py-32 flex items-center justify-center">
        <div className="flex items-center gap-4 text-stone-400">
          <div className="w-5 h-5 border-[2px] border-stone-200 border-t-[#1C1917] rounded-full animate-spin" />
          <span className="text-[9px] uppercase tracking-[0.4em] font-bold">Curating</span>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-[#FAF9F5] py-24 lg:py-32">
      <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

        {/* ── HEADER ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 1, ease: customEase }}
          className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-[1px] bg-stone-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Archive</span>
            </div>
            <h2 className="text-5xl lg:text-7xl font-serif text-[#1C1917] tracking-tight leading-none">
              Selected <span className="italic font-light text-stone-400">Works.</span>
            </h2>
          </div>

          <Link
            href="/portfolio"
            className="group inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.25em] text-[#1C1917] transition-colors"
          >
            <span className="border-b border-[#1C1917]/20 group-hover:border-[#1C1917] pb-1 transition-colors">View Complete Archive</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </motion.div>

        {/* ── GALLERY GRID (Cinematic) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
          {displayed.map((project, idx) => {
            const projectImg = project.featuredImage || project.image || 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?q=80&w=1200';
            const projectYear = project.completionYear || project.year || '';
            const projectId = project._id || project.id || idx.toString();
            const projectCat = project.category || 'Architecture';
            const projectTitle = project.title || 'Untitled Project';

            return (
              <motion.div
                key={projectId}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, delay: idx * 0.1, ease: customEase }}
              >
                <Link href={`/portfolio/${projectId}`} className="group block">
                  
                  {/* Image Frame */}
                  <div className={`relative w-full overflow-hidden bg-stone-100 ${
                    idx === 0 ? 'aspect-[4/5]' :
                    idx === 1 ? 'aspect-[3/4]' :
                    'aspect-[1/1]'
                  }`}>
                    {projectImg ? (
                      <img
                        src={projectImg}
                        alt={projectTitle}
                        className="w-full h-full object-cover transition-all duration-[2000ms] ease-out md:grayscale md:opacity-90 lg:group-hover:grayscale-0 lg:group-hover:scale-105 lg:group-hover:opacity-100"
                      />
                    ) : (
                      <div className="w-full h-full bg-stone-200" />
                    )}
                    
                    {/* Hover Badge */}
                    <div className="absolute top-5 left-5 overflow-hidden hidden md:block">
                      <motion.div 
                        initial={{ y: -20, opacity: 0 }}
                        whileHover={{ y: 0, opacity: 1 }}
                        className="bg-white text-[#1C1917] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] translate-y-[-120%] group-hover:translate-y-0 transition-transform duration-500 ease-out"
                      >
                        Explore Space
                      </motion.div>
                    </div>
                  </div>

                  {/* Text Details */}
                  <div className="mt-6">
                    <h3 className="text-2xl font-serif text-[#1C1917] group-hover:text-stone-500 transition-colors leading-snug mb-2">
                      {projectTitle}
                    </h3>
                    <div className="flex items-center gap-2">
                      <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold">
                        {projectCat}
                      </span>
                      {project.location && (
                        <>
                          <span className="w-3 h-[1px] bg-stone-300" />
                          <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                            {project.location}
                          </span>
                        </>
                      )}
                    </div>
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
