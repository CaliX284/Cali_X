import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const {
    mutate: loginUser,
    isPending: isLoading,
    error,
  } = useMutation({
    mutationFn: login,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ["user"],
      });

      toast.success("تم تسجيل الدخول بنجاح");

      navigate("/dashboard", { replace: true });
    },

    onError: (err) => {
      toast.error("هناك خطا يرجي التاكد من كلمه السر او البريد الالكتروني ");
      console.error(err.message);
    },
  });

  return {
    loginUser,
    isLoading,
    error,
  };
}
