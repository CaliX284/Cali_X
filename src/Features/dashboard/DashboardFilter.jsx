import Filter from "../../ui/Filter";

function DashboardFilter() {
  return (
    <div className="my-5 rounded-xl bg-white px-2.5 py-1.5">
      <Filter
        defaultValue={["period", "30"]}
        nameFilter="period"
        values={[
          { label: "يوم", value: "1", field: "period" },
          { label: "7 ايام", value: "7", field: "period" },
          { label: "30 يوم", value: "30", field: "period" },

          {
            label: "90 يوم",
            value: "90",
            field: "period",
          },
          {
            label: "من البدايه خالص",
            value: "all",
            field: "period",
          },
        ]}
      />
    </div>
  );
}

export default DashboardFilter;
