

'use client';

import React, { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign } from 'lucide-react';



// Memoized Table for recent orders
// (Removed duplicate MemoTable declaration)

// Memoized BarChart for products
// (Removed duplicate MemoBarChart declaration)

const salesData = [
  { name: 'Jan', sales: 4000 },
  { name: 'Feb', sales: 3000 },
  { name: 'Mar', sales: 5000 },
  { name: 'Apr', sales: 4500 },
  { name: 'May', sales: 6000 },
  { name: 'Jun', sales: 5500 },
];

const initialRecentOrders = [
  { id: 'ORD-012', customer: 'John Doe', date: '2023-10-26', amount: 45000, status: 'Completed' },
  { id: 'ORD-011', customer: 'Jane Smith', date: '2023-10-25', amount: 36000, status: 'Completed' },
  { id: 'ORD-010', customer: 'Sam Wilson', date: '2023-10-25', amount: 20000, status: 'Processing' },
  { id: 'ORD-009', customer: 'Alice Brown', date: '2023-10-24', amount: 120000, status: 'Completed' },
];

const topProducts = [
  { name: 'Whole Chicken', sales: 1200 },
  { name: 'Chicken Breast (1kg)', sales: 950 },
  { name: 'Chicken Thighs (1kg)', sales: 800 },
];

const leastProducts = [
    { name: 'Chicken Wings (1kg)', sales: 150 },
    { name: 'Ground Chicken (500g)', sales: 200 },
    { name: 'Chicken Drumsticks (1kg)', sales: 310 },
];

type Order = {
  id: string;
  customer: string;
  date: string;
  amount: number;
  status: string;
}

// Memoized Card for performance
const MemoCard = React.memo(({ title, icon, value, description }: { title: string; icon: React.ReactNode; value: string; description: string }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
      <CardTitle className="text-sm font-medium">{title}</CardTitle>
      {icon}
    </CardHeader>
    <CardContent>
      <div className="text-xl font-bold">{value}</div>
      <p className="text-xs text-muted-foreground">{description}</p>
    </CardContent>
  </Card>
));

// Memoized Table for recent orders
const MemoTable = React.memo(({ recentOrders }: { recentOrders: Order[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Order ID</TableHead>
        <TableHead>Customer</TableHead>
        <TableHead className="text-right">Amount (TZS)</TableHead>
        <TableHead>Status</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {recentOrders.map((order) => (
        <TableRow key={order.id}>
          <TableCell className="font-medium">{order.id}</TableCell>
          <TableCell>{order.customer}</TableCell>
          <TableCell className="text-right">{order.amount.toLocaleString()}</TableCell>
          <TableCell>
            <Badge variant={order.status === "Completed" ? "default" : "secondary"}>{order.status}</Badge>
          </TableCell>
        </TableRow>
      ))}
    </TableBody>
  </Table>
));

// Memoized BarChart for products
const MemoBarChart = React.memo(({ title, description, data, barColor }: { title: string; description: string; data: { name: string; sales: number }[]; barColor: string }) => (
  <Card>
    <CardHeader>
      <CardTitle>{title}</CardTitle>
      <CardDescription>{description}</CardDescription>
    </CardHeader>
    <CardContent>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} layout="vertical">
          <XAxis type="number" hide />
          <YAxis type="category" dataKey="name" width={150} stroke="hsl(var(--foreground))" />
          <Tooltip cursor={{ fill: 'hsl(var(--muted))' }} />
          <Bar dataKey="sales" fill={barColor} radius={[0, 4, 4, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </CardContent>
  </Card>
));

export default function AnalyticsPage() {
  const [recentOrders, setRecentOrders] = useState<Order[]>(initialRecentOrders);

  useEffect(() => {
    const storedOrdersData = localStorage.getItem('recent_orders');
    if (storedOrdersData) {
      try {
        const storedOrders = JSON.parse(storedOrdersData);
        
        const formattedStoredOrders: Order[] = storedOrders.map((o: any) => ({
          id: o.id,
          customer: o.customer,
          date: o.date,
          amount: o.total,
          status: o.status
        }));

        const combined = [...formattedStoredOrders, ...initialRecentOrders];
        const uniqueOrders = Array.from(new Set(combined.map(o => o.id)))
                                  .map(id => combined.find(o => o.id === id)!);

        setRecentOrders(uniqueOrders.slice(0, 5));
      } catch (error) {
          console.error("Failed to parse recent orders from localStorage", error);
      }
    }
  }, []);

  return (
    <>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Sales Analytics</h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <MemoCard title="Total Revenue" icon={<DollarSign className="h-4 w-4 text-muted-foreground" />} value="TZS 45,231,890" description="+20.1% from last month" />
          <MemoCard title="Top Selling Product" icon={<TrendingUp className="h-4 w-4 text-muted-foreground" />} value="Whole Chicken" description="1,200 units sold this month" />
          <MemoCard title="Least Selling Product" icon={<TrendingDown className="h-4 w-4 text-muted-foreground" />} value="Chicken Wings (1kg)" description="150 units sold this month" />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <CardTitle>Sales Trend</CardTitle>
              <CardDescription>Monthly sales performance.</CardDescription>
            </CardHeader>
            <CardContent className="pl-2">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={salesData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="sales" stroke="hsl(var(--primary))" activeDot={{ r: 8 }} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card className="col-span-4 lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Orders</CardTitle>
              <CardDescription>
                Here are the latest transactions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <MemoTable recentOrders={recentOrders} />
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          <MemoBarChart title="Top Selling Products" description="Your best-performing products this month." data={topProducts} barColor="hsl(var(--primary))" />
          <MemoBarChart title="Least Selling Products" description="Products that are underperforming this month." data={leastProducts} barColor="hsl(var(--destructive))" />
        </div>
      </div>
    </>
  );
}
