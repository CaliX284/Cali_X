import { supabase } from "./supabase";

// to get dashboard state which in stats card
export async function getDashboardStats(period = "30") {
  const { data, error } = await supabase.rpc("get_dashboard_stats", { period });

  if (error) throw error;

  return data[0];
}

// to get dashboard chart

export async function getDashboardChart(year = new Date().getFullYear()) {
  const { data, error } = await supabase.rpc("get_dashboard_chart", {
    year_input: year,
  });

  if (error) throw error;

  return data;
}

// to get payments stats in dashboard

export async function getPaymentsStats() {
  const { data, error } = await supabase.rpc("get_members_payment_status", {});

  if (error) throw error;

  return data;
}
