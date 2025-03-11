import { createClient } from "../../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import RoleSelect from "@/components/role-select";
import StatusSelect from "@/components/status-select";

export const metadata = {
  title: "Edit User | Admin Dashboard",
  description: "Edit user details and permissions",
};

export default async function EditUserPage({
  params,
}: {
  params: { id: string };
}) {
  const supabase = await createClient();

  // Fetch the user
  const { data: userData, error } = await supabase
    .from("users")
    .select("*")
    .eq("id", params.id)
    .single();

  if (error || !userData) {
    notFound();
  }

  async function updateUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const website = formData.get("website") as string;

    const supabase = await createClient();

    // Update user profile
    const { error } = await supabase
      .from("users")
      .update({
        name,
        email,
        role,
        status,
        phone,
        location,
        bio,
        website,
        updated_at: new Date().toISOString(),
      })
      .eq("id", params.id);

    if (error) {
      console.error("Error updating user:", error);
      return { success: false, error: error.message };
    }

    redirect(`/admin/users/${params.id}`);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Edit User</h1>
          <p className="text-muted-foreground">
            Update information for {userData.name || userData.email || "User"}
          </p>
        </div>
        <Link href={`/admin/users/${userData.id}`}>
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to User
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>Edit user details and permissions</CardDescription>
        </CardHeader>
        <CardContent>
          <form action={updateUser} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  name="name"
                  defaultValue={userData.name || ""}
                  placeholder="Full Name"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={userData.email || ""}
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={userData.role || "user"}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <select
                  id="status"
                  name="status"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue={userData.status || "active"}
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  name="phone"
                  defaultValue={userData.phone || ""}
                  placeholder="Phone Number"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  defaultValue={userData.location || ""}
                  placeholder="City, State, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
                  defaultValue={userData.website || ""}
                  placeholder="https://example.com"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="bio">Bio</Label>
              <textarea
                id="bio"
                name="bio"
                rows={4}
                className="w-full min-h-[80px] rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                defaultValue={userData.bio || ""}
                placeholder="User bio"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Link href={`/admin/users/${userData.id}`}>
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
