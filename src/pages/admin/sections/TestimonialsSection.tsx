import React, { useState, useEffect } from 'react';
import { Check, X, Star, Trash2, MessageSquareQuote, Loader2 } from 'lucide-react';
import { api } from '@/lib/api';

export const TestimonialsSection: React.FC = () => {
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchTestimonials = () => {
    setLoading(true);
    api.getContent('testimonials')
      .then((res: any) => {
        if (res && res.data) setTestimonials(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const handleModerate = async (id: string, isApproved: boolean) => {
    try {
      await api.moderateTestimonial(id, { isApproved });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isApproved } : t))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update testimonial status.');
    }
  };

  const handleToggleFeatured = async (id: string, isFeatured: boolean) => {
    try {
      await api.moderateTestimonial(id, { isFeatured });
      setTestimonials((prev) =>
        prev.map((t) => (t.id === id ? { ...t, isFeatured } : t))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to toggle featured status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this testimonial?')) return;
    try {
      await api.deleteTestimonial(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete testimonial.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
          Testimonials Moderation
        </h2>
        <p className="text-xs text-stone-500">
          Review peer endorsements and client recommendations before publishing them publicly.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading testimonials...</p>
          </div>
        ) : testimonials.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <MessageSquareQuote className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Testimonials Submitted</h4>
            <p className="text-xs text-stone-400">Visitor recommendations will appear here for your moderation.</p>
          </div>
        ) : (
          <div className="divide-y divide-stone-100 dark:divide-stone-800">
            {testimonials.map((t) => (
              <div key={t.id} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 hover:bg-stone-50/60 dark:hover:bg-stone-900/40 transition-colors">
                <div className="space-y-1.5 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-sm text-stone-900 dark:text-stone-100">
                      {t.authorName}
                    </span>
                    <span className="text-xs text-stone-500">
                      {t.role} {t.company ? `@ ${t.company}` : ''}
                    </span>
                    <div className="flex items-center gap-0.5 text-amber-500">
                      {Array.from({ length: t.rating || 5 }).map((_, i) => (
                        <Star key={i} className="w-3 h-3 fill-current" />
                      ))}
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-stone-700 dark:text-stone-300 italic">
                    "{t.content}"
                  </p>

                  <div className="flex items-center gap-2 pt-1">
                    <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                      t.isApproved
                        ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300'
                        : 'bg-amber-100 text-amber-700 dark:bg-amber-950/60 dark:text-amber-300'
                    }`}>
                      {t.isApproved ? 'Approved & Public' : 'Pending Review'}
                    </span>
                    {t.isFeatured && (
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300">
                        Featured
                      </span>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    type="button"
                    onClick={() => handleModerate(t.id, !t.isApproved)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1 transition-colors ${
                      t.isApproved
                        ? 'bg-stone-100 dark:bg-stone-800 text-stone-700 hover:bg-stone-200'
                        : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                    }`}
                  >
                    {t.isApproved ? <X className="w-3.5 h-3.5" /> : <Check className="w-3.5 h-3.5" />}
                    <span>{t.isApproved ? 'Unpublish' : 'Approve'}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleToggleFeatured(t.id, !t.isFeatured)}
                    className={`p-2 rounded-xl transition-colors ${
                      t.isFeatured ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30' : 'text-stone-400 hover:text-amber-500'
                    }`}
                    title="Toggle featured testimonial"
                  >
                    <Star className="w-4 h-4 fill-current" />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDelete(t.id)}
                    className="p-2 rounded-xl hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestimonialsSection;
