import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { FileText, Download, User, Calendar, BookOpen } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function NotesScreen() {
  const [selectedSubject, setSelectedSubject] = useState('All');

  const subjects = ['All', 'Higher Math', 'Physics', 'Chemistry', 'Biology'];

  const notes = [
    {
      id: '1',
      title: 'Calculus Integration Formula Sheet & Solved Examples',
      subject: 'Higher Math',
      uploadedBy: 'Prof. Rafiqul Islam',
      date: '28 Aug 2026',
      fileType: 'PDF',
      fileSize: '2.4 MB',
    },
    {
      id: '2',
      title: 'Rotational Motion Complete Lecture Handout',
      subject: 'Physics',
      uploadedBy: 'Dr. Anwar Hossain',
      date: '25 Aug 2026',
      fileType: 'PDF',
      fileSize: '4.1 MB',
    },
    {
      id: '3',
      title: 'Organic Chemistry Reaction Mechanisms Diagram Book',
      subject: 'Chemistry',
      uploadedBy: 'Tanvir Ahmed',
      date: '22 Aug 2026',
      fileType: 'PDF',
      fileSize: '5.8 MB',
    },
    {
      id: '4',
      title: 'Coordinate Geometry Practice Problem Set with Solutions',
      subject: 'Higher Math',
      uploadedBy: 'Prof. Rafiqul Islam',
      date: '18 Aug 2026',
      fileType: 'PDF',
      fileSize: '1.9 MB',
    },
  ];

  const filteredNotes = notes.filter((n) => {
    if (selectedSubject === 'All') return true;
    return n.subject === selectedSubject;
  });

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Subject Filter Pills */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.subjectRow}
      >
        {subjects.map((sub) => {
          const isSelected = selectedSubject === sub;
          return (
            <TouchableOpacity
              key={sub}
              style={[styles.subPill, isSelected && styles.subPillActive]}
              onPress={() => setSelectedSubject(sub)}
            >
              <Text
                style={[
                  styles.subPillText,
                  isSelected && styles.subPillTextActive,
                ]}
              >
                {sub}
              </Text>
            </TouchableOpacity>
          );
        })}
      </ScrollView>

      {/* Notes List */}
      <View style={styles.list}>
        {filteredNotes.map((note) => (
          <View key={note.id} style={styles.noteCard}>
            <View style={styles.noteTop}>
              <View style={styles.pdfBadge}>
                <FileText size={18} color="#e11d48" />
              </View>
              <View style={styles.noteInfo}>
                <Text style={styles.noteSubject}>{note.subject}</Text>
                <Text style={styles.noteTitle}>{note.title}</Text>
              </View>
            </View>

            <View style={styles.noteMetaRow}>
              <View style={styles.metaCol}>
                <View style={styles.inlineMeta}>
                  <User size={11} color="#64748b" />
                  <Text style={styles.metaAuthor}>{note.uploadedBy}</Text>
                </View>
                <View style={styles.inlineMeta}>
                  <Calendar size={11} color="#64748b" />
                  <Text style={styles.metaDate}>
                    {note.date} • {note.fileSize}
                  </Text>
                </View>
              </View>

              <TouchableOpacity style={styles.downloadBtn} activeOpacity={0.8}>
                <Download size={14} color="#2563eb" />
                <Text style={styles.downloadText}>Download</Text>
              </TouchableOpacity>
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
  subjectRow: {
    gap: 8,
  },
  subPill: {
    paddingHorizontal: 14,
    paddingVertical: 7,
    borderRadius: Radius.sm,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  subPillActive: {
    backgroundColor: '#2563eb',
    borderColor: '#2563eb',
  },
  subPillText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525b',
  },
  subPillTextActive: {
    color: '#ffffff',
  },
  list: {
    gap: Spacing.md,
  },
  noteCard: {
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
  noteTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  pdfBadge: {
    width: 40,
    height: 40,
    borderRadius: 10,
    backgroundColor: '#ffe4e6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  noteInfo: {
    flex: 1,
  },
  noteSubject: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  noteTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
    lineHeight: 18,
  },
  noteMetaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  metaCol: {
    gap: 2,
  },
  inlineMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  metaAuthor: {
    fontSize: 11,
    color: '#475569',
    fontWeight: '500',
  },
  metaDate: {
    fontSize: 10,
    color: '#94a3b8',
  },
  downloadBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: Radius.xs,
  },
  downloadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
});
