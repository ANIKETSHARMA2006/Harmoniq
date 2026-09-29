import axiosInstance from '@/lib/axios';
import type { Album, Song } from '@/types';
import {create} from 'zustand';

interface MusicStore {
    songs: Song[];
    albums: Album[];
    isLoading: boolean;
    error: string | null;
    currentAlbum: Album | null;
    featuredSomgs: Song[];
    madeForYouSongs: Song[];
    trendingSongs: Song[];

    fetchAlbums: ()=> Promise<void>;
    fetchAlbumById: (id: string)=> Promise<void>;
    fetchFeaturedSomgs: () => Promise<void>;
    fetchMadeForYouSongs: () => Promise<void>;
    fetchTrendingSongs: () => Promise<void>;
}

const useMusicStore = create<MusicStore>((set)=>({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
    currentAlbum: null,
    featuredSomgs: [],
    madeForYouSongs: [],
    trendingSongs: [],

        fetchAlbums: async () =>{
        set({
            isLoading: true,
            error: null
        })
        try {
            const response = await axiosInstance.get("/albums");
            set({albums: response.data});
        } catch (error:any) {
            set({error: error.response.data.message})
        }
        finally{
            set({isLoading: false});
        }
    },
        fetchAlbumById: async (id) => {
            set({isLoading: true, error: null});
            try {
                const response = await axiosInstance.get(`/albums/${id}`);
                set({ currentAlbum: response.data})
            } catch (error :any) {
                set({error: error.response.data.message});
            } finally{
                set({isLoading: false});
            }
        },
         fetchFeaturedSomgs: async () =>{

        },
        fetchMadeForYouSongs: async () =>{

        },
        fetchTrendingSongs: async () =>{

        },
}))

export {useMusicStore}