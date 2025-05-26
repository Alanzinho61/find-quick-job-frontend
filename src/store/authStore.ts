import { create } from 'zustand'

// interface AuthState {
//     token: string | null;
//     setToken: (token: string) => void;
//     clearToken: () => void;
// }

// export const useAuthStore = create<AuthState>((set) => ({
//     token: localStorage.getItem('token'),
//     setToken: (token: string) => {
//         localStorage.setItem('token', token)
//         set({ token });
//     },
//     clearToken: () => {
//         localStorage.removeItem('token');
//         set({ token: null });
//     },
// }));

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
    token: null,
    user: null,
    setToken: (token) => set({ token }),
    setUser: (user) => set({ user }),
    logout: () => set({ token: null, user: null }),
}));