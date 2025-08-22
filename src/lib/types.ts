
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  aiHint: string;
  stockStatus: 'in-stock' | 'low-stock' | 'out-of-stock';
}

export interface Store {
  id:string;
  name: string;
  address: string;
  hours: string;
  image: string;
  aiHint: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'Admin' | 'Customer' | 'Delivery';
  status: 'active' | 'suspended';
}
