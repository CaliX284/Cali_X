import Spinner from "../../ui/Spinner";
import MonthesChart from "./MonthesChart";
import { useDashboardChart } from "./useDashboardChart";

function DashboardChartsArea() {
  const { data, isLoading } = useDashboardChart();

  if (isLoading) return <Spinner />;

  return (
    <div className="my-6">
      <MonthesChart data={data} />
    </div>
  );
}

export default DashboardChartsArea;
