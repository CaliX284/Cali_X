import { useQuery } from "@tanstack/react-query";
import { getCaptainMembers } from "../../services/apiCaptains";

export function useGetCaptainMembers(id) {
  const {
    data: captainMembers,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["captain-members", id],
    queryFn: () => getCaptainMembers(id),
    staleTime: 1000 * 60 * 5,
  });

  return { captainMembers, isLoading, error };
}
