import { useQuery } from "@tanstack/react-query";
import { getCaptains } from "../../services/apiCaptains";

export function useCaptains() {
  const {
    data: captains,
    isPending,
    error,
  } = useQuery({
    queryKey: ["captains"],
    queryFn: getCaptains,
  });

  const captainsCount = captains?.length;
  return { captains, isPending, error, captainsCount };
}
