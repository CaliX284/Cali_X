import { CiLogin } from "react-icons/ci";

function SidebarFooter() {
  return (
    <div className="mt-7 flex items-center justify-between border-t border-orange-500 pb-5 pt-6 rounded-sm">
      <div className="flex items-center gap-3">
        <img
          className="h-6 w-6 rounded-full"
          src="default-user.jpg"
          alt="user_photo"
        />
        <span>محمود بدر</span>
      </div>
      <CiLogin className="cursor-pointer text-[17px] font-semibold duration-300 hover:text-orange-600" />
    </div>
  );
}

export default SidebarFooter;
