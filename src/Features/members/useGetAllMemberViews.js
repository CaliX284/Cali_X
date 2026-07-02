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

  // [2] searhcing
  const search = searchParams.get("search") ?? "";
  const [searchField, searchValue] = search.split(":");
  const theSearch = useMemo(() => {
    if (searchField.trim() === "") return null;
    return { field: searchField, value: searchValue, method: "ilike" };
  }, [searchField, searchValue]);

  //[3] sorting

  const sortBy = searchParams.get("sortBy") ?? "created_at-desc";
  const [sortField, sortDirection] = sortBy.split("-");

  const theSort = useMemo(() => {
    return { field: sortField, dir: sortDirection };
  }, [sortField, sortDirection]);

  //[4] pagination
  const page = Number(searchParams.get("page")) || 1;

  // the main query
  const {
    data: { data: membersViews, count: members_count } = {},
    isPending,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["members_view", page, filter, sortBy, search],
    queryFn: () =>
      getAllMembersView(page, PAGE_SIZE_MEMBERS, theFilter, theSort, theSearch),
    staleTime: 1000 * 60 * 5, // 5 دقائق
    placeholderData: (previousData) => previousData,
  });

  // prefetch
  const pageCount = Math.ceil((members_count || 0) / PAGE_SIZE_MEMBERS);

  useEffect(() => {
    if (isPlaceholderData) return;
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["members_view", page + 1, filter, sortBy, search],
      queryFn: () =>
        getAllMembersView(
          page + 1,
          PAGE_SIZE_MEMBERS,
          theFilter,
          theSort,
          theSearch,
        ),
      staleTime: 1000 * 60 * 5,
    });
  }, [
    page,
    pageCount,
    queryClient,
    isPlaceholderData,
    theFilter,
    filter,
    theSort,
    sortBy,
    theSearch,
    search,
  ]);

  return { membersViews, isPending, error, members_count };
}
