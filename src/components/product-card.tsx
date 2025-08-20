
'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/lib/types";
import { useState } from "react";
import { AuthRedirectDialog } from "./auth-redirect-dialog";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const [showAuthDialog, setShowAuthDialog] = useState(false);
    // For now, we'll assume the user is not authenticated.
    // In a real app, this would come from an auth context.
    const isAuthenticated = false; 

    const handleAddToCart = () => {
        if (!isAuthenticated) {
            setShowAuthDialog(true);
        } else {
            // Logic to add item to cart would go here
            console.log("Added to cart:", product.name);
        }
    };

    return (
        <>
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
                    <Button onClick={handleAddToCart}>Add to Cart</Button>
                </CardFooter>
            </Card>
            <AuthRedirectDialog
                open={showAuthDialog}
                onOpenChange={setShowAuthDialog}
            />
        </>
    );
}
