import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";
import AudioPlayer from "./components/AudioPlayer";
import PlayBackControls from "./components/PlayBackControls";
import { useEffect, useState } from "react";

const MainLayout = () => {
    const [isMobile, setisMobile] = useState(false);

    useEffect(()=>{
      const checkMobile = () =>{
        setisMobile(window.innerWidth < 768);
      };
      checkMobile();
      window.addEventListener("resize",checkMobile);
      return () => window.removeEventListener("resize", checkMobile);
    },[])
  return (
    <div className="h-screen bg-black text-white flex flex-col">
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-screen p-1 w-full rounded-lg gap-x-1"
    >
      <AudioPlayer />
      <ResizablePanel defaultSize="15%" minSize={isMobile? "0%" : "15%"} maxSize="25%">
        <LeftSidebar/>
      </ResizablePanel>
     <ResizableHandle className="hover:bg-gray-400 transition duration-0" withHandle={true}></ResizableHandle>
      <ResizablePanel defaultSize={isMobile? 80 : 70}>
        <div className="h-full w-full rounded-md gap-x-1">
          <Outlet/>
        </div>
      </ResizablePanel>
      {!isMobile && <>
      <ResizableHandle className="hover:bg-gray-400 transition duration-0" withHandle={true}></ResizableHandle>
      <ResizablePanel defaultSize="15%" minSize="0%" maxSize="25%" collapsedSize="0%">
        <div className=" h-full overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          <span className="font-semibold"><FriendsActivity/></span>
        </div>
      </ResizablePanel>
      </>}
    </ResizablePanelGroup>
    <PlayBackControls />
    </div>
  )
}



export default MainLayout
