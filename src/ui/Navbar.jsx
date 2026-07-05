import { MdOutlineLibraryBooks } from "react-icons/md";
import { useLocation } from "react-router-dom";
import { useSideBar } from "../context/SidebarContext";

const getPageTitle = (pathname) => {
  // 1. تنظيف الرابط: إزالة الشرطة المائلة من البداية والنهاية وتحويله لـ lowercase وتحويل الـ Backslash لو وجد
  const cleanPath = pathname.replace(/^\/+|\/+$/g, "").toLowerCase();

  // 2. التحقق من المسارات الديناميكية أولاً (التي تحتوي على ID)

  // تحقق من صفحة تفاصيل اللاعب (members/أي-رقم-أو-نص)
  if (/^members\/[^/]+$/.test(cleanPath)) {
    return "تفاصيل اللاعب";
  }

  // تحقق من صفحة تفاصيل المدرب (captains/أي-رقم-أو-نص)
  if (/^captains\/[^/]+$/.test(cleanPath)) {
    return "تفاصيل المدرب";
  }

  // 3. التحقق من المسارات الثابتة باستخدام switch case
  switch (cleanPath) {
    case "":
    case "dashboard":
      return "لوحة التحكم";
    case "members":
      return "الاعضاء";
    case "captains":
      return "المدربين";
    case "payments":
      return "المدفوعات";
    case "users":
      return "المستخدمين";
    case "settings":
      return "الاعدادات";
    default:
      return "صفحة غير معروفة"; // عنوان افتراضي في حال لم يتطابق مع أي مسار
  }
};

function Navbar() {
  const { isOpenSide, setIsOpenSide } = useSideBar();

  const location = useLocation();
  const currentPage = getPageTitle(location.pathname);

  return (
    <nav
      className={`h-navbar fixed top-0 right-0 flex w-full items-center justify-between gap-3 border-b border-stone-300 bg-white px-3 py-2 duration-300 sm:justify-start z-[100]` }
    >
      <img className="block w-[25px]" src="default-user.jpg" alt="user_photo" />
      <h4 className="font text-[18px] font-bold">{currentPage}</h4>
      <MdOutlineLibraryBooks
        className={`cursor-pointer hover:text-orange-500 sm:hidden ${isOpenSide ? "text-orange-500" : ""}`}
        onClick={() => setIsOpenSide((c) => !c)}
      />
    </nav>
  );
}

export default Navbar;
