import { getSupabase } from "@/utils/supabase"

export const supabase = getSupabase()

export async function signOut() {
  await supabase.auth.signOut()
}

export async function signIn(email: string, password: string) {
  return await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  })
}

export async function signUp(email: string, password: string) {
  return await supabase.auth.signUp({
    email: email,
    password: password,
  })
}

