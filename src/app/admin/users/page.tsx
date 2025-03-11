import { createClient } from "../../../../supabase/server";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Edit, Trash2, UserPlus, Search } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "User Management | Admin Dashboard",
  description: "Manage users on your directory platform",
};

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: { q?: string; page?: string; role?: string; status?: string };
}) {
  const supabase = await createClient();

  // Parse query parameters
  const query = searchParams.q || "";
  const currentPage = parseInt(searchParams.page || "1");
  const role = searchParams.role || "all";
  const status = searchParams.status || "all";
  const pageSize = 10;
  const offset = (currentPage - 1) * pageSize;

  // Build the query
  let usersQuery = supabase.from("users").select("*", { count: "exact" });

  // Apply filters
  if (query) {
    usersQuery = usersQuery.or(`name.ilike.%${query}%,email.ilike.%${query}%`);
  }

  if (role !== "all") {
    usersQuery = usersQuery.eq("role", role);
  }

  if (status !== "all") {
    usersQuery = usersQuery.eq("status", status);
  }

  // Apply pagination
  usersQuery = usersQuery
    .order("created_at", { ascending: false })
    .range(offset, offset + pageSize - 1);

  // Execute the query
  const { data: users, count, error } = await usersQuery;

  // Calculate pagination info
  const totalPages = count ? Math.ceil(count / pageSize) : 0;

  return (
    <div className="space-y-6">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage users on your directory platform
          </p>
        </div>
        <Link href="/admin/users/add">
          <Button>
            <UserPlus className="w-4 h-4 mr-2" /> Add User
          </Button>
        </Link>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>
            {count} {count === 1 ? "user" : "users"} found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <form action="/admin/users" method="GET">
                <Input
                  name="q"
                  placeholder="Search users..."
                  className="pl-10"
                  defaultValue={query}
                />
                {role !== "all" && (
                  <input type="hidden" name="role" value={role} />
                )}
                {status !== "all" && (
                  <input type="hidden" name="status" value={status} />
                )}
              </form>
            </div>
            <div className="flex gap-2">
              <div className="w-full sm:w-40">
                <form
                  action="/admin/users"
                  method="GET"
                  id="roleFilterForm"
                  className="m-0"
                >
                  <select
                    name="role"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={role}
                    onChange="this.form.submit()"
                  >
                    <option value="all">All Roles</option>
                    <option value="user">User</option>
                    <option value="admin">Admin</option>
                    <option value="moderator">Moderator</option>
                  </select>
                  {query && <input type="hidden" name="q" value={query} />}
                  {status !== "all" && (
                    <input type="hidden" name="status" value={status} />
                  )}
                </form>
              </div>
              <div className="w-full sm:w-40">
                <form
                  action="/admin/users"
                  method="GET"
                  id="statusFilterForm"
                  className="m-0"
                >
                  <select
                    name="status"
                    className="w-full p-2 border border-gray-300 rounded-md"
                    defaultValue={status}
                    onChange="this.form.submit()"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="suspended">Suspended</option>
                  </select>
                  {query && <input type="hidden" name="q" value={query} />}
                  {role !== "all" && (
                    <input type="hidden" name="role" value={role} />
                  )}
                </form>
              </div>
            </div>
          </div>

          {/* Users Table */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Email</th>
                  <th className="text-left py-3 px-4">Role</th>
                  <th className="text-left py-3 px-4">Status</th>
                  <th className="text-left py-3 px-4">Joined</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <tr key={user.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4">{user.name || "--"}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4 capitalize">
                        {user.role || "user"}
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                        >
                          {user.status || "active"}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        {new Date(user.created_at).toLocaleDateString()}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Link href={`/admin/users/${user.id}/edit`}>
                            <Button variant="ghost" size="sm">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </Link>
                          <Link href={`/admin/users/${user.id}`}>
                            <Button variant="ghost" size="sm">
                              View
                            </Button>
                          </Link>
                          <form
                            action={`/api/admin/users/${user.id}`}
                            method="DELETE"
                          >
                            <Button
                              variant="ghost"
                              size="sm"
                              className="text-red-600"
                            >
                              <Trash2 className="w-4 h-4" />
                            </Button>
                          </form>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={6}
                      className="py-6 text-center text-muted-foreground"
                    >
                      No users found
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex justify-center mt-6">
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                  (page) => (
                    <Link
                      key={page}
                      href={{
                        pathname: "/admin/users",
                        query: {
                          ...(query ? { q: query } : {}),
                          ...(role !== "all" ? { role } : {}),
                          ...(status !== "all" ? { status } : {}),
                          page: page.toString(),
                        },
                      }}
                    >
                      <Button
                        variant={currentPage === page ? "default" : "outline"}
                        size="sm"
                        className="w-9"
                      >
                        {page}
                      </Button>
                    </Link>
                  ),
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
