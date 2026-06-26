import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSideBar } from "../context/SidebarContext";



function AppLayout() {
  const { setIsOpenSide } = useSideBar();

  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <main
        className={`mt-navbar sm:mr-sidebar`}
        onClick={() => {
          if (window.innerWidth < 640) {
            setIsOpenSide(false);
          }
        }}
      >
        <Outlet />
      </main>
    </div>
  );
}

export default AppLayout;
