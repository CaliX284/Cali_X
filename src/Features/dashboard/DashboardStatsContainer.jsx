import { FaArrowAltCircleUp, FaArrowCircleDown } from "react-icons/fa";
import StatCard from "../../ui/StatCard";
import { formatCurrency } from "../../utils/helpers";
import { RiMoneyPoundCircleFill } from "react-icons/ri";
import { MdOutlineAttachMoney } from "react-icons/md";
import { FaUsers } from "react-icons/fa";
import { FaAward } from "react-icons/fa";
import { RxValueNone } from "react-icons/rx";
import { useGetDashboardStats } from "./useGetDashboardStats";
import Spinner from "../../ui/Spinner";
import Error from "../../ui/Error";

function DashboardStatsContainer() {
  const { stats, isLoading, error } = useGetDashboardStats();

  const {
    captains_count,
    total_revenue,
    outstanding_payments,
    members_count,
    gym_profit,
    expired_sub,
    expiring_soon,
    expenses,
  } = stats ?? {};

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return (
    <div className="my-3.5 grid grid-cols-2 gap-3.5 sm:grid-cols-3 md:grid-cols-4">
      <StatCard
        icon={<FaArrowAltCircleUp />}
        value={`${formatCurrency(total_revenue)}`}
        label="الايراد"
        iconColor="text-green-600"
        iconBg="bg-green-100"
      />
      <StatCard
        icon={<MdOutlineAttachMoney />}
        value={`${formatCurrency(gym_profit)}`}
        label="صافي الربح"
        iconColor="text-blue-600"
        iconBg="bg-blue-100"
      />

      <StatCard
        icon={<FaArrowCircleDown />}
        value={`${formatCurrency(expenses)}`}
        label="اجمالي الصرف"
        iconColor="text-red-600"
        iconBg="bg-red-100"
      />

      <StatCard
        icon={<RiMoneyPoundCircleFill />}
        value={formatCurrency(outstanding_payments)}
        label="اجمالي المبالغ المستحقه"
        iconColor="text-yellow-600"
        iconBg="bg-yellow-100"
      />
      <StatCard
        icon={<FaUsers />}
        value={members_count}
        label="عدد الاعضاء "
        iconColor="text-orange-600"
        iconBg="bg-orange-100"
      />
      <StatCard
        icon={<FaAward />}
        value={captains_count}
        label="عدد المدربين"
        iconColor="text-lime-600"
        iconBg="bg-lime-100"
      />
      <StatCard
        icon={<RxValueNone />}
        value={expired_sub}
        label="الاشتراكات المنتهيه"
        iconColor="text-red-600"
        iconBg="bg-red-100"
      />
      <StatCard
        icon={<RxValueNone />}
        value={expiring_soon}
        label="الاشتراكات قريبه الانتهاء "
        iconColor="text-stone-600"
        iconBg="bg-stone-100"
      />
    </div>
  );
}

export default DashboardStatsContainer;
