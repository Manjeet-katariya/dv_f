'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Save, Upload, Loader2, Globe, FileText, Layout, Info, PhoneCall, Calculator } from 'lucide-react';
import { toast } from 'sonner';

interface Stat {
  val: string;
  label: string;
}

interface PageContent {
  home: {
    heroSubtitle: string;
    heroTitle: string;
    heroImage: string;
    heroDescription: string;
    heroStats: Stat[];
    ethosHeading: string;
    ethosLinkText: string;
    service1Title?: string;
    service1Desc?: string;
    service1Img?: string;
    service2Title?: string;
    service2Desc?: string;
    service2Img?: string;
    service3Title?: string;
    service3Desc?: string;
    service3Img?: string;
    service4Title?: string;
    service4Desc?: string;
    service4Img?: string;
    service5Title?: string;
    service5Desc?: string;
    service5Img?: string;
    service6Title?: string;
    service6Desc?: string;
    service6Img?: string;
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
  about: {
    heroHeading: string;
    heroDescription: string;
    heroImage: string;
    heroStats: Stat[];
    ethosTitle1?: string;
    ethosTitle2?: string;
    ethosDescription1?: string;
    ethosDescription2?: string;
    pillar1Title?: string;
    pillar1Desc?: string;
    pillar2Title?: string;
    pillar2Desc?: string;
    pillar3Title?: string;
    pillar3Desc?: string;
    value1Title?: string;
    value1Desc?: string;
    value2Title?: string;
    value2Desc?: string;
    value3Title?: string;
    value3Desc?: string;
    journey1Year?: string;
    journey1Title?: string;
    journey1Desc?: string;
    journey2Year?: string;
    journey2Title?: string;
    journey2Desc?: string;
    journey3Year?: string;
    journey3Title?: string;
    journey3Desc?: string;
    journey4Year?: string;
    journey4Title?: string;
    journey4Desc?: string;
  };
  services: {
    heroHeading: string;
    heroDescription: string;
    heroImage: string;
    process1Title?: string;
    process1Desc?: string;
    process2Title?: string;
    process2Desc?: string;
    process3Title?: string;
    process3Desc?: string;
    process4Title?: string;
    process4Desc?: string;
    discipline1Tag?: string;
    discipline1Title?: string;
    discipline1Desc?: string;
    discipline1Feature1?: string;
    discipline1Feature2?: string;
    discipline1Feature3?: string;
    discipline1Feature4?: string;
    discipline1Img?: string;
    discipline2Tag?: string;
    discipline2Title?: string;
    discipline2Desc?: string;
    discipline2Feature1?: string;
    discipline2Feature2?: string;
    discipline2Feature3?: string;
    discipline2Feature4?: string;
    discipline2Img?: string;
    discipline3Tag?: string;
    discipline3Title?: string;
    discipline3Desc?: string;
    discipline3Feature1?: string;
    discipline3Feature2?: string;
    discipline3Feature3?: string;
    discipline3Feature4?: string;
    discipline3Img?: string;
    discipline4Tag?: string;
    discipline4Title?: string;
    discipline4Desc?: string;
    discipline4Feature1?: string;
    discipline4Feature2?: string;
    discipline4Feature3?: string;
    discipline4Feature4?: string;
    discipline4Img?: string;
    discipline5Tag?: string;
    discipline5Title?: string;
    discipline5Desc?: string;
    discipline5Feature1?: string;
    discipline5Feature2?: string;
    discipline5Feature3?: string;
    discipline5Feature4?: string;
    discipline5Img?: string;
    discipline6Tag?: string;
    discipline6Title?: string;
    discipline6Desc?: string;
    discipline6Feature1?: string;
    discipline6Feature2?: string;
    discipline6Feature3?: string;
    discipline6Feature4?: string;
    discipline6Img?: string;
    why1Title?: string;
    why1Desc?: string;
    why2Title?: string;
    why2Desc?: string;
    why3Title?: string;
    why3Desc?: string;
  };
  portfolio: {
    heroHeading: string;
    heroDescription: string;
    heroImage: string;
  };
  calculator: {
    heroTag: string;
    heroHeading: string;
    heroDescription: string;
  };
  contact: {
    heroTag: string;
    heroHeading: string;
    heroDescription: string;
  };
}

const TABS = [
  { id: 'home', label: 'Home Page', icon: Layout },
  { id: 'about', label: 'About Page', icon: Info },
  { id: 'services', label: 'Services Page', icon: Globe },
  { id: 'portfolio', label: 'Portfolio', icon: FileText },
  { id: 'calculator', label: 'Calculator', icon: Calculator },
  { id: 'contact', label: 'Contact Page', icon: PhoneCall },
] as const;

export default function WebsiteContentManagement() {
  const [activeTab, setActiveTab] = useState<typeof TABS[number]['id']>('home');
  const [content, setContent] = useState<PageContent | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploadingField, setUploadingField] = useState<string | null>(null);

