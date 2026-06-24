'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, Loader2 } from 'lucide-react';

interface EnquiryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryModal({ isOpen, onClose }: EnquiryModalProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: 'residential', 
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (!isOpen) return;

    const originalOverflow = document.body.style.overflow;
    const originalPaddingRight = document.body.style.paddingRight;
    const scrollBarGap = window.innerWidth - document.documentElement.clientWidth;

    if (scrollBarGap > 0) {
      document.body.style.paddingRight = `${scrollBarGap}px`;
    }
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalOverflow;
      document.body.style.paddingRight = originalPaddingRight;
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: 'Website Enquiry',
          message: formData.message,
          projectType: formData.projectType,
          budget: 'not-sure'
        })
      });

      const data = await response.json(); 

      if (response.ok && data.success) {
        setSubmitted(true);

        setTimeout(() => {
          onClose();
          setSubmitted(false);
          setFormData({
            name: '',
            email: '',
            phone: '',
            projectType: 'residential', 
            message: ''
          });
        }, 2500);
      } else {
        console.error('API Error:', data.message);
        alert(data.message || 'Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting enquiry:', error);
      alert('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Minimalist input styling
  const inputClass = "w-full border-b border-stone-200 bg-transparent text-[#1C1917] font-serif text-base py-2.5 focus:outline-none focus:border-stone-600 transition-colors placeholder-[#878076]/30 rounded-none";
  const selectClass = `${inputClass} appearance-none cursor-pointer`;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 sm:p-6">
          
          {/* Blur Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-stone-950/40 backdrop-blur-sm"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-[550px] bg-[#FAF9F5] shadow-[0_25px_60px_rgba(28,25,23,0.12)] border border-stone-200 rounded-sm overflow-hidden p-6 sm:p-10"
            style={{ maxHeight: 'calc(100vh - 2rem)' }}
          >
            
            {/* Close Button */}
            <button 
              onClick={onClose} 
              className="absolute top-4 right-4 z-50 p-2 text-[#1C1917] hover:text-[#FAF9F5] hover:bg-[#1C1917] transition-all bg-[#FAF9F5] rounded-full border border-stone-200 shadow-sm"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Scrollable interior */}
            <div className="overflow-y-auto max-h-[calc(100vh-6rem)] pr-1 custom-scrollbar">
              
              {/* Header */}
              <div className="flex flex-col items-center text-center mt-2 mb-8">
                <img 
                  src="/logo-dvl.png" 
                  alt="DVL Architects Logo" 
                  className="h-12 w-12 object-cover rounded-full border border-stone-200 shadow-sm mb-4"
                />
                <span className="text-[9px] font-bold uppercase tracking-[0.4em] text-stone-500 mb-2">Enquiry Form</span>
                <h3 className="text-3xl font-serif text-[#1C1917] font-semibold tracking-tight">
                  Initiate Dialogue
                </h3>
                <p className="text-[#57534E] text-xs font-light mt-3 max-w-sm leading-relaxed">
                  Provide a few details below, and our principal architects will be in touch shortly to discuss your project.
                </p>
              </div>

              {!submitted ? (
                <form onSubmit={handleSubmit} className="space-y-5">
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-[8px] uppercase tracking-[0.2em] text-[#878076] mb-1 font-bold">Full Name</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        placeholder="John Doe"
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label className="block text-[8px] uppercase tracking-[0.2em] text-[#878076] mb-1 font-bold">Phone (Optional)</label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 XXXX XXXXX"
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#878076] mb-1 font-bold">Email Address</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      placeholder="john@example.com"
                      className={inputClass}
                    />
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#878076] mb-1 font-bold">Project Type</label>
                    <select name="projectType" value={formData.projectType} onChange={handleInputChange} className={selectClass}>
                      <option value="residential">Residential Space</option>
                      <option value="commercial">Commercial Space</option>
                      <option value="renovation">Renovation</option>
                      <option value="interior">Interior Design Only</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-[8px] uppercase tracking-[0.2em] text-[#878076] mb-1 font-bold">Project Brief</label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows={3}
                      required
                      placeholder="Tell us a bit about your project requirements..."
                      className={`${inputClass} resize-none`}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-6 bg-[#1C1917] hover:bg-stone-800 text-[#FAF9F5] py-4 font-bold uppercase tracking-[0.3em] text-[10px] transition-all duration-300 disabled:opacity-70 flex items-center justify-center gap-3 shadow-sm rounded-sm"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      <>
                        Send Enquiry
                        <Send className="w-3.5 h-3.5" />
                      </>
                    )}
                  </button>
                </form>
              ) : (
                /* Success State */
                <div className="flex flex-col items-center justify-center py-10 text-center">
                  <motion.div 
                    initial={{ scale: 0 }} 
                    animate={{ scale: 1 }} 
                    className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mb-6 border border-stone-200"
                  >
                    <CheckCircle2 className="w-8 h-8 text-stone-700" strokeWidth={1.5} />
                  </motion.div>
                  <h4 className="text-2xl font-serif text-[#1C1917] mb-3">Inquiry Received</h4>
                  <p className="text-[#57534E] text-xs font-light max-w-xs mx-auto leading-relaxed">
                    Thank you for reaching out. A principal architect will review your details and contact you shortly.
                  </p>
                </div>
              )}
            </div>
            
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}