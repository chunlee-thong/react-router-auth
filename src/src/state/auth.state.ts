import create from "zustand";

export interface AuthState {
  isLoggedIn: boolean;
  login: (token: string) => void;
  setLogin: () => void;
  logout: () => void;
}

// And it is going to work for both
export const useAuth = create<AuthState>((set) => ({
  isLoggedIn: localStorage.getItem("token") != null,
  setLogin: () => {
    const token = localStorage.getItem("token");
    set({ isLoggedIn: token != null });
  },
  login: (token: string) => {
    localStorage.setItem("token", token);
    set({ isLoggedIn: true });
  },
  logout: () => {
    localStorage.clear();
    set({ isLoggedIn: false });
  },
}));
