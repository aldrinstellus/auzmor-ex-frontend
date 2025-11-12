import { create } from "zustand";
import apiService from "utils/apiService";

const permissionView: Record<string, string> = {
  administrative_view: "administrativeView",
  learner_view: "learnerView",
};

interface Role {
  id: number;
  name: string;
  display_name: string;
  organization_id: number;
  locale: string;
  created_at: number;
  updated_at: number;
}

interface PermissionState {
  accessibleModules: string[];
  roles: Role[];
  loading: boolean;
  error: string | null;
  fetchAccessibleModules: () => Promise<void>;
  fetchRoles: (params?: Record<string, any>) => Promise<void>;
  getAccessibleModules: () => string[];
  getRoles: () => Role[];
}

const usePermissionStore = create<PermissionState>((set, get) => ({
  accessibleModules: [],
  roles: [],
  loading: false,
  error: null,
  fetchAccessibleModules: async () => {
    set({ loading: true, error: null });
    try {
      const res = await apiService.get("/accessible_modules");
      const permissions = Object.keys(res.data.result.data)
        .reduce<string[]>((acc, key) => {
          const prefix = permissionView[key] || key;
          acc.push(...res?.data?.result?.data[key].map((m: string) => `${prefix}:${m}`));
          return acc;
        }, []);
      set({ accessibleModules: permissions, loading: false });
    } catch (err) {
      set({ error: "Failed to fetch modules", loading: false });
    }
  },

  fetchRoles: async (params = {}) => {
    try {
      const res = await apiService.get("/roles", params);
      const roles = res?.data?.result?.data || [];
      set({ roles });
    } catch (error) {
      console.error("Failed to fetch roles:", error);
    }
  },

  getAccessibleModules: () => get().accessibleModules,

  getRoles: () => get().roles,
}));

export default usePermissionStore;
