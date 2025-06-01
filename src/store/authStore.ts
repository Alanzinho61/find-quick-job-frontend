import { create } from 'zustand'

interface User {
    id: string;
    fullName: string;
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
    user: localStorage.getItem('user')
        ? JSON.parse(localStorage.getItem('user')!)
        : null,
    setToken: (token: string) => {
        localStorage.setItem('token', token);
        set({ token });
    },
    setUser: (user: User) => {
        localStorage.setItem('user', JSON.stringify(user))
        set({ user })
    },
    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        set({ token: null, user: null })
    }

    //setToken: (token: string) => set({ token }),
    //setUser: (user) => set({ user }),
    //logout: () => set({ token: null, user: null }),
}));

