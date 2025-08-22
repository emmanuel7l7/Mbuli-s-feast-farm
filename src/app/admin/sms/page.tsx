
'use client'

import { useState, useMemo } from "react";
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useToast } from "@/hooks/use-toast";

type User = {
  id: string;
  name: string;
  phone: string;
  type: "Web" | "USSD";
};

const initialUsers: User[] = [
  { id: "USR-001", name: "Alice M", phone: "+255 784 123 456", type: "Web" },
  { id: "USR-002", name: "Bob K", phone: "+255 655 789 012", type: "USSD" },
  { id: "USR-003", name: "Charlie L", phone: "+255 712 345 678", type: "Web" },
  { id: "USR-004", name: "David P", phone: "+255 718 987 654", type: "USSD" },
  { id: "USR-005", name: "Eve S", phone: "+255 622 111 333", type: "Web" },
];

export default function BulkSmsPage() {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUsers, setSelectedUsers] = useState<Set<string>>(new Set());
  const [recipientGroup, setRecipientGroup] = useState("all");
  const [message, setMessage] = useState("");
  const { toast } = useToast();

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedUsers(new Set(filteredUsers.map(user => user.id)));
    } else {
      setSelectedUsers(new Set());
    }
  };

  const handleSelectUser = (userId: string, checked: boolean) => {
    const newSelection = new Set(selectedUsers);
    if (checked) {
      newSelection.add(userId);
    } else {
      newSelection.delete(userId);
    }
    setSelectedUsers(newSelection);
  };

  const filteredUsers = useMemo(() => {
    if (recipientGroup === "all" || recipientGroup === 'selected') return users;
    return users.filter(user => user.type.toLowerCase() === recipientGroup);
  }, [recipientGroup, users]);
  
  const isAllFilteredSelected = filteredUsers.length > 0 && selectedUsers.size === filteredUsers.length;


  const handleSendMessage = () => {
    if (!message.trim()) {
      toast({ title: "Error", description: "Message cannot be empty.", variant: "destructive" });
      return;
    }

    let recipientCount = 0;
    if (recipientGroup === 'selected') {
      recipientCount = selectedUsers.size;
    } else if (recipientGroup === 'all') {
      recipientCount = users.length;
    } else {
      recipientCount = users.filter(u => u.type.toLowerCase() === recipientGroup).length;
    }


    if (recipientCount === 0) {
      toast({ title: "Error", description: "Please select at least one recipient.", variant: "destructive" });
      return;
    }

    toast({
      title: "Message Sent!",
      description: `Successfully sent SMS to ${recipientCount} user(s).`,
    });
    setMessage("");
  };

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Bulk SMS Messaging</h2>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Compose Message</CardTitle>
            <CardDescription>Send a message to your customers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="recipient">Recipient Group</Label>
              <Select value={recipientGroup} onValueChange={setRecipientGroup}>
                <SelectTrigger id="recipient">
                  <SelectValue placeholder="Select a group" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Customers</SelectItem>
                  <SelectItem value="web">Web App Users</SelectItem>
                  <SelectItem value="ussd">USSD Users</SelectItem>
                  <SelectItem value="selected">Selected Customers</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                placeholder="Type your message here..."
                className="min-h-[150px]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <p className="text-sm text-muted-foreground">160 characters max per SMS.</p>
            </div>
            <Button onClick={handleSendMessage}>Send Message</Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Select Recipients</CardTitle>
            <CardDescription>Choose specific customers to message. Active when "Selected Customers" is chosen.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border rounded-md">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">
                      <Checkbox
                        checked={isAllFilteredSelected}
                        onCheckedChange={(checked) => handleSelectAll(Boolean(checked))}
                        disabled={recipientGroup !== 'selected'}
                      />
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Phone</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredUsers.map((user) => (
                    <TableRow key={user.id} data-state={selectedUsers.has(user.id) && "selected"}>
                      <TableCell>
                         <Checkbox
                           checked={selectedUsers.has(user.id)}
                           onCheckedChange={(checked) => handleSelectUser(user.id, Boolean(checked))}
                           disabled={recipientGroup !== 'selected'}
                         />
                      </TableCell>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
