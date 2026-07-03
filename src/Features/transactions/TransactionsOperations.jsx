import Filter from "../../ui/Filter";
import { useCaptainStats } from "../captains/useCaptainState";
import Spinner from "../../ui/Spinner";
import Sort from "../../ui/Sort";
function TransactionsOperations() {
  const { captainStats, isPending } = useCaptainStats();

  if (isPending) return <Spinner />;

  return (
    <div className="my-5 rounded-xl bg-white px-1.5 py-3">
      <Sort
        options={[
          {
            label: "الأحدث أولاً",
            value: "created_at-desc",
          },
          {
            label: "الأقدم أولاً",
            value: "created_at-asc",
          },
          {
            label: "السعر: من الأقل للأعلى",
            value: "amount_paid-asc",
          },
          {
            label: "السعر: من الأعلى للأقل",
            value: "amount_paid-desc",
          },
        ]}
      />

      <Filter
      defaultValue={["all" , "all"]}
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
