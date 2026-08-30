import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useRouter } from 'expo-router';
import { CockpitHeader } from '../../src/components/CockpitHeader';
import { HeroBanner } from '../../src/components/HeroBanner';
import { StatCard } from '../../src/components/StatCard';
import { StatusBadge } from '../../src/components/StatusBadge';
import {
  CheckCircle2,
  BookOpen,
  Wallet,
  Trophy,
  ClipboardList,
  FileText,
  Megaphone,
  Settings,
  ChevronRight,
  Clock,
  Sparkles,
} from 'lucide-react-native';
import { Spacing, Radius } from '../../src/constants/theme';

export default function DashboardScreen() {
  const router = useRouter();
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  const quickActions = [
    {
      title: 'Exams & Tests',
      subtitle: '2 Upcoming tests',
      icon: ClipboardList,
      color: '#2563eb',
      bg: '#eff6ff',
      route: '/exams',
    },
    {
      title: 'Academic Results',
      subtitle: 'GPA 5.00 (Rank #3)',
      icon: Trophy,
      color: '#f59e0b',
      bg: '#fffbeb',
      route: '/results',
    },
    {
      title: 'Fees & Dues',
      subtitle: '৳ 3,500 due this month',
      icon: Wallet,
      color: '#10b981',
      bg: '#ecfdf5',
      route: '/fees',
    },
    {
      title: 'Notes & Files',
      subtitle: '18 Study materials',
      icon: FileText,
      color: '#8b5cf6',
      bg: '#f5f3ff',
      route: '/notes',
    },
  ];

  return (
    <View style={styles.container}>
      <CockpitHeader studentName="Solaman" />

      <ScrollView
        contentContainerStyle={styles.scrollContent}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#2563eb" />
        }
      >
        {/* Dark Hero Cockpit Card */}
        <HeroBanner
          studentName="Solaman"
          nextClassTime="04:30 PM Today"
          nextSubject="Higher Math - Batch 2026"
          attendanceRate="94.2%"
        />

        {/* Quick Stats Grid */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Overview Metrics</Text>
        </View>

        <View style={styles.statGrid}>
          <StatCard
            title="Attendance"
            value="94.2%"
            subtitle="26 of 28 Days"
            icon={CheckCircle2}
            iconColor="#10b981"
            iconBg="#ecfdf5"
            trend={{ value: "+2.4%", isPositive: true }}
            onPress={() => router.push('/(tabs)/attendance')}
          />
          <StatCard
            title="Enrolled Batches"
            value="3"
            subtitle="Active batches"
            icon={BookOpen}
            iconColor="#2563eb"
            iconBg="#eff6ff"
            trend={{ value: "All active", isNeutral: true }}
            onPress={() => router.push('/(tabs)/coaching')}
          />
        </View>

        <View style={styles.statGrid}>
          <StatCard
            title="Tuition Fee"
            value="৳ 3,500"
            subtitle="Due on 10 Sep"
            icon={Wallet}
            iconColor="#f59e0b"
            iconBg="#fffbeb"
            trend={{ value: "1 invoice due", isPositive: false }}
            onPress={() => router.push('/fees')}
          />
          <StatCard
            title="Average GPA"
            value="4.92"
            subtitle="Top 5% student"
            icon={Trophy}
            iconColor="#8b5cf6"
            iconBg="#f5f3ff"
            trend={{ value: "Excellent", isPositive: true }}
            onPress={() => router.push('/results')}
          />
        </View>

        {/* Quick Navigation Cards */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Quick Access</Text>
        </View>

        <View style={styles.quickGrid}>
          {quickActions.map((action, idx) => {
            const Icon = action.icon;
            return (
              <TouchableOpacity
                key={idx}
                style={styles.quickCard}
                onPress={() => router.push(action.route as any)}
                activeOpacity={0.8}
              >
                <View style={[styles.quickIcon, { backgroundColor: action.bg }]}>
                  <Icon size={20} color={action.color} />
                </View>
                <View style={styles.quickTextCol}>
                  <Text style={styles.quickTitle}>{action.title}</Text>
                  <Text style={styles.quickSubtitle}>{action.subtitle}</Text>
                </View>
                <ChevronRight size={16} color="#94a3b8" />
              </TouchableOpacity>
            );
          })}
        </View>

        {/* Today's Schedule Snapshot */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Today's Classes</Text>
          <TouchableOpacity onPress={() => router.push('/(tabs)/routine')}>
            <Text style={styles.seeAllText}>Full Schedule</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardContainer}>
          <View style={styles.classItem}>
            <View style={styles.timeBadge}>
              <Clock size={12} color="#2563eb" />
              <Text style={styles.timeText}>04:30 PM</Text>
            </View>
            <View style={styles.classDetails}>
              <Text style={styles.subjectText}>Higher Mathematics</Text>
              <Text style={styles.instructorText}>Instructor: Prof. Rafiqul Islam • Room 302</Text>
            </View>
            <StatusBadge status="upcoming" />
          </View>

          <View style={styles.divider} />

          <View style={styles.classItem}>
            <View style={styles.timeBadge}>
              <Clock size={12} color="#71717a" />
              <Text style={styles.timeTextMuted}>06:00 PM</Text>
            </View>
            <View style={styles.classDetails}>
              <Text style={styles.subjectText}>Physics Advanced Mechanics</Text>
              <Text style={styles.instructorText}>Instructor: Dr. Anwar Hossain • Room 104</Text>
            </View>
            <StatusBadge status="upcoming" />
          </View>
        </View>

        {/* Recent Notice Card */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Notices</Text>
          <TouchableOpacity onPress={() => router.push('/notices')}>
            <Text style={styles.seeAllText}>View All</Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.noticeCard}
          onPress={() => router.push('/notices')}
          activeOpacity={0.85}
        >
          <View style={styles.noticeHeader}>
            <StatusBadge status="holiday" label="Important Notice" />
            <Text style={styles.noticeDate}>Today, 10:00 AM</Text>
          </View>
          <Text style={styles.noticeHeadline}>
            Upcoming Model Test 02 Schedule Published
          </Text>
          <Text style={styles.noticePreview}>
            The second round of model examinations for HSC 2026 batches will commence from September 15th. Check the full routine inside.
          </Text>
        </TouchableOpacity>
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
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  seeAllText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2563eb',
  },
  statGrid: {
    flexDirection: 'row',
    gap: Spacing.md,
  },
  quickGrid: {
    gap: Spacing.sm,
  },
  quickCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.md,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.03,
    shadowRadius: 3,
    elevation: 1,
  },
  quickIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  quickTextCol: {
    flex: 1,
  },
  quickTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#0f172a',
  },
  quickSubtitle: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  cardContainer: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.md,
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  classItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 12,
  },
  timeBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#eff6ff',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: Radius.xs,
  },
  timeText: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
  },
  timeTextMuted: {
    fontSize: 11,
    fontWeight: '600',
    color: '#71717a',
  },
  classDetails: {
    flex: 1,
  },
  subjectText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#0f172a',
  },
  instructorText: {
    fontSize: 11,
    color: '#71717a',
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: '#f1f5f9',
    marginVertical: 4,
  },
  noticeCard: {
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
  noticeHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  noticeDate: {
    fontSize: 11,
    color: '#94a3b8',
  },
  noticeHeadline: {
    fontSize: 14,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  noticePreview: {
    fontSize: 12,
    color: '#52525b',
    lineHeight: 18,
  },
});
