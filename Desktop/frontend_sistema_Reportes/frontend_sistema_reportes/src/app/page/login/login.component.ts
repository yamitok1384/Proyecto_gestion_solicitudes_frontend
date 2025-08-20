import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ApiService } from '../../services/api.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule // Añade FormsModule a los imports
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  // Variables para almacenar los datos del formulario
  username = '';
  password = '';
  errorMessage = '';

  constructor(private apiService: ApiService) {}

  /**
   * Maneja el envío del formulario de inicio de sesión.
   * Llama al servicio de API para autenticar al usuario.
   */
  onLoginSubmit(): void {
    // Llama al método de login en el ApiService
    this.apiService.login({ username: this.username, password: this.password }).subscribe({
      next: (response) => {
        // En caso de éxito
        console.log('Login successful!', response);
        // Aquí podrías guardar el token y redirigir al usuario
        this.errorMessage = '';
      },
      error: (error) => {
        // En caso de error
        console.error('Login failed!', error);
        if (error.status === 401) {
          this.errorMessage = 'Credenciales inválidas. Por favor, inténtalo de nuevo.';
        } else {
          this.errorMessage = 'Ocurrió un error. Por favor, inténtalo de nuevo más tarde.';
        }
      }
    });
  }
}