import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargarJsonService {

  //Archivos de User
  private jsonUrlGetSingleUserResponse = 'assets/archivos-json/users/get-single-user.json';
  private jsonUrlGetAllUserResponse = 'assets/archivos-json/users/get-all-user.json';
  private jsonUrlCreateUser = 'assets/archivos-json/users/create-user.json';
  private jsonUrlCreateUserResponse = 'assets/archivos-json/users/create-user-response.json';
  private jsonUrlUpdateUser = 'assets/archivos-json/users/update-user-request.json'
  private jsonUrlUpdateUserResponse = 'assets/archivos-json/users/update-user-response.json';
  private jsonUrlCheckEmailUser = 'assets/archivos-json/users/check-email-user.json'
  private jsonUrlCheckEmailUserResponse = 'assets/archivos-json/users/check-email-user-response.json';

  //Archivos de Products
  private jsonUrlGetSingleProductsResponse = 'assets/archivos-json/products/get-single-product-response.json';
  private jsonUrlGetAllProductsResponse = 'assets/archivos-json/products/get-all-product-response.json';
  private jsonUrlCreateProduct = 'assets/archivos-json/products/create-product.json';
  private jsonUrlCreateProductResponse = 'assets/archivos-json/products/create-product-response.json';
  private jsonUrlUpdateProduct = 'assets/archivos-json/products/update-product.json'
  private jsonUrlUpdateProductResponse = 'assets/archivos-json/products/update-products-response.json';

  //Archivos de Categories
  private jsonUrlGetAllCategoriesResponse = 'assets/archivos-json/categories/get-all-categories-response.json';
  private jsonUrlGetSingleCategoryResponse = 'assets/archivos-json/categories/get-single-category-response.json';
  private jsonUrlGetAllProductsByCategoryResponse = 'assets/archivos-json/categories/get-all-product-by-category-response.json';

  constructor(private http: HttpClient) { }

  //Users
  getJsonDataGetAllUserResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetAllUserResponse); }
  getJsonDataGetSingleUserResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetSingleUserResponse); }
  getJsonDataCreateUser(): Observable<any> { return this.http.get<any>(this.jsonUrlCreateUser); }
  getJsonDataCreateUserResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlCreateUserResponse); }
  getJsonDataUpdateUser(): Observable<any> { return this.http.get<any>(this.jsonUrlUpdateUser); }
  getJsonDataUpdateUserResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlUpdateUserResponse); }
  getJsonDataCheckEmailUser(): Observable<any> { return this.http.get<any>(this.jsonUrlCheckEmailUser); }
  getJsonDataCheckEmailUserResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlCheckEmailUserResponse); }

  //Products
  getJsonDataGetAllProductsResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetAllProductsResponse); }
  getJsonDataGetSingleProductResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetSingleProductsResponse); }
  getJsonDataCreateProduct(): Observable<any>{ return this.http.get<any>(this.jsonUrlCreateProduct); }
  getJsonDataCreateProductResponse(): Observable<any>{ return this.http.get<any>(this.jsonUrlCreateProductResponse); }
  getJsonDataUpdateProduct(): Observable<any>{ return this.http.get<any>(this.jsonUrlUpdateProduct); }
  getJsonDataUpdateProductResponse(): Observable<any>{ return this.http.get<any>(this.jsonUrlUpdateProductResponse); }

  //Categories
  getJsonDataGetAllCategoriesResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetAllCategoriesResponse); }
  getJsonDataGetSingleCategoryResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetSingleCategoryResponse); }
  getJsonDataGetAllProductsByCategoryResponse(): Observable<any> { return this.http.get<any>(this.jsonUrlGetAllProductsByCategoryResponse); }

}
