import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { useAuth, useClerk } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { Button } from '../../src/components/Button';
import {
  User,
  Phone,
  Mail,
  MapPin,
  ShieldCheck,
  Award,
  LogOut,
  Settings as SettingsIcon,
  ChevronRight,
  Sparkles,
} from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function ProfileScreen() {
  const { signOut } = useClerk();
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.replace('/(auth)/sign-in');
    } catch (e) {
      router.replace('/(auth)/sign-in');
    }
  };

  return (
    <View style={styles.container}>
      <CockpitHeader title="Student Profile" subtitle="Official academic identity & credentials" />

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/* Digital Student Identity Card */}
        <View style={styles.idCard}>
          <View style={styles.idGlow} />
          
          <View style={styles.idTop}>
            <View style={styles.idBadge}>
              <Sparkles size={12} color="#93c5fd" />
              <Text style={styles.idBadgeText}>DOCENTBASE VERIFIED STUDENT</Text>
            </View>
            <Text style={styles.idNumber}>STU-2026-8821</Text>
          </View>

          <View style={styles.idStudentRow}>
            <View style={styles.idAvatar}>
              <Text style={styles.idAvatarText}>SO</Text>
            </View>
            <View style={styles.idStudentInfo}>
              <Text style={styles.idName}>Solaman Ahmed</Text>
              <Text style={styles.idClass}>Class 12 • Science • Section A</Text>
              <Text style={styles.idRoll}>Roll No: 104 • Blood: B+</Text>
            </View>
          </View>

          <View style={styles.idFooter}>
            <View style={styles.idFooterItem}>
              <Text style={styles.idFooterLabel}>SESSION</Text>
              <Text style={styles.idFooterValue}>2025-2026</Text>
            </View>
            <View style={styles.idFooterItem}>
              <Text style={styles.idFooterLabel}>STATUS</Text>
              <Text style={styles.idFooterValue}>Regular Active</Text>
            </View>
            <View style={styles.idFooterItem}>
              <Text style={styles.idFooterLabel}>CAMPUS</Text>
              <Text style={styles.idFooterValue}>Dhanmondi</Text>
            </View>
          </View>
        </View>

        {/* Contact Information Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>Personal Contact Details</Text>

          <View style={styles.infoRow}>
            <Phone size={16} color="#64748b" />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Primary Phone</Text>
              <Text style={styles.infoValue}>+880 1712-345678</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Mail size={16} color="#64748b" />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Email Address</Text>
              <Text style={styles.infoValue}>solaman.student@gmail.com</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <MapPin size={16} color="#64748b" />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Residential Address</Text>
              <Text style={styles.infoValue}>House 42, Road 7, Dhanmondi, Dhaka-1205</Text>
            </View>
          </View>
        </View>

        {/* Guardian Information Card */}
        <View style={styles.sectionCard}>
          <Text style={styles.sectionCardTitle}>Guardian Information</Text>

          <View style={styles.infoRow}>
            <User size={16} color="#64748b" />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Guardian Name (Father)</Text>
              <Text style={styles.infoValue}>Md. Rafiqul Ahmed</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Phone size={16} color="#64748b" />
            <View style={styles.infoCol}>
              <Text style={styles.infoLabel}>Guardian Contact Number</Text>
              <Text style={styles.infoValue}>+880 1819-987654</Text>
            </View>
          </View>
        </View>

        {/* App Quick Settings Navigation */}
        <TouchableOpacity
          style={styles.actionRow}
          onPress={() => router.push('/settings')}
          activeOpacity={0.8}
        >
          <View style={styles.actionLeft}>
            <View style={[styles.actionIcon, { backgroundColor: '#f1f5f9' }]}>
              <SettingsIcon size={18} color="#334155" />
            </View>
            <Text style={styles.actionLabel}>Application Settings & Preferences</Text>
          </View>
          <ChevronRight size={18} color="#94a3b8" />
        </TouchableOpacity>

        {/* Sign Out Button */}
        <Button
          title="Sign Out from Cockpit"
          variant="destructive"
          icon={LogOut}
          onPress={handleSignOut}
          size="lg"
        />
      </ScrollView>
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
  idCard: {
    backgroundColor: '#0f172a',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#0f172a',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 16,
    elevation: 4,
  },
  idGlow: {
    position: 'absolute',
    top: -60,
    right: -60,
    width: 220,
    height: 220,
    borderRadius: 110,
    backgroundColor: 'rgba(37, 99, 235, 0.25)',
  },
  idTop: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },
  idBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(59, 130, 246, 0.15)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 9999,
  },
  idBadgeText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#93c5fd',
    letterSpacing: 0.8,
  },
  idNumber: {
    fontSize: 11,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.5,
  },
  idStudentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 14,
    marginBottom: Spacing.lg,
  },
  idAvatar: {
    width: 54,
    height: 54,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  idAvatarText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#ffffff',
  },
  idStudentInfo: {
    flex: 1,
  },
  idName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#ffffff',
    letterSpacing: -0.3,
  },
  idClass: {
    fontSize: 12,
    color: '#cbd5e1',
    marginTop: 2,
  },
  idRoll: {
    fontSize: 11,
    color: '#93c5fd',
    fontWeight: '600',
    marginTop: 2,
  },
  idFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.12)',
  },
  idFooterItem: {
    gap: 2,
  },
  idFooterLabel: {
    fontSize: 9,
    fontWeight: '700',
    color: '#94a3b8',
    letterSpacing: 0.6,
  },
  idFooterValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#ffffff',
  },
  sectionCard: {
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
  },
  sectionCardTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: Spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
    paddingVertical: 6,
  },
  infoCol: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 11,
    color: '#94a3b8',
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  actionRow: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  actionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  actionIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  actionLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
});
