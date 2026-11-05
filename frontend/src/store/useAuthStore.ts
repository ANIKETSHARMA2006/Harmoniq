import axiosInstance from "@/lib/axios";
import {create} from "zustand"

interface AuthStore {
    isAdmin: boolean;
    isLoading: boolean;
    error: string | null;

    checkAdminStatus: (token: string) => Promise<void>;
    reset: () => void;
}

export const useAuthStore = create<AuthStore>((set)=>({
    isAdmin: false,
    isLoading: false,
    error: null,

    checkAdminStatus: async (token: string) => {
    set({ isLoading: true, error: null });

    try {
        const response = await axiosInstance.get("/admin/check", {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });

        set({ isAdmin: response.data.admin === true });
    } catch (error: any) {
        set({
            isAdmin: false,
            error: error.response?.data?.message || "Admin check failed"
        });
    } finally {
        set({ isLoading: false });
    }
},

    reset: ()=> {
        set({isAdmin: false, isLoading: false, error: null});
    }
}))
