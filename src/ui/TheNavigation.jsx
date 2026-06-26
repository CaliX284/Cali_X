import { NavLink } from "react-router-dom";
import { MdOutlineDashboard } from "react-icons/md";
import { LuUsers } from "react-icons/lu";
import { LiaTrophySolid } from "react-icons/lia";
import { FaSackDollar } from "react-icons/fa6";
import { GiBeetleShell } from "react-icons/gi";
import { IoIosSettings } from "react-icons/io";
import { useSideBar } from "../context/SidebarContext";
import SidebarFooter from "./SidebarFooter";

const links = [
  {
    to: "/dashboard",
    icon: MdOutlineDashboard,
    title: "لوحه التحكم",
  },
  {
    to: "/members",
    icon: LuUsers,
    title: "الاعضاء",
  },
  {
    to: "/captains",
    icon: LiaTrophySolid,
    title: "المدربين",
  },
  {
    to: "/payments",
    icon: FaSackDollar,
    title: "المدفوعات",
  },
  {
    to: "/users",
    icon: GiBeetleShell,
    title: "المستخدمين",
  },
  {
    to: "/settings",
    icon: IoIosSettings,
    title: "الاعدادات",
  },
];

export default function TheNavigation() {
  return (
    <ul className="mt-3.5 flex flex-col gap-3 px-1.5 py-1 text-[13px] text-stone-800">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <li key={link.to}>
            <NavLin to={link.to}>
              <Icon />
              <span>{link.title}</span>
            </NavLin>
          </li>
        );
      })}

      <li>
        <SidebarFooter />
      </li>
    </ul>
  );
}

function NavLin({ children, to }) {
  const { setIsOpenSide } = useSideBar();

  function handleClick() {
    if (window.innerWidth < 640) {
      setIsOpenSide(false);
    }
  }

  return (
    <NavLink
      to={to}
      onClick={handleClick}
      className={({ isActive }) =>
        `flex w-full items-center gap-2 rounded-2xl px-3 py-2 duration-300 ${
          isActive
            ? "bg-orange-500 text-stone-50"
            : "hover:bg-orange-200 hover:text-orange-500"
        }`
      }
    >
      {children}
    </NavLink>
  );
}
