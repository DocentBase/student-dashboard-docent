import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
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
  ShieldCheck,
  Clock,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function FeesScreen() {
  const [paying, setPaying] = useState(false);
  const [paidSuccess, setPaidSuccess] = useState(false);
  const [receiptDownloaded, setReceiptDownloaded] = useState(false);

  const feeInvoices = [
    {
      id: 'TXN-2026-8941',
      month: 'July 2026 Monthly Tuition Fee',
      paidDate: '05 Jul 2026',
      method: 'bKash · TrxID: 9MK2L49',
      amount: 5500,
      status: 'paid',
    },
    {
      id: 'TXN-2026-7812',
      month: 'June 2026 Monthly Tuition Fee',
      paidDate: '03 Jun 2026',
      method: 'Nagad · TrxID: 8JL1P20',
      amount: 5500,
      status: 'paid',
    },
    {
      id: 'TXN-2026-6420',
      month: 'May 2026 Monthly Tuition + Lab Charge',
      paidDate: '08 May 2026',
      method: 'bKash · TrxID: 7TY9W11',
      amount: 6200,
      status: 'paid',
    },
  ];

  const handlePay = () => {
    setPaying(true);
    setTimeout(() => {
      setPaying(false);
      setPaidSuccess(true);
    }, 1200);
  };

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* KPI Stats */}
      <View style={styles.kpiRow}>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>PENDING DUE</Text>
          <Text style={[styles.kpiValue, { color: paidSuccess ? '#10b981' : '#b45309' }]}>
            {paidSuccess ? '৳ 0' : '৳ 5,500'}
          </Text>
          <Text style={styles.kpiSub}>{paidSuccess ? 'All Cleared' : 'Due: 25 Aug'}</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>PAID THIS YEAR</Text>
          <Text style={styles.kpiValue}>{paidSuccess ? '৳ 47,700' : '৳ 42,200'}</Text>
          <Text style={styles.kpiSub}>8 Invoices</Text>
        </View>
        <View style={styles.kpiCard}>
          <Text style={styles.kpiLabel}>NEXT INVOICE</Text>
          <Text style={styles.kpiValue}>01 Sep</Text>
          <Text style={styles.kpiSub}>Regular Cycle</Text>
        </View>
      </View>

      {/* Current Outstanding Invoice */}
      {!paidSuccess ? (
        <View style={styles.dueCard}>
          <View style={styles.dueTop}>
            <View style={{ flex: 1 }}>
              <View style={styles.badgeRow}>
                <Text style={styles.billingEyebrow}>CURRENT BILLING CYCLE</Text>
                <StatusBadge status="due" />
              </View>
              <Text style={styles.dueTitle}>August 2026 Tuition & Library Fee</Text>
              <Text style={styles.dueSub}>
                Invoice #INV-2026-AUG-102 • Grace period until 25 Aug 2026
              </Text>
            </View>
          </View>

          <View style={styles.itemizedBox}>
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>Monthly Tuition (3 Batches)</Text>
              <Text style={styles.itemPrice}>৳ 4,500</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>Physics Lab Charge</Text>
              <Text style={styles.itemPrice}>৳ 600</Text>
            </View>
            <View style={styles.itemRow}>
              <Text style={styles.itemName}>Study Materials & Handouts</Text>
              <Text style={styles.itemPrice}>৳ 400</Text>
            </View>
            <View style={styles.itemDivider} />
            <View style={styles.itemRowTotal}>
              <Text style={styles.totalLabel}>Total Payable Amount</Text>
              <Text style={styles.totalPrice}>৳ 5,500</Text>
            </View>
          </View>

          <Button
            title={paying ? 'Processing Payment Gateway...' : 'Pay via bKash / Card (৳ 5,500)'}
            icon={CreditCard}
            onPress={handlePay}
            loading={paying}
            size="lg"
          />
        </View>
      ) : (
        <View style={styles.paidSuccessCard}>
          <View style={styles.paidSuccessTop}>
            <CheckCircle2 size={24} color="#10b981" />
            <View style={{ flex: 1 }}>
              <Text style={styles.paidSuccessTitle}>Payment Completed Successfully! 🎉</Text>
              <Text style={styles.paidSuccessSub}>
                August 2026 tuition cleared. TrxID: BKASH-99812A.
              </Text>
            </View>
          </View>

          <Button
            title={receiptDownloaded ? 'Receipt Downloaded ✓' : 'Download Verified Receipt'}
            icon={Download}
            variant="secondary"
            size="sm"
            onPress={() => setReceiptDownloaded(true)}
          />
        </View>
      )}

      {/* Mobile Banking Instructions */}
      <View style={styles.instructionCard}>
        <View style={styles.instructionHeader}>
          <Smartphone size={18} color="#2563eb" />
          <Text style={styles.instructionTitle}>Mobile Banking Direct Payment</Text>
        </View>
        <Text style={styles.instructionText}>
          1. Go to your bKash / Nagad App and select "Make Payment".{'\n'}
          2. Merchant Account: <Text style={styles.bold}>01700-000000</Text>{'\n'}
          3. Reference: Use your Student USI <Text style={styles.bold}>DC-2026-0894</Text>{'\n'}
          4. Receipt is automatically verified within 5 minutes.
        </Text>
      </View>

      {/* Verified Payment History Ledger */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Verified Payment History</Text>
      </View>

      <View style={styles.list}>
        {feeInvoices.map((inv) => (
          <View key={inv.id} style={styles.invoiceCard}>
            <View style={styles.invHeader}>
              <View style={{ flex: 1 }}>
                <Text style={styles.invReceiptId}>{inv.id}</Text>
                <Text style={styles.invMonth}>{inv.month}</Text>
              </View>
              <StatusBadge status={inv.status} />
            </View>

            <View style={styles.invRow}>
              <Text style={styles.invAmount}>৳ {inv.amount.toLocaleString()}</Text>
              <Text style={styles.invStatusMeta}>Paid on {inv.paidDate}</Text>
            </View>

            <View style={styles.txRow}>
              <CheckCircle2 size={12} color="#10b981" />
              <Text style={styles.txText}>{inv.method}</Text>
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
  dueCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
    elevation: 2,
    gap: Spacing.md,
  },
  dueTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  badgeRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  billingEyebrow: {
    fontSize: 10,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.8,
  },
  dueTitle: {
    fontSize: 17,
    fontWeight: '800',
    color: '#0f172a',
    marginTop: 2,
  },
  dueSub: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  itemizedBox: {
    backgroundColor: '#f8fafc',
    borderRadius: Radius.md,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    gap: 8,
  },
  itemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  itemName: {
    fontSize: 12,
    color: '#475569',
  },
  itemPrice: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
  itemDivider: {
    height: 1,
    backgroundColor: '#e2e8f0',
    marginVertical: 2,
  },
  itemRowTotal: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  totalLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#0f172a',
  },
  totalPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#2563eb',
  },
  paidSuccessCard: {
    backgroundColor: '#ecfdf5',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#a7f3d0',
    gap: Spacing.md,
  },
  paidSuccessTop: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  paidSuccessTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#065f46',
  },
  paidSuccessSub: {
    fontSize: 12,
    color: '#047857',
    marginTop: 2,
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
  invReceiptId: {
    fontSize: 10,
    fontFamily: 'monospace',
    color: '#64748b',
    fontWeight: '600',
  },
  invMonth: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginTop: 2,
  },
  invRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  invAmount: {
    fontSize: 16,
    fontWeight: '800',
    color: '#0f172a',
  },
  invStatusMeta: {
    fontSize: 11,
    color: '#10b981',
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
