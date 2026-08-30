import * as SecureStore from 'expo-secure-store';
import { Platform } from 'react-native';

export interface TokenCache {
  getToken: (key: string) => Promise<string | null>;
  saveToken: (key: string, value: string) => Promise<void>;
  clearToken?: (key: string) => Promise<void>;
}

export const createTokenCache = (): TokenCache => {
  return {
    getToken: async (key: string) => {
      try {
        if (Platform.OS === 'web') {
          if (typeof localStorage !== 'undefined') {
            return localStorage.getItem(key);
          }
          return null;
        }
        return await SecureStore.getItemAsync(key);
      } catch (err) {
        console.error('SecureStore get item error: ', err);
        return null;
      }
    },
    saveToken: async (key: string, value: string) => {
      try {
        if (Platform.OS === 'web') {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(key, value);
          }
          return;
        }
        await SecureStore.setItemAsync(key, value);
      } catch (err) {
        console.error('SecureStore save item error: ', err);
      }
    },
    clearToken: async (key: string) => {
      try {
        if (Platform.OS === 'web') {
          if (typeof localStorage !== 'undefined') {
            localStorage.removeItem(key);
          }
          return;
        }
        await SecureStore.deleteItemAsync(key);
      } catch (err) {
        console.error('SecureStore delete item error: ', err);
      }
    },
  };
};

export const tokenCache = createTokenCache();
