
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Package, Navigation, Phone, Loader2 } from "lucide-react";

type OrderItem = {
    name: string;
    quantity: number;
};

type Order = {
    id: string;
    customer: string;
    pickupAddress: string;
    deliveryAddress: string;
    customerPhone: string;
    items: OrderItem[];
};

const initialOrder: Order = {
    id: "ORD-015",
    customer: "Sam Doe",
    pickupAddress: "Mbuli's Feast Farm, Mbezi Beach, Dar es Salaam",
    deliveryAddress: "123 Main Street, Mikocheni, Dar es Salaam",
    customerPhone: "+255 712 345 678",
    items: [
        { name: "Whole Chicken", quantity: 2 },
        { name: "Chicken Thighs (1kg)", quantity: 1 },
    ]
};

export default function DeliveryDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [order, setOrder] = useState<Order | null>(null);
    const [mapSrc, setMapSrc] = useState('');

    useEffect(() => {
        const session = localStorage.getItem('delivery_auth');
        if (session !== 'true') {
            router.push('/delivery/login');
        } else {
            setIsAuthenticated(true);
            
            const latestOrderData = localStorage.getItem('latest_order');
            let activeOrder: Order;
            if (latestOrderData) {
                try {
                    const latestOrder = JSON.parse(latestOrderData);
                    activeOrder = {
                        id: latestOrder.id,
                        customer: latestOrder.customer,
                        pickupAddress: "Mbuli's Feast Farm, Mbezi Beach, Dar es Salaam",
                        deliveryAddress: latestOrder.deliveryAddress,
                        customerPhone: latestOrder.phone,
                        items: latestOrder.items
                    };
                } catch(e) {
                    console.error("Failed to parse latest order", e);
                    activeOrder = initialOrder;
                }
            } else {
                activeOrder = initialOrder; // Fallback to initial dummy data
            }
            setOrder(activeOrder);
        }
    }, [router]);

    useEffect(() => {
        if (order) {
            const newMapSrc = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(order.pickupAddress)}&destination=${encodeURIComponent(order.deliveryAddress)}`;
            setMapSrc(newMapSrc);
        }
    }, [order]);

    const handleLogout = () => {
        localStorage.removeItem('delivery_auth');
        localStorage.removeItem('latest_order'); // Also clear the order on logout
        router.push('/delivery/login');
    };
    
    if (!isAuthenticated || !order) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <Loader2 className="h-8 w-8 animate-spin" />
            </div>
        );
    }

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-primary text-primary-foreground shadow-md">
                <div className="container mx-auto px-4 py-4 flex justify-between items-center">
                    <h1 className="text-xl font-bold">Delivery Dashboard</h1>
                    <div className="flex items-center gap-4">
                        <Button variant="ghost" size="icon">
                            <Bell className="h-6 w-6" />
                            <span className="sr-only">Notifications</span>
                        </Button>
                         <Button variant="destructive" onClick={handleLogout}>Logout</Button>
                    </div>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-8">
                <Card className="mb-8">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                           <Package className="h-6 w-6" /> Current Delivery Task
                        </CardTitle>
                        <CardDescription>Order ID: {order.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div>
                            <h3 className="font-semibold mb-2">Pickup Location</h3>
                            <div className="flex items-start gap-4 p-4 rounded-md border">
                                <MapPin className="h-8 w-8 text-red-500 mt-1" />
                                <div>
                                    <p className="font-bold">Mbuli's Feast Farm</p>
                                    <p className="text-muted-foreground">{order.pickupAddress}</p>
                                </div>
                                <Button asChild size="sm" className="ml-auto">
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.pickupAddress)}`} target="_blank" rel="noopener noreferrer">
                                        <Navigation className="mr-2 h-4 w-4"/>
                                        Navigate
                                    </a>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Delivery Location</h3>
                            <div className="flex items-start gap-4 p-4 rounded-md border">
                                <MapPin className="h-8 w-8 text-green-500 mt-1" />
                                <div>
                                    <p className="font-bold">{order.customer}</p>
                                    <p className="text-muted-foreground">{order.deliveryAddress}</p>
                                </div>
                                 <Button asChild size="sm" className="ml-auto">
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(order.deliveryAddress)}`} target="_blank" rel="noopener noreferrer">
                                        <Navigation className="mr-2 h-4 w-4"/>
                                        Navigate
                                    </a>
                                </Button>
                            </div>
                        </div>
                        
                        <div>
                            <h3 className="font-semibold mb-2">Customer Contact</h3>
                            <div className="flex items-center gap-4 p-4 rounded-md border">
                                 <Phone className="h-5 w-5 text-primary" />
                                <p className="text-muted-foreground">{order.customerPhone}</p>
                                <Button asChild variant="outline" size="sm" className="ml-auto">
                                    <a href={`tel:${order.customerPhone}`}>Call Customer</a>
                                </Button>
                            </div>
                        </div>

                        <div>
                            <h3 className="font-semibold mb-2">Order Items</h3>
                             <div className="p-4 rounded-md border space-y-2">
                                {order.items.map(item => (
                                    <div key={item.name} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span className="font-medium">x {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        <div>
                             <h3 className="font-semibold mb-2">Map Overview</h3>
                            <div className="relative w-full h-96 rounded-md overflow-hidden border">
                                <iframe
                                    width="100%"
                                    height="100%"
                                    style={{ border: 0 }}
                                    loading="lazy"
                                    allowFullScreen
                                    src={mapSrc}>
                                </iframe>
                            </div>
                        </div>

                        <div className="flex gap-4 pt-4">
                            <Button className="w-full" size="lg">Confirm Pickup</Button>
                            <Button className="w-full" size="lg" variant="secondary">Mark as Delivered</Button>
                        </div>

                    </CardContent>
                </Card>
            </main>
        </div>
    )
}