  const fileInputRefs = {
    'home.heroImage': useRef<HTMLInputElement>(null),
    'home.service1Img': useRef<HTMLInputElement>(null),
    'home.service2Img': useRef<HTMLInputElement>(null),
    'home.service3Img': useRef<HTMLInputElement>(null),
    'home.service4Img': useRef<HTMLInputElement>(null),
    'home.service5Img': useRef<HTMLInputElement>(null),
    'home.service6Img': useRef<HTMLInputElement>(null),
    'about.heroImage': useRef<HTMLInputElement>(null),
    'services.heroImage': useRef<HTMLInputElement>(null),
    'services.discipline1Img': useRef<HTMLInputElement>(null),
    'services.discipline2Img': useRef<HTMLInputElement>(null),
    'services.discipline3Img': useRef<HTMLInputElement>(null),
    'services.discipline4Img': useRef<HTMLInputElement>(null),
    'services.discipline5Img': useRef<HTMLInputElement>(null),
    'services.discipline6Img': useRef<HTMLInputElement>(null),
    'portfolio.heroImage': useRef<HTMLInputElement>(null),
  };

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/website-content`);
      const data = await response.json();
      if (data.success && data.data) {
        setContent(data.data);
      } else {
        toast.error('Failed to load website content');
      }
    } catch (error) {
      console.error('Error fetching content:', error);
      toast.error('Network error loading website content');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    page: keyof PageContent,
    field: string,
    value: any
  ) => {
    if (!content) return;
    setContent((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [page]: {
          ...prev[page],
          [field]: value,
        },
      };
    });
  };

  const handleStatChange = (
    page: 'home' | 'about',
    index: number,
    field: keyof Stat,
    value: string
  ) => {
    if (!content) return;
    const statsCopy = [...(content[page].heroStats || [])];
    statsCopy[index] = {
      ...statsCopy[index],
      [field]: value,
    };

    setContent((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        [page]: {
          ...prev[page],
          heroStats: statsCopy,
        },
      };
    });
  };

  const triggerImageUpload = (fieldKey: keyof typeof fileInputRefs) => {
    fileInputRefs[fieldKey].current?.click();
  };

  const handleImageUpload = async (
    e: React.ChangeEvent<HTMLInputElement>,
    page: keyof PageContent,
    field: string
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fieldKey = `${page}.${field}`;
    setUploadingField(fieldKey);
    toast.loading('Uploading image...', { id: 'upload-toast' });

    try {
      const uploadFormData = new FormData();
      uploadFormData.append('image', file);

      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const uploadResponse = await fetch(`${API_URL}/api/upload`, {
        method: 'POST',
        body: uploadFormData,
      });

      const uploadResult = await uploadResponse.json();
      if (uploadResult.success && uploadResult.url) {
        handleInputChange(page, field, uploadResult.url);
        toast.success('Image uploaded successfully', { id: 'upload-toast' });
      } else {
        throw new Error(uploadResult.message || 'Upload failed');
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Failed to upload image', { id: 'upload-toast' });
    } finally {
      setUploadingField(null);
      // Reset input value so same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const handleSave = async () => {
    if (!content) return;
    setSaving(true);
    toast.loading('Saving website content...', { id: 'save-toast' });

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
      const response = await fetch(`${API_URL}/api/website-content`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(content),
      });

      const data = await response.json();
      if (data.success) {
        setContent(data.data);
        toast.success('Website content saved successfully!', { id: 'save-toast' });
      } else {
        toast.error(data.message || 'Failed to save website content', { id: 'save-toast' });
      }
    } catch (error) {
      console.error('Error saving content:', error);
      toast.error('Network error saving website content', { id: 'save-toast' });
    } finally {
      setSaving(false);
    }
  };

  if (loading || !content) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-stone-700" />
        <p className="text-stone-500 mt-4 text-sm font-light">Loading website content editor...</p>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-stone-200 pb-5">
        <div>
          <h1 className="text-3xl font-serif font-bold text-stone-900 tracking-tight">Website Content Management</h1>
          <p className="text-stone-500 text-sm font-light mt-1">Make your homepage and page headers fully dynamic</p>
        </div>
        <button
          onClick={handleSave}
          disabled={saving}
          className="inline-flex items-center justify-center gap-2 bg-[#1C1917] hover:bg-[#2e2a27] text-white text-sm font-semibold px-6 py-2.5 transition-colors disabled:opacity-50 h-10 shrink-0"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Save className="w-4 h-4" />
          )}
          <span>Save Changes</span>
        </button>
      </div>

      {/* Tabs Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-3 flex flex-col gap-1.5 bg-[#FAF9F5] border border-stone-200 p-3">
          <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 px-3 mb-2">Sections</span>
          {TABS.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-3 px-4 py-3 text-sm font-medium transition-all text-left ${
                  isActive
                    ? 'bg-stone-900 text-white shadow-sm'
                    : 'text-stone-600 hover:bg-stone-100 hover:text-stone-900'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Editor Form Panel */}
        <div className="lg:col-span-9 bg-white border border-stone-200 p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              {/* Tab Description / Help Banner */}
              <div className="p-4 bg-stone-50 border border-stone-200 flex gap-3 text-xs text-stone-600">
                <Info className="w-4 h-4 text-stone-400 shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-stone-800 uppercase tracking-wider text-[9px] mb-1">
                    Editing: {TABS.find((t) => t.id === activeTab)?.label}
                  </p>
                  <p className="leading-relaxed font-light">
                    These texts are shown in the main hero and statement sections of the {TABS.find((t) => t.id === activeTab)?.label}. You can use newline characters (\n or pressing Enter) in titles for explicit line breaks.
                  </p>
                </div>
              </div>

              {/* HOME PAGE EDITOR */}
              {activeTab === 'home' && (
                <div className="space-y-6">
                  {/* Hero Subtitle */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Subtitle</label>
                    <input
                      type="text"
                      value={content.home.heroSubtitle}
                      onChange={(e) => handleInputChange('home', 'heroSubtitle', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="e.g., Architecture & Interiors"
                    />
                  </div>

                  {/* Hero Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Title (Allows multiple lines)</label>
                    <textarea
                      rows={3}
                      value={content.home.heroTitle}
                      onChange={(e) => handleInputChange('home', 'heroTitle', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., Designing Spaces&#10;That Inspire."
                    />
                  </div>

                  {/* Hero Image */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Background Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-40 h-24 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        {content.home.heroImage && (
                          <img
                            src={content.home.heroImage}
                            alt="Hero Image Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={content.home.heroImage}
                          onChange={(e) => handleInputChange('home', 'heroImage', e.target.value)}
                          className="border border-stone-200 px-4 py-2 text-xs focus:outline-none focus:border-stone-500 w-full"
                          placeholder="Image URL"
                        />
                        <input
                          type="file"
                          ref={fileInputRefs['home.heroImage']}
                          onChange={(e) => handleImageUpload(e, 'home', 'heroImage')}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerImageUpload('home.heroImage')}
                          disabled={uploadingField === 'home.heroImage'}
                          className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 transition-colors disabled:opacity-50"
                        >
                          {uploadingField === 'home.heroImage' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>Upload via Cloudinary</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Bottom Paragraph</label>
                    <textarea
                      rows={3}
                      value={content.home.heroDescription}
                      onChange={(e) => handleInputChange('home', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="Enter description text..."
                    />
                  </div>

                  {/* Hero Stats */}
                  <div className="space-y-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Hero Stats (3 columns)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {content.home.heroStats.map((stat, i) => (
                        <div key={i} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                          <span className="text-[10px] font-bold text-stone-400 block uppercase">Stat #{i + 1}</span>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">Value</label>
                            <input
                              type="text"
                              value={stat.val}
                              onChange={(e) => handleStatChange('home', i, 'val', e.target.value)}
                              className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                              placeholder="e.g. 180 or 8+"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleStatChange('home', i, 'label', e.target.value)}
                              className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              placeholder="e.g. Projects Delivered"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Ethos Heading */}
                  <div className="flex flex-col gap-2 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Ethos Section Heading Statement</label>
                    <textarea
                      rows={3}
                      value={content.home.ethosHeading}
                      onChange={(e) => handleInputChange('home', 'ethosHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif text-lg"
                      placeholder="Enter massive ethos statement..."
                    />
                  </div>

                   {/* Ethos Link Text */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Ethos Link Label</label>
                    <input
                      type="text"
                      value={content.home.ethosLinkText}
                      onChange={(e) => handleInputChange('home', 'ethosLinkText', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="e.g. Our Philosophy"
                    />
                  </div>

                  {/* Core Philosophy Section */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Core Philosophy Section</label>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Philosophy Heading</label>
                      <textarea
                        rows={2}
                        value={content.home.philosophyHeading || ''}
                        onChange={(e) => handleInputChange('home', 'philosophyHeading', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                        placeholder="e.g. Turning Dreams into&#10;*Timeless Spaces.*"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Philosophy Subheading / Slogan</label>
                      <input
                        type="text"
                        value={content.home.philosophySubheading || ''}
                        onChange={(e) => handleInputChange('home', 'philosophySubheading', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                        placeholder="e.g. Every great space begins with a dream."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Philosophy Description</label>
                      <textarea
                        rows={3}
                        value={content.home.philosophyDescription || ''}
                        onChange={(e) => handleInputChange('home', 'philosophyDescription', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Philosophy Highlighted Quote</label>
                      <textarea
                        rows={2}
                        value={content.home.philosophyQuote || ''}
                        onChange={(e) => handleInputChange('home', 'philosophyQuote', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif italic text-stone-600"
                      />
                    </div>
                    
                    {/* Philosophy Stats */}
                    <div className="space-y-4 pt-2">
                      <label className="text-[10px] font-bold uppercase tracking-wider text-stone-600 block">Philosophy Stats (3 columns)</label>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {[1, 2, 3].map((num) => {
                          const valKey = `philosophyStat${num}Val` as keyof typeof content.home;
                          const labelKey = `philosophyStat${num}Label` as keyof typeof content.home;
                          return (
                            <div key={num} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                              <span className="text-[10px] font-bold text-stone-400 block uppercase">Stat #{num}</span>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Value</label>
                                <input
                                  type="text"
                                  value={(content.home[valKey] as string) || ''}
                                  onChange={(e) => handleInputChange('home', valKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                                  placeholder="e.g. 180+"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Label</label>
                                <input
                                  type="text"
                                  value={(content.home[labelKey] as string) || ''}
                                  onChange={(e) => handleInputChange('home', labelKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                                  placeholder="e.g. Projects Delivered"
                                />
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  </div>

                  {/* Our Expertise / Services */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Our Expertise (6 Sections)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((num) => {
                        const titleKey = `service${num}Title` as keyof typeof content.home;
                        const descKey = `service${num}Desc` as keyof typeof content.home;
                        const imgKey = `service${num}Img` as keyof typeof content.home;
                        const refKey = `home.service${num}Img` as keyof typeof fileInputRefs;
                        
                        return (
                          <div key={num} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                            <span className="text-[10px] font-bold text-stone-400 block uppercase">Expertise #{num}</span>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                              <input
                                type="text"
                                value={(content.home[titleKey] as string) || ''}
                                onChange={(e) => handleInputChange('home', titleKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                              <textarea
                                rows={2}
                                value={(content.home[descKey] as string) || ''}
                                onChange={(e) => handleInputChange('home', descKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Background Image</label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={(content.home[imgKey] as string) || ''}
                                  onChange={(e) => handleInputChange('home', imgKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-[10px] bg-white focus:outline-none focus:border-stone-500 flex-1"
                                  placeholder="Image URL"
                                />
                                <input
                                  type="file"
                                  ref={fileInputRefs[refKey]}
                                  onChange={(e) => handleImageUpload(e, 'home', imgKey)}
                                  accept="image/*"
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => triggerImageUpload(refKey)}
                                  disabled={uploadingField === refKey}
                                  className="bg-stone-200 hover:bg-stone-300 text-[#1C1917] px-3 py-1.5 text-[10px] font-bold transition-colors disabled:opacity-50"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* ABOUT PAGE EDITOR */}
              {activeTab === 'about' && (
                <div className="space-y-6">
                  {/* Hero Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Heading</label>
                    <textarea
                      rows={3}
                      value={content.about.heroHeading}
                      onChange={(e) => handleInputChange('about', 'heroHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., We design spaces&#10;that outlast&#10;trends."
                    />
                  </div>

                  {/* Hero Image */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-40 h-24 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        {content.about.heroImage && (
                          <img
                            src={content.about.heroImage}
                            alt="Hero Image Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={content.about.heroImage}
                          onChange={(e) => handleInputChange('about', 'heroImage', e.target.value)}
                          className="border border-stone-200 px-4 py-2 text-xs focus:outline-none focus:border-stone-500 w-full"
                          placeholder="Image URL"
                        />
                        <input
                          type="file"
                          ref={fileInputRefs['about.heroImage']}
                          onChange={(e) => handleImageUpload(e, 'about', 'heroImage')}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerImageUpload('about.heroImage')}
                          disabled={uploadingField === 'about.heroImage'}
                          className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 transition-colors disabled:opacity-50"
                        >
                          {uploadingField === 'about.heroImage' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>Upload via Cloudinary</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Paragraph</label>
                    <textarea
                      rows={4}
                      value={content.about.heroDescription}
                      onChange={(e) => handleInputChange('about', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="Enter description text..."
                    />
                  </div>

                  {/* Hero Stats */}
                  <div className="space-y-4">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Hero Stats (2 columns)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {content.about.heroStats?.map((stat, i) => (
                        <div key={i} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                          <span className="text-[10px] font-bold text-stone-400 block uppercase">Stat #{i + 1}</span>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">Value</label>
                            <input
                              type="text"
                              value={stat.val}
                              onChange={(e) => handleStatChange('about', i, 'val', e.target.value)}
                              className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                              placeholder="e.g. 180+ or 8+"
                            />
                          </div>
                          <div className="flex flex-col gap-1.5">
                            <label className="text-[10px] font-bold text-stone-600 uppercase">Label</label>
                            <input
                              type="text"
                              value={stat.label}
                              onChange={(e) => handleStatChange('about', i, 'label', e.target.value)}
                              className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              placeholder="e.g. Projects Delivered"
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {/* Studio Ethos */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Studio Ethos</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-stone-600 uppercase">Ethos Heading 1</label>
                        <input
                          type="text"
                          value={content.about.ethosTitle1 || ''}
                          onChange={(e) => handleInputChange('about', 'ethosTitle1', e.target.value)}
                          className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-bold"
                          placeholder="e.g. Design with Purpose."
                        />
                      </div>
                      <div className="flex flex-col gap-2">
                        <label className="text-[10px] font-bold text-stone-600 uppercase">Ethos Heading 2</label>
                        <input
                          type="text"
                          value={content.about.ethosTitle2 || ''}
                          onChange={(e) => handleInputChange('about', 'ethosTitle2', e.target.value)}
                          className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full italic"
                          placeholder="e.g. Build with Integrity."
                        />
                      </div>
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Ethos Description Paragraph 1</label>
                      <textarea
                        rows={3}
                        value={content.about.ethosDescription1 || ''}
                        onChange={(e) => handleInputChange('about', 'ethosDescription1', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                        placeholder="Ethos details..."
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-bold text-stone-600 uppercase">Ethos Description Paragraph 2</label>
                      <textarea
                        rows={3}
                        value={content.about.ethosDescription2 || ''}
                        onChange={(e) => handleInputChange('about', 'ethosDescription2', e.target.value)}
                        className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                        placeholder="More ethos details..."
                      />
                    </div>
                  </div>

                  {/* Pillars */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Three Pillars</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Pillar 1 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Pillar #1</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.pillar1Title || ''}
                            onChange={(e) => handleInputChange('about', 'pillar1Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.pillar1Desc || ''}
                            onChange={(e) => handleInputChange('about', 'pillar1Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Pillar 2 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Pillar #2</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.pillar2Title || ''}
                            onChange={(e) => handleInputChange('about', 'pillar2Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.pillar2Desc || ''}
                            onChange={(e) => handleInputChange('about', 'pillar2Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Pillar 3 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Pillar #3</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.pillar3Title || ''}
                            onChange={(e) => handleInputChange('about', 'pillar3Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.pillar3Desc || ''}
                            onChange={(e) => handleInputChange('about', 'pillar3Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Values */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Core Values</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {/* Value 1 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Value #1</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.value1Title || ''}
                            onChange={(e) => handleInputChange('about', 'value1Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.value1Desc || ''}
                            onChange={(e) => handleInputChange('about', 'value1Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Value 2 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Value #2</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.value2Title || ''}
                            onChange={(e) => handleInputChange('about', 'value2Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.value2Desc || ''}
                            onChange={(e) => handleInputChange('about', 'value2Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Value 3 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Value #3</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.about.value3Title || ''}
                            onChange={(e) => handleInputChange('about', 'value3Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.about.value3Desc || ''}
                            onChange={(e) => handleInputChange('about', 'value3Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Our Journey Steps */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Our Journey (4 Timeline Steps)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {[1, 2, 3, 4].map((num) => {
                        const yearKey = `journey${num}Year` as keyof typeof content.about;
                        const titleKey = `journey${num}Title` as keyof typeof content.about;
                        const descKey = `journey${num}Desc` as keyof typeof content.about;
                        return (
                          <div key={num} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                            <span className="text-[10px] font-bold text-stone-400 block uppercase">Step #{num}</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Year</label>
                                <input
                                  type="text"
                                  value={(content.about[yearKey] as string) || ''}
                                  onChange={(e) => handleInputChange('about', yearKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold text-center"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                                <input
                                  type="text"
                                  value={(content.about[titleKey] as string) || ''}
                                  onChange={(e) => handleInputChange('about', titleKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                              <textarea
                                rows={3}
                                value={(content.about[descKey] as string) || ''}
                                onChange={(e) => handleInputChange('about', descKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* SERVICES PAGE EDITOR */}
              {activeTab === 'services' && (
                <div className="space-y-6">
                  {/* Hero Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Heading</label>
                    <textarea
                      rows={3}
                      value={content.services.heroHeading}
                      onChange={(e) => handleInputChange('services', 'heroHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., What We&#10;Create For You."
                    />
                  </div>

                  {/* Hero Image */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Background Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-40 h-24 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        {content.services.heroImage && (
                          <img
                            src={content.services.heroImage}
                            alt="Hero Image Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={content.services.heroImage}
                          onChange={(e) => handleInputChange('services', 'heroImage', e.target.value)}
                          className="border border-stone-200 px-4 py-2 text-xs focus:outline-none focus:border-stone-500 w-full"
                          placeholder="Image URL"
                        />
                        <input
                          type="file"
                          ref={fileInputRefs['services.heroImage']}
                          onChange={(e) => handleImageUpload(e, 'services', 'heroImage')}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerImageUpload('services.heroImage')}
                          disabled={uploadingField === 'services.heroImage'}
                          className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 transition-colors disabled:opacity-50"
                        >
                          {uploadingField === 'services.heroImage' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>Upload via Cloudinary</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Description</label>
                    <textarea
                      rows={3}
                      value={content.services.heroDescription}
                      onChange={(e) => handleInputChange('services', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="Enter description text..."
                    />
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Four Process Steps</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {/* Step 1 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Step #1</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.services.process1Title || ''}
                            onChange={(e) => handleInputChange('services', 'process1Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.services.process1Desc || ''}
                            onChange={(e) => handleInputChange('services', 'process1Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Step 2 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Step #2</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.services.process2Title || ''}
                            onChange={(e) => handleInputChange('services', 'process2Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.services.process2Desc || ''}
                            onChange={(e) => handleInputChange('services', 'process2Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Step 3 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Step #3</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.services.process3Title || ''}
                            onChange={(e) => handleInputChange('services', 'process3Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.services.process3Desc || ''}
                            onChange={(e) => handleInputChange('services', 'process3Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                      {/* Step 4 */}
                      <div className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                        <span className="text-[10px] font-bold text-stone-400 block uppercase">Step #4</span>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                          <input
                            type="text"
                            value={content.services.process4Title || ''}
                            onChange={(e) => handleInputChange('services', 'process4Title', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                          />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                          <textarea
                            rows={3}
                            value={content.services.process4Desc || ''}
                            onChange={(e) => handleInputChange('services', 'process4Desc', e.target.value)}
                            className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Our Disciplines (6 items) */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Our Disciplines (6 Sections)</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {[1, 2, 3, 4, 5, 6].map((num) => {
                        const tagKey = `discipline${num}Tag` as keyof typeof content.services;
                        const titleKey = `discipline${num}Title` as keyof typeof content.services;
                        const descKey = `discipline${num}Desc` as keyof typeof content.services;
                        const f1Key = `discipline${num}Feature1` as keyof typeof content.services;
                        const f2Key = `discipline${num}Feature2` as keyof typeof content.services;
                        const f3Key = `discipline${num}Feature3` as keyof typeof content.services;
                        const f4Key = `discipline${num}Feature4` as keyof typeof content.services;
                        const imgKey = `discipline${num}Img` as keyof typeof content.services;
                        const refKey = `services.discipline${num}Img` as keyof typeof fileInputRefs;
                        
                        return (
                          <div key={num} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                            <span className="text-[10px] font-bold text-stone-400 block uppercase">Discipline #{num}</span>
                            <div className="grid grid-cols-2 gap-2">
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Tag (Category)</label>
                                <input
                                  type="text"
                                  value={(content.services[tagKey] as string) || ''}
                                  onChange={(e) => handleInputChange('services', tagKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                                />
                              </div>
                              <div className="flex flex-col gap-1.5">
                                <label className="text-[10px] font-bold text-stone-600 uppercase">Title Heading</label>
                                <input
                                  type="text"
                                  value={(content.services[titleKey] as string) || ''}
                                  onChange={(e) => handleInputChange('services', titleKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                                />
                              </div>
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                              <textarea
                                rows={2}
                                value={(content.services[descKey] as string) || ''}
                                onChange={(e) => handleInputChange('services', descKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              />
                            </div>
                            
                            {/* Features */}
                            <div className="space-y-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase block">Features List (4 items)</label>
                              <div className="grid grid-cols-2 gap-2">
                                <input
                                  type="text"
                                  value={(content.services[f1Key] as string) || ''}
                                  onChange={(e) => handleInputChange('services', f1Key, e.target.value)}
                                  className="border border-stone-200 px-2 py-1 text-[10px] bg-white focus:outline-none focus:border-stone-500 w-full"
                                  placeholder="Feature #1"
                                />
                                <input
                                  type="text"
                                  value={(content.services[f2Key] as string) || ''}
                                  onChange={(e) => handleInputChange('services', f2Key, e.target.value)}
                                  className="border border-stone-200 px-2 py-1 text-[10px] bg-white focus:outline-none focus:border-stone-500 w-full"
                                  placeholder="Feature #2"
                                />
                                <input
                                  type="text"
                                  value={(content.services[f3Key] as string) || ''}
                                  onChange={(e) => handleInputChange('services', f3Key, e.target.value)}
                                  className="border border-stone-200 px-2 py-1 text-[10px] bg-white focus:outline-none focus:border-stone-500 w-full"
                                  placeholder="Feature #3"
                                />
                                <input
                                  type="text"
                                  value={(content.services[f4Key] as string) || ''}
                                  onChange={(e) => handleInputChange('services', f4Key, e.target.value)}
                                  className="border border-stone-200 px-2 py-1 text-[10px] bg-white focus:outline-none focus:border-stone-500 w-full"
                                  placeholder="Feature #4"
                                />
                              </div>
                            </div>

                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Image URL</label>
                              <div className="flex gap-2 items-center">
                                <input
                                  type="text"
                                  value={(content.services[imgKey] as string) || ''}
                                  onChange={(e) => handleInputChange('services', imgKey, e.target.value)}
                                  className="border border-stone-200 px-3 py-1.5 text-[10px] bg-white focus:outline-none focus:border-stone-500 flex-1"
                                />
                                <input
                                  type="file"
                                  ref={fileInputRefs[refKey]}
                                  onChange={(e) => handleImageUpload(e, 'services', imgKey)}
                                  accept="image/*"
                                  className="hidden"
                                />
                                <button
                                  type="button"
                                  onClick={() => triggerImageUpload(refKey)}
                                  disabled={uploadingField === refKey}
                                  className="bg-stone-200 hover:bg-stone-300 text-[#1C1917] px-3 py-1.5 text-[10px] font-bold transition-colors disabled:opacity-50"
                                >
                                  Upload
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Why DVL Section (3 Columns) */}
                  <div className="space-y-4 pt-4 border-t border-stone-100">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700 block border-b border-stone-100 pb-2">Why DVL section (3 Columns)</label>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[1, 2, 3].map((num) => {
                        const titleKey = `why${num}Title` as keyof typeof content.services;
                        const descKey = `why${num}Desc` as keyof typeof content.services;
                        return (
                          <div key={num} className="border border-stone-200 p-4 space-y-3 bg-stone-50">
                            <span className="text-[10px] font-bold text-stone-400 block uppercase">Column #{num}</span>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Title</label>
                              <input
                                type="text"
                                value={(content.services[titleKey] as string) || ''}
                                onChange={(e) => handleInputChange('services', titleKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full font-bold"
                              />
                            </div>
                            <div className="flex flex-col gap-1.5">
                              <label className="text-[10px] font-bold text-stone-600 uppercase">Description</label>
                              <textarea
                                rows={4}
                                value={(content.services[descKey] as string) || ''}
                                onChange={(e) => handleInputChange('services', descKey, e.target.value)}
                                className="border border-stone-200 px-3 py-1.5 text-xs bg-white focus:outline-none focus:border-stone-500 w-full"
                              />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* PORTFOLIO PAGE EDITOR */}
              {activeTab === 'portfolio' && (
                <div className="space-y-6">
                  {/* Hero Title */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Heading</label>
                    <textarea
                      rows={3}
                      value={content.portfolio.heroHeading}
                      onChange={(e) => handleInputChange('portfolio', 'heroHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., Selected&#10;Works."
                    />
                  </div>

                  {/* Hero Image */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Background Image</label>
                    <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
                      <div className="relative w-40 h-24 bg-stone-100 border border-stone-200 overflow-hidden shrink-0">
                        {content.portfolio.heroImage && (
                          <img
                            src={content.portfolio.heroImage}
                            alt="Hero Image Preview"
                            className="w-full h-full object-cover"
                          />
                        )}
                      </div>
                      <div className="flex-1 space-y-2 w-full">
                        <input
                          type="text"
                          value={content.portfolio.heroImage}
                          onChange={(e) => handleInputChange('portfolio', 'heroImage', e.target.value)}
                          className="border border-stone-200 px-4 py-2 text-xs focus:outline-none focus:border-stone-500 w-full"
                          placeholder="Image URL"
                        />
                        <input
                          type="file"
                          ref={fileInputRefs['portfolio.heroImage']}
                          onChange={(e) => handleImageUpload(e, 'portfolio', 'heroImage')}
                          accept="image/*"
                          className="hidden"
                        />
                        <button
                          type="button"
                          onClick={() => triggerImageUpload('portfolio.heroImage')}
                          disabled={uploadingField === 'portfolio.heroImage'}
                          className="inline-flex items-center justify-center gap-2 bg-stone-100 hover:bg-stone-200 text-stone-800 text-xs font-semibold px-4 py-2 transition-colors disabled:opacity-50"
                        >
                          {uploadingField === 'portfolio.heroImage' ? (
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                          ) : (
                            <Upload className="w-3.5 h-3.5" />
                          )}
                          <span>Upload via Cloudinary</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Description</label>
                    <textarea
                      rows={3}
                      value={content.portfolio.heroDescription}
                      onChange={(e) => handleInputChange('portfolio', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="Enter description text..."
                    />
                  </div>
                </div>
              )}

              {/* CALCULATOR PAGE EDITOR */}
              {activeTab === 'calculator' && (
                <div className="space-y-6">
                  {/* Hero Tag */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Tagline</label>
                    <input
                      type="text"
                      value={content.calculator.heroTag}
                      onChange={(e) => handleInputChange('calculator', 'heroTag', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="e.g. Cost Estimator"
                    />
                  </div>

                  {/* Hero Heading */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Heading</label>
                    <textarea
                      rows={3}
                      value={content.calculator.heroHeading}
                      onChange={(e) => handleInputChange('calculator', 'heroHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., Know your budget&#10;before you build."
                    />
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Subtext Description</label>
                    <textarea
                      rows={3}
                      value={content.calculator.heroDescription}
                      onChange={(e) => handleInputChange('calculator', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="e.g., 3 steps · 2 minutes · Instant estimate..."
                    />
                  </div>
                </div>
              )}

              {/* CONTACT PAGE EDITOR */}
              {activeTab === 'contact' && (
                <div className="space-y-6">
                  {/* Hero Tag */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Tagline</label>
                    <input
                      type="text"
                      value={content.contact.heroTag}
                      onChange={(e) => handleInputChange('contact', 'heroTag', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="e.g. Get In Touch"
                    />
                  </div>

                  {/* Hero Heading */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Heading</label>
                    <textarea
                      rows={3}
                      value={content.contact.heroHeading}
                      onChange={(e) => handleInputChange('contact', 'heroHeading', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full font-serif"
                      placeholder="e.g., Where Vision Meets&#10;Architecture into life."
                    />
                  </div>

                  {/* Hero Description */}
                  <div className="flex flex-col gap-2">
                    <label className="text-xs font-semibold uppercase tracking-wider text-stone-700">Hero Description</label>
                    <textarea
                      rows={4}
                      value={content.contact.heroDescription}
                      onChange={(e) => handleInputChange('contact', 'heroDescription', e.target.value)}
                      className="border border-stone-200 px-4 py-2.5 text-sm focus:outline-none focus:border-stone-500 w-full"
                      placeholder="Enter description text..."
                    />
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
