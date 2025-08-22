
'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { DollarSign, Users, Package, LineChart, MessageSquare, List, UserCog, Clock, MapPin, Phone } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

type LatestOrder = {
  id: string;
  customer: string;
  phone: string;
  deliveryAddress: string;
  total: number;
  deliveryFee: number;
  date: string;
}

export default function AdminDashboard() {
  const [latestOrder, setLatestOrder] = useState<LatestOrder | null>(null);

  useEffect(() => {
    const storedOrder = localStorage.getItem('latest_order');
    if (storedOrder) {
      try {
        setLatestOrder(JSON.parse(storedOrder));
      } catch (e) {
        console.error("Failed to parse latest order from localStorage", e);
      }
    }
  }, []);

  return (
    <div className="flex-1 space-y-4 p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">TZS 45,231,890</div>
            <p className="text-xs text-muted-foreground">
              +20.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <Package className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+2350</div>
            <p className="text-xs text-muted-foreground">
              +180.1% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Customers
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">+12,234</div>
            <p className="text-xs text-muted-foreground">
              +19% from last month
            </p>
          </CardContent>
        </Card>
        <Card>
           <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Analytics</CardTitle>
            <LineChart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View sales reports and trends.
            </p>
            <Button asChild>
              <Link href="/admin/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      {latestOrder && (
          <Card className="col-span-1 md:col-span-2 lg:col-span-4">
              <CardHeader>
                  <CardTitle>Latest Customer Order</CardTitle>
                  <CardDescription>
                      Order ID: {latestOrder.id} - Placed on: {new Date(latestOrder.date).toLocaleDateString()}
                  </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                  <div className="flex items-center gap-4">
                      <Users className="h-5 w-5 text-muted-foreground" />
                      <span className="font-semibold">{latestOrder.customer}</span>
                  </div>
                   <div className="flex items-center gap-4">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <span>{latestOrder.phone}</span>
                  </div>
                  <div className="flex items-center gap-4">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span>{latestOrder.deliveryAddress}</span>
                  </div>
                  <Separator />
                  <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                          <p className="text-muted-foreground">Delivery Fee</p>
                          <p className="font-semibold">{latestOrder.deliveryFee.toLocaleString()} TZS</p>
                      </div>
                       <div>
                          <p className="text-muted-foreground">Total Collected</p>
                          <p className="font-semibold">{latestOrder.total.toLocaleString()} TZS</p>
                      </div>
                  </div>
              </CardContent>
          </Card>
      )}


      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <List className="h-4 w-4" /> Stock Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Update stock levels and product details.
            </p>
            <Button asChild>
              <Link href="/admin/stock">Manage Stock</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <MessageSquare className="h-4 w-4" /> Bulk SMS
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Contact all or selected users.
            </p>
            <Button asChild>
              <Link href="/admin/sms">Send SMS</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Users className="h-4 w-4" /> USSD Users
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              View and manage USSD registrations.
            </p>
            <Button asChild>
              <Link href="/admin/ussd">Manage USSD Users</Link>
            </Button>
          </CardContent>
        </Card>
         <Card>
          <CardHeader>
            <CardTitle className="text-sm font-medium flex items-center gap-2">
                <UserCog className="h-4 w-4" /> User Management
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Manage all user accounts and roles.
            </p>
            <Button asChild>
              <Link href="/admin/users">Manage Users</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
