import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { useSignIn } from '@clerk/clerk-expo';
import { useRouter } from 'expo-router';
import { GraduationCap, Lock, Mail, ArrowRight } from 'lucide-react-native';
import { Button } from '../../src/components/Button';
import { Colors, Radius, Spacing } from '../../src/constants/theme';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function SignInScreen() {
  const { signIn, setActive, isLoaded } = useSignIn();
  const router = useRouter();

  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const onSignInPress = async () => {
    if (!isLoaded) return;
    if (!emailAddress.trim()) {
      setErrorMsg('Please enter your student email address.');
      return;
    }
    if (!password) {
      setErrorMsg('Please enter your password.');
      return;
    }

    setLoading(true);
    setErrorMsg('');

    try {
      const completeSignIn = await signIn.create({
        identifier: emailAddress.trim(),
        password,
      });

      if (completeSignIn.createdSessionId) {
        await setActive({ session: completeSignIn.createdSessionId });
        router.replace('/(tabs)');
      } else if (completeSignIn.status === 'complete') {
        router.replace('/(tabs)');
      } else {
        setErrorMsg('Additional authentication step required. Please try again.');
      }
    } catch (err: any) {
      const message =
        err?.errors?.[0]?.message ||
        err?.errors?.[0]?.longMessage ||
        err?.message ||
        'Failed to sign in. Please check credentials.';
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}
      >
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.header}>
            <View style={styles.logoBadge}>
              <GraduationCap size={28} color="#ffffff" />
            </View>
            <Text style={styles.appName}>DocentBase</Text>
            <Text style={styles.appTagline}>STUDENT PORTAL & COCKPIT</Text>
          </View>

          <View style={styles.formCard}>
            <Text style={styles.cardTitle}>Student Sign In</Text>
            <Text style={styles.cardSubtitle}>
              Enter your student credentials to access your dashboard.
            </Text>

            {errorMsg ? (
              <View style={styles.errorBox}>
                <Text style={styles.errorText}>{errorMsg}</Text>
              </View>
            ) : null}

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Email Address</Text>
              <View style={styles.inputWrapper}>
                <Mail size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="student@docentbase.com"
                  placeholderTextColor="#94a3b8"
                  value={emailAddress}
                  onChangeText={setEmailAddress}
                  autoCapitalize="none"
                  keyboardType="email-address"
                />
              </View>
            </View>

            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Password</Text>
              <View style={styles.inputWrapper}>
                <Lock size={18} color="#94a3b8" style={styles.inputIcon} />
                <TextInput
                  style={styles.input}
                  placeholder="••••••••"
                  placeholderTextColor="#94a3b8"
                  value={password}
                  onChangeText={setPassword}
                  secureTextEntry
                />
              </View>
            </View>

            <Button
              title="Sign In to Student Cockpit"
              onPress={onSignInPress}
              loading={loading}
              size="lg"
              style={styles.submitBtn}
            />

            <TouchableOpacity
              style={styles.guestLink}
              onPress={() => router.replace('/(tabs)')}
            >
              <Text style={styles.guestText}>Continue as Demo Student</Text>
              <ArrowRight size={14} color="#2563eb" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  keyboardView: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.xl,
    justifyContent: 'center',
  },
  header: {
    alignItems: 'center',
    marginBottom: Spacing.xl,
  },
  logoBadge: {
    width: 56,
    height: 56,
    borderRadius: 16,
    backgroundColor: '#2563eb',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#2563eb',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 4,
    marginBottom: 12,
  },
  appName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#0f172a',
    letterSpacing: -0.5,
  },
  appTagline: {
    fontSize: 11,
    fontWeight: '700',
    color: '#2563eb',
    letterSpacing: 1.2,
    marginTop: 2,
  },
  formCard: {
    backgroundColor: '#ffffff',
    borderRadius: Radius.xl,
    padding: Spacing.xl,
    borderWidth: 1,
    borderColor: '#e4e4e7',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#0f172a',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 13,
    color: '#71717a',
    marginBottom: Spacing.lg,
    lineHeight: 18,
  },
  errorBox: {
    backgroundColor: '#fef2f2',
    padding: 10,
    borderRadius: Radius.sm,
    borderWidth: 1,
    borderColor: '#fca5a5',
    marginBottom: Spacing.md,
  },
  errorText: {
    color: '#b91c1c',
    fontSize: 12,
    fontWeight: '500',
  },
  inputGroup: {
    marginBottom: Spacing.md,
  },
  inputLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#334155',
    marginBottom: 6,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e4e4e7',
    borderRadius: Radius.sm,
    backgroundColor: '#ffffff',
    paddingHorizontal: 12,
    height: 44,
  },
  inputIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    height: '100%',
    color: '#0f172a',
    fontSize: 14,
  },
  submitBtn: {
    marginTop: Spacing.md,
  },
  guestLink: {
    marginTop: Spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
  },
  guestText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#2563eb',
  },
});
