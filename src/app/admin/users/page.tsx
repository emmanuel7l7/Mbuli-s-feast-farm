
'use client'

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { MoreHorizontal, UserPlus, Edit, Trash2, Shield, User, Truck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge";
import type { User } from '@/lib/types';

const dummyUsers: User[] = [
  { id: "USR-001", name: "Super Admin", email: "admin@example.com", phone: "+255 784 000 001", role: "Admin", status: "active" },
  { id: "USR-002", name: "John Customer", email: "john@customer.com", phone: "+255 712 111 222", role: "Customer", status: "active" },
  { id: "USR-003", name: "Jane Driver", email: "jane@delivery.com", phone: "+255 655 333 444", role: "Delivery", status: "active" },
  { id: "USR-004", name: "Suspended User", email: "suspended@example.com", phone: "+255 718 555 666", role: "Customer", status: "suspended" },
];

const roleIcons = {
  Admin: <Shield className="h-4 w-4" />,
  Customer: <User className="h-4 w-4" />,
  Delivery: <Truck className="h-4 w-4" />,
};

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage all system users and their roles.</p>
        </div>
        <Button>
          <UserPlus className="mr-2 h-4 w-4" /> Add New User
        </Button>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>All Users</CardTitle>
          <CardDescription>A list of all users in the system.</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User ID</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Phone</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">{user.id}</TableCell>
                  <TableCell>{user.name}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {roleIcons[user.role]}
                      <span>{user.role}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.status === 'active' ? 'default' : 'destructive'}>{user.status}</Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Open menu</span>
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                         <DropdownMenuItem>
                            {user.status === 'active' ? 'Suspend User' : 'Activate User'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
