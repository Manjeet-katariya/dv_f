"use client";

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, FolderOpen, Mail, Calculator, Building, User,
  MapPin, AlertCircle, Clock, DollarSign, Activity, Settings, 
  Globe, ArrowUpRight, Plus, Loader2, CheckCircle, ChevronRight, Inbox
} from 'lucide-react';
import Link from 'next/link';

interface TeamMember {
  _id: string;
  name: string;
  position: string;
  image: string;
  bio: string;
  email?: string;
  linkedin?: string;
  twitter?: string;
  isActive: boolean;
  createdAt: string;
}

interface Project {
  _id: string;
  title: string;
  category: 'residential' | 'commercial';
  location: string;
  completionYear: number;
  featuredImage: string;
  client: string;
  description: string;
  isActive: boolean;
  createdAt: string;
}

interface Contact {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  status: 'new' | 'contacted' | 'in-progress' | 'completed' | 'closed';
  createdAt: string;
}

interface Estimate {
  _id: string;
  customerName: string;
  email: string;
  phone?: string;
  projectType: string;
  builtUpArea: number;
  calculatedEstimate?: {
    totalEstimate: number;
  };
  status: 'new' | 'contacted' | 'negotiating' | 'approved' | 'rejected' | 'converted';
  createdAt: string;
}

interface SocialClick {
  channel: 'facebook' | 'instagram' | 'twitter' | 'linkedin';
  count: number;
}

