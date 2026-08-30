import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Modal,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { BatchCard } from '../../src/components/BatchCard';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Button } from '../../src/components/Button';
import { Batch, CoachingCenter } from '../../src/types';
import {
  GraduationCap,
  Building2,
  Key,
  Plus,
  Search,
  CheckCircle2,
  Clock,
  XCircle,
  AlertTriangle,
  MapPin,
  Phone,
  Mail,
  User,
  DollarSign,
  Calendar,
  BookOpen,
  ArrowRight,
  ChevronLeft,
  X,
  Sparkles,
  Trash2,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

type MainTab = 'batches' | 'centers' | 'join';
type JoinStep = 'enter_key' | 'preview' | 'form' | 'success';

interface JoinRequest {
  id: string;
  batch_name: string;
  org_name: string;
  batch_subject: string;
  batch_timing: string;
  status: 'pending' | 'approved' | 'rejected' | 'withdrawn';
  created_at: string;
}

export default function CoachingScreen() {
  const [activeTab, setActiveTab] = useState<MainTab>('batches');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Join Flow State
  const [joinStep, setJoinStep] = useState<JoinStep>('enter_key');
  const [joinKey, setJoinKey] = useState('');
  const [joinLoading, setJoinLoading] = useState(false);
  const [joinError, setJoinError] = useState('');
  const [formInstitution, setFormInstitution] = useState('');
  const [formClass, setFormClass] = useState('');
  const [formSection, setFormSection] = useState('');
  const [formShift, setFormShift] = useState('');
  const [formMessage, setFormMessage] = useState('');

  // Selected Batch Detail Modal State
  const [selectedBatch, setSelectedBatch] = useState<Batch | null>(null);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [isTransferModalOpen, setIsTransferModalOpen] = useState(false);
  const [transferSuccess, setTransferSuccess] = useState(false);

  // Requests State
  const [requests, setRequests] = useState<JoinRequest[]>([
    {
      id: 'req-01',
      batch_name: 'HSC Higher Math Advanced Problem Solving',
      org_name: 'Docent Science Academy (Farmgate)',
      batch_subject: 'Higher Mathematics',
      batch_timing: 'Sun, Tue, Thu • 05:30 PM',
      status: 'pending',
      created_at: '29 Aug 2026',
    },
  ]);

  const enrolledBatches: Batch[] = [
    {
      id: 'batch-001',
      organization_id: 'org-docent-01',
      name: 'HSC Physics 2026 - Regular Batch 04',
      batch_code: 'PHY-2026-B04',
      coaching_center_id: 'center-01',
      coaching_center_name: 'Docent Science Academy (Farmgate)',
      class_level: 'HSC 2nd Year',
      subject: 'Physics Advanced Mechanics & Waves',
      timing: 'Sat, Mon, Wed (04:00 PM - 05:30 PM)',
      days_schedule: ['Saturday', 'Monday', 'Wednesday'],
      room_number: 'Room 304 (Farmgate Main Campus)',
      assigned_teacher: 'Dr. Mahmudul Hasan (PhD, BUET)',
      monthly_fee: 2500,
      progress_percentage: 68,
      total_students: 45,
      status: 'active',
      enrolled_date: '10 Jan 2026',
    },
    {
      id: 'batch-002',
      organization_id: 'org-docent-01',
      name: 'HSC Higher Math - Regular Batch 02',
      batch_code: 'MATH-2026-B02',
      coaching_center_id: 'center-01',
      coaching_center_name: 'Docent Science Academy (Farmgate)',
      class_level: 'HSC 2nd Year',
      subject: 'Higher Mathematics (Calculus)',
      timing: 'Sun, Tue, Thu (05:30 PM - 07:00 PM)',
      days_schedule: ['Sunday', 'Tuesday', 'Thursday'],
      room_number: 'Room 402 (Farmgate Annex)',
      assigned_teacher: 'Prof. Tanvir Ahmed',
      monthly_fee: 2800,
      progress_percentage: 52,
      total_students: 40,
      status: 'active',
      enrolled_date: '15 Jan 2026',
    },
  ];

  const institutes: CoachingCenter[] = [
    {
      id: 'center-01',
      name: 'Docent Science Academy',
      code: 'DSA',
      branch: 'Farmgate Main Campus',
      address: '42/A Green Road, Farmgate, Dhaka 1215',
      contact_phone: '+880 1711-223344',
      contact_email: 'farmgate@docentbase.edu.bd',
      head_teacher: 'Engr. Rafiqul Islam (BUET)',
      enrolled_batches_count: 2,
      total_subjects: 4,
      established_year: '2018',
    },
  ];

  const handleLookup = () => {
    if (!joinKey.trim()) return;
    setJoinLoading(true);
    setJoinError('');

    setTimeout(() => {
      setJoinLoading(false);
      setJoinStep('preview');
    }, 600);
  };

  const handleJoinSubmit = () => {
    if (!formInstitution.trim() || !formClass.trim()) {
      setJoinError('Institution and Class are mandatory fields.');
      return;
    }
    setJoinLoading(true);
    setJoinError('');

    setTimeout(() => {
      setJoinLoading(false);
      setJoinStep('success');
      setRequests((prev) => [
        {
          id: `req-${Date.now()}`,
          batch_name: 'HSC Chemistry Model Test 2026',
          org_name: 'Docent Science Academy',
          batch_subject: 'Chemistry',
          batch_timing: 'Sat, Mon • 06:00 PM',
          status: 'pending',
          created_at: 'Today',
        },
        ...prev,
      ]);
    }, 700);
  };

  const handleWithdrawRequest = (reqId: string) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === reqId ? { ...r, status: 'withdrawn' } : r))
    );
  };

  return (
    <View style={styles.container}>
      <CockpitHeader title="Coaching & Batches" subtitle="Enrolled institutes, batches & join hub" />

      {/* 3-Tab Navigator Pill Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'batches' && styles.tabBtnActive]}
          onPress={() => setActiveTab('batches')}
          activeOpacity={0.8}
        >
          <GraduationCap size={16} color={activeTab === 'batches' ? '#2563eb' : '#71717a'} />
          <Text style={[styles.tabBtnText, activeTab === 'batches' && styles.tabBtnTextActive]}>
            My Batches ({enrolledBatches.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'centers' && styles.tabBtnActive]}
          onPress={() => setActiveTab('centers')}
          activeOpacity={0.8}
        >
          <Building2 size={16} color={activeTab === 'centers' ? '#2563eb' : '#71717a'} />
          <Text style={[styles.tabBtnText, activeTab === 'centers' && styles.tabBtnTextActive]}>
            Institutes ({institutes.length})
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tabBtn, activeTab === 'join' && styles.tabBtnActive]}
          onPress={() => setActiveTab('join')}
          activeOpacity={0.8}
        >
          <Key size={16} color={activeTab === 'join' ? '#2563eb' : '#f59e0b'} />
          <Text style={[styles.tabBtnText, activeTab === 'join' && styles.tabBtnTextActive]}>
            Join Batch
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* TAB 1: MY BATCHES */}
        {activeTab === 'batches' && (
          <View style={styles.tabPane}>
            {/* Pending Requests Section */}
            {requests.length > 0 && (
              <View style={styles.requestsSection}>
                <Text style={styles.sectionLabel}>Active Join Requests</Text>
                {requests.map((req) => (
                  <View key={req.id} style={styles.requestCard}>
                    <View style={styles.reqHeader}>
                      <View style={{ flex: 1 }}>
                        <Text style={styles.reqOrg}>{req.org_name}</Text>
                        <Text style={styles.reqBatch}>{req.batch_name}</Text>
                        <Text style={styles.reqMeta}>
                          {req.batch_subject} • {req.batch_timing}
                        </Text>
                      </View>
                      <StatusBadge status={req.status} />
                    </View>

                    <View style={styles.reqFooter}>
                      <Text style={styles.reqDate}>Requested on {req.created_at}</Text>
                      {req.status === 'pending' && (
                        <TouchableOpacity
                          style={styles.withdrawBtn}
                          onPress={() => handleWithdrawRequest(req.id)}
                        >
                          <Trash2 size={12} color="#ef4444" />
                          <Text style={styles.withdrawText}>Withdraw</Text>
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                ))}
              </View>
            )}

            {/* Enrolled Batches */}
            <Text style={styles.sectionLabel}>Active Enrollments</Text>
            {enrolledBatches.map((batch) => (
              <BatchCard
                key={batch.id}
                batch={batch}
                onPress={() => {
                  setSelectedBatch(batch);
                  setIsDetailModalOpen(true);
                }}
              />
            ))}
          </View>
        )}

        {/* TAB 2: MY INSTITUTES */}
        {activeTab === 'centers' && (
          <View style={styles.tabPane}>
            {institutes.map((center) => (
              <View key={center.id} style={styles.centerCard}>
                <View style={styles.centerTop}>
                  <View style={styles.centerIconBox}>
                    <Building2 size={24} color="#2563eb" />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.centerName}>{center.name}</Text>
                    <Text style={styles.centerBranch}>{center.branch}</Text>
                  </View>
                  <View style={styles.estBadge}>
                    <Text style={styles.estText}>Est. {center.established_year}</Text>
                  </View>
                </View>

                <View style={styles.centerMetaGrid}>
                  <View style={styles.centerMetaItem}>
                    <MapPin size={14} color="#64748b" />
                    <Text style={styles.centerMetaText}>{center.address}</Text>
                  </View>
                  <View style={styles.centerMetaItem}>
                    <Phone size={14} color="#64748b" />
                    <Text style={styles.centerMetaText}>{center.contact_phone}</Text>
                  </View>
                  <View style={styles.centerMetaItem}>
                    <Mail size={14} color="#64748b" />
                    <Text style={styles.centerMetaText}>{center.contact_email}</Text>
                  </View>
                  <View style={styles.centerMetaItem}>
                    <User size={14} color="#64748b" />
                    <Text style={styles.centerMetaText}>Head: {center.head_teacher}</Text>
                  </View>
                </View>

                <View style={styles.centerFooter}>
                  <Text style={styles.centerBadgeText}>
                    {center.enrolled_batches_count} Enrolled Batches • {center.total_subjects} Subjects
                  </Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* TAB 3: JOIN A BATCH WIZARD */}
        {activeTab === 'join' && (
          <View style={styles.tabPane}>
            {/* Step 1: Key Input */}
            {joinStep === 'enter_key' && (
              <View style={styles.joinCard}>
                <View style={styles.joinIconHeader}>
                  <View style={styles.keyIconCircle}>
                    <Key size={28} color="#2563eb" />
                  </View>
                  <Text style={styles.joinTitle}>Enter Batch Join Key</Text>
                  <Text style={styles.joinSubtitle}>
                    Your coaching center or teacher will provide a unique join code (e.g. PHY-2026-K2M9).
                  </Text>
                </View>

                {joinError ? (
                  <View style={styles.errorBox}>
                    <AlertTriangle size={14} color="#b91c1c" />
                    <Text style={styles.errorText}>{joinError}</Text>
                  </View>
                ) : null}

                <View style={styles.keyInputWrap}>
                  <TextInput
                    style={styles.keyInput}
                    placeholder="e.g. PHY-2026-K2M9"
                    placeholderTextColor="#94a3b8"
                    value={joinKey}
                    onChangeText={(t) => setJoinKey(t.toUpperCase())}
                    autoCapitalize="characters"
                  />
                </View>

                <Button
                  title={joinLoading ? 'Searching Batch...' : 'Find My Batch'}
                  icon={Search}
                  onPress={handleLookup}
                  loading={joinLoading}
                  size="lg"
                />
              </View>
            )}

            {/* Step 2: Batch Preview */}
            {joinStep === 'preview' && (
              <View style={styles.joinCard}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => setJoinStep('enter_key')}
                >
                  <ChevronLeft size={16} color="#64748b" />
                  <Text style={styles.backText}>Change Key</Text>
                </TouchableOpacity>

                <View style={styles.previewBox}>
                  <View style={styles.previewTop}>
                    <Text style={styles.previewOrg}>Docent Science Academy (Farmgate)</Text>
                    <Text style={styles.previewName}>HSC Chemistry Model Test 2026</Text>
                  </View>

                  <View style={styles.previewDetailsGrid}>
                    <View style={styles.previewItem}>
                      <Text style={styles.previewItemLabel}>Subject</Text>
                      <Text style={styles.previewItemValue}>Chemistry (Paper 1 & 2)</Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text style={styles.previewItemLabel}>Schedule</Text>
                      <Text style={styles.previewItemValue}>Sat, Mon (06:00 PM)</Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text style={styles.previewItemLabel}>Instructor</Text>
                      <Text style={styles.previewItemValue}>Engr. Rafiqul Islam (BUET)</Text>
                    </View>
                    <View style={styles.previewItem}>
                      <Text style={styles.previewItemLabel}>Monthly Fee</Text>
                      <Text style={styles.previewItemValue}>৳ 2,200</Text>
                    </View>
                  </View>
                </View>

                <Button
                  title="Yes, Continue to Request Form"
                  icon={ArrowRight}
                  iconPosition="right"
                  onPress={() => setJoinStep('form')}
                  size="lg"
                />
              </View>
            )}

            {/* Step 3: Application Form */}
            {joinStep === 'form' && (
              <View style={styles.joinCard}>
                <TouchableOpacity
                  style={styles.backBtn}
                  onPress={() => setJoinStep('preview')}
                >
                  <ChevronLeft size={16} color="#64748b" />
                  <Text style={styles.backText}>Back to Preview</Text>
                </TouchableOpacity>

                <Text style={styles.joinTitle}>Student Information Form</Text>
                <Text style={styles.joinSubtitle}>
                  Provide your academic details for faculty verification.
                </Text>

                {joinError ? (
                  <View style={styles.errorBox}>
                    <AlertTriangle size={14} color="#b91c1c" />
                    <Text style={styles.errorText}>{joinError}</Text>
                  </View>
                ) : null}

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>School / College / University *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Dhaka College"
                    placeholderTextColor="#94a3b8"
                    value={formInstitution}
                    onChangeText={setFormInstitution}
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Class / Academic Year *</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. HSC 2nd Year"
                    placeholderTextColor="#94a3b8"
                    value={formClass}
                    onChangeText={setFormClass}
                  />
                </View>

                <View style={styles.formRow}>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>Section</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Science A"
                      placeholderTextColor="#94a3b8"
                      value={formSection}
                      onChangeText={setFormSection}
                    />
                  </View>
                  <View style={[styles.formGroup, { flex: 1 }]}>
                    <Text style={styles.formLabel}>Shift</Text>
                    <TextInput
                      style={styles.formInput}
                      placeholder="e.g. Morning / Day"
                      placeholderTextColor="#94a3b8"
                      value={formShift}
                      onChangeText={setFormShift}
                    />
                  </View>
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Message to Teacher (Optional)</Text>
                  <TextInput
                    style={[styles.formInput, { height: 72, textAlignVertical: 'top' }]}
                    placeholder="e.g. Looking forward to preparing for model tests..."
                    placeholderTextColor="#94a3b8"
                    value={formMessage}
                    onChangeText={setFormMessage}
                    multiline
                  />
                </View>

                <Button
                  title={joinLoading ? 'Submitting Application...' : 'Submit Join Request'}
                  onPress={handleJoinSubmit}
                  loading={joinLoading}
                  size="lg"
                />
              </View>
            )}

            {/* Step 4: Success */}
            {joinStep === 'success' && (
              <View style={styles.joinCard}>
                <View style={styles.successIconCircle}>
                  <CheckCircle2 size={42} color="#10b981" />
                </View>
                <Text style={styles.successTitle}>Request Sent Successfully! 🎉</Text>
                <Text style={styles.successSubtitle}>
                  Your join request has been submitted to the faculty administration for review.
                </Text>

                <View style={styles.pendingAlert}>
                  <Clock size={16} color="#d97706" />
                  <Text style={styles.pendingAlertText}>
                    Status is currently <Text style={{ fontWeight: '700' }}>Pending Approval</Text>. You will receive a notification once accepted.
                  </Text>
                </View>

                <Button
                  title="View in My Batches"
                  onPress={() => {
                    setActiveTab('batches');
                    setJoinStep('enter_key');
                  }}
                  size="md"
                />
              </View>
            )}
          </View>
        )}
      </ScrollView>

      {/* Batch Detail Modal */}
      <Modal
        visible={isDetailModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => setIsDetailModalOpen(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalEyebrow}>BATCH BLUEPRINT</Text>
                <Text style={styles.modalTitle}>{selectedBatch?.name}</Text>
              </View>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => setIsDetailModalOpen(false)}
              >
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            <View style={styles.modalBody}>
              <View style={styles.modalItem}>
                <User size={16} color="#2563eb" />
                <View>
                  <Text style={styles.modalItemLabel}>Assigned Faculty</Text>
                  <Text style={styles.modalItemVal}>{selectedBatch?.assigned_teacher}</Text>
                </View>
              </View>

              <View style={styles.modalItem}>
                <Calendar size={16} color="#2563eb" />
                <View>
                  <Text style={styles.modalItemLabel}>Weekly Timing</Text>
                  <Text style={styles.modalItemVal}>{selectedBatch?.timing}</Text>
                </View>
              </View>

              <View style={styles.modalItem}>
                <MapPin size={16} color="#2563eb" />
                <View>
                  <Text style={styles.modalItemLabel}>Lecture Room</Text>
                  <Text style={styles.modalItemVal}>{selectedBatch?.room_number}</Text>
                </View>
              </View>

              <View style={styles.modalItem}>
                <DollarSign size={16} color="#2563eb" />
                <View>
                  <Text style={styles.modalItemLabel}>Monthly Tuition</Text>
                  <Text style={styles.modalItemVal}>৳ {selectedBatch?.monthly_fee?.toLocaleString()}</Text>
                </View>
              </View>
            </View>

            <View style={styles.modalActions}>
              <Button
                title="Request Batch Transfer"
                variant="outline"
                size="md"
                onPress={() => {
                  setIsDetailModalOpen(false);
                  setIsTransferModalOpen(true);
                }}
                style={{ flex: 1 }}
              />
              <Button
                title="Done"
                size="md"
                onPress={() => setIsDetailModalOpen(false)}
                style={{ flex: 1 }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* Batch Transfer Request Modal */}
      <Modal
        visible={isTransferModalOpen}
        transparent
        animationType="slide"
        onRequestClose={() => {
          setIsTransferModalOpen(false);
          setTransferSuccess(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalSheet}>
            <View style={styles.modalHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.modalEyebrow}>TRANSFER FACILITY</Text>
                <Text style={styles.modalTitle}>Request Batch Transfer</Text>
              </View>
              <TouchableOpacity
                style={styles.modalClose}
                onPress={() => {
                  setIsTransferModalOpen(false);
                  setTransferSuccess(false);
                }}
              >
                <X size={18} color="#64748b" />
              </TouchableOpacity>
            </View>

            {!transferSuccess ? (
              <View style={{ gap: Spacing.md }}>
                <Text style={styles.modalSubtitle}>
                  Transferring from <Text style={{ fontWeight: '700' }}>{selectedBatch?.name}</Text>
                </Text>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Target Batch Timing / Preferred Slot</Text>
                  <TextInput
                    style={styles.formInput}
                    placeholder="e.g. Evening Shift (06:00 PM - 07:30 PM)"
                    placeholderTextColor="#94a3b8"
                  />
                </View>

                <View style={styles.formGroup}>
                  <Text style={styles.formLabel}>Reason for Transfer</Text>
                  <TextInput
                    style={[styles.formInput, { height: 72, textAlignVertical: 'top' }]}
                    placeholder="e.g. College schedule conflict..."
                    placeholderTextColor="#94a3b8"
                    multiline
                  />
                </View>

                <Button
                  title="Submit Transfer Request"
                  size="lg"
                  onPress={() => setTransferSuccess(true)}
                />
              </View>
            ) : (
              <View style={{ alignItems: 'center', paddingVertical: Spacing.lg, gap: Spacing.md }}>
                <CheckCircle2 size={44} color="#10b981" />
                <Text style={styles.successTitle}>Transfer Request Submitted!</Text>
                <Text style={styles.successSubtitle}>
                  Your batch coordinator will review the transfer slot availability within 24 hours.
                </Text>
                <Button
                  title="Close"
                  size="md"
                  onPress={() => {
                    setIsTransferModalOpen(false);
                    setTransferSuccess(false);
                  }}
                />
              </View>
            )}
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
  tabBar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    paddingHorizontal: Spacing.lg,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    gap: 8,
  },
  tabBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 8,
    borderRadius: Radius.sm,
    backgroundColor: '#f4f4f5',
  },
  tabBtnActive: {
    backgroundColor: '#eff6ff',
    borderWidth: 1,
    borderColor: '#bfdbfe',
  },
  tabBtnText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#71717a',
  },
  tabBtnTextActive: {
    color: '#2563eb',
    fontWeight: '700',
  },
  scrollContent: {
    padding: Spacing.lg,
    paddingBottom: Spacing.xxl * 2,
  },
  tabPane: {
    gap: Spacing.lg,
  },
  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  requestsSection: {
    gap: Spacing.sm,
  },
  requestCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    gap: 10,
  },
  reqHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    gap: 8,
  },
  reqOrg: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  reqBatch: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  reqMeta: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  reqFooter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  reqDate: {
    fontSize: 10,
    color: '#94a3b8',
  },
  withdrawBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  withdrawText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#ef4444',
  },
  centerCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    gap: Spacing.md,
  },
  centerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  centerIconBox: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  centerName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  centerBranch: {
    fontSize: 12,
    color: '#71717a',
  },
  estBadge: {
    backgroundColor: '#f8fafc',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: Radius.xs,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  estText: {
    fontSize: 10,
    color: '#64748b',
    fontWeight: '600',
  },
  centerMetaGrid: {
    gap: 6,
    backgroundColor: '#f8fafc',
    padding: Spacing.md,
    borderRadius: Radius.sm,
  },
  centerMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  centerMetaText: {
    fontSize: 12,
    color: '#475569',
  },
  centerFooter: {
    paddingTop: 4,
  },
  centerBadgeText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#2563eb',
  },
  joinCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    gap: Spacing.md,
  },
  joinIconHeader: {
    alignItems: 'center',
    textAlign: 'center',
  },
  keyIconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#eff6ff',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  joinTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
  },
  joinSubtitle: {
    fontSize: 12,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 18,
    marginTop: 4,
  },
  errorBox: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: '#fef2f2',
    padding: 10,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#fca5a5',
  },
  errorText: {
    fontSize: 12,
    color: '#b91c1c',
  },
  keyInputWrap: {
    borderWidth: 2,
    borderColor: '#cbd5e1',
    borderRadius: Radius.md,
    height: 52,
    justifyContent: 'center',
    paddingHorizontal: 16,
    backgroundColor: '#f8fafc',
  },
  keyInput: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    textAlign: 'center',
    letterSpacing: 2,
  },
  backBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  backText: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '600',
  },
  previewBox: {
    backgroundColor: '#eff6ff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#dbeafe',
    gap: 12,
  },
  previewTop: {
    gap: 2,
  },
  previewOrg: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    textTransform: 'uppercase',
  },
  previewName: {
    fontSize: 16,
    fontWeight: '800',
    color: '#1e3a8a',
  },
  previewDetailsGrid: {
    gap: 8,
  },
  previewItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  previewItemLabel: {
    fontSize: 11,
    color: '#60a5fa',
    fontWeight: '600',
  },
  previewItemValue: {
    fontSize: 12,
    color: '#1e3a8a',
    fontWeight: '700',
  },
  formGroup: {
    gap: 4,
  },
  formRow: {
    flexDirection: 'row',
    gap: 8,
  },
  formLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
  },
  formInput: {
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: Radius.sm,
    paddingHorizontal: 12,
    paddingVertical: 8,
    fontSize: 13,
    color: '#0f172a',
    backgroundColor: '#ffffff',
  },
  successIconCircle: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#ecfdf5',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  successTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
    textAlign: 'center',
  },
  successSubtitle: {
    fontSize: 12,
    color: '#71717a',
    textAlign: 'center',
    lineHeight: 18,
  },
  pendingAlert: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#fffbeb',
    padding: 12,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  pendingAlertText: {
    fontSize: 11,
    color: '#b45309',
    flex: 1,
    lineHeight: 16,
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
  modalSubtitle: {
    fontSize: 13,
    color: '#52525b',
  },
  modalClose: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#f4f4f5',
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalBody: {
    gap: 12,
    backgroundColor: '#f8fafc',
    padding: Spacing.md,
    borderRadius: Radius.lg,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  modalItemLabel: {
    fontSize: 10,
    fontWeight: '600',
    color: '#94a3b8',
    textTransform: 'uppercase',
  },
  modalItemVal: {
    fontSize: 12,
    fontWeight: '700',
    color: '#0f172a',
  },
  modalActions: {
    flexDirection: 'row',
    gap: 8,
  },
});
