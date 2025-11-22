import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

export async function create(item: string, produ) {
  const { data, error } = await supabase.from(item).insert(produ).select();
  if (error) throw error;
  return data?.[0]; // single Product
}

export async function read(item: string, q = null) {
  const { data, error } = await supabase.from(item).select(q);
  if (error) throw error;
  return data ?? []; // Product[]
}

export async function update(item: string, itemUpdate) {
  const { data, error } = await supabase
    .from(item)
    .update(itemUpdate)
    .eq("id", itemUpdate.id)
    .select();
  if (error) throw error;
  return data?.[0]; // single Product
}

export async function del(item: string, itemId: string) {
  const { error } = await supabase.from(item).delete().eq("id", itemId);
  if (error) throw error;
  toast.success("Item deleted successfully");
  return itemId; // string
}
