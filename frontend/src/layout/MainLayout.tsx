import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable"
import { Outlet } from "react-router-dom"

const MainLayout = () => {
    const isMobile = false;
  return (
    <ResizablePanelGroup
      orientation="horizontal"
      className="h-screen p-1 w-full rounded-lg border"
    >
      <ResizablePanel defaultSize="15%" minSize={isMobile? 0 : 10} maxSize="25%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize={isMobile? 80 : 70}>
        <div className="">
          <Outlet/>
        </div>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="15%" minSize="0%" maxSize="25%" collapsedSize="0%">
        <div className="flex h-full items-center justify-center p-6">
          <span className="font-semibold">Sidebar</span>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}



export default MainLayout
