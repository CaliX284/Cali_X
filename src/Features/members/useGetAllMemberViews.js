import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMembersView } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_MEMBERS } from "../../utils/constance";
import { useEffect, useMemo } from "react";

export function useGetAllMemberViews() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();

  //[1] filter
  const filter = searchParams.get("members") ?? "all:all";
  const [filterField, filterValue] = filter.split(":");

  const theFilter = useMemo(() => {
    if (filterField === "all") return null;
    return {
      field: filterField,
      value: filterValue,
      method: "eq",
    };
  }, [filterField, filterValue]);

  console.log(theFilter);

  //[2] pagination
  const page = Number(searchParams.get("page")) || 1;

  // the main query
  const {
    data: { data: membersViews, count: members_count } = {},
    isPending,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["members_view", page, filter],
    queryFn: () => getAllMembersView(page, PAGE_SIZE_MEMBERS, theFilter),
    staleTime: 1000 * 60 * 5, // 5 دقائق
    placeholderData: (previousData) => previousData,
  });

  // prefetch
  const pageCount = Math.ceil((members_count || 0) / PAGE_SIZE_MEMBERS);

  useEffect(() => {
    if (isPlaceholderData) return;
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["members_view", page + 1, filter],
      queryFn: () => getAllMembersView(page + 1, PAGE_SIZE_MEMBERS, theFilter),
      staleTime: 60 * 1000,
    });
  }, [page, pageCount, queryClient, isPlaceholderData, theFilter, filter]);

  return { membersViews, isPending, error, members_count };
}
