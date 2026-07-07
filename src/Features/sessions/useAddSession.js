import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addSession } from "../../services/apiSessions";
import toast from "react-hot-toast";

export function useAddSession() {
  const queryClient = useQueryClient();
  const { mutate: addSessionMutation, isPending } = useMutation({
    mutationFn: (newSession) => addSession(newSession),
    onSuccess: () => {
      toast.success("تم اضافه الحصه بي نجاح");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
      queryClient.invalidateQueries({ queryKey: ["transaction-stats"] });
      queryClient.invalidateQueries({ queryKey: ["dashboard-stats"] });
    },
    onError: () => toast.error("هناك خطا حاول مجددا "),
  });
  return { addSessionMutation, isPending };
}
