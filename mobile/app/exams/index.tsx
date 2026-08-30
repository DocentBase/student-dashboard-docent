import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
} from 'react-native';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Button } from '../../src/components/Button';
import {
  Calendar,
  Clock,
  MapPin,
  BookOpen,
  X,
  Printer,
  CheckCircle2,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function ExamsScreen() {
  const [filter, setFilter] = useState<'all' | 'upcoming' | 'completed'>('all');
  const [selectedExam, setSelectedExam] = useState<any | null>(null);
  const [admitSlipDownloaded, setAdmitSlipDownloaded] = useState(false);

  const exams = [
    {
      id: '1',
      title: 'HSC Higher Math Mid-Term',
      subject: 'Higher Mathematics (Paper 1)',
      date: '24 Aug 2026',
      time: '10:00 AM - 12:30 PM',
      duration_minutes: 150,
      venue: 'Auditorium Hall A (Desk 42)',
      totalMarks: 100,
      status: 'upcoming',
      syllabus: 'Calculus (Differentiation & Integration), Matrix, Vectors',
      topics: ['Calculus Integration', 'Coordinate Geometry', 'Vectors'],
    },
    {
      id: '2',
      title: 'Physics Mechanics & Waves Test',
      subject: 'Physics (Paper 1)',
      date: '28 Aug 2026',
      time: '11:00 AM - 12:30 PM',
      duration_minutes: 90,
      venue: 'Science Building Room 304',
      totalMarks: 50,
      status: 'upcoming',
      syllabus: 'Newtonian Mechanics, Work Power & Energy, Simple Harmonic Motion',
      topics: ['Rotational Dynamics', 'Gravitation & Satellite Motion'],
    },
    {
      id: '3',
      title: 'Chemistry Organic Reactions Assessment',
      subject: 'Chemistry (Paper 2)',
      date: '02 Sep 2026',
      time: '09:30 AM - 11:30 AM',
      duration_minutes: 120,
      venue: 'Chemistry Lab Annex',
      totalMarks: 75,
      status: 'completed',
      syllabus: 'Hydrocarbons, Alkyl Halides, Carbonyl Compounds',
      topics: ['Organic Functional Groups', 'Isomerism'],
    },
  ];

  const filteredExams = exams.filter((e) => {
    if (filter === 'all') return true;
    return e.status === filter;
  });

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* KPI Cards */}
        <View style={styles.kpiRow}>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>NEXT EXAM</Text>
            <Text style={styles.kpiValue}>7 Days</Text>
            <Text style={styles.kpiSub}>Math Mid-Term</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>TERM TESTS</Text>
            <Text style={styles.kpiValue}>4 Tests</Text>
            <Text style={styles.kpiSub}>2 Completed</Text>
          </View>
          <View style={styles.kpiCard}>
            <Text style={styles.kpiLabel}>AVERAGE</Text>
            <Text style={styles.kpiValue}>88.5%</Text>
            <Text style={styles.kpiSub}>Top Decile</Text>
          </View>
        </View>

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
                  <Text style={styles.examName}>{exam.title}</Text>
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
                    {exam.time} ({exam.duration_minutes}m)
                  </Text>
                </View>
              </View>

              <View style={styles.venueRow}>
                <MapPin size={12} color="#64748b" />
                <Text style={styles.venueText}>{exam.venue}</Text>
              </View>

              <View style={styles.syllabusBox}>
                <BookOpen size={13} color="#2563eb" />
                <Text style={styles.syllabusText}>
                  <Text style={{ fontWeight: '700' }}>Syllabus: </Text>
                  {exam.syllabus}
                </Text>
              </View>

              <View style={styles.actionBtnRow}>
                <Button
                  title="View Blueprint"
                  variant="secondary"
                  size="sm"
                  onPress={() => {
                    setSelectedExam(exam);
                    setAdmitSlipDownloaded(false);
                  }}
                  style={{ flex: 1 }}
                />
                <Button
                  title="Admit Card"
                  size="sm"
                  onPress={() => {
                    setSelectedExam(exam);
                    setAdmitSlipDownloaded(true);
                  }}
                  style={{ flex: 1 }}
                />
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* Blueprint & Admit Card Modal */}
      <Modal
        visible={!!selectedExam}
        transparent
        animationType="slide"
        onRequestClose={() => setSelectedExam(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalEyebrow}>EXAMINATION BLUEPRINT</Text>
                <Text style={styles.modalTitle}>{selectedExam?.title}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setSelectedExam(null)}
              >
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalContent}>
              <View style={styles.modalInfoBox}>
                <Text style={styles.modalInfoTitle}>Schedule & Venue</Text>
                <Text style={styles.modalInfoText}>
                  {selectedExam?.date} • {selectedExam?.time}
                </Text>
                <Text style={styles.modalInfoText}>{selectedExam?.venue}</Text>
              </View>

              <View style={styles.modalInfoBox}>
                <Text style={styles.modalInfoTitle}>Curriculum Outline</Text>
                <Text style={styles.modalInfoText}>{selectedExam?.syllabus}</Text>
              </View>

              {admitSlipDownloaded && (
                <View style={styles.admitSuccessBox}>
                  <CheckCircle2 size={16} color="#047857" />
                  <Text style={styles.admitSuccessText}>
                    Digital Admit Card Verified & Ready for Entry.
                  </Text>
                </View>
              )}
            </View>

            <View style={styles.modalActions}>
              <Button
                title="Close"
                variant="secondary"
                size="md"
                onPress={() => setSelectedExam(null)}
                style={{ flex: 1 }}
              />
              <Button
                title={admitSlipDownloaded ? 'Admit Card Ready' : 'Print Admit Slip'}
                icon={Printer}
                size="md"
                onPress={() => setAdmitSlipDownloaded(true)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>
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
  kpiRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
  },
  kpiCard: {
    flex: 1,
    backgroundColor: '#ffffff',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    alignItems: 'center',
    gap: 2,
  },
  kpiLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  kpiValue: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  kpiSub: {
    fontSize: 10,
    color: '#64748b',
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
  syllabusBox: {
    backgroundColor: '#f8fafc',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 8,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  syllabusText: {
    fontSize: 11,
    color: '#334155',
    flex: 1,
    lineHeight: 16,
  },
  actionBtnRow: {
    flexDirection: 'row',
    gap: 8,
    paddingTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalSheet: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    gap: Spacing.lg,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  modalEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.8,
  },
  modalTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContent: {
    gap: Spacing.md,
  },
  modalInfoBox: {
    backgroundColor: '#f8fafc',
    padding: Spacing.md,
    borderRadius: Radius.md,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    gap: 4,
  },
  modalInfoTitle: {
    fontSize: 11,
    fontWeight: '700',
    color: '#334155',
    textTransform: 'uppercase',
  },
  modalInfoText: {
    fontSize: 12,
    color: '#52525b',
  },
  admitSuccessBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#a7f3d0',
  },
  admitSuccessText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '600',
    flex: 1,
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
