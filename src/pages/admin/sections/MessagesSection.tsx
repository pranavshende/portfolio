import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Mail, Trash2, Download, Eye, CheckCircle2, 
  Clock, Archive, AlertCircle, Loader2, X, FileText, Send 
} from 'lucide-react';
import { api } from '@/lib/api';

const STATUS_OPTIONS = ['ALL', 'NEW', 'CONTACTED', 'IN_PROGRESS', 'RESOLVED', 'ARCHIVED'];
const TYPE_OPTIONS = [
  'ALL',
  'Job Opportunity',
  'Internship',
  'Freelance Project',
  'Collaboration',
  'Technical Discussion',
  'General Inquiry',
  'Other',
];

export const MessagesSection: React.FC = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('ALL');
  const [typeFilter, setTypeFilter] = useState('ALL');
  const [selectedMessage, setSelectedMessage] = useState<any | null>(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [savingNotes, setSavingNotes] = useState(false);
  const [actionError, setActionError] = useState<string | null>(null);

  const fetchMessages = () => {
    setLoading(true);
    api.getInquiries({
      search: search || undefined,
      status: statusFilter !== 'ALL' ? statusFilter : undefined,
      inquiryType: typeFilter !== 'ALL' ? typeFilter : undefined,
    })
      .then((res: any) => {
        if (res && res.data) {
          setMessages(res.data);
        } else if (Array.isArray(res)) {
          setMessages(res);
        }
      })
      .catch((err) => {
        console.error('Error fetching inquiries:', err);
        setActionError('Failed to fetch contact inquiries. Ensure backend is running.');
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchMessages();
  }, [statusFilter, typeFilter]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchMessages();
  };

  const handleOpenMessage = (msg: any) => {
    setSelectedMessage(msg);
    setAdminNotes(msg.adminNotes || '');
    if (!msg.isRead) {
      api.updateInquiry(msg.id, { isRead: true })
        .then(() => {
          setMessages((prev) =>
            prev.map((m) => (m.id === msg.id ? { ...m, isRead: true } : m))
          );
        })
        .catch(() => {});
    }
  };

  const handleStatusChange = async (msgId: string, newStatus: string) => {
    try {
      await api.updateInquiry(msgId, { status: newStatus });
      setMessages((prev) =>
        prev.map((m) => (m.id === msgId ? { ...m, status: newStatus } : m))
      );
      if (selectedMessage && selectedMessage.id === msgId) {
        setSelectedMessage((prev: any) => ({ ...prev, status: newStatus }));
      }
    } catch (err: any) {
      alert(err.message || 'Failed to update message status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedMessage) return;
    setSavingNotes(true);
    try {
      await api.updateInquiry(selectedMessage.id, { adminNotes });
      setMessages((prev) =>
        prev.map((m) =>
          m.id === selectedMessage.id ? { ...m, adminNotes } : m
        )
      );
      setSelectedMessage((prev: any) => ({ ...prev, adminNotes }));
      alert('Internal note saved successfully.');
    } catch (err: any) {
      alert(err.message || 'Failed to save admin note.');
    } finally {
      setSavingNotes(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    try {
      await api.deleteInquiry(id);
      setMessages((prev) => prev.filter((m) => m.id !== id));
      if (selectedMessage && selectedMessage.id === id) {
        setSelectedMessage(null);
      }
    } catch (err: any) {
      alert(err.message || 'Failed to delete inquiry.');
    }
  };

  const handleExportCSV = () => {
    if (messages.length === 0) {
      alert('No messages to export.');
      return;
    }
    const headers = ['Inquiry ID', 'Date', 'Full Name', 'Email', 'Company', 'Inquiry Type', 'Subject', 'Message', 'Status', 'Admin Notes'];
    const rows = messages.map((m) => [
      `"${m.id}"`,
      `"${new Date(m.createdAt).toISOString()}"`,
      `"${(m.name || '').replace(/"/g, '""')}"`,
      `"${(m.email || '').replace(/"/g, '""')}"`,
      `"${(m.company || '').replace(/"/g, '""')}"`,
      `"${m.inquiryType}"`,
      `"${(m.subject || '').replace(/"/g, '""')}"`,
      `"${(m.message || '').replace(/"/g, '""')}"`,
      `"${m.status}"`,
      `"${(m.adminNotes || '').replace(/"/g, '""')}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `pranav_inquiries_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
            Messages & Inquiries
          </h2>
          <p className="text-xs text-stone-500">
            Track inquiries received from portfolio visitors, manage review workflows & export records.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-stone-100 dark:bg-stone-800 hover:bg-stone-200 text-stone-800 dark:text-stone-200 text-xs font-semibold transition-colors cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs flex flex-wrap items-center justify-between gap-3 text-xs">
        <form onSubmit={handleSearchSubmit} className="relative flex-1 min-w-[200px] max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-stone-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by name, email, or subject..."
            className="w-full pl-9 pr-3 py-1.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1d1f27] text-stone-900 dark:text-stone-100 text-xs"
          />
        </form>

        <div className="flex items-center gap-3">
          {/* Status Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium">Status:</span>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="py-1 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-stone-800 dark:text-stone-200 text-xs font-medium"
            >
              {STATUS_OPTIONS.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          {/* Type Filter */}
          <div className="flex items-center gap-1.5">
            <span className="text-stone-500 font-medium">Type:</span>
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="py-1 px-2.5 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1d1f27] text-stone-800 dark:text-stone-200 text-xs font-medium"
            >
              {TYPE_OPTIONS.map((tp) => (
                <option key={tp} value={tp}>{tp}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Messages Table */}
      <div className="rounded-3xl bg-white dark:bg-[#16171d] border border-stone-200/80 dark:border-stone-800 shadow-xs overflow-hidden">
        {loading ? (
          <div className="py-16 text-center space-y-2">
            <Loader2 className="w-6 h-6 animate-spin mx-auto text-[#8b2323]" />
            <p className="text-xs text-stone-500">Retrieving inquiries...</p>
          </div>
        ) : messages.length === 0 ? (
          <div className="py-16 text-center space-y-2">
            <Mail className="w-8 h-8 mx-auto text-stone-400 opacity-60" />
            <h4 className="text-sm font-bold text-stone-700 dark:text-stone-300">No Messages Found</h4>
            <p className="text-xs text-stone-400 max-w-sm mx-auto">
              {search || statusFilter !== 'ALL' || typeFilter !== 'ALL'
                ? 'Try adjusting your search criteria or active filters.'
                : 'No contact inquiries have been submitted yet.'}
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-stone-50 dark:bg-[#1c1d25] border-b border-stone-200 dark:border-stone-800 text-stone-500 font-semibold">
                <tr>
                  <th className="py-3 px-4">Sender</th>
                  <th className="py-3 px-4">Inquiry Type</th>
                  <th className="py-3 px-4">Subject</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-stone-100 dark:divide-stone-800/60">
                {messages.map((m) => (
                  <tr
                    key={m.id}
                    className={`hover:bg-stone-50/70 dark:hover:bg-stone-900/50 transition-colors ${
                      !m.isRead ? 'bg-amber-50/30 dark:bg-amber-950/15 font-semibold' : ''
                    }`}
                  >
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        {!m.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#8b2323] shrink-0" title="Unread inquiry" />
                        )}
                        <div>
                          <div className="text-stone-900 dark:text-stone-100 font-medium">{m.name}</div>
                          <div className="text-[11px] text-stone-500 font-mono">{m.email}</div>
                          {m.company && (
                            <div className="text-[10px] text-stone-400">@ {m.company}</div>
                          )}
                        </div>
                      </div>
                    </td>

                    <td className="py-3 px-4">
                      <span className="px-2 py-0.5 rounded-md bg-stone-100 dark:bg-stone-800 text-stone-700 dark:text-stone-300 font-medium text-[11px]">
                        {m.inquiryType}
                      </span>
                    </td>

                    <td className="py-3 px-4 max-w-xs truncate text-stone-800 dark:text-stone-200">
                      {m.subject}
                    </td>

                    <td className="py-3 px-4">
                      <select
                        value={m.status}
                        onChange={(e) => handleStatusChange(m.id, e.target.value)}
                        className="py-0.5 px-2 rounded-lg border border-stone-200 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-[11px] font-semibold cursor-pointer"
                      >
                        <option value="NEW">NEW</option>
                        <option value="CONTACTED">CONTACTED</option>
                        <option value="IN_PROGRESS">IN PROGRESS</option>
                        <option value="RESOLVED">RESOLVED</option>
                        <option value="ARCHIVED">ARCHIVED</option>
                      </select>
                    </td>

                    <td className="py-3 px-4 text-stone-500 font-mono text-[11px] whitespace-nowrap">
                      {new Date(m.createdAt).toLocaleDateString()}
                    </td>

                    <td className="py-3 px-4 text-right">
                      <div className="flex items-center justify-end gap-1.5">
                        <button
                          type="button"
                          onClick={() => handleOpenMessage(m)}
                          className="p-1.5 rounded-lg hover:bg-stone-200 dark:hover:bg-stone-800 text-stone-600 dark:text-stone-300 transition-colors"
                          title="Read full message"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(m.id)}
                          className="p-1.5 rounded-lg hover:bg-red-50 text-stone-400 hover:text-red-600 transition-colors"
                          title="Delete message"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Message Detail Modal */}
      {selectedMessage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs select-auto">
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto bg-white dark:bg-[#16171d] rounded-3xl border border-stone-200 dark:border-stone-800 shadow-2xl p-6 sm:p-8 space-y-5">
            <button
              onClick={() => setSelectedMessage(null)}
              className="absolute top-5 right-5 p-2 rounded-full text-stone-400 hover:text-stone-900 dark:hover:text-white hover:bg-stone-100 dark:hover:bg-stone-800"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="space-y-1 pr-8">
              <div className="flex items-center gap-2">
                <span className="px-2.5 py-0.5 rounded-md bg-[#8b2323]/10 text-[#8b2323] text-xs font-bold">
                  {selectedMessage.inquiryType}
                </span>
                <span className="text-xs text-stone-400 font-mono">
                  {new Date(selectedMessage.createdAt).toLocaleString()}
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif text-stone-900 dark:text-stone-100">
                {selectedMessage.subject}
              </h3>
            </div>

            {/* Sender Metadata Box */}
            <div className="p-3.5 rounded-2xl bg-stone-50 dark:bg-stone-900/60 border border-stone-200 dark:border-stone-800 space-y-1 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-stone-500">From:</span>
                <span className="font-semibold text-stone-900 dark:text-stone-100">{selectedMessage.name}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-stone-500">Email:</span>
                <a href={`mailto:${selectedMessage.email}`} className="font-mono text-blue-600 dark:text-blue-400 hover:underline">
                  {selectedMessage.email}
                </a>
              </div>
              {selectedMessage.company && (
                <div className="flex items-center justify-between">
                  <span className="text-stone-500">Organization:</span>
                  <span className="font-medium text-stone-800 dark:text-stone-200">{selectedMessage.company}</span>
                </div>
              )}
              {selectedMessage.attachmentUrl && (
                <div className="flex items-center justify-between pt-1 border-t border-stone-200 dark:border-stone-800">
                  <span className="text-stone-500">Attachment:</span>
                  <a
                    href={selectedMessage.attachmentUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-blue-600 font-semibold hover:underline"
                  >
                    Open Link ↗
                  </a>
                </div>
              )}
            </div>

            {/* Message Body */}
            <div className="space-y-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Inquiry Message
              </h4>
              <div className="p-4 rounded-2xl bg-stone-50/70 dark:bg-[#1c1d25] border border-stone-200 dark:border-stone-800 text-xs sm:text-sm text-stone-800 dark:text-stone-200 leading-relaxed whitespace-pre-wrap">
                {selectedMessage.message}
              </div>
            </div>

            {/* Status Change in Modal */}
            <div className="flex items-center justify-between pt-1">
              <span className="text-xs font-semibold text-stone-600 dark:text-stone-400">
                Workflow Status:
              </span>
              <select
                value={selectedMessage.status}
                onChange={(e) => handleStatusChange(selectedMessage.id, e.target.value)}
                className="py-1 px-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-white dark:bg-[#1a1c23] text-xs font-semibold"
              >
                <option value="NEW">NEW</option>
                <option value="CONTACTED">CONTACTED</option>
                <option value="IN_PROGRESS">IN PROGRESS</option>
                <option value="RESOLVED">RESOLVED</option>
                <option value="ARCHIVED">ARCHIVED</option>
              </select>
            </div>

            {/* Admin Internal Notes */}
            <div className="space-y-2 pt-2 border-t border-stone-200 dark:border-stone-800">
              <h4 className="text-xs font-bold uppercase tracking-wider text-stone-400">
                Private Admin Notes (Internal Only)
              </h4>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={3}
                placeholder="Add private follow-up notes, phone call logs, or meeting notes..."
                className="w-full p-3 rounded-xl border border-stone-300 dark:border-stone-700 bg-stone-50 dark:bg-[#1a1c23] text-stone-900 dark:text-stone-100 text-xs focus:ring-2 focus:ring-[#8b2323]/30"
              />
              <div className="flex justify-end">
                <button
                  type="button"
                  disabled={savingNotes}
                  onClick={handleSaveNotes}
                  className="px-4 py-1.5 rounded-xl bg-[#8b2323] text-white text-xs font-semibold hover:bg-[#721c1c] transition-colors disabled:opacity-50"
                >
                  {savingNotes ? 'Saving Note...' : 'Save Note'}
                </button>
              </div>
            </div>

            {/* Action Bar */}
            <div className="pt-3 border-t border-stone-200 dark:border-stone-800 flex items-center justify-between">
              <a
                href={`mailto:${selectedMessage.email}?subject=Re: ${encodeURIComponent(selectedMessage.subject)}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-stone-900 dark:bg-stone-100 text-white dark:text-stone-900 text-xs font-semibold hover:bg-stone-800 transition-colors"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Reply via Email Client</span>
              </a>

              <button
                type="button"
                onClick={() => handleDelete(selectedMessage.id)}
                className="px-4 py-2 rounded-xl border border-red-200 dark:border-red-900 text-red-600 text-xs font-semibold hover:bg-red-50 dark:hover:bg-red-950/40 transition-colors"
              >
                Delete Inquiry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MessagesSection;
