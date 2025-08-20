import Image from "next/image";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "./ui/button";
import type { Product } from "@/lib/types";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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
                <Button>Add to Cart</Button>
            </CardFooter>
        </Card>
    );
}
