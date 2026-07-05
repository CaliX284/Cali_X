import DashboardChartsArea from "./DashboardChartsArea";
import DashboardFilter from "./DashboardFilter";
import DashboardLatPaymentsArea from "./DashboardLatPaymentsArea";
import DashboardStatsContainer from "./DashboardStatsContainer";

function DashboardMainArea() {
  return (
    <div>
      <DashboardFilter />
      <DashboardStatsContainer />
      <DashboardChartsArea />
      <DashboardLatPaymentsArea />
    </div>
  );
}

export default DashboardMainArea;
