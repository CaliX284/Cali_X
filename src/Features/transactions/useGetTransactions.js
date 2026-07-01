import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getTransactions } from "../../services/apiTransactions";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_TRANSACTIONS } from "../../utils/constance";
import { useEffect } from "react";

export function useGetTransactions() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //[1] Pagination
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: transactions, count } = {},
    isLoading,
    error,
  } = useQuery({
    queryKey: ["transactions", page],
    queryFn: () => getTransactions(page, PAGE_SIZE_TRANSACTIONS),
    placeholderData: (previousData) => previousData,
  });

  const pageCount = Math.ceil((count || 0) / PAGE_SIZE_TRANSACTIONS);

  useEffect(() => {
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["transactions", page + 1],
      queryFn: () => getTransactions(page + 1, PAGE_SIZE_TRANSACTIONS),
      staleTime: 60 * 1000,
    });
  }, [page, pageCount, queryClient]);

  return { transactions, count, isLoading, error };
}
