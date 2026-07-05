import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogout() {
  const queryClient = useQueryClient();
  const {
    mutate: logoutMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      toast.success("تم تسجيل الخروج بنجاح");
      queryClient.setQueryData(["user"], null);
    },
    onError: () => toast.error("هناك خطأ حاول مجددا"),
  });
  return { logoutMutation, isPending, error };
}
