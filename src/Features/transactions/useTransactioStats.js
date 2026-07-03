import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "react-router-dom";
import { getTransactionStats } from "../../services/apiTransactions";

export function useTransactionStats() {
  const [searchParams] = useSearchParams();

  const period = searchParams.get("period") ?? "period:30";
  const thePeriod = period.split(":")[1];

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transaction-stats", thePeriod],
    queryFn: () => getTransactionStats(thePeriod),
    staleTime: 1000 * 60 * 5,
  });

  return {
    stats,
    isLoading,
    error,
  };
}
