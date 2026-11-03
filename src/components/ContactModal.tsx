import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, CheckCircle2, AlertCircle, Loader2, Sparkles, Building, Mail, User, FileText, HelpCircle, Paperclip } from 'lucide-react';
import { api, ContactPayload } from '@/lib/api';

interface ContactModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const INQUIRY_TYPES = [
  'Job Opportunity',
  'Internship',
  'Freelance Project',
  'Collaboration',
  'Technical Discussion',
  'General Inquiry',
  'Other',
];

export const ContactModal: React.FC<ContactModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState<ContactPayload>({
    name: '',
    email: '',
    company: '',
    subject: '',
    inquiryType: 'Job Opportunity',
    message: '',
    attachmentUrl: '',
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      inquiryType: 'Job Opportunity',
      message: '',
      attachmentUrl: '',
    });
    setSuccess(false);
    setError(null);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-xs select-auto">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 15 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 15 }}
            transition={{ duration: 0.22, ease: 'easeOut' }}
            className="relative w-full max-w-xl max-h-[92vh] overflow-y-auto bg-[#faf6f0] dark:bg-[#16171c] rounded-3xl border border-stone-800/20 dark:border-stone-700/60 shadow-2xl p-6 sm:p-8 space-y-5"
          >
            {/* Close Button */}
            <button
              type="button"
              onClick={handleReset}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-500 hover:text-stone-900 dark:hover:text-white hover:bg-stone-200/60 dark:hover:bg-stone-800 transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            {success ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-emerald-100 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-700 flex items-center justify-center text-emerald-600 dark:text-emerald-400">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900 dark:text-stone-100">
                  Message Dispatched!
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-300 max-w-md mx-auto leading-relaxed">
                  Thank you, <span className="font-semibold">{formData.name}</span>! Your inquiry has been sent to Pranav.
                </p>
                <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200/80 dark:border-amber-900/40 text-xs text-amber-900 dark:text-amber-200 space-y-1">
                  <p className="font-semibold flex items-center justify-center gap-1.5">
                    <Sparkles className="w-4 h-4 text-amber-600 dark:text-amber-400" />
                    Automated Confirmation Sent
                  </p>
                  <p className="text-[11px] opacity-90">
                    We just sent an acknowledgment receipt to <span className="font-mono font-medium">{formData.email}</span>. Pranav typically responds within 24 hours.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="px-6 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-sm font-semibold transition-all shadow-xs"
                  >
                    Done
                  </button>
                </div>
              </div>
            ) : (
              <>
                {/* Header */}
                <div className="space-y-1.5 pr-8">
                  <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full text-xs font-mono font-medium text-[#8b2323] bg-[#8b2323]/10 border border-[#8b2323]/25">
                    <span>⛩</span>
                    <span>Direct Communication</span>
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-bold font-serif text-stone-900 dark:text-stone-100 tracking-tight">
                    Get in Touch
                  </h2>
                  <p className="text-xs sm:text-sm text-stone-600 dark:text-stone-400">
                    Send a message directly to Pranav. You'll instantly receive an automated confirmation email acknowledging receipt.
                  </p>
                </div>

                {error && (
                  <div className="flex items-start gap-2.5 p-3.5 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900/60 text-red-700 dark:text-red-300 text-xs">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5 text-red-600" />
                    <p className="leading-relaxed">{error}</p>
                  </div>
                )}

                {/* Form */}
                <form onSubmit={handleSubmit} className="space-y-4 pt-1 text-xs sm:text-sm">
                  {/* Name & Email Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
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
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
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
                          placeholder="you@domain.com"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Company & Inquiry Type Row */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                        Company / Organization <span className="text-stone-400 font-normal">(Optional)</span>
                      </label>
                      <div className="relative">
                        <Building className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                        <input
                          type="text"
                          name="company"
                          value={formData.company}
                          onChange={handleChange}
                          placeholder="Company, University or Team"
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                        Inquiry Type
                      </label>
                      <div className="relative">
                        <HelpCircle className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                        <select
                          name="inquiryType"
                          value={formData.inquiryType}
                          onChange={handleChange}
                          className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm appearance-none cursor-pointer"
                        >
                          {INQUIRY_TYPES.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Subject */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
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
                        placeholder="Brief summary of your opportunity or inquiry"
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Share project requirements, team details, role description, or questions..."
                      className="w-full p-3 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm resize-none"
                    />
                  </div>

                  {/* Attachment / Link (Optional) */}
                  <div className="space-y-1.5">
                    <label className="block text-xs font-bold text-stone-700 dark:text-stone-300">
                      Attachment or Reference Link <span className="text-stone-400 font-normal">(Optional)</span>
                    </label>
                    <div className="relative">
                      <Paperclip className="w-4 h-4 absolute left-3 top-2.5 text-stone-400 pointer-events-none" />
                      <input
                        type="url"
                        name="attachmentUrl"
                        value={formData.attachmentUrl}
                        onChange={handleChange}
                        placeholder="https://drive.google.com/... or https://github.com/..."
                        className="w-full pl-9 pr-3 py-2 rounded-xl border border-stone-300/80 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 placeholder:text-stone-400 focus:outline-hidden focus:ring-2 focus:ring-[#8b2323]/40 text-xs sm:text-sm"
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="pt-2 flex items-center justify-between">
                    <span className="text-[11px] text-stone-500 dark:text-stone-400">
                      Protected by rate limiting & spam prevention.
                    </span>
                    <button
                      type="submit"
                      disabled={loading}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#8b2323] hover:bg-[#721c1c] text-white text-xs sm:text-sm font-semibold transition-all shadow-xs disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer active:scale-95"
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
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ContactModal;
