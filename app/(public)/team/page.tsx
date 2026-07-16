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
  order: number;
  isActive: boolean;
}

const fallbackTeam: TeamMember[] = [
  { _id: 't1', name: 'Eleanor Vance', position: 'Principal Architect', bio: 'With over 20 years of experience, Eleanor leads the studio with a distinct vision for blending modern minimalism with timeless warmth.', image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=800&q=80', order: 1, isActive: true },
  { _id: 't2', name: 'Marcus Sterling', position: 'Design Director', bio: 'Marcus oversees all creative operations, ensuring every project aligns with our uncompromising standards of luxury and functionality.', image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800&q=80', order: 2, isActive: true },
  { _id: 't3', name: 'Sophia Lin', position: 'Lead Interior Designer', bio: 'Sophia specializes in bespoke furniture curation and textile selection, bringing distinct character to every residential space.', image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=800&q=80', order: 3, isActive: true },
  { _id: 't4', name: 'Arjun Mehta', position: 'Project Manager', bio: 'Arjun coordinates every site operation with precision — keeping timelines, budgets, and contractor relationships firmly on track.', image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&q=80', order: 4, isActive: true },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
        const res = await fetch(`${API_URL}/api/team`);
        const data = await res.json();
        if (data.success && data.data && data.data.length > 0) setTeamMembers(data.data);
        else setTeamMembers(fallbackTeam);
      } catch { setTeamMembers(fallbackTeam); }
      finally { setLoading(false); }
    };
    fetchTeamMembers();
  }, []);

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans">

      {/* ── HEADER ── */}
      <section className="bg-[#1C1917] pt-28 pb-16 px-8 lg:px-16">
        <div className="max-w-[1700px] mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="w-5 h-[1px] bg-stone-700" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-600">The People</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
              <h1 className="font-serif font-bold text-white text-[clamp(2.5rem,5vw,4rem)] leading-tight">
                Meet the Team<br />
                <span className="italic font-normal text-stone-500">Behind Every Space.</span>
              </h1>
              <p className="text-stone-500 text-sm font-light max-w-sm leading-relaxed lg:pb-2">
                Architects, designers, and project managers — united by a shared commitment to exceptional work and enduring spaces.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="py-20 px-8 lg:px-16">
        <div className="max-w-[1700px] mx-auto">

          {loading ? (
            <div className="flex justify-center py-32">
              <div className="w-6 h-6 border-2 border-stone-200 border-t-[#1C1917] rounded-full animate-spin" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-14">
              {teamMembers.map((member, i) => (
                <motion.div
                  key={member._id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.08 }}
                  className="group"
                >
                  {/* Image */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-stone-100 mb-5">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-[1.04] transition-all duration-[1200ms] ease-out"
                    />
                    {/* Index number */}
                    <div className="absolute top-4 left-4 text-[9px] font-mono text-white/40">
                      {String(i + 1).padStart(2, '0')}
                    </div>
                  </div>

                  {/* Info */}
                  <h2 className="font-serif font-bold text-[#1C1917] text-xl mb-1 group-hover:text-stone-600 transition-colors">
                    {member.name}
                  </h2>
                  <p className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-bold mb-3">
                    {member.position}
                  </p>
                  <div className="w-full h-[1px] bg-stone-200 mb-3 relative overflow-hidden">
                    <div className="absolute top-0 left-0 h-full w-0 bg-[#1C1917] group-hover:w-full transition-all duration-700 ease-out" />
                  </div>
                  <p className="text-[#57534E] text-xs font-light leading-relaxed">
                    {member.bio}
                  </p>

                  {/* Contact links */}
                  {(member.email || member.linkedin) && (
                    <div className="flex gap-4 mt-4">
                      {member.email && (
                        <a href={`mailto:${member.email}`} className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-[#1C1917] transition-colors font-bold">
                          Email
                        </a>
                      )}
                      {member.linkedin && (
                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-[9px] uppercase tracking-[0.2em] text-stone-400 hover:text-[#1C1917] transition-colors font-bold">
                          LinkedIn
                        </a>
                      )}
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── JOIN US STRIP ── */}
      <section className="bg-[#1C1917] py-16 px-8 lg:px-16 mt-8">
        <div className="max-w-[1700px] mx-auto flex flex-col lg:flex-row items-center justify-between gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-5 h-[1px] bg-stone-700" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-600">Careers</span>
            </div>
            <h2 className="font-serif font-bold text-white text-2xl lg:text-3xl">
              Want to work with us?
            </h2>
            <p className="text-stone-500 text-sm font-light mt-2 max-w-md">
              We are always looking for talented architects, designers, and creative minds to join the DVL team.
            </p>
          </div>
          <a
            href="mailto:careers@dvlarchitects.com"
            className="flex-shrink-0 inline-flex items-center gap-2 px-8 py-4 border border-stone-700 text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-[#1C1917] transition-all duration-300"
          >
            Get in Touch
          </a>
        </div>
      </section>

    </div>
  );
}
