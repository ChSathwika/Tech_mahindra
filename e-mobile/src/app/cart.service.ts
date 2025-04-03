// cart.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

interface CartItem {
  product: any; // Replace 'any' with your Product interface
  quantity: number;
}

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: CartItem[] = [];
  private cartItemCountSubject = new BehaviorSubject<number>(0);
  cartItemCount$ = this.cartItemCountSubject.asObservable();

  constructor() {
    this.updateCartItemCount();
  }

  addToCart(product: any) {
    const existingItem = this.cartItems.find(item => item.product.id === product.id);
    if (existingItem) {
      existingItem.quantity++;
    } else {
      this.cartItems.push({ product, quantity: 1 });
    }
    this.updateCartItemCount();
  }

  getCartItems(): CartItem[] {
    return this.cartItems;
  }

  updateCartItemCount() {
    let count = 0;
    this.cartItems.forEach(item => count += item.quantity);
    this.cartItemCountSubject.next(count);
  }
}
