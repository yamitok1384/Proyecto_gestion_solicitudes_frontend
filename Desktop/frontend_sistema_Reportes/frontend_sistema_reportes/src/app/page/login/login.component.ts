import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService, private router: Router) { }

  onLoginSubmit(): void {
    this.apiService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso!', response);
        localStorage.setItem('auth_token', response.token);
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        console.error('Login fallido!', error);
        this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
