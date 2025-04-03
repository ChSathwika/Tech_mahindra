// --- cart.component.ts ---
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="cart-container">
      <h2>Shopping Cart</h2>
      <div class="cart-items" *ngIf="cartItems.length > 0; else emptyCart">
        <div class="cart-item" *ngFor="let item of cartItems">
          <img [src]="item.imageUrl" [alt]="item.name" class="item-image">
          <div class="item-details">
            <h3>{{ item.name }}</h3>
            <p class="brand">{{ item.brand }}</p>
            <p class="price">₹{{ item.price | number:'1.0-0' }}</p>
          </div>
          <button (click)="removeFromCart(item.id)" class="remove-btn">Remove</button>
        </div>
        <div class="cart-summary">
          <h3>Total: ₹{{ total | number:'1.0-0' }}</h3>
          <button (click)="clearCart()" class="clear-btn">Clear Cart</button>
        </div>
      </div>
      <ng-template #emptyCart>
        <p class="empty-cart">Your cart is empty</p>
      </ng-template>
    </div>
  `,
  styles: [`
    .cart-container {
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h2 {
      color: #2e7d32;
      margin-bottom: 2rem;
      text-align: center;
    }

    .cart-items {
      display: flex;
      flex-direction: column;
      gap: 1rem;
    }

    .cart-item {
      display: flex;
      align-items: center;
      gap: 1rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .item-image {
      width: 100px;
      height: 100px;
      object-fit: cover;
      border-radius: 4px;
    }

    .item-details {
      flex: 1;
    }

    h3 {
      margin: 0;
      color: #333;
    }

    .brand {
      color: #666;
      margin: 0.3rem 0;
    }

    .price {
      color: #2e7d32;
      font-weight: bold;
      margin: 0;
    }

    .remove-btn {
      padding: 0.5rem 1rem;
      background-color: #dc3545;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .remove-btn:hover {
      background-color: #c82333;
    }

    .cart-summary {
      margin-top: 2rem;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 8px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .clear-btn {
      padding: 0.5rem 1rem;
      background-color: #6c757d;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .clear-btn:hover {
      background-color: #5a6268;
    }

    .empty-cart {
      text-align: center;
      color: #666;
      font-size: 1.2rem;
    }
  `]
})
export class CartComponent implements OnInit {
  cartItems: Product[] = [];
  total: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartService.getCartItems().subscribe(items => {
      this.cartItems = items;
      this.total = this.cartService.getTotal();
    });
  }

  removeFromCart(productId: number) {
    this.cartService.removeFromCart(productId);
  }

  clearCart() {
    this.cartService.clearCart();
  }
}