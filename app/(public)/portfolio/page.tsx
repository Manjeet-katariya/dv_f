"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ArrowUpRight } from 'lucide-react';

interface Project {
  _id: string;
  title: string;
  category: 'residential' | 'commercial';
  description: string;
  location: string;
  completionYear: number;
  client: string;
  featuredImage: string;
  images: string[];
  isActive: boolean;
  order: number;
}

const fallbackProjects: Project[] = [
  { _id: "p1", title: "The Glass Pavilion", category: "residential", description: "A contemporary masterpiece.", location: "Swiss Alps", completionYear: 2023, client: "Private", featuredImage: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&q=80", images: [], isActive: true, order: 1 },
  { _id: "p2", title: "Aura Skyscraper", category: "commercial", description: "Redefines the skyline.", location: "Dubai, UAE", completionYear: 2024, client: "Emaar", featuredImage: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=1200&q=80", images: [], isActive: true, order: 2 },
  { _id: "p3", title: "Zenith Estate", category: "residential", description: "Cliffside luxury.", location: "Malibu, CA", completionYear: 2022, client: "Confidential", featuredImage: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=1200&q=80", images: [], isActive: true, order: 3 },
  { _id: "p4", title: "Lumina Art Center", category: "commercial", description: "Cultural hub.", location: "Copenhagen", completionYear: 2023, client: "City Council", featuredImage: "https://images.unsplash.com/photo-1511818966892-d7d671e672a2?w=1200&q=80", images: [], isActive: true, order: 4 },
  { _id: "p5", title: "Coastal Retreat", category: "residential", description: "Pacific panoramic home.", location: "Sydney, AUS", completionYear: 2024, client: "Private", featuredImage: "https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=1200&q=80", images: [], isActive: true, order: 5 },
  { _id: "p6", title: "The Nordic Loft", category: "residential", description: "Minimalist Nordic design.", location: "Oslo, Norway", completionYear: 2023, client: "Private", featuredImage: "https://images.unsplash.com/photo-1618219908412-a29a1bb7b86e?w=1200&q=80", images: [], isActive: true, order: 6 },
];

const customEase = [0.16, 1, 0.3, 1];

export default function PortfolioPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'residential' | 'commercial'>('all');
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [pagination, setPagination] = useState({ currentPage: 1, totalPages: 1, totalRecords: 0, limit: 20 });
  const [hasMore, setHasMore] = useState(true);
  const loadMoreRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => { fetchProjects(1, true); }, []);
  useEffect(() => { setProjects([]); fetchProjects(1, true); }, [selectedCategory]);

  const fetchProjects = async (page: number, isInitial = false) => {
    if (isInitial) setLoading(true); else setLoadingMore(true);
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const catParam = selectedCategory !== 'all' ? `&category=${selectedCategory}` : '';
      const res = await fetch(`${API_URL}/api/projects?page=${page}&limit=20${catParam}`);
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      if (data.success) {
        const active = data.data.filter((p: Project) => p.isActive).sort((a: Project, b: Project) => a.order - b.order);
        if (isInitial) setProjects(active); else setProjects(prev => [...prev, ...active]);
        setPagination(data.pagination);
        setHasMore(data.pagination.currentPage < data.pagination.totalPages);
      }
    } catch {
      if (isInitial) { setProjects(fallbackProjects); setHasMore(false); }
    } finally { setLoading(false); setLoadingMore(false); }
  };

  const handleObserver = useCallback((entries: IntersectionObserverEntry[]) => {
    const [target] = entries;
    if (target.isIntersecting && hasMore && !loadingMore) fetchProjects(pagination.currentPage + 1, false);
  }, [hasMore, loadingMore, pagination]);

  useEffect(() => {
    const el = loadMoreRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(handleObserver, { threshold: 0.1, rootMargin: '100px' });
    obs.observe(el);
    return () => obs.disconnect();
  }, [handleObserver]);

  const filtered = selectedCategory === 'all' ? projects : projects.filter(p => p.category === selectedCategory);

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">

      {/* ── HERO (Cinematic Header) ── */}
      <section className="relative w-full h-[60vh] min-h-[500px] bg-[#1C1917] overflow-hidden flex flex-col justify-end pt-32 pb-16">
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: customEase }}
          className="absolute inset-0 z-0"
        >
          <img
            src="https://images.unsplash.com/photo-1618221118493-9cfa1a1c00da?q=80&w=1920"
            alt="DVL Archive"
            className="w-full h-full object-cover opacity-40 grayscale"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1917] via-transparent to-black/30" />
        </motion.div>

        <div className="relative z-10 max-w-[1700px] mx-auto px-8 lg:px-16 w-full flex flex-col md:flex-row md:items-end justify-between gap-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: 0.2, ease: customEase }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-[1px] bg-stone-500" />
              <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-stone-400">Our Archive</span>
            </div>
            <h1 className="font-serif text-white tracking-tight leading-[1.0] text-[clamp(4rem,8vw,7rem)]">
              Selected<br />
              <span className="italic font-light text-stone-400">Works.</span>
            </h1>
          </motion.div>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
            className="text-stone-400 font-light text-sm max-w-xs leading-relaxed"
          >
            A curated collection of residential and commercial spaces designed to inspire and endure.
          </motion.p>
        </div>
      </section>

      {/* ── FILTER BAR (Ultra-Minimal) ── */}
      <div className="sticky top-[72px] z-30 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-6"
          >
            {(['all', 'residential', 'commercial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className="relative group text-[10px] font-bold uppercase tracking-[0.25em] transition-colors"
              >
                <span className={`${selectedCategory === cat ? 'text-[#1C1917]' : 'text-stone-400 group-hover:text-stone-600'}`}>
                  {cat === 'all' ? 'All Projects' : cat}
                </span>
                {/* Active Underline */}
                {selectedCategory === cat && (
                  <motion.div
                    layoutId="activeFilter"
                    className="absolute -bottom-2 left-0 right-0 h-[1px] bg-[#1C1917]"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </button>
            ))}
          </motion.div>

          {!loading && (
            <span className="text-[9px] uppercase tracking-[0.3em] font-medium text-stone-400">
              {filtered.length} Results
            </span>
          )}
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      <section className="py-16 pb-32 bg-[#FAF9F5]">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          {loading ? (
            <div className="flex justify-center items-center py-48">
              <div className="flex flex-col items-center gap-4">
                <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
                <span className="text-[10px] uppercase tracking-[0.4em] text-stone-400 font-bold">Curating</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-stone-400 text-sm font-light">No projects in this category.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-20">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.8, delay: index * 0.05, ease: customEase }}
                    key={project._id}
                  >
                    <Link href={`/portfolio/${project._id}`} className="group block">

                      {/* Image Frame — Cinematic Ratios */}
                      <div className={`relative w-full overflow-hidden bg-stone-100 ${
                        index % 6 === 0 ? 'aspect-[4/5]' :
                        index % 6 === 1 ? 'aspect-[3/2]' :
                        index % 6 === 2 ? 'aspect-[1/1]' :
                        index % 6 === 3 ? 'aspect-[3/4]' :
                        index % 6 === 4 ? 'aspect-[16/9]' :
                        'aspect-[4/3]'
                      }`}>
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-all duration-[2000ms] ease-out grayscale opacity-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-100"
                        />
                        
                        {/* Elegant overlay badge */}
                        <div className="absolute top-5 left-5 overflow-hidden">
                          <motion.div 
                            initial={{ y: -20, opacity: 0 }}
                            whileHover={{ y: 0, opacity: 1 }}
                            className="bg-white text-[#1C1917] px-3 py-1.5 text-[8px] font-bold uppercase tracking-[0.2em] translate-y-[-120%] group-hover:translate-y-0 transition-transform duration-500 ease-out"
                          >
                            View Project
                          </motion.div>
                        </div>
                      </div>

                      {/* Text Layout */}
                      <div className="mt-6 flex items-start justify-between">
                        <div>
                          <h3 className="text-2xl font-serif text-[#1C1917] group-hover:text-stone-500 transition-colors leading-snug mb-2">
                            {project.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold">
                              {project.category}
                            </span>
                            <span className="w-3 h-[1px] bg-stone-300" />
                            <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-medium">
                              {project.location}
                            </span>
                          </div>
                        </div>
                        
                        {/* Numbering */}
                        <span className="text-sm font-mono text-stone-300 group-hover:text-[#1C1917] transition-colors mt-1">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>

                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}

          {/* Infinite scroll trigger */}
          <div ref={loadMoreRef} className="flex justify-center pt-28 pb-10">
            {loadingMore && (
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold">Discovering</span>
              </div>
            )}
            {!hasMore && !loadingMore && pagination.totalRecords > 0 && (
              <div className="flex items-center gap-6">
                <div className="w-16 h-[1px] bg-stone-300" />
                <span className="text-[9px] uppercase tracking-[0.4em] text-stone-400 font-bold">
                  {pagination.totalRecords} Masterpieces
                </span>
                <div className="w-16 h-[1px] bg-stone-300" />
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}