import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useUserStore = create()(
  persist(
    (set) => ({
      // State
      isLoggedIn: false,
      user: null,
      token: null,
      loading: false,
      error: null,

      // Actions
      setUser: (user) => set({ user }),
      setToken: (token) => set({ token }),
      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),
      
      // Auth flow: login stores user + token and sets isLoggedIn
      login: (user, token) => 
        set({ 
          isLoggedIn: true, 
          user, 
          refreshToken: token, 
          error: null,
          loading: false 
        }),
      
      // Clears all auth data
      logout: () => 
        set({ 
          isLoggedIn: false, 
          user: null, 
          refreshToken: null, 
          error: null,
          loading: false 
        }),
      
      clearError: () => set({ error: null }),
    }),
    {
      name: 'user-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
 
