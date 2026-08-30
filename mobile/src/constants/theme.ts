export const Colors = {
  light: {
    background: '#f8fafc',
    surface: '#ffffff',
    card: '#ffffff',
    elevated: '#ffffff',
    subtle: '#f1f5f9',
    sidebar: '#ffffff',
    heroBg: '#0f172a',
    
    text: '#0f172a',
    textSecondary: '#52525b',
    textMuted: '#94a3b8',
    textInverse: '#ffffff',
    
    primary: '#2563eb',
    primaryHover: '#1d4ed8',
    primarySoft: '#eff6ff',
    primarySubtle: '#dbeafe',
    
    secondary: '#f4f4f5',
    secondaryHover: '#e4e4e7',
    
    border: '#e4e4e7',
    borderSubtle: '#f1f5f9',
    borderStrong: '#cbd5e1',
    
    success: '#10b981',
    successLight: '#ecfdf5',
    successText: '#047857',
    
    danger: '#ef4444',
    dangerLight: '#fef2f2',
    dangerText: '#b91c1c',
    
    warning: '#f59e0b',
    warningLight: '#fffbeb',
    warningText: '#b45309',
    
    info: '#2563eb',
    infoLight: '#eff6ff',
    infoText: '#1d4ed8',
    
    tabBar: '#ffffff',
    tabBarBorder: '#e4e4e7',
  },
  dark: {
    background: '#09090b',
    surface: '#121215',
    card: '#121215',
    elevated: '#18181b',
    subtle: '#1f1f23',
    sidebar: '#0e0e11',
    heroBg: '#0c0c0e',
    
    text: '#fafafa',
    textSecondary: '#a1a1aa',
    textMuted: '#71717a',
    textInverse: '#09090b',
    
    primary: '#3b82f6',
    primaryHover: '#60a5fa',
    primarySoft: 'rgba(59, 130, 246, 0.15)',
    primarySubtle: 'rgba(59, 130, 246, 0.1)',
    
    secondary: '#1f1f23',
    secondaryHover: '#27272a',
    
    border: '#27272a',
    borderSubtle: '#1f1f23',
    borderStrong: '#3f3f46',
    
    success: '#10b981',
    successLight: 'rgba(16, 185, 129, 0.15)',
    successText: '#34d399',
    
    danger: '#ef4444',
    dangerLight: 'rgba(239, 68, 68, 0.15)',
    dangerText: '#f87171',
    
    warning: '#f59e0b',
    warningLight: 'rgba(245, 158, 11, 0.15)',
    warningText: '#fbbf24',
    
    info: '#3b82f6',
    infoLight: 'rgba(59, 130, 246, 0.15)',
    infoText: '#60a5fa',
    
    tabBar: '#121215',
    tabBarBorder: '#27272a',
  }
};

export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  xxl: 24,
  section: 32,
};

export const Radius = {
  xs: 6,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 20,
  full: 9999,
};

export const Typography = {
  hero: {
    fontSize: 26,
    fontWeight: '700' as const,
    letterSpacing: -0.5,
  },
  headingXl: {
    fontSize: 22,
    fontWeight: '700' as const,
    letterSpacing: -0.4,
  },
  headingLg: {
    fontSize: 18,
    fontWeight: '700' as const,
    letterSpacing: -0.3,
  },
  headingMd: {
    fontSize: 16,
    fontWeight: '600' as const,
    letterSpacing: -0.2,
  },
  headingSm: {
    fontSize: 14,
    fontWeight: '600' as const,
  },
  bodyLg: {
    fontSize: 15,
    fontWeight: '400' as const,
  },
  bodyMd: {
    fontSize: 13,
    fontWeight: '400' as const,
  },
  bodySm: {
    fontSize: 12,
    fontWeight: '400' as const,
  },
  caption: {
    fontSize: 11,
    fontWeight: '500' as const,
    letterSpacing: 0.2,
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700' as const,
    textTransform: 'uppercase' as const,
    letterSpacing: 1.2,
  },
};
