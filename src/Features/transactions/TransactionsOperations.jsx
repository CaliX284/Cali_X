import Filter from "../../ui/Filter";
import { useCaptainStats } from "../captains/useCaptainState";
import Spinner from "../../ui/Spinner";
function TransactionsOperations() {
  const { captainStats, isPending } = useCaptainStats();

  if (isPending) return <Spinner />;

  return (
    <div className="mt-7">
      <Filter
      nameFilter="transactions"
        values={[
          { label: "الكل", value: "all", field: "all" },
          { label: "المصروفات", value: "expense", field: "direction" },
          { label: "الإيرادات", value: "income", field: "direction" },

          {
            buttonType: "select",
            label: "اختار المدرب",
            value: "captain_id",
            field: "captain_id",
            options: captainStats?.map((captain) => ({
              label: captain.full_name,
              value: captain.id,
              key: captain.id,
            })),
          },

          {
            label: "الحصص الاضافيه ",
            value: "session",
            field: "type_transaction",
          },
        ]}
      />
    </div>
  );
}

export default TransactionsOperations;
