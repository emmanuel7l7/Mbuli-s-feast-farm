
'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import { useToast } from "@/hooks/use-toast";
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useMemo } from 'react';


export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();
  
  // Placeholder for delivery fee. In a real app, this would be calculated.
  const deliveryFee = useMemo(() => {
    return cartTotal > 0 ? 5000 : 0;
  }, [cartTotal]);
  
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = () => {
    // In a real application, this would trigger payment processing
    // and send the order to a backend.
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
  
  if (cartCount === 0) {
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
            <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Delivery Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid gap-2">
                        <Label htmlFor="name">Full Name</Label>
                        <Input id="name" placeholder="John Doe" />
                    </div>
                     <div className="grid gap-2">
                        <Label htmlFor="phone">Phone Number</Label>
                        <Input id="phone" type="tel" placeholder="+255 712 345 678" />
                    </div>
                    <div className="grid gap-2">
                        <Label htmlFor="address">Delivery Address</Label>
                        <Input id="address" placeholder="123 Mbezi Beach, Dar es Salaam" />
                    </div>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle className="text-2xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="space-y-2 max-h-64 overflow-y-auto pr-2">
                    {cartItems.map(item => (
                        <div key={item.id} className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-md overflow-hidden">
                                     <Image src={item.image} alt={item.name} layout="fill" objectFit="cover" />
                                </div>
                                <div>
                                    <p className="font-semibold">{item.name}</p>
                                    <p className="text-sm text-muted-foreground">Qty: {item.quantity}</p>
                                </div>
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
                     <div className="flex justify-between">
                        <p>Delivery Fee</p>
                        <p className="font-medium">{deliveryFee.toLocaleString()} TZS</p>
                    </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>{finalTotal.toLocaleString()} TZS</p>
                    </div>
                    <Button size="lg" className="w-full mt-4" onClick={handlePlaceOrder}>
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
