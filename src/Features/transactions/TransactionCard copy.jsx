import {
  FaArrowTrendUp,
  FaArrowTrendDown,
  FaUser,
  FaUserTie,
  FaMoneyBillWave,
  FaClipboardList,
} from "react-icons/fa6";
import { formatCurrency } from "../../utils/helpers";

const transactionColors = {
  new_member: "border-l-4 border-blue-500 bg-blue-50",
  renewal: "border-l-4 border-sky-500 bg-sky-50",
  debt_payment: "border-l-4 border-emerald-500 bg-emerald-50",
  session: "border-l-4 border-violet-500 bg-violet-50",
  salary: "border-l-4 border-orange-500 bg-orange-50",
  expense: "border-l-4 border-red-500 bg-red-50",
  product: "border-l-4 border-pink-500 bg-pink-50",
};

const iconColors = {
  new_member: "text-blue-600",
  renewal: "text-sky-600",
  debt_payment: "text-emerald-600",
  session: "text-violet-600",
  salary: "text-orange-600",
  expense: "text-red-600",
  product: "text-pink-600",
};

const transactionNames = {
  new_member: "اشتراك جديد",
  renewal: "تجديد اشتراك",
  debt_payment: "سداد مديونية",
  session: "حصة",
  salary: "مرتب",
  expense: "مصروف",
  product: "بيع منتج",
};

export default function TransactionCard({ transaction }) {
  const { type_transaction, direction, amount_paid, notes, paid_at } =
    transaction;

  const memberName = transaction.member?.full_name || "غير محدد";
  const captainName = transaction.captain?.full_name || "غير محدد";

  const isManual = type_transaction === "manual";

  if (isManual) {
    return (
      <div
        className={`flex flex-col justify-between gap-1 rounded-md border p-1 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:flex-row sm:items-center sm:gap-1.5 sm:p-1.5 ${
          direction === "income"
            ? "border-green-300 bg-green-50"
            : "border-red-300 bg-red-50"
        }`}
      >
        <div className="flex items-center gap-1">
          <div
            className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded text-white sm:h-6 sm:w-6 ${
              direction === "income" ? "bg-green-500" : "bg-red-500"
            }`}
          >
            {direction === "income" ? (
              <FaArrowTrendUp size={9} />
            ) : (
              <FaArrowTrendDown size={9} />
            )}
          </div>

          <div className="min-w-0">
            <h3 className="text-[9px] leading-tight font-semibold sm:text-[11px]">
              {direction === "income" ? "إضافة إيرادات" : "إضافة مصروف"}
            </h3>

            <p className="max-w-[90px] truncate text-[7px] leading-tight text-gray-500 sm:max-w-[150px] sm:text-[9px]">
              {notes}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:gap-x-2.5">
          <Info
            title="المبلغ"
            value={`${amount_paid} جنيه`}
            icon={<FaMoneyBillWave size={8} />}
            color={direction === "income" ? "text-green-600" : "text-red-600"}
          />

          <Info title="التاريخ" value={paid_at} />
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex flex-col justify-between gap-1 rounded-md border p-1 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md sm:p-1.5 lg:flex-row lg:items-center lg:gap-1.5 ${transactionColors[type_transaction]}`}
    >
      <div className="flex items-center gap-1">
        <div
          className={`flex h-5 w-5 flex-shrink-0 items-center justify-center rounded border bg-white sm:h-6 sm:w-6 ${iconColors[type_transaction]}`}
        >
          <FaClipboardList size={9} />
        </div>

        <div className="min-w-0">
          <h3 className="text-[9px] leading-tight font-semibold text-gray-800 sm:text-[11px]">
            {transactionNames[type_transaction]}
          </h3>

          <p className="max-w-[90px] truncate text-[7px] leading-tight text-gray-500 sm:max-w-[150px] sm:text-[9px]">
            {notes}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-x-1.5 gap-y-0.5 sm:gap-x-2.5">
        <Info icon={<FaUser size={8} />} title="العضو" value={memberName} />

        <Info
          icon={<FaUserTie size={8} />}
          title="الكابتن"
          value={captainName}
        />

        <Info
          icon={<FaMoneyBillWave size={8} />}
          title="المبلغ"
          value={`${formatCurrency(amount_paid)} جنيه`}
          color="text-gray-800"
        />

        <Info title="التاريخ" value={paid_at} />
      </div>
    </div>
  );
}

function Info({ title, value, icon, color }) {
  return (
    <div className="min-w-0">
      <div className="flex items-center gap-0.5 text-[6.5px] text-gray-500 sm:text-[8px]">
        {icon}
        <span>{title}</span>
      </div>

      <div
        className={`truncate text-[8px] leading-tight font-medium sm:text-[10px] ${
          color || "text-gray-800"
        }`}
      >
        {value}
      </div>
    </div>
  );
}


// v2


import {
  FaArrowTrendDown,
  FaArrowTrendUp,
  FaClipboardList,
  FaMoneyBillWave,
  FaUser,
  FaUserTie,
} from "react-icons/fa6";
import { formatCurrency } from "../../utils/helpers";

