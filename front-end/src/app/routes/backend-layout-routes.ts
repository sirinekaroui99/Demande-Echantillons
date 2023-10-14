
import { Routes } from '@angular/router';
import { AuthGuard } from '../auth/auth.guard';

export const BACKEND_LAYOUT: Routes = [
    {
        path: 'dashboard',
        loadChildren: () => import('../dashboard/dashboard.module').then(m => m.DashboardModule),
        canLoad: [AuthGuard]
    },
    
]
