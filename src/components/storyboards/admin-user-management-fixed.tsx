"use client";

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
import { useState } from "react";

export default function AdminUserManagementFixed() {
  // Mock data for demonstration
  const users = [
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      role: "user",
      status: "active",
      created_at: "2023-10-15T09:20:00Z",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      role: "admin",
      status: "active",
      created_at: "2023-10-14T14:30:00Z",
    },
    {
      id: 3,
      name: "Mike Johnson",
      email: "mike@example.com",
      role: "user",
      status: "inactive",
      created_at: "2023-10-13T11:45:00Z",
    },
    {
      id: 4,
      name: "Sarah Williams",
      email: "sarah@example.com",
      role: "moderator",
      status: "active",
      created_at: "2023-10-12T16:20:00Z",
    },
    {
      id: 5,
      name: "David Brown",
      email: "david@example.com",
      role: "user",
      status: "active",
      created_at: "2023-10-11T08:45:00Z",
    },
  ];

  // State for filters
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const handleRoleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRoleFilter(e.target.value);
  };

  const handleStatusFilterChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setStatusFilter(e.target.value);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6 bg-gray-50">
      <header className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">User Management</h1>
          <p className="text-muted-foreground">
            Manage users on your directory platform
          </p>
        </div>
        <Button>
          <UserPlus className="w-4 h-4 mr-2" /> Add User
        </Button>
      </header>

      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
          <CardDescription>{users.length} users found</CardDescription>
        </CardHeader>
        <CardContent>
          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                placeholder="Search users..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <div className="w-full sm:w-40">
                <select
                  name="roleFilter"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={roleFilter}
                  onChange={handleRoleFilterChange}
                >
                  <option value="all">All Roles</option>
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                  <option value="moderator">Moderator</option>
                </select>
              </div>
              <div className="w-full sm:w-40">
                <select
                  name="statusFilter"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  value={statusFilter}
                  onChange={handleStatusFilterChange}
                >
                  <option value="all">All Statuses</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="suspended">Suspended</option>
                </select>
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
                {users.map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">{user.name}</td>
                    <td className="py-3 px-4">{user.email}</td>
                    <td className="py-3 px-4 capitalize">{user.role}</td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${user.status === "active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td className="py-3 px-4">
                      {new Date(user.created_at).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-6">
            <div className="flex gap-1">
              {[1, 2, 3].map((page) => (
                <Button
                  key={page}
                  variant={page === 1 ? "default" : "outline"}
                  size="sm"
                  className="w-9"
                >
                  {page}
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
