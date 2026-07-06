import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const {
    mutate: updateUserMutation,
    isPending,
    error,
  } = useMutation({
    mutationFn: ({ fullName, password }) =>
      updateCurrentUser({ fullName, password }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success("تم تحديث الحساب بي نجاح");
    },
    onError: () => toast.error("هناك خطأ حاول مجددا"),
  });
  return { updateUserMutation, isPending, error };
}
