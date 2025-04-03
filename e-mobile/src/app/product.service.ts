import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Product {
  id: number;
  name: string;
  price: number;
  imageUrl: string;
  description?: string;
}

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private products: Product[] = [
    { 
      id: 1, 
      name: 'Classic T-Shirt', 
      price: 20, 
      imageUrl: './assets/tshirt.jpeg',
      description: 'Comfortable cotton t-shirt in various colors'
    },
    { 
      id: 2, 
      name: 'Slim Fit Jeans', 
      price: 50, 
      imageUrl: './assets/jeans.jpg',
      description: 'Modern slim fit jeans with stretch fabric'
    },
    { 
      id: 3, 
      name: 'Winter Jacket', 
      price: 80, 
      imageUrl: './assets/jackets.jpg',
      description: 'Warm and stylish winter jacket'
    },
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProduct(id: number): Product | undefined {
    return this.products.find(p => p.id === id);
  }

  // Helper method to handle image loading errors
  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    console.error('Image failed to load:', img.src);
    // Try to load a different image format if available
    const currentSrc = img.src;
    if (currentSrc.endsWith('.jpeg')) {
      img.src = currentSrc.replace('.jpeg', '.jpg');
    } else if (currentSrc.endsWith('.jpg')) {
      img.src = currentSrc.replace('.jpg', '.jpeg');
    }
  }
}