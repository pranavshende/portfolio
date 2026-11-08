import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Building, Mail, User, FileText, HelpCircle, Paperclip } from 'lucide-react';
import { api, ContactPayload } from '@/lib/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_TYPES = [
  { label: 'Job Opportunity', value: 'JOB_OPPORTUNITY' },
  { label: 'Internship', value: 'INTERNSHIP' },
  { label: 'Freelance Project', value: 'FREELANCE' },
  { label: 'Collaboration', value: 'COLLABORATION' },
  { label: 'Technical Discussion', value: 'TECH_DISCUSSION' },
  { label: 'General Inquiry', value: 'GENERAL' },
  { label: 'Other', value: 'OTHER' },
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    company: '',
    subject: '',
    inquiryType: 'JOB_OPPORTUNITY',
    message: '',
    attachmentUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Lock body scroll when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
    if (error) setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.subject.trim() || !formData.message.trim()) {
      setError('Please fill in all required fields (Name, Email, Subject, and Message).');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      await api.submitContact(formData);
      try {
        localStorage.setItem('portfolio_visitor_name', formData.name.trim());
      } catch {}
      setSuccess(true);
    } catch (err: any) {
      console.error('Contact submission error:', err);
      setError(
        err.message || 'Failed to deliver message. Please check your network or email directly at pranavshende97@gmail.com'
      );
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setFormData({
      name: '',
      email: '',
      company: '',
      subject: '',
      inquiryType: 'JOB_OPPORTUNITY',
      message: '',
      attachmentUrl: '',
    });
    setSuccess(false);
    setError(null);
    onClose();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center p-3 sm:p-6 bg-black/75 backdrop-blur-sm select-auto">
          {/* Backdrop Click to Close */}
          <div 
            className="absolute inset-0 bg-transparent"
            onClick={handleReset}
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-lg max-h-[90dvh] flex flex-col bg-[#faf7f0] dark:bg-[#15161c] rounded-3xl border-2 border-stone-900 dark:border-stone-700 shadow-[6px_6px_0px_#1c1917] dark:shadow-[6px_6px_0px_#000000] overflow-hidden"
          >
            {/* Modal Header */}
            <div className="p-4 sm:p-6 pb-2 sm:pb-3 flex items-start justify-between border-b-2 border-stone-900/15 dark:border-stone-800 shrink-0 bg-[#faf7f0]/95 dark:bg-[#15161c]/95 backdrop-blur-xs">
              <div className="space-y-1 pr-4">
                <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-xs text-[10px] font-serif font-bold text-[#8b2323] bg-[#8b2323]/5 border border-[#8b2323] tracking-wider shadow-[1px_1px_0px_#1c1917]">
                  <span>[連絡]</span>
                  <span>Direct Communication</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
                  Get in Touch
                </h2>
                <p className="text-xs text-stone-600 dark:text-stone-400 leading-snug">
                  Send a message directly to Pranav. You'll receive an automated confirmation email immediately.
                </p>
              </div>

              {/* Close Button */}
              <button
                type="button"
                onClick={handleReset}
                className="p-1.5 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer shrink-0"
                aria-label="Close modal"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body with Smooth Scrolling */}
            <div className="overflow-y-auto p-4 sm:p-6 pt-3 space-y-4 flex-1 overscroll-contain">
              {success ? (
                <div className="text-center py-6 sm:py-8 space-y-4">
                  <div className="w-14 h-14 sm:w-16 sm:h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] flex items-center justify-center text-emerald-700 dark:text-emerald-400">
                    <CheckCircle2 className="w-8 h-8 sm:w-9 sm:h-9" />
                  </div>
                  <h3 className="text-xl sm:text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                    Message Dispatched!
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                    Thank you, <span className="font-semibold text-stone-900 dark:text-stone-100">{formData.name}</span>! Your inquiry has been sent to Pranav.
                  </p>
                  <div className="p-3.5 sm:p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] text-xs text-amber-900 dark:text-amber-200 space-y-1">
                    <p className="font-semibold flex items-center justify-center gap-1.5">
                      <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                      Automated Confirmation Sent
                    </p>
                    <p className="text-[11px] opacity-90 leading-relaxed">
                      We sent an acknowledgment receipt to <span className="font-mono font-medium">{formData.email}</span>. Pranav typically responds within 24 hours.
                    </p>
                  </div>
                  <div className="pt-2">
                    <button
                      type="button"
                      onClick={handleReset}
                      className="px-6 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all cursor-pointer"
                    >
                      Done
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  {error && (
                    <div className="flex items-start gap-2.5 p-3 rounded-2xl bg-red-50 dark:bg-red-950/40 border-2 border-stone-900 shadow-[2px_2px_0px_#1c1917] text-red-700 dark:text-red-300 text-xs animate-in fade-in">
                      <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                      <p className="leading-relaxed">{error}</p>
                    </div>
                  )}

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-3.5 text-xs sm:text-sm">
                    {/* Name & Email Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                          Full Name <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <User className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                          <input
                            type="text"
                            name="name"
                            required
                            value={formData.name}
                            onChange={handleChange}
                            placeholder="e.g. John Doe"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                          Email Address <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Mail className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="xyz@gmail.com"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Company & Inquiry Type Row */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                          Company / Organization <span className="text-stone-400 font-normal">(Optional)</span>
                        </label>
                        <div className="relative">
                          <Building className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                          <input
                            type="text"
                            name="company"
                            value={formData.company}
                            onChange={handleChange}
                            placeholder="Company or Team"
                            className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm"
                          />
                        </div>
                      </div>

                      <div className="space-y-1">
                        <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                          Inquiry Type <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <HelpCircle className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                          <select
                            name="inquiryType"
                            value={formData.inquiryType}
                            onChange={handleChange}
                            className="w-full pl-9 pr-8 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 focus:outline-hidden text-xs sm:text-sm appearance-none cursor-pointer shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000]"
                          >
                            {INQUIRY_TYPES.map((type) => (
                              <option key={type.value} value={type.value}>
                                {type.label}
                              </option>
                            ))}
                          </select>
                        </div>
                      </div>
                    </div>

                    {/* Subject */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                        Subject <span className="text-red-500">*</span>
                      </label>
                      <div className="relative">
                        <FileText className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                        <input
                          type="text"
                          name="subject"
                          required
                          value={formData.subject}
                          onChange={handleChange}
                          placeholder="Project, Opportunity, or Question"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Message Body */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="Tell me about your project, timeline, or inquiry..."
                        className="w-full p-3 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm resize-y min-h-[75px]"
                      />
                    </div>

                    {/* Attachment / Link (Optional) */}
                    <div className="space-y-1">
                      <label className="block text-xs font-bold text-stone-800 dark:text-stone-200">
                        Attachment or Link <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Paperclip className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                        <input
                          type="url"
                          name="attachmentUrl"
                          value={formData.attachmentUrl}
                          onChange={handleChange}
                          placeholder="https://drive.google.com/... or github.com/..."
                          className="w-full pl-9 pr-3 py-2 rounded-xl border-2 border-stone-900 dark:border-stone-700 bg-white dark:bg-stone-800 text-stone-900 dark:text-stone-100 placeholder:text-stone-400 shadow-[2px_2px_0px_#1c1917] dark:shadow-[2px_2px_0px_#000000] focus:outline-hidden text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    {/* Submit Button Row with Safe Bottom Clearance */}
                    <div className="pt-2 pb-3 flex flex-col sm:flex-row items-center justify-between gap-3 border-t-2 border-stone-900/15 dark:border-stone-800">
                      <span className="text-[10px] font-mono font-bold text-stone-600 dark:text-stone-400 text-center sm:text-left order-2 sm:order-1">
                        🔒 Rate-limited & spam protected
                      </span>
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-bold border-2 border-stone-900 shadow-[2.5px_2.5px_0px_#1c1917] hover:shadow-[1px_1px_0px_#1c1917] hover:translate-x-[1px] hover:translate-y-[1px] transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer order-1 sm:order-2"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Dispatching...</span>
                          </>
                        ) : (
                          <>
                            <Send className="w-4 h-4" />
                            <span>Send Inquiry</span>
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  if (typeof document !== 'undefined') {
    return createPortal(modalContent, document.body);
  }
  return modalContent;
};

export default ContactModal;
