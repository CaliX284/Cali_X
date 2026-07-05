import { useMutation } from "@tanstack/react-query";
import { signup } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useCreateAccount() {
  const { mutate: signupMutation, isPending } = useMutation({
    mutationFn: (newUser) =>
      signup(newUser),
    onSuccess: () => {
      toast.success(
        "تم اتمام العمليه بنجاح برجاء التاكيد علي البريد الالكتروني ",
      );
    },
    onError: () => toast.error("هناك خطأ حاول مجددا"),
  });
  return { signupMutation, isPending };
}
