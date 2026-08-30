import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { StatusBadge } from '../../src/components/StatusBadge';
import {
  ChevronLeft,
  ChevronRight,
  Flame,
  AlertCircle,
} from 'lucide-react-native';
import { Spacing, Radius } from '../../src/constants/theme';

export default function AttendanceScreen() {
  const months = ['May 2026', 'June 2026', 'July 2026', 'August 2026', 'September 2026'];
  const [monthIndex, setMonthIndex] = useState(3);
  const selectedMonth = months[monthIndex];

  const subjectBreakdown = [
    { subject: 'Higher Mathematics', present: 28, total: 30, percentage: 93, color: '#2563eb' },
    { subject: 'Physics (Theory & Lab)', present: 24, total: 28, percentage: 86, color: '#2563eb' },
    { subject: 'Chemistry', present: 22, total: 26, percentage: 85, color: '#2563eb' },
    { subject: 'Biology', present: 19, total: 24, percentage: 79, color: '#f59e0b', isWarning: true },
    { subject: 'English 1st Paper', present: 25, total: 26, percentage: 96, color: '#10b981' },
  ];

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
      <CockpitHeader title="Attendance Cockpit" subtitle="Biometric & faculty tracking · Term 2026" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Streak & Overall Ratio Card */}
        <View style={styles.streakBanner}>
          <View style={styles.streakLeft}>
            <View style={styles.flameCircle}>
              <Flame size={22} color="#f97316" />
            </View>
            <View>
              <Text style={styles.streakTitle}>14 Days Active Streak</Text>
              <Text style={styles.streakSubtitle}>Cumulative: 118 / 134 Sessions</Text>
            </View>
          </View>
          <View style={styles.streakScoreBox}>
            <Text style={styles.streakScore}>87.6%</Text>
            <Text style={styles.streakScoreLabel}>COMPLIANT</Text>
          </View>
        </View>

        {/* 3 Metric Mini Cards */}
        <View style={styles.statsRow}>
          <View style={[styles.miniStat, { borderColor: '#d1fae5' }]}>
            <Text style={[styles.miniStatNum, { color: '#047857' }]}>118</Text>
            <Text style={styles.miniStatLabel}>Present</Text>
          </View>
          <View style={[styles.miniStat, { borderColor: '#fee2e2' }]}>
            <Text style={[styles.miniStatNum, { color: '#b91c1c' }]}>16</Text>
            <Text style={styles.miniStatLabel}>Absent</Text>
          </View>
          <View style={[styles.miniStat, { borderColor: '#fef3c7' }]}>
            <Text style={[styles.miniStatNum, { color: '#b45309' }]}>3</Text>
            <Text style={styles.miniStatLabel}>Late</Text>
          </View>
        </View>

        {/* Subject Breakdown Card */}
        <View style={styles.sectionCard}>
          <View style={styles.sectionHeader}>
            <View>
              <Text style={styles.eyebrow}>SUBJECT DISTRIBUTION</Text>
              <Text style={styles.sectionTitle}>Attendance by Subject</Text>
            </View>
            <Text style={styles.thresholdText}>Min req: 75%</Text>
          </View>

          <View style={styles.subjectList}>
            {subjectBreakdown.map((item) => (
              <View key={item.subject} style={styles.subjectItem}>
                <View style={styles.subjectRowTop}>
                  <Text style={styles.subjectName}>{item.subject}</Text>
                  <Text style={styles.subjectCount}>
                    {item.present}/{item.total} classes ({item.percentage}%)
                  </Text>
                </View>
                <View style={styles.progressBarTrack}>
                  <View
                    style={[
                      styles.progressBarFill,
                      { width: `${item.percentage}%`, backgroundColor: item.color },
                    ]}
                  />
                </View>
              </View>
            ))}
          </View>

          <View style={styles.warningCallout}>
            <AlertCircle size={14} color="#d97706" />
            <Text style={styles.warningCalloutText}>
              Biology attendance is near the minimum threshold (79%). Regular participation recommended.
            </Text>
          </View>
        </View>

        {/* Month Selector Header */}
        <View style={styles.monthHeader}>
          <Text style={styles.sectionTitle}>Daily Attendance Log</Text>
          <View style={styles.monthPill}>
            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => setMonthIndex((prev) => Math.max(0, prev - 1))}
              disabled={monthIndex === 0}
              activeOpacity={0.7}
            >
              <ChevronLeft size={16} color={monthIndex === 0 ? '#cbd5e1' : '#52525b'} />
            </TouchableOpacity>
            <Text style={styles.monthText}>{selectedMonth}</Text>
            <TouchableOpacity
              style={styles.monthBtn}
              onPress={() => setMonthIndex((prev) => Math.min(months.length - 1, prev + 1))}
              disabled={monthIndex === months.length - 1}
              activeOpacity={0.7}
            >
              <ChevronRight size={16} color={monthIndex === months.length - 1 ? '#cbd5e1' : '#52525b'} />
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
    color: '#10b981',
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
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    gap: Spacing.md,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
  },
  eyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
  },
  sectionTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  thresholdText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  subjectList: {
    gap: 12,
  },
  subjectItem: {
    gap: 4,
  },
  subjectRowTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  subjectName: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  subjectCount: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  progressBarTrack: {
    height: 6,
    borderRadius: 3,
    backgroundColor: '#f1f5f9',
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 3,
  },
  warningCallout: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fffbeb',
    padding: 10,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  warningCalloutText: {
    fontSize: 11,
    color: '#92400e',
    flex: 1,
    lineHeight: 16,
  },
  monthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
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
