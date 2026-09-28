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
     <ResizableHandle className="hover:bg-gray-400 transition duration-0" withHandle={true}></ResizableHandle>
      <ResizablePanel defaultSize={isMobile? 80 : 70}>
        <div className="h-[90vh] w-full rounded-md gap-x-1">
          <Outlet/>
        </div>
      </ResizablePanel>
      <ResizableHandle className="hover:bg-gray-400 transition duration-0" withHandle={true}></ResizableHandle>
      <ResizablePanel defaultSize="15%" minSize="0%" maxSize="25%" collapsedSize="0%">
        <div className=" h-full overflow-y-auto scrollbar-none [&::-webkit-scrollbar]:hidden">
          <span className="font-semibold"><FriendsActivity/></span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}



export default MainLayout
