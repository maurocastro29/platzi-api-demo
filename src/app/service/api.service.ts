import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private urlApi =    'https://api.escuelajs.co/api/v1';

  constructor(private http: HttpClient) { }

  getAllProducts(params: any): Observable<any> {
    return this.http.get<any>(this.urlApi + '/products/', { params });
  }

  public getDataProducts(): Observable<any>{
    return this.http.get<any>(this.urlApi + '/products');
  }

  public getDataSingleProduct(idProduct: Number): Observable<any>{
    return this.http.get<any>(this.urlApi + '/products/' + idProduct);
  }

  public deleteProduct(idProduct: Number): Observable<any>{
    return this.http.delete(this.urlApi + '/products/' + idProduct);
  }

  public updateProduct(idProduct: number, newData: any): Observable<any>{
    return this.http.put<any>(this.urlApi + '/products/' + idProduct, newData);
  }

  public postProduct(data: any): Observable<any>{
    return this.http.post<any>(this.urlApi + '/products/', data);
  }

  public getProductByCategory(idCategory: string): Observable<any> {
    return this.http.get<any>(this.urlApi+'/products/?categoryId='+idCategory);
  }

  public getAllProductsFiltered(params: any): Observable<any> {
    return this.http.get<any>(this.urlApi + '/products/', { params });
  }

  /**Categories */

  public getCategories(): Observable<any>{
    return this.http.get<any>(this.urlApi + '/categories');
  }

  public getSingleCategories(idCategory: number): Observable<any>{
    return this.http.get<any>(this.urlApi + '/categories/' + idCategory);
  }

  public getProductByCategoryFiltered(idCategory: string, params: any): Observable<any> {
    return this.http.get<any>(this.urlApi+'/products/?categoryId='+idCategory+'/', { params });
  }

  /**Users */

  getAllUsers(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/users/');
  }

  public getDataSingleUser(idUser: Number): Observable<any>{
    return this.http.get<any>(this.urlApi + '/users/' + idUser);
  }

  public createUser(data: any): Observable<any>{
    return this.http.post<any>(this.urlApi + '/users/', data);
  }

  public updateUser(idUser: number, newData: any): Observable<any>{
    return this.http.put<any>(this.urlApi + '/users/' + idUser, newData);
  }

  public checkEmailUsers(data: any): Observable<any>{
    return this.http.post<any>(this.urlApi + '/users/is-available/', data);
  }

  /**Auth */
  public loginUserAuth(data: any): Observable<any>{
    return this.http.post<any>(this.urlApi + '/auth/login', data);
  }

  public getUserSession(): Observable<any> {
    return this.http.get<any>(this.urlApi + '/auth/profile');
  }

}
