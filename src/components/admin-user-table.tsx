"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Edit,
  Trash2,
  MoreHorizontal,
  Mail,
  Shield,
  UserX,
  UserCheck,
  Eye,
} from "lucide-react";
import { useRouter } from "next/navigation";

interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  status: string;
  created_at: string;
  avatar_url?: string;
  subscription?: string;
}

interface AdminUserTableProps {
  users: User[];
  searchQuery: string;
  roleFilter: string;
  statusFilter: string;
  onSearchChange: (query: string) => void;
  onRoleFilterChange: (role: string) => void;
  onStatusFilterChange: (status: string) => void;
  onDelete?: (userId: string | number) => void;
  onSuspend?: (userId: string | number) => void;
  onActivate?: (userId: string | number) => void;
}

export default function AdminUserTable({
  users,
  searchQuery,
  roleFilter,
  statusFilter,
  onSearchChange,
  onRoleFilterChange,
  onStatusFilterChange,
  onDelete,
  onSuspend,
  onActivate,
}: AdminUserTableProps) {
  const router = useRouter();
  const [selectedUsers, setSelectedUsers] = useState<(string | number)[]>([]);

  // Filter users based on search query and filters
  const filteredUsers = users.filter((user) => {
    // Search filter
    const matchesSearch =
      searchQuery === "" ||
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());

    // Role filter
    const matchesRole = roleFilter === "all" || user.role === roleFilter;

    // Status filter
    const matchesStatus =
      statusFilter === "all" || user.status === statusFilter;

    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedUsers(filteredUsers.map((user) => user.id));
    } else {
      setSelectedUsers([]);
    }
  };

  const handleSelectUser = (userId: string | number) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge className="bg-green-100 text-green-800 hover:bg-green-200">
            Active
          </Badge>
        );
      case "inactive":
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            Inactive
          </Badge>
        );
      case "suspended":
        return (
          <Badge className="bg-red-100 text-red-800 hover:bg-red-200">
            Suspended
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            {status}
          </Badge>
        );
    }
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "admin":
        return (
          <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">
            Admin
          </Badge>
        );
      case "moderator":
        return (
          <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">
            Moderator
          </Badge>
        );
      default:
        return (
          <Badge className="bg-gray-100 text-gray-800 hover:bg-gray-200">
            User
          </Badge>
        );
    }
  };

  return (
    <div className="space-y-4">
      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <div className="bg-blue-50 p-3 rounded-md flex items-center justify-between">
          <span className="text-sm text-blue-700">
            {selectedUsers.length} users selected
          </span>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-red-600 border-red-200 hover:bg-red-50"
              onClick={() => {
                if (
                  window.confirm(
                    `Are you sure you want to delete ${selectedUsers.length} users?`,
                  )
                ) {
                  // Handle bulk delete
                  selectedUsers.forEach((userId) => onDelete?.(userId));
                  setSelectedUsers([]);
                }
              }}
            >
              <Trash2 className="w-4 h-4 mr-1" /> Delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-yellow-600 border-yellow-200 hover:bg-yellow-50"
              onClick={() => {
                // Handle bulk suspend
                selectedUsers.forEach((userId) => onSuspend?.(userId));
                setSelectedUsers([]);
              }}
            >
              <UserX className="w-4 h-4 mr-1" /> Suspend
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="text-green-600 border-green-200 hover:bg-green-50"
              onClick={() => {
                // Handle bulk activate
                selectedUsers.forEach((userId) => onActivate?.(userId));
                setSelectedUsers([]);
              }}
            >
              <UserCheck className="w-4 h-4 mr-1" /> Activate
            </Button>
          </div>
        </div>
      )}

      {/* Users Table */}
      <div className="overflow-x-auto rounded-md border">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="w-12 px-4 py-3 text-left">
                <input
                  type="checkbox"
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  onChange={handleSelectAll}
                  checked={
                    selectedUsers.length === filteredUsers.length &&
                    filteredUsers.length > 0
                  }
                />
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Role
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-500 uppercase tracking-wider">
                Joined
              </th>
              <th className="px-4 py-3 text-right text-sm font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="px-4 py-4 whitespace-nowrap">
                    <input
                      type="checkbox"
                      className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      checked={selectedUsers.includes(user.id)}
                      onChange={() => handleSelectUser(user.id)}
                    />
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center text-gray-600 font-medium uppercase">
                        {user.avatar_url ? (
                          <img
                            src={user.avatar_url}
                            alt={user.name}
                            className="h-10 w-10 rounded-full object-cover"
                          />
                        ) : (
                          user.name.charAt(0)
                        )}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {user.name}
                        </div>
                        <div className="text-sm text-gray-500">
                          {user.email}
                        </div>
                        {user.subscription && (
                          <Badge className="mt-1 bg-blue-50 text-blue-700 hover:bg-blue-100">
                            {user.subscription}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getRoleBadge(user.role)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {getStatusBadge(user.status)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(user.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                          onClick={() => router.push(`/admin/users/${user.id}`)}
                        >
                          <Eye className="w-4 h-4 mr-2" /> View
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            router.push(`/admin/users/${user.id}/edit`)
                          }
                        >
                          <Edit className="w-4 h-4 mr-2" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() =>
                            (window.location.href = `mailto:${user.email}`)
                          }
                        >
                          <Mail className="w-4 h-4 mr-2" /> Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        {user.status === "active" ? (
                          <DropdownMenuItem
                            onClick={() => onSuspend?.(user.id)}
                            className="text-yellow-600"
                          >
                            <UserX className="w-4 h-4 mr-2" /> Suspend
                          </DropdownMenuItem>
                        ) : (
                          <DropdownMenuItem
                            onClick={() => onActivate?.(user.id)}
                            className="text-green-600"
                          >
                            <UserCheck className="w-4 h-4 mr-2" /> Activate
                          </DropdownMenuItem>
                        )}
                        <DropdownMenuItem
                          onClick={() => {
                            if (
                              window.confirm(
                                `Are you sure you want to delete ${user.name}?`,
                              )
                            ) {
                              onDelete?.(user.id);
                            }
                          }}
                          className="text-red-600"
                        >
                          <Trash2 className="w-4 h-4 mr-2" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                  No users found matching your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
