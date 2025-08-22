
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Package, Navigation, Phone } from "lucide-react";

const dummyOrder = {
    id: "ORD-015",
    customer: "Sam Doe",
    pickupAddress: "Mbuli's Feast Farm, Mbezi Beach, Dar es Salaam",
    deliveryAddress: "123 Main Street, Mikocheni, Dar es Salaam",
    customerPhone: "+255 712 345 678",
    items: [
        { name: "Whole Chicken", quantity: 2 },
        { name: "Chicken Thighs (1kg)", quantity: 1 },
    ]
}

export default function DeliveryDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        // In a real app, you'd have a proper auth check.
        // For now, we'll use localStorage to simulate a session.
        const session = localStorage.getItem('delivery_auth');
        if (session !== 'true') {
            router.push('/delivery/login');
        } else {
            setIsAuthenticated(true);
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('delivery_auth');
        router.push('/delivery/login');
    };
    
    if (!isAuthenticated) {
        // Render nothing or a loading spinner while checking auth
        return null;
    }

    const mapSrc = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(dummyOrder.pickupAddress)}&destination=${encodeURIComponent(dummyOrder.deliveryAddress)}`;


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
                        <CardDescription>Order ID: {dummyOrder.id}</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {/* Pickup Location */}
                        <div>
                            <h3 className="font-semibold mb-2">Pickup Location</h3>
                            <div className="flex items-start gap-4 p-4 rounded-md border">
                                <MapPin className="h-8 w-8 text-red-500 mt-1" />
                                <div>
                                    <p className="font-bold">Mbuli's Feast Farm</p>
                                    <p className="text-muted-foreground">{dummyOrder.pickupAddress}</p>
                                </div>
                                <Button asChild size="sm" className="ml-auto">
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dummyOrder.pickupAddress)}`} target="_blank" rel="noopener noreferrer">
                                        <Navigation className="mr-2 h-4 w-4"/>
                                        Navigate
                                    </a>
                                </Button>
                            </div>
                        </div>

                        {/* Delivery Location */}
                        <div>
                            <h3 className="font-semibold mb-2">Delivery Location</h3>
                            <div className="flex items-start gap-4 p-4 rounded-md border">
                                <MapPin className="h-8 w-8 text-green-500 mt-1" />
                                <div>
                                    <p className="font-bold">{dummyOrder.customer}</p>
                                    <p className="text-muted-foreground">{dummyOrder.deliveryAddress}</p>
                                </div>
                                 <Button asChild size="sm" className="ml-auto">
                                    <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(dummyOrder.deliveryAddress)}`} target="_blank" rel="noopener noreferrer">
                                        <Navigation className="mr-2 h-4 w-4"/>
                                        Navigate
                                    </a>
                                </Button>
                            </div>
                        </div>
                        
                         {/* Customer Contact */}
                        <div>
                            <h3 className="font-semibold mb-2">Customer Contact</h3>
                            <div className="flex items-center gap-4 p-4 rounded-md border">
                                 <Phone className="h-5 w-5 text-primary" />
                                <p className="text-muted-foreground">{dummyOrder.customerPhone}</p>
                                <Button asChild variant="outline" size="sm" className="ml-auto">
                                    <a href={`tel:${dummyOrder.customerPhone}`}>Call Customer</a>
                                </Button>
                            </div>
                        </div>


                        {/* Order Details */}
                        <div>
                            <h3 className="font-semibold mb-2">Order Items</h3>
                             <div className="p-4 rounded-md border space-y-2">
                                {dummyOrder.items.map(item => (
                                    <div key={item.name} className="flex justify-between">
                                        <span>{item.name}</span>
                                        <span className="font-medium">x {item.quantity}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Map View */}
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
