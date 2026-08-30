import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Sparkles, ArrowRight, BookOpen, Clock, Award } from 'lucide-react-native';
import { Radius, Spacing } from '../constants/theme';
import { useRouter } from 'expo-router';

interface HeroBannerProps {
  studentName?: string;
  nextClassTime?: string;
  nextSubject?: string;
  attendanceRate?: string;
  onQuickAction?: () => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  studentName = 'Solaman',
  nextClassTime = '04:30 PM Today',
  nextSubject = 'Higher Mathematics - Batch A',
  attendanceRate = '94%',
  onQuickAction,
}) => {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.glowOverlay} />

      <View style={styles.topRow}>
        <View style={styles.badge}>
          <Sparkles size={12} color="#60a5fa" />
          <Text style={styles.badgeText}>SPRING 2026 ACADEMIC COCKPIT</Text>
        </View>
      </View>

      <Text style={styles.heroTitle}>Welcome back, {studentName}</Text>
      <Text style={styles.heroSubtitle}>
        You have 3 classes scheduled today. Your attendance rate is on track at{' '}
        <Text style={styles.boldText}>{attendanceRate}</Text>.
      </Text>

      <View style={styles.metaCard}>
        <View style={styles.metaRow}>
          <Clock size={16} color="#93c5fd" />
          <View style={styles.metaTextCol}>
            <Text style={styles.metaLabel}>NEXT UPCOMING CLASS</Text>
            <Text style={styles.metaValue}>{nextSubject}</Text>
            <Text style={styles.metaTime}>{nextClassTime}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.actionBtn}
        onPress={onQuickAction || (() => router.push('/(tabs)/routine'))}
        activeOpacity={0.85}
      >
        <Text style={styles.actionBtnText}>View Full Routine</Text>
        <ArrowRight size={14} color="#0f172a" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#0f172a',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 16,
    elevation: 4,
  },
  glowOverlay: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: 'rgba(37, 99, 235, 0.2)',
  },
  topRow: {
    marginBottom: Spacing.sm,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: 'rgba(96, 165, 250, 0.25)',
  },
  badgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#93c5fd',
    letterSpacing: 0.8,
  },
  heroTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.4,
    marginBottom: 6,
  },
  heroSubtitle: {
    fontSize: 13,
    color: '#cbd5e1',
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },
  boldText: {
    fontWeight: '700',
    color: '#60a5fa',
  },
  metaCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.07)',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.12)',
    marginBottom: Spacing.lg,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 10,
  },
  metaTextCol: {
    flex: 1,
    gap: 2,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.6,
  },
  metaValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#ffffff',
  },
  metaTime: {
    fontSize: 12,
    color: '#60a5fa',
    fontWeight: '500',
  },
  actionBtn: {
    backgroundColor: '#ffffff',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: Radius.sm,
    gap: 6,
  },
  actionBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
});
