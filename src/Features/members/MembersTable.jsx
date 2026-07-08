// import { useGetAllMemberViews } from "./useGetAllMemberViews";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";
// import Pagination from "../../ui/Pagination";
import MemberRow from "./MemberRow";
// import { PAGE_SIZE_MEMBERS } from "../../utils/constance";

function MembersTable({membersViews , loading , error}) {
  

  if (loading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[1050px] table-fixed border-collapse">
          <thead className="sticky top-0 z-10 bg-slate-50">
            <tr className="border-b border-slate-200 text-xs font-semibold text-slate-600">
              <th className="w-10 px-2 py-2 text-center">#</th>

              <th className="px-2 py-2 text-right">الاسم</th>

              <th className="w-14 px-1 py-2 text-center">ID</th>

              <th className="w-28 px-1 py-2 text-right">المدرب</th>

              <th className="w-24 px-1 py-2 text-center">حالة الدفع</th>

              <th className="w-20 px-1 py-2 text-center">الحالة</th>

              <th className="w-28 px-1 py-2 text-center">الهاتف</th>

              <th className="w-28 px-1 py-2 text-center">بداية الاشتراك</th>

              <th className="w-28 px-1 py-2 text-center">نهاية الاشتراك</th>

              <th className="w-44 px-3 py-2 text-center">الإجراءات</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100">
            {membersViews.map((member, index) => (
              <MemberRow key={member.id} member={member} index={index} />
            ))}
          </tbody>
        </table>
      </div>

      {/* <div className="border-t border-slate-200 px-3 py-2">
        <Pagination count={members_count} pageSize={PAGE_SIZE_MEMBERS} />
      </div> */}
    </div>
  );
}

export default MembersTable;
