import MemberOperations from "./MemberOperations";
// import MembersInfoArea from "./MembersInfoArea";
import MembersTable from "./MembersTable";
import { useGetAllMemberViews } from "./useGetAllMemberViews";

function MembersMainArea() {
  const {
    membersViews,
    isPending: loading,
    error,
    members_count,
  } = useGetAllMemberViews();
  return (
    <div className="mt-7">
      <MemberOperations />
      {/* <MembersInfoArea /> */}
      <MembersTable
        membersViews={membersViews}
        loading={loading}
        error={error}
        members_count={members_count}
      />
    </div>
  );
}

export default MembersMainArea;
