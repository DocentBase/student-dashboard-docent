import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { StatusBadge } from '../../src/components/StatusBadge';
import { Button } from '../../src/components/Button';
import {
  Wallet,
  Calendar,
  CreditCard,
  Download,
  AlertCircle,
  Smartphone,
  CheckCircle2,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function FeesScreen() {
  const feeInvoices = [
    {
      id: 'inv-01',
      month: 'September 2026',
      amount: 3500,
      dueDate: '10 Sep 2026',
      status: 'due',
      batchesCount: 3,
    },
    {
      id: 'inv-02',
      month: 'August 2026',
      amount: 3500,
      paidDate: '05 Aug 2026',
      paidAmount: 3500,
      paymentMethod: 'bKash Merchant (TxID: BK892104)',
      status: 'paid',
      batchesCount: 3,
    },
    {
      id: 'inv-03',
      month: 'July 2026',
      amount: 3500,
      paidDate: '07 Jul 2026',
      paidAmount: 3500,
      paymentMethod: 'Nagad Gateway (TxID: NG77312)',
      status: 'paid',
      batchesCount: 3,
    },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Pending Due Callout Card */}
      <View style={styles.dueCard}>
        <View style={styles.dueTop}>
          <View style={styles.dueIconBox}>
            <Wallet size={24} color="#f59e0b" />
          </View>
          <View style={styles.dueInfo}>
            <Text style={styles.dueLabel}>TOTAL PENDING DUES</Text>
            <Text style={styles.dueAmount}>৳ 3,500</Text>
            <Text style={styles.dueDate}>Due Date: 10 September 2026</Text>
          </View>
        </View>

        <Button
          title="Pay via bKash / Nagad"
          size="md"
          onPress={() => {}}
          style={{ backgroundColor: '#e11d48' }}
        />
      </View>

      {/* Payment Instructions Accordion */}
      <View style={styles.instructionCard}>
        <View style={styles.instructionHeader}>
          <Smartphone size={18} color="#2563eb" />
          <Text style={styles.instructionTitle}>Mobile Banking Payment Instructions</Text>
        </View>
        <Text style={styles.instructionText}>
          1. Go to your bKash / Nagad App and select "Make Payment".{'\n'}
          2. Merchant Account: <Text style={styles.bold}>01700-000000</Text>{'\n'}
          3. Reference: Use your Student ID <Text style={styles.bold}>STU-8821</Text>{'\n'}
          4. Upon confirmation, receipt is instantly updated.
        </Text>
      </View>

      {/* Invoices & Receipts List */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Invoice & Payment History</Text>
      </View>

      <View style={styles.list}>
        {feeInvoices.map((inv) => (
          <View key={inv.id} style={styles.invoiceCard}>
            <View style={styles.invHeader}>
              <View>
                <Text style={styles.invMonth}>{inv.month}</Text>
                <Text style={styles.invBatchText}>{inv.batchesCount} Enrolled Batches</Text>
              </View>
              <StatusBadge status={inv.status} />
            </View>

            <View style={styles.invRow}>
              <Text style={styles.invAmount}>৳ {inv.amount.toLocaleString()}</Text>
              {inv.status === 'paid' ? (
                <Text style={styles.invStatusMeta}>Paid on {inv.paidDate}</Text>
              ) : (
                <Text style={styles.invStatusMetaDue}>Due by {inv.dueDate}</Text>
              )}
            </View>

            {inv.paymentMethod && (
              <View style={styles.txRow}>
                <CheckCircle2 size={12} color="#10b981" />
                <Text style={styles.txText}>{inv.paymentMethod}</Text>
              </View>
            )}
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
  dueCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.04,
    shadowRadius: 4,
    elevation: 1,
    gap: Spacing.lg,
  },
  dueTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
  },
  dueIconBox: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: '#fffbeb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#fef3c7',
  },
  dueInfo: {
    flex: 1,
  },
  dueLabel: {
    fontSize: 10,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.8,
  },
  dueAmount: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
    marginVertical: 2,
  },
  dueDate: {
    fontSize: 12,
    color: '#f59e0b',
    fontWeight: '600',
  },
  instructionCard: {
    backgroundColor: '#eff6ff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#dbeafe',
    gap: 8,
  },
  instructionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  instructionTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#1e40af',
  },
  instructionText: {
    fontSize: 12,
    color: '#1e3a8a',
    lineHeight: 18,
  },
  bold: {
    fontWeight: '700',
  },
  sectionHeader: {
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
  },
  list: {
    gap: Spacing.md,
  },
  invoiceCard: {
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
  invHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  invMonth: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
  },
  invBatchText: {
    fontSize: 11,
    color: '#64748b',
    marginTop: 1,
  },
  invRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invAmount: {
    fontSize: 18,
    fontWeight: '800',
    color: '#0f172a',
  },
  invStatusMeta: {
    fontSize: 11,
    color: '#10b981',
    fontWeight: '600',
  },
  invStatusMetaDue: {
    fontSize: 11,
    color: '#f59e0b',
    fontWeight: '600',
  },
  txRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#f1f5f9',
  },
  txText: {
    fontSize: 11,
    color: '#52525b',
  },
});
