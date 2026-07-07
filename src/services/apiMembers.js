// add new member
import { supabase } from "./supabase";
import { createIncomeTransaction } from "./transactionServies";

export async function createMember(memberData) {
  // 1- إضافة العضو
  const { data: member, error: memberError } = await supabase
    .from("members")
    .insert([memberData])
    .select()
    .single();

  if (memberError) {
    console.error(memberError);
    throw new Error("حدث خطأ أثناء إضافة العضو");
  }

  // 2- تسجيل أول دفعة في transactions
  if (member.paid_amount > 0) {
    await createIncomeTransaction({
      memberId: member.id,
      captainId: member.captain_id,
      type: "new_member",
      amount: member.paid_amount,
      notes: "تسجيل عضو جديد",
    });
  }

  return member;
}

// Get all Memeber for memeber_view
export async function getAllMembersView(
  page,
  pageSize,
  theFilter,
  theSort,
  theSearch,
) {
  let query = supabase.from("members_view").select("*", { count: "exact" });

  //[1] filter
  if (theFilter) {
    query = query[theFilter.method || "eq"](theFilter.field, theFilter.value);
  }

  // [2] search
  if (theSearch) {
    const value = theSearch.value.trim();

    if (/^\d+$/.test(value)) {
      // لو المستخدم كتب رقم -> ابحث بالـ ID
      query = query.eq("id", Number(value));
    } else {
      // لو كتب نص -> ابحث بالاسم
      query = query.ilike("full_name", `%${value}%`);
    }
  }

  //[3] sorting
  if (theSort) {
    query = query.order(theSort.field, {
      ascending: theSort.dir === "asc" ? true : false,
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
    throw new Error("Failed to fetch members");
  }

  return { data, count };
}

// update the member data
export async function updateMember(id, memberData) {
  const { data, error } = await supabase
    .from("members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تحديث بيانات العضو");
  }

  return data;
}

// delete member
export async function deleteMember(id) {
  const { data, error } = await supabase
    .from("members")
    .delete()
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Failed to delete member");
  }

  return data;
}

// get member by id
export async function getMemberStatsById(id) {
  const { data, error } = await supabase
    .from("members_view")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Couldn't get member stats");
  }

  return data;
}

// PayBack and save it in transacrions

export async function payMember(id, memberData, amountPaid) {
  // تحديث بيانات العضو
  const { data, error } = await supabase
    .from("members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تحديث بيانات العضو");
  }

  // تسجيل العملية المالية
  await createIncomeTransaction({
    memberId: id,
    captainId: data.captain_id,
    type: "debt_payment",
    amount: amountPaid,
    notes: "سداد المبلغ المستحق",
  });

  return data;
}

// Renew member subscription
export async function renewMember(id, memberData, amountPaid = 0) {
  // 1- تحديث بيانات العضو
  const { data, error } = await supabase
    .from("members")
    .update(memberData)
    .eq("id", id)
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("حدث خطأ أثناء تجديد الاشتراك");
  }

  // 2- تسجيل العملية المالية إذا تم دفع مبلغ
  if (amountPaid > 0) {
    await createIncomeTransaction({
      memberId: id,
      captainId: data.captain_id,
      type: "renewal",
      amount: amountPaid,
      notes: "تجديد الاشتراك",
    });
  }

  return data;
}
