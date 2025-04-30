import { createStore } from 'zustand/vanilla';

interface IUser {
  id: number;
  category: string;
  createdAt: string;
  updatedAt: string;
  discount: number;
  mail: string;
  name: string;
  phone: string;
  prevCodeDatetime: string;
  recoveryCode: string;
  role: string;
  total: number;
  wrongRecoveryCodeAttempts: number;
}

export type UserState = {
  token: string;
  user: Partial<IUser>;
};

export type UserActions = {
  setUser: (token: string, user: Partial<IUser>) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  token: '',
  user: {},
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(set => ({
    ...initState,

    setUser: (token: string, user: Partial<IUser>) => {
      set({ token, user });
    },
  }));
};
