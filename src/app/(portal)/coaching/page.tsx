'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useUser } from '@clerk/nextjs';
import {
  GraduationCap, Building2, Search, Key, ArrowRight,
  CheckCircle2, Clock, XCircle, AlertTriangle, Loader2,
  Calendar, MapPin, Globe, BookOpen, User2, DollarSign,
  ChevronLeft, Trash2, RefreshCw, Sparkles
} from 'lucide-react';
import { CoachingHeader } from '@/components/coaching/CoachingHeader';
import { BatchCard } from '@/components/coaching/BatchCard';
import { CoachingCenterCard } from '@/components/coaching/CoachingCenterCard';
import { BatchDetailModal } from '@/components/coaching/BatchDetailModal';
import { BatchTransferModal } from '@/components/coaching/BatchTransferModal';
import { EmptyState } from '@/components/ui/EmptyState';

// ─── Types ────────────────────────────────────────────────────

interface BatchPreview {
  id: string;
  name: string;
  subject?: string;
  class_set?: string;
  timing?: string;
  assigned_teacher?: string;
  monthly_fee?: number;
  location?: string;
  website_url?: string;
  description?: string;
  org_name?: string;
  organization_id: string;
}

interface JoinRequest {
  id: string;
  batch_id: string;
  batch_name: string;
  batch_subject?: string;
  batch_timing?: string;
  batch_teacher?: string;
  batch_fee?: number;
  org_name?: string;
  status: 'pending' | 'approved' | 'rejected' | 'blocked' | 'withdrawn';
  rejection_reason?: string;
  created_at: string;
}

type JoinStep = 'enter_key' | 'preview' | 'form' | 'success';
type MainTab = 'batches' | 'centers' | 'join';

// ─── Status Badge ──────────────────────────────────────────────

