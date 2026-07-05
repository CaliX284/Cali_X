import { useQuery } from "@tanstack/react-query";
import { getPaymentsStats } from "../../services/apiDashboard";
export function usePaymentsMembersStats() {
    
  const { data, isLoading, error } = useQuery({
    queryKey: ["payments_stats"],
    queryFn: () => getPaymentsStats(),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
}
