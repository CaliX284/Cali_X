import DeleteMember from "./MEMBERS_ACTIONS/DeleteMember";
import EditMemberData from "./MEMBERS_ACTIONS/EditMemberData";
import HasRemaining from "./MEMBERS_ACTIONS/HasRemaining";
import Member_renewal from "./MEMBERS_ACTIONS/Member_renewal";
import MemberForzen from "./MEMBERS_ACTIONS/MemberForzen";
import MemberViewDetails from "./MEMBERS_ACTIONS/MemberViewDetails";

function MemberActionBar({ member, inDetailsPage = false }) {
  return (
    <div className="pt-4">
      {inDetailsPage && (
        <h3 className="my-4 text-[18px] font-bold text-slate-600">الإجراءات</h3>
      )}

      <div className="flex items-center gap-1">
        {!inDetailsPage && <MemberViewDetails id={member.id} />}
        {member.has_remaining && <HasRemaining member={member} />}

        <Member_renewal member={member} />

        <MemberForzen member={member} />

        <EditMemberData member={member} />

        {inDetailsPage && (
          <DeleteMember member={member} inDetailsPage={inDetailsPage} />
        )}
      </div>
    </div>
  );
}

export default MemberActionBar;
