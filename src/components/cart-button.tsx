
'use client';

import { ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';
import { useCart } from '@/hooks/use-cart';

export function CartButton() {
  const { cartCount } = useCart();

  return (
    <Button asChild variant="ghost" size="icon">
      <Link href="/cart">
        <div className="relative">
          <ShoppingCart className="h-5 w-5" />
          {cartCount > 0 && (
            <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
              {cartCount}
            </span>
          )}
        </div>
        <span className="sr-only">View Cart</span>
      </Link>
    </Button>
  );
}
