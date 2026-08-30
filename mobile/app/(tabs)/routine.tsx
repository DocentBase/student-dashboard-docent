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
import { Clock, MapPin, User, Sparkles, Coffee } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function RoutineScreen() {
  const [selectedDay, setSelectedDay] = useState('Today');

  const days = ['Today', 'Sat', 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri'];

  const scheduleSlots = [
    {
      id: '1',
      startTime: '04:30 PM',
      endTime: '05:45 PM',
      subject: 'Higher Mathematics',
      teacher: 'Prof. Rafiqul Islam',
      room: 'Room 302 (North Wing)',
      batch: 'Batch Alpha (HSC 2026)',
      status: 'upcoming',
      color: '#2563eb',
    },
    {
      id: '2',
      isBreak: true,
      startTime: '05:45 PM',
      endTime: '06:00 PM',
      title: 'Prayer & Short Refreshment Break',
    },
    {
      id: '3',
      startTime: '06:00 PM',
      endTime: '07:15 PM',
      subject: 'Physics Advanced Mechanics',
      teacher: 'Dr. Anwar Hossain',
      room: 'Lab Room 104',
      batch: 'Batch Beta (Engineering Focus)',
      status: 'upcoming',
      color: '#059669',
    },
    {
      id: '4',
      startTime: '07:30 PM',
      endTime: '08:45 PM',
      subject: 'Chemistry Organic Reactions',
      teacher: 'Tanvir Ahmed',
      room: 'Room 201',
      batch: 'Batch Gamma',
      status: 'upcoming',
      color: '#d97706',
    },
  ];

  return (
    <View style={styles.container}>
      <CockpitHeader title="Class Routine" subtitle="Weekly timetable & lecture schedule" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Day Selector Pill Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelectorRow}
        >
          {days.map((day) => {
            const isSelected = selectedDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayPill, isSelected && styles.dayPillActive]}
                onPress={() => setSelectedDay(day)}
                activeOpacity={0.8}
              >
                <Text
                  style={[
                    styles.dayPillText,
                    isSelected && styles.dayPillTextActive,
                  ]}
                >
                  {day}
                </Text>
              </TouchableOpacity>
            );
          })}
        </ScrollView>

        {/* Active Class Highlight Banner */}
        <View style={styles.nowCard}>
          <View style={styles.nowBadge}>
            <Sparkles size={12} color="#2563eb" />
            <Text style={styles.nowBadgeText}>TIMETABLE STATUS</Text>
          </View>
          <Text style={styles.nowTitle}>3 Classes Scheduled for Today</Text>
          <Text style={styles.nowSubtitle}>
            Your first class starts at 04:30 PM in Room 302.
          </Text>
        </View>

        {/* Schedule Timeline Slots */}
        <View style={styles.timelineList}>
          {scheduleSlots.map((slot) => {
            if (slot.isBreak) {
              return (
                <View key={slot.id} style={styles.breakCard}>
                  <Coffee size={16} color="#b45309" />
                  <View style={styles.breakTextCol}>
                    <Text style={styles.breakTitle}>{slot.title}</Text>
                    <Text style={styles.breakTime}>
                      {slot.startTime} - {slot.endTime} (15 mins)
                    </Text>
                  </View>
                </View>
              );
            }

            return (
              <View key={slot.id} style={styles.slotCard}>
                <View
                  style={[styles.colorStrip, { backgroundColor: slot.color }]}
                />

                <View style={styles.slotMain}>
                  <View style={styles.slotHeader}>
                    <View style={styles.timeTag}>
                      <Clock size={12} color="#2563eb" />
                      <Text style={styles.timeTagText}>
                        {slot.startTime} - {slot.endTime}
                      </Text>
                    </View>
                    <StatusBadge status={slot.status || 'upcoming'} />
                  </View>

                  <Text style={styles.subjectName}>{slot.subject}</Text>
                  <Text style={styles.batchCode}>{slot.batch}</Text>

                  <View style={styles.slotFooter}>
                    <View style={styles.footerItem}>
                      <User size={12} color="#64748b" />
                      <Text style={styles.footerText}>{slot.teacher}</Text>
                    </View>
                    <View style={styles.footerItem}>
                      <MapPin size={12} color="#64748b" />
                      <Text style={styles.footerText}>{slot.room}</Text>
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
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
  daySelectorRow: {
    gap: 8,
    paddingVertical: 2,
  },
  dayPill: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: Radius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  dayPillActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  dayPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525b',
  },
  dayPillTextActive: {
    color: '#ffffff',
  },
  nowCard: {
    backgroundColor: '#eff6ff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  nowBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  nowBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
  nowTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#1e3a8a',
    marginBottom: 2,
  },
  nowSubtitle: {
    fontSize: 12,
    color: '#3b82f6',
  },
  timelineList: {
    gap: Spacing.md,
  },
  slotCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    flexDirection: 'row',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
  },
  colorStrip: {
    width: 6,
  },
  slotMain: {
    flex: 1,
    padding: Spacing.lg,
    gap: 6,
  },
  slotHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  timeTag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  timeTagText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#334155',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  batchCode: {
    fontSize: 11,
    color: '#64748b',
    fontWeight: '500',
  },
  slotFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: 12,
    marginTop: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  footerItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  footerText: {
    fontSize: 11,
    color: '#475569',
  },
  breakCard: {
    backgroundColor: '#fffbeb',
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  breakTextCol: {
    flex: 1,
  },
  breakTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: '#92400e',
  },
  breakTime: {
    fontSize: 11,
    color: '#b45309',
    marginTop: 1,
  },
});
