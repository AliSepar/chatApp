import { doc, getDoc } from "firebase/firestore";
import { create } from "zustand";
import { db } from "./firebase";

export const useUserStore = create((set) => ({
  currentUser: null,
  isLoading: true,
  fetchUserInfo: async (uid) => {
    if (!uid) return set({ currentUser: null, isLoading: false });

    try {
      // will get the data base on the user id (uid)
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ currentUser: docSnap.data(), isLoading: false });
      } else {
        set({ currentUser: null, isLoading: true });
      }
    } catch (error) {
      console.log(error);
      return set({ currentUser: null, isLoading: false });
    }
  },
}));