export default function AdminDashboard() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [estimates, setEstimates] = useState<Estimate[]>([]);
  const [socialClicks, setSocialClicks] = useState<SocialClick[]>([]);
  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    setRefreshing(true);
    try {
      setError(null);
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const [
        teamResponse,
        projectsResponse,
        contactsResponse,
        estimatesResponse,
        socialResponse
      ] = await Promise.all([
        fetch(`${API_URL}/api/team`),
        fetch(`${API_URL}/api/projects`),
        fetch(`${API_URL}/api/contact`),
        fetch(`${API_URL}/api/estimate`),
        fetch(`${API_URL}/api/social`)
      ]);

      const [teamData, projectsData, contactsData, estimatesData, socialData] = await Promise.all([
        teamResponse.json(),
        projectsResponse.json(),
        contactsResponse.json(),
        estimatesResponse.json(),
        socialResponse.json()
      ]);

      if (teamData.success) setTeamMembers(teamData.data);
      if (projectsData.success) setProjects(projectsData.data);
      if (contactsData.success) setContacts(contactsData.data);
      if (estimatesData.success) setEstimates(estimatesData.data);
      if (socialData.success) setSocialClicks(Array.isArray(socialData.data) ? socialData.data : []);

    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please check your backend connection.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const getStatusBadge = (status: string) => {
    const styles: Record<string, string> = {
      'new': 'bg-[#1C1917] text-[#FAF9F5] border-[#1C1917]',
      'contacted': 'bg-stone-100 text-stone-700 border-stone-200',
      'negotiating': 'bg-stone-100 text-stone-700 border-stone-200',
      'in-progress': 'bg-stone-100 text-stone-700 border-stone-200',
      'approved': 'bg-stone-200 text-stone-800 border-stone-300',
      'completed': 'bg-stone-200 text-stone-800 border-stone-300',
      'converted': 'bg-stone-800 text-white border-stone-800',
      'rejected': 'bg-red-50 text-red-600 border-red-200',
      'closed': 'bg-stone-100 text-stone-500 border-stone-200'
    };
    return (
      <span className={`px-2.5 py-0.5 rounded-none text-[8px] font-bold uppercase tracking-wider border ${styles[status] || styles['new']}`}>
        {status}
      </span>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric'
    });
  };

  const totalEstimateValue = estimates
    .filter(e => e.calculatedEstimate)
    .reduce((sum, e) => sum + (e.calculatedEstimate?.totalEstimate || 0), 0);

  const newLeadsCount = contacts.filter(c => c.status === 'new').length + estimates.filter(e => e.status === 'new').length;

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin text-[#1C1917] mb-4" />
        <p className="text-stone-400 uppercase tracking-[0.25em] text-[10px] font-bold">Loading Dashboard...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[80vh]">
        <div className="text-center bg-white p-8 rounded-none border border-stone-200 max-w-md shadow-sm">
          <AlertCircle className="w-10 h-10 text-red-500 mx-auto mb-4" strokeWidth={1.5} />
          <h2 className="text-lg font-serif font-bold text-[#1C1917] mb-2">Connection Error</h2>
          <p className="text-stone-500 mb-6 text-xs font-light leading-relaxed">{error}</p>
          <button onClick={fetchAllData} className="px-6 py-3 bg-[#1C1917] text-white hover:bg-stone-800 transition-colors font-bold text-[10px] uppercase tracking-wider cursor-pointer">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-8 space-y-8 font-sans">
      
      {/* ── HEADER ── */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone-200/80 pb-6">
        <div>
          <h1 className="text-3xl font-serif font-bold text-[#1C1917]">Overview</h1>
          <p className="text-stone-400 mt-1 text-xs uppercase tracking-wider font-medium">Activity Snapshot & Performance metrics</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={fetchAllData}
            disabled={refreshing}
            className="flex items-center px-4 py-2.5 bg-white border border-stone-200 text-stone-600 hover:text-[#1C1917] hover:border-stone-400 text-xs font-bold uppercase tracking-wider transition-all shadow-sm disabled:opacity-50 cursor-pointer"
          >
            <Activity className={`w-3.5 h-3.5 mr-2 ${refreshing ? 'animate-spin' : ''}`} />
            Refresh
          </button>
          <Link href="/admin/projects/add" className="flex items-center px-4 py-2.5 bg-[#1C1917] text-white hover:bg-stone-800 text-xs font-bold uppercase tracking-wider transition-all shadow-md">
            <Plus className="w-3.5 h-3.5 mr-2" /> New Project
          </Link>
        </div>
      </div>

      {/* ── TOP KPIs ── */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          { title: 'Total Projects', value: projects.length, sub: `${projects.filter(p => p.isActive).length} Active`, icon: Building, link: '/admin/projects' },
          { title: 'Quote Requests', value: estimates.length, sub: `${estimates.filter(e => e.status === 'new').length} New`, icon: Calculator, link: '/admin/estimates' },
          { title: 'Client Inquiries', value: contacts.length, sub: `${contacts.filter(c => c.status === 'new').length} New`, icon: Mail, link: '/admin/contacts' },
          { title: 'Team Roster', value: teamMembers.length, sub: `${teamMembers.filter(m => m.isActive).length} Active`, icon: Users, link: '/admin/team' },
        ].map((stat, i) => (
          <motion.div 
            key={i} 
            initial={{ opacity: 0, y: 15 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: i * 0.08 }} 
            className="bg-white rounded-none border border-stone-200 p-6 group hover:border-[#1C1917] transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.01)] relative overflow-hidden"
          >
            <div className="flex justify-between items-start mb-4">
              <div className="p-2.5 bg-stone-50 border border-stone-100 rounded-none group-hover:bg-[#1C1917] group-hover:border-[#1C1917] transition-colors duration-300">
                <stat.icon className="w-5 h-5 text-stone-600 group-hover:text-white transition-colors duration-300" strokeWidth={1.5} />
              </div>
              <Link href={stat.link} className="text-stone-400 hover:text-[#1C1917] transition-colors">
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
            <div>
              <h3 className="text-3xl font-bold text-[#1C1917] font-mono leading-none">{stat.value}</h3>
              <p className="text-[10px] font-bold text-stone-400 uppercase tracking-wider mt-2">{stat.title}</p>
              <div className="mt-4 pt-4 border-t border-stone-100 flex items-center justify-between">
                <p className="text-[10px] text-stone-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-stone-400" /> {stat.sub}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* ── PIPELINE & SOCIAL REACH ── */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Financial Pipeline */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3 }} 
          className="lg:col-span-8 bg-white rounded-none border border-stone-200 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-stone-500" strokeWidth={1.5} /> Financial Pipeline
            </h2>
            <Link href="/admin/estimates" className="text-[10px] font-bold text-stone-400 hover:text-[#1C1917] uppercase tracking-widest border-b border-stone-300 hover:border-[#1C1917] pb-0.5 transition-colors">
              View Quotes
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 bg-[#FAF9F5] border border-stone-200">
              <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-2">Total Quoted Value</p>
              <p className="text-2xl font-serif font-bold text-[#1C1917]">{formatCurrency(totalEstimateValue)}</p>
            </div>
            <div className="p-5 bg-stone-50 border border-stone-200">
              <p className="text-[9px] uppercase tracking-widest text-stone-500 font-bold mb-2">Converted Deals</p>
              <p className="text-2xl font-serif font-bold text-stone-850">{estimates.filter(e => e.status === 'converted').length}</p>
            </div>
            <div className="p-5 bg-[#FAF9F5] border border-stone-200">
              <p className="text-[9px] uppercase tracking-widest text-stone-400 font-bold mb-2">Avg. Quote Size</p>
              <p className="text-2xl font-serif font-bold text-[#1C1917]">{formatCurrency(totalEstimateValue / Math.max(estimates.length, 1))}</p>
            </div>
          </div>
        </motion.div>

        {/* Social Reach */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.38 }} 
          className="lg:col-span-4 bg-white rounded-none border border-stone-200 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
        >
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-base font-bold text-[#1C1917] uppercase tracking-wider flex items-center gap-2">
              <Globe className="w-4 h-4 text-stone-500" strokeWidth={1.5} /> Social Clicks
            </h2>
            <span className="text-[10px] font-bold text-[#1C1917] uppercase tracking-widest border border-stone-200 bg-stone-50 px-2 py-0.5">
              {socialClicks.reduce((a, b) => a + b.count, 0)} Total
            </span>
          </div>
          <div className="space-y-3">
            {socialClicks.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-6 text-stone-300">
                <Inbox className="w-6 h-6 mb-2" strokeWidth={1.5} />
                <p className="text-xs font-light text-stone-400">No clicks recorded</p>
              </div>
            ) : (
              socialClicks.map((item) => (
                <div key={item.channel} className="flex justify-between items-center p-3 border border-stone-200/60 bg-[#FAF9F5]/40 hover:bg-[#FAF9F5] transition-colors">
                  <span className="text-xs font-bold uppercase tracking-wider text-stone-500">{item.channel}</span>
                  <span className="text-xs font-bold text-[#1C1917] font-mono">{item.count}</span>
                </div>
              ))
            )}
          </div>
        </motion.div>

      </div>

      {/* ── QUICK ACTIONS ── */}
      <motion.div 
        initial={{ opacity: 0, y: 15 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.45 }} 
        className="bg-white rounded-none border border-stone-200 p-6 sm:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.01)]"
      >
        <h3 className="text-base font-bold text-[#1C1917] uppercase tracking-wider mb-6 flex items-center">
          <Settings className="w-4 h-4 text-stone-500 mr-2" strokeWidth={1.5} /> Quick Actions
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-4">
          {[
            { label: 'Add Project', icon: FolderOpen, link: '/admin/projects/add' },
            { label: 'Add Team Member', icon: Users, link: '/admin/team/add' },
            { label: 'Founder Profile', icon: User, link: '/admin/founder' },
            { label: 'Atelier Settings', icon: Settings, link: '/admin/contact-details' },
            { label: 'View Inquiries', icon: Mail, link: '/admin/contacts' },
            { label: 'View Quotes', icon: Calculator, link: '/admin/estimates' },
          ].map((action, i) => (
            <Link 
              key={i} 
              href={action.link} 
              className="flex flex-col items-center justify-center p-5 border border-stone-200 bg-[#FAF9F5] hover:bg-[#1C1917] hover:border-[#1C1917] text-[#1C1917] hover:text-white transition-all duration-300 group shadow-sm rounded-none"
            >
              <action.icon className="w-5 h-5 mb-3 text-stone-600 group-hover:text-white transition-colors" strokeWidth={1.5} />
              <span className="text-[10px] font-bold text-center uppercase tracking-wider">{action.label}</span>
            </Link>
          ))}
        </div>
      </motion.div>

      {/* ── RECENT FEEDS GRID ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* Recent Inquiries */}
        <div className="bg-white rounded-none border border-stone-200 overflow-hidden flex flex-col h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-5 border-b border-stone-200/80 flex justify-between items-center bg-[#FAF9F5]">
            <h3 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs flex items-center gap-2">
              <Mail className="w-4 h-4 text-stone-400" strokeWidth={1.5} /> Recent Inquiries
            </h3>
            <Link href="/admin/contacts" className="text-[10px] font-bold text-stone-400 hover:text-[#1C1917] uppercase tracking-widest border-b border-stone-300 hover:border-[#1C1917] transition-colors pb-0.5">
              View All
            </Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-3 space-y-1">
            {contacts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300">
                <Inbox className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <p className="text-xs font-light text-stone-400">No inquiries yet</p>
              </div>
            ) : (
              contacts.slice(0, 5).map((contact) => (
                <div key={contact._id} className="p-4 hover:bg-stone-50 border-b border-stone-100 last:border-0 flex justify-between items-start transition-colors">
                  <div className="min-w-0 pr-4">
                    <p className="font-semibold text-xs text-[#1C1917] truncate mb-0.5">{contact.name}</p>
                    <p className="text-[10px] text-stone-400 truncate mb-2">{contact.subject}</p>
                    <p className="text-[9px] text-stone-400 font-bold uppercase tracking-wider flex items-center gap-1.5"><Clock className="w-3 h-3" /> {formatDate(contact.createdAt)}</p>
                  </div>
                  <div className="shrink-0">
                    {getStatusBadge(contact.status)}
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Quotes */}
        <div className="bg-white rounded-none border border-stone-200 overflow-hidden flex flex-col h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-5 border-b border-stone-200/80 flex justify-between items-center bg-[#FAF9F5]">
            <h3 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs flex items-center gap-2">
              <Calculator className="w-4 h-4 text-stone-400" strokeWidth={1.5} /> Recent Quotes
            </h3>
            <Link href="/admin/estimates" className="text-[10px] font-bold text-stone-400 hover:text-[#1C1917] uppercase tracking-widest border-b border-stone-300 hover:border-[#1C1917] transition-colors pb-0.5">
              View All
            </Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-3 space-y-1">
            {estimates.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300">
                <Inbox className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <p className="text-xs font-light text-stone-400">No quotes yet</p>
              </div>
            ) : (
              estimates.slice(0, 5).map((estimate) => (
                <div key={estimate._id} className="p-4 hover:bg-stone-50 border-b border-stone-100 last:border-0 transition-colors">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold text-xs text-[#1C1917] truncate pr-4">{estimate.customerName}</p>
                    {getStatusBadge(estimate.status)}
                  </div>
                  <div className="flex justify-between items-center mt-2.5">
                    <span className="text-[8px] uppercase tracking-wider font-bold text-stone-500 bg-stone-100 border border-stone-200 px-2 py-0.5">{estimate.projectType}</span>
                    <span className="text-xs font-bold text-[#1C1917] font-mono">
                      {estimate.calculatedEstimate ? formatCurrency(estimate.calculatedEstimate.totalEstimate) : 'Pending'}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Recent Projects */}
        <div className="bg-white rounded-none border border-stone-200 overflow-hidden flex flex-col h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-5 border-b border-stone-200/80 flex justify-between items-center bg-[#FAF9F5]">
            <h3 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs flex items-center gap-2">
              <Building className="w-4 h-4 text-stone-400" strokeWidth={1.5} /> Recent Projects
            </h3>
            <Link href="/admin/projects" className="text-[10px] font-bold text-stone-400 hover:text-[#1C1917] uppercase tracking-widest border-b border-stone-300 hover:border-[#1C1917] transition-colors pb-0.5">
              View All
            </Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-3 space-y-1">
            {projects.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300">
                <FolderOpen className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <p className="text-xs font-light text-stone-400">No projects yet</p>
              </div>
            ) : (
              projects.slice(0, 5).map((project) => (
                <div key={project._id} className="p-4 hover:bg-stone-50 flex items-center gap-4 border-b border-stone-100 last:border-0 transition-colors">
                  <img src={project.featuredImage} alt={project.title} className="w-12 h-12 rounded-none object-cover border border-stone-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-[#1C1917] truncate">{project.title}</p>
                    <p className="text-[10px] text-stone-400 truncate flex items-center gap-1 mt-0.5">
                      <MapPin className="w-3 h-3 text-stone-400" /> {project.location}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    <span className={`px-2 py-0.5 text-[8px] font-bold uppercase tracking-wider border rounded-none ${project.category === 'residential' ? 'bg-stone-100 text-stone-850 border-stone-200' : 'bg-stone-800 text-white border-stone-800'}`}>
                      {project.category}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Team Roster */}
        <div className="bg-white rounded-none border border-stone-200 overflow-hidden flex flex-col h-[400px] shadow-[0_4px_20px_rgba(0,0,0,0.01)]">
          <div className="p-5 border-b border-stone-200/80 flex justify-between items-center bg-[#FAF9F5]">
            <h3 className="font-bold text-[#1C1917] uppercase tracking-wider text-xs flex items-center gap-2">
              <Users className="w-4 h-4 text-stone-400" strokeWidth={1.5} /> Team Roster
            </h3>
            <Link href="/admin/team" className="text-[10px] font-bold text-stone-400 hover:text-[#1C1917] uppercase tracking-widest border-b border-stone-300 hover:border-[#1C1917] transition-colors pb-0.5">
              View All
            </Link>
          </div>
          <div className="overflow-y-auto flex-1 custom-scrollbar p-3 space-y-1">
            {teamMembers.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-stone-300">
                <User className="w-8 h-8 mb-2" strokeWidth={1.5} />
                <p className="text-xs font-light text-stone-400">No team members yet</p>
              </div>
            ) : (
              teamMembers.slice(0, 5).map((member) => (
                <div key={member._id} className="p-4 hover:bg-stone-50 flex items-center gap-4 border-b border-stone-100 last:border-0 transition-colors">
                  <img src={member.image} alt={member.name} className="w-10 h-10 rounded-full object-cover border border-stone-200" />
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold text-xs text-[#1C1917] truncate flex items-center gap-2">
                      {member.name}
                      {member.isActive && <span className="w-2.5 h-2.5 rounded-full bg-stone-500 border-2 border-white"></span>}
                    </p>
                    <p className="text-[10px] text-stone-400 truncate mt-0.5">{member.position}</p>
                  </div>
                  <Link href={`/admin/team/${member._id}`} className="p-1.5 text-stone-400 hover:text-[#1C1917] transition-colors border border-stone-200 hover:border-stone-400 rounded-md">
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              ))
            )}
          </div>
        </div>

      </div>

      {/* ── BOTTOM ACTIVITY SUMMARY BANNER ── */}
      <div className="bg-[#1C1917] rounded-none border border-stone-850 p-8 flex flex-col md:flex-row items-center justify-between text-white relative overflow-hidden mt-8 shadow-md">
        <div className="absolute -left-10 -bottom-10 w-40 h-40 bg-stone-800/10 rounded-full blur-3xl"></div>
        <div className="relative z-10 text-center md:text-left mb-6 md:mb-0">
          <h3 className="text-xl font-serif font-bold mb-2">Activity Summary</h3>
          <p className="text-stone-400 text-xs font-light max-w-md leading-relaxed">Stay on top of your architecture studio's digital growth. You have {newLeadsCount} new leads requiring attention.</p>
        </div>
        <div className="relative z-10 flex gap-8 md:gap-12">
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-mono leading-none">{newLeadsCount}</p>
            <p className="text-[8px] text-stone-400 uppercase tracking-widest font-bold mt-2">New Leads</p>
          </div>
          <div className="text-center">
            <p className="text-3xl font-bold text-white font-mono leading-none">{projects.filter(p => p.isActive).length + teamMembers.filter(m => m.isActive).length}</p>
            <p className="text-[8px] text-stone-400 uppercase tracking-widest font-bold mt-2">Active Posts</p>
          </div>
          <div className="text-center hidden sm:block">
            <p className="text-3xl font-bold text-white font-mono leading-none">
              {Math.round((Date.now() - new Date(projects[0]?.createdAt || Date.now()).getTime()) / (1000 * 60 * 60 * 24)) || 0}
            </p>
            <p className="text-[8px] text-stone-400 uppercase tracking-widest font-bold mt-2">Days Since Post</p>
          </div>
        </div>
      </div>

    </div>
  );
}