function RequestStatusBadge({ status }: { status: JoinRequest['status'] }) {
  const config = {
    pending: { color: 'text-amber-700 dark:text-amber-400', bg: 'bg-amber-50 dark:bg-amber-950/30 border-amber-200 dark:border-amber-800', icon: <Clock className="h-3 w-3" />, label: 'Pending Approval' },
    approved: { color: 'text-emerald-700 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-950/30 border-emerald-200 dark:border-emerald-800', icon: <CheckCircle2 className="h-3 w-3" />, label: 'Approved ✓' },
    rejected: { color: 'text-rose-700 dark:text-rose-400', bg: 'bg-rose-50 dark:bg-rose-950/30 border-rose-200 dark:border-rose-800', icon: <XCircle className="h-3 w-3" />, label: 'Rejected' },
    blocked: { color: 'text-slate-700 dark:text-slate-400', bg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-800', icon: <AlertTriangle className="h-3 w-3" />, label: 'Blocked' },
    withdrawn: { color: 'text-slate-500', bg: 'bg-slate-50 dark:bg-slate-900 border-slate-200 dark:border-slate-700', icon: <XCircle className="h-3 w-3" />, label: 'Withdrawn' },
  };
  const c = config[status] || config.pending;
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold border ${c.color} ${c.bg}`}>
      {c.icon} {c.label}
    </span>
  );
}

// ─── Join Flow ─────────────────────────────────────────────────

function JoinBatchFlow({ onJoinSuccess }: { onJoinSuccess: () => void }) {
  const { user } = useUser();
  const [step, setStep] = useState<JoinStep>('enter_key');
  const [joinKey, setJoinKey] = useState('');
  const [batchPreview, setBatchPreview] = useState<BatchPreview | null>(null);
  const [studentStatus, setStudentStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [form, setForm] = useState({
    institution: '',
    class: '',
    section: '',
    shift: '',
    message: '',
  });

  const handleLookup = async () => {
    if (!joinKey.trim()) return;
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/batches/lookup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ join_key: joinKey }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Invalid or expired key.');
        return;
      }
      setBatchPreview(data.batch);
      setStudentStatus(data.student_status);
      setStep('preview');
    } catch {
      setError('Network error. Please check your connection.');
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!batchPreview) return;
    if (!form.institution.trim() || !form.class.trim()) {
      setError('Institution and Class are required.');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/join-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ batch_id: batchPreview.id, ...form }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.error || 'Failed to submit request.');
        return;
      }
      setStep('success');
      onJoinSuccess();
    } catch {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const resetFlow = () => {
    setStep('enter_key');
    setJoinKey('');
    setBatchPreview(null);
    setStudentStatus(null);
    setError('');
    setForm({ institution: '', class: '', section: '', shift: '', message: '' });
  };

  return (
    <div className="max-w-lg mx-auto">
      {/* Progress indicator */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {(['enter_key', 'preview', 'form', 'success'] as JoinStep[]).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            <div className={`h-2 w-2 rounded-full transition-all ${
              step === s ? 'bg-indigo-600 scale-125' :
              ['enter_key', 'preview', 'form', 'success'].indexOf(step) > i ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
            }`} />
            {i < 3 && <div className={`h-0.5 w-8 rounded-full transition-all ${
              ['enter_key', 'preview', 'form', 'success'].indexOf(step) > i ? 'bg-emerald-500' : 'bg-slate-200 dark:bg-slate-700'
            }`} />}
          </div>
        ))}
      </div>

      <AnimatePresence mode="wait">

        {/* Step 1: Enter Join Key */}
        {step === 'enter_key' && (
          <motion.div key="enter_key" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }}>
            <div className="text-center mb-6">
              <div className="inline-flex h-16 w-16 rounded-2xl bg-indigo-100 dark:bg-indigo-950/40 items-center justify-center mb-4">
                <Key className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Enter Your Join Key</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Your teacher will share a unique join key for your batch.
              </p>
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                className="mb-4 p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0" />
                {error}
              </motion.div>
            )}

            <div className="space-y-3">
              <input
                type="text"
                placeholder="e.g. PHY-2026-K2M9"
                value={joinKey}
                onChange={e => setJoinKey(e.target.value.toUpperCase())}
                onKeyDown={e => e.key === 'Enter' && handleLookup()}
                className="w-full px-5 py-4 rounded-2xl bg-white dark:bg-slate-900 border-2 border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-lg font-mono font-bold text-slate-900 dark:text-slate-100 tracking-widest text-center focus:outline-none transition-colors placeholder:font-normal placeholder:tracking-normal placeholder:text-slate-400 placeholder:text-sm"
                autoFocus
              />
              <button
                onClick={handleLookup}
                disabled={loading || joinKey.trim().length < 4}
                className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all active:scale-98"
              >
                {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
                {loading ? 'Searching...' : 'Find My Batch'}
              </button>
            </div>

            <p className="text-center text-xs text-slate-400 dark:text-slate-600 mt-4">
              Keys are case-insensitive (e.g. PHY-2026-K2M9 = phy-2026-k2m9)
            </p>
          </motion.div>
        )}

        {/* Step 2: Batch Preview */}
        {step === 'preview' && batchPreview && (
          <motion.div key="preview" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-4">
            <button onClick={() => setStep('enter_key')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors mb-2">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div className="p-6 rounded-3xl border-2 border-indigo-200 dark:border-indigo-900 bg-gradient-to-br from-indigo-50/50 to-white dark:from-indigo-950/20 dark:to-slate-900">
              <div className="flex items-start justify-between gap-3 mb-4">
                <div>
                  <p className="text-[11px] font-extrabold text-indigo-600 dark:text-indigo-400 uppercase tracking-widest">
                    {batchPreview.org_name || 'Coaching Center'}
                  </p>
                  <h3 className="text-lg font-extrabold text-slate-900 dark:text-slate-100 mt-0.5 leading-tight">
                    {batchPreview.name}
                  </h3>
                </div>
                <CheckCircle2 className="h-6 w-6 text-emerald-500 flex-shrink-0 mt-1" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: <BookOpen className="h-3.5 w-3.5" />, label: 'Subject', value: batchPreview.subject },
                  { icon: <GraduationCap className="h-3.5 w-3.5" />, label: 'Level', value: batchPreview.class_set },
                  { icon: <Calendar className="h-3.5 w-3.5" />, label: 'Schedule', value: batchPreview.timing },
                  { icon: <User2 className="h-3.5 w-3.5" />, label: 'Mentor', value: batchPreview.assigned_teacher },
                  { icon: <MapPin className="h-3.5 w-3.5" />, label: 'Location', value: batchPreview.location },
                  { icon: <DollarSign className="h-3.5 w-3.5" />, label: 'Monthly Fee', value: batchPreview.monthly_fee ? `৳ ${Number(batchPreview.monthly_fee).toLocaleString()}` : null },
                ].filter(item => item.value).map(({ icon, label, value }) => (
                  <div key={label} className="flex items-start gap-2">
                    <span className="text-indigo-500 mt-0.5">{icon}</span>
                    <div>
                      <p className="text-[10px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wide">{label}</p>
                      <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {batchPreview.website_url && (
                <a href={batchPreview.website_url} target="_blank" rel="noopener noreferrer"
                  className="flex items-center gap-1.5 mt-4 text-xs text-indigo-600 dark:text-indigo-400 hover:underline">
                  <Globe className="h-3.5 w-3.5" /> Visit Website
                </a>
              )}
            </div>

            {/* Conflict warnings */}
            {studentStatus === 'pending' && (
              <div className="p-3 rounded-xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400 flex items-center gap-2">
                <Clock className="h-4 w-4 flex-shrink-0" />
                You already have a <strong>pending request</strong> for this batch. Check "My Batches" tab.
              </div>
            )}
            {studentStatus === 'approved' && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-700 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 flex-shrink-0" />
                You are <strong>already enrolled</strong> in this batch!
              </div>
            )}

            {(!studentStatus || studentStatus === 'rejected' || studentStatus === 'withdrawn') && (
              <>
                <p className="text-center text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Is this your batch?
                </p>
                <div className="flex gap-3">
                  <button onClick={resetFlow} className="flex-1 py-3 rounded-2xl border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
                    No, try again
                  </button>
                  <button onClick={() => setStep('form')}
                    className="flex-2 flex-1 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-bold shadow-lg shadow-indigo-500/20 flex items-center justify-center gap-2 transition-all">
                    Yes, continue <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </>
            )}
          </motion.div>
        )}

        {/* Step 3: Join Request Form */}
        {step === 'form' && batchPreview && (
          <motion.div key="form" initial={{ opacity: 0, x: 24 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -24 }} className="space-y-5">
            <button onClick={() => setStep('preview')} className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <ChevronLeft className="h-4 w-4" /> Back
            </button>

            <div>
              <h2 className="text-xl font-extrabold text-slate-900 dark:text-slate-100">Complete Your Request</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                Joining: <strong className="text-slate-700 dark:text-slate-300">{batchPreview.name}</strong>
              </p>
            </div>

            {/* Auto-filled from Clerk (non-editable) */}
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-700">
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-3">Your Identity (from account)</p>
              <div className="flex items-center gap-3">
                {user?.imageUrl && (
                  <img src={user.imageUrl} alt="Avatar" className="h-10 w-10 rounded-full border-2 border-white dark:border-slate-700 shadow-sm" />
                )}
                <div>
                  <p className="text-sm font-bold text-slate-900 dark:text-slate-100">{user?.fullName || 'Your Name'}</p>
                  <p className="text-xs text-slate-500">{user?.primaryEmailAddress?.emailAddress}</p>
                </div>
                <span className="ml-auto text-[10px] bg-slate-200 dark:bg-slate-700 text-slate-500 px-2 py-0.5 rounded-full font-semibold">Non-editable</span>
              </div>
            </div>

            {error && (
              <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400">
                {error}
              </div>
            )}

            {/* Student-entered fields */}
            <div className="space-y-3">
              {[
                { label: 'School / College / University *', key: 'institution', placeholder: 'e.g. Dhaka College', required: true },
                { label: 'Class *', key: 'class', placeholder: 'e.g. Class 11 / HSC 1st Year', required: true },
                { label: 'Section', key: 'section', placeholder: 'e.g. Science A' },
                { label: 'Shift', key: 'shift', placeholder: 'e.g. Morning / Day / Evening' },
              ].map(({ label, key, placeholder }) => (
                <div key={key}>
                  <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">{label}</label>
                  <input
                    type="text"
                    placeholder={placeholder}
                    value={(form as any)[key]}
                    onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                    className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-sm text-slate-900 dark:text-slate-100 focus:outline-none transition-colors"
                  />
                </div>
              ))}

              <div>
                <label className="block text-xs font-semibold text-slate-600 dark:text-slate-400 mb-1.5">
                  Message to Teacher <span className="font-normal text-slate-400">(optional, max 250 chars)</span>
                </label>
                <textarea
                  placeholder="e.g. I'm a first-year student interested in the regular batch..."
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value.slice(0, 250) }))}
                  rows={3}
                  className="w-full px-4 py-2.5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 focus:border-indigo-500 dark:focus:border-indigo-500 text-sm text-slate-900 dark:text-slate-100 resize-none focus:outline-none transition-colors"
                />
                <p className="text-right text-[10px] text-slate-400 mt-1">{form.message.length}/250</p>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading || !form.institution.trim() || !form.class.trim()}
              className="w-full py-4 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-sm shadow-lg shadow-indigo-500/20 disabled:opacity-50 flex items-center justify-center gap-2 transition-all"
            >
              {loading ? <Loader2 className="h-5 w-5 animate-spin" /> : null}
              {loading ? 'Submitting...' : 'Submit Join Request'}
            </button>
          </motion.div>
        )}

        {/* Step 4: Success */}
        {step === 'success' && (
          <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8 space-y-5">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 200, damping: 15 }}
              className="inline-flex h-20 w-20 rounded-full bg-emerald-100 dark:bg-emerald-950/40 items-center justify-center mx-auto"
            >
              <CheckCircle2 className="h-10 w-10 text-emerald-500" />
            </motion.div>
            <div>
              <h2 className="text-2xl font-extrabold text-slate-900 dark:text-slate-100">Request Sent! 🎉</h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-2">
                Your join request has been submitted. Your teacher will review it soon.
              </p>
            </div>
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 text-xs text-amber-700 dark:text-amber-400">
              <Clock className="inline h-3.5 w-3.5 mr-1" />
              Status is <strong>Pending</strong> until your teacher approves. Check the "My Batches" tab for updates.
            </div>
            <button onClick={resetFlow}
              className="px-6 py-2.5 rounded-xl border-2 border-slate-200 dark:border-slate-700 text-sm font-bold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Join Another Batch
            </button>
          </motion.div>
        )}

      </AnimatePresence>
    </div>
  );
}

// ─── My Requests Panel ─────────────────────────────────────────

function MyRequestsPanel({ refreshTrigger }: { refreshTrigger: number }) {
  const [requests, setRequests] = useState<JoinRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [withdrawingId, setWithdrawingId] = useState<string | null>(null);

  const fetchRequests = useCallback(async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/join-requests');
      if (res.ok) {
        const data = await res.json();
        setRequests(data.requests || []);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchRequests(); }, [fetchRequests, refreshTrigger]);

  const handleWithdraw = async (requestId: string) => {
    setWithdrawingId(requestId);
    try {
      const res = await fetch(`/api/join-requests/${requestId}/withdraw`, { method: 'POST' });
      if (res.ok) {
        setRequests(prev => prev.map(r => r.id === requestId ? { ...r, status: 'withdrawn' } : r));
      }
    } finally {
      setWithdrawingId(null);
    }
  };

  if (loading) {
    return (
      <div className="space-y-3">
        {[1,2].map(i => <div key={i} className="h-28 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 animate-pulse" />)}
      </div>
    );
  }

  if (requests.length === 0) {
    return (
      <EmptyState
        icon={<Clock size={44} className="text-indigo-400" />}
        title="No Join Requests Yet"
        description="Use the 'Join a Batch' tab to request to join a coaching batch."
      />
    );
  }

  return (
    <div className="space-y-3">
      {requests.map(request => (
        <motion.div
          key={request.id}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
        >
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="text-[11px] font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-wide">
                {request.org_name || 'Coaching Center'}
              </p>
              <h4 className="font-extrabold text-sm text-slate-900 dark:text-slate-100 mt-0.5">{request.batch_name}</h4>
              <div className="flex flex-wrap gap-2 mt-1.5">
                {request.batch_subject && <span className="text-xs text-slate-500">{request.batch_subject}</span>}
                {request.batch_timing && <span className="text-xs text-slate-500">• {request.batch_timing}</span>}
              </div>
              {request.rejection_reason && (
                <div className="mt-2 p-2 rounded-lg bg-rose-50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-800 text-xs text-rose-700 dark:text-rose-400">
                  <strong>Reason:</strong> {request.rejection_reason}
                </div>
              )}
              <p className="text-[10px] text-slate-400 mt-2">
                Requested {new Date(request.created_at).toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })}
              </p>
            </div>
            <div className="flex flex-col items-end gap-2">
              <RequestStatusBadge status={request.status} />
              {request.status === 'pending' && (
                <button
                  onClick={() => handleWithdraw(request.id)}
                  disabled={withdrawingId === request.id}
                  className="flex items-center gap-1 text-[11px] font-semibold text-slate-500 hover:text-rose-500 transition-colors"
                >
                  {withdrawingId === request.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <Trash2 className="h-3 w-3" />}
                  Withdraw
                </button>
              )}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

// ─── Coaching Page (Main Export) ───────────────────────────────

// Keep existing mock data for enrolled batches/centers until DB is connected
const MOCK_BATCHES = [
  {
    id: 'batch-001', organization_id: 'org-docent-01', name: 'HSC Physics 2026 - Regular Batch 04',
    batch_code: 'PHY-2026-B04', coaching_center_id: 'center-01',
    coaching_center_name: 'Docent Science Academy (Farmgate)', class_level: 'HSC 2nd Year',
    timing: 'Sat, Mon, Wed (04:00 PM - 05:30 PM)', days_schedule: ['Saturday', 'Monday', 'Wednesday'],
    room_number: 'Room 304 (Farmgate Main Campus)', assigned_teacher: 'Dr. Mahmudul Hasan (PhD, BUET)',
    monthly_fee: 2500, progress_percentage: 68, total_students: 45, status: 'active' as const, enrolled_date: '10 Jan 2026',
  },
  {
    id: 'batch-002', organization_id: 'org-docent-01', name: 'HSC Higher Math - Advanced Problem Solving',
    batch_code: 'MATH-2026-B02', coaching_center_id: 'center-01',
    coaching_center_name: 'Docent Science Academy (Farmgate)', class_level: 'HSC 2nd Year',
    timing: 'Sun, Tue, Thu (05:30 PM - 07:00 PM)', days_schedule: ['Sunday', 'Tuesday', 'Thursday'],
    room_number: 'Room 402 (Farmgate Annex)', assigned_teacher: 'Prof. Tanvir Ahmed',
    monthly_fee: 2800, progress_percentage: 52, total_students: 40, status: 'active' as const, enrolled_date: '15 Jan 2026',
  },
];

const MOCK_CENTERS = [
  {
    id: 'center-01', name: 'Docent Science Academy', code: 'DSA', branch: 'Farmgate Main Campus',
    address: '42/A Green Road, Farmgate, Dhaka 1215', contact_phone: '+880 1711-223344',
    contact_email: 'farmgate@docentbase.edu.bd', head_teacher: 'Engr. Rafiqul Islam (BUET)',
    enrolled_batches_count: 3, total_subjects: 4, established_year: '2018',
  },
];

export default function CoachingPage() {
  const [activeTab, setActiveTab] = useState<MainTab>('batches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [joinSuccessCount, setJoinSuccessCount] = useState(0);

  const [selectedDetailBatch, setSelectedDetailBatch] = useState<any | null>(null);
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const [selectedTransferBatch, setSelectedTransferBatch] = useState<any | null>(null);
  const [isTransferOpen, setIsTransferOpen] = useState(false);

  const filteredBatches = MOCK_BATCHES.filter(b => {
    const matchesSearch =
      b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.coaching_center_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.assigned_teacher?.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = selectedFilter === 'all' || b.status === selectedFilter;
    return matchesSearch && matchesStatus;
  });

  const activeBatchesCount = MOCK_BATCHES.filter(b => b.status === 'active').length;

  return (
    <div className="flex flex-col gap-8 pb-16 max-w-7xl mx-auto">
      {/* Top Header Banner & Search Controls */}
      <CoachingHeader
        activeBatchesCount={activeBatchesCount}
        centersCount={MOCK_CENTERS.length}
        totalHoursPerWeek={12}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        selectedFilter={selectedFilter}
        onFilterChange={setSelectedFilter}
      />

      {/* Main Navigation Tabs */}
      <div className="p-1.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 flex items-center justify-start gap-2 overflow-x-auto">
        <button
          onClick={() => setActiveTab('batches')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'batches'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <GraduationCap size={18} /> My Batches ({filteredBatches.length})
        </button>

        <button
          onClick={() => setActiveTab('centers')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'centers'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Building2 size={18} /> My Institutes ({MOCK_CENTERS.length})
        </button>

        <button
          onClick={() => setActiveTab('join')}
          className={`relative px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 transition-all ${
            activeTab === 'join'
              ? 'bg-white dark:bg-slate-800 text-indigo-600 dark:text-indigo-400 shadow-md'
              : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <Key size={18} className={activeTab !== 'join' ? 'text-amber-500' : ''} />
          Join a Batch
        </button>
      </div>

      {/* Tab Content */}
      <AnimatePresence mode="wait">

        {/* My Enrolled Batches */}
        {activeTab === 'batches' && (
          <motion.div key="batches" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}>
            {/* Pending requests summary */}
            <MyRequestsPanel refreshTrigger={joinSuccessCount} />
          </motion.div>
        )}

        {/* My Institutes */}
        {activeTab === 'centers' && (
          <motion.div key="centers" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {MOCK_CENTERS.map(center => (
              <CoachingCenterCard key={center.id} center={center} />
            ))}
          </motion.div>
        )}

        {/* Join a Batch — Real Flow */}
        {activeTab === 'join' && (
          <motion.div key="join" initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.25 }}
            className="rounded-3xl p-6 sm:p-10 border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 shadow-lg">
            <JoinBatchFlow onJoinSuccess={() => setJoinSuccessCount(c => c + 1)} />
          </motion.div>
        )}

      </AnimatePresence>

      {/* Modals */}
      <BatchDetailModal batch={selectedDetailBatch} isOpen={isDetailOpen} onClose={() => setIsDetailOpen(false)} onRequestTransfer={b => { setSelectedTransferBatch(b); setIsTransferOpen(true); }} />
      <BatchTransferModal batch={selectedTransferBatch} isOpen={isTransferOpen} onClose={() => setIsTransferOpen(false)} />
    </div>
  );
}
