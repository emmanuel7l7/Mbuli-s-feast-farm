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
import { useState } from 'react';
import { db } from '@/lib/db';

export default function CheckoutPage() {
  const { cartItems, cartTotal, cartCount, clearCart } = useCart();
  const { toast } = useToast();
  const router = useRouter();

  const [customerName, setCustomerName] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [deliveryFee] = useState(5000); // Fixed delivery fee for simplicity
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const finalTotal = cartTotal + deliveryFee;

  const handlePlaceOrder = async () => {
    if (!customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const orderItems = cartItems.map(item => ({
        productId: item.id!,
        productName: item.name,
        quantity: item.quantity,
        price: item.price
      }));

      await db.orders.add({
        customerName,
        customerPhone,
        deliveryAddress,
        items: orderItems,
        subtotal: cartTotal,
        deliveryFee,
        total: finalTotal,
        status: 'pending',
        createdAt: new Date()
      });

      await clearCart();

      toast({
        title: "Order Placed!",
        description: "Thank you for your purchase. We will contact you shortly to confirm."
      });
      
      setTimeout(() => {
        router.push('/');
      }, 2000);
    } catch (error) {
      console.error('Error placing order:', error);
      toast({
        title: "Error",
        description: "Failed to place order. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
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
            <div className="space-y-8">
                <Card>
                    <CardHeader>
                        <CardTitle className="text-2xl">Delivery Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Full Name *</Label>
                            <Input 
                              id="name" 
                              placeholder="John Doe" 
                              value={customerName} 
                              onChange={(e) => setCustomerName(e.target.value)} 
                              required
                            />
                        </div>
                         <div className="grid gap-2">
                            <Label htmlFor="phone">Phone Number *</Label>
                            <Input 
                              id="phone" 
                              type="tel" 
                              placeholder="+255 712 345 678" 
                              value={customerPhone} 
                              onChange={(e) => setCustomerPhone(e.target.value)}
                              required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="address">Delivery Address *</Label>
                            <Input 
                                id="address" 
                                placeholder="e.g., 123 Mbezi Beach, Dar es Salaam" 
                                value={deliveryAddress}
                                onChange={(e) => setDeliveryAddress(e.target.value)}
                                required
                            />
                             <p className="text-xs text-muted-foreground">
                                Please be as specific as possible.
                            </p>
                        </div>
                    </CardContent>
                </Card>
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
                        <p className="font-medium">{deliveryFee.toLocaleString()} TZS</p>
                    </div>
                    <Separator />
                     <div className="flex justify-between text-xl font-bold">
                        <p>Total</p>
                        <p>{finalTotal.toLocaleString()} TZS</p>
                    </div>
                    <Button 
                      size="lg" 
                      className="w-full mt-4" 
                      onClick={handlePlaceOrder} 
                      disabled={isSubmitting || !customerName.trim() || !customerPhone.trim() || !deliveryAddress.trim()}
                    >
                        {isSubmitting ? 'Placing Order...' : 'Place Order & Pay on Delivery'}
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