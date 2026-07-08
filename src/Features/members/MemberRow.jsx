import { useSearchParams } from "react-router-dom";
import MemberActionBar from "./MemberActionBar";
import { formatCurrency, formatDateForDB } from "../../utils/helpers";
import { PAGE_SIZE_MEMBERS } from "../../utils/constance";

function MemberRow({ member, index }) {
  const statusClasses = {
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    red: "bg-red-100 text-red-700",
    blue: "bg-blue-100 text-blue-700",
  };

  const [searchParams] = useSearchParams();

  const currentPage = Number(searchParams.get("page")) || 1;

  const rowNumber = (currentPage - 1) * PAGE_SIZE_MEMBERS + index + 1;

  return (
    <tr className="border-b border-slate-100 text-xs transition-colors odd:bg-white even:bg-slate-50/40 hover:bg-orange-50">
      {/* Number */}
      <td className="w-10 px-1.5 py-1.5 text-center font-medium whitespace-nowrap text-slate-500">
        {rowNumber}
      </td>

      {/* Name */}
      <td className="max-w-44 px-2 py-1.5">
        <p
          className="truncate font-medium text-slate-800"
          title={member.full_name}
        >
          {member.full_name}
        </p>
      </td>

      {/* ID */}
      <td className="w-16 px-1.5 py-1.5 text-center text-[11px] font-medium text-slate-500">
        #{member.id}
      </td>

      {/* Captain */}
      <td className="px-2 py-1.5 text-slate-600">{member.captain_name}</td>

      {/* Payment */}
      <td className="px-1.5 py-1.5 text-center">
        {member.has_remaining ? (
          <span className="rounded-full bg-orange-100 px-1.5 py-0.5 text-[10px] font-medium text-orange-700">
            {formatCurrency(member.remaining_amount)}
          </span>
        ) : (
          <span className="rounded-full bg-green-100 px-1.5 py-0.5 text-[10px] font-medium text-green-700">
            مدفوع
          </span>
        )}
      </td>

      {/* Status */}
      <td className="px-1.5 py-1.5 text-center">
        <span
          className={`rounded-full px-1.5 py-0.5 text-[10px] font-medium ${
            statusClasses[member.status_color]
          }`}
        >
          {member.status_text}
        </span>
      </td>

      {/* Phone */}
      <td className="px-2 py-1.5 text-center whitespace-nowrap text-slate-500">
        {member.phone || "-"}
      </td>

      {/* Start */}
      <td className="px-2 py-1.5 text-center text-[11px] whitespace-nowrap text-slate-500">
        {formatDateForDB(member.subscription_start_date)}
      </td>

      {/* End */}
      <td className="px-2 py-1.5 text-center text-[11px] whitespace-nowrap text-slate-500">
        {formatDateForDB(member.subscription_end_date)}
      </td>

      {/* Actions */}
      <td className="w-28 px-2 py-1.5 text-center">
        <MemberActionBar member={member} />
      </td>
    </tr>
  );
}

export default MemberRow;
