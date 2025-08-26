import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { ApiService } from '../../services/api.service';
import { NgIf, NgFor } from '@angular/common'; // Importamos NgIf y NgFor
import { Observable, of } from 'rxjs'; // Importamos Observable y of

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, NgIf, NgFor],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  token: string | null = null;
  userRole: string = '';
  // Creamos una variable para almacenar los datos de las incidencias
  incidencias$: Observable<any[]> = of([]); 

  constructor(private router: Router, private apiService: ApiService) { }

  ngOnInit(): void {
    this.token = localStorage.getItem('auth_token');
    
    if (!this.token) {
      this.router.navigate(['/login']);
      return;
    }
    
    // Simulación del rol del usuario
    if (this.token === '1c1a65f65a645cc39fc64d7cfb66c1d1d4f62119') {
      this.userRole = 'administrador';
    } else {
      this.userRole = 'trabajador';
    }

    // Llamamos a la función para obtener los datos
    this.cargarIncidencias();
  }

  // Nuevo método para cargar los reportes dependiendo del rol
  cargarIncidencias(): void {
    if (this.userRole === 'administrador') {
      this.incidencias$ = this.apiService.getAdminIncidents();
    } else {
      this.incidencias$ = this.apiService.getWorkerIncidents();
    }
  }

  onLogout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
