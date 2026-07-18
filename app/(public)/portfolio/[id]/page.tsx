"use client";

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, MapPin, Calendar, User, Play, X, 
  ChevronLeft, ChevronRight, Grid3x3, Tag, Eye, Building 
} from 'lucide-react';
import Link from 'next/link';

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
  videos: string[];
  technologies: string[];
  materials: string[];
  isActive: boolean;
}

export default function ProjectDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  useEffect(() => {
    if (params.id) fetchProject(params.id as string);
  }, [params.id]);

  const fetchProject = async (id: string) => {
    try {
      const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
      console.log('Fetching project from:', `${API_URL}/api/projects/${id}`);
      const response = await fetch(`${API_URL}/api/projects/${id}`);
      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);
      if (data.success && data.data.isActive) {
        setProject(data.data);
      } else {
        console.log('Project not active or success false, redirecting...');
        router.push('/portfolio');
      }
    } catch (error) {
      console.error('Error fetching project:', error);
      router.push('/portfolio');
    } finally {
      setLoading(false);
    }
  };

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };
  
  const closeLightbox = () => setLightboxOpen(false);
  
  const navigateLightbox = (direction: 'prev' | 'next') => {
    if (!project) return;
    const total = project.images.length;
    setLightboxIndex((prev) => direction === 'prev' ? (prev - 1 + total) % total : (prev + 1) % total);
  };

  // Dynamic Helper for the Mosaic Gallery Grid
  const getGallerySpan = (idx: number) => {
    const pattern = idx % 6; 
    switch (pattern) {
      case 0: return "md:col-span-2 md:row-span-2"; // Big Square
      case 1: return "md:col-span-1 md:row-span-1"; // Standard
      case 2: return "md:col-span-1 md:row-span-1"; // Standard
      case 3: return "md:col-span-3 md:row-span-1"; // Wide Panorama
      case 4: return "md:col-span-1 md:row-span-2"; // Tall Portrait
      case 5: return "md:col-span-2 md:row-span-2"; // Big Square
      default: return "md:col-span-1 md:row-span-1";
    }
  };

  // --- PREMIUM LOADING STATE ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center font-sans">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stone-800 mb-4"></div>
        <p className="text-zinc-500 uppercase tracking-widest text-sm font-semibold">Loading Case Study...</p>
      </div>
    );
  }

  // --- ERROR / NOT FOUND STATE ---
  if (!project) {
    return (
      <div className="min-h-screen bg-[#FAF9F5] flex flex-col items-center justify-center font-sans">
        <h1 className="text-3xl font-serif text-[#1C1917] mb-4">Project Not Found</h1>
        <Link href="/portfolio" className="text-stone-600 hover:text-stone-600 border-b border-stone-400 pb-1 uppercase tracking-widest text-sm font-semibold transition-colors">
          Return to Portfolio
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-sans">

      {/* --- HERO SECTION (Optimized for Mobile Height) --- */}
      <section className="relative h-[50vh] sm:h-[60vh] lg:h-[80vh] w-full bg-zinc-900 flex items-end">
        <div className="absolute inset-0 z-0">
          <img 
            src={project.featuredImage} 
            alt={project.title} 
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        </div>
        
        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10 md:pb-16">
          <Link href="/portfolio" className="inline-flex items-center gap-2 text-zinc-300 hover:text-stone-600 mb-6 md:mb-8 transition-colors text-xs md:text-sm uppercase tracking-widest font-bold">
            <ArrowLeft className="w-4 h-4" /> Back to Portfolio
          </Link>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <span className="bg-[#1C1917] text-white text-[10px] md:text-xs font-bold uppercase tracking-widest px-3 py-1.5 mb-4 md:mb-6 inline-block shadow-md rounded-sm">
              {project.category}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-serif text-white mb-4 md:mb-6 leading-tight drop-shadow-lg">
              {project.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 md:gap-6 text-zinc-300 font-light text-sm md:text-base">
              <div className="flex items-center gap-2"><MapPin className="w-4 h-4 md:w-5 md:h-5 text-stone-600" /> {project.location}</div>
              <div className="flex items-center gap-2"><Calendar className="w-4 h-4 md:w-5 md:h-5 text-stone-600" /> {project.completionYear}</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- MAIN CONTENT (Two Columns) --- */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Col: Details & Story (Content) */}
            <div className="lg:col-span-4 flex flex-col gap-12">
              {/* Details Card */}
              <div className="bg-[#FAF9F5] border border-stone-200 p-6 md:p-8 rounded-sm shadow-sm">
                <h3 className="text-lg md:text-xl font-serif text-[#1C1917] mb-6">Project Details</h3>
                
                <div className="space-y-6 mb-8">
                  <div>
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">Client</p>
                    <p className="text-sm md:text-base text-[#1C1917] flex items-center gap-2"><User className="w-4 h-4 text-stone-600" /> {project.client}</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">Location</p>
                    <p className="text-sm md:text-base text-[#1C1917] flex items-center gap-2"><MapPin className="w-4 h-4 text-stone-600" /> {project.location}</p>
                  </div>
                  <div>
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-bold mb-1">Completed</p>
                    <p className="text-sm md:text-base text-[#1C1917] flex items-center gap-2"><Calendar className="w-4 h-4 text-stone-600" /> {project.completionYear}</p>
                  </div>
                </div>

                {project.technologies && project.technologies.length > 0 && (
                  <div className="mb-6 pt-6 border-t border-stone-200">
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-2"><Tag className="w-4 h-4"/> Technologies</p>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map(tech => (
                        <span key={tech} className="px-2 py-1 md:px-3 md:py-1 bg-white border border-stone-200 text-[#57534E] text-xs rounded-sm">{tech}</span>
                      ))}
                    </div>
                  </div>
                )}

                {project.materials && project.materials.length > 0 && (
                  <div className="pt-6 border-t border-stone-200">
                    <p className="text-[10px] md:text-xs text-zinc-400 uppercase tracking-widest font-bold mb-3 flex items-center gap-2"><Building className="w-4 h-4"/> Core Materials</p>
                    <div className="flex flex-wrap gap-2">
                      {project.materials.map(mat => (
                        <span key={mat} className="px-2 py-1 md:px-3 md:py-1 bg-stone-100 text-stone-600 border border-stone-200 text-[10px] md:text-xs font-semibold uppercase tracking-wider rounded-sm">{mat}</span>
                      ))}
                    </div>
                  </div>
                )}

                <div className="mt-10">
                  <Link href="/contact" className="block w-full bg-slate-900 hover:bg-[#1C1917] text-white text-center py-3 md:py-4 rounded-sm font-bold uppercase tracking-widest text-sm transition-colors duration-300 shadow-md hover:shadow-xl">
                    Discuss A Project
                  </Link>
                </div>
              </div>

              {/* Story / Overview */}
              <div>
                <h2 className="text-2xl md:text-3xl font-serif text-[#1C1917] mb-6 pb-4 border-b border-stone-200">Project Overview</h2>
                <p className="text-base md:text-lg text-[#57534E] leading-relaxed font-light whitespace-pre-line">
                  {project.description}
                </p>
              </div>
            </div>

            {/* Right Col: Gallery & Videos (Images) */}
            <div className="lg:col-span-8">
              
              {/* Inline Interactive Gallery */}
              {project.images.length > 0 && (
                <div className="mb-16">
                  <div className="flex items-center gap-3 mb-6">
                    <Grid3x3 className="w-5 h-5 md:w-6 md:h-6 text-stone-600" />
                    <h3 className="text-xl md:text-2xl font-serif text-[#1C1917]">Gallery</h3>
                  </div>
                  
                  <div className="flex flex-col md:flex-row gap-4 h-[400px] md:h-[600px]">
                    
                    {/* Thumbnails Sidebar (Left) */}
                    {/* Added custom inline styles to hide scrollbar cross-browser */}
                    <div 
                      className="flex-[1] flex flex-row md:flex-col gap-3 overflow-x-auto md:overflow-y-auto pb-2 md:pb-0"
                      style={{ msOverflowStyle: 'none', scrollbarWidth: 'none' }}
                    >
                      {/* Webkit scrollbar hide inline style injected via global css class usually, but style tag works here */}
                      <style>{`
                        .flex-\\[1\\]::-webkit-scrollbar {
                          display: none;
                        }
                      `}</style>
                      
                      {project.images.map((img, idx) => (
                        <div 
                          key={idx}
                          onClick={() => setLightboxIndex(idx)}
                          className={`relative cursor-pointer w-[120px] md:w-full h-[80px] md:h-[140px] flex-shrink-0 overflow-hidden rounded-md transition-all duration-300 ${
                            lightboxIndex === idx ? 'ring-2 ring-offset-2 ring-[#1C1917] opacity-100' : 'opacity-60 hover:opacity-100'
                          }`}
                        >
                          <img 
                            src={img} 
                            alt={`Thumbnail ${idx + 1}`} 
                            className="w-full h-full object-cover"
                          />
                        </div>
                      ))}
                    </div>

                    {/* Main Large Image (Right) */}
                    <div className="flex-[3] relative rounded-md overflow-hidden bg-[#F4F3EE] shadow-sm group">
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={lightboxIndex}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          src={project.images[lightboxIndex]}
                          alt="Main Gallery View"
                          className="w-full h-full object-cover"
                        />
                      </AnimatePresence>
                      
                      {/* Navigation Arrows */}
                      <button 
                        onClick={() => navigateLightbox('prev')} 
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button 
                        onClick={() => navigateLightbox('next')} 
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-white/80 hover:bg-white text-stone-800 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-all duration-300"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Videos */}
              {project.videos && project.videos.length > 0 && (
                <div>
                  <div className="flex items-center gap-3 mb-8">
                    <Play className="w-5 h-5 md:w-6 md:h-6 text-stone-600" />
                    <h3 className="text-xl md:text-2xl font-serif text-[#1C1917]">Cinematic Tour</h3>
                  </div>
                  <div className="grid grid-cols-1 gap-6">
                    {project.videos.map((vid, idx) => (
                      <div key={idx} className="aspect-video bg-black rounded-sm overflow-hidden shadow-lg border-4 border-stone-100">
                        <video src={vid} controls className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

          </div>
        </div>
      </section>


    </div>
  );
}