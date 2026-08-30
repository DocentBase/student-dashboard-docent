import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Bell, Search } from 'lucide-react-native';
import { Colors, Spacing } from '../constants/theme';
import { useRouter } from 'expo-router';

interface CockpitHeaderProps {
  title?: string;
  subtitle?: string;
  studentName?: string;
  studentAvatar?: string;
  showSearch?: boolean;
  onSearchPress?: () => void;
  onNotificationPress?: () => void;
}

export const CockpitHeader: React.FC<CockpitHeaderProps> = ({
  title,
  subtitle,
  studentName = 'Solaman',
  studentAvatar,
  showSearch = true,
  onSearchPress,
  onNotificationPress,
}) => {
  const insets = useSafeAreaInsets();
  const router = useRouter();
  const theme = Colors.light;

  return (
    <View style={[styles.container, { paddingTop: Math.max(insets.top, 12) }]}>
      <View style={styles.content}>
        <View style={styles.leftSection}>
          <TouchableOpacity
            style={styles.avatarButton}
            onPress={() => router.push('/(tabs)/profile')}
            activeOpacity={0.8}
          >
            {studentAvatar ? (
              <Image source={{ uri: studentAvatar }} style={styles.avatarImage} />
            ) : (
              <View style={styles.avatarFallback}>
                <Text style={styles.avatarText}>
                  {studentName.slice(0, 2).toUpperCase()}
                </Text>
              </View>
            )}
            <View style={styles.onlineDot} />
          </TouchableOpacity>

          <View style={styles.titleContainer}>
            {title ? (
              <>
                <Text style={styles.titleText}>{title}</Text>
                {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
              </>
            ) : (
              <>
                <View style={styles.eyebrowRow}>
                  <View style={styles.statusPill}>
                    <View style={styles.statusDot} />
                    <Text style={styles.statusText}>ENROLLED STUDENT</Text>
                  </View>
                </View>
                <Text style={styles.greetingText}>Hi, {studentName} 👋</Text>
              </>
            )}
          </View>
        </View>

        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity
              style={styles.iconButton}
              onPress={onSearchPress}
              activeOpacity={0.7}
            >
              <Search size={18} color={theme.textSecondary} />
            </TouchableOpacity>
          )}
          <TouchableOpacity
            style={styles.iconButton}
            onPress={onNotificationPress || (() => router.push('/notices'))}
            activeOpacity={0.7}
          >
            <Bell size={18} color={theme.textSecondary} />
            <View style={styles.badgeDot} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e4e4e7',
    paddingBottom: 12,
    paddingHorizontal: Spacing.lg,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    gap: 12,
  },
  avatarButton: {
    position: 'relative',
  },
  avatarImage: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#e2e8f0',
  },
  avatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 3,
  },
  avatarText: {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: '700',
  },
  onlineDot: {
    position: 'absolute',
    bottom: -1,
    right: -1,
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#10b981',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  titleContainer: {
    flex: 1,
  },
  eyebrowRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 2,
  },
  statusPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#eff6ff',
    paddingHorizontal: 6,
    paddingVertical: 2,
    borderRadius: 9999,
    gap: 4,
  },
  statusDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#2563eb',
  },
  statusText: {
    fontSize: 9,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 0.5,
  },
  greetingText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  titleText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.3,
  },
  subtitleText: {
    fontSize: 12,
    color: '#71717a',
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  badgeDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#ef4444',
  },
});
