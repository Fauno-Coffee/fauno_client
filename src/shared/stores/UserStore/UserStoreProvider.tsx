'use client';

import { type ReactNode, createContext, useRef, useContext, useEffect } from 'react';
import { useStore } from 'zustand';

import { type UserStore, createUserStore } from './store';
import { apiUrlBuilder } from '@/shared/utils/urlBuilder';
import axios from 'axios';

export type UserStoreApi = ReturnType<typeof createUserStore>;

export const UserStoreContext = createContext<UserStoreApi | undefined>(undefined);

export interface UserStoreProviderProps {
  children: ReactNode;
}

const fetchUser = async (storeState: UserStore | undefined) => {
  try {
    const token = localStorage.getItem('token');
    if (token) {
      const res = await axios.get(apiUrlBuilder('/user/check'), {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (storeState && !!res.data.token && !!res.data.user) {
        storeState.setUser(res.data.token, res.data.user);
      }
    }
  } catch (error) {
    console.log(error);
  }
};

export const UserStoreProvider = ({ children }: UserStoreProviderProps) => {
  const storeRef = useRef<UserStoreApi | null>(null);
  if (storeRef.current === null) {
    storeRef.current = createUserStore();
  }

  useEffect(() => {
    fetchUser(storeRef.current?.getState());
  }, []);

  return <UserStoreContext.Provider value={storeRef.current}>{children}</UserStoreContext.Provider>;
};

export const useUserStore = <T,>(selector: (store: UserStore) => T): T => {
  const UserStore = useContext(UserStoreContext);

  if (!UserStore) {
    throw new Error(`useUserStore must be used within UserStoreProvider`);
  }

  return useStore(UserStore, selector);
};
