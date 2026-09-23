import { SignUp } from '@clerk/nextjs';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { clerkAuthAppearance } from '@/lib/auth-theme';

export default function SignUpPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-zinc-950 flex flex-col justify-between p-4 sm:p-6 font-sans selection:bg-blue-600 selection:text-white">
      {/* Auth Navigation Header */}
      <header className="w-full max-w-md mx-auto flex items-center justify-between py-4">
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-colors"
        >
          <ArrowLeft size={16} />
          <span>Back to Home</span>
        </Link>
        <div className="flex items-center gap-2">
          <img
            src="/images/docent-logo.jpg"
            alt="DocentBase Logo"
            className="w-7 h-7 rounded-md object-cover border border-zinc-200 dark:border-zinc-800 shadow-xs"
          />
          <span className="text-xs font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
            DocentBase
          </span>
        </div>
      </header>

      {/* Main Sign Up Section */}
      <main className="w-full flex-1 flex flex-col items-center justify-center my-6">
        <div className="text-center mb-6 max-w-sm px-2">
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
            Create Student Account
          </h1>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1.5 leading-relaxed">
            Register to join your coaching center batch and monitor student operations.
          </p>
        </div>

        <SignUp
          path="/sign-up"
          routing="path"
          signInUrl="/sign-in"
          appearance={clerkAuthAppearance}
        />
      </main>

      {/* Auth Footer */}
      <footer className="w-full max-w-md mx-auto text-center py-4 text-[11px] text-zinc-400 dark:text-zinc-600">
        <p>© {new Date().getFullYear()} DocentBase. Precision Student Cockpit.</p>
      </footer>
    </div>
  );
}
