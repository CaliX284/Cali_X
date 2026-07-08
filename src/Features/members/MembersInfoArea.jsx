///MemberInfoArea.jsx Before the MembersTable


import { useGetAllMemberViews } from "./useGetAllMemberViews";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
import MemberCard from "./MemberCard";
import Pagination from "../../ui/Pagination";
import { PAGE_SIZE_MEMBERS } from "../../utils/constance";

function MembersInfoArea() {
  const {
    membersViews,
    isPending: loading,
    error,
    members_count,
  } = useGetAllMemberViews();

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <>
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3">
        {membersViews.map((member) => (
          <MemberCard key={member.id} member={member} />
        ))}
      </div>
      <Pagination count={members_count} pageSize={PAGE_SIZE_MEMBERS} />
    </>
  );
}

export default MembersInfoArea;
