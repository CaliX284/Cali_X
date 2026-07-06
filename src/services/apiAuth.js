import { supabase } from "./supabase";

// for login
export async function login({ email, password }) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return data;
}

// to get the current user

export async function getCurrentUser() {
  const { data: sesstion } = await supabase.auth.getSession();
  if (!sesstion.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user ?? null;
}
//to logout

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

// to create new account

export async function signup({ email, password, fullName }) {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        fullName,
        avatar: "",
      },
    },
  });

  if (error) throw new Error(error.message);
  return data;
}

// for updating the account

export async function updateCurrentUser({ fullName, password }) {
  const updatedData = {};

  if (fullName) {
    updatedData.data = { fullName };
  }

  if (password) {
    updatedData.password = password;
  }

  const { data, error } = await supabase.auth.updateUser(updatedData);

  if (error) throw new Error(error.message);

  return data;
}
