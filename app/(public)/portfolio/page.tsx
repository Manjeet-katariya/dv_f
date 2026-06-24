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
    <div className="min-h-screen bg-[#FAF9F5]">

      {/* ── PAGE HEADER with text + card ── */}
      <section className="pt-12 pb-0 bg-[#FAF9F5] border-b border-stone-200">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          {/* Top row: label only */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex items-center gap-3 mb-10"
          >
            <div className="w-5 h-[1px] bg-stone-400" />
            <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500">Selected Works</span>
          </motion.div>

          {/* Main header: text left + card right */}
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-20 items-end pb-12">

            {/* Left: Heading + description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              <h1 className="text-4xl lg:text-5xl font-serif font-bold text-[#1C1917] tracking-tight leading-[1.1] mb-5">
                This is our<br />
                <span className="italic font-normal text-stone-400">Portfolio</span> of<br />
                Our Projects.
              </h1>
              <p className="text-[#57534E] text-sm font-light leading-relaxed max-w-sm">
                Every space we design carries a story — of the client, the land, and the craft. Browse our curated archive of residential and commercial works.
              </p>
            </motion.div>

            {/* Right: Info card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="bg-[#1C1917] text-white p-8 lg:p-10 relative overflow-hidden"
            >
              {/* Decorative corner line */}
              <div className="absolute top-6 right-6 w-10 h-10 border-t border-r border-white/10" />

              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 block mb-6">DVL Architects</span>

              <p className="text-xl font-serif font-bold text-white leading-snug mb-8">
                "We believe great spaces don't just look beautiful — they feel alive."
              </p>

              <div className="grid grid-cols-3 gap-4 border-t border-stone-700 pt-6">
                <div>
                  <div className="text-2xl font-serif font-bold text-white">500+</div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">15+</div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-serif font-bold text-white">2</div>
                  <div className="text-[8px] uppercase tracking-[0.2em] text-stone-500 mt-0.5">Typologies</div>
                </div>
              </div>
            </motion.div>

          </div>
        </div>
      </section>

      {/* ── FILTER BAR — sticky below header ── */}
      <div className="sticky top-[72px] z-30 bg-[#FAF9F5]/95 backdrop-blur-sm border-b border-stone-200">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="flex items-center gap-1 bg-stone-100 rounded-sm p-1 w-fit"
          >
            {(['all', 'residential', 'commercial'] as const).map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 text-[9px] font-bold uppercase tracking-[0.25em] rounded-sm transition-all duration-300 ${
                  selectedCategory === cat
                    ? 'bg-[#1C1917] text-white shadow-sm'
                    : 'text-stone-500 hover:text-[#1C1917]'
                }`}
              >
                {cat === 'all' ? 'All' : cat}
              </button>
            ))}
          </motion.div>

          {!loading && (
            <span className="text-[9px] uppercase tracking-[0.3em] font-bold text-stone-400">
              {filtered.length} {selectedCategory === 'all' ? 'Projects' : selectedCategory} found
            </span>
          )}
        </div>
      </div>

      {/* ── GALLERY GRID ── */}
      <section className="py-8 pb-24 bg-[#FAF9F5]">
        <div className="max-w-[1700px] mx-auto px-8 lg:px-16">

          {loading ? (
            <div className="flex justify-center items-center py-48">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-6 h-6 text-stone-400 animate-spin" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold">Loading</span>
              </div>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-40">
              <p className="text-stone-400 text-sm font-light">No projects in this category.</p>
            </div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-14">
              <AnimatePresence mode="popLayout">
                {filtered.map((project, index) => (
                  <motion.div
                    layout
                    initial={{ opacity: 0, y: 24 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.55, delay: index * 0.05 }}
                    key={project._id}
                  >
                    <Link href={`/portfolio/${project._id}`} className="group block">

                      {/* Image — different aspect ratios for visual interest */}
                      <div className={`relative w-full overflow-hidden bg-stone-100 ${
                        index % 5 === 0 ? 'aspect-[3/4]' :
                        index % 5 === 1 ? 'aspect-[4/3]' :
                        index % 5 === 2 ? 'aspect-[1/1]' :
                        index % 5 === 3 ? 'aspect-[4/5]' :
                        'aspect-[3/2]'
                      }`}>
                        <img
                          src={project.featuredImage}
                          alt={project.title}
                          className="w-full h-full object-cover transition-transform duration-[1600ms] ease-out group-hover:scale-106"
                        />

                        {/* Hover overlay */}
                        <div className="absolute inset-0 bg-[#1C1917]/0 group-hover:bg-[#1C1917]/20 transition-all duration-700" />

                        {/* Arrow badge — appears on hover */}
                        <div className="absolute top-4 right-4 w-8 h-8 bg-white flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 shadow-sm">
                          <ArrowUpRight className="w-4 h-4 text-[#1C1917]" />
                        </div>

                        {/* Category pill — always visible */}
                        <div className="absolute bottom-4 left-4">
                          <span className="bg-white/90 text-[#1C1917] px-2.5 py-1 text-[8px] font-bold uppercase tracking-[0.2em]">
                            {project.category}
                          </span>
                        </div>
                      </div>

                      {/* Text — minimal, no icons */}
                      <div className="mt-4 flex items-start justify-between">
                        <div>
                          <h3 className="text-sm font-serif font-bold text-[#1C1917] group-hover:text-stone-500 transition-colors leading-snug mb-1">
                            {project.title}
                          </h3>
                          <p className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-medium">
                            {project.location} · {project.completionYear}
                          </p>
                        </div>
                        <span className="text-[9px] font-mono text-stone-300 mt-0.5 flex-shrink-0 ml-4">
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
          <div ref={loadMoreRef} className="flex justify-center pt-20 pb-8">
            {loadingMore && (
              <div className="flex items-center gap-3">
                <Loader2 className="w-5 h-5 text-stone-400 animate-spin" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold">Loading more</span>
              </div>
            )}
            {!hasMore && !loadingMore && pagination.totalRecords > 0 && (
              <div className="flex items-center gap-5">
                <div className="w-10 h-px bg-stone-300" />
                <span className="text-[9px] uppercase tracking-[0.3em] text-stone-400 font-bold">
                  {pagination.totalRecords} works total
                </span>
                <div className="w-10 h-px bg-stone-300" />
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
}