import { createClient } from "../../supabase/server";

// Function to get all settings
export async function getAllSettings() {
  const supabase = await createClient();

  const { data: settings, error } = await supabase.from("settings").select("*");

  if (error) {
    console.error("Error fetching settings:", error);
    return {};
  }

  // Transform settings into a more usable format
  return settings.reduce((acc, setting) => {
    acc[setting.key] = setting.value;
    return acc;
  }, {});
}

// Function to get a specific setting
export async function getSetting(key: string) {
  const supabase = await createClient();

  const { data: setting, error } = await supabase
    .from("settings")
    .select("value")
    .eq("key", key)
    .single();

  if (error) {
    console.error(`Error fetching setting ${key}:`, error);
    return null;
  }

  return setting.value;
}

// Function to update a setting
export async function updateSetting(key: string, value: any) {
  const supabase = await createClient();

  const { data: setting, error } = await supabase
    .from("settings")
    .update({
      value,
      updated_at: new Date().toISOString(),
    })
    .eq("key", key)
    .select()
    .single();

  if (error) {
    console.error(`Error updating setting ${key}:`, error);
    throw new Error(`Failed to update setting: ${error.message}`);
  }

  return setting;
}
