import Pagination from "../../ui/Pagination";
import { PAGE_SIZE_MEMBERS } from "../../utils/constance";
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
      <div className="border-t border-slate-200 px-3 py-2">
        <Pagination count={members_count} pageSize={PAGE_SIZE_MEMBERS} />
      </div>
    </div>
  );
}

export default MembersMainArea;
