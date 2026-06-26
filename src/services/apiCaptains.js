import { supabase } from "./supabase";

// to get captains data
export async function getCaptains() {
  const { data, error } = await supabase.from("captains").select("*");

  if (error) throw new Error(error.message);

  return data;
}

// to create new cpatain
export async function createCaptain(newCaptain) {
  const { data, error } = await supabase
    .from("captains")
    .insert([newCaptain])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("Captain could not be created");
  }

  return data;
}