import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Switch,
  TouchableOpacity,
} from 'react-native';
import { Globe, ChevronRight } from 'lucide-react-native';
import { Radius, Spacing } from '../../src/constants/theme';

export default function SettingsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [smsAlerts, setSmsAlerts] = useState(true);
  const [examReminders, setExamReminders] = useState(true);

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      {/* Notifications Section */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Push & SMS Notifications</Text>

        <View style={styles.settingRow}>
          <View style={styles.settingTextCol}>
            <Text style={styles.settingLabel}>Class Routine Reminders</Text>
            <Text style={styles.settingSub}>Receive 30m alerts prior to class start</Text>
          </View>
          <Switch
            value={pushEnabled}
            onValueChange={setPushEnabled}
            trackColor={{ false: '#e4e4e7', true: '#93c5fd' }}
            thumbColor={pushEnabled ? '#2563eb' : '#f4f4f5'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextCol}>
            <Text style={styles.settingLabel}>Exam & Test Schedules</Text>
            <Text style={styles.settingSub}>Instant notice upon timetable publications</Text>
          </View>
          <Switch
            value={examReminders}
            onValueChange={setExamReminders}
            trackColor={{ false: '#e4e4e7', true: '#93c5fd' }}
            thumbColor={examReminders ? '#2563eb' : '#f4f4f5'}
          />
        </View>

        <View style={styles.divider} />

        <View style={styles.settingRow}>
          <View style={styles.settingTextCol}>
            <Text style={styles.settingLabel}>SMS Guardian Broadcasts</Text>
            <Text style={styles.settingSub}>Emergency updates sent to guardian phone</Text>
          </View>
          <Switch
            value={smsAlerts}
            onValueChange={setSmsAlerts}
            trackColor={{ false: '#e4e4e7', true: '#93c5fd' }}
            thumbColor={smsAlerts ? '#2563eb' : '#f4f4f5'}
          />
        </View>
      </View>

      {/* Language & Regional */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>Regional Preferences</Text>

        <TouchableOpacity style={styles.menuRow} activeOpacity={0.7}>
          <View style={styles.menuLeft}>
            <Globe size={18} color="#2563eb" />
            <Text style={styles.menuLabel}>Display Language</Text>
          </View>
          <View style={styles.menuRight}>
            <Text style={styles.menuValue}>English (US)</Text>
            <ChevronRight size={16} color="#94a3b8" />
          </View>
        </TouchableOpacity>
      </View>

      {/* App Version & Identity */}
      <View style={styles.card}>
        <Text style={styles.sectionTitle}>System Details</Text>

        <View style={styles.systemRow}>
          <Text style={styles.systemLabel}>Application</Text>
          <Text style={styles.systemValue}>DocentBase Student Mobile</Text>
        </View>
        <View style={styles.systemRow}>
          <Text style={styles.systemLabel}>Framework</Text>
          <Text style={styles.systemValue}>React Native Expo SDK 52</Text>
        </View>
        <View style={styles.systemRow}>
          <Text style={styles.systemLabel}>Version</Text>
          <Text style={styles.systemValue}>1.0.0 (Build 2026.08)</Text>
        </View>
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
  card: {
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
  sectionTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: Spacing.md,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  settingTextCol: {
    flex: 1,
    paddingRight: 12,
  },
  settingLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  settingSub: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 8,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 6,
  },
  menuLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  menuLabel: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  menuRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  menuValue: {
    fontSize: 12,
    color: '#64748b',
    fontWeight: '500',
  },
  systemRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  systemLabel: {
    fontSize: 12,
    color: '#64748b',
  },
  systemValue: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0f172a',
  },
});
