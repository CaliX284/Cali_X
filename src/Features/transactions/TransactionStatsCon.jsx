import StatCard from "../../ui/StatCard";
import { formatCurrency } from "../../utils/helpers";

import { FaArrowAltCircleUp } from "react-icons/fa";
import { FaArrowCircleDown } from "react-icons/fa";
import { MdOutlineShowChart } from "react-icons/md";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { useTransactionStats } from "./useTransactioStats";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

function TransactionStatsCon() {
  const { stats, isLoading, error } = useTransactionStats();

  const { expense, income, profit, transactions_count } = stats ?? {};

  if (isLoading) return <Spinner type="mini" />;
  if (error) return <Error />;
  return (
    <div className="my-3.5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
      <StatCard
        icon={<FaArrowAltCircleUp />}
        value={`${formatCurrency(income)}`}
        label="اجمالي الدخل"
        iconColor="text-green-600"
        iconBg="bg-green-100"
      />
      <StatCard
        icon={<FaArrowCircleDown />}
        value={`${formatCurrency(expense)}`}
        label="إجمالي  المصروفات "
        iconColor="text-red-600"
        iconBg="bg-red-100"
      />

      <StatCard
        icon={<MdOutlineShowChart />}
        value={`${formatCurrency(profit)}`}
        label="صافي الايراد"
        iconColor="text-purple-600"
        iconBg="bg-purple-100"
      />

      <StatCard
        icon={<RiMoneyPoundCircleFill />}
        value={transactions_count}
        label="اجمالي العمليات "
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
      />
    </div>
  );
}

export default TransactionStatsCon;
