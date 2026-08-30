import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
} from 'react-native';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { BatchCard } from '../../src/components/BatchCard';
import { Button } from '../../src/components/Button';
import { Batch } from '../../src/types';
import {
  BookOpen,
  Plus,
  Building,
  Sparkles,
  X,
  Search,
  CheckCircle2,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function CoachingScreen() {
  const [modalVisible, setModalVisible] = useState(false);
  const [batchCode, setBatchCode] = useState('');
  const [searchSuccess, setSearchSuccess] = useState(false);

  const enrolledBatches: Batch[] = [
    {
      id: '1',
      organization_id: 'org_1',
      name: 'Batch Alpha (HSC 2026 Core)',
      coaching_center_name: 'DocentBase Coaching Academy - Dhanmondi',
      subject: 'Higher Mathematics & Calculus',
      timing: 'Sat, Mon, Wed • 04:30 PM - 06:00 PM',
      assigned_teacher: 'Prof. Rafiqul Islam',
      monthly_fee: 1500,
      status: 'active',
      total_students: 45,
    },
    {
      id: '2',
      organization_id: 'org_1',
      name: 'Batch Beta (Engineering Physics)',
      coaching_center_name: 'DocentBase Coaching Academy - Dhanmondi',
      subject: 'Physics Advanced Mechanics & Waves',
      timing: 'Sun, Tue, Thu • 06:00 PM - 07:30 PM',
      assigned_teacher: 'Dr. Anwar Hossain',
      monthly_fee: 1200,
      status: 'active',
      total_students: 38,
    },
    {
      id: '3',
      organization_id: 'org_2',
      name: 'Batch Gamma (Medical Chemistry)',
      coaching_center_name: 'Excellence Science Academy - Farmgate',
      subject: 'Organic Chemistry & Biochemistry',
      timing: 'Fri, Sat • 08:00 AM - 10:00 AM',
      assigned_teacher: 'Tanvir Ahmed',
      monthly_fee: 1000,
      status: 'active',
      total_students: 50,
    },
  ];

  return (
    <View style={styles.container}>
      <CockpitHeader title="My Coaching & Batches" subtitle="Active enrollments & coaching centers" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Coaching Hub Banner */}
        <View style={styles.hubBanner}>
          <View style={styles.hubLeft}>
            <View style={styles.hubIconBox}>
              <Building size={22} color="#2563eb" />
            </View>
            <View>
              <Text style={styles.hubTitle}>2 Coaching Centers</Text>
              <Text style={styles.hubSubtitle}>3 Enrolled Active Batches</Text>
            </View>
          </View>
          <Button
            title="Join Batch"
            icon={Plus}
            size="sm"
            onPress={() => setModalVisible(true)}
          />
        </View>

        {/* Enrolled Batches List */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Enrolled Batches</Text>
        </View>

        {enrolledBatches.map((batch) => (
          <BatchCard key={batch.id} batch={batch} />
        ))}
      </ScrollView>

      {/* Join Batch Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Join New Batch</Text>
              <TouchableOpacity
                style={styles.closeBtn}
                onPress={() => {
                  setModalVisible(false);
                  setSearchSuccess(false);
                  setBatchCode('');
                }}
              >
                <X size={18} color="#71717a" />
              </TouchableOpacity>
            </View>

            <Text style={styles.modalSubtitle}>
              Enter the unique 6-digit batch invitation code provided by your coaching center or teacher.
            </Text>

            <View style={styles.inputWrap}>
              <TextInput
                style={styles.batchInput}
                placeholder="e.g. MATH-2026"
                placeholderTextColor="#94a3b8"
                value={batchCode}
                onChangeText={setBatchCode}
                autoCapitalize="characters"
              />
            </View>

            {searchSuccess && (
              <View style={styles.successBanner}>
                <CheckCircle2 size={16} color="#047857" />
                <Text style={styles.successText}>
                  Batch found: Higher Math Model Test 2026. Join request submitted!
                </Text>
              </View>
            )}

            <Button
              title={searchSuccess ? "Done" : "Look Up & Send Request"}
              onPress={() => {
                if (!searchSuccess) {
                  setSearchSuccess(true);
                } else {
                  setModalVisible(false);
                  setSearchSuccess(false);
                  setBatchCode('');
                }
              }}
              size="md"
              style={{ marginTop: Spacing.md }}
            />
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
  hubBanner: {
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
    shadowRadius: 3,
    elevation: 1,
  },
  hubLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  hubIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#dbeafe',
  },
  hubTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  hubSubtitle: {
    fontSize: 12,
    color: '#71717a',
    marginTop: 2,
  },
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    padding: Spacing.xl,
    paddingBottom: Spacing.xxl * 2,
  },
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
  },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalSubtitle: {
    fontSize: 13,
    color: '#71717a',
    lineHeight: 18,
    marginBottom: Spacing.lg,
  },
  inputWrap: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: Radius.md,
    backgroundColor: '#f8fafc',
    paddingHorizontal: 16,
    height: 48,
    justifyContent: 'center',
  },
  batchInput: {
    fontSize: 16,
    fontWeight: '600',
    color: '#0f172a',
  },
  successBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#ecfdf5',
    padding: 12,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    marginTop: Spacing.md,
  },
  successText: {
    fontSize: 12,
    color: '#047857',
    fontWeight: '500',
    flex: 1,
  },
});
