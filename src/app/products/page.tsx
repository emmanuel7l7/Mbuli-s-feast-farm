
import { ProductCard } from "@/components/product-card";
import type { Product } from "@/lib/types";

// This would typically come from a database or API
const allProducts: Product[] = [
  {
    id: '1',
    name: 'Whole Chicken',
    description: 'Fresh, farm-raised whole chicken. Perfect for roasting. Approx. 1.5kg.',
    price: 15000,
    image: 'https://placehold.co/600x400',
    aiHint: 'whole chicken',
    stockStatus: 'in-stock',
  },
  {
    id: '2',
    name: 'Chicken Thighs (1kg)',
    description: 'Juicy and tender chicken thighs, bone-in and skin-on. Ideal for grilling or stewing.',
    price: 18000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken thighs',
    stockStatus: 'in-stock',
  },
  {
    id: '3',
    name: 'Chicken Wings (1kg)',
    description: 'Perfectly portioned wings, ready for your favorite sauce. Great for parties.',
    price: 12000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken wings',
    stockStatus: 'out-of-stock',
  },
  {
    id: '4',
    name: 'Chicken Breast (1kg)',
    description: 'Lean and versatile boneless, skinless chicken breast. A healthy choice for any meal.',
    price: 20000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken breast',
    stockStatus: 'in-stock',
  },
  {
    id: '5',
    name: 'Chicken Drumsticks (1kg)',
    description: 'A family favorite, these drumsticks are meaty and flavorful. Perfect for frying or baking.',
    price: 16000,
    image: 'https://placehold.co/600x400',
    aiHint: 'chicken drumsticks',
    stockStatus: 'low-stock',
  },
  {
    id: '6',
    name: 'Ground Chicken (500g)',
    description: 'Lean ground chicken, a great alternative for burgers, meatballs, and sauces.',
    price: 9000,
    image: 'https://placehold.co/600x400',
    aiHint: 'ground chicken',
    stockStatus: 'in-stock',
  },
];

export default function ProductsPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-headline font-bold text-primary">Our Farm-Fresh Products</h1>
        <p className="mt-4 text-lg text-foreground/80 max-w-2xl mx-auto">
          All our chicken is raised with care, free from antibiotics and hormones. Prices are in Tanzanian Shillings (TZS).
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {allProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
