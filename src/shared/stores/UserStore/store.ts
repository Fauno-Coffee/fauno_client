import { createStore } from 'zustand/vanilla';

interface IUser {
  id?: number;
}

export type UserState = {
  token: string;
  user: IUser;
};

export type UserActions = {
  setUser: (token: string, user: IUser) => void;
};

export type UserStore = UserState & UserActions;

export const defaultInitState: UserState = {
  token: '',
  user: {},
};

export const createUserStore = (initState: UserState = defaultInitState) => {
  return createStore<UserStore>()(set => ({
    ...initState,

    setUser: (token: string, user: IUser) => {
      set({ token, user });
    },
  }));
};
