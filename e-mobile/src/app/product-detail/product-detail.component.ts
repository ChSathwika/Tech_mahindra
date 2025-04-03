import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { CartService } from '../services/cart.service';
import { ProductService } from '../services/product.service';
import { Product } from '../models/product.interface';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="product-detail" *ngIf="product">
      <div class="product-image">
        <img 
          [src]="product.imageUrl" 
          [alt]="product.name"
          (error)="handleImageError($event)"
          loading="lazy"
        >
      </div>
      <div class="product-info">
        <h1>{{ product.name }}</h1>
        <p class="brand">{{ product.brand }}</p>
        <p class="price">₹{{ product.price.toLocaleString() }}</p>
        <p class="description">{{ product.description }}</p>
        
        <div class="specifications">
          <h2>Specifications</h2>
          <div class="spec-grid">
            <div class="spec-item">
              <span class="label">Screen</span>
              <span class="value">{{ product.specifications.screen }}</span>
            </div>
            <div class="spec-item">
              <span class="label">Processor</span>
              <span class="value">{{ product.specifications.processor }}</span>
            </div>
            <div class="spec-item">
              <span class="label">RAM</span>
              <span class="value">{{ product.specifications.ram }}</span>
            </div>
            <div class="spec-item">
              <span class="label">Storage</span>
              <span class="value">{{ product.specifications.storage }}</span>
            </div>
            <div class="spec-item">
              <span class="label">Camera</span>
              <span class="value">{{ product.specifications.camera }}</span>
            </div>
            <div class="spec-item">
              <span class="label">Battery</span>
              <span class="value">{{ product.specifications.battery }}</span>
            </div>
            <div class="spec-item">
              <span class="label">OS</span>
              <span class="value">{{ product.specifications.os }}</span>
            </div>
          </div>
        </div>

        <button 
          (click)="addToCart(product)" 
          [disabled]="!product.inStock" 
          class="add-to-cart"
        >
          {{ product.inStock ? 'Add to Cart' : 'Out of Stock' }}
        </button>
      </div>
    </div>
  `,
  styles: [`
    .product-detail {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
      padding: 2rem;
      max-width: 1200px;
      margin: 0 auto;
    }

    .product-image {
      background: #f5f5f5;
      border-radius: 8px;
      padding: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 400px;
    }

    .product-image img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }

    .product-info {
      padding: 1rem;
    }

    h1 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
    }

    .brand {
      color: #7f8c8d;
      margin: 0 0 1rem 0;
    }

    .price {
      color: #e74c3c;
      font-size: 1.5rem;
      font-weight: bold;
      margin: 0 0 1rem 0;
    }

    .description {
      color: #34495e;
      line-height: 1.6;
      margin-bottom: 2rem;
    }

    .specifications {
      margin-bottom: 2rem;
    }

    .specifications h2 {
      color: #2c3e50;
      margin-bottom: 1rem;
    }

    .spec-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .spec-item {
      background: #f8f9fa;
      padding: 1rem;
      border-radius: 4px;
    }

    .spec-item .label {
      display: block;
      color: #7f8c8d;
      font-size: 0.9rem;
      margin-bottom: 0.25rem;
    }

    .spec-item .value {
      color: #2c3e50;
      font-weight: 500;
    }

    .add-to-cart {
      width: 100%;
      padding: 1rem;
      background: #2ecc71;
      color: white;
      border: none;
      border-radius: 4px;
      font-size: 1.1rem;
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
      .product-detail {
        grid-template-columns: 1fr;
      }

      .product-image {
        height: 300px;
      }
    }
  `]
})
export class ProductDetailComponent implements OnInit {
  product: Product | undefined;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.product = this.productService.getProductById(id);
  }

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }

  handleImageError(event: Event): void {
    const img = event.target as HTMLImageElement;
    img.src = 'assets/images/placeholder.jpg';
  }
} 