import Dexie, { Table } from 'dexie';

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  image: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  createdAt?: Date;
}

export interface Order {
  id?: number;
  customerName: string;
  customerPhone: string;
  deliveryAddress: string;
  items: Array<{
    productId: number;
    productName: string;
    quantity: number;
    price: number;
  }>;
  subtotal: number;
  deliveryFee: number;
  total: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  createdAt?: Date;
}

export interface CartItem {
  id?: number;
  productId: number;
  quantity: number;
  addedAt?: Date;
}

export class MbuliDatabase extends Dexie {
  products!: Table<Product>;
  orders!: Table<Order>;
  cart!: Table<CartItem>;

  constructor() {
    super('MbuliDatabase');
    this.version(1).stores({
      products: '++id, name, price, stockStatus, createdAt',
      orders: '++id, customerName, status, createdAt',
      cart: '++id, productId, addedAt'
    });
  }
}

export const db = new MbuliDatabase();

// Initialize with sample data
export const initializeDatabase = async () => {
  const productCount = await db.products.count();
  
  if (productCount === 0) {
    await db.products.bulkAdd([
      {
        name: 'Whole Chicken',
        description: 'Fresh, farm-raised whole chicken. Perfect for roasting. Approx. 1.5kg.',
        price: 15000,
        image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg',
        stockStatus: 'in-stock',
        createdAt: new Date()
      },
      {
        name: 'Chicken Thighs (1kg)',
        description: 'Juicy and tender chicken thighs, bone-in and skin-on. Ideal for grilling or stewing.',
        price: 18000,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
        stockStatus: 'in-stock',
        createdAt: new Date()
      },
      {
        name: 'Chicken Wings (1kg)',
        description: 'Perfectly portioned wings, ready for your favorite sauce. Great for parties.',
        price: 12000,
        image: 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg',
        stockStatus: 'out-of-stock',
        createdAt: new Date()
      },
      {
        name: 'Chicken Breast (1kg)',
        description: 'Lean and versatile boneless, skinless chicken breast. A healthy choice for any meal.',
        price: 20000,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
        stockStatus: 'in-stock',
        createdAt: new Date()
      },
      {
        name: 'Chicken Drumsticks (1kg)',
        description: 'A family favorite, these drumsticks are meaty and flavorful. Perfect for frying or baking.',
        price: 16000,
        image: 'https://images.pexels.com/photos/616354/pexels-photo-616354.jpeg',
        stockStatus: 'low-stock',
        createdAt: new Date()
      },
      {
        name: 'Ground Chicken (500g)',
        description: 'Lean ground chicken, a great alternative for burgers, meatballs, and sauces.',
        price: 9000,
        image: 'https://images.pexels.com/photos/2338407/pexels-photo-2338407.jpeg',
        stockStatus: 'in-stock',
        createdAt: new Date()
      }
    ]);
  }
};