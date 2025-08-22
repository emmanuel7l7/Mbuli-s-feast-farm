
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Utensils, Leaf, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import type { Product } from '@/lib/types';

const allProducts: Product[] = [
  {
    id: '1',
    name: 'Whole Chicken',
    description: 'Fresh, farm-raised whole chicken. Perfect for roasting.',
    price: 15000,
    image: 'https://placehold.co/600x400',
    aiHint: 'whole chicken',
    stockStatus: 'in-stock',
  },
  {
    id: '2',
    name: 'Chicken Thighs (1kg)',
    description: 'Juicy and tender chicken thighs, bone-in and skin-on.',
    price: 18000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken thighs',
    stockStatus: 'in-stock',
  },
  {
    id: '3',
    name: 'Chicken Wings (1kg)',
    description: 'Perfectly portioned wings, ready for your favorite sauce.',
    price: 12000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken wings',
    stockStatus: 'out-of-stock',
  },
];

// Filter out "out-of-stock" products before rendering
const featuredProducts = allProducts.filter(p => p.stockStatus !== 'out-of-stock');

export default function Home() {
  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://placehold.co/1600x900"
          alt="Mbuli's Feast Farm"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 brightness-50"
          data-ai-hint="chicken farm"
        />
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-headline font-bold drop-shadow-lg">
            Welcome to Mbuli&apos;s Feast Farm
          </h1>
          <p className="mt-4 text-lg md:text-2xl max-w-2xl mx-auto drop-shadow-md">
            Farm-fresh chicken, delivered with love from our family to yours.
          </p>
          <Button asChild size="lg" className="mt-8 font-bold text-lg">
            <Link href="/products">Explore Our Products</Link>
          </Button>
        </div>
      </section>

      <section id="about" className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative w-full h-80 md:h-96 rounded-lg overflow-hidden shadow-xl">
               <Image
                src="https://placehold.co/600x400"
                alt="Farm landscape"
                layout="fill"
                objectFit="cover"
                data-ai-hint="tanzania landscape"
              />
            </div>
            <div>
              <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">From Our Farm to Your Table</h2>
              <p className="mt-4 text-lg text-foreground/80">
                Mbuli&apos;s Feast Farm began with a simple mission: to provide our community in Tanzania with the highest quality, most delicious chicken possible. We believe in sustainable farming practices that respect both our animals and the beautiful land we call home.
              </p>
              <p className="mt-4 text-lg text-foreground/80">
                Founded by Mama Mbuli, our farm is a testament to her passion for quality and her love for traditional, wholesome food. Every chicken is raised with care, ensuring a product that is not only tasty but also healthy and natural.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-secondary/50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-primary">Why Choose Us?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center bg-card transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  <Award className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Unmatched Quality</CardTitle>
              </CardHeader>
              <CardContent>
                <p>Our chickens are raised in open spaces, fed a natural diet, and cared for with the highest standards.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-accent/10 rounded-full p-4 w-fit">
                   <Leaf className="h-10 w-10 text-accent" />
                </div>
                <CardTitle className="font-headline mt-4">Sustainably Farmed</CardTitle>
              </CardHeader>
              <CardContent>
                <p>We use eco-friendly practices to ensure a healthy planet for future generations.</p>
              </CardContent>
            </Card>
            <Card className="text-center bg-card transform hover:-translate-y-2 transition-transform duration-300">
              <CardHeader>
                <div className="mx-auto bg-primary/10 rounded-full p-4 w-fit">
                  <Utensils className="h-10 w-10 text-primary" />
                </div>
                <CardTitle className="font-headline mt-4">Deliciously Fresh</CardTitle>
              </CardHeader>
              <CardContent>
                <p>From our farm to your kitchen in the shortest time possible, guaranteeing peak freshness and flavor.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-headline font-bold text-center text-primary">Featured Products</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="text-center mt-12">
            <Button asChild size="lg" variant="outline">
              <Link href="/products">View All Products</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
