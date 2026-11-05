import { useAuthStore } from '@/store/useAuthStore';
import { useMusicStore } from '@/store/useMusicStore';
import { useEffect, useRef } from 'react';
import Header from './components/Header';
import DashboardStats from './components/DashboardStats';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Album, Music } from 'lucide-react';
import SongsTabContent from './components/SongsTabContent';
import AlbumsTabContent from './components/AlbumsTabContent';
import gsap from 'gsap';

const AdminPage = () => {
  const { isAdmin, isLoading } = useAuthStore();

  const { fetchAlbums, fetchSongs, fetchStats } = useMusicStore();

  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchAlbums();
    fetchSongs();
    fetchStats();
  }, [fetchAlbums, fetchSongs, fetchStats]);

  // GSAP entrance animation
  useEffect(() => {
    if (isLoading || !isAdmin || !pageRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: {
          ease: 'power3.out',
        },
      });

      // Main page entrance
      tl.fromTo(
        pageRef.current,
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          clearProps: 'transform',
        }
      );

      // Header entrance
      tl.fromTo(
        '.admin-header',
        {
          opacity: 0,
          y: -25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.35'
      );

      // Statistics cards: one after another
      tl.fromTo(
        '.admin-stats-card',
        {
          opacity: 0,
          y: 45,
          scale: 0.85,
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          stagger: 0.15,
          ease: 'elastic.out(1, 0.65)',
        },
        '-=0.2'
      );

      // Tabs entrance (same as before)
      tl.fromTo(
        '.admin-tabs',
        {
          opacity: 0,
          y: 25,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
        },
        '-=0.3'
      );
    }, pageRef);

    return () => {
      ctx.revert();
    };
  }, [isLoading, isAdmin]);

  if (!isAdmin && !isLoading) {
    return <div>Unauthorized</div>;
  }

  if (isLoading) return null;

  return (
    <div
      ref={pageRef}
      className="min-h-screen bg-background p-4 text-white sm:p-8"
    >
      <div className="admin-header">
        <Header />
      </div>

      <div>
        <DashboardStats />
      </div>

      <div className="admin-tabs">
        <Tabs defaultValue="songs" className="space-y-6">
          <TabsList className="p-1 bg-zinc-800/50">
            <TabsTrigger
              value="songs"
              className="data-[state=active]:bg-zinc-700"
            >
              <Music className="mr-2 size-4" />
              Songs
            </TabsTrigger>

            <TabsTrigger
              value="albums"
              className="data-[state=active]:bg-zinc-700"
            >
              <Album className="mr-2 size-4" />
              Albums
            </TabsTrigger>
          </TabsList>

          <TabsContent value="songs">
            <SongsTabContent />
          </TabsContent>

          <TabsContent value="albums">
            <AlbumsTabContent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AdminPage;

