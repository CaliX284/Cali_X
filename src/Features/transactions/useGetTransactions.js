import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_TRANSACTIONS } from "../../utils/constance";
import { useEffect, useMemo } from "react";

export function useGetTransactions() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

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

  //[2] Pagination
  const page = Number(searchParams.get("page")) || 1;

  //[3] the main query
  const {
    data: { data: transactions, count } = {},
    isLoading,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["transactions", page, filter],
    queryFn: () => getTransactions(page, PAGE_SIZE_TRANSACTIONS, theFilter),
    staleTime: 1000 * 60 * 5,
    placeholderData: (previousData) => previousData,
  });

  // prefetch next page data if it exists

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE_TRANSACTIONS);

  useEffect(() => {
    if (isPlaceholderData) return;
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["transactions", page + 1, filter],
      queryFn: () =>
        getTransactions(page + 1, PAGE_SIZE_TRANSACTIONS, theFilter),
      staleTime: 60 * 1000,
    });
  }, [page, pageCount, queryClient, theFilter, filter, isPlaceholderData]);

  return { transactions, count, isLoading, error };
}
