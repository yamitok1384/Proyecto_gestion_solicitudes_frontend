import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private baseUrl = environment.backendUrl;
  
  constructor(private http: HttpClient) {}

  /**
   * Envia las credenciales de un usuario al backend para autenticarse.
   * @param credentials Un objeto con el nombre de usuario y la contraseña.
   * @returns Un Observable con la respuesta del servidor.
   */
  login(credentials: { username: string; password: string }): Observable<any> {
    const loginUrl = `${this.baseUrl}/api/login/`;
    return this.http.post(loginUrl, credentials);
  }

  /**
   * Obtiene la cabecera con el token de autenticación.
   * @returns HttpHeaders con el token de autenticación.
   */
  private getAuthHeaders(): HttpHeaders {
    const token = localStorage.getItem('auth_token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Token ${token}`
    });
  }

  /**
   * Obtiene la lista de incidencias reportadas por el usuario autenticado.
   * @returns Un Observable con la lista de incidencias.
   */
  getWorkerIncidents(): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/api/incidencias/`;
    // Aquí puedes agregar filtros si tu backend lo soporta, como por ejemplo:
    // return this.http.get(url, { headers: headers, params: { reportado_por: id_de_usuario } });
    return this.http.get(url, { headers: headers });
  }

  /**
   * Obtiene la lista completa de todas las incidencias (solo para administradores).
   * @returns Un Observable con la lista de todas las incidencias.
   */
  getAdminIncidents(): Observable<any> {
    const headers = this.getAuthHeaders();
    const url = `${this.baseUrl}/api/incidencias/`;
    return this.http.get(url, { headers: headers });
  }
}
