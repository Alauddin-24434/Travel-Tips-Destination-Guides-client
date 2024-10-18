
import AllPost from "@/components/ui/post/AllPost";
import LeftSidebar from "@/components/ui/Shared/LeftSidebar";
import RightSidebar from "@/components/ui/Shared/RightSideBar";


const page = () => {
  return (


    <div className="flex max-w-7xl mx-auto">
      {/* Left Sidebar */}
      <aside className="hidden md:block bg-background p-4 fixed h-full z-0">
        <div className="w-[311px] "><LeftSidebar></LeftSidebar></div>
      </aside>

      {/* Main Content */}
      <div className="md:flex-1 md:p-4 md:ml-[311px] md:mr-[311px] md:overflow-y-auto">
      
          <AllPost />
        
     
      </div>

      {/* Right Sidebar */}
      <aside className="hidden md:block bg-background p-4 fixed h-full ml-[937px] z-0">
        <div className=" w-[311px]"><RightSidebar></RightSidebar></div>
      </aside>
    </div>
      );
};

export default page;
