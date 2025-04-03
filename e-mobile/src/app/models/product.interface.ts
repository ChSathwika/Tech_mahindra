export interface Product {
  id: number;
  name: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  specifications: ProductSpecifications;
  inStock: boolean;
}

export interface ProductSpecifications {
  screen: string;
  processor: string;
  camera: string;
  ram: string;
  storage: string;
  battery: string;
  os: string;
} 