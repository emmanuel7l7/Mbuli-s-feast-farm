
'use client';

import { useCart } from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Trash2, ShoppingCart } from 'lucide-react';
// import Image from 'next/image';
import Link from 'next/link';

export default function CartPage() {
  const { cartItems, cartTotal, updateItemQuantity, removeItem, cartCount } = useCart();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary flex items-center gap-4">
          <ShoppingCart className="h-10 w-10" /> Your Shopping Cart
        </h1>
      </div>
      {cartCount === 0 ? (
        <div className="text-center py-16 border-dashed border-2 rounded-lg">
          <h2 className="text-2xl font-semibold text-muted-foreground">Your cart is empty.</h2>
          <Button asChild className="mt-6">
            <Link href="/products">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map(item => (
              <Card key={item.id} className="flex items-center p-4">
                <div className="relative w-24 h-24 rounded-md overflow-hidden">
                  {/* Image removed */}
                </div>
                <div className="flex-grow ml-4">
                  <h3 className="font-bold">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.price.toLocaleString()} TZS</p>
                </div>
                <div className="flex items-center gap-4">
                  <Input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                    className="w-20 text-center"
                  />
                  <Button variant="ghost" size="icon" onClick={() => removeItem(item.id)}>
                    <Trash2 className="h-5 w-5 text-destructive" />
                    <span className="sr-only">Remove item</span>
                  </Button>
                </div>
              </Card>
            ))}
          </div>

          <Card className="lg:sticky lg:top-24">
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold">{cartTotal.toLocaleString()} TZS</span>
              </div>
              <Separator />
              <div className="flex justify-between font-bold text-lg">
                <span>Total</span>
                <span>{cartTotal.toLocaleString()} TZS</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Delivery fees will be calculated at checkout.
              </p>
            </CardContent>
            <CardFooter>
              <Button asChild size="lg" className="w-full">
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>
            </CardFooter>
          </Card>
        </div>
      )}
    </div>
  );
}
