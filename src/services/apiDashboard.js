import { supabase } from "./supabase";

// to get dashboard state which in stats card
export async function getDashboardStats(period = "30") {
  const { data, error } = await supabase.rpc("get_dashboard_stats", { period });

  if (error) throw error;

  return data[0];
}
