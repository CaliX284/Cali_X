import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_TRANSACTIONS } from "../../utils/constance";
import { useEffect, useMemo } from "react";

export function useGetTransactions() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //[0] filter for period
  const period = searchParams.get("period") ?? "period:30";
  const thePeriod = period.split(":")[1];

  //[1] filter
  const filter = searchParams.get("transactions") ?? "all:all";
  const [filterField, filterValue] = filter.split(":");

  const theFilter = useMemo(() => {
    if (filterValue === "all") return null;
    return {
      field: filterField,
      value: filterValue,
      method: "eq",
    };
  }, [filterField, filterValue]);

  // [2] Sorting

  const sortBy = searchParams.get("sortBy") ?? "created_at-desc";
  const [sortField, sortDirection] = sortBy.split("-");

  const theSort = useMemo(() => {
    return { field: sortField, dir: sortDirection };
  }, [sortField, sortDirection]);

  //[3] Pagination
  const page = Number(searchParams.get("page")) || 1;

  //[4] the main query
  const {
    data: { data: transactions, count } = {},
    isLoading,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["transactions", page, filter, sortBy , thePeriod],
    queryFn: () =>
      getTransactions(page, PAGE_SIZE_TRANSACTIONS, theFilter, theSort , thePeriod),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  // prefetch next page data if it exists

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE_TRANSACTIONS);

  useEffect(() => {
    if (isPlaceholderData) return;
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["transactions", page + 1, filter, sortBy , thePeriod],
      queryFn: () =>
        getTransactions(page + 1, PAGE_SIZE_TRANSACTIONS, theFilter, theSort , thePeriod),
      staleTime: 1000 * 60 * 5,
    });
  }, [
    page,
    pageCount,
    queryClient,
    theFilter,
    filter,
    isPlaceholderData,
    sortBy,
    theSort,
    thePeriod
  ]);

  return { transactions, count, isLoading, error };
}
