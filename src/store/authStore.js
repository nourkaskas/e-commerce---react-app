
import { create } from "zustand";

const useAuthStore = create((set) => ({
  userEmail: localStorage.getItem("userEmail") || null,
  login: (email) => {
    localStorage.setItem("userEmail", email);
    set({ userEmail: email });
  },
  logout: () => {
    localStorage.removeItem("userEmail");
    set({ userEmail: null });
  },
}));

export default useAuthStore;
