'use client';

import { useState } from 'react';
import { Calendar, User, Tag, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const blogs = [
  {
    id: 1,
    title: 'Sustainable Architecture: Building for the Future',
    excerpt: 'Explore how modern architecture is embracing sustainability and eco-friendly design principles. Learn about green materials, energy efficiency, and innovative designs.',
    author: 'John Architect',
    date: 'January 15, 2024',
    tags: ['Sustainability', 'Design', 'Future'],
    image: 'https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=600',
  },
  {
    id: 2,
    title: 'The Art of Minimalist Design',
    excerpt: 'Discover the beauty of simplicity in architectural design and how less can truly be more. Explore clean lines, open spaces, and functional aesthetics.',
    author: 'Sarah Designer',
    date: 'January 10, 2024',
    tags: ['Minimalism', 'Design', 'Trends'],
    image: 'https://images.unsplash.com/photo-1487958449943-2429e8be8625?w=600',
  },
  {
    id: 3,
    title: 'Smart Homes: Technology Meets Architecture',
    excerpt: 'How smart technology is revolutionizing the way we design and interact with our living spaces. From automated systems to IoT integration.',
    author: 'Mike Tech',
    date: 'January 5, 2024',
    tags: ['Technology', 'Smart Homes', 'Innovation'],
    image: 'https://images.unsplash.com/photo-1486718448742-163732cd1544?w=600',
  },
  {
    id: 4,
    title: 'Biophilic Design: Connecting with Nature',
    excerpt: 'Incorporating natural elements into architectural design to improve well-being and create harmonious spaces.',
    author: 'Emma Green',
    date: 'December 28, 2023',
    tags: ['Biophilic', 'Nature', 'Wellness'],
    image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600',
  },
  {
    id: 5,
    title: 'Urban Planning for Future Cities',
    excerpt: 'Exploring innovative approaches to urban design that prioritize sustainability, mobility, and community engagement.',
    author: 'David Urban',
    date: 'December 20, 2023',
    tags: ['Urban', 'Planning', 'Future'],
    image: 'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=600',
  },
  {
    id: 6,
    title: 'Restoration vs. Renovation',
    excerpt: 'Understanding the differences between restoring historic buildings and renovating modern spaces.',
    author: 'Lisa Heritage',
    date: 'December 15, 2023',
    tags: ['Restoration', 'Renovation', 'History'],
    image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600',
  },
];

const allTags = ['All', ...new Set(blogs.flatMap(blog => blog.tags))];

export default function Blogs() {
  const [selectedTag, setSelectedTag] = useState('All');

  const filteredBlogs = selectedTag === 'All'
    ? blogs
    : blogs.filter(blog => blog.tags.includes(selectedTag));

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans selection:bg-[#1C1917] selection:text-[#FAF9F5]">
      
      {/* ── HERO HEADER ── */}
      <section className="relative pt-40 pb-20 overflow-hidden bg-[#F4F3EE]">
        {/* Subtle background radial gradient */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[1000px] h-[500px] bg-[radial-gradient(ellipse_at_top,rgba(181,148,81,0.1),transparent_70%)] pointer-events-none" />
        
        <div className="relative z-10 max-w-[1700px] mx-auto px-6 lg:px-14 w-full text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.9 }}>
            <div className="flex items-center justify-center gap-4 mb-8">
              <div className="h-px w-12 bg-[#1C1917]" />
              <span className="text-stone-600 text-[9px] font-bold uppercase tracking-[0.4em]">Journal & Perspectives</span>
              <div className="h-px w-12 bg-[#1C1917]" />
            </div>
            
            <h1 className="text-5xl sm:text-6xl lg:text-[80px] font-bold text-[#1C1917] tracking-tight font-serif leading-[1.05]">
              Architecture Blog
            </h1>
            
            <p className="text-[#57534E] text-base lg:text-lg font-light mt-8 max-w-2xl mx-auto leading-relaxed">
              Insights, inspiration, and thoughts from our architectural and design studio.
            </p>
          </motion.div>
        </div>
      </section>

      {/* ── TAG FILTER BAR (FROSTED & LIGHT) ── */}
      <section className="py-5 bg-[#FAF9F5]/90 backdrop-blur-md border-b border-stone-200 sticky top-[72px] z-30 shadow-[0_4px_30px_rgba(181,148,81,0.03)]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="flex items-center gap-6 overflow-x-auto no-scrollbar justify-start sm:justify-center">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className={`relative pb-2 text-[10px] font-bold uppercase tracking-[0.25em] transition-colors whitespace-nowrap ${
                  selectedTag === tag ? 'text-[#1C1917]' : 'text-[#878076] hover:text-stone-600'
                }`}
              >
                {tag}
                {selectedTag === tag && (
                  <motion.div layoutId="activeBlogFilter" className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1C1917]" />
                )}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── EDITORIAL JOURNAL GRID ── */}
      <section className="py-24 bg-[#FAF9F5]">
        <div className="max-w-[1700px] mx-auto px-6 lg:px-14">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-16">
            {filteredBlogs.map((blog, index) => (
              <motion.article 
                key={blog.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: index * 0.1 }}
                className="group flex flex-col h-full bg-white border border-stone-200/50 rounded-sm overflow-hidden hover:shadow-[0_20px_50px_rgba(181,148,81,0.08)] transition-all duration-500"
              >
                {/* Image panel */}
                <div className="relative w-full h-64 overflow-hidden bg-stone-100">
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="w-full h-full object-cover transition-transform duration-[1500ms] ease-out group-hover:scale-105"
                  />
                  {/* Subtle overlay */}
                  <div className="absolute inset-0 bg-[#1C1917]/5 group-hover:bg-transparent transition-colors duration-500" />
                </div>

                {/* Content Panel */}
                <div className="p-8 flex flex-col flex-grow">
                  {/* Metadata */}
                  <div className="flex items-center space-x-4 text-[10px] uppercase tracking-wider font-semibold text-[#878076] mb-4">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-stone-600" />
                      {blog.date}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1.5">
                      <User className="w-3.5 h-3.5 text-stone-600" />
                      {blog.author}
                    </span>
                  </div>

                  {/* Title */}
                  <h2 className="text-2xl font-serif font-bold text-[#1C1917] group-hover:text-stone-600 transition-colors leading-tight mb-4">
                    <a href={`/blogs/${blog.id}`}>{blog.title}</a>
                  </h2>

                  {/* Excerpt */}
                  <p className="text-[#57534E] text-sm font-light leading-relaxed mb-6 flex-grow">
                    {blog.excerpt}
                  </p>

                  {/* Tags list */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {blog.tags.map((tag) => (
                      <span key={tag} className="inline-flex items-center gap-1 text-[9px] uppercase tracking-widest font-bold bg-[#F4F3EE] text-[#57534E] px-2.5 py-1 rounded-sm border border-stone-200/50">
                        <Tag className="w-2.5 h-2.5 text-stone-600/75" />
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Read More Link */}
                  <div className="pt-4 border-t border-stone-200/50">
                    <a
                      href={`/blogs/${blog.id}`}
                      className="inline-flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.25em] text-[#1C1917] group-hover:text-stone-600 transition-colors"
                    >
                      Read Case Study <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </a>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}