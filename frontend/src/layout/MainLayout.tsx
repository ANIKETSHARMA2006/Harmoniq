import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"
import LeftSidebar from "./components/LeftSidebar";
import FriendsActivity from "./components/FriendsActivity";

const MainLayout = () => {
    const isMobile = false;
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-[99vh] p-1 w-full rounded-lg gap-x-1"
    >
      <ResizablePanel defaultSize="15%" minSize={isMobile? "0%" : "15%"} maxSize="25%">
        <LeftSidebar/>
      </ResizablePanel>
     
      <ResizablePanel defaultSize={isMobile? 80 : 70}>
        <div className="h-[90vh] p-1 w-full rounded-lg gap-x-1">
          <Outlet/>
        </div>
      </ResizablePanel>
      
      <ResizablePanel defaultSize="15%" minSize="0%" maxSize="25%" collapsedSize="0%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold"><FriendsActivity/></span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}



export default MainLayout
