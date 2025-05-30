import { create } from 'zustand'

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthState {
    token: string | null;
    user: User | null;
    setToken: (token: string) => void;
    setUser: (user: User) => void;
    logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
    token: localStorage.getItem('token'),
    user: null,
    setToken: (token: string) => set({ token }),
    setUser: (user) => set({ user }),
    logout: () => set({ token: null, user: null }),
}));

