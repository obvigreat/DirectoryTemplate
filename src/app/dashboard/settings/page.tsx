import { Metadata } from "next";
import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import AccountSettingsForm from "@/components/account-settings-form";

export const metadata: Metadata = {
  title: "Account Settings | Directory",
  description: "Manage your account settings and preferences",
};

export default async function SettingsPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/dashboard/settings");
  }

  // Get user profile
  const { data: profile } = await supabase
    .from("users")
    .select("*")
    .eq("id", user.id)
    .single();

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-3xl font-bold mb-2">Account Settings</h1>
        <p className="text-muted-foreground">
          Manage your account settings, profile, and preferences
        </p>
      </header>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <AccountSettingsForm user={user} profile={profile} />
      </div>
    </div>
  );
}
