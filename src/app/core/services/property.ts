import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PropertyService {

  private apiUrl = 'http://localhost:3000/api/properties';

  private favoritesKey = 'favorites';

  constructor(
    private http: HttpClient
  ) {}

  // =========================
  // Authorization Headers
  // =========================

  private getAuthHeaders(): HttpHeaders {

    const token = localStorage.getItem('token');

    return new HttpHeaders({
      Authorization: `Bearer ${token}`
    });
  }


  // =========================
  // Get All Properties
  // =========================

  getProperties(): Observable<any[]> {

    return this.http.get<any[]>(
      this.apiUrl,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================
  // Get Property By ID
  // =========================

  getPropertyById(id: string): Observable<any> {

    return this.http.get<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================
  // Create Property
  // =========================

  createProperty(
    property: any,
    images: File[]
  ): Observable<any> {

    const formData = new FormData();

    formData.append(
      'title',
      property.title
    );

    formData.append(
      'description',
      property.description
    );

    formData.append(
      'price',
      property.price
    );

    formData.append(
      'propertyType',
      property.propertyType
    );

    formData.append(
      'listingType',
      property.listingType
    );

    formData.append(
      'location',
      property.location
    );

    formData.append(
      'bedrooms',
      property.bedrooms
    );

    formData.append(
      'bathrooms',
      property.bathrooms
    );

    formData.append(
      'area',
      property.area
    );


    // =========================
    // Images
    // =========================

    if (images.length > 0) {

      // Main image

      formData.append(
        'image',
        images[0]
      );

      // Additional images

      images
        .slice(1)
        .forEach((image) => {

          formData.append(
            'images',
            image
          );

        });
    }


    return this.http.post<any>(
      this.apiUrl,
      formData,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================
  // Update Property
  // =========================

  updateProperty(
    id: string,
    property: any
  ): Observable<any> {

    return this.http.patch<any>(
      `${this.apiUrl}/${id}`,
      property,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================
  // Delete Property
  // =========================

  deleteProperty(
    id: string
  ): Observable<any> {

    return this.http.delete<any>(
      `${this.apiUrl}/${id}`,
      {
        headers: this.getAuthHeaders()
      }
    );
  }


  // =========================
  // Favorites
  // =========================

  getFavorites(): any[] {

    const favorites =
      localStorage.getItem(
        this.favoritesKey
      );

    if (!favorites) {
      return [];
    }

    try {

      return JSON.parse(favorites);

    } catch (error) {

      localStorage.removeItem(
        this.favoritesKey
      );

      return [];
    }
  }


  addToFavorites(property: any): void {

    const favorites =
      this.getFavorites();

    const alreadyExists =
      favorites.some(
        (item: any) =>
          item._id === property._id
      );

    if (!alreadyExists) {

      favorites.push(property);

      localStorage.setItem(
        this.favoritesKey,
        JSON.stringify(favorites)
      );
    }
  }


  removeFromFavorites(id: string): void {

    const favorites =
      this.getFavorites();

    const updatedFavorites =
      favorites.filter(
        (item: any) =>
          item._id !== id
      );

    localStorage.setItem(
      this.favoritesKey,
      JSON.stringify(updatedFavorites)
    );
  }


  isFavorite(id: string): boolean {

    const favorites =
      this.getFavorites();

    return favorites.some(
      (item: any) =>
        item._id === id
    );
  }

}