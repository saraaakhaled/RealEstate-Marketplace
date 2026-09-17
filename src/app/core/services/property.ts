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
  // Get All Properties
  // =========================

  getProperties(): Observable<any[]> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any[]>(
      this.apiUrl,
      { headers }
    );
  }


  // =========================
  // Get Property By ID
  // =========================

  getPropertyById(id: string): Observable<any> {

    const token = localStorage.getItem('token');

    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });

    return this.http.get<any>(
      `${this.apiUrl}/${id}`,
      { headers }
    );
  }


  // =========================
  // Create Property
  // =========================

  createProperty(
    property: any,
    images: File[]
  ): Observable<any> {

    const token = localStorage.getItem('token');

    const formData = new FormData();


    // Property information

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


    // Images

    if (images.length > 0) {

      // First image = main image

      formData.append(
        'image',
        images[0]
      );


      // Remaining images

      images
        .slice(1)
        .forEach((image) => {

          formData.append(
            'images',
            image
          );

        });

    }


    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    });


    return this.http.post<any>(
      this.apiUrl,
      formData,
      {
        headers
      }
    );
  }


  // =========================
  // Favorites
  // =========================

  getFavorites(): any[] {

    const favorites = localStorage.getItem(
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

    const favorites = this.getFavorites();

    const alreadyExists = favorites.some(
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

    const favorites = this.getFavorites();

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

    const favorites = this.getFavorites();

    return favorites.some(
      (item: any) =>
        item._id === id
    );
  }

}
