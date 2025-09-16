'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Utensils, Leaf, Award } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { ProductCard } from '@/components/product-card';
import { db, type Product } from '@/lib/db';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    try {
      const products = await db.products
        .where('stockStatus')
        .notEqual('out-of-stock')
        .limit(3)
        .toArray();
      setFeaturedProducts(products);
    } catch (error) {
      console.error('Error loading featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col">
      <section className="relative h-[60vh] md:h-[80vh] w-full flex items-center justify-center text-center text-white">
        <Image
          src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"
          alt="Mbuli's Feast Farm"
          fill
          className="absolute inset-0 z-0 brightness-50 object-cover"
          priority
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
                src="https://images.pexels.com/photos/1300972/pexels-photo-1300972.jpeg"
                alt="Farm landscape"
                fill
                className="object-cover"
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
          {loading ? (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-300 h-56 rounded-t-lg"></div>
                  <div className="p-6 space-y-3">
                    <div className="h-4 bg-gray-300 rounded w-3/4"></div>
                    <div className="h-3 bg-gray-300 rounded w-full"></div>
                    <div className="h-3 bg-gray-300 rounded w-2/3"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
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