import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6";
import { format } from "date-fns";

function SmallTransactionCard({ transaction }) {
  const isExpense = transaction.direction === "expense";

  return (
    <div
      className={`flex items-center gap-4 rounded-2xl border p-4 transition-all duration-200 hover:shadow-md ${
        isExpense ? "border-red-200 bg-red-50" : "border-green-200 bg-green-50"
      }`}
    >
      {/* Icon */}
      <div
        className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full text-xl ${
          isExpense ? "bg-red-100 text-red-600" : "bg-green-100 text-green-600"
        }`}
      >
        {isExpense ? <FaArrowTrendDown /> : <FaArrowTrendUp />}
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-sm font-semibold text-gray-900">
          {transaction.notes || "بدون وصف"}
        </h3>

        {transaction.members?.full_name && (
          <p className="mt-1 truncate text-xs text-gray-500">
            👤 {transaction.members.full_name}
          </p>
        )}

        <p className="mt-1 text-xs text-gray-400">
          {format(new Date(transaction.paid_at), "dd/MM/yyyy")}
        </p>
      </div>

      {/* Amount */}
      <div className="shrink-0 text-right">
        <p
          className={`text-lg font-bold ${
            isExpense ? "text-red-600" : "text-green-600"
          }`}
        >
          {isExpense ? "-" : "+"}
          {Number(transaction.amount_paid).toLocaleString()}
        </p>

        <span className="text-xs text-gray-500">EGP</span>
      </div>
    </div>
  );
}

export default SmallTransactionCard;
