import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Calendar } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function NoticesScreen() {
  const [selectedCategory, setSelectedCategory] = useState<'All' | 'Important' | 'Academic' | 'Holiday' | 'Exam'>('All');

  const categories = ['All', 'Important', 'Academic', 'Holiday', 'Exam'] as const;

  const notices = [
    {
      id: '1',
      title: 'Upcoming Model Test 02 Schedule Published',
      category: 'Exam',
      status: 'holiday',
      date: '30 Aug 2026',
      author: 'Academic Coordination Cell',
      body: 'The second round of model examinations for HSC 2026 batches will commence from September 15th. Students are requested to collect their admit cards from the office counter or download from the portal before 10th September.',
    },
    {
      id: '2',
      title: 'Special Extra Class on Vector Calculus Integration',
      category: 'Academic',
      status: 'upcoming',
      date: '28 Aug 2026',
      author: 'Prof. Rafiqul Islam',
      body: 'An intensive 2-hour problem-solving session on Vector Integration has been arranged this Friday from 09:00 AM to 11:00 AM in Room 302. Attendance is highly encouraged.',
    },
    {
      id: '3',
      title: 'Campus Closure on Account of National Holiday',
      category: 'Holiday',
      status: 'holiday',
      date: '24 Aug 2026',
      author: 'Administration Office',
      body: 'All physical batches and coaching campus branches will remain closed on Tuesday due to the national holiday. Classes will resume as per regular routine the next day.',
    },
  ];

  const filteredNotices = notices.filter((n) => {
    if (selectedCategory === 'All') return true;
    return n.category === selectedCategory;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Category Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.catRow}
      >
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <TouchableOpacity
              key={cat}
              style={[styles.catPill, isSelected && styles.catPillActive]}
              onPress={() => setSelectedCategory(cat)}
            >
              <Text
                style={[
                  styles.catPillText,
                  isSelected && styles.catPillTextActive,
                ]}
              >
                {cat}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Notices List */}
      <View style={styles.list}>
        {filteredNotices.map((notice) => (
          <View key={notice.id} style={styles.noticeCard}>
            <View style={styles.noticeHeader}>
              <StatusBadge status={notice.status} label={notice.category} />
              <View style={styles.dateWrap}>
                <Calendar size={11} color="#94a3b8" />
                <Text style={styles.dateText}>{notice.date}</Text>
              </View>
            </View>

            <Text style={styles.title}>{notice.title}</Text>
            <Text style={styles.body}>{notice.body}</Text>

            <View style={styles.footer}>
              <Text style={styles.authorText}>Issued by: {notice.author}</Text>
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
  catRow: {
    gap: 8,
  },
  catPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  catPillActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  catPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525b',
  },
  catPillTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: Spacing.md,
  },
  noticeCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
    gap: 8,
  },
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  dateWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  dateText: {
    fontSize: 11,
    color: '#94a3b8',
  },
  title: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    lineHeight: 20,
  },
  body: {
    fontSize: 13,
    color: '#52525b',
    lineHeight: 18,
  },
  footer: {
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
    marginTop: 4,
  },
  authorText: {
    fontSize: 11,
    color: '#64748b',
    fontStyle: 'italic',
  },
});
