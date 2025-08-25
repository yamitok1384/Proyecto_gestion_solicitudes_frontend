import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common'; // Importa este módulo
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService) { }

  onLoginSubmit(): void {
    // La llamada al servicio ahora envía un objeto con las credenciales
    this.apiService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        console.log('Login exitoso!', response);
        this.errorMessage = '';
      },
      error: (error) => {
        console.error('Login fallido!', error);
        this.errorMessage = 'Credenciales incorrectas. Por favor, inténtalo de nuevo.';
      }
    });
  }
}
