import { Routes } from '@angular/router';
import { LoginComponent } from './page/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component'; // Importa el nuevo componente

export const routes: Routes = [
    {
        path: 'login', // Define la URL para la página de inicio de sesión
        component: LoginComponent // El componente que se mostrará
    },
    {
        path: 'dashboard', // Nueva ruta para el dashboard
        component: DashboardComponent 
    },
    {
        path: '', // La ruta por defecto, redirige a la página de login
        redirectTo: '/login',
        pathMatch: 'full'
    }
];
