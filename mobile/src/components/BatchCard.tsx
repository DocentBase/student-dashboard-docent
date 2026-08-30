import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { User, ChevronRight } from 'lucide-react-native';
import { Batch } from '../types';
import { StatusBadge } from './StatusBadge';
import { Radius, Spacing } from '../constants/theme';

interface BatchCardProps {
  batch: Batch;
  onPress?: () => void;
}

export const BatchCard: React.FC<BatchCardProps> = ({ batch, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.header}>
        <View style={styles.titleCol}>
          <Text style={styles.centerName}>
            {batch.coaching_center_name || 'DocentBase Coaching Academy'}
          </Text>
          <Text style={styles.batchName}>{batch.name}</Text>
        </View>
        <StatusBadge status={batch.status || 'active'} />
      </View>

      <View style={styles.metaGrid}>
        {batch.subject && (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Subject</Text>
            <Text style={styles.metaValue}>{batch.subject}</Text>
          </View>
        )}
        {batch.timing && (
          <View style={styles.metaItem}>
            <Text style={styles.metaLabel}>Schedule</Text>
            <Text style={styles.metaValue}>{batch.timing}</Text>
          </View>
        )}
      </View>

      <View style={styles.footer}>
        <View style={styles.teacherInfo}>
          <View style={styles.teacherAvatar}>
            <User size={12} color="#ffffff" />
          </View>
          <Text style={styles.teacherName}>
            {batch.assigned_teacher || 'Assigned Instructor'}
          </Text>
        </View>

        <View style={styles.footerRight}>
          {batch.monthly_fee && (
            <Text style={styles.feeText}>৳ {batch.monthly_fee.toLocaleString()}/mo</Text>
          )}
          <ChevronRight size={16} color="#94a3b8" />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    marginBottom: Spacing.md,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },
  titleCol: {
    flex: 1,
    paddingRight: 8,
  },
  centerName: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    marginBottom: 2,
  },
  batchName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  metaGrid: {
    backgroundColor: '#f8fafc',
    borderRadius: Radius.sm,
    padding: Spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: '#f1f5f9',
  },
  metaItem: {
    flex: 1,
  },
  metaLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  metaValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginTop: 2,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: Spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  teacherAvatar: {
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: '#3b82f6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  teacherName: {
    fontSize: 12,
    color: '#475569',
    fontWeight: '500',
  },
  footerRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  feeText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
});
