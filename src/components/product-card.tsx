
'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/lib/types";
import { useCart } from "@/hooks/use-cart";
import { useToast } from "@/hooks/use-toast";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { addItem } = useCart();
    const { toast } = useToast();

    const handleAddToCart = () => {
        addItem(product);
        toast({
            title: "Added to Cart",
            description: `${product.name} has been added to your cart.`,
        });
    };

    return (
        <Card className="flex flex-col overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 ease-in-out shadow-lg hover:shadow-xl">
            <CardHeader className="p-0">
                <div className="relative w-full h-56">
                    <Image
                        src={product.image}
                        alt={product.name}
                        layout="fill"
                        objectFit="cover"
                        data-ai-hint={product.aiHint}
                    />
                     {product.stockStatus === 'low-stock' && (
                        <div className="absolute top-2 right-2 bg-yellow-500 text-white text-xs font-bold px-2 py-1 rounded">LOW STOCK</div>
                    )}
                </div>
            </CardHeader>
            <CardContent className="flex-grow p-6">
                <CardTitle className="font-headline text-xl mb-2">{product.name}</CardTitle>
                <CardDescription>{product.description}</CardDescription>
            </CardContent>
            <CardFooter className="flex justify-between items-center p-6 pt-0">
                <p className="text-2xl font-bold text-primary">
                    {product.price.toLocaleString('en-US')} TZS
                </p>
                <Button onClick={handleAddToCart} disabled={product.stockStatus === 'out-of-stock'}>
                    {product.stockStatus === 'out-of-stock' ? 'Out of Stock' : 'Add to Cart'}
                </Button>
            </CardFooter>
        </Card>
    );
}
