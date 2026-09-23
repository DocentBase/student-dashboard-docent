import type { SignIn } from '@clerk/nextjs';
import type { ComponentProps } from 'react';

export const clerkAuthAppearance: ComponentProps<typeof SignIn>['appearance'] & Record<string, any> = {
  layout: {
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
    showOptionalFields: true,
  },
  options: {
    socialButtonsPlacement: 'top',
    socialButtonsVariant: 'blockButton',
    showOptionalFields: true,
  },
  elements: {
    rootBox: 'w-full flex justify-center',
    cardBox: 'w-full flex justify-center',
    card: 'w-full max-w-md bg-white dark:bg-zinc-900 border border-zinc-200/80 dark:border-zinc-800 shadow-xl rounded-2xl p-6 sm:p-8 backdrop-blur-md',
    headerTitle: 'text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 text-center',
    headerSubtitle: 'text-xs text-zinc-500 dark:text-zinc-400 text-center mt-1 mb-2',
    socialButtonsBlockButton:
      'w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-800/80 hover:bg-zinc-50 dark:hover:bg-zinc-700/80 text-zinc-800 dark:text-zinc-100 transition-all duration-150 shadow-xs text-sm font-semibold cursor-pointer active:scale-[0.99]',
    socialButtonsBlockButtonText: 'text-sm font-semibold text-zinc-800 dark:text-zinc-100',
    socialButtonsBlockButtonIcon: 'w-5 h-5 flex-shrink-0',
    socialButtonsProviderIcon: 'w-5 h-5 flex-shrink-0',
    dividerRow: 'my-6 flex items-center gap-3 text-xs uppercase tracking-wider text-zinc-400',
    dividerLine: 'h-[1px] bg-zinc-200 dark:bg-zinc-800 flex-1',
    dividerText: 'text-[11px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest px-2',
    formFieldLabel: 'text-xs font-semibold text-zinc-700 dark:text-zinc-300 mb-1.5 block',
    formFieldInput:
      'w-full rounded-xl border border-zinc-300 dark:border-zinc-700 bg-white dark:bg-zinc-950 px-3.5 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition duration-150',
    formButtonPrimary:
      'w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 px-4 rounded-xl shadow-md transition-all duration-150 text-sm mt-2 flex justify-center items-center cursor-pointer active:scale-[0.99]',
    footerActionLink: 'text-blue-600 dark:text-blue-400 hover:underline font-semibold text-xs transition',
    footerActionText: 'text-xs text-zinc-500 dark:text-zinc-400',
    footer: 'bg-transparent pt-4 text-center text-xs text-zinc-500 border-t border-zinc-100 dark:border-zinc-800/60 mt-4',
    identityPreviewText: 'text-sm font-medium text-zinc-800 dark:text-zinc-200',
    identityPreviewEditButtonIcon: 'text-blue-600',
    formHeaderTitle: 'text-lg font-bold text-zinc-900 dark:text-zinc-100',
    formHeaderSubtitle: 'text-xs text-zinc-500 dark:text-zinc-400',
    formResendCodeLink: 'text-xs font-semibold text-blue-600 hover:underline',
  },
};
