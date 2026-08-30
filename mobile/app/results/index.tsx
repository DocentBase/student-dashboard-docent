import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Trophy, Award, CheckCircle, TrendingUp } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function ResultsScreen() {
  const resultCards = [
    {
      id: '1',
      examTitle: 'Higher Mathematics Mid-Term Evaluation',
      subject: 'Higher Mathematics',
      obtainedMarks: 94,
      totalMarks: 100,
      grade: 'A+',
      gpa: 5.0,
      position: 2,
      isPassed: true,
      teacherRemarks: 'Brilliant conceptual clarity in Calculus and Matrix algebra.',
      publishedDate: '28 Aug 2026',
    },
    {
      id: '2',
      examTitle: 'Physics Mechanics Standard Test',
      subject: 'Physics',
      obtainedMarks: 88,
      totalMarks: 100,
      grade: 'A+',
      gpa: 5.0,
      position: 5,
      isPassed: true,
      teacherRemarks: 'Strong problem-solving speed. Focus slightly more on theoretical proofs.',
      publishedDate: '20 Aug 2026',
    },
    {
      id: '3',
      examTitle: 'Chemistry Organic Reactions Assessment',
      subject: 'Chemistry',
      obtainedMarks: 82,
      totalMarks: 100,
      grade: 'A',
      gpa: 4.75,
      position: 8,
      isPassed: true,
      teacherRemarks: 'Good performance. Revise reaction mechanisms.',
      publishedDate: '12 Aug 2026',
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Top Academic Banner */}
      <View style={styles.summaryBanner}>
        <View style={styles.summaryLeft}>
          <View style={styles.trophyCircle}>
            <Trophy size={24} color="#f59e0b" />
          </View>
          <View>
            <Text style={styles.bannerTitle}>Term Performance: Top 5%</Text>
            <Text style={styles.bannerSubtitle}>Cumulative GPA: 4.92 / 5.00</Text>
          </View>
        </View>
      </View>

      {/* Results List */}
      <View style={styles.list}>
        {resultCards.map((res) => (
          <View key={res.id} style={styles.resultCard}>
            <View style={styles.cardHeader}>
              <View style={styles.headerTextCol}>
                <Text style={styles.subjectText}>{res.subject}</Text>
                <Text style={styles.examTitle}>{res.examTitle}</Text>
              </View>
              <View style={styles.gradeBadge}>
                <Text style={styles.gradeText}>{res.grade}</Text>
              </View>
            </View>

            <View style={styles.scoreRow}>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>Obtained Marks</Text>
                <Text style={styles.scoreValue}>
                  {res.obtainedMarks} <Text style={styles.totalMarks}>/ {res.totalMarks}</Text>
                </Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>Class Position</Text>
                <Text style={styles.scoreValue}>#{res.position}</Text>
              </View>
              <View style={styles.scoreBox}>
                <Text style={styles.scoreLabel}>GPA Score</Text>
                <Text style={styles.scoreValue}>{res.gpa.toFixed(2)}</Text>
              </View>
            </View>

            {res.teacherRemarks && (
              <View style={styles.remarksBox}>
                <Text style={styles.remarksLabel}>Instructor Feedback:</Text>
                <Text style={styles.remarksText}>"{res.teacherRemarks}"</Text>
              </View>
            )}

            <View style={styles.cardFooter}>
              <Text style={styles.publishedDate}>Published: {res.publishedDate}</Text>
              <StatusBadge status="present" label="Verified Passed" />
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
  summaryBanner: {
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
  },
  summaryLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  trophyCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  bannerTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  bannerSubtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  list: {
    gap: Spacing.md,
  },
  resultCard: {
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
    gap: 12,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  headerTextCol: {
    flex: 1,
    paddingRight: 8,
  },
  subjectText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  examTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  gradeBadge: {
    width: 38,
    height: 38,
    borderRadius: 10,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  gradeText: {
    fontSize: 15,
    fontWeight: '800',
    color: '#047857',
  },
  scoreRow: {
    flexDirection: 'row',
    backgroundColor: '#f8fafc',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  scoreBox: {
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
    marginBottom: 2,
  },
  scoreValue: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalMarks: {
    fontSize: 12,
    color: '#94a3b8',
    fontWeight: '500',
  },
  remarksBox: {
    backgroundColor: '#eff6ff',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  remarksLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: '#1e40af',
    marginBottom: 2,
  },
  remarksText: {
    fontSize: 12,
    color: '#1e3a8a',
    fontStyle: 'italic',
    lineHeight: 16,
  },
  cardFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 4,
  },
  publishedDate: {
    fontSize: 11,
    color: '#94a3b8',
  },
});
