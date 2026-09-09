import Topbar from '@/components/Topbar'
import axiosInstance from '@/lib/axios'
import { useEffect, useState } from 'react'
// Old import: import React from 'react'

type Song = {
  _id: string;
  title: string;
  artist: string;
  imageUrl: string;
  audioUrl: string;
};

const HomePage = () => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadFeaturedSongs = async () => {
      try {
        const response = await axiosInstance.get<Song[]>('/song/featured');
        setSongs(response.data);
      } catch {
        setError('Unable to load songs. Please check that the backend is running.');
      }
    };

    loadFeaturedSongs();
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Topbar />
      <main className="mx-auto max-w-6xl px-6 py-10">
        <h1 className="text-3xl font-bold">Featured Songs</h1>
        {error && <p className="mt-4 text-destructive">{error}</p>}
        {!error && songs.length === 0 && (
          <p className="mt-4 text-muted-foreground">Loading songs...</p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {songs.map((song) => (
            <a
              key={song._id}
              href={song.audioUrl}
              target="_blank"
              rel="noreferrer"
              className="overflow-hidden rounded-xl bg-card ring-1 ring-foreground/10"
            >
              <img src={song.imageUrl} alt={song.title} className="aspect-square w-full object-cover" />
              <div className="p-3">
                <h2 className="truncate font-medium">{song.title}</h2>
                <p className="truncate text-sm text-muted-foreground">{song.artist}</p>
              </div>
            </a>
          ))}
        </div>
      </main>
    </div>
  )
}

export default HomePage

/* Old code kept below the corrected data-connected page:
const HomePage = () => {
  return (
    <div>
      <Topbar />
    </div>
  )
}
*/
