import Filter from "../../ui/Filter";
import TransactionStatsCon from "./TransactionStatsCon";

function TransactionsDashboard() {
  return (
    <div className="my-5">
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
            field: "all",
          },
        ]}
      />
      <TransactionStatsCon />
    </div>
  );
}

export default TransactionsDashboard;
