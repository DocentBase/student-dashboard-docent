import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { FileText, Download, User, Calendar, Search, CheckCircle2 } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function NotesScreen() {
  const [search, setSearch] = useState('');
  const [selectedSubject, setSelectedSubject] = useState('All');
  const [downloadedId, setDownloadedId] = useState<string | null>(null);

  const subjects = ['All', 'Higher Mathematics', 'Physics', 'Chemistry', 'Biology'];

  const notes = [
    {
      id: 'res-01',
      title: 'Differential Calculus: Limits & Continuity',
      subject: 'Higher Mathematics',
      teacher: 'Prof. Tanvir Ahmed',
      fileSize: '3.4 MB',
      format: 'PDF',
      date: '12 Aug 2026',
      downloads: 142,
      description: 'Comprehensive formula sheets, graphical interpretations, and 25 practice problems with solutions.',
    },
    {
      id: 'res-02',
      title: 'Newtonian Mechanics & Planetary Motion',
      subject: 'Physics',
      teacher: 'Dr. Mahmudul Hasan',
      fileSize: '5.8 MB',
      format: 'PDF',
      date: '10 Aug 2026',
      downloads: 189,
      description: 'Lecture slides, derivation of planetary orbital laws, and sample BUET admission questions.',
    },
    {
      id: 'res-03',
      title: 'Organic Chemistry: Reaction Mechanisms',
      subject: 'Chemistry',
      teacher: 'Engr. Rafiqul Islam',
      fileSize: '4.2 MB',
      format: 'PDF',
      date: '08 Aug 2026',
      downloads: 110,
      description: 'Summary charts for SN1/SN2 mechanisms, electrophilic aromatic substitution, and synthesis pathways.',
    },
    {
      id: 'res-04',
      title: 'Cell Biology & Genetics Cheat Sheet',
      subject: 'Biology',
      teacher: 'Dr. Nusrat Jahan',
      fileSize: '2.1 MB',
      format: 'PDF',
      date: '04 Aug 2026',
      downloads: 95,
      description: 'High-yield diagrams of mitosis/meiosis, Mendelian genetics crosses, and short question notes.',
    },
  ];

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(search.toLowerCase()) ||
      note.description.toLowerCase().includes(search.toLowerCase()) ||
      note.teacher.toLowerCase().includes(search.toLowerCase());
    const matchesSubject = selectedSubject === 'All' || note.subject === selectedSubject;
    return matchesSearch && matchesSubject;
  });

  const handleDownload = (id: string) => {
    setDownloadedId(id);
    setTimeout(() => {
      setDownloadedId(null);
    }, 2500);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Live Search Bar */}
      <View style={styles.searchBarWrap}>
        <Search size={16} color="#94a3b8" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search resources, topics, formulas..."
          placeholderTextColor="#94a3b8"
          value={search}
          onChangeText={setSearch}
        />
      </View>

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

      {/* Resource Count Meta */}
      <Text style={styles.countText}>
        Showing {filteredNotes.length} verified study materials
      </Text>

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
              <View style={styles.formatPill}>
                <Text style={styles.formatPillText}>{note.format}</Text>
              </View>
            </View>

            <Text style={styles.descriptionText}>{note.description}</Text>

            <View style={styles.noteMetaRow}>
              <View style={styles.metaCol}>
                <View style={styles.inlineMeta}>
                  <User size={11} color="#64748b" />
                  <Text style={styles.metaAuthor}>{note.teacher}</Text>
                </View>
                <View style={styles.inlineMeta}>
                  <Calendar size={11} color="#64748b" />
                  <Text style={styles.metaDate}>
                    {note.date} • {note.fileSize}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                style={[
                  styles.downloadBtn,
                  downloadedId === note.id && styles.downloadBtnDone,
                ]}
                onPress={() => handleDownload(note.id)}
                activeOpacity={0.8}
              >
                {downloadedId === note.id ? (
                  <>
                    <CheckCircle2 size={13} color="#047857" />
                    <Text style={styles.downloadTextDone}>Saved ✓</Text>
                  </>
                ) : (
                  <>
                    <Download size={13} color="#2563eb" />
                    <Text style={styles.downloadText}>Download</Text>
                  </>
                )}
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
    gap: Spacing.md,
  },
  searchBarWrap: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: Radius.md,
    paddingHorizontal: 14,
    height: 44,
  },
  searchInput: {
    flex: 1,
    fontSize: 13,
    color: '#0f172a',
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
  countText: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
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
    gap: 10,
  },
  noteTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  pdfBadge: {
    width: 38,
    height: 38,
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
  formatPill: {
    backgroundColor: '#f1f5f9',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: Radius.xs,
  },
  formatPillText: {
    fontSize: 10,
    fontFamily: 'monospace',
    fontWeight: '700',
    color: '#475569',
  },
  descriptionText: {
    fontSize: 12,
    color: '#64748b',
    lineHeight: 17,
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
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: Radius.xs,
  },
  downloadBtnDone: {
    backgroundColor: '#ecfdf5',
  },
  downloadText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  downloadTextDone: {
    fontSize: 11,
    fontWeight: '700',
    color: '#047857',
  },
});