const transactionConfig = {
  new_member: {
    name: "اشتراك جديد",
    border: "border-orange-500",
    icon: "text-orange-600",
    bg: "bg-orange-50",
  },

  renewal: {
    name: "تجديد اشتراك",
    border: "border-sky-500",
    icon: "text-sky-600",
    bg: "bg-sky-50",
  },

  debt_payment: {
    name: "سداد مديونية",
    border: "border-emerald-500",
    icon: "text-emerald-600",
    bg: "bg-emerald-50",
  },

  session: {
    name: "حصة",
    border: "border-violet-500",
    icon: "text-violet-600",
    bg: "bg-violet-50",
  },

  salary: {
    name: "مرتب",
    border: "border-yellow-500",
    icon: "text-yellow-600",
    bg: "bg-yellow-50",
  },

  expense: {
    name: "مصروف",
    border: "border-red-500",
    icon: "text-red-600",
    bg: "bg-red-50",
  },

  product: {
    name: "بيع منتج",
    border: "border-pink-500",
    icon: "text-pink-600",
    bg: "bg-pink-50",
  },
};

export default function TransactionCard({ transaction }) {
  const {
    type_transaction,
    direction,
    amount_paid,
    notes,
    paid_at,
    captain_amount,
    gym_amount,
  } = transaction;

  const memberName = transaction.member?.full_name || "غير محدد";
  const captainName = transaction.captain?.full_name || "غير محدد";

  const isManual = type_transaction === "manual";

  if (isManual) {
    return (
      <div
        className={`rounded-xl border bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg ${
          direction === "income"
            ? "border-l-4 border-l-emerald-500"
            : "border-l-4 border-l-red-500"
        }`}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div
              className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                direction === "income"
                  ? "bg-emerald-100 text-emerald-600"
                  : "bg-red-100 text-red-600"
              }`}
            >
              {direction === "income" ? (
                <FaArrowTrendUp size={18} />
              ) : (
                <FaArrowTrendDown size={18} />
              )}
            </div>

            <div>
              <h3 className="font-semibold text-gray-900">
                {direction === "income" ? "إيراد يدوي" : "مصروف يدوي"}
              </h3>

              <p className="mt-1 text-xs text-gray-500">
                {notes || "لا توجد ملاحظات"}
              </p>
            </div>
          </div>

          <div className="text-right">
            <div
              className={`text-2xl font-bold ${
                direction === "income" ? "text-emerald-600" : "text-red-600"
              }`}
            >
              {formatCurrency(amount_paid)} ج
            </div>

            <div className="mt-1 text-[11px] text-gray-500">{paid_at}</div>
          </div>
        </div>
      </div>
    );
  }

  const config = transactionConfig[type_transaction];

  return (
    <div
      className={`rounded-xl border border-l-4 border-gray-200 ${config.border} bg-white p-4 shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-lg`}
    >
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="flex gap-3">
          <div
            className={`flex h-11 w-11 items-center justify-center rounded-xl ${config.bg}`}
          >
            <FaClipboardList className={config.icon} size={18} />
          </div>

          <div>
            <h3 className="text-base font-semibold text-gray-900">
              {config.name}
            </h3>

            <p className="mt-1 max-w-md text-xs leading-5 text-gray-500">
              {notes || "لا توجد ملاحظات"}
            </p>
          </div>
        </div>

        <div className="text-right">
          <div className="text-2xl font-bold text-gray-900">
            {formatCurrency(amount_paid)} ج
          </div>

          <div className="mt-1 text-[11px] text-gray-500">{paid_at}</div>
        </div>
      </div>

      <div className="my-4 h-px bg-gray-100" />

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Info icon={<FaUser size={13} />} title="العضو" value={memberName} />

        <Info
          icon={<FaUserTie size={13} />}
          title="الكابتن"
          value={captainName}
        />

        <Info
          icon={<FaMoneyBillWave size={13} />}
          title="نصيب النادي"
          value={
            gym_amount != null ? `${formatCurrency(gym_amount)} ج` : "غير متوفر"
          }
          color="orange"
        />

        <Info
          icon={<FaMoneyBillWave size={13} />}
          title="نصيب الكابتن"
          value={
            captain_amount != null
              ? `${formatCurrency(captain_amount)} ج`
              : "غير متوفر"
          }
          color="green"
        />
      </div>
    </div>
  );
}

function Info({ icon, title, value, color }) {
  const colors = {
    orange: "bg-orange-50 border-orange-200 text-orange-700",
    green: "bg-emerald-50 border-emerald-200 text-emerald-700",
    default: "bg-slate-50 border-slate-200 text-slate-700",
  };

  return (
    <div
      className={`rounded-lg border p-3 transition duration-200 hover:shadow-sm ${
        colors[color] || colors.default
      }`}
    >
      <div className="mb-2 flex items-center gap-2 text-[11px] font-medium opacity-70">
        {icon}
        <span>{title}</span>
      </div>

      <div className="truncate text-sm font-bold">{value}</div>
    </div>
  );
}
