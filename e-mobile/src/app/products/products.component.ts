// --- products.component.ts ---
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Product } from '../models/product.interface';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="products-container">
      <h1>Our Products</h1>
      <div class="products-grid">
        <div *ngFor="let product of products" class="product-card">
          <div class="product-image">
            <img 
              [src]="product.imageUrl"
              [alt]="product.name" 
              (error)="handleImageError($event, product)"
              loading="lazy"
            >
          </div>
          <div class="product-info">
            <h2>{{ product.name }}</h2>
            <p class="brand">{{ product.brand }}</p>
            <p class="price">₹{{ product.price.toLocaleString() }}</p>
            <div class="specs">
              <p><strong>Screen:</strong> {{ product.specifications.screen }}</p>
              <p><strong>Processor:</strong> {{ product.specifications.processor }}</p>
              <p><strong>RAM:</strong> {{ product.specifications.ram }}</p>
              <p><strong>Storage:</strong> {{ product.specifications.storage }}</p>
            </div>
            <div class="actions">
              <a [routerLink]="['/product', product.id]" class="view-details">View Details</a>
              <button (click)="addToCart(product)" [disabled]="!product.inStock" class="add-to-cart">
                {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .products-container {
      padding: 2rem;
    }

    h1 {
      text-align: center;
      margin-bottom: 2rem;
      color: #2c3e50;
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 2rem;
      padding: 1rem;
    }

    .product-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
      overflow: hidden;
      transition: transform 0.3s ease;
    }

    .product-card:hover {
      transform: translateY(-5px);
    }

    .product-image {
      height: 250px;
      overflow: hidden;
      background: #f5f5f5;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 1rem;
    }

    .product-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .product-info {
      padding: 1.5rem;
    }

    .product-info h2 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
      font-size: 1.25rem;
    }

    .brand {
      color: #7f8c8d;
      margin: 0 0 0.5rem 0;
    }

    .price {
      color: #e74c3c;
      font-size: 1.25rem;
      font-weight: bold;
      margin: 0 0 1rem 0;
    }

    .specs {
      margin-bottom: 1rem;
    }

    .specs p {
      margin: 0.25rem 0;
      font-size: 0.9rem;
      color: #34495e;
    }

    .actions {
      display: flex;
      gap: 1rem;
      margin-top: 1rem;
    }

    .view-details {
      flex: 1;
      text-align: center;
      padding: 0.5rem;
      background: #3498db;
      color: white;
      text-decoration: none;
      border-radius: 4px;
      transition: background-color 0.3s;
    }

    .view-details:hover {
      background: #2980b9;
    }

    .add-to-cart {
      flex: 1;
      padding: 0.5rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .add-to-cart:disabled {
      background: #95a5a6;
      cursor: not-allowed;
    }

    .add-to-cart:not(:disabled):hover {
      background: #27ae60;
    }

    @media (max-width: 768px) {
      .products-grid {
        grid-template-columns: 1fr;
      }

      .actions {
        flex-direction: column;
      }
    }
  `]
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  constructor(
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.products = this.productService.getProducts();
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  handleImageError(event: Event, product: Product): void {
    const img = event.target as HTMLImageElement;
    console.error(`Failed to load image for ${product.name}`);
    console.error('Attempted to load from:', img.src);
    console.error('Product details:', product);
    img.src = '/assets/images/placeholder.jpg'; // Fallback image
  }
}