import { Injectable } from '@angular/core';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private products: Product[] = [
    {
      id: 1,
      name: 'iPhone 15 Pro',
      brand: 'Apple',
      price: 129999,
      description: 'The latest iPhone with advanced camera system and A17 Pro chip.',
      imageUrl: '/assets/images/iphone15pro.jpg',
      specifications: {
        screen: '6.7-inch Super Retina XDR display',
        processor: 'A17 Pro chip',
        camera: '48MP Main camera with 4K video',
        ram: '8GB',
        storage: '256GB',
        battery: '4422mAh',
        os: 'iOS 17'
      },
      inStock: true
    },
    {
      id: 2,
      name: 'Samsung Galaxy S24 Ultra',
      brand: 'Samsung',
      price: 124999,
      description: 'Samsung\'s flagship with S Pen support and advanced AI features.',
      imageUrl: '/assets/images/samsungs24ultra.jpg',
      specifications: {
        screen: '6.8-inch Dynamic AMOLED 2X',
        processor: 'Snapdragon 8 Gen 3',
        camera: '200MP Main camera with 8K video',
        ram: '12GB',
        storage: '256GB',
        battery: '5000mAh',
        os: 'Android 14'
      },
      inStock: true
    },
    {
      id: 3,
      name: 'Google Pixel 8 Pro',
      brand: 'Google',
      price: 99999,
      description: 'Google\'s flagship with advanced AI camera features.',
      imageUrl: '/assets/images/pixel8pro.jpg',
      specifications: {
        screen: '6.7-inch LTPO OLED',
        processor: 'Google Tensor G3',
        camera: '50MP Main camera with AI features',
        ram: '12GB',
        storage: '128GB',
        battery: '5050mAh',
        os: 'Android 14'
      },
      inStock: true
    },
    {
      id: 4,
      name: "OnePlus 12",
      brand: "OnePlus",
      price: 69999,
      description: "Fast and smooth performance with Hasselblad cameras",
      imageUrl: "/assets/images/oneplus12.jpg",
      specifications: {
        screen: "6.82-inch AMOLED",
        processor: "Snapdragon 8 Gen 3",
        camera: "50MP Main, 48MP Ultra Wide, 64MP Telephoto",
        ram: "16GB",
        storage: "256GB",
        battery: "5400mAh",
        os: "Android 14"
      },
      inStock: true
    }
  ];

  getProducts(): Product[] {
    return this.products;
  }

  getProductById(id: number): Product | undefined {
    return this.products.find(product => product.id === id);
  }
} 