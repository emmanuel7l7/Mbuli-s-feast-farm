
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
import { MoreHorizontal, UserPlus, Edit, Trash2, Shield, User, Truck, UserX, UserCheck } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast";
import type { User } from '@/lib/types';


const dummyUsers: User[] = [
  { id: "USR-001", name: "Super Admin", email: "admin@example.com", phone: "+255 784 000 001", role: "Admin", status: "active" },
  { id: "USR-002", name: "John Customer", email: "john@customer.com", phone: "+255 712 111 222", role: "Customer", status: "active" },
  { id: "USR-003", name: "Jane Driver", email: "jane@delivery.com", phone: "+255 655 333 444", role: "Delivery", status: "active" },
  { id: "USR-004", name: "Suspended User", email: "suspended@example.com", phone: "+255 718 555 666", role: "Customer", status: "suspended" },
];

const roleIcons: Record<User['role'], React.ReactNode> = {
  Admin: <Shield className="h-4 w-4" />,
  Customer: <User className="h-4 w-4" />,
  Delivery: <Truck className="h-4 w-4" />,
};

const initialFormState = {
  name: "",
  email: "",
  phone: "",
  role: "Customer" as User['role'],
}

export default function UserManagementPage() {
  const [users, setUsers] = useState<User[]>(dummyUsers);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userForm, setUserForm] = useState(initialFormState);
  const { toast } = useToast();

  const resetForm = () => {
    setEditingUser(null);
    setUserForm(initialFormState);
  }

  const openDialog = (user: User | null = null) => {
    if (user) {
        setEditingUser(user);
        setUserForm({ name: user.name, email: user.email, phone: user.phone, role: user.role });
    } else {
        resetForm();
    }
    setIsDialogOpen(true);
  }

  const closeDialog = () => {
    setIsDialogOpen(false);
    setTimeout(resetForm, 300); // delay to allow dialog to close before form reset
  }

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { id, value } = e.target;
      setUserForm(prev => ({...prev, [id]: value}));
  };

  const handleRoleChange = (value: User['role']) => {
    setUserForm(prev => ({ ...prev, role: value }));
  };

  const validateForm = () => {
      if (!userForm.name || !userForm.email || !userForm.phone) {
          toast({ title: "Error", description: "All fields are required.", variant: "destructive" });
          return false;
      }
      if (!/^\S+@\S+\.\S+$/.test(userForm.email)) {
          toast({ title: "Error", description: "Please enter a valid email address.", variant: "destructive" });
          return false;
      }
      return true;
  };

  const handleSubmit = () => {
      if (!validateForm()) return;
      
      if (editingUser) {
        // Edit user logic
        setUsers(users.map(u => u.id === editingUser.id ? { ...u, ...userForm } : u));
        toast({ title: "Success", description: "User updated successfully." });
      } else {
        // Add new user logic
        const newUser: User = {
            id: `USR-${String(users.length + 1).padStart(3, '0')}`,
            ...userForm,
            status: 'active'
        };
        setUsers([...users, newUser]);
        toast({ title: "Success", description: "User added successfully." });
      }
      closeDialog();
  };
  
  const handleDeleteUser = (userId: string) => {
      setUsers(users.filter(u => u.id !== userId));
      toast({ title: "Success", description: "User deleted successfully."});
  };
  
  const toggleUserStatus = (userId: string) => {
      setUsers(users.map(u => 
        u.id === userId ? { ...u, status: u.status === 'active' ? 'suspended' : 'active' } : u
      ));
      toast({ title: "Success", description: "User status updated."});
  };

  return (
    <>
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
          <p className="text-muted-foreground">Manage all system users and their roles.</p>
        </div>
        <Button onClick={() => openDialog()}>
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
                        <DropdownMenuItem onClick={() => openDialog(user)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit User
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => toggleUserStatus(user.id)}>
                            {user.status === 'active' 
                                ? <><UserX className="mr-2 h-4 w-4" /> Suspend User</> 
                                : <><UserCheck className="mr-2 h-4 w-4" /> Activate User</>
                            }
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-2 py-1.5 h-auto text-sm font-normal relative flex cursor-default select-none items-center rounded-sm">
                                    <Trash2 className="mr-2 h-4 w-4" /> Delete User
                                </Button>
                            </AlertDialogTrigger>
                            <AlertDialogContent>
                                <AlertDialogHeader>
                                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                                <AlertDialogDescription>
                                    This action cannot be undone. This will permanently delete the user account.
                                </AlertDialogDescription>
                                </AlertDialogHeader>
                                <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction onClick={() => handleDeleteUser(user.id)}>Continue</AlertDialogAction>
                                </AlertDialogFooter>
                            </AlertDialogContent>
                        </AlertDialog>
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
    
    {/* Add/Edit User Dialog */}
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[425px]" onInteractOutside={(e) => e.preventDefault()}>
            <DialogHeader>
                <DialogTitle>{editingUser ? 'Edit User' : 'Add New User'}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="name" className="text-right">Name</Label>
                    <Input id="name" value={userForm.name} onChange={handleFormChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="email" className="text-right">Email</Label>
                    <Input id="email" type="email" value={userForm.email} onChange={handleFormChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="phone" className="text-right">Phone</Label>
                    <Input id="phone" type="tel" value={userForm.phone} onChange={handleFormChange} className="col-span-3" />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                    <Label htmlFor="role" className="text-right">Role</Label>
                     <Select onValueChange={handleRoleChange} value={userForm.role}>
                        <SelectTrigger className="col-span-3">
                            <SelectValue placeholder="Select a role" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="Admin">Admin</SelectItem>
                            <SelectItem value="Customer">Customer</SelectItem>
                            <SelectItem value="Delivery">Delivery</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <DialogFooter>
                <DialogClose asChild>
                    <Button type="button" variant="outline" onClick={closeDialog}>Cancel</Button>
                </DialogClose>
                <Button type="submit" onClick={handleSubmit}>{editingUser ? 'Save Changes' : 'Create User'}</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>
    </>
  )
}
