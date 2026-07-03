import { useQuery } from "@tanstack/react-query";
import { getDashboardStats } from "../../services/apiDashboard";
import { useSearchParams } from "react-router-dom";

export function useGetDashboardStats() {
  const [searchParams] = useSearchParams();
  const period = searchParams.get("period") ?? "period:30";
  const thePeriod = period.split(":")[1];

  const {
    data: stats,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["dashboard-stats", thePeriod],
    queryFn: () => getDashboardStats(thePeriod),
    staleTime: 1000 * 60 * 5,
  });

  return {
    stats,
    isLoading,
    error,
  };
}
