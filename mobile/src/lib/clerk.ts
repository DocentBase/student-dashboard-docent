import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface TokenCache {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, value: string) => Promise<void>;
  clearToken?: (key: string) => Promise<void>;
}

export const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string): Promise<string | null> => {
      try {
        if (Platform.OS === 'web') {
          if (typeof window !== 'undefined' && window.localStorage) {
            return window.localStorage.getItem(key);
          }
          return null;
        }
        return await SecureStore.getItemAsync(key);
      } catch (err) {
        console.warn('SecureStore getToken warning:', err);
        return null;
      }
    },
    saveToken: async (key: string, value: string): Promise<void> => {
      try {
        if (Platform.OS === 'web') {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.setItem(key, value);
          }
          return;
        }
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        console.warn('SecureStore saveToken warning:', err);
      }
    },
    clearToken: async (key: string): Promise<void> => {
      try {
        if (Platform.OS === 'web') {
          if (typeof window !== 'undefined' && window.localStorage) {
            window.localStorage.removeItem(key);
          }
          return;
        }
        await SecureStore.deleteItemAsync(key);
      } catch (err) {
        console.warn('SecureStore clearToken warning:', err);
      }
    },
  };
};

export const tokenCache = createTokenCache();
