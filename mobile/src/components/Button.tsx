import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
  ViewStyle,
  TextStyle,
  View,
} from 'react-native';
import { LucideIcon } from 'lucide-react-native';
import { Radius } from '../constants/theme';

export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'destructive' | 'glass';
export type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  icon?: LucideIcon;
  iconPosition?: 'left' | 'right';
  loading?: boolean;
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'md',
  icon: Icon,
  iconPosition = 'left',
  loading = false,
  disabled = false,
  style,
  textStyle,
}) => {
  const getContainerStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryContainer;
      case 'secondary':
        return styles.secondaryContainer;
      case 'outline':
        return styles.outlineContainer;
      case 'destructive':
        return styles.destructiveContainer;
      case 'glass':
        return styles.glassContainer;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case 'primary':
        return styles.primaryText;
      case 'secondary':
        return styles.secondaryText;
      case 'outline':
        return styles.outlineText;
      case 'destructive':
        return styles.destructiveText;
      case 'glass':
        return styles.glassText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.smContainer;
      case 'md':
        return styles.mdContainer;
      case 'lg':
        return styles.lgContainer;
    }
  };

  const iconColor =
    variant === 'primary' || variant === 'destructive' || variant === 'glass'
      ? '#ffffff'
      : '#2563eb';

  return (
    <TouchableOpacity
      style={[
        styles.baseContainer,
        getContainerStyle(),
        getSizeStyle(),
        (disabled || loading) && styles.disabled,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {loading ? (
        <ActivityIndicator color={iconColor} size="small" />
      ) : (
        <View style={styles.contentRow}>
          {Icon && iconPosition === 'left' && (
            <Icon size={size === 'sm' ? 14 : 18} color={iconColor} />
          )}
          <Text style={[styles.baseText, getTextStyle(), textStyle]}>{title}</Text>
          {Icon && iconPosition === 'right' && (
            <Icon size={size === 'sm' ? 14 : 18} color={iconColor} />
          )}
        </View>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  baseContainer: {
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  baseText: {
    fontWeight: '600',
    letterSpacing: -0.2,
  },
  primaryContainer: {
    backgroundColor: '#2563eb',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },
  primaryText: {
    color: '#ffffff',
  },
  secondaryContainer: {
    backgroundColor: '#f4f4f5',
    borderWidth: 1,
    borderColor: '#e4e4e7',
  },
  secondaryText: {
    color: '#18181b',
  },
  outlineContainer: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#2563eb',
  },
  outlineText: {
    color: '#2563eb',
  },
  destructiveContainer: {
    backgroundColor: '#ef4444',
  },
  destructiveText: {
    color: '#ffffff',
  },
  glassContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  glassText: {
    color: '#ffffff',
  },
  smContainer: {
    height: 32,
    paddingHorizontal: 12,
  },
  mdContainer: {
    height: 42,
    paddingHorizontal: 16,
  },
  lgContainer: {
    height: 48,
    paddingHorizontal: 22,
  },
  disabled: {
    opacity: 0.5,
  },
});
