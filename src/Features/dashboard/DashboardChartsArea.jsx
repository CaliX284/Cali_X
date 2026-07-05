import Spinner from "../../ui/Spinner";
import MembersPaymentStatusChart from "./MembersPaymentStatusChart";
import MonthesChart from "./MonthesChart";
import { useDashboardChart } from "./useDashboardChart";
import { usePaymentsMembersStats } from "./usePaymentsMembersStats";

function DashboardChartsArea() {
  const { data, isLoading } = useDashboardChart();
  const { data: membersPayments, isLoading: isLoadingMem } =
    usePaymentsMembersStats();

  if (isLoading || isLoadingMem) return <Spinner />;

  return (
    <div className="my-6 flex flex-wrap gap-5">
      <MonthesChart data={data} />
      <MembersPaymentStatusChart data={membersPayments} />
    </div>
  );
}

export default DashboardChartsArea;
