import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBadge } from '../../src/components/StatusBadge';
import {
  Calendar,
  Clock,
  MapPin,
  ClipboardList,
  AlertCircle,
  FileCheck,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function ExamsScreen() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');

  const exams = [
    {
      id: '1',
      name: 'Higher Math Model Test 02',
      exam_type: 'Model Test',
      subject: 'Higher Mathematics',
      date: '15 Sep 2026',
      start_time: '10:00 AM',
      duration_minutes: 120,
      venue: 'Main Auditorium, Floor 3',
      status: 'upcoming',
      topics: ['Calculus Integration', 'Coordinate Geometry', 'Vectors'],
    },
    {
      id: '2',
      name: 'Physics Advanced Mechanics Quiz',
      exam_type: 'Quiz Test',
      subject: 'Physics',
      date: '18 Sep 2026',
      start_time: '04:30 PM',
      duration_minutes: 45,
      venue: 'Room 302',
      status: 'upcoming',
      topics: ['Rotational Dynamics', 'Gravitation & Satellite Motion'],
    },
    {
      id: '3',
      name: 'Chemistry Monthly Evaluation',
      exam_type: 'Monthly Test',
      subject: 'Chemistry',
      date: '25 Aug 2026',
      start_time: '02:00 PM',
      duration_minutes: 90,
      venue: 'Room 201',
      status: 'completed',
      topics: ['Organic Functional Groups', 'Isomerism'],
    },
  ];

  const filteredExams = exams.filter((e) => {
    if (filter === 'all') return true;
    return e.status === filter;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Filter Chips */}
      <View style={styles.filterRow}>
        {(['all', 'upcoming', 'completed'] as const).map((f) => (
          <TouchableOpacity
            key={f}
            style={[styles.filterChip, filter === f && styles.filterChipActive]}
            onPress={() => setFilter(f)}
          >
            <Text
              style={[
                styles.filterChipText,
                filter === f && styles.filterChipTextActive,
              ]}
            >
              {f.toUpperCase()}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* Exam Cards */}
      <View style={styles.list}>
        {filteredExams.map((exam) => (
          <View key={exam.id} style={styles.examCard}>
            <View style={styles.examHeader}>
              <View style={styles.examTitleCol}>
                <Text style={styles.examSubject}>{exam.subject}</Text>
                <Text style={styles.examName}>{exam.name}</Text>
              </View>
              <StatusBadge status={exam.status} />
            </View>

            <View style={styles.metaRow}>
              <View style={styles.metaBadge}>
                <Calendar size={12} color="#2563eb" />
                <Text style={styles.metaText}>{exam.date}</Text>
              </View>
              <View style={styles.metaBadge}>
                <Clock size={12} color="#2563eb" />
                <Text style={styles.metaText}>
                  {exam.start_time} ({exam.duration_minutes} mins)
                </Text>
              </View>
            </View>

            <View style={styles.venueRow}>
              <MapPin size={12} color="#64748b" />
              <Text style={styles.venueText}>{exam.venue}</Text>
            </View>

            <View style={styles.topicsBox}>
              <Text style={styles.topicsLabel}>Syllabus Topics:</Text>
              <View style={styles.topicPillsWrap}>
                {exam.topics.map((t, idx) => (
                  <View key={idx} style={styles.topicPill}>
                    <Text style={styles.topicText}>{t}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        ))}
      </View>
    </ScrollView>
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
  filterRow: {
    flexDirection: 'row',
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: Radius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  filterChipActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  filterChipText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#71717a',
  },
  filterChipTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: Spacing.md,
  },
  examCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 3,
    elevation: 1,
    gap: 10,
  },
  examHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  examTitleCol: {
    flex: 1,
    paddingRight: 8,
  },
  examSubject: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  examName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  metaRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  metaBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.xs,
  },
  metaText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#1e40af',
  },
  venueRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  venueText: {
    fontSize: 12,
    color: '#64748b',
  },
  topicsBox: {
    backgroundColor: '#f8fafc',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    gap: 6,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  topicsLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#475569',
  },
  topicPillsWrap: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 6,
  },
  topicPill: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  topicText: {
    fontSize: 11,
    color: '#334155',
    fontWeight: '500',
  },
});
