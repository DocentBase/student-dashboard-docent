'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Batch } from '@/types';
import { X, RefreshCw, CheckCircle2, Clock, MapPin, AlertCircle } from 'lucide-react';

interface BatchTransferModalProps {
  batch: Batch | null;
  isOpen: boolean;
  onClose: () => void;
}

export function BatchTransferModal({
  batch,
  isOpen,
  onClose,
}: BatchTransferModalProps) {
  const [targetTimeSlot, setTargetTimeSlot] = useState('Morning (08:00 AM - 09:30 AM)');
  const [reason, setReason] = useState('School schedule collision');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen || !batch) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setSubmitted(false);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Box */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          transition={{ type: 'spring', damping: 25, stiffness: 300 }}
          className="relative w-full max-w-lg rounded-2xl border bg-white dark:bg-slate-900 shadow-2xl p-6 text-slate-900 dark:text-slate-100 z-10"
          style={{ borderColor: 'var(--border-subtle)' }}
        >
          {/* Close Button */}
          <button
            onClick={handleClose}
            className="absolute right-4 top-4 p-2 rounded-xl text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 transition-all"
          >
            <X size={20} />
          </button>

          {!submitted ? (
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div className="flex items-center gap-3 mb-2">
                <div className="p-3 rounded-xl bg-indigo-100 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400">
                  <RefreshCw size={22} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Request Batch Transfer</h2>
                  <p className="text-xs text-slate-500">
                    Request to change your active batch schedule for {batch.name}
                  </p>
                </div>
              </div>

              {/* Current Batch Info Box */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-100 dark:border-slate-800 text-xs flex flex-col gap-1">
                <p className="font-semibold text-slate-800 dark:text-slate-200">
                  Current Batch: <span className="text-indigo-600 dark:text-indigo-400">{batch.name}</span>
                </p>
                <p className="text-slate-500">Timing: {batch.timing || 'Sat, Mon, Wed (04:00 PM - 05:30 PM)'}</p>
                <p className="text-slate-500">Institute: {batch.coaching_center_name || 'Docent Science Academy'}</p>
              </div>

              {/* Preferred Time Slot */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                  Preferred Target Schedule / Slot *
                </label>
                <select
                  value={targetTimeSlot}
                  onChange={(e) => setTargetTimeSlot(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                >
                  <option value="Morning (08:00 AM - 09:30 AM)">
                    Morning Slot (08:00 AM - 09:30 AM) • Sat, Mon, Wed
                  </option>
                  <option value="Noon Slot (11:30 AM - 01:00 PM)">
                    Noon Slot (11:30 AM - 01:00 PM) • Sun, Tue, Thu
                  </option>
                  <option value="Evening Slot (06:00 PM - 07:30 PM)">
                    Evening Slot (06:00 PM - 07:30 PM) • Sat, Mon, Wed
                  </option>
                  <option value="Weekend Special (Friday 09:00 AM - 12:00 PM)">
                    Weekend Special Slot (Friday 09:00 AM - 12:00 PM)
                  </option>
                </select>
              </div>

              {/* Transfer Reason */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                  Reason for Request *
                </label>
                <select
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full p-2.5 rounded-xl border text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                >
                  <option value="School schedule collision">School / College class schedule conflict</option>
                  <option value="Transport issue">Transportation / Distance timing issue</option>
                  <option value="Personal health">Health or medical timing requirement</option>
                  <option value="Exam preparation">Parallel exam timing conflict</option>
                  <option value="Other">Other specific reason</option>
                </select>
              </div>

              {/* Additional Notes */}
              <div>
                <label className="block text-xs font-semibold mb-1.5 text-slate-700 dark:text-slate-300">
                  Additional Explanation (Optional)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Please state any specific requests for campus admin review..."
                  className="w-full p-2.5 rounded-xl border text-xs bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 border-slate-200 dark:border-slate-700 focus:ring-2 focus:ring-indigo-500/20 outline-none"
                />
              </div>

              {/* Submit Buttons */}
              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="py-2 px-4 rounded-xl text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="py-2.5 px-5 rounded-xl text-xs font-semibold bg-indigo-600 hover:bg-indigo-700 text-white shadow-md transition-all"
                >
                  Submit Request
                </button>
              </div>
            </form>
          ) : (
            <div className="py-6 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center mb-1">
                <CheckCircle2 size={36} />
              </div>
              <h3 className="text-xl font-bold">Request Submitted Successfully!</h3>
              <p className="text-xs text-slate-500 max-w-sm">
                Your request to transfer to <strong className="text-slate-800 dark:text-slate-200">{targetTimeSlot}</strong> has been forwarded to the campus academic coordinator. You will receive an SMS update within 24-48 hours.
              </p>
              <button
                onClick={handleClose}
                className="mt-4 py-2.5 px-6 rounded-xl text-xs font-semibold bg-indigo-600 text-white hover:bg-indigo-700 transition-all shadow-md"
              >
                Back to Coaching Dashboard
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
