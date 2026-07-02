import Filter from "../../ui/Filter";
import Sort from "../../ui/Sort";
import Spinner from "../../ui/Spinner";
import { useCaptainStats } from "../captains/useCaptainState";

function MemberOperations() {
  const { captainStats, isPending } = useCaptainStats();

  if (isPending) return <Spinner />;
  return (
    <div className="my-7 rounded-xl bg-white px-1.5 py-4">
      <Filter
        nameFilter="members"
        values={[
          { label: "الكل", value: "all", field: "all" },
          { label: "نشط", value: "active", field: "subscription_status" },
          { label: "منتهي", value: "expired", field: "subscription_status" },

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
            label: "قريب الانتهاء",
            value: "expiring",
            field: "subscription_status",
          },
          {
            label: "مجمد",
            value: "frozen",
            field: "subscription_status",
          },
          {
            label: "عليه مستحقات",
            value: "true",
            field: "has_remaining",
          },
        ]}
      />
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
            value: "subscription_price-asc",
          },
          {
            label: "السعر: من الأعلى للأقل",
            value: "subscription_price-desc",
          },
        ]}
      />
    </div>
  );
}

export default MemberOperations;
