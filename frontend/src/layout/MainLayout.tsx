import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { Outlet } from "react-router-dom";
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlayBackControls from "./components/PlayBackControls";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const MainLayout = () => {
  const [isMobile, setIsMobile] = useState(
    () => typeof window !== "undefined" && window.innerWidth < 768
  );

  // GSAP refs
  const leftPanelRef = useRef<HTMLDivElement>(null);
  const rightPanelRef = useRef<HTMLDivElement>(null);
  const centerPanelRef = useRef<HTMLDivElement>(null);

  // Responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();

    window.addEventListener("resize", checkMobile);

    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // GSAP entrance animation
 useEffect(() => {
  const ctx = gsap.context(() => {

    const tl = gsap.timeline();

    // 1. Left sidebar - elastic entrance
    if (!isMobile) {
      tl.fromTo(
        leftPanelRef.current,
        {
          x: -80,
          opacity: 0,
          scaleX: 0.92,
        },
        {
          x: 0,
          opacity: 1,
          scaleX: 1,
          duration: 1.3,
          ease: "elastic.out(1, 0.65)",
          force3D: true,
        }
      );
    }

    // 2. Right sidebar - elastic entrance
    if (!isMobile) {
      if (rightPanelRef.current) {
        tl.fromTo(
          rightPanelRef.current,
          {
            x: 80,
            opacity: 0,
            scaleX: 0.92,
          },
          {
            x: 0,
            opacity: 1,
            scaleX: 1,
            duration: 1.3,
            ease: "elastic.out(1, 0.65)",
            force3D: true,
          },
          "-=0.65"
        );
      }
    }

    // 3. Center panel - rubber pop
    tl.fromTo(
      centerPanelRef.current,
      {
        scale: 0.85,
        opacity: 0,
      },
      {
        scale: 1,
        opacity: 1,
        duration: 1,
        ease: "elastic.out(1, 0.55)",
        force3D: true,
      },
      "-=0.5"
    );

  });

  return () => ctx.revert();
}, [isMobile]);

  return (
    <div className="app-layout flex h-dvh w-full flex-col overflow-hidden bg-background text-white">

      <ResizablePanelGroup
        orientation="horizontal"
        className="min-h-0 flex-1 w-full gap-x-1 overflow-hidden rounded-lg p-0 sm:p-1"
      >
        {/* Audio Player */}
        <AudioPlayer />

        {/* Left Sidebar */}
        {!isMobile && (
          <>
            <ResizablePanel defaultSize="15%" minSize="15%" maxSize="25%">
              <div className="h-full w-full overflow-hidden">
                <div ref={leftPanelRef} className="h-full w-full">
                  <LeftSidebar />
                </div>
              </div>
            </ResizablePanel>

            <ResizableHandle
              className="w-0.5 transition duration-0 hover:bg-gray-400"
              withHandle={true}
            />
          </>
        )}

        {/* Center Panel */}
        <ResizablePanel defaultSize={isMobile ? 100 : 70}>
          <div className="h-full w-full overflow-hidden">
            <div
              ref={centerPanelRef}
              className="h-full w-full rounded-md"
            >
              <Outlet />
            </div>
          </div>
        </ResizablePanel>

        {/* Right Sidebar */}
        {!isMobile && (
          <>
            <ResizableHandle
              className="transition w-0.5 duration-0 hover:bg-gray-400"
              withHandle={true}
            />

            <ResizablePanel
              defaultSize="15%"
              minSize="0%"
              maxSize="25%"
              collapsedSize="0%"
            >
              <div className="h-full w-full overflow-hidden">
                <div
                  ref={rightPanelRef}
                  className="h-full w-full"
                >
                  <div className="h-full overflow-y-auto scrollbar-none  [&::-webkit-scrollbar]:hidden">
                    <span className="font-semibold">
                      <FriendsActivity />
                    </span>
                  </div>
                </div>
              </div>
            </ResizablePanel>
          </>
        )}
      </ResizablePanelGroup>

      {/* Playback Controls */}
      <PlayBackControls />

    </div>
  );
};

export default MainLayout;


