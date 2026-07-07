import { useQuery } from "@tanstack/react-query";
import { getCaptainStats } from "../../services/apiCaptains";
import { useSearchParams } from "react-router-dom";
import { useMemo } from "react";

export function useCaptainStats() {
  const [searchParams] = useSearchParams();
  // [1] searhcing
  const search = searchParams.get("search") ?? "";
  const [searchField, searchValue] = search.split(":");
  const theSearch = useMemo(() => {
    if (searchField.trim() === "") return null;
    return { field: searchField, value: searchValue, method: "ilike" };
  }, [searchField, searchValue]);

  const {
    data: captainStats,
    isPending,
    error,
  } = useQuery({
    queryKey: ["captain-stats", theSearch],
    queryFn: () => getCaptainStats(theSearch),
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });

  const captainsCount = captainStats?.length;

  return {
    captainStats,
    captainsCount,
    isPending,
    error,
  };
}
