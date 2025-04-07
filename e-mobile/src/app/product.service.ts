import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

// Define mobile product interface
export interface MobileProduct {
  id?: number;
  name: string;
  description: string;
  price: number;
  brand: string;
  category: string;
  stock: number;
  imageUrl: string;
  features: string[];
  specifications: string[];
  // Mobile-specific details
  screenSize: string;
  processor: string;
  ram: string;
  storage: string;
  camera: string;
  battery: string;
  operatingSystem: string;
  networkType: string;
  createdAt?: Date;
  updatedAt?: Date;
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private apiUrl = 'https://localhost:7211/api/products';

  constructor(private http: HttpClient) { }

  // Get all mobile products
  getMobileProducts(): Observable<MobileProduct[]> {
    return this.http.get<any[]>(this.apiUrl)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Get featured mobile phones
  getFeaturedMobiles(): Observable<MobileProduct[]> {
    return this.http.get<any[]>(`${this.apiUrl}/featured`)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Get mobiles by brand
  getMobilesByBrand(brand: string): Observable<MobileProduct[]> {
    return this.http.get<any[]>(`${this.apiUrl}/brand/${brand}`)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Get mobiles by price range
  getMobilesByPriceRange(min: number, max: number): Observable<MobileProduct[]> {
    return this.http.get<any[]>(`${this.apiUrl}/price?min=${min}&max=${max}`)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Get mobile phone details
  getMobileDetails(id: number): Observable<MobileProduct> {
    return this.http.get<any>(`${this.apiUrl}/${id}`)
      .pipe(
        map(product => this.extractMobileDetails(product)),
        catchError(this.handleError)
      );
  }

  // Compare multiple mobile phones
  compareMobiles(ids: number[]): Observable<MobileProduct[]> {
    const idsParam = ids.join(',');
    return this.http.get<any[]>(`${this.apiUrl}/compare?ids=${idsParam}`)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Search mobiles by keyword
  searchMobiles(keyword: string): Observable<MobileProduct[]> {
    return this.http.get<any[]>(`${this.apiUrl}/search?keyword=${keyword}`)
      .pipe(
        map(products => this.processMobileData(products)),
        catchError(this.handleError)
      );
  }

  // Helper method to process mobile data
  private processMobileData(products: any[]): MobileProduct[] {
    return products.map(product => this.extractMobileDetails(product));
  }

  // Helper method to extract mobile details
  private extractMobileDetails(product: any): MobileProduct {
    // Parse feature strings into objects if needed
    let features = product.features;
    let specs = product.specifications;
    
    // If features/specs are stored as strings, parse them
    if (typeof features === 'string') {
      try {
        features = JSON.parse(features);
      } catch {
        features = [];
      }
    }
    
    if (typeof specs === 'string') {
      try {
        specs = JSON.parse(specs);
      } catch {
        specs = [];
      }
    }
    
    // Extract mobile-specific details from specifications
    const getSpec = (key: string): string => {
      if (Array.isArray(specs)) {
        const spec = specs.find((s: string) => s.toLowerCase().includes(key.toLowerCase()));
        return spec || '';
      }
      return '';
    };
    
    return {
      ...product,
      features: features,
      specifications: specs,
      screenSize: getSpec('screen') || getSpec('display'),
      processor: getSpec('processor') || getSpec('chipset') || getSpec('cpu'),
      ram: getSpec('ram') || getSpec('memory'),
      storage: getSpec('storage'),
      camera: getSpec('camera'),
      battery: getSpec('battery'),
      operatingSystem: getSpec('os') || getSpec('android') || getSpec('ios'),
      networkType: getSpec('network') || getSpec('5g') || getSpec('4g')
    };
  }

  private handleError(error: any) {
    console.error('API error:', error);
    return throwError(() => error);
  }
}
