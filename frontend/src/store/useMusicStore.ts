import axiosInstance from "@/lib/axios";
import type { Album, Song, Stats } from "@/types";
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
    stats: Stats;

    fetchAlbums: () => Promise<void>;
    fetchAlbumById: (id: string) => Promise<void>;
    fetchFeaturedSongs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
    fetchStats: () => Promise<void>;
    fetchSongs: () => Promise<void>;
    deleteSong: (id: string) => Promise<void>;
    deleteAlbum: (id: string) => Promise<void>;
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
    stats:{
        totalSongs: 0,
        totalAlbums: 0,
        totalUsers: 0,
        totalArtist: 0
    },
    
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
    fetchStats: async() =>{
        set({ isLoading: true, error: null})
        try {
            const responce = await axiosInstance.get("/stats");
            set({ stats: responce.data});
        } catch (error: any) {
            set({error: error.message});
        } finally {
            set({isLoading: false})
        }
    },
    fetchSongs: async() =>{
        set({isLoading: true, error: null});
        try {
            const response = await axiosInstance.get("/song");
            set({songs: response.data});
        } catch (error: any) {
            set({ error: error.message});
        } finally{
            set({isLoading: false});
        }
    },
    deleteSong: async(id)=>{
        set({isLoading: true, error: null});
        try {
            await axiosInstance.delete(`/admin/songs/${id}`)
            set(state=>({
                songs: state.songs.filter(song => song._id !== id)
            }))
        } catch (error: any) {
            set({ error: error.response?.data?.message || error.message || "Failed to delete song" })
        } finally{
            set({isLoading: false})
        }
    },
    deleteAlbum: async(id)=>{
        set({isLoading: true, error: null});
        try {
            await axiosInstance.delete(`/admin/albums/${id}`)
            set(state=>({
                albums: state.albums.filter((album)=> album._id !== id),
                songs: state.songs.map((song)=> 
                song.albumId === state.albums.find((a)=> a._id === id)?.title ? {...song, album: null}: song
                ),
            }));
        } catch (error: any) {
            set({error: error.message})
        } finally{
            set({isLoading: false})
        }
    },

}));



export { useMusicStore };
