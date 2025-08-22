
'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState, useMemo, useCallback } from 'react';
import { calculateDeliveryFee } from '@/ai/flows/calculate-delivery-fee';
import { Loader2 } from 'lucide-react';
import { debounce } from 'lodash';

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFee, setDeliveryFee] = useState<number | null>(null);
  const [isCalculatingFee, setIsCalculatingFee] = useState(false);
  const [mapSrc, setMapSrc] = useState('');
  
  const finalTotal = useMemo(() => {
      return cartTotal + (deliveryFee || 0);
  }, [cartTotal, deliveryFee]);
  
  const farmAddress = "Mbuli's Feast Farm, Mbezi Beach, Dar es Salaam";

  const debouncedFeeCalculation = useCallback(
    debounce(async (address: string) => {
      if (address.trim().length < 10) { // Don't calculate for very short strings
        setDeliveryFee(null);
        setMapSrc('');
        setIsCalculatingFee(false);
        return;
      }
      setIsCalculatingFee(true);
      try {
        const fullAddress = `${address}, Dar es Salaam, Tanzania`;
        const result = await calculateDeliveryFee({ destinationAddress: fullAddress });
        setDeliveryFee(result.fee);
        
        // Update map embed URL
        const mapUrl = `https://www.google.com/maps/embed/v1/directions?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&origin=${encodeURIComponent(farmAddress)}&destination=${encodeURIComponent(fullAddress)}`;
        setMapSrc(mapUrl);

      } catch (error) {
        console.error("Error calculating delivery fee:", error);
        toast({
            title: "Could not calculate fee",
            description: "Please check the address or try again.",
            variant: "destructive"
        })
        setDeliveryFee(null);
      } finally {
        setIsCalculatingFee(false);
      }
    }, 1000), // 1 second debounce delay
    [toast]
  );

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const address = e.target.value;
    setDeliveryAddress(address);
    setIsCalculatingFee(true); // Show loader immediately
    debouncedFeeCalculation(address);
  };


  const handlePlaceOrder = () => {
    if (!deliveryAddress || deliveryFee === null) {
      toast({
        title: "Error",
        description: "Please enter your name, phone and a valid delivery address.",
        variant: "destructive",
      });
      return;
    }

    const orderDetails = {
      id: `ORD-${Math.floor(Math.random() * 1000).toString().padStart(3, '0')}`,
      customer: customerName || 'N/A',
      phone: customerPhone,
      deliveryAddress: deliveryAddress,
      items: cartItems.map(item => ({ name: item.name, quantity: item.quantity })),
      subtotal: cartTotal,
      deliveryFee: deliveryFee,
      total: finalTotal,
      date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
      status: 'Processing',
    };

    // Save order to localStorage to be picked up by admin and delivery pages
    localStorage.setItem('latest_order', JSON.stringify(orderDetails));

    // Also, prepend to a list of recent orders for the admin analytics page
    const recentOrders = JSON.parse(localStorage.getItem('recent_orders') || '[]');
    const updatedRecentOrders = [orderDetails, ...recentOrders].slice(0, 5); // Keep last 5
    localStorage.setItem('recent_orders', JSON.stringify(updatedRecentOrders));


    toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We will contact you shortly to confirm."
    });
    
    // Clear the cart and redirect to homepage after a delay
    clearCart();
    setTimeout(() => {
        router.push('/');
    }, 2000);
  };
  
  if (cartCount === 0 && !router) { // Wait for router to be available to avoid flash of content
     return (
        <div className="container mx-auto px-4 py-12 text-center">
            <h1 className="text-4xl font-headline font-bold text-primary mb-4">Checkout</h1>
            <p className="text-xl text-muted-foreground mb-8">Your cart is empty.</p>
            <Button asChild>
                <Link href="/products">Continue Shopping</Link>
            </Button>
        </div>
     )
  }

  return (
    <div className="container mx-auto px-4 py-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary text-center mb-12">
          Checkout
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name</Label>
                            <Input id="name" placeholder="John Doe" value={customerName} onChange={(e) => setCustomerName(e.target.value)} />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number</Label>
                            <Input id="phone" type="tel" placeholder="+255 712 345 678" value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)}/>
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Delivery Address</Label>
                            <Input 
                                id="address" 
                                placeholder="e.g., 123 Mbezi Beach, Dar es Salaam" 
                                value={deliveryAddress}
                                onChange={handleAddressChange}
                            />
                             <p className="text-xs text-muted-foreground">
                                Please be as specific as possible.
                            </p>
                        </div>
                    </CardContent>
                </Card>
                {mapSrc && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Delivery Map</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="relative w-full h-80 rounded-md overflow-hidden border">
                          <iframe
                              width="100%"
                              height="100%"
                              style={{ border: 0 }}
                              loading="lazy"
                              allowFullScreen
                              src={mapSrc}>
                          </iframe>
                      </div>
                    </CardContent>
                  </Card>
                )}
            </div>

             <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                        {cartItems.map(item => (
                            <div key={item.id} className="flex justify-between items-center">
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
                                <p className="font-medium">{(item.price * item.quantity).toLocaleString()} TZS</p>
                            </div>
                        ))}
                    </div>
                    <Separator />
                    <div className="flex justify-between">
                        <p>Subtotal</p>
                        <p className="font-medium">{cartTotal.toLocaleString()} TZS</p>
                    </div>
                     <div className="flex justify-between items-center">
                        <p>Delivery Fee</p>
                        {isCalculatingFee ? (
                           <Loader2 className="h-5 w-5 animate-spin" />
                        ) : (
                           <p className="font-medium">
                            {deliveryFee !== null ? `${deliveryFee.toLocaleString()} TZS` : 'Enter address'}
                           </p>
                        )}
                    </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>{finalTotal.toLocaleString()} TZS</p>
                    </div>
                    <Button size="lg" className="w-full mt-4" onClick={handlePlaceOrder} disabled={!deliveryAddress || deliveryFee === null || isCalculatingFee || !customerName || !customerPhone}>
                        Place Order & Pay on Delivery
                    </Button>
                     <p className="text-xs text-muted-foreground text-center">
                        You will pay with cash or mobile money upon delivery.
                    </p>
                </CardContent>
            </Card>
        </div>
    </div>
  );
}
