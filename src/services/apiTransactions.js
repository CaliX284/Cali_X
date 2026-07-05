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

// export async function getTransactions(page, pageSize, theFilter, theSort) {
//   let query = supabase
//     .from("transactions")
//     .select(
//       `
//       *,
//       member:members(id, full_name),
//       captain:captains(id, full_name)
//       `,
//       { count: "exact" },
//     )
//     // .order("paid_at", { ascending: false });

//   //[1] Filter
//   if (theFilter) {
//     query = query[theFilter.method || "eq"](theFilter.field, theFilter.value);
//   }

//   //[2] sorting
//   if (theSort) {
//     query = query.order(theSort.field, {
//       ascending: theSort.dir === "asc" ? true : false,
//     });
//   }

//   //[3] Pagination
//   if (page) {
//     const from = (page - 1) * pageSize;
//     const to = from + pageSize - 1;

//     query = query.range(from, to);
//   }

//   const { data, error, count } = await query;

//   if (error) {
//     console.error(error);
//     throw new Error("Failed to fetch transactions");
//   }

//   return { data, count };
// }

//to get all transaction with period [v2]

export async function getTransactions(
  page,
  pageSize,
  theFilter,
  theSort,
  thePeriod,
) {
  let query = supabase.from("transactions").select(
    `
      *,
      member:members(id, full_name),
      captain:captains(id, full_name)
      `,
    { count: "exact" },
  );

  //[1] Period Filter
  if (thePeriod !== "all") {
    const fromDate = new Date();
    fromDate.setUTCHours(0, 0, 0, 0);
    fromDate.setUTCDate(fromDate.getUTCDate() - Number(thePeriod) + 1);

    query = query.gte("paid_at", fromDate.toISOString());
  }

  //[2] Filter
  if (theFilter) {
    query = query[theFilter.method || "eq"](theFilter.field, theFilter.value);
  }

  //[3] Sorting
  if (theSort) {
    query = query.order(theSort.field, {
      ascending: theSort.dir === "asc",
    });
  }

  //[4] Pagination
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

// to get transactions Stats with period

export async function getTransactionStats(period) {
  const { data, error } = await supabase.rpc("get_transaction_stats", {
    period_days: period,
  });

  if (error) {
    console.error(error);
    throw new Error("Failed to fetch transaction stats");
  }

  return data[0];
}

// to get the latest transactions

export async function getLatestTransactions(limit = 5) {
  const { data, error } = await supabase
    .from("transactions")
    .select(`
      *,
      members (
        id,
        full_name
      ),
      captains (
        id,
        full_name
      )
    `)
    .order("created_at", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return data;
}
