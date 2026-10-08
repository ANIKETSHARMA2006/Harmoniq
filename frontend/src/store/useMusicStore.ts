import axiosInstance from "@/lib/axios";
import type { Album, Song } from "@/types";
import { create } from "zustand";

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSongs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
}

const useMusicStore = create<MusicStore>((set) => ({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSongs: [],
    madeForYouSongs: [],
    trendingSongs: [],

    fetchAlbums: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/albums");
            set({ albums: response.data });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to fetch albums",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchAlbumById: async (id) => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get(`/albums/${id}`);
            set({ currentAlbum: response.data });
        } catch (error: any) {
            set({
                error: error.response?.data?.message || "Failed to fetch album",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchFeaturedSongs: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/song/featured");
            set({ featuredSongs: response.data });
        } catch (error: any) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch featured songs",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMadeForYouSongs: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/song/made-for-you");
            set({ madeForYouSongs: response.data });
        } catch (error: any) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch made-for-you songs",
            });
        } finally {
            set({ isLoading: false });
        }
    },

    fetchTrendingSongs: async () => {
        set({
            isLoading: true,
            error: null,
        });

        try {
            const response = await axiosInstance.get("/song/trending");
            set({ trendingSongs: response.data });
        } catch (error: any) {
            set({
                error:
                    error.response?.data?.message ||
                    "Failed to fetch trending songs",
            });
        } finally {
            set({ isLoading: false });
        }
    },
}));

export { useMusicStore };