import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.backendUrl;
  
 /**
   * Envia las credenciales de un usuario al backend para autenticarse.
   * @param username El nombre de usuario.
   * @param password La contraseña.
   * @returns Un Observable con la respuesta del servidor.
   */
  constructor(private http: HttpClient) {}
  login(credentials: { username: string; password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/api/login/`;
    return this.http.post(loginUrl, credentials);
  }
}