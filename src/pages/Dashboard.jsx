import AddSessionButton from "../Features/sessions/AddSessionButton";
import AddMemberButton from "../Features/members/AddMemberButton";
import DashboardMainArea from "../Features/dashboard/DashboardMainArea";

function Dashboard() {
  return (
    <>
      <div className="my-3 flex items-center gap-1.5">
        <AddSessionButton />
        <AddMemberButton />
      </div>
      <DashboardMainArea />
    </>
  );
}

export default Dashboard;
