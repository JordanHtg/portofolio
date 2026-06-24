import { create } from 'zustand';

interface SecretModeState {
  isSecretMode: boolean;
  setSecretMode: (val: boolean) => void;
}

export const useSecretMode = create<SecretModeState>((set) => ({
  isSecretMode: false,
  setSecretMode: (val) => set({ isSecretMode: val }),
}));
