"use client";

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, ChevronRight, ChevronLeft, Home, Building, Utensils, RotateCcw, ArrowUpRight } from 'lucide-react';
import Link from 'next/link';

const DEFAULT_CALCULATOR = {
  heroTag: 'Cost Estimator',
  heroHeading: 'Know your budget\n*before you build.*',
  heroDescription: '3 steps · 2 minutes · Instant estimate sent to your email.'
};

const renderDynamicText = (text: string, italicClass = "italic font-normal text-stone-500") => {
  if (!text) return null;
  return text.split('\n').map((line, lineIdx) => {
    const parts = line.split('*');
    const parsedLine = parts.map((part, partIdx) => {
      if (partIdx % 2 === 1) {
        return <span key={partIdx} className={italicClass}>{part}</span>;
      }
      return part;
    });
    return (
      <span key={lineIdx} className="block">
        {parsedLine}
      </span>
    );
  });
};

export default function CalculatorPage() {
  const [step, setStep] = useState(1);
  const [isCalculating, setIsCalculating] = useState(false);
  const [formData, setFormData] = useState({
    projectType: 'Residential',
    area: '',
    style: 'Premium',
    rooms: '2 BHK',
    name: '',
    email: '',
    budget: 'not-decided',
  });
  const [estimateData, setEstimateData] = useState<{
    total: number; baseRate: number; styleFactor: number; area: number;
  } | null>(null);
  const [calculatorData, setCalculatorData] = useState(DEFAULT_CALCULATOR);

  useEffect(() => {
    const fetchCalculatorContent = async () => {
      try {
        const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
        const res = await fetch(`${API_URL}/api/website-content`);
        const data = await res.json();
        if (data.success && data.data?.calculator) {
          setCalculatorData(data.data.calculator);
        }
      } catch (err) {
        console.error('Error fetching calculator content:', err);
      }
    };
    fetchCalculatorContent();
  }, []);

  const handleSelection = (name: string, value: string) =>
    setFormData(prev => ({ ...prev, [name]: value }));

  const next = () => setStep(p => p + 1);
  const back = () => setStep(p => p - 1);

  const calculateEstimate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    try {
      const area = parseInt(formData.area) || 0;
      let baseRate = 1000;
      if (formData.projectType === 'Commercial') baseRate = 1200;
      if (formData.projectType === 'Restaurant') baseRate = 1500;
      let styleFactor = 1.0;
      if (formData.style === 'Premium') styleFactor = 1.3;
      if (formData.style === 'Luxury') styleFactor = 1.65;
      const totalCost = area * baseRate * styleFactor;
      await new Promise(r => setTimeout(r, 1500));
      setEstimateData({ total: totalCost, baseRate, styleFactor, area });
      const API_URL = process.env?.NEXT_PUBLIC_API_URL || 'http://localhost:5006';
      fetch(`${API_URL}/api/estimate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: formData.name, email: formData.email,
          projectType: formData.projectType.toLowerCase(),
          builtUpArea: area, areaUnit: 'sqft',
          qualityLevel: formData.style.toLowerCase(),
          numberOfFloors: 1, features: [], city: '', location: '',
          customerBudget: formData.budget,
        }),
      }).catch(() => {});
      setStep(4);
    } finally {
      setIsCalculating(false);
    }
  };

  const formatINR = (n: number) =>
    new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(n);

  const reset = () => {
    setStep(1);
    setEstimateData(null);
    setFormData({ projectType: 'Residential', area: '', style: 'Premium', rooms: '2 BHK', name: '', email: '', budget: 'not-decided' });
  };

  return (
    <div className="min-h-screen bg-[#FAF9F5] font-sans">

      {/* ── PAGE HEADER ── */}
      <div className="bg-[#1C1917] pt-44 pb-0">
        <div className="max-w-[1400px] mx-auto px-8 lg:px-16">
          <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <div className="flex items-center gap-3 mb-5">
              <div className="w-5 h-[1px] bg-stone-700" />
              <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-400">{calculatorData.heroTag}</span>
            </div>
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-4 pb-10 border-b border-stone-800">
              <h1 className="font-serif font-bold text-white text-[clamp(2.2rem,4.5vw,3.8rem)] leading-tight">
                {renderDynamicText(calculatorData.heroHeading, "italic font-normal text-stone-500")}
              </h1>
              <p className="text-stone-400 text-sm font-light max-w-xs leading-relaxed">
                {calculatorData.heroDescription}
              </p>
            </div>

            {/* Step tabs */}
            <div className="flex">
              {['Project', 'Details', 'You'].map((label, i) => (
                <div
                  key={i}
                  className={`px-8 py-4 text-[9px] font-bold uppercase tracking-[0.3em] border-b-2 transition-all duration-300 ${
                    step === i + 1
                      ? 'border-white text-white'
                      : step > i + 1
                      ? 'border-stone-700 text-stone-400'
                      : 'border-transparent text-stone-500'
                  }`}
                >
                  {String(i + 1).padStart(2, '0')} {label}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── FORM AREA ── */}
      {step < 4 && (
        <div className="max-w-[850px] mx-auto px-6 py-16">
          <div className="bg-white border border-stone-200 shadow-[0_20px_50px_rgba(0,0,0,0.03)] p-8 md:p-12 lg:p-16">
            <form onSubmit={step === 3 ? calculateEstimate : e => { e.preventDefault(); next(); }}>
              <AnimatePresence mode="wait">

                {/* STEP 1 */}
                {step === 1 && (
                  <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                    <h2 className="font-serif font-bold text-[#1C1917] text-3xl mb-2">What type of project?</h2>
                    <p className="text-stone-500 text-sm font-light mb-10">Select your project category to get started.</p>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
                      {[
                        { id: 'Residential', Icon: Home, sub: 'Homes & villas' },
                        { id: 'Commercial', Icon: Building, sub: 'Offices & retail' },
                        { id: 'Restaurant', Icon: Utensils, sub: 'F&B & hospitality' },
                      ].map(({ id, Icon, sub }) => (
                        <button
                          key={id} type="button"
                          onClick={() => handleSelection('projectType', id)}
                          className={`group text-left p-7 border-2 transition-all duration-200 cursor-pointer ${
                            formData.projectType === id
                              ? 'border-[#1C1917] bg-[#1C1917] text-white'
                              : 'border-stone-200 bg-white hover:border-stone-400 text-[#1C1917]'
                          }`}
                        >
                          <Icon className={`w-6 h-6 mb-4 ${formData.projectType === id ? 'text-stone-400' : 'text-stone-400 group-hover:text-stone-600'}`} strokeWidth={1.5} />
                          <div className={`font-serif font-bold text-lg mb-1`}>{id}</div>
                          <div className={`text-[10px] font-light ${formData.projectType === id ? 'text-stone-400' : 'text-stone-500'}`}>{sub}</div>
                        </button>
                      ))}
                    </div>

                    <div className="mb-10 max-w-md">
                      <label className="block text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-3">Carpet Area (sq. ft.)</label>
                      <input
                        type="number" name="area" value={formData.area}
                        onChange={e => setFormData(p => ({ ...p, area: e.target.value }))}
                        required min="100" placeholder="e.g. 1500"
                        className="w-full border-b-2 border-stone-200 focus:border-[#1C1917] py-3 bg-transparent outline-none text-3xl font-serif text-[#1C1917] placeholder:text-stone-400 transition-colors"
                      />
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 */}
                {step === 2 && (
                  <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                    <h2 className="font-serif font-bold text-[#1C1917] text-3xl mb-2">Desired finish level?</h2>
                    <p className="text-stone-500 text-sm font-light mb-10">Choose the quality tier for your project.</p>

                    <div className="space-y-3 mb-12">
                      {[
                        { id: 'Standard', rate: '₹1,000/sqft', desc: 'Durable & cost-effective materials' },
                        { id: 'Premium', rate: '₹1,300/sqft', desc: 'Branded fittings & custom finishes' },
                        { id: 'Luxury', rate: '₹1,650/sqft', desc: 'Imported materials & bespoke detailing' },
                      ].map(opt => (
                        <div
                          key={opt.id}
                          onClick={() => handleSelection('style', opt.id)}
                          className={`flex items-center justify-between px-7 py-5 border-2 cursor-pointer transition-all duration-200 ${
                            formData.style === opt.id
                              ? 'border-[#1C1917] bg-[#FAF9F5]'
                              : 'border-stone-200 bg-white hover:border-stone-300'
                          }`}
                        >
                          <div className="flex items-center gap-5">
                            <div className={`w-4 h-4 border-2 rounded-full flex items-center justify-center ${formData.style === opt.id ? 'border-[#1C1917]' : 'border-stone-300'}`}>
                              {formData.style === opt.id && <div className="w-2 h-2 bg-[#1C1917] rounded-full" />}
                            </div>
                            <div>
                              <div className="font-serif font-bold text-[#1C1917] text-lg">{opt.id}</div>
                              <div className="text-xs text-stone-500 font-light">{opt.desc}</div>
                            </div>
                          </div>
                          <div className="text-sm font-mono text-stone-600 font-medium">{opt.rate}</div>
                        </div>
                      ))}
                    </div>

                    {formData.projectType === 'Residential' && (
                      <div className="max-w-md">
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-3">Configuration</label>
                        <select
                          name="rooms" value={formData.rooms}
                          onChange={e => setFormData(p => ({ ...p, rooms: e.target.value }))}
                          className="w-full border-b-2 border-stone-200 focus:border-[#1C1917] py-3 bg-transparent outline-none text-lg font-serif text-[#1C1917] transition-colors"
                        >
                          {['1 BHK', '2 BHK', '3 BHK', '4+ BHK / Villa'].map(r => <option key={r} className="text-[#1C1917]">{r}</option>)}
                        </select>
                      </div>
                    )}
                  </motion.div>
                )}

                {/* STEP 3 */}
                {step === 3 && (
                  <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.35 }}>
                    <h2 className="font-serif font-bold text-[#1C1917] text-3xl mb-2">Where should we send this?</h2>
                    <p className="text-stone-500 text-sm font-light mb-10">Your estimate will be sent to your email instantly.</p>

                    <div className="grid sm:grid-cols-2 gap-10 mb-10">
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-3">Full Name</label>
                        <input
                          type="text" required value={formData.name}
                          onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                          placeholder="Rahul Sharma"
                          className="w-full border-b-2 border-stone-200 focus:border-[#1C1917] py-3 bg-transparent outline-none text-2xl font-serif text-[#1C1917] placeholder:text-stone-400 transition-colors"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] uppercase tracking-[0.25em] text-stone-500 font-bold mb-3">Email Address</label>
                        <input
                          type="email" required value={formData.email}
                          onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                          placeholder="rahul@example.com"
                          className="w-full border-b-2 border-stone-200 focus:border-[#1C1917] py-3 bg-transparent outline-none text-2xl font-serif text-[#1C1917] placeholder:text-stone-400 transition-colors"
                        />
                      </div>
                    </div>

                    {/* Summary */}
                    <div className="bg-[#FAF9F5] border border-stone-200 p-6 grid grid-cols-3 gap-6">
                      {[
                        ['Project', formData.projectType],
                        ['Area', `${formData.area} sq.ft.`],
                        ['Finish', formData.style],
                      ].map(([k, v]) => (
                        <div key={k}>
                          <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 font-bold mb-1">{k}</div>
                          <div className="font-serif font-bold text-[#1C1917]">{v}</div>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

              </AnimatePresence>

              {/* Nav buttons */}
              <div className="flex items-center justify-between mt-12 pt-8 border-t border-stone-200">
                {step > 1 ? (
                  <button type="button" onClick={back} className="flex items-center gap-2 text-[10px] uppercase tracking-[0.2em] font-bold text-stone-500 hover:text-[#1C1917] transition-colors cursor-pointer">
                    <ChevronLeft className="w-4 h-4" /> Back
                  </button>
                ) : <div />}
                <button
                  type="submit"
                  disabled={isCalculating || (step === 1 && !formData.area)}
                  className="flex items-center gap-3 px-8 py-4 bg-[#1C1917] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors disabled:opacity-40 cursor-pointer"
                >
                  {isCalculating
                    ? <><Loader2 className="w-4 h-4 animate-spin" /> Processing…</>
                    : step === 3
                    ? <>Reveal Estimate <ChevronRight className="w-4 h-4" /></>
                    : <>Next Step <ChevronRight className="w-4 h-4" /></>
                  }
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ── RESULT ── */}
      {step === 4 && estimateData && (
        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          className="max-w-[850px] mx-auto px-6 py-16"
        >
          {/* Big result card */}
          <div className="bg-[#1C1917] p-10 lg:p-16 mb-6 shadow-xl">
            <p className="text-[10px] uppercase tracking-[0.3em] text-stone-400 font-bold mb-6">
              {formData.name.split(' ')[0]}'s Estimate · {formData.projectType} · {formData.area} sq.ft. · {formData.style}
            </p>
            <p className="text-stone-400 text-xs uppercase tracking-[0.2em] mb-3">Estimated Investment Range</p>
            <div className="font-serif font-bold text-white text-[clamp(2.5rem,6vw,5rem)] leading-none mb-2">
              {formatINR(estimateData.total * 0.9)}
            </div>
            <div className="font-serif text-stone-400 text-[clamp(1.5rem,3.5vw,3rem)] leading-none mb-10">
              — {formatINR(estimateData.total * 1.1)}
            </div>
            <div className="flex flex-wrap gap-8 border-t border-stone-800 pt-8">
              {[
                ['Base Rate', `₹${estimateData.baseRate}/sq.ft`],
                ['Style Multiplier', `×${estimateData.styleFactor}`],
                ['Total Area', `${estimateData.area} sq.ft`],
              ].map(([k, v]) => (
                <div key={k} className="border-l border-stone-800 pl-6">
                  <div className="text-[10px] uppercase tracking-[0.2em] text-stone-500 mb-1">{k}</div>
                  <div className="text-stone-300 font-mono">{v}</div>
                </div>
              ))}
            </div>
          </div>

          {/* CTA + Reset */}
          <div className="bg-white border border-stone-200 shadow-sm p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            <div>
              <h3 className="font-serif font-bold text-[#1C1917] text-xl mb-1">Ready to move forward?</h3>
              <p className="text-stone-500 text-sm font-light">Talk to our team and turn this estimate into a real plan.</p>
            </div>
            <div className="flex gap-3 flex-shrink-0">
              <Link href="/contact" className="flex items-center gap-2 px-7 py-3 bg-[#1C1917] text-white text-[10px] font-bold uppercase tracking-[0.2em] hover:bg-stone-800 transition-colors">
                Start a Project <ArrowUpRight className="w-3.5 h-3.5" />
              </Link>
              <button onClick={reset} className="flex items-center gap-2 px-6 py-3 border border-stone-200 text-[10px] font-bold uppercase tracking-[0.2em] text-stone-500 hover:text-[#1C1917] hover:border-stone-400 transition-colors cursor-pointer">
                <RotateCcw className="w-3.5 h-3.5" /> Recalculate
              </button>
            </div>
          </div>
        </motion.div>
      )}

    </div>
  );
}