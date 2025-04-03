import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="home-container">
      <h1>Welcome to Mobile Store</h1>
      <p>Find the best mobile phones at great prices!</p>
      <button routerLink="/products" class="browse-btn">Browse Products</button>
    </div>
  `,
  styles: [`
    .home-container {
      text-align: center;
      padding: 2rem;
      max-width: 800px;
      margin: 0 auto;
    }

    h1 {
      color: #2e7d32;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      font-size: 1.2rem;
      margin-bottom: 2rem;
    }

    .browse-btn {
      padding: 1rem 2rem;
      background-color: #2e7d32;
      color: white;
      border: none;
      border-radius: 5px;
      font-size: 1.1rem;
      cursor: pointer;
      transition: background-color 0.3s;
    }

    .browse-btn:hover {
      background-color: #1b5e20;
    }
  `]
})
export class HomeComponent {} 