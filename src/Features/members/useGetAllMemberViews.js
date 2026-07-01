import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getAllMembersView } from "../../services/apiMembers";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE_MEMBERS } from "../../utils/constance";
import { useEffect } from "react";

export function useGetAllMemberViews() {
  const [searchParams] = useSearchParams();
  const queryClient = useQueryClient();
  const page = Number(searchParams.get("page")) || 1;

  const {
    data: { data: membersViews, count: members_count } = {},
    isPending,
    error,
  } = useQuery({
    queryKey: ["members_view", page],
    queryFn: () => getAllMembersView(page, PAGE_SIZE_MEMBERS),
    staleTime: 1000 * 60 * 5, // 5 دقائق
  });

  const pageCount = Math.ceil((members_count || 0) / PAGE_SIZE_MEMBERS);

  useEffect(() => {
    if (page >= pageCount) return;

    queryClient.prefetchQuery({
      queryKey: ["members_view", page + 1],
      queryFn: () => getAllMembersView(page + 1, PAGE_SIZE_MEMBERS),
      staleTime: 60 * 1000,
    });
  }, [page, pageCount, queryClient]);

  return { membersViews, isPending, error, members_count };
}
