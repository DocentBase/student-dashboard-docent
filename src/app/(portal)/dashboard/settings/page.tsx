'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { PrimaryButton, SecondaryButton } from '@/components/ui/Button';
import { Bell, Shield, Smartphone, Mail, Moon, Eye, Check } from 'lucide-react';

export default function SettingsPage() {
  const [saved, setSaved] = useState(false);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [emailReports, setEmailReports] = useState(true);
  const [examReminders, setExamReminders] = useState(true);

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="flex flex-col gap-6 max-w-4xl">
      {/* Header */}
      <div>
        <div className="eyebrow">Preferences</div>
        <h1 className="page-title">Portal Settings</h1>
        <p className="text-xs text-zinc-500 mt-1">
          Notification preferences, alert subscriptions, and security parameters.
        </p>
      </div>

      {/* Notification Preferences */}
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="text-blue-600" size={18} />
          <div>
            <h3 className="section-title">Notification Channels</h3>
            <p className="text-xs text-zinc-500">Configure how you receive updates and critical alerts.</p>
          </div>
        </div>

        <div className="space-y-4 divide-y divide-zinc-100 dark:divide-zinc-800">
          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">SMS Instant Attendance Alerts</p>
              <p className="text-xs text-zinc-500">Receive an immediate SMS on your registered phone when attendance is marked.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={smsAlerts}
                onChange={(e) => setSmsAlerts(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Monthly Performance Digest</p>
              <p className="text-xs text-zinc-500">Comprehensive monthly progress PDF sent to your email.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={emailReports}
                onChange={(e) => setEmailReports(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>

          <div className="flex items-center justify-between pt-3">
            <div>
              <p className="font-semibold text-xs text-zinc-900 dark:text-zinc-100">Exam Countdown Reminders</p>
              <p className="text-xs text-zinc-500">Notifications 48 hours before any scheduled exam or quiz.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={examReminders}
                onChange={(e) => setExamReminders(e.target.checked)}
                className="sr-only peer"
              />
              <div className="w-10 h-5 bg-zinc-200 peer-focus:outline-none rounded-full peer dark:bg-zinc-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-zinc-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600" />
            </label>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
          <span className="text-xs text-zinc-400">
            {saved ? <span className="text-emerald-600 flex items-center gap-1"><Check size={14} /> Preferences saved</span> : 'Changes apply immediately'}
          </span>
          <button onClick={handleSave} className="btn btn-primary text-xs h-8 px-4">
            Save Preferences
          </button>
        </div>
      </Card>
    </div>
  );
}
