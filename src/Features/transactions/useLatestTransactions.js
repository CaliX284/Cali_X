import { useQuery } from "@tanstack/react-query";
import { getLatestTransactions } from "../../services/apiTransactions";

export function useLatestTransactions(limit = 7) {
  const {
    data: latestTransactions = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["latest-transactions", limit],
    queryFn: () => getLatestTransactions(limit),
    staleTime: 1000 * 60 * 5,
  });

  return { latestTransactions, isLoading, error };
}
