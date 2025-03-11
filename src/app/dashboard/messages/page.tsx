import { createClient } from "../../../../supabase/server";
import { redirect } from "next/navigation";
import MessageList from "@/components/message-list";

export const metadata = {
  title: "Messages | Dashboard",
  description: "Manage your conversations",
};

export default async function MessagesPage() {
  const supabase = await createClient();

  // Check if user is authenticated
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/sign-in?callbackUrl=/dashboard/messages");
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
        <h1 className="text-3xl font-bold mb-2">Messages</h1>
        <p className="text-muted-foreground">
          Manage your conversations with listing owners and users
        </p>
      </header>

      <MessageList userId={user.id} />
    </div>
  );
}
