import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'dashboard',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'clients',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/clients/clients.module').then( m => m.ClientsPageModule)
  },
  {
    path: 'budgets',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/budgets/budgets.module').then( m => m.BudgetsPageModule)
  },
  {
    path: 'service-orders',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/service-orders/service-orders.module').then( m => m.ServiceOrdersPageModule)
  },
  {
    path: 'inventory',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/inventory/inventory.module').then( m => m.InventoryPageModule)
  },
  {
    path: 'staff',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/staff/staff.module').then( m => m.StaffPageModule)
  },
  {
    path: 'sales-notes',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/sales-notes/sales-notes.module').then( m => m.SalesNotesPageModule)
  },
  {
    path: 'reports',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/reports/reports.module').then( m => m.ReportsPageModule)
  },
  {
    path: 'settings',
    canActivate: [AuthGuard],
    loadChildren: () => import('./pages/settings/settings.module').then( m => m.SettingsPageModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
