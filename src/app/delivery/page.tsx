
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Bell, MapPin, Package, Navigation, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";



type Delivery = {
    id: string;
    address: string;
    status: string;
    user: { email: string };
};

export default function DeliveryDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
export default function DeliveryDashboardPage() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [deliveries, setDeliveries] = useState<Delivery[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const session = localStorage.getItem('delivery_auth');
        if (session !== 'true') {
            router.push('/delivery/login');
        } else {
            setIsAuthenticated(true);
            fetch('/api/delivery')
                .then(res => res.json())
                .then(data => setDeliveries(data))
                .finally(() => setLoading(false));
        }
    }, [router]);

    const handleLogout = () => {
        localStorage.removeItem('delivery_auth');
        router.push('/delivery/login');
    };

    if (!isAuthenticated || loading) {
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
                <h2 className="text-2xl font-bold mb-6">All Delivery Tasks</h2>
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {deliveries.map((delivery) => (
                        <Card key={delivery.id} className="mb-8">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <Package className="h-6 w-6" /> Delivery Task
                                </CardTitle>
                                <CardDescription>Delivery ID: {delivery.id}</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div>
                                    <h3 className="font-semibold mb-2">Delivery Location</h3>
                                    <div className="flex items-start gap-4 p-4 rounded-md border">
                                        <MapPin className="h-8 w-8 text-green-500 mt-1" />
                                        <div>
                                            <p className="font-bold">{delivery.user?.email || 'Customer'}</p>
                                            <p className="text-muted-foreground">{delivery.address}</p>
                                        </div>
                                        <Button asChild size="sm" className="ml-auto">
                                            <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(delivery.address)}`} target="_blank" rel="noopener noreferrer">
                                                <Navigation className="mr-2 h-4 w-4" />
                                                Navigate
                                            </a>
                                        </Button>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="font-semibold mb-2">Status</h3>
                                    <Badge>{delivery.status}</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </main>
        </div>
    );
}

