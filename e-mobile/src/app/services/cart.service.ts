import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../models/product.interface';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems = new BehaviorSubject<Product[]>([]);

  constructor() {
    // Load cart items from localStorage on initialization
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      this.cartItems.next(JSON.parse(savedCart));
    }
  }

  getCartItems() {
    return this.cartItems.asObservable();
  }

  addToCart(product: Product) {
    const currentItems = this.cartItems.value;
    this.cartItems.next([...currentItems, product]);
    this.saveCartToStorage();
  }

  removeFromCart(productId: number) {
    const currentItems = this.cartItems.value;
    this.cartItems.next(currentItems.filter(item => item.id !== productId));
    this.saveCartToStorage();
  }

  clearCart() {
    this.cartItems.next([]);
    this.saveCartToStorage();
  }

  getTotal(): number {
    return this.cartItems.value.reduce((total, item) => total + item.price, 0);
  }

  private saveCartToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems.value));
  }
} 