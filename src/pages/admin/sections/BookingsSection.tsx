import React, { useState, useEffect } from 'react';
import { Calendar, Clock, User, Mail, Trash2, CheckCircle2, Loader2, X } from 'lucide-react';
import { api } from '@/lib/api';

export const BookingsSection: React.FC = () => {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchBookings = () => {
    setLoading(true);
    api.getBookings()
      .then((res: any) => {
        if (res && res.data) setBookings(res.data);
        else if (Array.isArray(res)) setBookings(res);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await api.updateBooking(id, { status });
      setBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err: any) {
      alert(err.message || 'Failed to update booking status.');
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this booking request?')) return;
    try {
      await api.deleteBooking(id);
      setBookings((prev) => prev.filter((b) => b.id !== id));
    } catch (err: any) {
      alert(err.message || 'Failed to delete booking.');
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
          Meeting Requests & Bookings
        </h2>
        <p className="text-xs text-stone-500">
          Review incoming requests for technical discussions, mentorship, or interview calls.
        </p>
      </div>

      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Loading meeting requests...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Calendar className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Booking Requests</h4>
            <p className="text-xs text-stone-400">Scheduled calls and mentorship bookings will appear here.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Visitor</th>
                  <th className="py-3 px-4">Type</th>
                  <th className="py-3 px-4">Requested Date & Time</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {bookings.map((b) => (
                  <tr key={b.id} className="hover:bg-stone-50/70 dark:hover:bg-stone-900/50 transition-colors">
                    <td className="py-3 px-4">
                      <div className="font-medium text-stone-900 dark:text-stone-100">{b.name}</div>
                      <div className="text-[11px] text-stone-500 font-mono">{b.email}</div>
                    </td>
                    <td className="py-3 px-4 font-semibold text-stone-700 dark:text-stone-300">
                      {b.meetingType}
                    </td>
                    <td className="py-3 px-4 font-mono text-stone-600 dark:text-stone-400">
                      {new Date(b.requestedDate).toLocaleDateString()} {b.timeSlot ? `• ${b.timeSlot}` : ''}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={b.status}
                        onChange={(e) => handleStatusChange(b.id, e.target.value)}
                        className="py-1 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-xs font-semibold"
                      >
                        <option value="PENDING">PENDING</option>
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="RESCHEDULED">RESCHEDULED</option>
                        <option value="CANCELLED">CANCELLED</option>
                        <option value="COMPLETED">COMPLETED</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleDelete(b.id)}
                        className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookingsSection;
