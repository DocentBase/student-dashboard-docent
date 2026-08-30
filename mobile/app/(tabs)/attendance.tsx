import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { StatCard } from '../../src/components/StatCard';
import { StatusBadge } from '../../src/components/StatusBadge';
import {
  CheckCircle2,
  XCircle,
  Clock,
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
  Flame,
} from 'lucide-react-native';
import { Spacing, Radius } from '../../src/constants/theme';

export default function AttendanceScreen() {
  const [selectedMonth, setSelectedMonth] = useState('August 2026');

  const attendanceRecords = [
    { id: '1', date: '29 Aug 2026', day: 'Saturday', status: 'present', subject: 'Higher Math', time: '04:30 PM' },
    { id: '2', date: '27 Aug 2026', day: 'Thursday', status: 'present', subject: 'Physics', time: '06:00 PM' },
    { id: '3', date: '25 Aug 2026', day: 'Tuesday', status: 'late', subject: 'Chemistry', time: '04:30 PM (Late by 10m)' },
    { id: '4', date: '22 Aug 2026', day: 'Saturday', status: 'present', subject: 'Higher Math', time: '04:30 PM' },
    { id: '5', date: '20 Aug 2026', day: 'Thursday', status: 'absent', subject: 'Physics', time: 'Medical Leave' },
    { id: '6', date: '18 Aug 2026', day: 'Tuesday', status: 'holiday', subject: 'National Holiday', time: 'Campus Closed' },
    { id: '7', date: '15 Aug 2026', day: 'Saturday', status: 'present', subject: 'Biology', time: '04:30 PM' },
  ];

  return (
    <View style={styles.container}>
      <CockpitHeader title="Attendance Record" subtitle="Real-time biometric & teacher logs" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Streak & Overall Progress Banner */}
        <View style={styles.streakBanner}>
          <View style={styles.streakLeft}>
            <View style={styles.flameCircle}>
              <Flame size={22} color="#f97316" />
            </View>
            <View>
              <Text style={styles.streakTitle}>12 Days Active Streak</Text>
              <Text style={styles.streakSubtitle}>Keep up the regular attendance!</Text>
            </View>
          </View>
          <View style={styles.streakScoreBox}>
            <Text style={styles.streakScore}>94.2%</Text>
            <Text style={styles.streakScoreLabel}>RATIO</Text>
          </View>
        </View>

        {/* 3 Metric Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { borderColor: '#d1fae5' }]}>
            <Text style={[styles.miniStatNum, { color: '#047857' }]}>26</Text>
            <Text style={styles.miniStatLabel}>Present Days</Text>
          </View>
          <View style={[styles.miniStat, { borderColor: '#fee2e2' }]}>
            <Text style={[styles.miniStatNum, { color: '#b91c1c' }]}>1</Text>
            <Text style={styles.miniStatLabel}>Absent Days</Text>
          </View>
          <View style={[styles.miniStat, { borderColor: '#fef3c7' }]}>
            <Text style={[styles.miniStatNum, { color: '#b45309' }]}>1</Text>
            <Text style={styles.miniStatLabel}>Late Entries</Text>
          </View>
        </View>

        {/* Month Selector Header */}
        <View style={styles.monthHeader}>
          <Text style={styles.sectionTitle}>Daily Attendance Log</Text>
          <View style={styles.monthPill}>
            <TouchableOpacity style={styles.monthBtn}>
              <ChevronLeft size={16} color="#52525b" />
            </TouchableOpacity>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <TouchableOpacity style={styles.monthBtn}>
              <ChevronRight size={16} color="#52525b" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Attendance Log List */}
        <View style={styles.logList}>
          {attendanceRecords.map((record) => (
            <View key={record.id} style={styles.logItem}>
              <View style={styles.logDateCol}>
                <Text style={styles.logDate}>{record.date.split(' ')[0]}</Text>
                <Text style={styles.logMonth}>{record.date.split(' ')[1]}</Text>
              </View>

              <View style={styles.logContent}>
                <View style={styles.logTopRow}>
                  <Text style={styles.logSubject}>{record.subject}</Text>
                  <StatusBadge status={record.status} />
                </View>
                <Text style={styles.logMeta}>
                  {record.day} • {record.time}
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl * 2,
    gap: Spacing.lg,
  },
  streakBanner: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  streakLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    flex: 1,
  },
  flameCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff7ed',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fed7aa',
  },
  streakTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  streakSubtitle: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  streakScoreBox: {
    alignItems: 'flex-end',
  },
  streakScore: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2563eb',
    letterSpacing: -0.5,
  },
  streakScoreLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  statsRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  miniStat: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: Radius.md,
    padding: Spacing.md,
    alignItems: 'center',
    borderWidth: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 2,
    elevation: 1,
  },
  miniStatNum: {
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 2,
  },
  miniStatLabel: {
    fontSize: 11,
    color: '#71717a',
    fontWeight: '500',
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  monthPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    paddingHorizontal: 6,
    paddingVertical: 2,
  },
  monthBtn: {
    padding: 4,
  },
  monthText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
    paddingHorizontal: 6,
  },
  logList: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    overflow: 'hidden',
  },
  logItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
    gap: 12,
  },
  logDateCol: {
    width: 42,
    height: 42,
    borderRadius: Radius.sm,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  logDate: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 16,
  },
  logMonth: {
    fontSize: 9,
    fontWeight: '600',
    color: '#64748b',
    textTransform: 'uppercase',
  },
  logContent: {
    flex: 1,
    gap: 4,
  },
  logTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  logSubject: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  logMeta: {
    fontSize: 11,
    color: '#71717a',
  },
});
