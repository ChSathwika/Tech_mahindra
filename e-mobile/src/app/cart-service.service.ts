// --- cart.service.ts ---
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from './product.service';

export interface CartItem {
  product: Product;
  quantity: number;
}

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<CartItem[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  addToCart(product: Product): void {
    const currentCart = this.cartItemsSubject.value;
    const existingItem = currentCart.find((item) => item.product.id === product.id);

    if (existingItem) {
      existingItem.quantity++;
    } else {
      currentCart.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next([...currentCart]);
  }

  removeFromCart(product: Product): void {
    const currentCart = this.cartItemsSubject.value;
    const updatedCart = currentCart.filter((item) => item.product.id !== product.id);
    this.cartItemsSubject.next([...updatedCart]);
  }

  updateQuantity(product: Product, quantity: number): void {
    const currentCart = this.cartItemsSubject.value;
    const item = currentCart.find((i) => i.product.id === product.id);
    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...currentCart]);
    }
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
  }
}

