import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { ClerkProvider, ClerkLoaded } from '@clerk/clerk-expo';
import { tokenCache } from '../src/lib/clerk';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

const publishableKey =
  Constants.expoConfig?.extra?.clerkPublishableKey ||
  process.env.EXPO_PUBLIC_CLERK_PUBLISHABLE_KEY ||
  'pk_test_d2lsbGluZy1idXJyby0xNi5jbGVyay5hY2NvdW50cy5kZXYk';

export default function RootLayout() {
  return (
    <ClerkProvider publishableKey={publishableKey} tokenCache={tokenCache}>
      <ClerkLoaded>
        <SafeAreaProvider>
          <StatusBar style="dark" />
          <Stack
            screenOptions={{
              headerShown: false,
              contentStyle: { backgroundColor: '#f8fafc' },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="(auth)" options={{ headerShown: false }} />
            <Stack.Screen
              name="exams/index"
              options={{
                headerShown: true,
                title: 'Exams & Tests',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
            <Stack.Screen
              name="results/index"
              options={{
                headerShown: true,
                title: 'Academic Results',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
            <Stack.Screen
              name="fees/index"
              options={{
                headerShown: true,
                title: 'Fees & Payments',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
            <Stack.Screen
              name="notes/index"
              options={{
                headerShown: true,
                title: 'Notes & Resources',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
            <Stack.Screen
              name="notices/index"
              options={{
                headerShown: true,
                title: 'Notice Board',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
            <Stack.Screen
              name="settings/index"
              options={{
                headerShown: true,
                title: 'Settings',
                headerBackTitle: 'Back',
                headerShadowVisible: false,
                headerStyle: { backgroundColor: '#ffffff' },
                headerTintColor: '#0f172a',
              }}
            />
          </Stack>
        </SafeAreaProvider>
      </ClerkLoaded>
    </ClerkProvider>
  );
}
