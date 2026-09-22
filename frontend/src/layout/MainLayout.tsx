import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";

const MainLayout = () => {
    const isMobile = false;
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-screen p-1 w-full rounded-lg gap-x-1"
    >
      <ResizablePanel defaultSize="15%" minSize={isMobile? "0%" : "15%"} maxSize="25%">
        <LeftSidebar/>
      </ResizablePanel>
     
      <ResizablePanel defaultSize={isMobile? 80 : 70}>
        <div className="">
          <Outlet/>
        </div>
      </ResizablePanel>
      
      <ResizablePanel defaultSize="15%" minSize="0%" maxSize="25%" collapsedSize="0%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}



export default MainLayout
