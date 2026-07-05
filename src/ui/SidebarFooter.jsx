import { CiLogin } from "react-icons/ci";
import { useLogout } from "../Features/authentication/useLogout";
import ConfirmModal from "./ConfirmModal";
import Modal from "./Modal";
import { useState } from "react";
import useUser from "../Features/authentication/useUser";


function SidebarFooter() {
  const [isOpen, setIsopen] = useState(false);
  const { logoutMutation, isPending } = useLogout();
  const { user } = useUser();

  const userName = user.user_metadata.fullName ?? "";

  return (
    <div className="mt-7 flex items-center justify-between rounded-sm border-t border-orange-500 pt-6 pb-5">
      <div className="flex items-center gap-3">
        <img
          className="h-6 w-6 rounded-full"
          src="default-user.jpg"
          alt="user_photo"
        />
        <span>{userName ? userName : "غير معروف "}</span>
      </div>
      <CiLogin
        onClick={() => setIsopen(true)}
        className="cursor-pointer text-[17px] font-semibold duration-300 hover:text-orange-600"
      />
      <Modal isOpen={isOpen} onClose={() => setIsopen(false)}>
        <ConfirmModal
          title="هل تريد تسجيل الخروج؟"
          message="سيتم تسجيل خروجك في حال التاكيد "
          onConfirm={logoutMutation}
          isLoading={isPending}
        />
      </Modal>
    </div>
  );
}

export default SidebarFooter;
