import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { Clock, MapPin, User, Sparkles } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function RoutineScreen() {
  const [activeDay, setActiveDay] = useState('Saturday');

  const days = ['Saturday', 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'];

  const weeklySchedule: Record<
    string,
    Array<{
      id: string;
      time: string;
      subject: string;
      teacher: string;
      room: string;
      type: string;
      color: string;
    }>
  > = {
    Saturday: [
      {
        id: 'sat-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Higher Mathematics',
        teacher: 'Prof. Tanvir Ahmed',
        room: 'Room 402',
        type: 'Lecture',
        color: '#2563eb',
      },
      {
        id: 'sat-2',
        time: '11:00 AM - 12:30 PM',
        subject: 'Physics (Theory)',
        teacher: 'Dr. Mahmudul Hasan',
        room: 'Room 304',
        type: 'Lecture',
        color: '#059669',
      },
      {
        id: 'sat-3',
        time: '02:00 PM - 04:00 PM',
        subject: 'Physics Lab Session',
        teacher: 'Dr. Mahmudul Hasan',
        room: 'Lab A',
        type: 'Practical',
        color: '#d97706',
      },
    ],
    Sunday: [
      {
        id: 'sun-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Chemistry (Organic)',
        teacher: 'Engr. Rafiqul Islam',
        room: 'Room 301',
        type: 'Lecture',
        color: '#2563eb',
      },
      {
        id: 'sun-2',
        time: '11:00 AM - 12:30 PM',
        subject: 'Biology',
        teacher: 'Dr. Nusrat Jahan',
        room: 'Room 205',
        type: 'Lecture',
        color: '#059669',
      },
    ],
    Monday: [
      {
        id: 'mon-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Higher Mathematics',
        teacher: 'Prof. Tanvir Ahmed',
        room: 'Room 402',
        type: 'Problem Solving',
        color: '#2563eb',
      },
      {
        id: 'mon-2',
        time: '11:00 AM - 12:30 PM',
        subject: 'English 1st Paper',
        teacher: 'Ms. Farhana Haque',
        room: 'Room 102',
        type: 'Interactive',
        color: '#8b5cf6',
      },
    ],
    Tuesday: [
      {
        id: 'tue-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Physics (Mechanics)',
        teacher: 'Dr. Mahmudul Hasan',
        room: 'Room 304',
        type: 'Lecture',
        color: '#059669',
      },
      {
        id: 'tue-2',
        time: '11:00 AM - 12:30 PM',
        subject: 'Chemistry Lab',
        teacher: 'Engr. Rafiqul Islam',
        room: 'Chem Lab 2',
        type: 'Practical',
        color: '#d97706',
      },
    ],
    Wednesday: [
      {
        id: 'wed-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Higher Mathematics (Calculus)',
        teacher: 'Prof. Tanvir Ahmed',
        room: 'Room 402',
        type: 'Lecture',
        color: '#2563eb',
      },
      {
        id: 'wed-2',
        time: '11:00 AM - 12:30 PM',
        subject: 'Biology Discussion',
        teacher: 'Dr. Nusrat Jahan',
        room: 'Room 205',
        type: 'Lecture',
        color: '#059669',
      },
    ],
    Thursday: [
      {
        id: 'thu-1',
        time: '09:00 AM - 10:30 AM',
        subject: 'Weekly Model Test',
        teacher: 'Faculty Proctor Team',
        room: 'Auditorium Hall',
        type: 'Assessment',
        color: '#e11d48',
      },
    ],
  };

  const currentSlots = weeklySchedule[activeDay] || [];

  return (
    <View style={styles.container}>
      <CockpitHeader title="Weekly Class Routine" subtitle="Faculty schedules, halls & laboratory slots" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Day Selector Pill Bar */}
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.daySelectorRow}
        >
          {days.map((day) => {
            const isSelected = activeDay === day;
            return (
              <TouchableOpacity
                key={day}
                style={[styles.dayPill, isSelected && styles.dayPillActive]}
                onPress={() => setActiveDay(day)}
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
            <Text style={styles.nowBadgeText}>{activeDay.toUpperCase()} TIMETABLE</Text>
          </View>
          <Text style={styles.nowTitle}>
            {currentSlots.length} Classes Scheduled for {activeDay}
          </Text>
          <Text style={styles.nowSubtitle}>
            First session starts at {currentSlots[0]?.time.split(' - ')[0]} in {currentSlots[0]?.room}.
          </Text>
        </View>

        {/* Schedule Timeline Slots */}
        <View style={styles.timelineList}>
          {currentSlots.map((slot) => (
            <View key={slot.id} style={styles.slotCard}>
              <View style={[styles.colorStrip, { backgroundColor: slot.color }]} />

              <View style={styles.slotMain}>
                <View style={styles.slotHeader}>
                  <View style={styles.timeTag}>
                    <Clock size={12} color="#2563eb" />
                    <Text style={styles.timeTagText}>{slot.time}</Text>
                  </View>
                  <View style={styles.typeBadge}>
                    <Text style={styles.typeBadgeText}>{slot.type}</Text>
                  </View>
                </View>

                <Text style={styles.subjectName}>{slot.subject}</Text>

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
  typeBadge: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: Radius.xs,
  },
  typeBadgeText: {
    fontSize: 10,
    fontWeight: '700',
    color: '#475569',
  },
  subjectName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
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
});
