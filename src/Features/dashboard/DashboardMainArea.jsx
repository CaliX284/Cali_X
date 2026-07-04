import DashboardChartsArea from "./DashboardChartsArea";
import DashboardFilter from "./DashboardFilter";
import DashboardStatsContainer from "./DashboardStatsContainer";

function DashboardMainArea() {
  return (
    <div>
      <DashboardFilter />
      <DashboardStatsContainer />
      <DashboardChartsArea />
    </div>
  );
}

export default DashboardMainArea;
