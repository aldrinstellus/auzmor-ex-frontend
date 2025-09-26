import { create } from "zustand";
import apiService from "utils/apiService";

interface PermissionState {
  accessibleModules: string[];
  loading: boolean;
  error: string | null;
  fetchAccessibleModules: () => Promise<void>;
}

const usePermissionStore = create<PermissionState>((set) => ({
  accessibleModules: [],
  loading: false,
  error: null,
  fetchAccessibleModules: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiService.get('/accessible_modules');
      set({ accessibleModules: res.data, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch modules", loading: false });
    }
  },
}));

export default usePermissionStore;
