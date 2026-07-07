import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import { useSideBar } from "../context/SidebarContext";
import { Suspense } from "react";
import Spinner from "./Spinner";

function AppLayout() {
  const { setIsOpenSide } = useSideBar();

  return (
    <div className="">
      <Navbar />
      <Sidebar />
      <Suspense fallback={<Spinner />}>
        <main
          className={`mt-navbar sm:mr-sidebar box-border bg-stone-50 px-3 py-3 sm:px-3.5 sm:py-4`}
          onClick={() => {
            if (window.innerWidth < 640) {
              setIsOpenSide(false);
            }
          }}
        >
          <Outlet />
        </main>
      </Suspense>
    </div>
  );
}

export default AppLayout;
