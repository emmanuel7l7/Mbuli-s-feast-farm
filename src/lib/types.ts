export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Customer' | 'Delivery';
  status: 'active' | 'suspended';
}

export interface Product {
  id?: number;
  name: string;
  description: string;
  price: number;
  // image: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
  createdAt?: Date;
}

export interface Store {
  id: string;
  name: string;
  address: string;
  hours: string;
  // image: string;
}

export interface CartItem extends Product {
  quantity: number;
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