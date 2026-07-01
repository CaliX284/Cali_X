import { supabase } from "./supabase";

export async function createTransaction(transactionData) {
  const { data, error } = await supabase
    .from("transactions")
    .insert([transactionData])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to create transaction");
  }

  return data;
}

// to get all transactions

export async function getTransactions(page, pageSize) {
  let query = supabase
    .from("transactions")
    .select(
      `
      *,
      member:members(id, full_name),
      captain:captains(id, full_name)
      `,
      { count: "exact" },
    )
    .order("paid_at", { ascending: false });

  //[1] Pagination
  if (page) {
    const from = (page - 1) * pageSize;
    const to = from + pageSize - 1;

    query = query.range(from, to);
  }

  const { data, error, count } = await query;

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch transactions");
  }

  return { data, count };
}
