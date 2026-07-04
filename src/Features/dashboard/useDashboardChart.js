import { useQuery } from "@tanstack/react-query";
import { getDashboardChart } from "../../services/apiDashboard";

export function useDashboardChart(year) {
  const { data, isLoading, error } = useQuery({
    queryKey: ["dashboard-chart", year],
    queryFn: () => getDashboardChart(year),
    staleTime: 1000 * 60 * 5,
  });

  return { data, isLoading, error };
}
