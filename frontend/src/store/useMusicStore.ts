import axiosInstance from '@/lib/axios';
import {create} from 'zustand';

interface MusicStore {
    songs: any[];
    albums: any[];
    isLoading: boolean;
    error: string | null;
    fetchAlbums: ()=> promise<void>;
}

const useMusicStore = create<MusicStore>((set)=>({
    albums: [],
    songs: [],
    isLoading: false,
    error: null,
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
}))

export {useMusicStore}