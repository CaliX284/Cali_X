import TheNavigation from "./TheNavigation";
import { IoMdCloseCircleOutline } from "react-icons/io";
import { useSideBar } from "../context/SidebarContext";
import { useEffect } from "react";
import { useGetSettings } from "../Features/settings/useGetSettings";
function Sidebar() {
  const { settings } = useGetSettings();
  const gymName = settings?.gym_name ?? "";

  const { isOpenSide, setIsOpenSide } = useSideBar();

  useEffect(() => {
    function handleResize() {
      setIsOpenSide(window.innerWidth >= 640);
    }

    handleResize();

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [setIsOpenSide]);

  return (
    <aside
      className={`top-navbar w-sidebar fixed right-0 z-40 h-dvh bg-white px-3 py-3 duration-500 ${isOpenSide ? "translate-x-0" : "translate-x-full"} transition-transform will-change-transform sm:right-0 sm:translate-x-0`}
    >
      <div className="flex w-full items-center gap-4 border-b border-orange-400 pb-4">
        <img
          className="block h-12 w-12 rounded-full"
          src="logo.jpg"
          alt="logo"
        />
        <div className="flex flex-col">
          <h5 className="text-[13px] font-bold">{gymName ? gymName : ""}</h5>
          <p className="text-[10px] text-stone-400">الحوامديه</p>
        </div>

        <div
          className="cursor-pointer text-xs font-semibold text-orange-500 sm:hidden"
          onClick={() => {
            if (window.innerWidth < 640) {
              setIsOpenSide(false);
            }
          }}
        >
          <IoMdCloseCircleOutline />
        </div>
      </div>
      <TheNavigation />
    </aside>
  );
}

export default Sidebar;
