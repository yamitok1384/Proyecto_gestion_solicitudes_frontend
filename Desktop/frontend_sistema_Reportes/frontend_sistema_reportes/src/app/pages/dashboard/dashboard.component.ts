import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

  constructor(private router: Router) { }

  /**
   * Elimina el token de autenticación y redirige a la página de login.
   */
  onLogout(): void {
    localStorage.removeItem('auth_token');
    this.router.navigate(['/login']);
  }
}
