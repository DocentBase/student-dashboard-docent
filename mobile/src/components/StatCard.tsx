import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Colors, Spacing, Radius } from '../constants/theme';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  iconColor?: string;
  iconBg?: string;
  trend?: {
    value: string;
    isPositive?: boolean;
    isNeutral?: boolean;
  };
  onPress?: () => void;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconColor = '#2563eb',
  iconBg = '#eff6ff',
  trend,
  onPress,
}) => {
  const CardContainer = onPress ? TouchableOpacity : View;

  return (
    <CardContainer
      style={styles.card}
      onPress={onPress}
      activeOpacity={onPress ? 0.75 : 1}
    >
      <View style={styles.header}>
        <View style={[styles.iconBox, { backgroundColor: iconBg }]}>
          <Icon size={20} color={iconColor} />
        </View>
        {trend && (
          <View
            style={[
              styles.trendBadge,
              trend.isPositive
                ? styles.trendPositive
                : trend.isNeutral
                ? styles.trendNeutral
                : styles.trendNegative,
            ]}
          >
            <Text
              style={[
                styles.trendText,
                trend.isPositive
                  ? styles.trendTextPositive
                  : trend.isNeutral
                  ? styles.trendTextNeutral
                  : styles.trendTextNegative,
              ]}
            >
              {trend.value}
            </Text>
          </View>
        )}
      </View>

      <View style={styles.body}>
        <Text style={styles.valueText}>{value}</Text>
        <Text style={styles.titleText}>{title}</Text>
        {subtitle && <Text style={styles.subtitleText}>{subtitle}</Text>}
      </View>
    </CardContainer>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.lg,
    padding: Spacing.lg,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 1,
    flex: 1,
    minWidth: 140,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  iconBox: {
    width: 38,
    height: 38,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  trendBadge: {
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 9999,
  },
  trendPositive: {
    backgroundColor: '#ecfdf5',
  },
  trendNeutral: {
    backgroundColor: '#eff6ff',
  },
  trendNegative: {
    backgroundColor: '#fef2f2',
  },
  trendText: {
    fontSize: 10,
    fontWeight: '700',
  },
  trendTextPositive: {
    color: '#047857',
  },
  trendTextNeutral: {
    color: '#1d4ed8',
  },
  trendTextNegative: {
    color: '#b91c1c',
  },
  body: {
    gap: 2,
  },
  valueText: {
    fontSize: 22,
    fontWeight: '700',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  titleText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#52525b',
  },
  subtitleText: {
    fontSize: 11,
    color: '#94a3b8',
    marginTop: 2,
  },
});
