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
import { redirect } from "next/navigation";
import RoleSelect from "@/components/role-select";
import StatusSelect from "@/components/status-select";

export const metadata = {
  title: "Add User | Admin Dashboard",
  description: "Add a new user to the platform",
};

export default async function AddUserPage() {
  async function createUser(formData: FormData) {
    "use server";

    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;
    const status = formData.get("status") as string;
    const phone = formData.get("phone") as string;
    const location = formData.get("location") as string;
    const bio = formData.get("bio") as string;
    const website = formData.get("website") as string;

    const supabase = await createClient();

    // Create user in auth
    const { data: authUser, error: authError } =
      await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
      });

    if (authError) {
      console.error("Error creating user:", authError);
      return { success: false, error: authError.message };
    }

    // Create user profile
    const { error: profileError } = await supabase.from("users").upsert({
      id: authUser.user.id,
      email,
      name,
      role,
      status,
      phone,
      location,
      bio,
      website,
      created_at: new Date().toISOString(),
    });

    if (profileError) {
      console.error("Error creating user profile:", profileError);
      return { success: false, error: profileError.message };
    }

    redirect(`/admin/users/${authUser.user.id}`);
  }

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold mb-2">Add New User</h1>
          <p className="text-muted-foreground">
            Create a new user account on the platform
          </p>
        </div>
        <Link href="/admin/users">
          <Button variant="outline">
            <ArrowLeft className="w-4 h-4 mr-2" /> Back to Users
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>User Information</CardTitle>
          <CardDescription>
            Fill in the details for the new user
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={createUser} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input id="name" name="name" placeholder="Full Name" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Password"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <select
                  id="role"
                  name="role"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  defaultValue="user"
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
                  defaultValue="active"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input id="phone" name="phone" placeholder="Phone Number" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  name="location"
                  placeholder="City, State, Country"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="website">Website</Label>
                <Input
                  id="website"
                  name="website"
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
                placeholder="User bio"
              />
            </div>

            <div className="flex justify-end gap-2">
              <Link href="/admin/users">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
              <Button type="submit">Create User</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
