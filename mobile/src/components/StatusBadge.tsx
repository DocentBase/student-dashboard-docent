import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export type StatusVariant =
  | 'present'
  | 'absent'
  | 'late'
  | 'holiday'
  | 'paid'
  | 'due'
  | 'overdue'
  | 'waived'
  | 'upcoming'
  | 'ongoing'
  | 'completed'
  | 'active'
  | 'dropped';

interface StatusBadgeProps {
  status: StatusVariant | string;
  label?: string;
}

const statusConfig: Record<
  string,
  { bg: string; text: string; dot: string; label: string }
> = {
  present: { bg: '#ecfdf5', text: '#047857', dot: '#10b981', label: 'Present' },
  absent: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444', label: 'Absent' },
  late: { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b', label: 'Late' },
  holiday: { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6', label: 'Holiday' },
  paid: { bg: '#ecfdf5', text: '#047857', dot: '#10b981', label: 'Paid' },
  due: { bg: '#fffbeb', text: '#b45309', dot: '#f59e0b', label: 'Due' },
  overdue: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444', label: 'Overdue' },
  waived: { bg: '#f4f4f5', text: '#71717a', dot: '#a1a1aa', label: 'Waived' },
  upcoming: { bg: '#eff6ff', text: '#1d4ed8', dot: '#3b82f6', label: 'Upcoming' },
  ongoing: { bg: '#ecfdf5', text: '#047857', dot: '#10b981', label: 'Live Now' },
  completed: { bg: '#f4f4f5', text: '#52525b', dot: '#71717a', label: 'Completed' },
  active: { bg: '#ecfdf5', text: '#047857', dot: '#10b981', label: 'Active' },
  dropped: { bg: '#fef2f2', text: '#b91c1c', dot: '#ef4444', label: 'Dropped' },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, label }) => {
  const key = status?.toLowerCase() || 'active';
  const config = statusConfig[key] || {
    bg: '#f4f4f5',
    text: '#52525b',
    dot: '#71717a',
    label: status,
  };

  return (
    <View style={[styles.badge, { backgroundColor: config.bg }]}>
      <View style={[styles.dot, { backgroundColor: config.dot }]} />
      <Text style={[styles.text, { color: config.text }]}>
        {label || config.label}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    gap: 5,
    alignSelf: 'flex-start',
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  text: {
    fontSize: 11,
    fontWeight: '700',
    letterSpacing: 0.2,
  },
});
