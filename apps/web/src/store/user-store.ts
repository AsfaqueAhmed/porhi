import { create } from 'zustand';

export interface ActiveSubject {
  id: string;
  code: string;
  nameBangla: string;
  syllabusYear: number;
  program?: string; // 'SSC' | 'HSC'
}

export interface UserProfile {
  id: string;
  phoneNumber?: string;
  role?: string;
  isGuest?: boolean;
}

interface UserState {
  guestId: string | null;
  token: string | null;
  user: UserProfile | null;
  activeSubject: ActiveSubject | null;
  streakDays: number;
  
  setGuestId: (id: string | null) => void;
  setToken: (token: string | null) => void;
  setUser: (user: UserProfile | null) => void;
  setActiveSubject: (subject: ActiveSubject | null) => void;
  setStreakDays: (streak: number) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  guestId: null,
  token: null,
  user: null,
  activeSubject: {
    id: 'sub-ssc-phy',
    code: 'PHY101',
    nameBangla: 'পদার্থবিজ্ঞান',
    syllabusYear: 2026,
    program: 'SSC',
  },
  streakDays: 3,

  setGuestId: (id) => set({ guestId: id }),
  setToken: (token) => {
    if (typeof window !== 'undefined') {
      if (token) {
        localStorage.setItem('pori_auth_token', token);
      } else {
        localStorage.removeItem('pori_auth_token');
      }
    }
    set({ token });
  },
  setUser: (user) => set({ user }),
  setActiveSubject: (subject) => set({ activeSubject: subject }),
  setStreakDays: (streakDays) => set({ streakDays }),
  logout: () => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('pori_auth_token');
    }
    set({ token: null, user: null });
  },
}));
