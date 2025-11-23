import { supabase } from "@/integrations/supabase/client";

export async function getById(col: string, id: number) {
  console.log(id);

  const { data, error } = await supabase.from(col).select("*").eq("id", id);
  if (error) throw error;
  console.log("dataaaaaaaaaaa", data);

  return data ?? []; // Product[]
}
