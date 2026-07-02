import { supabase } from "./supabase";
import { getSettings } from "./apiSettings";
import { formatDateForDB } from "../utils/helpers";

export async function createIncomeTransaction({
  memberId,
  captainId,
  type,
  amount,
  notes = "",
  paid_at = formatDateForDB(new Date()),
}) {
  // الحصول على إعدادات النظام
  const settings = await getSettings();

  if (!settings) throw new Error("Couldn't load settings");

  const captainPercentage = Number(settings.percentage);

  const captainAmount = Number(((amount * captainPercentage) / 100).toFixed(2));

  const gymAmount = Number((amount - captainAmount).toFixed(2));

  const { data, error } = await supabase
    .from("transactions")
    .insert([
      {
        member_id: memberId,
        captain_id: captainId,

        type_transaction: type,
        direction: "income",

        amount_paid: amount,

        captain_amount: captainAmount,
        gym_amount: gymAmount,

        notes,
        paid_at,
      },
    ])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create income transaction");
  }

  return data;
}
