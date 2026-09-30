import axiosInstance from "@/lib/axios";
import {create} from "zustand"

interface ChatStore {
    users: any[];
    fetchUsers: (token: string) => Promise<void>;
    isLoading: boolean;
    error: string | null; 
}

export const useChatStore = create<ChatStore>((set)=>({
users: [],
isLoading: false,
error: null,
    fetchUsers: async(token) =>{
        set({ isLoading: true, error: null});
        try {
            const response = await axiosInstance.get("/users", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            set({ users: response.data });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Unable to load friends activity",
            });
        } finally {
            set({ isLoading: false});
        }
    }
}))
