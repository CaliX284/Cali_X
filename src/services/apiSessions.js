import { supabase } from "./supabase";
import { createIncomeTransaction } from "./transactionServies";

// Get all sessions
export async function getSessions() {
  const { data, error } = await supabase
    .from("sessions")
    .select("*")
    .order("date", { ascending: false });

  if (error) throw error;

  return data;
}

// Add new session
export async function addSession(newSession) {
  // 1- Add session
  const { data: session, error: sessionError } = await supabase
    .from("sessions")
    .insert([newSession])
    .select()
    .single();

  if (sessionError) throw sessionError;

  // 2- Add transaction
  await createIncomeTransaction({
    memberId: null, // لأن الـ Session مش مرتبطة بعضو
    captainId: newSession.captain_id,
    type: "session",
    amount: newSession.price,
    notes: `حصه للاعب ${newSession.member_name}`,
    paid_at: newSession.date,
  });

  return session;
}
